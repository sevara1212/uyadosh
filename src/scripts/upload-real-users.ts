import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";
import { mockUsers } from "../data/Data";

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

const uploadRealUsers = async () => {
  try {
    console.log('🚀 Starting upload of real users to Firebase...');
    console.log(`📊 Found ${mockUsers.length} users in Data.ts`);

    let uploadedCount = 0;
    let errorCount = 0;

    for (const user of mockUsers) {
      try {
        // Add missing fields that are required by the User type
        const userData = {
          ...user,
          email: user.email || `${user.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          joinedRooms: user.joinedRooms || [],
          pendingRequests: user.pendingRequests || [],
          preferredGender: user.preferredGender || 'Both',
          preferredAgeRange: user.preferredAgeRange || { min: 14, max: 60 },
          age: user.age || 25
        };

        await setDoc(doc(collection(db, "users"), user.id), userData);
        uploadedCount++;
        
        if (uploadedCount % 20 === 0) {
          console.log(`✅ Uploaded ${uploadedCount}/${mockUsers.length} users...`);
        }
      } catch (uploadError: any) {
        errorCount++;
        console.log(`❌ Failed to upload user ${user.id}: ${uploadError.message}`);
      }
    }

    console.log(`🎉 Upload complete!`);
    console.log(`✅ Successfully uploaded: ${uploadedCount} users`);
    if (errorCount > 0) {
      console.log(`❌ Failed to upload: ${errorCount} users`);
    }
    
    await verifyUpload(uploadedCount);
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
};

const verifyUpload = async (expectedCount: number) => {
  try {
    const snap = await getDocs(collection(db, "users"));
    console.log(`✅ Verification: ${snap.size} users found in Firestore`);
    
    if (snap.size >= expectedCount) {
      console.log("🎯 Users present in Firestore.");
      
      // Show sample of uploaded users
      console.log('📋 Sample uploaded users:');
      snap.docs.slice(0, 5).forEach((doc, index) => {
        const data = doc.data();
        console.log(`  ${index + 1}. ID: ${doc.id}, Name: ${data.name}`);
      });
    } else {
      console.log(`⚠️  Warning: Expected at least ${expectedCount} but found ${snap.size} users`);
    }
  } catch (error) {
    console.error("❌ Verification failed:", error);
  }
};

uploadRealUsers();
