import { mockRooms } from '../data/Data';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportActivitiesToJSON = () => {
  try {
    console.log('📤 Exporting activities to JSON...');
    
    // Convert activities to the format expected by Firebase
    const activitiesData: { [key: string]: any } = {};
    
    mockRooms.forEach((activity, index) => {
      const activityId = activity.id || `activity_${index + 1}`;
      activitiesData[activityId] = {
        ...activity,
        id: activityId,
        participants: activity.participants || [],
        approvedParticipants: activity.approvedParticipants || [],
        pendingRequests: activity.pendingRequests || [],
        price: activity.price || 0
      };
    });
    
    // Create the JSON structure for Firebase import
    const firebaseData = {
      activities_upl: activitiesData
    };
    
    // Write to file
    const outputPath = path.join(__dirname, 'activities-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(firebaseData, null, 2));
    
    console.log(`✅ Exported ${Object.keys(activitiesData).length} activities to: ${outputPath}`);
    console.log('📋 Next steps:');
    console.log('1. Run: firebase firestore:import --data-file src/scripts/activities-data.json');
    console.log('2. Or manually import the JSON file through Firebase Console');
    
  } catch (error) {
    console.error('❌ Export failed:', error);
  }
};

exportActivitiesToJSON();
