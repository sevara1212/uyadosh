import { db, usersCollection, roomsCollection } from '../lib/firebase';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { ActivityLevel, SportType } from '../types';

// Sample users
const sampleUsers = [
  {
    id: "user1",
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    interests: [SportType.Running, SportType.Cycling, SportType.Gym],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: new Date().toISOString(),
    bio: "Marathon runner and cycling enthusiast. Always looking for new challenges!",
    email: "alex@example.com",
    joinedRooms: []
  },
  {
    id: "user2",
    name: "Sarah Williams",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    interests: [SportType.Yoga, SportType.Swimming],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: new Date().toISOString(),
    bio: "Yoga instructor with a passion for mindfulness and healthy living.",
    email: "sarah@example.com",
    joinedRooms: []
  },
  {
    id: "user3",
    name: "Mike Chen",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    interests: [SportType.Basketball, SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: new Date().toISOString(),
    bio: "Former college basketball player looking for pickup games.",
    email: "mike@example.com",
    joinedRooms: []
  }
];

// Sample rooms
const sampleRooms = [
  {
    id: "room1",
    title: "Morning Run in Central Park",
    sportType: SportType.Running,
    hostId: "user1",
    location: {
      address: "Central Park, Loop Trail",
      city: "New York",
      lat: 40.785091,
      lng: -73.968285
    },
    dateTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    duration: 60,
    maxParticipants: 10,
    participants: ["user1", "user2"],
    description: "A refreshing 5K morning run. All levels welcome!",
    createdAt: Timestamp.now()
  },
  {
    id: "room2",
    title: "Sunset Yoga Session",
    sportType: SportType.Yoga,
    hostId: "user2",
    location: {
      address: "Venice Beach",
      city: "Los Angeles",
      lat: 33.985047,
      lng: -118.469601
    },
    dateTime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    duration: 90,
    maxParticipants: 15,
    participants: ["user2", "user3"],
    description: "Relaxing yoga session as the sun sets. Bring your own mat.",
    price: 10,
    createdAt: Timestamp.now()
  },
  {
    id: "room3",
    title: "Basketball Pickup Game",
    sportType: SportType.Basketball,
    hostId: "user3",
    location: {
      address: "Rucker Park",
      city: "New York",
      lat: 40.829023,
      lng: -73.936275
    },
    dateTime: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
    duration: 120,
    maxParticipants: 10,
    participants: ["user3", "user1"],
    description: "Casual 5v5 basketball. All skill levels welcome.",
    createdAt: Timestamp.now()
  }
];

// Initialize data in Firestore
async function initializeData() {
  try {
    console.log('Initializing sample data in Firestore...');
    
    // Add users
    console.log('Adding sample users...');
    for (const user of sampleUsers) {
      const { id, ...userData } = user;
      await setDoc(doc(usersCollection, id), userData);
      console.log(`Added user: ${user.name} (${id})`);
    }
    
    // Add rooms
    console.log('Adding sample rooms...');
    for (const room of sampleRooms) {
      const { id, ...roomData } = room;
      await setDoc(doc(roomsCollection, id), roomData);
      console.log(`Added room: ${room.title} (${id})`);
      
      // Update users' joinedRooms
      for (const participantId of room.participants) {
        const userIndex = sampleUsers.findIndex(u => u.id === participantId);
        if (userIndex >= 0) {
          sampleUsers[userIndex].joinedRooms.push(id);
        }
      }
    }
    
    // Update users with their joinedRooms
    console.log('Updating users with joined rooms...');
    for (const user of sampleUsers) {
      if (user.joinedRooms.length > 0) {
        await setDoc(doc(usersCollection, user.id), { joinedRooms: user.joinedRooms }, { merge: true });
        console.log(`Updated ${user.name}'s joined rooms: ${user.joinedRooms.join(', ')}`);
      }
    }
    
    console.log('Sample data initialization complete! 🎉');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}

// Run the initialization
initializeData(); 