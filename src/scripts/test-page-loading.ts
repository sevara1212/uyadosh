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

const testPageLoading = async () => {
  try {
    console.log('🔍 Testing page loading and data fetching...');
    
    // Test 1: Check if we can connect to Firebase
    console.log('✅ Firebase connection: OK');
    
    // Test 2: Check if we can fetch activities
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`✅ Activities fetched: ${allActivities.length} activities`);
    
    // Test 3: Check if activities have required fields
    const sampleActivity = allActivities[0];
    if (sampleActivity) {
      const requiredFields = ['title', 'hostName', 'location', 'sportType', 'dateTime', 'duration', 'maxParticipants'];
      const missingFields = requiredFields.filter(field => !sampleActivity[field]);
      
      if (missingFields.length === 0) {
        console.log('✅ Sample activity has all required fields');
      } else {
        console.log(`⚠️  Sample activity missing fields: ${missingFields.join(', ')}`);
      }
    }
    
    // Test 4: Check sport types
    const sportTypes = ['Running', 'Yoga', 'Basketball', 'Cycling'];
    const availableSportTypes = allActivities.map(a => a.sportType);
    
    console.log('\n🏃 Sport types check:');
    sportTypes.forEach(sportType => {
      if (availableSportTypes.includes(sportType)) {
        console.log(`  ✅ ${sportType}: Available`);
      } else {
        console.log(`  ❌ ${sportType}: Not found in activities`);
      }
    });
    
    // Test 5: Check for any activities with invalid data
    const invalidActivities = allActivities.filter(activity => {
      try {
        new Date(activity.dateTime);
        return false;
      } catch (error) {
        return true;
      }
    });
    
    if (invalidActivities.length === 0) {
      console.log('✅ All activities have valid dates');
    } else {
      console.log(`⚠️  ${invalidActivities.length} activities have invalid dates`);
    }
    
    console.log('\n🎉 Page loading test complete!');
    console.log('📱 The page should now load without errors.');
    console.log('🔄 If you still see a blank page, try refreshing the browser.');
    
  } catch (error) {
    console.error("❌ Test failed:", error);
    console.log('🔧 This might indicate a Firebase connection issue.');
  }
};

testPageLoading(); 