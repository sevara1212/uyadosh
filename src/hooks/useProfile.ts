import { useState, useEffect } from 'react';
import { 
  usersCollection, 
  doc, 
  getDoc, 
  updateDoc
} from '@/lib/firebase';
import { User, ActivityLevel, SportType } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useImageUpload as useBaseImageUpload } from './useImageUpload';

interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
  uploadingImage: boolean;
}

export function useProfile() {
  const { currentUser, firebaseUser, setCurrentUser } = useAuth();
  const { uploadProfileImage: baseUploadProfileImage, uploading: uploadingImage } = useBaseImageUpload();
  const [profileState, setProfileState] = useState<ProfileState>({
    user: currentUser,
    loading: false,
    error: null,
    uploadingImage: false
  });

  // Update local state when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfileState(prev => ({
        ...prev,
        user: currentUser
      }));
    }
  }, [currentUser]);

  // Custom wrapper for uploadProfileImage that updates both Firestore and local state
  const uploadProfileImage = async (file: File) => {
    const base64 = await baseUploadProfileImage(file);
    
    if (base64 && currentUser) {
      // Update local profile state
      setProfileState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, avatar: base64 } : prev.user
      }));
    }
    
    return base64;
  };

  // Update user profile
  const updateProfile = async (profileData: Partial<User>) => {
    if (!currentUser || !firebaseUser) {
      toast.error('You must be logged in to update your profile');
      return false;
    }

    setProfileState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const userRef = doc(usersCollection, currentUser.id);
      await updateDoc(userRef, profileData);
      
      // Update local state
      const updatedUser = { ...currentUser, ...profileData };
      setProfileState(prev => ({
        ...prev,
        user: updatedUser,
        loading: false
      }));
      
      // Also update auth context state
      if (setCurrentUser) {
        setCurrentUser(updatedUser);
      }
      
      toast.success('Profile updated successfully');
      return true;
    } catch (error: any) {
      setProfileState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to update profile'
      }));
      toast.error(error.message || 'Failed to update profile');
      return false;
    }
  };

  // Update activity level
  const updateActivityLevel = async (level: ActivityLevel) => {
    return updateProfile({ activityLevel: level });
  };

  // Update sport interests
  const updateSportInterests = async (interests: SportType[]) => {
    return updateProfile({ interests });
  };

  // Update bio
  const updateBio = async (bio: string) => {
    return updateProfile({ bio });
  };

  return {
    ...profileState,
    uploadingImage,
    updateProfile,
    uploadProfileImage,
    updateActivityLevel,
    updateSportInterests,
    updateBio
  };
} 