import emailjs from '@emailjs/browser';

const OTP_API_BASE = (import.meta as any).env?.VITE_OTP_API_BASE || 'http://localhost:8000';

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Optional local fallback storage (debug only)
const getOTPStorage = () => {
  try {
    const stored = localStorage.getItem('otp_storage');
    return stored ? new Map(JSON.parse(stored)) : new Map();
  } catch (error) {
    console.error('Error reading OTP storage:', error);
    return new Map();
  }
};

const saveOTPStorage = (storage: Map<string, any>) => {
  try {
    localStorage.setItem('otp_storage', JSON.stringify(Array.from(storage.entries())));
  } catch (error) {
    console.error('Error saving OTP storage:', error);
  }
};

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function postJSON(path: string, body: any, timeoutMs = 8000) {
  const url = `${OTP_API_BASE}${path}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`OTP API ${path} failed ${res.status}: ${text}`);
    }
    return res.json().catch(() => ({}));
  } finally {
    clearTimeout(timer);
  }
}

export const emailService = {
  async sendOTP(email: string, name: string): Promise<EmailResponse> {
    try {
      console.log(`📧 [Brevo OTP] Sending OTP to ${email}`);
      await postJSON('/send-otp', { email }, 6000);
      console.log('✅ OTP send request accepted by server');
      return { success: true, message: 'OTP sent successfully' };
    } catch (error: any) {
      console.error('❌ OTP API send failed, falling back locally:', error?.message || error);
      const otp = generateOTP();
      const expiresAt = Date.now() + 10 * 60 * 1000;
      const storage = getOTPStorage();
      storage.set(email, { otp, expiresAt, attempts: 0 });
      saveOTPStorage(storage);
      console.log('🔑 DEV FALLBACK OTP:', otp);
      return { success: true, message: 'OTP sent (dev fallback). Check console for code.' };
    }
  },

  async verifyOTP(email: string, otp: string): Promise<EmailResponse> {
    try {
      console.log(`🔍 [Brevo OTP] Verifying for ${email}`);
      await postJSON('/verify-otp', { email, code: otp }, 6000);
      console.log('✅ OTP verified by server');
      return { success: true, message: 'Email verified successfully' };
    } catch (error: any) {
      console.warn('⚠️ OTP API verify failed, checking local fallback:', error?.message || error);
      const storage = getOTPStorage();
      const stored = storage.get(email);
      if (!stored) return { success: false, error: 'OTP not found or expired' };
      if (Date.now() > stored.expiresAt) {
        storage.delete(email);
        saveOTPStorage(storage);
        return { success: false, error: 'OTP has expired' };
      }
      if (stored.otp !== otp) {
        stored.attempts = (stored.attempts || 0) + 1;
        storage.set(email, stored);
        saveOTPStorage(storage);
        return { success: false, error: 'Invalid OTP code' };
      }
      storage.delete(email);
      saveOTPStorage(storage);
      return { success: true, message: 'Email verified successfully (fallback)' };
    }
  },

  async resendOTP(email: string, name: string): Promise<EmailResponse> {
    return this.sendOTP(email, name);
  },

  getStoredOTP(email: string): string | null {
    const s = getOTPStorage();
    const d = s.get(email);
    return d ? d.otp : null;
  },

  init() {
    console.log('✅ Brevo OTP client ready. Base:', OTP_API_BASE);
  },

  async testConnection(): Promise<boolean> {
    try {
      await postJSON('/send-otp', { email: 'test@example.com' }, 4000);
      return true;
    } catch {
      return false;
    }
  }
};
