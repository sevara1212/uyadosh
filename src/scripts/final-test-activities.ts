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

const finalTest = async () => {
  try {
    console.log('🎯 Final test - checking activities with real names...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    console.log(`📊 Total activities: ${querySnapshot.size}`);
    
    // Check a few sample activities
    const sampleActivities = querySnapshot.docs.slice(0, 5);
    
    console.log('📋 Sample activities with real names:');
    sampleActivities.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  ${index + 1}. ${data.title}`);
      console.log(`     Host: ${data.hostName || data.hostId}`);
      console.log(`     Date: ${data.dateTime}`);
      console.log(`     Sport: ${data.sportType}`);
      console.log('');
    });
    
    // Check if activities are upcoming
    const now = new Date();
    const upcomingActivities = querySnapshot.docs.filter(doc => {
      const data = doc.data();
      return new Date(data.dateTime) > now;
    });
    
    console.log(`✅ Upcoming activities: ${upcomingActivities.length}/${querySnapshot.size}`);
    
    if (upcomingActivities.length > 0) {
      console.log('🎉 SUCCESS! Activities are ready to display in the app!');
      console.log('📱 You should now see activities in both Explore and Activities pages.');
    } else {
      console.log('⚠️  All activities are in the past. Consider updating dates.');
    }
    
  } catch (error) {
    console.error("❌ Final test failed:", error);
  }
};

finalTest(); 