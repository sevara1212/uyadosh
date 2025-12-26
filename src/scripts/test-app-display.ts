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

const testAppDisplay = async () => {
  try {
    console.log('🎯 Testing app display with real names...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    console.log(`📊 Total activities: ${querySnapshot.size}`);
    
    // Check a few sample activities
    const sampleActivities = querySnapshot.docs.slice(0, 3);
    
    console.log('📋 Sample activities for app display:');
    sampleActivities.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  ${index + 1}. ${data.title}`);
      console.log(`     Host ID: ${data.hostId}`);
      console.log(`     Host Name: ${data.hostName || 'NOT SET'}`);
      console.log(`     Sport: ${data.sportType}`);
      console.log(`     Date: ${data.dateTime}`);
      console.log('');
    });
    
    // Check if all activities have hostName
    const activitiesWithHostName = querySnapshot.docs.filter(doc => {
      const data = doc.data();
      return data.hostName && data.hostName !== 'NOT SET';
    });
    
    console.log(`✅ Activities with host names: ${activitiesWithHostName.length}/${querySnapshot.size}`);
    
    if (activitiesWithHostName.length === querySnapshot.size) {
      console.log('🎉 SUCCESS! All activities have real host names!');
      console.log('📱 The app should now display real names instead of "user103", "user111", etc.');
    } else {
      console.log('⚠️  Some activities are missing host names.');
    }
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testAppDisplay(); 