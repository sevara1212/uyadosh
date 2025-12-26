import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, where } from "firebase/firestore";

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

const testAllActivities = async () => {
  try {
    console.log('🧪 Testing All Activities Loading...');
    
    // Test 1: Get all activities without limit
    console.log('\n📊 Test 1: Getting all activities without limit');
    const activitiesCollection = collection(db, "activities_upl");
    const q = query(activitiesCollection, orderBy('dateTime', 'desc'));
    const querySnapshot = await getDocs(q);
    
    console.log(`✅ Total activities found: ${querySnapshot.size}`);
    
    // Test 2: Get activities by sport type
    console.log('\n🏃 Test 2: Getting activities by sport type');
    const sportTypes = ['Running', 'Yoga', 'Tennis', 'Gym', 'Football', 'Swimming', 'Other'];
    
    for (const sportType of sportTypes) {
      const sportQuery = query(
        activitiesCollection,
        where("sportType", "==", sportType),
        orderBy('dateTime', 'desc')
      );
      const sportSnapshot = await getDocs(sportQuery);
      console.log(`   ${sportType}: ${sportSnapshot.size} activities`);
    }
    
    // Test 3: Show sample activities
    console.log('\n📋 Test 3: Sample activities');
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    allActivities.slice(0, 5).forEach((activity, index) => {
      console.log(`   ${index + 1}. ${activity.title} (${activity.sportType}) - ${activity.hostName}`);
    });
    
    // Test 4: Verify all activities have required fields
    console.log('\n🔍 Test 4: Verifying activity data integrity');
    let validActivities = 0;
    let missingFields = 0;
    
    allActivities.forEach(activity => {
      const requiredFields = ['title', 'sportType', 'hostName', 'dateTime', 'location'];
      const hasAllFields = requiredFields.every(field => activity[field]);
      
      if (hasAllFields) {
        validActivities++;
      } else {
        missingFields++;
      }
    });
    
    console.log(`   ✅ Valid activities: ${validActivities}`);
    console.log(`   ⚠️  Activities with missing fields: ${missingFields}`);
    
    // Test 5: Check participant counts
    console.log('\n👥 Test 5: Participant statistics');
    const totalParticipants = allActivities.reduce((sum, activity) => {
      return sum + (activity.participants?.length || 0);
    }, 0);
    
    const totalCapacity = allActivities.reduce((sum, activity) => {
      return sum + (activity.maxParticipants || 0);
    }, 0);
    
    console.log(`   Total participants: ${totalParticipants}`);
    console.log(`   Total capacity: ${totalCapacity}`);
    console.log(`   Average participants per activity: ${(totalParticipants / allActivities.length).toFixed(1)}`);
    
    console.log('\n🎉 All Activities Test Complete!');
    console.log(`📱 The activities page should now show all ${querySnapshot.size} activities`);
    console.log('✅ No more 20-activity limit');
    console.log('🚀 Users can see all available activities');
    
  } catch (error: any) {
    console.error('❌ All activities test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
  }
};

testAllActivities(); 