import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore';

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
    console.log('🚀 Starting direct upload of activities...');
    console.log(`📊 Found ${mockRooms.length} activities to upload`);
    
    let uploadedCount = 0;
    let errorCount = 0;
    
    // Try uploading in smaller batches
    const batchSize = 10;
    const totalBatches = Math.ceil(mockRooms.length / batchSize);
    
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const startIndex = batchIndex * batchSize;
      const endIndex = Math.min(startIndex + batchSize, mockRooms.length);
      const activitiesBatch = mockRooms.slice(startIndex, endIndex);
      
      console.log(`📦 Processing batch ${batchIndex + 1}/${totalBatches} (activities ${startIndex + 1}-${endIndex})`);
      
      // Use writeBatch for better performance
      const firestoreBatch = writeBatch(db);
      
      for (const activity of activitiesBatch) {
        try {
          const activityId = activity.id || `activity_${startIndex + uploadedCount + 1}`;
          const docRef = doc(collection(db, "activities_upl"), activityId);
          
          firestoreBatch.set(docRef, {
            ...activity,
            id: activityId,
            participants: activity.participants || [],
            approvedParticipants: activity.approvedParticipants || [],
            pendingRequests: activity.pendingRequests || [],
            price: activity.price || 0
          });
          
        } catch (error) {
          errorCount++;
          console.log(`❌ Error preparing activity ${activity.id}: ${error}`);
        }
      }
      
      try {
        // Commit the batch
        await firestoreBatch.commit();
        uploadedCount += activitiesBatch.length;
        console.log(`✅ Successfully uploaded batch ${batchIndex + 1} (${activitiesBatch.length} activities)`);
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (batchError: any) {
        errorCount += activitiesBatch.length;
        console.log(`❌ Batch ${batchIndex + 1} failed: ${batchError.message}`);
        console.log(`   Error code: ${batchError.code}`);
        
        // If batch fails, try individual uploads
        console.log('🔄 Trying individual uploads for this batch...');
        for (const activity of activitiesBatch) {
          try {
            const activityId = activity.id || `activity_${startIndex + uploadedCount + 1}`;
            
            await setDoc(doc(collection(db, "activities_upl"), activityId), {
              ...activity,
              id: activityId,
              participants: activity.participants || [],
              approvedParticipants: activity.approvedParticipants || [],
              pendingRequests: activity.pendingRequests || [],
              price: activity.price || 0
            });
            
            uploadedCount++;
            console.log(`✅ Individual upload successful: ${activityId}`);
            
          } catch (individualError: any) {
            errorCount++;
            console.log(`❌ Individual upload failed for ${activity.id}: ${individualError.message}`);
          }
        }
      }
    }
    
    console.log(`🎉 Upload complete!`);
    console.log(`✅ Successfully uploaded: ${uploadedCount} activities`);
    console.log(`❌ Failed to upload: ${errorCount} activities`);
    
    // Verify the upload
    try {
      const snap = await getDocs(collection(db, "activities_upl"));
      console.log(`✅ Verification: ${snap.size} activities found in Firestore`);
      
      if (snap.size > 0) {
        console.log('🎯 Success! Your activities are now in Firestore!');
        console.log('📱 Your app should now be able to load activities properly.');
      }
      
    } catch (error) {
      console.error("❌ Verification failed:", error);
    }
    
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
};

// Run the upload
uploadActivities();
