import { telegramApp } from '@/utils/telegramApp';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db, usersCollection } from '@/lib/firebase';
import { User, ActivityLevel, Gender } from '@/types';
import { toast } from 'sonner';

export interface TelegramUserData {
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  phoneNumber?: string;
}

export class TelegramAuthService {
  private static instance: TelegramAuthService;

  private constructor() {}

  public static getInstance(): TelegramAuthService {
    if (!TelegramAuthService.instance) {
      TelegramAuthService.instance = new TelegramAuthService();
    }
    return TelegramAuthService.instance;
  }

  public getTelegramUserData(): TelegramUserData | null {
    if (!telegramApp.isTelegramApp()) return null;

    const userDetails = telegramApp.getUserDetails();
    if (!userDetails) return null;

    return {
      telegramId: userDetails.id,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      username: userDetails.username,
      languageCode: userDetails.languageCode
    };
  }

  public async checkUserExists(telegramId: number): Promise<User | null> {
    try {
      const userQuery = await getDoc(doc(usersCollection, `telegram_${telegramId}`));
      if (userQuery.exists()) {
        const userData = userQuery.data();
        return { id: userQuery.id, ...userData } as User;
      }
      return null;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return null;
    }
  }

  public async createOrUpdateUser(telegramData: TelegramUserData): Promise<User> {
    const userId = `telegram_${telegramData.telegramId}`;
    
    const userData = {
      telegramId: telegramData.telegramId,
      name: `${telegramData.firstName}${telegramData.lastName ? ` ${telegramData.lastName}` : ''}`,
      firstName: telegramData.firstName,
      lastName: telegramData.lastName || '',
      username: telegramData.username || '',
      languageCode: telegramData.languageCode || 'en',
      phoneNumber: telegramData.phoneNumber || '',
      email: telegramData.username ? `${telegramData.username}@telegram.user` : '',
      avatar: "",
      interests: [],
      activityLevel: ActivityLevel.Beginner,
      joinedDate: new Date().toISOString(),
      joinedRooms: [],
      gender: Gender.Male,
      age: 25,
      preferredGender: Gender.Both,
      preferredAgeRange: { min: 14, max: 60 },
      isTelegramUser: true,
      lastActive: new Date().toISOString()
    };

    try {
      await setDoc(doc(usersCollection, userId), userData, { merge: true });
      const createdUser = { id: userId, ...userData } as User;
      console.log('✅ Telegram user created/updated:', createdUser.name);
      toast.success(`Welcome to Muvr, ${createdUser.name}! 🎉`);
      return createdUser;
    } catch (error) {
      console.error('Error creating/updating Telegram user:', error);
      throw new Error('Failed to create user account');
    }
  }

  public async authenticateWithTelegram(): Promise<{
    success: boolean;
    user?: User;
    isNewUser?: boolean;
    error?: string;
  }> {
    try {
      if (!telegramApp.isTelegramApp()) {
        return { success: false, error: 'Not running in Telegram Mini App' };
      }

      const telegramData = this.getTelegramUserData();
      if (!telegramData) {
        return { success: false, error: 'Could not get Telegram user data' };
      }

      const existingUser = await this.checkUserExists(telegramData.telegramId);
      
      if (existingUser) {
        await this.updateUserActivities(telegramData.telegramId, {});
        console.log('✅ Existing Telegram user logged in:', existingUser.name);
        toast.success(`Welcome back, ${existingUser.name}! 👋`);
        return { success: true, user: existingUser, isNewUser: false };
      } else {
        const newUser = await this.createOrUpdateUser(telegramData);
        console.log('✅ New Telegram user created:', newUser.name);
        return { success: true, user: newUser, isNewUser: true };
      }
    } catch (error: any) {
      console.error('Telegram authentication error:', error);
      return { success: false, error: error.message || 'Authentication failed' };
    }
  }

  public async updateUserActivities(telegramId: number, activities: any): Promise<void> {
    const userId = `telegram_${telegramId}`;
    try {
      await updateDoc(doc(usersCollection, userId), {
        lastActive: new Date().toISOString(),
        ...activities
      });
    } catch (error) {
      console.error('Error updating user activities:', error);
    }
  }
}

export const telegramAuthService = TelegramAuthService.getInstance();
 