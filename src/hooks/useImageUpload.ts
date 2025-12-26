import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { doc, updateDoc, usersCollection } from '@/lib/firebase';
import { toast } from 'sonner';

// This is a temporary solution until Firebase Storage is set up
// It converts images to base64 and stores them in Firestore
export function useImageUpload() {
  const { currentUser, setCurrentUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadProfileImage = async (file: File): Promise<string | null> => {
    if (!currentUser) {
      toast.error('You must be logged in to upload a profile image');
      return null;
    }

    setUploading(true);
    setError(null);
    
    try {
      // Convert file to base64
      const base64 = await fileToBase64(file);
      
      if (!base64) {
        throw new Error('Failed to convert image to base64');
      }
      
      // Update user profile with new avatar URL
      await updateDoc(doc(usersCollection, currentUser.id), {
        avatar: base64
      });
      
      // Update local state with the new avatar
      if (setCurrentUser) {
        setCurrentUser({
          ...currentUser,
          avatar: base64
        });
      }
      
      toast.success('Profile image uploaded successfully');
      return base64;
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to upload profile image';
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Helper function to convert File to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return {
    uploadProfileImage,
    uploading,
    error
  };
} 