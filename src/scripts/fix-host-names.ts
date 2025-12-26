import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

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

const fixHostNames = async () => {
  try {
    console.log('🔍 Checking activities and users...');
    
    // Get all activities
    const activitiesSnapshot = await getDocs(collection(db, 'activities_upl'));
    const activities = activitiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📊 Found ${activities.length} activities`);
    
    // Get all users
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`👥 Found ${users.length} users`);
    
    // Check activities with problematic host names
    const problematicActivities = activities.filter(activity => {
      const hostName = activity.host?.name || activity.hostName;
      return hostName && (
        hostName.includes('mockuser') || 
        hostName.includes('User ') ||
        hostName.includes('user')
      );
    });
    
    console.log(`⚠️  Found ${problematicActivities.length} activities with problematic host names`);
    
    if (problematicActivities.length === 0) {
      console.log('✅ All activities have proper host names!');
      return;
    }
    
    // Fix host names by assigning random user IDs
    let fixedCount = 0;
    
    for (const activity of problematicActivities) {
      try {
        // Pick a random user as the host
        const randomUser = users[Math.floor(Math.random() * users.length)];
        
        // Update the activity with proper host information
        await updateDoc(doc(db, 'activities_upl', activity.id), {
          hostId: randomUser.id,
          host: {
            id: randomUser.id,
            name: randomUser.name,
            email: randomUser.email,
            avatar: randomUser.avatar
          },
          hostName: randomUser.name
        });
        
        fixedCount++;
        console.log(`✅ Fixed activity ${activity.id}: ${activity.host?.name || activity.hostName} → ${randomUser.name}`);
        
      } catch (error) {
        console.error(`❌ Failed to fix activity ${activity.id}:`, error);
      }
    }
    
    console.log(`🎉 Fixed ${fixedCount} out of ${problematicActivities.length} activities`);
    
    // Verify the fix
    console.log('🔍 Verifying fix...');
    const verifySnapshot = await getDocs(collection(db, 'activities_upl'));
    const verifyActivities = verifySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const stillProblematic = verifyActivities.filter(activity => {
      const hostName = activity.host?.name || activity.hostName;
      return hostName && (
        hostName.includes('mockuser') || 
        hostName.includes('User ') ||
        hostName.includes('user')
      );
    });
    
    console.log(`✅ Verification: ${stillProblematic.length} activities still have problematic names`);
    
    if (stillProblematic.length === 0) {
      console.log('🎉 All host names have been fixed successfully!');
    } else {
      console.log('⚠️  Some activities still need attention:');
      stillProblematic.forEach(activity => {
        console.log(`   - ${activity.id}: ${activity.host?.name || activity.hostName}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error fixing host names:', error);
  }
};

fixHostNames();
