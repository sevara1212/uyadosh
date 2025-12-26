import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ2QGDCAO_QU-J1bC41KoSrHkro4iigVQ",
  authDomain: "fit-tribe-mobile-hub.firebaseapp.com",
  projectId: "fit-tribe-mobile-hub",
  storageBucket: "fit-tribe-mobile-hub.appspot.com",
  messagingSenderId: "784141035396",
  appId: "1:784141035396:web:8b0b5c01cdbc67d8721fd1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const testAuthFlow = async () => {
  try {
    console.log('🔍 Testing authentication flow...');
    
    // Test 1: Try to sign in with a non-existent user
    console.log('\n🧪 Test 1: Non-existent user');
    try {
      await signInWithEmailAndPassword(auth, 'nonexistent@test.com', 'password123');
      console.log('   ❌ Should have failed but succeeded');
    } catch (error: any) {
      console.log('   ✅ Correctly failed with:', error.message);
    }
    
    // Test 2: Check if there are any existing users in Firestore
    console.log('\n🧪 Test 2: Check existing users');
    const testEmails = ['test@example.com', 'user@test.com', 'admin@test.com'];
    
    for (const email of testEmails) {
      try {
        await signInWithEmailAndPassword(auth, email, 'password123');
        console.log(`   ✅ User ${email} exists in Firebase Auth`);
        
        // Check if they exist in Firestore
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            console.log(`   ✅ User ${email} also exists in Firestore`);
          } else {
            console.log(`   ❌ User ${email} exists in Auth but NOT in Firestore`);
          }
          
          // Sign out
          await auth.signOut();
        }
      } catch (error: any) {
        console.log(`   ❌ User ${email} does not exist in Firebase Auth`);
      }
    }
    
    console.log('\n🎉 Authentication flow test complete!');
    console.log('📝 The login page should now:');
    console.log('   • Stay on login page when authentication fails');
    console.log('   • Show "Account not found. Please sign up first." for missing users');
    console.log('   • Only redirect to home page when login is successful');
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testAuthFlow(); 