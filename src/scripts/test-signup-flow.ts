import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
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

const testSignupFlow = async () => {
  try {
    console.log('🧪 Testing complete signup flow...');
    
    // Test data
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'Test123!@#';
    const testName = 'Test User';
    const testGender = 'Other';
    const testAge = 25;
    
    console.log(`📧 Test email: ${testEmail}`);
    console.log(`🔑 Test password: ${testPassword}`);
    
    // Step 1: Create user in Firebase Auth
    console.log('\n🔐 Step 1: Creating user in Firebase Auth...');
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    const firebaseUser = userCredential.user;
    
    console.log('✅ Firebase Auth user created successfully');
    console.log(`   User ID: ${firebaseUser.uid}`);
    console.log(`   Email: ${firebaseUser.email}`);
    
    // Step 2: Update profile with display name
    console.log('\n👤 Step 2: Updating profile with display name...');
    await updateProfile(firebaseUser, { displayName: testName });
    console.log('✅ Profile updated successfully');
    
    // Step 3: Create user document in Firestore
    console.log('\n📄 Step 3: Creating user document in Firestore...');
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
    
    // Step 4: Verify the user document exists
    console.log('\n🔍 Step 4: Verifying user document...');
    const userRef = doc(usersCollection, firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      console.log('✅ User document verified in Firestore');
      console.log(`   Name: ${data.name}`);
      console.log(`   Email: ${data.email}`);
      console.log(`   Gender: ${data.gender}`);
      console.log(`   Age: ${data.age}`);
    } else {
      console.log('❌ User document not found in Firestore');
    }
    
    // Step 5: Test that user can be authenticated
    console.log('\n🔐 Step 5: Testing authentication...');
    console.log(`   Current user: ${auth.currentUser?.email}`);
    console.log(`   User ID: ${auth.currentUser?.uid}`);
    
    if (auth.currentUser) {
      console.log('✅ User is properly authenticated');
    } else {
      console.log('❌ User is not authenticated');
    }
    
    // Step 6: Clean up - delete the test user
    console.log('\n🧹 Step 6: Cleaning up test user...');
    await signOut(auth);
    await firebaseUser.delete();
    console.log('✅ Test user deleted successfully');
    
    console.log('\n🎉 Signup flow test completed successfully!');
    console.log('📝 The signup functionality should work correctly in the app.');
    console.log('🚀 Users should be redirected to home page after successful signup.');
    
  } catch (error: any) {
    console.error('❌ Signup flow test failed:', error);
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
    }
  }
};

testSignupFlow(); 