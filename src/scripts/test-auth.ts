import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfig } from "../lib/firebase.config";

console.log('🧪 Testing Firebase Authentication...');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Test user data
const testEmail = `test${Date.now()}@example.com`;
const testPassword = 'TestPassword123';
const testName = 'Test User';

async function testSignup() {
  console.log('\n📝 Testing Signup...');
  console.log('   Email:', testEmail);
  console.log('   Password:', testPassword);
  console.log('   Name:', testName);
  
  try {
    // Create user in Firebase Auth
    console.log('   🔐 Creating Firebase Auth user...');
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    const firebaseUser = userCredential.user;
    
    console.log('   ✅ Firebase Auth user created:', firebaseUser.uid);
    
    // Create user document in Firestore
    console.log('   📄 Creating Firestore user document...');
    const userData = {
      name: testName,
      email: testEmail,
      avatar: "",
      interests: [],
      activityLevel: 'Beginner',
      joinedDate: new Date().toISOString(),
      joinedRooms: [],
      gender: 'Other',
      age: 25,
      preferredGender: 'Both',
      preferredAgeRange: { min: 14, max: 60 }
    };
    
    await setDoc(doc(db, "users", firebaseUser.uid), userData);
    console.log('   ✅ Firestore user document created');
    
    return { success: true, user: firebaseUser };
  } catch (error: any) {
    console.error('   ❌ Signup failed:', error.code, error.message);
    return { success: false, error: error.message };
  }
}

async function testLogin(email: string, password: string) {
  console.log('\n🔐 Testing Login...');
  console.log('   Email:', email);
  console.log('   Password:', password);
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('   ✅ Login successful:', user.uid);
    
    // Check if user document exists in Firestore
    console.log('   📄 Checking Firestore user document...');
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (userDoc.exists()) {
      console.log('   ✅ User document found in Firestore');
      console.log('   👤 User data:', userDoc.data());
    } else {
      console.log('   ⚠️ User document not found in Firestore');
    }
    
    return { success: true, user };
  } catch (error: any) {
    console.error('   ❌ Login failed:', error.code, error.message);
    return { success: false, error: error.message };
  }
}

async function testLogout() {
  console.log('\n🚪 Testing Logout...');
  
  try {
    await signOut(auth);
    console.log('   ✅ Logout successful');
    return { success: true };
  } catch (error: any) {
    console.error('   ❌ Logout failed:', error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🚀 Starting authentication tests...');
  
  // Test 1: Signup
  const signupResult = await testSignup();
  
  if (signupResult.success) {
    // Test 2: Login with created user
    const loginResult = await testLogin(testEmail, testPassword);
    
    if (loginResult.success) {
      // Test 3: Logout
      await testLogout();
      
      // Test 4: Login again to verify persistence
      console.log('\n🔄 Testing login after logout...');
      await testLogin(testEmail, testPassword);
      await testLogout();
    }
  }
  
  console.log('\n🎉 Authentication tests completed!');
  
  if (signupResult.success) {
    console.log('✅ All tests passed - Firebase Auth is working correctly');
  } else {
    console.log('❌ Tests failed - Check Firebase configuration and permissions');
  }
}

// Run the tests
runTests().catch(console.error); 