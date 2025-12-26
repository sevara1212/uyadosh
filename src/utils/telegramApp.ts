// Telegram Mini App utilities
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          query_id: string;
          user: {
            id: number;
            is_bot: boolean;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          receiver: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            type: string;
          };
          chat: {
            id: number;
            type: string;
            title?: string;
            username?: string;
          };
          chat_type: string;
          chat_instance: string;
          start_param?: string;
          can_send_after: number;
          auth_date: number;
          hash: string;
        };
        ready(): void;
        expand(): void;
        close(): void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show(): void;
          hide(): void;
          enable(): void;
          disable(): void;
          setText(text: string): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
        };
        BackButton: {
          isVisible: boolean;
          show(): void;
          hide(): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
        };
        HapticFeedback: {
          impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void;
          notificationOccurred(type: 'error' | 'success' | 'warning'): void;
          selectionChanged(): void;
        };
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
        };
        colorScheme: 'light' | 'dark';
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
        headerColor: string;
        backgroundColor: string;
        isClosingConfirmationEnabled: boolean;
        setHeaderColor(color: string): void;
        setBackgroundColor(color: string): void;
        enableClosingConfirmation(): void;
        disableClosingConfirmation(): void;
        onEvent(eventType: string, eventHandler: (event: any) => void): void;
        offEvent(eventType: string, eventHandler: (event: any) => void): void;
        sendData(data: string): void;
        switchInlineQuery(query: string, choose_chat_types?: string[]): void;
        openLink(url: string, options?: { try_instant_view?: boolean }): void;
        openTelegramLink(url: string): void;
        openInvoice(url: string, callback?: (status: string) => void): void;
        showPopup(params: {
          title: string;
          message: string;
          buttons?: Array<{
            id?: string;
            type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
            text: string;
          }>;
        }, callback?: (buttonId: string) => void): void;
        showAlert(message: string, callback?: () => void): void;
        showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
        showScanQrPopup(params: {
          text?: string;
        }, callback?: (data: string) => void): void;
        closeScanQrPopup(): void;
        readTextFromClipboard(callback?: (data: string) => void): void;
        requestWriteAccess(callback?: (access: boolean) => void): void;
        requestContact(callback?: (contact: {
          phone_number: string;
          first_name: string;
          last_name?: string;
          user_id?: number;
        }) => void): void;
        invokeCustomMethod(method: string, params?: any): void;
        version: string;
        platform: string;
        isVersionAtLeast(version: string): boolean;
        setViewportSettings(settings: {
          resize_keyboard?: boolean;
          smooth_animate?: boolean;
        }): void;
      };
    };
  }
}

export class TelegramApp {
  private static instance: TelegramApp;
  private webApp: any;

  private constructor() {
    this.webApp = window.Telegram?.WebApp;
    this.init();
  }

  public static getInstance(): TelegramApp {
    if (!TelegramApp.instance) {
      TelegramApp.instance = new TelegramApp();
    }
    return TelegramApp.instance;
  }

  private init(): void {
    if (this.webApp) {
      console.log('🚀 Initializing Telegram Mini App...');
      
      // Initialize the Web App
      this.webApp.ready();
      
      // Set up theme
      this.setupTheme();
      
      // Set up main button
      this.setupMainButton();
      
      // Set up back button
      this.setupBackButton();
      
      console.log('✅ Telegram Mini App initialized');
    } else {
      console.log('⚠️ Not running in Telegram Mini App environment');
    }
  }

  private setupTheme(): void {
    if (!this.webApp) return;

    // Apply Telegram theme colors
    const { themeParams } = this.webApp;
    
    // Set header and background colors
    this.webApp.setHeaderColor(themeParams.bg_color);
    this.webApp.setBackgroundColor(themeParams.bg_color);
    
    // Add CSS variables for theme colors
    const root = document.documentElement;
    root.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
    root.style.setProperty('--tg-theme-text-color', themeParams.text_color);
    root.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
    root.style.setProperty('--tg-theme-link-color', themeParams.link_color);
    root.style.setProperty('--tg-theme-button-color', themeParams.button_color);
    root.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
    
    console.log('🎨 Theme applied:', themeParams);
  }

