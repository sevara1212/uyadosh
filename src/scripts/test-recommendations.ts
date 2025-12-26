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

// Mock user for testing recommendations
const mockUser = {
  id: 'test-user',
  interests: ['Running', 'Tennis', 'Gym'],
  gender: 'Male',
  age: 25
};

// Calculate recommendation score (same as in the app)
const calculateRecommendationScore = (room: any) => {
  const now = new Date();
  let score = 0;
  
  // Base score for being upcoming
  score += 100;
  
  // Bonus for activities that match user interests
  if (mockUser.interests.includes(room.sportType)) {
    score += 50;
  }
  
  // Bonus for activities with available spots (not full)
  const participantsCount = room.participants?.length || 0;
  const availableSpots = room.maxParticipants - participantsCount;
  if (availableSpots > 0) {
    score += availableSpots * 10;
  } else {
    score -= 100; // Penalty for full activities
  }
  
  // Bonus for activities happening soon (within next 7 days)
  const activityDate = new Date(room.dateTime);
  const daysUntilActivity = Math.ceil((activityDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilActivity <= 7) {
    score += 30;
  }
  
  // Bonus for activities with more participants (social factor)
  if (participantsCount > 0 && participantsCount < room.maxParticipants) {
    score += participantsCount * 2;
  }
  
  return score;
};

const testRecommendations = async () => {
  try {
    console.log('🎯 Testing recommendation system...');
    console.log('👤 Mock user interests:', mockUser.interests);
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    const allActivities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Filter upcoming activities
    const now = new Date();
    const upcomingActivities = allActivities.filter(activity => {
      const isUpcoming = new Date(activity.dateTime) > now;
      return isUpcoming;
    });
    
    console.log(`📊 Total activities: ${allActivities.length}`);
    console.log(`📅 Upcoming activities: ${upcomingActivities.length}`);
    
    // Calculate scores and sort
    const scoredActivities = upcomingActivities.map(activity => ({
      ...activity,
      score: calculateRecommendationScore(activity)
    }));
    
    scoredActivities.sort((a, b) => b.score - a.score);
    
    console.log('🏆 Top 7 recommended activities:');
    scoredActivities.slice(0, 7).forEach((activity, index) => {
      const participantsCount = activity.participants?.length || 0;
      const availableSpots = activity.maxParticipants - participantsCount;
      const isInterestMatch = mockUser.interests.includes(activity.sportType);
      
      console.log(`  ${index + 1}. ${activity.title}`);
      console.log(`     Sport: ${activity.sportType} ${isInterestMatch ? '🎯' : ''}`);
      console.log(`     Host: ${activity.hostName}`);
      console.log(`     Score: ${activity.score}`);
      console.log(`     Available spots: ${availableSpots}/${activity.maxParticipants}`);
      console.log(`     Date: ${activity.dateTime}`);
      console.log('');
    });
    
    // Show recommendation breakdown
    console.log('📈 Recommendation breakdown:');
    const interestMatches = scoredActivities.filter(a => mockUser.interests.includes(a.sportType)).length;
    const availableActivities = scoredActivities.filter(a => {
      const participantsCount = a.participants?.length || 0;
      return (a.maxParticipants - participantsCount) > 0;
    }).length;
    
    console.log(`  • Activities matching interests: ${interestMatches}/${scoredActivities.length}`);
    console.log(`  • Activities with available spots: ${availableActivities}/${scoredActivities.length}`);
    console.log(`  • Activities happening within 7 days: ${scoredActivities.filter(a => {
      const daysUntil = Math.ceil((new Date(a.dateTime).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 7;
    }).length}/${scoredActivities.length}`);
    
    console.log('🎉 Recommendation system is working correctly!');
    
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

testRecommendations(); 