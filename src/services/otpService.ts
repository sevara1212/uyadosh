import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '@/lib/firebase';

const functions = getFunctions(app);

// Callable functions
const sendOTPEmail = httpsCallable(functions, 'sendOTPEmail');
const verifyOTP = httpsCallable(functions, 'verifyOTP');
const resendOTP = httpsCallable(functions, 'resendOTP');

export interface OTPResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const otpService = {
  // Send OTP email
  async sendOTP(email: string, name: string): Promise<OTPResponse> {
    try {
      const result = await sendOTPEmail({ email, name });
      return { success: true, message: 'OTP sent successfully' };
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to send OTP' 
      };
    }
  },

  // Verify OTP
  async verifyOTP(email: string, otp: string): Promise<OTPResponse> {
    try {
      const result = await verifyOTP({ email, otp });
      return { success: true, message: 'Email verified successfully' };
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      
      let errorMessage = 'Failed to verify OTP';
      
      if (error.code === 'functions/invalid-argument') {
        errorMessage = 'Invalid OTP code';
      } else if (error.code === 'functions/deadline-exceeded') {
        errorMessage = 'OTP has expired. Please request a new one.';
      } else if (error.code === 'functions/permission-denied') {
        errorMessage = 'Too many attempts. Please request a new OTP.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return { success: false, error: errorMessage };
    }
  },

  // Resend OTP
  async resendOTP(email: string, name: string): Promise<OTPResponse> {
    try {
      const result = await resendOTP({ email, name });
      return { success: true, message: 'New OTP sent successfully' };
    } catch (error: any) {
      console.error('Error resending OTP:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to resend OTP' 
      };
    }
  }
};
