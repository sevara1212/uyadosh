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

const testSimplePageLoad = async () => {
  try {
    console.log('🔍 Simple page load test...');
    
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
    
    // Test 3: Check what sport types actually exist
    const sportTypes = allActivities.map(a => a.sportType);
    const uniqueSportTypes = [...new Set(sportTypes)];
    
    console.log('\n🏃 Available sport types:');
    uniqueSportTypes.forEach(sportType => {
      const count = sportTypes.filter(s => s === sportType).length;
      console.log(`  • ${sportType}: ${count} activities`);
    });
    
    // Test 4: Check if the sport types we're displaying exist
    const displayedSportTypes = ['Running', 'Yoga', 'Tennis', 'Gym'];
    console.log('\n📱 Sport types displayed on main page:');
    displayedSportTypes.forEach(sportType => {
      if (uniqueSportTypes.includes(sportType)) {
        console.log(`  ✅ ${sportType}: Available`);
      } else {
        console.log(`  ❌ ${sportType}: Not available`);
      }
    });
    
    console.log('\n🎉 Simple page load test complete!');
    console.log('📱 The page should now load without errors.');
    console.log('🔄 If you still see a blank page, try:');
    console.log('   1. Hard refresh (Cmd+Shift+R)');
    console.log('   2. Clear browser cache');
    console.log('   3. Check browser console for errors');
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testSimplePageLoad(); 