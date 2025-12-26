import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updateExistingRoomsWithNewFields } from "@/services/roomService";
import { toast } from "sonner";

const DataMigration = () => {
  const [updating, setUpdating] = useState(false);

  const handleUpdateRooms = async () => {
    try {
      setUpdating(true);
      await updateExistingRoomsWithNewFields();
      toast.success("Existing rooms updated successfully!");
    } catch (error) {
      console.error("Error updating rooms:", error);
      toast.error("Failed to update existing rooms");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Data Migration</h3>
      <p className="text-sm text-gray-600 mb-4">
        Update existing rooms to include new request and approval fields.
      </p>
      <Button 
        onClick={handleUpdateRooms}
        disabled={updating}
        className="bg-[#35179d] text-white"
      >
        {updating ? "Updating..." : "Update Existing Rooms"}
      </Button>
    </div>
  );
};

export default DataMigration; 