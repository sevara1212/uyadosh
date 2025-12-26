import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, limit } from 'firebase/firestore';

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

const checkHostNames = async () => {
  try {
    console.log('🔍 Checking host names in activities...');
    
    // Get first 10 activities to check
    const activitiesSnapshot = await getDocs(collection(db, 'activities_upl'));
    const activities = activitiesSnapshot.docs.slice(0, 10).map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📊 Checking first ${activities.length} activities:`);
    
    activities.forEach((activity, index) => {
      const hostName = activity.host?.name || activity.hostName || 'No host name';
      const hostId = activity.hostId || 'No host ID';
      console.log(`${index + 1}. Activity: ${activity.title || 'No title'}`);
      console.log(`   Host ID: ${hostId}`);
      console.log(`   Host Name: ${hostName}`);
      console.log(`   Host Object:`, activity.host);
      console.log('---');
    });
    
    // Check if there are any activities with "mockuser" in the name
    const allActivities = activitiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const mockuserActivities = allActivities.filter(activity => {
      const hostName = activity.host?.name || activity.hostName || '';
      return hostName.toLowerCase().includes('mockuser');
    });
    
    console.log(`\n🔍 Found ${mockuserActivities.length} activities with "mockuser" in host name`);
    
    if (mockuserActivities.length > 0) {
      console.log('First few problematic activities:');
      mockuserActivities.slice(0, 5).forEach(activity => {
        console.log(`- ${activity.title || 'No title'}: ${activity.host?.name || activity.hostName}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking host names:', error);
  }
};

checkHostNames();
