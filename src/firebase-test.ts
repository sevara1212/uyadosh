import { db, usersCollection, roomsCollection } from './lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

// Test function to check if Firebase is properly configured
async function testFirebaseSetup() {
  console.log('Testing Firebase setup...');
  
  try {
    // Test Firestore
    console.log('1. Testing Firestore database...');
    const testCollection = collection(db, 'test');
    const docRef = await addDoc(testCollection, {
      message: 'Test document',
      timestamp: new Date()
    });
    console.log('✅ Firestore working! Document written with ID:', docRef.id);
    
    // Test collections
    console.log('2. Testing collections access...');
    const usersSnapshot = await getDocs(usersCollection);
    console.log(`✅ Users collection accessible! (${usersSnapshot.size} documents)`);
    
    const roomsSnapshot = await getDocs(roomsCollection);
    console.log(`✅ Rooms collection accessible! (${roomsSnapshot.size} documents)`);
    
    console.log('Firestore services are working correctly! 🎉');
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
  }
}

// Run the test
testFirebaseSetup(); 