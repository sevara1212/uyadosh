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

// Separate users by gender
const maleUsers = mockUsers.filter(user => user.gender === 'Male');
const femaleUsers = mockUsers.filter(user => user.gender === 'Female');

console.log(`📊 Found ${maleUsers.length} male users and ${femaleUsers.length} female users`);

// Function to get a random user by gender
const getRandomUserByGender = (gender: 'Male' | 'Female'): string => {
  const users = gender === 'Male' ? maleUsers : femaleUsers;
  const randomUser = users[Math.floor(Math.random() * users.length)];
  return randomUser.id;
};

// Function to get appropriate host based on sport type
const getAppropriateHost = (sportType: string): string => {
  const normalizedSportType = sportType.replace(/^SportType\./, '');
  
  // Football should be hosted by males
  if (normalizedSportType === 'Football') {
    return getRandomUserByGender('Male');
  }
  
  // Pilates and Dance should be hosted by females
  if (normalizedSportType === 'Pilates' || normalizedSportType === 'Dance') {
    return getRandomUserByGender('Female');
  }
  
  // For other sports, use random gender
  return Math.random() > 0.5 ? getRandomUserByGender('Male') : getRandomUserByGender('Female');
};

// Function to update participants based on host
const updateParticipants = (participants: string[], newHostId: string): string[] => {
  // Remove any mockuser references and replace with real user IDs
  const realParticipants = participants.map(participant => {
    if (participant.includes('mockUsers[')) {
      // Extract the index from mockUsers[index]
      const match = participant.match(/mockUsers\[(\d+)\]/);
      if (match) {
        const index = parseInt(match[1]);
        if (index < mockUsers.length) {
          return mockUsers[index].id;
        }
      }
      // If we can't parse it, use a random user
      return Math.random() > 0.5 ? getRandomUserByGender('Male') : getRandomUserByGender('Female');
    }
    return participant;
  });
  
  // Ensure the host is in the participants list
  if (!realParticipants.includes(newHostId)) {
    realParticipants.unshift(newHostId);
  }
  
  return realParticipants;
};

const updateActivitiesWithGenderMatchedHosts = async () => {
  try {
    console.log('🚀 Starting update of activities with gender-matched hosts...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    console.log(`📊 Found ${querySnapshot.size} activities to update`);
    
    let updatedCount = 0;
    let errorCount = 0;

    for (const activityDoc of querySnapshot.docs) {
      try {
        const activityData = activityDoc.data();
        const sportType = activityData.sportType;
        
        // Get appropriate host based on sport type
        const newHostId = getAppropriateHost(sportType);
        
        // Update participants
        const updatedParticipants = updateParticipants(activityData.participants || [], newHostId);
        const updatedApprovedParticipants = updateParticipants(activityData.approvedParticipants || [], newHostId);
        
        // Prepare update data
        const updateData = {
          hostId: newHostId,
          participants: updatedParticipants,
          approvedParticipants: updatedApprovedParticipants,
          // Remove the old host object if it exists
          host: null
        };
        
        // Update the activity
        await updateDoc(doc(activitiesCollection, activityDoc.id), updateData);
        
        updatedCount++;
        if (updatedCount % 10 === 0) {
          console.log(`✅ Updated ${updatedCount}/${querySnapshot.size} activities...`);
        }
        
      } catch (updateError: any) {
        errorCount++;
        console.log(`❌ Failed to update activity ${activityDoc.id}: ${updateError.message}`);
      }
    }

    console.log(`🎉 Update complete!`);
    console.log(`✅ Successfully updated: ${updatedCount} activities`);
    if (errorCount > 0) {
      console.log(`❌ Failed to update: ${errorCount} activities`);
    }
    
    await verifyUpdate();
  } catch (error) {
    console.error("❌ Update failed:", error);
  }
};

const verifyUpdate = async () => {
  try {
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    console.log(`✅ Verification: ${querySnapshot.size} activities found in Firestore`);
    
    // Show sample of updated activities
    console.log('📋 Sample updated activities:');
    querySnapshot.docs.slice(0, 5).forEach((doc, index) => {
      const data = doc.data();
      const hostUser = mockUsers.find(user => user.id === data.hostId);
      console.log(`  ${index + 1}. Activity: ${data.title}`);
      console.log(`     Sport: ${data.sportType}`);
      console.log(`     Host: ${hostUser?.name || 'Unknown'} (${hostUser?.gender || 'Unknown'})`);
    });
  } catch (error) {
    console.error("❌ Verification failed:", error);
  }
};

updateActivitiesWithGenderMatchedHosts();
