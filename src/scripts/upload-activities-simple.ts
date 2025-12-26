import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';

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

// Import the existing data
import { mockUsers, mockRooms } from '../data/Data';

const uploadActivities = async () => {
  try {
    console.log('🚀 Starting upload of activities from Data.ts...');
    
    // Use the existing mockRooms data
    const activities = mockRooms;
    
    console.log(`📊 Found ${activities.length} activities to upload`);
    
    let uploadedCount = 0;
    let errorCount = 0;
    
    for (const activity of activities) {
      try {
        // Use the activity's existing ID or generate a new one
        const activityId = activity.id || `activity_${uploadedCount + 1}`;
        
        await setDoc(doc(collection(db, "activities_upl"), activityId), {
          ...activity,
          id: activityId,
          // Ensure all required fields are present
          participants: activity.participants || [],
          approvedParticipants: activity.approvedParticipants || [],
          pendingRequests: activity.pendingRequests || [],
          price: activity.price || 0
        });
        
        uploadedCount++;
        
        if (uploadedCount % 10 === 0) {
          console.log(`✅ Uploaded ${uploadedCount}/${activities.length} activities...`);
        }
      } catch (uploadError) {
        errorCount++;
        console.log(`❌ Failed to upload activity ${activity.id}: ${uploadError.message}`);
      }
    }
    
    console.log(`🎉 Upload complete!`);
    console.log(`✅ Successfully uploaded: ${uploadedCount} activities`);
    if (errorCount > 0) {
      console.log(`❌ Failed to upload: ${errorCount} activities`);
    }
    
    // Verify the upload
    try {
      const snap = await getDocs(collection(db, "activities_upl"));
      console.log(`✅ Verification: ${snap.size} activities found in Firestore`);
    } catch (error) {
      console.error("❌ Verification failed:", error);
    }
    
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
};

// Run the upload
uploadActivities();
