import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, User } from "lucide-react";
import { getPendingRequests, respondToJoinRequest } from "@/services/roomService";
import { JoinRequest, RequestStatus } from "@/types";
import { toast } from "sonner";

interface JoinRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
  onRequestHandled: () => void;
}

const JoinRequestsModal = ({ isOpen, onClose, roomId, onRequestHandled }: JoinRequestsModalProps) => {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [handlingRequest, setHandlingRequest] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && roomId) {
      loadRequests();
    }
  }, [isOpen, roomId]);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const pendingRequests = await getPendingRequests(roomId);
      setRequests(pendingRequests);
    } catch (error) {
      console.error("Error loading requests:", error);
      toast.error("Failed to load join requests");
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (requestId: string, userId: string, status: RequestStatus) => {
    try {
      setHandlingRequest(requestId);
      await respondToJoinRequest(requestId, roomId, userId, status);
      
      // Remove the handled request from the list
      setRequests(prev => prev.filter(req => req.id !== requestId));
      
      const action = status === RequestStatus.Approved ? "approved" : "rejected";
      toast.success(`Request ${action} successfully`);
      
      onRequestHandled();
    } catch (error) {
      console.error("Error handling request:", error);
      toast.error("Failed to handle request");
    } finally {
      setHandlingRequest(null);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Join Requests</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#35179d] mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading requests...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No pending requests</p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#35179d] flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {request.user?.name || "Unknown User"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {formatDate(request.requestedAt)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Pending
                    </Badge>
                  </div>
                  
                  {request.message && (
                    <p className="text-sm text-gray-700 mb-3 italic">
                      "{request.message}"
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => handleRequest(request.id, request.userId, RequestStatus.Approved)}
                      disabled={handlingRequest === request.id}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleRequest(request.id, request.userId, RequestStatus.Rejected)}
                      disabled={handlingRequest === request.id}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinRequestsModal; 