import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

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

// Helper function to batch fetch host data (copied from roomService)
const fetchHostsData = async (hostIds: string[]) => {
  const uniqueHostIds = [...new Set(hostIds)];
  const hostsMap: Record<string, any> = {};
  
  for (let i = 0; i < uniqueHostIds.length; i += 10) {
    const batch = uniqueHostIds.slice(i, i + 10);
    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where('__name__', 'in', batch));
      const hostSnaps = await getDocs(q);
      
      hostSnaps.forEach(doc => {
        hostsMap[doc.id] = { id: doc.id, ...doc.data() };
      });
    } catch (error) {
      console.error('Error batch fetching hosts:', error);
    }
  }
  
  return hostsMap;
};

// Test the getAllActivities function (copied from roomService)
const testGetAllActivities = async () => {
  try {
    console.log('🔍 Testing getAllActivities function...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    const activitiesData: any[] = [];
    const hostIds: string[] = [];
    
    console.log(`📊 Found ${querySnapshot.size} activities in collection`);
    
    // First, collect all activity data and host IDs
    querySnapshot.forEach(doc => {
      const data = doc.data();
      
      // Convert participants from User objects to user IDs if needed
      let participants = data.participants || [];
      if (participants.length > 0 && typeof participants[0] === 'object') {
        participants = participants.map((p: any) => p.id || p);
      }
      
      // Convert approvedParticipants from User objects to user IDs if needed
      let approvedParticipants = data.approvedParticipants || [data.hostId];
      if (approvedParticipants.length > 0 && typeof approvedParticipants[0] === 'object') {
        approvedParticipants = approvedParticipants.map((p: any) => p.id || p);
      }
      
      activitiesData.push({ 
        id: doc.id, 
        ...data,
        participants: participants,
        approvedParticipants: approvedParticipants,
        pendingRequests: data.pendingRequests || []
      });
      if (data.hostId) hostIds.push(data.hostId);
    });
    
    console.log(`👥 Found ${hostIds.length} unique host IDs:`, hostIds.slice(0, 5));
    
    // Then batch fetch all hosts data
    const hostsMap = await fetchHostsData(hostIds);
    console.log(`👤 Fetched ${Object.keys(hostsMap).length} host objects`);
    
    // Finally, combine activity data with host data
    const result = activitiesData.map(activity => ({
      ...activity,
      host: hostsMap[activity.hostId]
    }));
    
    console.log(`✅ Final result: ${result.length} activities processed`);
    console.log('📋 Sample processed activity:', {
      id: result[0]?.id,
      title: result[0]?.title,
      dateTime: result[0]?.dateTime,
      host: result[0]?.host ? 'Found' : 'Missing',
      participants: result[0]?.participants?.length || 0
    });
    
    return result;
  } catch (error) {
    console.error("❌ Error in getAllActivities:", error);
    throw error;
  }
};

// Import the missing query and where functions
import { query, where } from "firebase/firestore";

testGetAllActivities(); 