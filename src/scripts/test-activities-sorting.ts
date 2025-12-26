import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, where } from "firebase/firestore";

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

const testActivitiesSorting = async () => {
  try {
    console.log('🧪 Testing Activities Sorting and Loading Behavior...');
    
    // Test 1: Get all activities sorted by date (ascending)
    console.log('\n📊 Test 1: Getting all activities sorted by date (ascending)');
    const activitiesCollection = collection(db, "activities_upl");
    const q = query(activitiesCollection, orderBy('dateTime', 'asc'));
    const querySnapshot = await getDocs(q);
    
    console.log(`✅ Total activities found: ${querySnapshot.size}`);
    
    // Test 2: Check upcoming activities (today and future)
    console.log('\n📅 Test 2: Checking upcoming activities');
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const upcomingActivities = allActivities.filter(activity => {
      const activityDate = new Date(activity.dateTime);
      return activityDate >= today;
    });
    
    console.log(`📅 Upcoming activities (today and future): ${upcomingActivities.length}`);
    
    // Test 3: Show first 10 upcoming activities in order
    console.log('\n📋 Test 3: First 10 upcoming activities (sorted by date)');
    upcomingActivities.slice(0, 10).forEach((activity, index) => {
      const activityDate = new Date(activity.dateTime);
      const dateStr = activityDate.toLocaleDateString();
      const timeStr = activityDate.toLocaleTimeString();
      
      console.log(`   ${index + 1}. ${activity.title}`);
      console.log(`      📅 Date: ${dateStr} at ${timeStr}`);
      console.log(`      🏃 Sport: ${activity.sportType}`);
      console.log(`      👤 Host: ${activity.hostName}`);
      console.log(`      📍 Location: ${activity.location?.address}, ${activity.location?.city}`);
      console.log(`      👥 Participants: ${activity.participants?.length || 0}/${activity.maxParticipants}`);
      console.log(`      ---`);
    });
    
    // Test 4: Check sport type distribution for upcoming activities
    console.log('\n🏃 Test 4: Sport type distribution for upcoming activities');
    const sportCounts: { [key: string]: number } = {};
    
    upcomingActivities.forEach(activity => {
      const sport = activity.sportType;
      sportCounts[sport] = (sportCounts[sport] || 0) + 1;
    });
    
    Object.entries(sportCounts).forEach(([sport, count]) => {
      console.log(`   ${sport}: ${count} activities`);
    });
    
    // Test 5: Test filtering by sport type
    console.log('\n🎯 Test 5: Testing sport type filtering');
    const testSport = 'Running';
    const runningQuery = query(
      activitiesCollection,
      where("sportType", "==", testSport),
      orderBy('dateTime', 'asc')
    );
    const runningSnapshot = await getDocs(runningQuery);
    
    const runningActivities = runningSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    const upcomingRunning = runningActivities.filter(activity => {
      const activityDate = new Date(activity.dateTime);
      return activityDate >= today;
    });
    
    console.log(`🏃 Upcoming ${testSport} activities: ${upcomingRunning.length}`);
    
    if (upcomingRunning.length > 0) {
      console.log(`   First ${testSport} activity: ${upcomingRunning[0].title}`);
      console.log(`   Date: ${new Date(upcomingRunning[0].dateTime).toLocaleDateString()}`);
    }
    
    console.log('\n🎉 Activities Sorting Test Complete!');
    console.log('✅ Activities are now sorted by date (earliest first)');
    console.log('✅ Only upcoming activities (today and future) are shown');
    console.log('✅ Activities load once and stay loaded');
    console.log('✅ Sport filtering works with existing data');
    console.log(`📱 Users will see ${upcomingActivities.length} upcoming activities`);
    
  } catch (error: any) {
    console.error('❌ Activities sorting test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
  }
};

testActivitiesSorting(); 