  private setupMainButton(): void {
    if (!this.webApp) return;

    const mainButton = this.webApp.MainButton;
    
    // Set default button style
    mainButton.color = this.webApp.themeParams.button_color;
    mainButton.textColor = this.webApp.themeParams.button_text_color;
    
    console.log('🔘 Main button configured');
  }

  private setupBackButton(): void {
    if (!this.webApp) return;

    const backButton = this.webApp.BackButton;
    
    // Show back button on non-home pages
    if (window.location.pathname !== '/' && window.location.pathname !== '/index') {
      backButton.show();
      backButton.onClick(() => {
        window.history.back();
      });
    }
    
    console.log('⬅️ Back button configured');
  }

  // Public methods
  public isTelegramApp(): boolean {
    return !!this.webApp;
  }

  public getUser(): any {
    return this.webApp?.initDataUnsafe?.user;
  }

  public getChat(): any {
    return this.webApp?.initDataUnsafe?.chat;
  }

  public getStartParam(): string | undefined {
    return this.webApp?.initDataUnsafe?.start_param;
  }

  public getUserDetails(): {
    id: number;
    firstName: string;
    lastName?: string;
    username?: string;
    languageCode?: string;
  } | null {
    const user = this.getUser();
    if (!user) return null;
    
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      languageCode: user.language_code
    };
  }

  public async requestContact(): Promise<{
    phone_number: string;
    first_name: string;
    last_name?: string;
    user_id?: number;
  } | null> {
    return new Promise((resolve) => {
      if (!this.webApp) {
        resolve(null);
        return;
      }
      
      this.webApp.requestContact((contact: any) => {
        resolve(contact);
      });
    });
  }

  public async requestWriteAccess(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.webApp) {
        resolve(false);
        return;
      }
      
      this.webApp.requestWriteAccess((access: boolean) => {
        resolve(access);
      });
    });
  }

  public showMainButton(text: string, callback?: () => void): void {
    if (!this.webApp) return;

    const mainButton = this.webApp.MainButton;
    mainButton.setText(text);
    mainButton.show();
    
    if (callback) {
      mainButton.onClick(callback);
    }
  }

  public hideMainButton(): void {
    if (!this.webApp) return;
    this.webApp.MainButton.hide();
  }

  public showBackButton(callback?: () => void): void {
    if (!this.webApp) return;

    const backButton = this.webApp.BackButton;
    backButton.show();
    
    if (callback) {
      backButton.onClick(callback);
    }
  }

  public hideBackButton(): void {
    if (!this.webApp) return;
    this.webApp.BackButton.hide();
  }

  public showAlert(message: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.webApp) {
        alert(message);
        resolve();
        return;
      }
      
      this.webApp.showAlert(message, resolve);
    });
  }

  public showConfirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.webApp) {
        const confirmed = confirm(message);
        resolve(confirmed);
        return;
      }
      
      this.webApp.showConfirm(message, resolve);
    });
  }

  public showPopup(params: {
    title: string;
    message: string;
    buttons?: Array<{
      id?: string;
      type: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
  }): Promise<string | undefined> {
    return new Promise((resolve) => {
      if (!this.webApp) {
        alert(`${params.title}\n\n${params.message}`);
        resolve(undefined);
        return;
      }
      
      this.webApp.showPopup(params, resolve);
    });
  }

  public closeApp(): void {
    if (!this.webApp) return;
    this.webApp.close();
  }

  public expand(): void {
    if (!this.webApp) return;
    this.webApp.expand();
  }

  public sendData(data: string): void {
    if (!this.webApp) return;
    this.webApp.sendData(data);
  }

  public hapticFeedback(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light'): void {
    if (!this.webApp) return;
    this.webApp.HapticFeedback.impactOccurred(style);
  }

  public getThemeParams(): any {
    return this.webApp?.themeParams;
  }

  public getColorScheme(): 'light' | 'dark' {
    return this.webApp?.colorScheme || 'light';
  }

  public enableClosingConfirmation(): void {
    if (!this.webApp) return;
    this.webApp.enableClosingConfirmation();
  }

  public onEvent(eventType: string, eventHandler: (event: any) => void): void {
    if (!this.webApp) return;
    this.webApp.onEvent(eventType, eventHandler);
  }
}

// Export singleton instance
export const telegramApp = TelegramApp.getInstance();

// Hook for React components
export const useTelegramApp = () => {
  return telegramApp;
}; 