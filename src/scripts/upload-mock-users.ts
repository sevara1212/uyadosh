import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";

// Firebase configuration - current project
const firebaseConfig = {
  apiKey: "AIzaSyBxg0WUelyJFWGW6xIhBKG-Pgr40GDTfWY",
  authDomain: "fitness-4fc9f.firebaseapp.com",
  projectId: "fitness-4fc9f",
  storageBucket: "fitness-4fc9f.firebasestorage.app",
  messagingSenderId: "561160631634",
  appId: "1:561160631634:web:1501cd56f2507c57f3f68b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create mock users for the activities
const createMockUsers = () => {
  const users = [] as any[];
  for (let i = 0; i < 200; i++) {
    users.push({
      id: `user${i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i % 100}.jpg`,
      interests: ['Running', 'Gym', 'Tennis'],
      activityLevel: 'Intermediate',
      joinedDate: new Date().toISOString(),
      bio: `I'm User ${i}, passionate about fitness and sports!`,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      age: 20 + (i % 40),
      joinedRooms: [],
      pendingRequests: []
    });
  }
  return users;
};

const uploadMockUsers = async () => {
  try {
    console.log('🚀 Starting upload of mock users to Firebase...');
    const users = createMockUsers();
    console.log(`📊 Generated ${users.length} users to upload`);

    let uploadedCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        await setDoc(doc(collection(db, "users"), user.id), user);
        uploadedCount++;
        if (uploadedCount % 20 === 0) {
          console.log(`✅ Uploaded ${uploadedCount}/${users.length} users...`);
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
    } else {
      console.log(`⚠️  Warning: Expected at least ${expectedCount} but found ${snap.size} users`);
    }
  } catch (error) {
    console.error("❌ Verification failed:", error);
  }
};

uploadMockUsers(); 