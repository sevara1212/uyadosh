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

const checkUsers = async () => {
  try {
    console.log('🔍 Checking users collection...');
    
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);
    
    console.log(`📊 Found ${querySnapshot.size} users in collection`);
    
    if (querySnapshot.size > 0) {
      console.log('📋 Sample users:');
      querySnapshot.docs.slice(0, 5).forEach((doc, index) => {
        const data = doc.data();
        console.log(`  ${index + 1}. ID: ${doc.id}, Name: ${data.name || 'N/A'}`);
      });
    } else {
      console.log('❌ No users found in the users collection');
    }
    
  } catch (error) {
    console.error("❌ Error checking users:", error);
  }
};

checkUsers(); 