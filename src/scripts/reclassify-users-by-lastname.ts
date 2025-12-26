import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, collection, getDocs } from "firebase/firestore";
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

// Function to classify gender based on last name
const classifyGenderByLastName = (fullName: string): 'Male' | 'Female' => {
  const nameParts = fullName.trim().split(' ');
  const lastName = nameParts[nameParts.length - 1];
  
  if (lastName.endsWith('va')) {
    return 'Female';
  } else if (lastName.endsWith('v')) {
    return 'Male';
  } else {
    // Default classification if pattern doesn't match
    return 'Male';
  }
};

// Reclassify users in Data.ts
const reclassifyUsers = () => {
  console.log('🔄 Reclassifying users based on last names...');
  console.log('Rule: Last name ending with "v" = Male, "va" = Female');
  console.log('==================================================');
  
  let maleCount = 0;
  let femaleCount = 0;
  let unchangedCount = 0;
  
  mockUsers.forEach((user, index) => {
    const originalGender = user.gender;
    const newGender = classifyGenderByLastName(user.name);
    
    if (originalGender !== newGender) {
      console.log(`${index + 1}. ${user.name}`);
      console.log(`   ${originalGender} → ${newGender} (${user.name.split(' ').pop()})`);
      user.gender = newGender;
    } else {
      unchangedCount++;
    }
    
    if (newGender === 'Male') maleCount++;
    else femaleCount++;
  });
  
  console.log('\n📊 Reclassification Summary:');
  console.log(`Male Users: ${maleCount}`);
  console.log(`Female Users: ${femaleCount}`);
  console.log(`Unchanged: ${unchangedCount}`);
  console.log(`Total: ${mockUsers.length}`);
  
  return mockUsers;
};

// Upload reclassified users to Firebase
const uploadReclassifiedUsers = async (reclassifiedUsers: any[]) => {
  try {
    console.log('\n🚀 Uploading reclassified users to Firebase...');
    
    let uploadedCount = 0;
    let errorCount = 0;

    for (const user of reclassifiedUsers) {
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

        await updateDoc(doc(collection(db, "users"), user.id), userData);
        uploadedCount++;
        
        if (uploadedCount % 20 === 0) {
          console.log(`✅ Updated ${uploadedCount}/${reclassifiedUsers.length} users...`);
        }
      } catch (uploadError: any) {
        errorCount++;
        console.log(`❌ Failed to update user ${user.id}: ${uploadError.message}`);
      }
    }

    console.log(`🎉 Upload complete!`);
    console.log(`✅ Successfully updated: ${uploadedCount} users`);
    if (errorCount > 0) {
      console.log(`❌ Failed to update: ${errorCount} users`);
    }
    
    await verifyUpload();
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
};

const verifyUpload = async () => {
  try {
    const snap = await getDocs(collection(db, "users"));
    console.log(`✅ Verification: ${snap.size} users found in Firestore`);
    
    // Count genders in Firebase
    let maleCount = 0;
    let femaleCount = 0;
    
    snap.docs.forEach(doc => {
      const data = doc.data();
      if (data.gender === 'Male') maleCount++;
      else if (data.gender === 'Female') femaleCount++;
    });
    
    console.log('📊 Firebase Gender Distribution:');
    console.log(`Male Users: ${maleCount}`);
    console.log(`Female Users: ${femaleCount}`);
    
    // Show sample of reclassified users
    console.log('\n📋 Sample reclassified users:');
    snap.docs.slice(0, 10).forEach((doc, index) => {
      const data = doc.data();
      const lastName = data.name.split(' ').pop();
      console.log(`  ${index + 1}. ${data.name} (${data.gender}) - Last name: ${lastName}`);
    });
  } catch (error) {
    console.error("❌ Verification failed:", error);
  }
};

// Main execution
const main = () => {
  const reclassifiedUsers = reclassifyUsers();
  uploadReclassifiedUsers(reclassifiedUsers);
};

main();
