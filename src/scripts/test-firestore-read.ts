import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxg0WUelyJFWGW6xIhBKG-Pgr40GDTfWY",
  authDomain: "fitness-4fc9f.firebaseapp.com",
  projectId: "fitness-4fc9f",
  storageBucket: "fitness-4fc9f.firebasestorage.app",
  messagingSenderId: "561160631634",
  appId: "1:561160631634:web:1501cd56f2507c57f3f68b",
  measurementId: "G-DQY23JVM5M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const testFirestoreRead = async () => {
  try {
    console.log('🔍 Testing Firestore read access...');
    
    // Try to read from the activities_upl collection
    const querySnapshot = await getDocs(collection(db, "activities_upl"));
    
    console.log(`✅ Successfully read from Firestore!`);
    console.log(`📊 Found ${querySnapshot.size} documents in activities_upl collection`);
    
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        console.log(`📄 Document ${doc.id}:`, doc.data());
      });
    } else {
      console.log('📝 No documents found. You can add documents manually through Firebase Console.');
    }
    
  } catch (error: any) {
    console.error("❌ Read test failed:", error.message);
    console.error("   Error code:", error.code);
  }
};

testFirestoreRead();
