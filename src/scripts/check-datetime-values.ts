import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, limit } from "firebase/firestore";
import { firebaseConfig } from "../lib/firebase.config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkDateTimeValues() {
  try {
    console.log('🔍 Checking dateTime values in activities_upl...');
    
    const activitiesRef = collection(db, "activities_upl");
    const q = query(activitiesRef, limit(10));
    const snapshot = await getDocs(q);
    
    console.log(`📊 Found ${snapshot.size} activities (showing first 10):`);
    
    let validDates = 0;
    let invalidDates = 0;
    let missingDates = 0;
    
    snapshot.forEach((doc, index) => {
      const data = doc.data();
      console.log(`\n${index + 1}. Activity: ${data.title}`);
      console.log(`   dateTime: ${data.dateTime}`);
      console.log(`   dateTime type: ${typeof data.dateTime}`);
      
      if (data.dateTime) {
        try {
          const date = new Date(data.dateTime);
          if (!isNaN(date.getTime())) {
            console.log(`   ✅ Valid date: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`);
            validDates++;
          } else {
            console.log(`   ❌ Invalid date: ${data.dateTime}`);
            invalidDates++;
          }
        } catch (error) {
          console.log(`   ❌ Error parsing date: ${error}`);
          invalidDates++;
        }
      } else {
        console.log(`   ❌ No dateTime field found`);
        missingDates++;
      }
    });
    
    console.log(`\n📊 Summary:`);
    console.log(`   Valid dates: ${validDates}`);
    console.log(`   Invalid dates: ${invalidDates}`);
    console.log(`   Missing dates: ${missingDates}`);
    
  } catch (error) {
    console.error('❌ Error checking dateTime values:', error);
  }
}

checkDateTimeValues();
