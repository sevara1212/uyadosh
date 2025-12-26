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

const testActivitiesFetch = async () => {
  try {
    console.log('🔍 Testing activities fetch...');
    
    // Test 1: Direct Firestore fetch
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    console.log(`📊 Found ${querySnapshot.size} activities in Firestore`);
    
    if (querySnapshot.size > 0) {
      const firstActivity = querySnapshot.docs[0].data();
      console.log('📋 First activity sample:', {
        id: querySnapshot.docs[0].id,
        title: firstActivity.title,
        dateTime: firstActivity.dateTime,
        sportType: firstActivity.sportType,
        hostId: firstActivity.hostId,
        participants: firstActivity.participants?.length || 0
      });
      
      // Check date format
      const activityDate = new Date(firstActivity.dateTime);
      const now = new Date();
      console.log('📅 Date comparison:');
      console.log('  Activity date:', activityDate);
      console.log('  Current date:', now);
      console.log('  Is upcoming:', activityDate > now);
      
      // Check a few more activities
      const upcomingActivities = querySnapshot.docs.filter(doc => {
        const data = doc.data();
        return new Date(data.dateTime) > now;
      });
      
      console.log(`✅ Found ${upcomingActivities.length} upcoming activities`);
      
      if (upcomingActivities.length > 0) {
        console.log('📋 Sample upcoming activities:');
        upcomingActivities.slice(0, 3).forEach((doc, index) => {
          const data = doc.data();
          console.log(`  ${index + 1}. ${data.title} - ${data.dateTime}`);
        });
      }
    }
    
  } catch (error) {
    console.error("❌ Error testing activities fetch:", error);
  }
};

testActivitiesFetch(); 