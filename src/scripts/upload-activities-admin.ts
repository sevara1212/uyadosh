import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin SDK
const serviceAccount = {
  "type": "service_account",
  "project_id": "fitness-4fc9f",
  "private_key_id": "your-private-key-id",
  "private_key": "your-private-key",
  "client_email": "firebase-adminsdk-xxxxx@fitness-4fc9f.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40fitness-4fc9f.iam.gserviceaccount.com"
};

// For now, let's use a simpler approach with client SDK but with proper authentication
import { initializeApp as initializeClientApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore as getClientFirestore, doc, setDoc, collection } from 'firebase/firestore';

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

const app = initializeClientApp(firebaseConfig);
const auth = getAuth(app);
const db = getClientFirestore(app);

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

// Generate all 200 activities
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
      title: "Swimming Pool Swimming Session",
      sportType: "Swimming",
      location: {
        address: "Yunusabad District",
        city: "Tashkent",
        lat: 41.35,
        lng: 69.29
      },
      description: "A fun and social swimming event open to all skill levels!"
    },
    {
      title: "Basketball Court Basketball Session",
      sportType: "Basketball",
      location: {
        address: "Chilanzar District",
        city: "Tashkent",
        lat: 41.28,
        lng: 69.25
      },
      description: "A fun and social basketball event open to all skill levels!"
    },
    {
      title: "Cycling Track Cycling Session",
      sportType: "Cycling",
      location: {
        address: "Mirabad District",
        city: "Tashkent",
        lat: 41.30,
        lng: 69.26
      },
      description: "A fun and social cycling event open to all skill levels!"
    }
  ];

  for (let i = 0; i < 200; i++) {
    const template = activityTemplates[i % activityTemplates.length];
    const hostId = Math.floor(Math.random() * 200);
    const maxParticipants = Math.floor(Math.random() * 10) + 5; // 5-15 participants
    const duration = Math.floor(Math.random() * 120) + 60; // 1-3 hours
    
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
    console.log('🔐 Signing in anonymously...');
    await signInAnonymously(auth);
    console.log('✅ Signed in successfully');
    
    console.log('🚀 Starting upload of ALL 200 activities to Firebase...');
    
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
    
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
};

// Run the upload
uploadActivities();
