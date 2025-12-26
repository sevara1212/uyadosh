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

const testBrowserFetch = async () => {
  try {
    console.log('🔍 Testing browser-compatible activities fetch...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    console.log(`📊 Found ${querySnapshot.size} activities in browser environment`);
    
    if (querySnapshot.size > 0) {
      const firstActivity = querySnapshot.docs[0].data();
      console.log('📋 First activity in browser:', {
        id: querySnapshot.docs[0].id,
        title: firstActivity.title,
        dateTime: firstActivity.dateTime,
        sportType: firstActivity.sportType
      });
      
      // Test if we can access the activities collection from the browser
      console.log('✅ Browser can access activities collection successfully');
    }
    
  } catch (error) {
    console.error("❌ Error in browser fetch test:", error);
  }
};

testBrowserFetch(); 