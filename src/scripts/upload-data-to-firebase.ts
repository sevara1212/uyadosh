import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, getDocs } from "firebase/firestore";

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

// Create mock users for the activities
const createMockUsers = () => {
  const users = [];
  for (let i = 0; i < 200; i++) {
    users.push({
      id: `user${i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i % 100}.jpg`
    });
  }
  return users;
};

// Generate all 201 activities
const generateAllActivities = () => {
  const mockUsers = createMockUsers();
  const activities = [];
  
  // Activity templates based on Data.ts patterns
  const activityTemplates = [
    {
      title: "Tennis Court Tennis Session",
      sportType: "Tennis",
      location: {
        address: "Oqqurghon Street, 16",
        city: "Tashkent",
        lat: 41.32,
        lng: 69.285
      },
      description: "A fun and social tennis event open to all skill levels!"
    },
    {
      title: "Anhor Park Rink Other Session",
      sportType: "Other",
      location: {
        address: "Labzak Street, Shaykhantaur",
        city: "Tashkent",
        lat: 41.31,
        lng: 69.24
      },
      description: "A fun and social other event open to all skill levels!"
    },
    {
      title: "Yoga Space Yoga Session",
      sportType: "Yoga",
      location: {
        address: "Kichik Beshyogoch street, 56",
        city: "Tashkent",
        lat: 41.311,
        lng: 69.27
      },
      description: "A fun and social yoga event open to all skill levels!"
    },
    {
      title: "Chamanzar Field Football Session",
      sportType: "Football",
      location: {
        address: "Uchtepa District, Chamanzar Mahallah",
        city: "Tashkent",
        lat: 41.295,
        lng: 69.211
      },
      description: "A fun and social football event open to all skill levels!"
    },
    {
      title: "River Park Running Session",
      sportType: "Running",
      location: {
        address: "Tashkent",
        city: "Tashkent",
        lat: 41.33,
        lng: 69.31
      },
      description: "A fun and social running event open to all skill levels!"
    },
    {
      title: "Fitness First Gym Session",
      sportType: "Gym",
      location: {
        address: "Afrosiyob Street, 41",
        city: "Tashkent",
        lat: 41.31,
        lng: 69.28
      },
      description: "A fun and social gym event open to all skill levels!"
    },
    {
      title: "Aqualand Swimming Session",
      sportType: "Swimming",
      location: {
        address: "Chinabad Street, 61A",
        city: "Tashkent",
        lat: 41.36,
        lng: 69.29
      },
      description: "A fun and social swimming event open to all skill levels!"
    },
    {
      title: "Yunusabad Stadium Football Session",
      sportType: "Football",
      location: {
        address: "Yunusabad District, 3-mavze",
        city: "Tashkent",
        lat: 41.364559,
        lng: 69.294178
      },
      description: "A fun and social football event open to all skill levels!"
    },
    {
      title: "TTClub Tennis Session",
      sportType: "Tennis",
      location: {
        address: "Mahtumquli Street, 105Г",
        city: "Tashkent",
        lat: 41.35,
        lng: 69.3
      },
      description: "A fun and social tennis event open to all skill levels!"
    }
  ];

  // Generate 201 activities
  for (let i = 0; i < 201; i++) {
    const template = activityTemplates[i % activityTemplates.length];
    const hostId = Math.floor(Math.random() * 200);
    const maxParticipants = Math.floor(Math.random() * 8) + 4; // 4-11 participants
    const duration = [60, 90, 120][Math.floor(Math.random() * 3)];
    
    // Generate random participants
    const participants = [];
    const numParticipants = Math.floor(Math.random() * maxParticipants) + 1;
    for (let j = 0; j < numParticipants; j++) {
      const userId = Math.floor(Math.random() * 200);
      if (!participants.find(p => p.id === `user${userId}`)) {
        participants.push(mockUsers[userId]);
      }
    }
    
    // Add host if not already in participants
    if (!participants.find(p => p.id === `user${hostId}`)) {
      participants.unshift(mockUsers[hostId]);
    }

    // Generate future date
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 30) + 1);
    const dateTime = futureDate.toISOString();

    const activity = {
      id: (1000 + i).toString(),
      title: template.title,
      sportType: template.sportType,
      hostId: `user${hostId}`,
      host: mockUsers[hostId],
      location: template.location,
      dateTime: dateTime,
      duration: duration,
      maxParticipants: maxParticipants,
      participants: participants,
      approvedParticipants: participants,
      pendingRequests: [],
      description: template.description,
      price: 0
    };

    activities.push(activity);
  }

  return activities;
};

const uploadActivities = async () => {
  try {
    console.log('🚀 Starting upload of ALL 201 activities to Firebase...');
    
    const activities = generateAllActivities();
    
    console.log(`📊 Generated ${activities.length} activities to upload`);
    
    let uploadedCount = 0;
    let errorCount = 0;
    
    for (const activity of activities) {
      try {
        await setDoc(doc(collection(db, "activities_upl"), activity.id), activity);
        uploadedCount++;
        
        if (uploadedCount % 20 === 0) {
          console.log(`✅ Uploaded ${uploadedCount}/${activities.length} activities...`);
        }
      } catch (uploadError) {
        errorCount++;
        console.log(`❌ Failed to upload activity ${activity.id}: ${uploadError.message}`);
      }
    }
    
    console.log(`🎉 Upload complete!`);
    console.log(`✅ Successfully uploaded: ${uploadedCount} activities`);
    if (errorCount > 0) {
      console.log(`❌ Failed to upload: ${errorCount} activities`);
    }
    
    // Verify the upload
    await verifyUpload(uploadedCount);
    
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
};

const verifyUpload = async (expectedCount: number) => {
  try {
    const snap = await getDocs(collection(db, "activities_upl"));
    console.log(`✅ Verification: ${snap.size} activities found in Firestore`);
    
    if (snap.size === expectedCount) {
      console.log("🎯 Perfect! All activities uploaded successfully!");
    } else {
      console.log(`⚠️  Warning: Expected ${expectedCount} but found ${snap.size} activities`);
    }
  } catch (error) {
    console.error("❌ Verification failed:", error);
  }
};

// Run the upload
uploadActivities(); 