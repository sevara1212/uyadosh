import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
const auth = getAuth(app);
const db = getFirestore(app);

// Import the existing data
import { mockUsers, mockRooms } from '../data/Data';

const uploadActivities = async () => {
  try {
    console.log('🚀 Starting upload of activities from Data.ts...');
    
    // First, let's try to authenticate with a test account
    // You can create a test user in Firebase Console if needed
    console.log('🔐 Attempting to authenticate...');
    
    // For now, let's try without authentication first
    console.log('📊 Found activities to upload:', mockRooms.length);
    
    let uploadedCount = 0;
    let errorCount = 0;
    
    // Try uploading just a few activities first to test
    const testActivities = mockRooms.slice(0, 5);
    
    for (const activity of testActivities) {
      try {
        const activityId = activity.id || `activity_${uploadedCount + 1}`;
        
        console.log(`📤 Uploading activity ${activityId}...`);
        
        await setDoc(doc(collection(db, "activities_upl"), activityId), {
          ...activity,
          id: activityId,
          participants: activity.participants || [],
          approvedParticipants: activity.approvedParticipants || [],
          pendingRequests: activity.pendingRequests || [],
          price: activity.price || 0
        });
        
        uploadedCount++;
        console.log(`✅ Successfully uploaded activity ${activityId}`);
        
      } catch (uploadError: any) {
        errorCount++;
        console.log(`❌ Failed to upload activity ${activity.id}: ${uploadError.message}`);
        console.log(`   Error code: ${uploadError.code}`);
        console.log(`   Error details:`, uploadError);
      }
    }
    
    console.log(`🎉 Test upload complete!`);
    console.log(`✅ Successfully uploaded: ${uploadedCount} activities`);
    console.log(`❌ Failed to upload: ${errorCount} activities`);
    
    if (uploadedCount > 0) {
      console.log('🎯 Success! Now uploading all activities...');
      
      // If test was successful, upload all activities
      for (const activity of mockRooms.slice(5)) {
        try {
          const activityId = activity.id || `activity_${uploadedCount + 1}`;
          
          await setDoc(doc(collection(db, "activities_upl"), activityId), {
            ...activity,
            id: activityId,
            participants: activity.participants || [],
            approvedParticipants: activity.approvedParticipants || [],
            pendingRequests: activity.pendingRequests || [],
            price: activity.price || 0
          });
          
          uploadedCount++;
          
          if (uploadedCount % 20 === 0) {
            console.log(`✅ Uploaded ${uploadedCount}/${mockRooms.length} activities...`);
          }
        } catch (uploadError: any) {
          errorCount++;
          console.log(`❌ Failed to upload activity ${activity.id}: ${uploadError.message}`);
        }
      }
      
      console.log(`🎉 Final upload complete!`);
      console.log(`✅ Successfully uploaded: ${uploadedCount} activities`);
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
