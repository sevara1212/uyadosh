import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

// Mock current user for testing
const mockCurrentUser = {
  id: 'test-user',
  name: 'Test User',
  gender: 'Male' as const,
  age: 25
};

const testCompleteFiltering = async () => {
  try {
    console.log('🔍 Testing complete filtering logic from ActivitiesPage...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    const now = new Date();
    console.log('📅 Current time:', now.toISOString());
    console.log('👤 Mock user:', mockCurrentUser);
    
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`📊 Total activities fetched: ${allActivities.length}`);
    
    // Apply the exact filtering logic from ActivitiesPage
    const filteredActivities = allActivities.filter(activity => {
      // Filter by date (upcoming only)
      const isUpcoming = new Date(activity.dateTime) > now;
      
      // Filter by gender preference if user is logged in
      let genderMatch = true;
      if (mockCurrentUser && activity.genderPreference && activity.genderPreference !== 'Both') {
        if (mockCurrentUser.gender && mockCurrentUser.gender !== activity.genderPreference) {
          genderMatch = false;
        }
      }
      
      // Filter by age range if user is logged in
      let ageMatch = true;
      if (mockCurrentUser && activity.ageRange && mockCurrentUser.age) {
        const userAge = mockCurrentUser.age;
        const { min, max } = activity.ageRange;
        if (userAge < min || userAge > max) {
          ageMatch = false;
        }
      }
      
      return isUpcoming && genderMatch && ageMatch;
    });
    
    console.log(`✅ Filtered activities: ${filteredActivities.length}`);
    
    // Show why activities might be filtered out
    const upcomingActivities = allActivities.filter(activity => new Date(activity.dateTime) > now);
    console.log(`📅 Upcoming activities: ${upcomingActivities.length}`);
    
    const genderFiltered = upcomingActivities.filter(activity => {
      if (mockCurrentUser && activity.genderPreference && activity.genderPreference !== 'Both') {
        if (mockCurrentUser.gender && mockCurrentUser.gender !== activity.genderPreference) {
          return false;
        }
      }
      return true;
    });
    console.log(`👥 After gender filter: ${genderFiltered.length}`);
    
    const ageFiltered = genderFiltered.filter(activity => {
      if (mockCurrentUser && activity.ageRange && mockCurrentUser.age) {
        const userAge = mockCurrentUser.age;
        const { min, max } = activity.ageRange;
        if (userAge < min || userAge > max) {
          return false;
        }
      }
      return true;
    });
    console.log(`🎂 After age filter: ${ageFiltered.length}`);
    
    // Show sample activities that pass all filters
    if (filteredActivities.length > 0) {
      console.log('📋 Sample activities that pass all filters:');
      filteredActivities.slice(0, 5).forEach((activity, index) => {
        console.log(`  ${index + 1}. ${activity.title} - ${activity.dateTime}`);
      });
    } else {
      console.log('❌ No activities pass all filters!');
      
      // Check what's filtering them out
      console.log('🔍 Debugging filter issues:');
      
      const sampleActivity = allActivities[0];
      console.log('Sample activity:', {
        title: sampleActivity.title,
        dateTime: sampleActivity.dateTime,
        genderPreference: sampleActivity.genderPreference,
        ageRange: sampleActivity.ageRange,
        isUpcoming: new Date(sampleActivity.dateTime) > now
      });
    }
    
  } catch (error) {
    console.error("❌ Error testing complete filtering:", error);
  }
};

testCompleteFiltering(); 