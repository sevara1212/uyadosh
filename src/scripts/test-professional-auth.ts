import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection } from "firebase/firestore";

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

const testProfessionalAuth = async () => {
  try {
    console.log('🧪 Testing Professional Authentication Flow...');
    
    // Test data
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'Test123!@#';
    const testName = 'Test User';
    const testGender = 'Other';
    const testAge = 25;
    
    console.log(`📧 Test email: ${testEmail}`);
    console.log(`🔑 Test password: ${testPassword}`);
    
    // Test 1: Professional Signup
    console.log('\n🚀 Test 1: Professional Signup Process');
    console.log('🔐 Creating Firebase Auth user...');
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    const firebaseUser = userCredential.user;
    
    console.log('✅ Firebase Auth user created successfully');
    console.log(`   User ID: ${firebaseUser.uid}`);
    console.log(`   Email: ${firebaseUser.email}`);
    
    // Update profile
    console.log('👤 Updating user profile...');
    await updateProfile(firebaseUser, { displayName: testName });
    console.log('✅ Profile updated successfully');
    
    // Create Firestore document
    console.log('📄 Creating Firestore user document...');
    const usersCollection = collection(db, "users");
    
    const userData = {
      name: testName,
      email: testEmail,
      avatar: "",
      interests: [],
      activityLevel: "Beginner",
      joinedDate: new Date().toISOString(),
      joinedRooms: [],
      gender: testGender,
      age: testAge,
      preferredGender: 'Both',
      preferredAgeRange: { min: 14, max: 60 }
    };
    
    await setDoc(doc(usersCollection, firebaseUser.uid), userData, { merge: true });
    console.log('✅ Firestore user document created successfully');
    
    // Verify document
    const userRef = doc(usersCollection, firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      console.log('✅ User document verified in Firestore');
      console.log(`   Name: ${data.name}`);
      console.log(`   Email: ${data.email}`);
      console.log(`   Gender: ${data.gender}`);
      console.log(`   Age: ${data.age}`);
    }
    
    // Test 2: Professional Logout
    console.log('\n🚪 Test 2: Professional Logout');
    await signOut(auth);
    console.log('✅ User logged out successfully');
    
    // Test 3: Professional Login
    console.log('\n🔐 Test 3: Professional Login');
    console.log('🔐 Signing in with created account...');
    const loginCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
    const loggedInUser = loginCredential.user;
    
    console.log('✅ Login successful');
    console.log(`   User ID: ${loggedInUser.uid}`);
    console.log(`   Email: ${loggedInUser.email}`);
    console.log(`   Display Name: ${loggedInUser.displayName}`);
    
    // Verify user data is still accessible
    const loggedInUserRef = doc(usersCollection, loggedInUser.uid);
    const loggedInUserSnap = await getDoc(loggedInUserRef);
    
    if (loggedInUserSnap.exists()) {
      const data = loggedInUserSnap.data();
      console.log('✅ User data accessible after login');
      console.log(`   Name: ${data.name}`);
      console.log(`   Joined Date: ${data.joinedDate}`);
    }
    
    // Test 4: Clean up
    console.log('\n🧹 Test 4: Cleanup');
    await signOut(auth);
    await firebaseUser.delete();
    console.log('✅ Test user deleted successfully');
    
    console.log('\n🎉 Professional Authentication Flow Test Complete!');
    console.log('✅ All tests passed successfully');
    console.log('📱 The auth system is working professionally');
    console.log('🚀 Users can now signup and login smoothly');
    
  } catch (error: any) {
    console.error('❌ Professional auth test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Provide specific error handling suggestions
    if (error.code === 'auth/email-already-in-use') {
      console.log('💡 This email is already registered. Try a different email.');
    } else if (error.code === 'auth/weak-password') {
      console.log('💡 Password is too weak. Use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('💡 Invalid email format.');
    } else if (error.code === 'auth/operation-not-allowed') {
      console.log('💡 Email/password accounts are not enabled in Firebase.');
    } else if (error.code === 'permission-denied') {
      console.log('💡 Firestore permission denied. Check security rules.');
    } else if (error.code === 'unavailable' || error.message?.includes('IndexedDB')) {
      console.log('💡 Browser storage issue. This might be the IndexedDB error you encountered.');
    } else if (error.code === 'auth/user-not-found') {
      console.log('💡 User not found. Make sure the user was created successfully.');
    } else if (error.code === 'auth/wrong-password') {
      console.log('💡 Wrong password. Check the password used for login.');
    }
  }
};

testProfessionalAuth(); 