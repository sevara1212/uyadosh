import { 
  roomsCollection, 
  doc, 
  getDocs, 
  updateDoc 
} from "@/lib/firebase";

// Script to update existing rooms to include new fields
export const updateExistingRooms = async () => {
  try {
    console.log("Starting to update existing rooms...");
    
    const querySnapshot = await getDocs(roomsCollection);
    let updatedCount = 0;
    
    for (const roomDoc of querySnapshot.docs) {
      const roomData = roomDoc.data();
      const roomId = roomDoc.id;
      
      // Check if room needs updating (missing new fields)
      if (!roomData.approvedParticipants || !roomData.pendingRequests) {
        console.log(`Updating room: ${roomId}`);
        
        const updates: any = {};
        
        // Add approvedParticipants if missing
        if (!roomData.approvedParticipants) {
          updates.approvedParticipants = [roomData.hostId]; // Host is automatically approved
        }
        
        // Add pendingRequests if missing
        if (!roomData.pendingRequests) {
          updates.pendingRequests = [];
        }
        
        // Update the room
        await updateDoc(doc(roomsCollection, roomId), updates);
        updatedCount++;
      }
    }
    
    console.log(`Updated ${updatedCount} rooms successfully!`);
  } catch (error) {
    console.error("Error updating existing rooms:", error);
    throw error;
  }
};

// Run the update if this script is executed directly
if (typeof window === 'undefined') {
  updateExistingRooms()
    .then(() => {
      console.log("Room update completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Room update failed:", error);
      process.exit(1);
    });
} 