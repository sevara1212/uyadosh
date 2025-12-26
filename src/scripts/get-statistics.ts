import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

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

interface User {
  id: string;
  name: string;
  email: string;
  interests: string[];
  activityLevel: string;
  joinedDate: string;
  joinedRooms: string[];
  pendingRequests: string[];
  gender?: string;
}

interface Activity {
  id: string;
  title: string;
  sportType: string;
  hostId: string;
  dateTime: string;
  participants: string[];
  approvedParticipants: string[];
  pendingRequests: string[];
  maxParticipants: number;
  price: number;
  createdAt: any;
}

interface Statistics {
  totalUsers: number;
  activeUsers: number;
  totalActivities: number;
  userCreatedActivities: number;
  curatedActivities: number;
  upcomingActivities: number;
  pastActivities: number;
  totalJoinRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  sportTypeDistribution: Record<string, number>;
  activityLevelDistribution: Record<string, number>;
  genderDistribution: Record<string, number>;
  averageParticipantsPerActivity: number;
  averagePricePerActivity: number;
  mostPopularSports: string[];
  recentActivityGrowth: number;
  userEngagementRate: number;
}

const getStatistics = async (): Promise<Statistics> => {
  try {
    console.log('📊 Gathering Muvr App Statistics...\n');

    // Get all users
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users: User[] = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as User));

    // Get curated activities
    const curatedActivitiesSnapshot = await getDocs(collection(db, 'activities_upl'));
    const curatedActivities: Activity[] = curatedActivitiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Activity));

    // Get user-created activities
    const userActivitiesSnapshot = await getDocs(collection(db, 'activities'));
    const userActivities: Activity[] = userActivitiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Activity));

    // Get rooms (legacy activities)
    const roomsSnapshot = await getDocs(collection(db, 'rooms'));
    const rooms: Activity[] = roomsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Activity));

    const allActivities = [...curatedActivities, ...userActivities, ...rooms];
    const now = new Date();

    // Calculate statistics
    const totalUsers = users.length;
    const activeUsers = users.filter(user => (user.joinedRooms?.length || 0) > 0 || (user.pendingRequests?.length || 0) > 0).length;
    
    const totalActivities = allActivities.length;
    const userCreatedActivities = userActivities.length;
    const curatedActivitiesCount = curatedActivities.length;
    
    const upcomingActivities = allActivities.filter(activity => 
      new Date(activity.dateTime) > now
    ).length;
    
    const pastActivities = allActivities.filter(activity => 
      new Date(activity.dateTime) <= now
    ).length;

    const totalJoinRequests = allActivities.reduce((sum, activity) => 
      sum + (activity.pendingRequests?.length || 0), 0
    );
    
    const pendingRequests = allActivities.reduce((sum, activity) => 
      sum + (activity.pendingRequests?.length || 0), 0
    );
    
    const approvedRequests = allActivities.reduce((sum, activity) => 
      sum + (activity.approvedParticipants?.length || 0), 0
    );

    // Sport type distribution
    const sportTypeDistribution: Record<string, number> = {};
    allActivities.forEach(activity => {
      const sportType = activity.sportType?.replace('SportType.', '') || 'Unknown';
      sportTypeDistribution[sportType] = (sportTypeDistribution[sportType] || 0) + 1;
    });

    // Activity level distribution
    const activityLevelDistribution: Record<string, number> = {};
    users.forEach(user => {
      const level = user.activityLevel || 'Unknown';
      activityLevelDistribution[level] = (activityLevelDistribution[level] || 0) + 1;
    });

    // Gender distribution
    const genderDistribution: Record<string, number> = {};
    users.forEach(user => {
      const gender = user.gender || 'Unknown';
      genderDistribution[gender] = (genderDistribution[gender] || 0) + 1;
    });

    // Average participants per activity
    const totalParticipants = allActivities.reduce((sum, activity) => 
      sum + (activity.approvedParticipants?.length || 0), 0
    );
    const averageParticipantsPerActivity = totalActivities > 0 ? totalParticipants / totalActivities : 0;

    // Average price per activity
    const totalPrice = allActivities.reduce((sum, activity) => sum + (activity.price || 0), 0);
    const averagePricePerActivity = totalActivities > 0 ? totalPrice / totalActivities : 0;

    // Most popular sports (top 5)
    const mostPopularSports = Object.entries(sportTypeDistribution)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([sport]) => sport);

    // Recent activity growth (activities created in last 30 days)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const recentActivities = allActivities.filter(activity => 
      activity.createdAt && new Date(activity.createdAt.toDate ? activity.createdAt.toDate() : activity.createdAt) > thirtyDaysAgo
    ).length;
    const recentActivityGrowth = recentActivities;

    // User engagement rate (users who have joined activities or sent requests)
    const engagedUsers = users.filter(user => 
      (user.joinedRooms?.length || 0) > 0 || (user.pendingRequests?.length || 0) > 0
    ).length;
    const userEngagementRate = totalUsers > 0 ? (engagedUsers / totalUsers) * 100 : 0;

    const statistics: Statistics = {
      totalUsers,
      activeUsers,
      totalActivities,
      userCreatedActivities,
      curatedActivities: curatedActivitiesCount,
      upcomingActivities,
      pastActivities,
      totalJoinRequests,
      pendingRequests,
      approvedRequests,
      sportTypeDistribution,
      activityLevelDistribution,
      genderDistribution,
      averageParticipantsPerActivity: Math.round(averageParticipantsPerActivity * 10) / 10,
      averagePricePerActivity: Math.round(averagePricePerActivity * 100) / 100,
      mostPopularSports,
      recentActivityGrowth,
      userEngagementRate: Math.round(userEngagementRate * 10) / 10
    };

    return statistics;

  } catch (error) {
    console.error('Error gathering statistics:', error);
    throw error;
  }
};

