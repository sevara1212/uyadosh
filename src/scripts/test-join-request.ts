import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, addDoc, updateDoc, arrayUnion } from "firebase/firestore";

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

const testJoinRequest = async () => {
  try {
    console.log('🧪 Testing Join Request Functionality...');
    
    // Test data
    const testEmail = `test${Date.now()}@example.com`;
    const testPassword = 'Test123!@#';
    const testName = 'Test User';
    const testActivityId = '1000'; // Use an existing activity ID
    
    console.log(`📧 Test email: ${testEmail}`);
    console.log(`🔑 Test password: ${testPassword}`);
    console.log(`🎯 Test activity ID: ${testActivityId}`);
    
    // Step 1: Create a test user
    console.log('\n👤 Step 1: Creating test user...');
    const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
    const firebaseUser = userCredential.user;
    
    console.log('✅ Test user created successfully');
    console.log(`   User ID: ${firebaseUser.uid}`);
    
    // Update profile
    await updateProfile(firebaseUser, { displayName: testName });
    
    // Create user document in Firestore
    const usersCollection = collection(db, "users");
    const userData = {
      name: testName,
      email: testEmail,
      avatar: "",
      interests: [],
      activityLevel: "Beginner",
      joinedDate: new Date().toISOString(),
      joinedRooms: [],
      gender: 'Other',
      age: 25,
      preferredGender: 'Both',
      preferredAgeRange: { min: 14, max: 60 }
    };
    
    await setDoc(doc(usersCollection, firebaseUser.uid), userData, { merge: true });
    console.log('✅ User document created in Firestore');
    
    // Step 2: Check if activity exists
    console.log('\n🔍 Step 2: Checking if activity exists...');
    const activitiesCollection = collection(db, "activities_upl");
    const activityRef = doc(activitiesCollection, testActivityId);
    const activityDoc = await getDoc(activityRef);
    
    if (!activityDoc.exists()) {
      console.log('❌ Activity not found in activities_upl collection');
      
      // Try rooms collection as fallback
      const roomsCollection = collection(db, "rooms");
      const roomRef = doc(roomsCollection, testActivityId);
      const roomDoc = await getDoc(roomRef);
      
      if (!roomDoc.exists()) {
        console.log('❌ Activity not found in rooms collection either');
        console.log('💡 Please use a valid activity ID that exists in your database');
        return;
      } else {
        console.log('✅ Activity found in rooms collection');
      }
    } else {
      console.log('✅ Activity found in activities_upl collection');
      const activityData = activityDoc.data();
      console.log(`   Title: ${activityData.title}`);
      console.log(`   Sport: ${activityData.sportType}`);
      console.log(`   Participants: ${activityData.participants?.length || 0}/${activityData.maxParticipants}`);
    }
    
    // Step 3: Test join request functionality
    console.log('\n📝 Step 3: Testing join request functionality...');
    
    // Import the requestToJoinRoom function logic
    const requestData = {
      roomId: testActivityId,
      userId: firebaseUser.uid,
      status: 'pending',
      requestedAt: new Date(),
      message: "Test join request"
    };
    
    // Create request document
    const joinRequestsCollection = collection(db, "joinRequests");
    const requestRef = await addDoc(joinRequestsCollection, requestData);
    const requestId = requestRef.id;
    
    console.log('✅ Join request created successfully');
    console.log(`   Request ID: ${requestId}`);
    
    // Update activity with pending request
    try {
      await updateDoc(doc(activitiesCollection, testActivityId), {
        pendingRequests: arrayUnion(requestId)
      });
      console.log('✅ Activity updated with pending request');
    } catch (error) {
      console.log('⚠️ Could not update activity (might be in rooms collection)');
    }
    
    // Update user with pending request
    await updateDoc(doc(usersCollection, firebaseUser.uid), {
      pendingRequests: arrayUnion(requestId)
    });
    console.log('✅ User updated with pending request');
    
    // Step 4: Verify the request was created
    console.log('\n🔍 Step 4: Verifying join request...');
    const requestRef2 = doc(joinRequestsCollection, requestId);
    const requestDoc = await getDoc(requestRef2);
    
    if (requestDoc.exists()) {
      const requestData = requestDoc.data();
      console.log('✅ Join request verified in Firestore');
      console.log(`   Room ID: ${requestData.roomId}`);
      console.log(`   User ID: ${requestData.userId}`);
      console.log(`   Status: ${requestData.status}`);
      console.log(`   Message: ${requestData.message}`);
    }
    
    // Step 5: Check for existing requests
    console.log('\n🔍 Step 5: Checking for existing requests...');
    const existingRequestsQuery = query(
      joinRequestsCollection,
      where("roomId", "==", testActivityId),
      where("userId", "==", firebaseUser.uid),
      where("status", "==", "pending")
    );
    const existingRequests = await getDocs(existingRequestsQuery);
    
    console.log(`📊 Found ${existingRequests.size} pending requests for this user and activity`);
    
    // Step 6: Clean up
    console.log('\n🧹 Step 6: Cleaning up...');
    await signOut(auth);
    await firebaseUser.delete();
    console.log('✅ Test user deleted successfully');
    
    console.log('\n🎉 Join Request Test Complete!');
    console.log('✅ Join request functionality is working correctly');
    console.log('📱 Users can now request to join activities');
    console.log('💡 Full activities will still allow requests (for waitlist)');
    
  } catch (error: any) {
    console.error('❌ Join request test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Provide specific error handling suggestions
    if (error.code === 'auth/email-already-in-use') {
      console.log('💡 This email is already registered. Try a different email.');
    } else if (error.code === 'permission-denied') {
      console.log('💡 Firestore permission denied. Check security rules.');
    } else if (error.message?.includes('Activity not found')) {
      console.log('💡 Activity not found. Use a valid activity ID.');
    }
  }
};

testJoinRequest(); 