import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc, collection, getDocs } from "firebase/firestore";

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

// Function to check if user ID should be removed
const shouldRemoveUser = (userId: string): boolean => {
  // Remove users with IDs like "user0", "user1", "user2", etc.
  const userNumberPattern = /^user\d+$/;
  return userNumberPattern.test(userId);
};

const removeNumberedUsers = async () => {
  try {
    console.log('🧹 Starting cleanup of numbered users from Firebase...');
    console.log('Rule: Remove users with IDs like "user0", "user1", "user2", etc.');
    console.log('Keep users with random letter IDs and numeric IDs (1, 2, 3, etc.)');
    console.log('==============================================================');
    
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);
    
    console.log(`📊 Found ${querySnapshot.size} total users in Firebase`);
    
    const usersToRemove: string[] = [];
    const usersToKeep: string[] = [];
    
    // Analyze all users
    querySnapshot.docs.forEach(doc => {
      const userId = doc.id;
      if (shouldRemoveUser(userId)) {
        usersToRemove.push(userId);
      } else {
        usersToKeep.push(userId);
      }
    });
    
    console.log(`\n📋 Analysis Results:`);
    console.log(`Users to remove: ${usersToRemove.length}`);
    console.log(`Users to keep: ${usersToKeep.length}`);
    
    if (usersToRemove.length > 0) {
      console.log(`\n🗑️  Users to be removed:`);
      usersToRemove.forEach((userId, index) => {
        console.log(`  ${index + 1}. ${userId}`);
      });
    }
    
    console.log(`\n✅ Users to keep (sample):`);
    usersToKeep.slice(0, 10).forEach((userId, index) => {
      console.log(`  ${index + 1}. ${userId}`);
    });
    
    if (usersToKeep.length > 10) {
      console.log(`  ... and ${usersToKeep.length - 10} more`);
    }
    
    // Confirm before deletion
    if (usersToRemove.length > 0) {
      console.log(`\n⚠️  About to remove ${usersToRemove.length} users.`);
      console.log('Proceeding with deletion...');
      
      let deletedCount = 0;
      let errorCount = 0;
      
      for (const userId of usersToRemove) {
        try {
          await deleteDoc(doc(usersCollection, userId));
          deletedCount++;
          
          if (deletedCount % 10 === 0) {
            console.log(`✅ Deleted ${deletedCount}/${usersToRemove.length} users...`);
          }
        } catch (deleteError: any) {
          errorCount++;
          console.log(`❌ Failed to delete user ${userId}: ${deleteError.message}`);
        }
      }
      
      console.log(`\n🎉 Deletion complete!`);
      console.log(`✅ Successfully deleted: ${deletedCount} users`);
      if (errorCount > 0) {
        console.log(`❌ Failed to delete: ${errorCount} users`);
      }
    } else {
      console.log(`\n✅ No users to remove! All users are safe.`);
    }
    
    await verifyCleanup();
  } catch (error) {
    console.error("❌ Cleanup failed:", error);
  }
};

const verifyCleanup = async () => {
  try {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);
    
    console.log(`\n✅ Verification: ${querySnapshot.size} users remaining in Firebase`);
    
    // Check for any remaining numbered users
    const remainingNumberedUsers = querySnapshot.docs.filter(doc => shouldRemoveUser(doc.id));
    
    if (remainingNumberedUsers.length > 0) {
      console.log(`⚠️  Warning: ${remainingNumberedUsers.length} numbered users still exist:`);
      remainingNumberedUsers.forEach(doc => {
        console.log(`  - ${doc.id}`);
      });
    } else {
      console.log(`✅ Cleanup successful! No numbered users remain.`);
    }
    
    // Show sample of remaining users
    console.log(`\n📋 Sample of remaining users:`);
    querySnapshot.docs.slice(0, 10).forEach((doc, index) => {
      const data = doc.data();
      console.log(`  ${index + 1}. ${doc.id} - ${data.name || 'Unknown'} (${data.gender || 'Unknown'})`);
    });
    
    if (querySnapshot.size > 10) {
      console.log(`  ... and ${querySnapshot.size - 10} more users`);
    }
    
  } catch (error) {
    console.error("❌ Verification failed:", error);
  }
};

removeNumberedUsers();
