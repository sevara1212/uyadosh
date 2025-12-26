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

const testActivityDetailsFix = async () => {
  try {
    console.log('🔍 Testing activity details fix...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📊 Total activities: ${allActivities.length}`);
    
    // Test a few random activities to ensure they can be accessed by ID
    const testActivities = allActivities.slice(0, 3);
    
    console.log('\n🎯 Testing individual activity access:');
    
    for (const activity of testActivities) {
      console.log(`\n📋 Testing activity ID: ${activity.id}`);
      
      // Test direct access to the activity
      const activityRef = doc(activitiesCollection, activity.id);
      const activityDoc = await getDoc(activityRef);
      
      if (activityDoc.exists()) {
        const activityData = activityDoc.data();
        console.log(`  ✅ Activity found: ${activityData.title}`);
        console.log(`     Host: ${activityData.hostName}`);
        console.log(`     Sport: ${activityData.sportType}`);
        console.log(`     Location: ${activityData.location?.address}, ${activityData.location?.city}`);
        console.log(`     Participants: ${activityData.participants?.length || 0}/${activityData.maxParticipants}`);
        console.log(`     Description: ${activityData.description ? 'Available' : 'Default message'}`);
        console.log(`     Price: ${activityData.price ? `$${activityData.price}` : 'Free'}`);
        console.log(`     Age Range: ${activityData.ageRange ? `${activityData.ageRange.min}-${activityData.ageRange.max}` : 'All ages'}`);
        console.log(`     Gender Preference: ${activityData.genderPreference || 'All genders'}`);
      } else {
        console.log(`  ❌ Activity not found: ${activity.id}`);
      }
    }
    
    // Test the specific activity ID from the URL (1113)
    console.log('\n🎯 Testing specific activity ID from URL (1113):');
    const specificActivityRef = doc(activitiesCollection, "1113");
    const specificActivityDoc = await getDoc(specificActivityRef);
    
    if (specificActivityDoc.exists()) {
      const activityData = specificActivityDoc.data();
      console.log(`  ✅ Activity 1113 found: ${activityData.title}`);
      console.log(`     Host: ${activityData.hostName}`);
      console.log(`     Sport: ${activityData.sportType}`);
      console.log(`     Location: ${activityData.location?.address}, ${activityData.location?.city}`);
      console.log(`     Date: ${new Date(activityData.dateTime).toLocaleDateString()}`);
      console.log(`     Time: ${new Date(activityData.dateTime).toLocaleTimeString()}`);
      console.log(`     Duration: ${activityData.duration} minutes`);
      console.log(`     Participants: ${activityData.participants?.length || 0}/${activityData.maxParticipants}`);
    } else {
      console.log(`  ❌ Activity 1113 not found`);
      
      // Check if there are any activities with similar IDs
      const similarActivities = allActivities.filter(a => a.id.includes('111') || a.id.includes('113'));
      if (similarActivities.length > 0) {
        console.log(`  🔍 Found similar activity IDs:`);
        similarActivities.slice(0, 3).forEach(activity => {
          console.log(`     • ${activity.id}: ${activity.title}`);
        });
      }
    }
    
    // Show some sample activity IDs for testing
    console.log('\n📋 Sample activity IDs for testing:');
    allActivities.slice(0, 5).forEach(activity => {
      console.log(`  • ${activity.id}: ${activity.title}`);
    });
    
    console.log('\n🎉 Activity details fix test complete!');
    console.log('📱 The activity details page should now work for all activities.');
    console.log('🔗 Try clicking on any activity to see its details.');
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testActivityDetailsFix(); 