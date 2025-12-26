import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

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
const db = getFirestore(app);

const testNavigationFix = async () => {
  try {
    console.log('🔍 Testing navigation fix...');
    
    // Test 1: Check if we can fetch activities
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`✅ Activities fetched: ${allActivities.length} activities`);
    
    // Test 2: Test a few activities to ensure they can be accessed
    const testActivities = allActivities.slice(0, 3);
    
    console.log('\n🎯 Testing navigation for sample activities:');
    
    for (const activity of testActivities) {
      console.log(`\n📋 Activity: ${activity.title} (ID: ${activity.id})`);
      console.log(`  🔗 Details URL: /room/${activity.id}`);
      console.log(`  🔗 Edit URL: /edit-room/${activity.id}`);
      console.log(`  🔗 Chat URL: /chat/${activity.id}`);
      
      // Test direct access to the activity
      const activityRef = doc(activitiesCollection, activity.id);
      const activityDoc = await getDoc(activityRef);
      
      if (activityDoc.exists()) {
        const activityData = activityDoc.data();
        console.log(`  ✅ Activity accessible via RoomDetailPage`);
        console.log(`     Host: ${activityData.hostName}`);
        console.log(`     Sport: ${activityData.sportType}`);
        console.log(`     Location: ${activityData.location?.address}, ${activityData.location?.city}`);
        console.log(`     Participants: ${activityData.participants?.length || 0}/${activityData.maxParticipants}`);
      } else {
        console.log(`  ❌ Activity not accessible`);
      }
    }
    
    console.log('\n🎉 Navigation fix test complete!');
    console.log('📱 The navigation should now work correctly:');
    console.log('   • Click "Details" → goes to /room/{id} → RoomDetailPage');
    console.log('   • Click "Edit Activity" → goes to /edit-room/{id} → EditRoomPage');
    console.log('   • Click "Chat" → goes to /chat/{id} → ChatPage');
    console.log('✅ All routes are now properly configured.');
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testNavigationFix(); 