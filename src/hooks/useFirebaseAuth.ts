import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, usersCollection, doc, setDoc, getDoc, collection, query, where, getDocs, deleteDoc, db } from '@/lib/firebase';
import { User, ActivityLevel, RequestStatus } from '@/types';
import { clearUserCache } from '@/services/chatService';
import { toast } from 'sonner';
import { telegramAuthService } from "@/services/telegramAuthService";
import { emailService } from "@/services/emailService";

interface AuthState {
  currentUser: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
}

export function useFirebaseAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    currentUser: null,
    firebaseUser: null,
    loading: true,
    error: null
  });

  // Check for approved requests and show notification
  const checkApprovedRequests = async (userId: string) => {
    try {
      const q = query(
        collection(db, "joinRequests"),
        where("userId", "==", userId),
        where("status", "==", RequestStatus.Approved)
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        // Show notification for approved requests
        toast.success("🎉 Your join request has been approved!");
        
        // Delete the approved request from Firebase
        const deletePromises = snapshot.docs.map(doc => 
          deleteDoc(doc.ref)
        );
        await Promise.all(deletePromises);
      }
    } catch (error) {
      console.error("Error checking approved requests:", error);
    }
  };

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔄 Auth state changed:', firebaseUser ? `User: ${firebaseUser.email}` : 'No user');
      
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userRef = doc(usersCollection, firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            // User exists in Firestore
            const userData = userSnap.data();
            const currentUser = { id: firebaseUser.uid, ...userData } as User;
            
            console.log('✅ User authenticated successfully:', currentUser.name);
            
            setAuthState({
              currentUser,
              firebaseUser,
              loading: false,
              error: null
            });
            
            // Show welcome back message for login
            if (firebaseUser.metadata.lastSignInTime === firebaseUser.metadata.creationTime) {
              // This is a new user (just signed up)
              toast.success(`Welcome to Muvr, ${currentUser.name}! 🎉`);
            } else {
              // This is an existing user (logging in)
              toast.success(`Welcome back, ${currentUser.name}! 👋`);
            }
            
            // Check for approved requests after user is loaded
            checkApprovedRequests(firebaseUser.uid);
          } else {
            // User doesn't exist in Firestore - this could be a race condition during signup
            console.log('⚠️ User not found in Firestore (might be during signup):', firebaseUser.email);
            
            // Check if this is a new user (recently created)
            const isNewUser = firebaseUser.metadata.lastSignInTime === firebaseUser.metadata.creationTime;
            const timeSinceCreation = Date.now() - new Date(firebaseUser.metadata.creationTime).getTime();
            const isRecentlyCreated = timeSinceCreation < 5000; // 5 seconds
            
            if (isNewUser && isRecentlyCreated) {
              // This is likely a race condition during signup, wait a bit and check again
              console.log('⏳ New user detected, waiting for Firestore document...');
              setAuthState({
                currentUser: null,
                firebaseUser,
                loading: true,
                error: null
              });
              
              // Wait a bit and check again
              setTimeout(async () => {
                try {
                  const userRef = doc(usersCollection, firebaseUser.uid);
                  const userSnap = await getDoc(userRef);
                  
                  if (userSnap.exists()) {
                    // User was created, update state
                    const userData = userSnap.data();
                    const currentUser = { id: firebaseUser.uid, ...userData } as User;
                    
                    console.log('✅ User profile found after delay:', currentUser.name);
                    
                    setAuthState({
                      currentUser,
                      firebaseUser,
                      loading: false,
                      error: null
                    });
                    
                    toast.success(`Welcome to Muvr, ${currentUser.name}! 🎉`);
                    checkApprovedRequests(firebaseUser.uid);
                  } else {
                    // User still doesn't exist, sign out
                    console.log('❌ User profile not found after delay - signing out');
                    await signOut(auth);
                    setAuthState({
                      currentUser: null,
                      firebaseUser: null,
                      loading: false,
                      error: null
                    });
                  }
                } catch (error) {
                  console.error('❌ Error checking user after delay:', error);
                  // On error, sign out to be safe
                  await signOut(auth);
                  setAuthState({
                    currentUser: null,
                    firebaseUser: null,
                    loading: false,
                    error: null
                  });
                }
              }, 1000); // Wait 1 second for signup to complete
            } else {
              // This is not a new user, sign them out
              console.log('❌ User profile not found - signing out');
              await signOut(auth);
              setAuthState({
                currentUser: null,
                firebaseUser: null,
                loading: false,
                error: null
              });
            }
          }
        } catch (error: any) {
          console.error('❌ Error fetching user data:', error);
          setAuthState({
            currentUser: null,
            firebaseUser,
            loading: false,
            error: error.message
          });
        }
      } else {
        // No user is signed in
        console.log('👋 No user signed in');
        setAuthState({
          currentUser: null,
          firebaseUser: null,
          loading: false,
          error: null
        });
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Update current user
  const setCurrentUser = (user: User) => {
    setAuthState(prev => ({
      ...prev,
      currentUser: user
    }));
  };

  // Sign up with email and password
  const signup = async (
    email: string, 
    password: string, 
    name: string,
    gender?: string,
    age?: number
  ): Promise<{ success: boolean; error?: string; requiresVerification?: boolean }> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('🚀 Starting professional signup process...');
      
      // Validate input data
      if (!email || !password || !name) {
        throw new Error('Please fill in all required fields.');
      }
      
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
      }
      
      // Send OTP email verification (do NOT create account yet)
      console.log('📧 Sending OTP email verification...');
      const otpResult = await emailService.sendOTP(email, name);
      
      if (otpResult.success) {
        console.log('✅ OTP email sent successfully');
        
        // Store pending signup data for finalization after OTP
        const pending = {
          email,
          password,
          name,
          gender: gender || 'Other',
          age: typeof age === 'number' && !isNaN(age) ? age : 14
        };
        localStorage.setItem('pending_signup', JSON.stringify(pending));
        
        // Store email and name for verification page (legacy keys)
        localStorage.setItem('signup_email', email);
        localStorage.setItem('signup_name', name);
        
        // Navigate to verification page
        window.location.href = `/verify-email?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;
        setAuthState(prev => ({ ...prev, loading: false }));
        return { success: true, requiresVerification: true };
      } else {
        throw new Error(otpResult.error || 'Failed to send verification email');
      }
    } catch (error: any) {
      console.error('❌ Professional signup failed:', error);
      
      let errorMessage = 'Failed to create account';
      
      // Provide specific error messages
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email or try logging in.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password with at least 8 characters, including uppercase, lowercase, and number.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format. Please enter a valid email address.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password accounts are not enabled. Please contact support.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.code === 'unavailable' || error.message?.includes('IndexedDB')) {
        errorMessage = 'Browser storage issue. Please try refreshing the page or use a different browser.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage
      }));
      
      // Show error toast
      toast.error(errorMessage);
      
      return { success: false, error: errorMessage };
    }
  };

  // Finalize signup after OTP confirmation
  const finalizeSignupAfterOTP = async (): Promise<{ success: boolean; error?: string }> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('🔐 Starting account creation after OTP verification...');
      
      const raw = localStorage.getItem('pending_signup');
      if (!raw) {
        console.error('❌ No pending signup data found in localStorage');
        return { success: false, error: 'No pending signup found. Please try signing up again.' };
      }
      
      const pending = JSON.parse(raw) as { email: string; password: string; name: string; gender: string; age: number };
      const { email, password, name, gender, age } = pending;
      
      console.log('📋 Retrieved pending signup data for:', email);

      try {
        // Try to create a fresh Firebase Auth user
        console.log('🔐 Creating Firebase Auth user after OTP...');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        await updateProfile(firebaseUser, { displayName: name });
        
        // Create Firestore user document
        console.log('📄 Creating Firestore user document...');
        const userData = {
          name,
          email,
          avatar: "",
          interests: [],
          activityLevel: ActivityLevel.Beginner,
          joinedDate: new Date().toISOString(),
          joinedRooms: [],
          gender,
          age,
          preferredGender: 'Both',
          preferredAgeRange: { min: 14, max: 60 }
        };
        await setDoc(doc(usersCollection, firebaseUser.uid), userData, { merge: true });
        
        const currentUser = { id: firebaseUser.uid, ...userData } as User;
        setAuthState({ currentUser, firebaseUser, loading: false, error: null });
      } catch (err: any) {
        // If the email is already registered in Firebase Auth, sign in and backfill Firestore
        if (err?.code === 'auth/email-already-in-use') {
          console.warn('⚠️ Email already in use. Attempting sign-in and profile backfill...');
          // Attempt sign-in with the provided password
          const cred = await signInWithEmailAndPassword(auth, email, password).catch((e) => {
            // If wrong password, surface a clear error
            if (e?.code === 'auth/wrong-password') {
              throw new Error('This email is already registered. Please log in with your password.');
            }
            throw e;
          });
          const firebaseUser = cred.user;
          // Ensure display name is set
          try { await updateProfile(firebaseUser, { displayName: name }); } catch {}
          
          // Ensure Firestore user exists
          const userRef = doc(usersCollection, firebaseUser.uid);
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            const userData = {
              name,
              email,
              avatar: "",
              interests: [],
              activityLevel: ActivityLevel.Beginner,
              joinedDate: new Date().toISOString(),
              joinedRooms: [],
              gender,
              age,
              preferredGender: 'Both',
              preferredAgeRange: { min: 14, max: 60 }
            };
            await setDoc(userRef, userData, { merge: true });
            setAuthState({ currentUser: { id: firebaseUser.uid, ...userData } as User, firebaseUser, loading: false, error: null });
          } else {
            const data = snap.data() as any;
            setAuthState({ currentUser: { id: firebaseUser.uid, ...data } as User, firebaseUser, loading: false, error: null });
          }
        } else {
          throw err;
        }
      }

      // Clear pending data
      localStorage.removeItem('pending_signup');
      localStorage.removeItem('signup_email');
      localStorage.removeItem('signup_name');

      return { success: true };
    } catch (error: any) {
      console.error('❌ Finalize signup failed:', error);
      const msg = error.message || 'Failed to finalize signup';
      toast.error(msg);
      setAuthState(prev => ({ ...prev, loading: false, error: msg }));
      return { success: false, error: msg };
    }
  };

  // Sign in with email and password
  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('🔐 Starting professional login process...');
      
      // Validate input data
      if (!email || !password) {
        throw new Error('Please enter both email and password.');
      }
      
      await signInWithEmailAndPassword(auth, email, password);
      
      console.log('✅ Professional login successful');
      
      // Success toast will be shown by the auth state change listener
      return { success: true };
    } catch (error: any) {
      console.error('❌ Professional login failed:', error);
      
      let errorMessage = 'Failed to sign in';
      
      // Provide specific error messages
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please sign up first.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format. Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: errorMessage
      }));
      
      // Show error toast
      toast.error(errorMessage);
      
      return { success: false, error: errorMessage };
    }
  };

  // Sign out
  const logout = async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await signOut(auth);
      // Clear chat user cache on logout
      clearUserCache();
      return { success: true };
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Failed to sign out' 
      }));
      return { success: false, error: error.message };
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await sendPasswordResetEmail(auth, email);
      setAuthState(prev => ({ ...prev, loading: false }));
      return { success: true };
    } catch (error: any) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Failed to send password reset email' 
      }));
      return { success: false, error: error.message };
    }
  };

  // Resend email verification
  const resendEmailVerification = async () => {
    if (!authState.firebaseUser) {
      return { success: false, error: 'No user logged in' };
    }

    try {
      const email = authState.firebaseUser.email;
      const name = authState.firebaseUser.displayName || 'User';
      
      if (!email) {
        return { success: false, error: 'No email found' };
      }
      
      const result = await emailService.resendOTP(email, name);
      
      if (result.success) {
        toast.success('Verification email sent! Please check your inbox.');
        return { success: true };
      } else {
        toast.error(result.error || 'Failed to send verification email');
        return { success: false, error: result.error };
      }
    } catch (error: any) {
      let errorMessage = 'Failed to send verification email';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Telegram authentication
  const loginWithTelegram = async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      console.log('🔐 Starting Telegram authentication...');
      
      const result = await telegramAuthService.authenticateWithTelegram();
      
      if (result.success && result.user) {
        console.log('✅ Telegram authentication successful');
        
        setAuthState({
          currentUser: result.user,
          firebaseUser: null, // No Firebase user for Telegram auth
          loading: false,
          error: null
        });
        
        return { success: true };
      } else {
        console.log('❌ Telegram authentication failed:', result.error);
        
        setAuthState(prev => ({ 
          ...prev, 
          loading: false, 
          error: result.error || 'Telegram authentication failed'
        }));
        
        return { success: false, error: result.error };
      }
    } catch (error: any) {
      console.error('❌ Telegram authentication error:', error);
      
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Telegram authentication failed'
      }));
      
      return { success: false, error: error.message };
    }
  };

  return {
    ...authState,
    setCurrentUser,
    signup,
    finalizeSignupAfterOTP,
    login,
    logout,
    resetPassword,
    resendEmailVerification,
    loginWithTelegram,
  };
} 