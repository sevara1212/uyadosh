
import { Room } from "@/types";
import { Button } from "@/components/ui/button";
import { formatDateTime, formatDuration, getSportIcon } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, Calendar, Clock, MessageCircle, UserPlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { joinRoom, leaveRoom, requestToJoinRoom } from "@/services/roomService";
import { toast } from "sonner";
import { useState } from "react";
import JoinRequestsModal from "./JoinRequestsModal";
import RoomChat from "./RoomChat";

interface RoomCardProps {
  room: Room;
  onActionComplete?: () => void;
}

const RoomCard = ({ room, onActionComplete }: RoomCardProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  const participantsCount = room.participants?.length || 0;
  const approvedParticipantsCount = room.approvedParticipants?.length || 0;
  const pendingRequestsCount = room.pendingRequests?.length || 0;
  const isRoomFull = participantsCount >= room.maxParticipants;
  
  // Map sport types to icon image paths
  const sportIcons: Record<string, string> = {
    Running: '/images/running_icon.png',
    Yoga: '/images/yoga_icon.png',
    Basketball: '/images/basketball_icon.png',
    Cycling: '/images/cycling_icon.png',
    Tennis: '/images/tennis_icon.png',
    Gym: '/images/gym_icon.png',
    Football: '/images/football_icon.png',
    Swimming: '/images/swimming_icon.png',
    Other: '/images/other_icon.png',
  };
  
  const isUserJoined = currentUser && room.participants?.includes(currentUser.id);
  const isUserApproved = currentUser && room.approvedParticipants?.includes(currentUser.id);
  const isUserHost = currentUser && room.hostId === currentUser.id;
  
  const handleJoinLeave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    setLoading(true);
    try {
      if (isUserJoined) {
        await leaveRoom(room.id, currentUser.id);
        toast.success("You have left the activity");
      } else {
        // Request to join instead of direct join
        await requestToJoinRoom(room.id, currentUser.id);
        toast.success("Join request sent! Host will review your request.");
      }
      
      if (onActionComplete) {
        onActionComplete();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to perform action");
    } finally {
      setLoading(false);
    }
  };
  
  const handleRequestHandled = () => {
    if (onActionComplete) {
      onActionComplete();
    }
  };
  
  return (
    <>
      <div className="bg-[#FDFDFF] rounded-[24px] shadow-lg p-6 mb-4 flex flex-col gap-4 w-full font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center">
              <img 
                src={sportIcons[room.sportType] || '/images/other_icon.png'} 
                alt={room.sportType + ' icon'} 
                className="h-6 w-6 object-contain" 
              />
            </span>
            <span className="font-bold text-[#1A1A72] text-base">{String(room.sportType).replace(/^SportType\./, '')}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#887DC0] font-medium mt-1 block">
              {approvedParticipantsCount}/{room.maxParticipants} approved
            </span>
            {pendingRequestsCount > 0 && (
              <span className="text-xs text-orange-600 font-medium block">
                {pendingRequestsCount} pending
              </span>
            )}
          </div>
        </div>
        
        <h3 className="text-[20px] font-extrabold text-[#1A1A72] mb-1">{room.title}</h3>
        
        <div className="space-y-1 mb-2 text-[15px] text-[#887DC0]">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#887DC0]" />
            {formatDateTime(room.dateTime)}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#887DC0]" />
            {formatDuration(room.duration)}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#887DC0]" />
            {room.location.address}, {room.location.city}
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-[#887DC0]" />
            Hosted by {room.host?.name || room.hostName || "Unknown"}
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-2 gap-2">
          <button
            className="border-2 border-[#1A1A72] text-[#1A1A72] font-bold rounded-full px-6 py-2 bg-transparent hover:bg-[#f3f2ff] transition text-base"
            onClick={() => navigate(`/room/${room.id}`)}
          >
            Details
          </button>
          
          {isUserHost ? (
            <div className="flex gap-2">
              {/* Requests Button - always visible for host */}
              <button
                className={`rounded-full px-4 py-2 font-bold text-white text-sm flex items-center gap-1 ${pendingRequestsCount > 0 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-300 cursor-not-allowed'}`}
                onClick={() => pendingRequestsCount > 0 && setShowRequests(true)}
                disabled={pendingRequestsCount === 0}
                title={pendingRequestsCount > 0 ? 'View join requests' : 'No pending requests'}
              >
                <UserPlus size={16} />
                Requests
                {pendingRequestsCount > 0 && (
                  <span className="ml-1">({pendingRequestsCount})</span>
                )}
              </button>
              {/* Chat Button - always visible for host */}
              <button
                className={`rounded-full px-4 py-2 font-bold text-white text-sm flex items-center gap-1 ${approvedParticipantsCount > 1 ? 'bg-[#1A1A72] hover:bg-[#2a1280]' : 'bg-gray-300 cursor-not-allowed'}`}
                onClick={() => approvedParticipantsCount > 1 && navigate(`/chat/${room.id}`)}
                disabled={approvedParticipantsCount <= 1}
                title={approvedParticipantsCount > 1 ? 'Open chat with participants' : 'No participants to chat with'}
              >
                <MessageCircle size={16} />
                Chat
              </button>
            </div>
          ) : isUserApproved ? (
            <div className="flex gap-2">
              <button
                className="rounded-full px-6 py-2 font-bold text-white text-base bg-[#887DC0]"
                onClick={handleJoinLeave}
                disabled={loading}
              >
                {loading ? "Loading..." : "Leave"}
              </button>
              {approvedParticipantsCount > 1 && (
                <button
                  className="rounded-full px-4 py-2 font-bold text-white text-sm bg-[#1A1A72] hover:bg-[#2a1280] flex items-center gap-1"
                  onClick={() => navigate(`/chat/${room.id}`)}
                >
                  <MessageCircle size={16} />
                  Chat
                </button>
              )}
            </div>
          ) : (
            <button
              className="rounded-full px-6 py-2 font-bold text-white text-base"
              style={{ 
                background: isUserJoined ? '#887DC0' : (!isRoomFull ? 'linear-gradient(90deg, #FFA726 0%, #FB8C00 100%)' : '#887DC0'), 
                backgroundImage: !isUserJoined && !isRoomFull ? 'linear-gradient(90deg, #FFA726 0%, #FB8C00 100%)' : undefined 
              }}
              disabled={isRoomFull && !isUserJoined || loading}
              onClick={handleJoinLeave}
            >
              {loading ? "Loading..." : (isUserJoined ? "Request Sent" : (isRoomFull ? "Full" : "Request to Join"))}
            </button>
          )}
        </div>
      </div>
      
      {/* Join Requests Modal */}
      <JoinRequestsModal
        isOpen={showRequests}
        onClose={() => setShowRequests(false)}
        roomId={room.id}
        onRequestHandled={handleRequestHandled}
      />
      
    </>
  );
};

export default RoomCard;
