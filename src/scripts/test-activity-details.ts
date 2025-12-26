import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

const testActivityDetails = async () => {
  try {
    console.log('🔍 Testing activity details for all activities...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📊 Total activities: ${allActivities.length}`);
    
    // Check what fields are available
    const sampleActivity = allActivities[0];
    console.log('\n📋 Sample activity fields:');
    console.log(Object.keys(sampleActivity));
    
    // Check specific fields
    const fieldStats = {
      hasDescription: 0,
      hasPrice: 0,
      hasAgeRange: 0,
      hasGenderPreference: 0,
      hasHostName: 0,
      hasLocationLink: 0,
      hasParticipants: 0,
      hasApprovedParticipants: 0,
      hasPendingRequests: 0
    };
    
    allActivities.forEach(activity => {
      if (activity.description) fieldStats.hasDescription++;
      if (activity.price) fieldStats.hasPrice++;
      if (activity.ageRange) fieldStats.hasAgeRange++;
      if (activity.genderPreference) fieldStats.hasGenderPreference++;
      if (activity.hostName) fieldStats.hasHostName++;
      if (activity.location?.locationLink) fieldStats.hasLocationLink++;
      if (activity.participants && activity.participants.length > 0) fieldStats.hasParticipants++;
      if (activity.approvedParticipants && activity.approvedParticipants.length > 0) fieldStats.hasApprovedParticipants++;
      if (activity.pendingRequests && activity.pendingRequests.length > 0) fieldStats.hasPendingRequests++;
    });
    
    console.log('\n📈 Field availability statistics:');
    Object.entries(fieldStats).forEach(([field, count]) => {
      const percentage = ((count / allActivities.length) * 100).toFixed(1);
      console.log(`  • ${field}: ${count}/${allActivities.length} (${percentage}%)`);
    });
    
    // Show detailed examples
    console.log('\n🎯 Detailed examples of different activity types:');
    
    // Find activities with different sport types
    const sportTypes = ['Running', 'Tennis', 'Gym', 'Other', 'Yoga', 'Basketball', 'Football', 'Swimming', 'Cycling'];
    
    sportTypes.forEach(sportType => {
      const activity = allActivities.find(a => a.sportType === sportType);
      if (activity) {
        console.log(`\n🏃 ${sportType} Activity Example:`);
        console.log(`  Title: ${activity.title}`);
        console.log(`  Host: ${activity.hostName || 'Unknown'}`);
        console.log(`  Date: ${activity.dateTime}`);
        console.log(`  Location: ${activity.location?.address}, ${activity.location?.city}`);
        console.log(`  Participants: ${activity.participants?.length || 0}/${activity.maxParticipants}`);
        console.log(`  Description: ${activity.description ? 'Yes' : 'No'}`);
        console.log(`  Price: ${activity.price ? `$${activity.price}` : 'Free'}`);
        console.log(`  Age Range: ${activity.ageRange ? `${activity.ageRange.min}-${activity.ageRange.max}` : 'Not specified'}`);
        console.log(`  Gender Preference: ${activity.genderPreference || 'Any'}`);
      }
    });
    
    // Check for activities with missing critical data
    const activitiesWithIssues = allActivities.filter(activity => {
      return !activity.hostName || !activity.title || !activity.location;
    });
    
    if (activitiesWithIssues.length > 0) {
      console.log(`\n⚠️  Activities with missing critical data: ${activitiesWithIssues.length}`);
      activitiesWithIssues.slice(0, 3).forEach(activity => {
        console.log(`  • ${activity.id}: missing ${!activity.hostName ? 'hostName' : ''} ${!activity.title ? 'title' : ''} ${!activity.location ? 'location' : ''}`);
      });
    } else {
      console.log('\n✅ All activities have critical data (hostName, title, location)');
    }
    
    console.log('\n🎉 Activity details test complete!');
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testActivityDetails(); 