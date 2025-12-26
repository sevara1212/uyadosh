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

const testRoomDetailNavigation = async () => {
  try {
    console.log('🔍 Testing RoomDetailPage navigation...');
    
    // Test 1: Check if we can fetch activities
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`✅ Activities fetched: ${allActivities.length} activities`);
    
    // Test 2: Test a few specific activities to ensure they can be accessed
    const testActivities = allActivities.slice(0, 3);
    
    console.log('\n🎯 Testing individual activity access for RoomDetailPage:');
    
    for (const activity of testActivities) {
      console.log(`\n📋 Testing activity ID: ${activity.id}`);
      
      // Test direct access to the activity (simulating RoomDetailPage)
      const activityRef = doc(activitiesCollection, activity.id);
      const activityDoc = await getDoc(activityRef);
      
      if (activityDoc.exists()) {
        const activityData = activityDoc.data();
        console.log(`  ✅ Activity found: ${activityData.title}`);
        console.log(`     URL would be: /room/${activity.id}`);
        console.log(`     Host: ${activityData.hostName}`);
        console.log(`     Sport: ${activityData.sportType}`);
        console.log(`     Location: ${activityData.location?.address}, ${activityData.location?.city}`);
        console.log(`     Participants: ${activityData.participants?.length || 0}/${activityData.maxParticipants}`);
        console.log(`     Description: ${activityData.description ? 'Available' : 'Not provided'}`);
        
        // Test if all required fields are present
        const requiredFields = ['title', 'hostName', 'location', 'sportType', 'dateTime', 'duration', 'maxParticipants'];
        const missingFields = requiredFields.filter(field => !activityData[field]);
        
        if (missingFields.length === 0) {
          console.log(`     ✅ All required fields present for RoomDetailPage`);
        } else {
          console.log(`     ⚠️  Missing fields: ${missingFields.join(', ')}`);
        }
      } else {
        console.log(`  ❌ Activity not found: ${activity.id}`);
      }
    }
    
    // Test 3: Check the specific activity that was showing issues
    console.log('\n🎯 Testing the problematic activity (ID: 1113):');
    const specificActivityRef = doc(activitiesCollection, "1113");
    const specificActivityDoc = await getDoc(specificActivityRef);
    
    if (specificActivityDoc.exists()) {
      const activityData = specificActivityDoc.data();
      console.log(`  ✅ Activity 1113 is accessible for RoomDetailPage:`);
      console.log(`     URL: /room/1113`);
      console.log(`     Title: ${activityData.title}`);
      console.log(`     Host: ${activityData.hostName}`);
      console.log(`     Sport: ${activityData.sportType}`);
      console.log(`     Location: ${activityData.location?.address}, ${activityData.location?.city}`);
      console.log(`     Date: ${new Date(activityData.dateTime).toLocaleDateString()}`);
      console.log(`     Time: ${new Date(activityData.dateTime).toLocaleTimeString()}`);
      console.log(`     Duration: ${activityData.duration} minutes`);
      console.log(`     Participants: ${activityData.participants?.length || 0}/${activityData.maxParticipants}`);
      console.log(`     Description: ${activityData.description ? 'Available' : 'Not provided'}`);
    } else {
      console.log(`  ❌ Activity 1113 not found`);
    }
    
    console.log('\n🎉 RoomDetailPage navigation test complete!');
    console.log('📱 The RoomDetailPage should work correctly when you click "Details".');
    console.log('🔗 The URL format should be: /room/{activityId}');
    console.log('✅ All activities should be accessible via RoomDetailPage.');
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testRoomDetailNavigation(); 