const printStatistics = (stats: Statistics) => {
  console.log('🎯 Muvr App - Investor Statistics Report');
  console.log('==========================================\n');

  console.log('👥 USER METRICS:');
  console.log(`   • Total Registered Users: ${stats.totalUsers.toLocaleString()}`);
  console.log(`   • Active Users: ${stats.activeUsers.toLocaleString()} (${stats.userEngagementRate}% engagement rate)`);
  console.log(`   • User Growth (Last 30 Days): ${stats.recentActivityGrowth} new activities created\n`);

  console.log('🏃‍♂️ ACTIVITY METRICS:');
  console.log(`   • Total Activities: ${stats.totalActivities.toLocaleString()}`);
  console.log(`   • User-Created Activities: ${stats.userCreatedActivities.toLocaleString()}`);
  console.log(`   • Curated Activities: ${stats.curatedActivities.toLocaleString()}`);
  console.log(`   • Upcoming Activities: ${stats.upcomingActivities.toLocaleString()}`);
  console.log(`   • Past Activities: ${stats.pastActivities.toLocaleString()}`);
  console.log(`   • Average Participants per Activity: ${stats.averageParticipantsPerActivity}`);
  console.log(`   • Average Activity Price: $${stats.averagePricePerActivity}\n`);

  console.log('🤝 ENGAGEMENT METRICS:');
  console.log(`   • Total Join Requests: ${stats.totalJoinRequests.toLocaleString()}`);
  console.log(`   • Pending Requests: ${stats.pendingRequests.toLocaleString()}`);
  console.log(`   • Approved Requests: ${stats.approvedRequests.toLocaleString()}\n`);

  console.log('🏆 MOST POPULAR SPORTS:');
  stats.mostPopularSports.forEach((sport, index) => {
    const count = stats.sportTypeDistribution[sport];
    console.log(`   ${index + 1}. ${sport}: ${count} activities`);
  });
  console.log();

  console.log('📊 USER DEMOGRAPHICS:');
  console.log('   Activity Levels:');
  Object.entries(stats.activityLevelDistribution).forEach(([level, count]) => {
    const percentage = ((count / stats.totalUsers) * 100).toFixed(1);
    console.log(`     • ${level}: ${count} users (${percentage}%)`);
  });
  
  console.log('   Gender Distribution:');
  Object.entries(stats.genderDistribution).forEach(([gender, count]) => {
    const percentage = ((count / stats.totalUsers) * 100).toFixed(1);
    console.log(`     • ${gender}: ${count} users (${percentage}%)`);
  });
  console.log();

  console.log('💡 KEY INSIGHTS FOR INVESTORS:');
  console.log(`   • ${stats.userEngagementRate}% user engagement rate shows strong product-market fit`);
  console.log(`   • ${stats.recentActivityGrowth} new activities in 30 days indicates growing user-generated content`);
  console.log(`   • ${stats.averageParticipantsPerActivity} average participants shows social validation`);
  console.log(`   • ${stats.mostPopularSports[0]} is the most popular sport with ${stats.sportTypeDistribution[stats.mostPopularSports[0]]} activities`);
  console.log(`   • ${stats.upcomingActivities} upcoming activities demonstrate active community`);
  console.log(`   • ${stats.userCreatedActivities} user-created activities show platform stickiness`);
  console.log();

  console.log('🚀 GROWTH OPPORTUNITIES:');
  console.log(`   • ${stats.totalUsers - stats.activeUsers} inactive users represent conversion opportunity`);
  console.log(`   • ${stats.pendingRequests} pending requests indicate high demand`);
  console.log(`   • Average $${stats.averagePricePerActivity} per activity suggests monetization potential`);
  console.log(`   • ${stats.curatedActivities} curated activities provide content foundation`);
  console.log();

  console.log('📈 INVESTMENT HIGHLIGHTS:');
  console.log('   • Social fitness platform with proven user engagement');
  console.log('   • Strong community-driven content creation');
  console.log('   • Scalable model with both curated and user-generated activities');
  console.log('   • Real-time chat and social features driving retention');
  console.log('   • Mobile-first design with Telegram Mini App integration');
  console.log('   • Geographic expansion potential beyond current market');
  console.log('   • Multiple revenue streams: premium features, activity fees, partnerships');
};

// Run the statistics gathering
getStatistics()
  .then(printStatistics)
  .catch(console.error);
