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

const testDetailedActivityView = async () => {
  try {
    console.log('🔍 Testing detailed activity view for all activities...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📊 Total activities: ${allActivities.length}`);
    
    // Test a few random activities to ensure details work
    const testActivities = allActivities.slice(0, 5);
    
    console.log('\n🎯 Testing detailed view for sample activities:');
    
    testActivities.forEach((activity, index) => {
      console.log(`\n${index + 1}. ${activity.title}`);
      console.log(`   Sport: ${activity.sportType}`);
      console.log(`   Host: ${activity.hostName}`);
      console.log(`   Date: ${new Date(activity.dateTime).toLocaleDateString()}`);
      console.log(`   Time: ${new Date(activity.dateTime).toLocaleTimeString()}`);
      console.log(`   Duration: ${activity.duration} minutes`);
      console.log(`   Location: ${activity.location.address}, ${activity.location.city}`);
      console.log(`   Participants: ${activity.participants?.length || 0}/${activity.maxParticipants}`);
      console.log(`   Description: ${activity.description ? 'Available' : 'Default message'}`);
      console.log(`   Price: ${activity.price ? `$${activity.price}` : 'Free'}`);
      console.log(`   Age Range: ${activity.ageRange ? `${activity.ageRange.min}-${activity.ageRange.max}` : 'All ages'}`);
      console.log(`   Gender Preference: ${activity.genderPreference || 'All genders'}`);
      console.log(`   Coordinates: ${activity.location.lat ? `(${activity.location.lat.toFixed(4)}, ${activity.location.lng.toFixed(4)})` : 'Not available'}`);
      
      // Check if all required fields are present
      const requiredFields = ['title', 'hostName', 'location', 'description', 'sportType', 'dateTime', 'duration', 'maxParticipants'];
      const missingFields = requiredFields.filter(field => !activity[field]);
      
      if (missingFields.length > 0) {
        console.log(`   ⚠️  Missing fields: ${missingFields.join(', ')}`);
      } else {
        console.log(`   ✅ All required fields present`);
      }
    });
    
    // Check for activities with missing critical data
    const activitiesWithIssues = allActivities.filter(activity => {
      return !activity.hostName || !activity.title || !activity.location || !activity.description;
    });
    
    if (activitiesWithIssues.length > 0) {
      console.log(`\n⚠️  Activities with missing critical data: ${activitiesWithIssues.length}`);
      activitiesWithIssues.slice(0, 3).forEach(activity => {
        console.log(`  • ${activity.id}: missing ${!activity.hostName ? 'hostName' : ''} ${!activity.title ? 'title' : ''} ${!activity.location ? 'location' : ''} ${!activity.description ? 'description' : ''}`);
      });
    } else {
      console.log('\n✅ All activities have complete critical data!');
    }
    
    // Test sport type distribution
    const sportTypeCounts = {};
    allActivities.forEach(activity => {
      sportTypeCounts[activity.sportType] = (sportTypeCounts[activity.sportType] || 0) + 1;
    });
    
    console.log('\n🏃 Sport type distribution:');
    Object.entries(sportTypeCounts).forEach(([sport, count]) => {
      console.log(`  • ${sport}: ${count} activities`);
    });
    
    // Test location distribution
    const cityCounts = {};
    allActivities.forEach(activity => {
      const city = activity.location?.city || 'Unknown';
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });
    
    console.log('\n📍 Location distribution:');
    Object.entries(cityCounts).forEach(([city, count]) => {
      console.log(`  • ${city}: ${count} activities`);
    });
    
    console.log('\n🎉 Detailed activity view test complete!');
    console.log('📱 All activities should now display complete details in the app.');
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testDetailedActivityView(); 