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

const testDateFiltering = async () => {
  try {
    console.log('🔍 Testing date filtering logic...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    const now = new Date();
    console.log('📅 Current time:', now.toISOString());
    
    let upcomingCount = 0;
    let pastCount = 0;
    
    querySnapshot.docs.slice(0, 10).forEach((doc, index) => {
      const data = doc.data();
      const activityDate = new Date(data.dateTime);
      const isUpcoming = activityDate > now;
      
      console.log(`${index + 1}. ${data.title}`);
      console.log(`   Date: ${data.dateTime}`);
      console.log(`   Parsed: ${activityDate.toISOString()}`);
      console.log(`   Is upcoming: ${isUpcoming}`);
      console.log('');
      
      if (isUpcoming) {
        upcomingCount++;
      } else {
        pastCount++;
      }
    });
    
    console.log(`📊 Summary: ${upcomingCount} upcoming, ${pastCount} past (from first 10 activities)`);
    
    // Test the exact filtering logic from the app
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const filteredUpcoming = allActivities.filter(activity => {
      const isUpcoming = new Date(activity.dateTime) > now;
      return isUpcoming;
    });
    
    console.log(`🎯 Total activities: ${allActivities.length}`);
    console.log(`✅ Upcoming activities: ${filteredUpcoming.length}`);
    
  } catch (error) {
    console.error("❌ Error testing date filtering:", error);
  }
};

testDateFiltering(); 