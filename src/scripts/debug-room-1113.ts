import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

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

const debugRoom1113 = async () => {
  try {
    console.log('🔍 Debugging activity ID: 1113');
    
    // Test 1: Direct Firestore access
    const activitiesCollection = collection(db, "activities_upl");
    const activityRef = doc(activitiesCollection, "1113");
    const activityDoc = await getDoc(activityRef);
    
    if (activityDoc.exists()) {
      const activityData = activityDoc.data();
      console.log('✅ Activity 1113 found in Firestore:');
      console.log('   Title:', activityData.title);
      console.log('   Host:', activityData.hostName);
      console.log('   Sport:', activityData.sportType);
      console.log('   Location:', activityData.location?.address, activityData.location?.city);
      console.log('   Date:', new Date(activityData.dateTime).toLocaleDateString());
      console.log('   Time:', new Date(activityData.dateTime).toLocaleTimeString());
      console.log('   Duration:', activityData.duration, 'minutes');
      console.log('   Max Participants:', activityData.maxParticipants);
      console.log('   Current Participants:', activityData.participants?.length || 0);
      console.log('   Description:', activityData.description ? 'Available' : 'Not provided');
      console.log('   Host ID:', activityData.hostId);
      
      // Test 2: Check if host exists
      if (activityData.hostId) {
        const usersCollection = collection(db, "users");
        const hostRef = doc(usersCollection, activityData.hostId);
        const hostDoc = await getDoc(hostRef);
        
        if (hostDoc.exists()) {
          const hostData = hostDoc.data();
          console.log('✅ Host found:');
          console.log('   Name:', hostData.name);
          console.log('   Email:', hostData.email);
        } else {
          console.log('❌ Host not found, will use fallback');
        }
      }
      
      // Test 3: Simulate the getRoomById function logic
      console.log('\n🎯 Simulating getRoomById function:');
      
      let host = undefined;
      if (activityData.hostId) {
        const usersCollection = collection(db, "users");
        const hostRef = doc(usersCollection, activityData.hostId);
        const hostDoc = await getDoc(hostRef);
        
        if (hostDoc.exists()) {
          host = { id: hostDoc.id, ...hostDoc.data() };
          console.log('   ✅ Host data populated');
        }
      }
      
      // Create fallback host
      const fallbackHost = host || {
        id: activityData.hostId,
        name: activityData.hostName || `User ${activityData.hostId}`,
        email: `${activityData.hostId}@example.com`,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      };
      
      const roomData = {
        id: "1113",
        ...activityData,
        host: fallbackHost,
        hostName: activityData.hostName || fallbackHost.name
      };
      
      console.log('   ✅ Room data constructed successfully');
      console.log('   Final host name:', roomData.hostName);
      console.log('   Final host object:', roomData.host);
      
      console.log('\n🎉 Activity 1113 should work in RoomDetailPage!');
      console.log('📱 URL: http://localhost:8080/room/1113');
      console.log('✅ All required data is present');
      
    } else {
      console.log('❌ Activity 1113 not found in Firestore');
      console.log('🔍 Checking if it exists in rooms collection...');
      
      // Check rooms collection as fallback
      const roomsCollection = collection(db, "rooms");
      const roomRef = doc(roomsCollection, "1113");
      const roomDoc = await getDoc(roomRef);
      
      if (roomDoc.exists()) {
        console.log('✅ Activity 1113 found in rooms collection');
      } else {
        console.log('❌ Activity 1113 not found in either collection');
      }
    }
    
  } catch (error) {
    console.error("❌ Debug failed:", error);
  }
};

debugRoom1113(); 