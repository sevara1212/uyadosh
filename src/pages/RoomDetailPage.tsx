
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, MapPin, Users, User, Heart, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { formatDateTime, formatDuration } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getRoomById, joinRoom, leaveRoom, getRoomParticipants, requestToJoinRoom, cancelJoinRequest, getPendingRequests } from "@/services/roomService";
import { Room, User as UserType } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

const RoomDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  


  console.log('🚀 RoomDetailPage component loaded');
  console.log('📋 ID from params:', id);
  console.log('👤 Current user:', currentUser);

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!id) {
        console.log('❌ No ID provided');
        setLoading(false);
        return;
      }
      
      console.log('🔍 Fetching room data for ID:', id);
      
      try {
        const roomData = await getRoomById(id);
        console.log('📋 Room data received:', roomData);
        
        if (roomData) {
          console.log('✅ Room data is valid, setting state');
          setRoom(roomData);
          
          try {
            const participantsData = await getRoomParticipants(id);
            console.log('👥 Participants data received:', participantsData);
            setParticipants(participantsData);
          } catch (participantsError) {
            console.error("Error fetching participants:", participantsError);
            setParticipants([]);
          }
          
          // Check if current user has a pending request for this activity
          if (currentUser) {
            try {
              const pendingRequests = await getPendingRequests(id);
              const hasRequest = pendingRequests.some(request => request.userId === currentUser.id);
              setHasPendingRequest(hasRequest);
              console.log('📝 Pending request check:', hasRequest ? 'Found' : 'None');
            } catch (error) {
              console.error("Error checking pending requests:", error);
              setHasPendingRequest(false);
            }
          }
        } else {
          console.log('❌ No room data found for ID:', id);
          toast.error(`Activity with ID ${id} not found`);
        }
      } catch (error) {
        console.error("Error fetching room:", error);
        toast.error("Failed to load activity details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [id, currentUser]);

  const handleJoinLeave = async () => {
    if (!currentUser || !room) return;
    
    setActionLoading(true);
    try {
      if (room.participants?.includes(currentUser.id)) {
        await leaveRoom(room.id, currentUser.id);
        toast.success("Left activity successfully");
      } else {
        await joinRoom(room.id, currentUser.id);
        toast.success("Joined activity successfully");
      }
      // Refresh room data
      const updatedRoom = await getRoomById(room.id);
      if (updatedRoom) setRoom(updatedRoom);
    } catch (error) {
      console.error("Error joining/leaving room:", error);
      toast.error("Failed to join/leave activity");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestJoin = async () => {
    if (!currentUser || !room) return;
    
    setActionLoading(true);
    try {
      console.log('📝 Sending join request for activity:', room.id);
      
      // Check if activity is full
      const currentParticipants = room.participants?.length || 0;
      const maxParticipants = room.maxParticipants || 0;
      const isFull = currentParticipants >= maxParticipants;
      
      // Send the request and get the request ID
      const requestId = await requestToJoinRoom(room.id, currentUser.id);
      console.log('✅ Join request created with ID:', requestId);
      
      // Set the pending request state to true
      setHasPendingRequest(true);
      
      if (isFull) {
        toast.success("Join request sent! You'll be added to the waitlist.");
      } else {
        toast.success("Join request sent successfully");
      }
      
      // Refresh room data to show updated participant count
      const updatedRoom = await getRoomById(room.id);
      if (updatedRoom) setRoom(updatedRoom);
      
    } catch (error: any) {
      console.error("Error requesting to join:", error);
      
      let errorMessage = "Failed to send join request";
      
      // Provide specific error messages
      if (error.message?.includes('already a participant')) {
        errorMessage = "You are already a participant in this activity";
      } else if (error.message?.includes('already have a pending request')) {
        errorMessage = "You already have a pending request for this activity";
        // If user already has a pending request, set the state to true
        setHasPendingRequest(true);
      } else if (error.message?.includes('Activity not found')) {
        errorMessage = "Activity not found. Please try refreshing the page.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelRequest = async () => {
    if (!currentUser || !room) return;
    
    setActionLoading(true);
    try {
      console.log('❌ Cancelling join request for activity:', room.id);
      
      // Find and cancel the pending request
      await cancelJoinRequest(room.id, currentUser.id);
      setHasPendingRequest(false);
      
      toast.success("Join request cancelled successfully");
      
      // Refresh room data
      const updatedRoom = await getRoomById(room.id);
      if (updatedRoom) setRoom(updatedRoom);
      
    } catch (error: any) {
      console.error("Error cancelling join request:", error);
      toast.error("Failed to cancel join request");
    } finally {
      setActionLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const getLocationLink = () => {
    if (!room) return "#";
    const searchQuery = encodeURIComponent(`${room.location.address}, ${room.location.city}`);
    return `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
  };

  if (loading) {
    console.log('⏳ RoomDetailPage: Loading state');
    return (
      <Layout>
        <div className="min-h-screen bg-[#35179d] p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              <h1 className="text-2xl font-bold text-white">Activity Details</h1>
            </div>
            <div className="bg-[#35179d] rounded-lg p-6 shadow-lg border border-white/20">
              <div className="text-center">
                <p className="text-white">Loading activity details...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!room) {
    console.log('❌ RoomDetailPage: No room data found');
    return (
      <Layout>
        <div className="min-h-screen bg-[#35179d] p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              <h1 className="text-2xl font-bold text-white">Activity Details</h1>
            </div>
            
            <div className="bg-[#35179d] rounded-lg p-6 shadow-lg border border-white/20">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-4 text-white">Activity Not Found</h2>
                <p className="text-gray-300 mb-6">The activity you're looking for doesn't exist or couldn't be loaded.</p>
                <div className="space-y-3">
                  <p className="text-white/60 text-sm">Activity ID: {id}</p>
                  <p className="text-white/60 text-sm">URL: {window.location.href}</p>
                </div>
                <div className="mt-6 space-x-4">
                  <Button 
                    onClick={() => navigate('/')}
                    className="bg-orange-500 text-white font-bold hover:bg-orange-600 border-none"
                  >
                    Back to Home
                  </Button>
                  <Button 
                    onClick={() => navigate('/activities')}
                    className="bg-[#887DC0] text-white font-bold hover:bg-[#887DC0]/90 border-none"
                  >
                    Go to Activities
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  console.log('✅ RoomDetailPage: Room data loaded successfully');
  console.log('📋 Room data:', room);

  const participantsCount = room.participants?.length || 0;
  const isRoomFull = participantsCount >= room.maxParticipants;
  const isUserJoined = currentUser && room.participants?.includes(currentUser.id);
  const isUserHost = currentUser && room.hostId === currentUser.id;

  const sportImageMap = {
    Running: "/images/running_icon.png",
    Yoga: "/images/yoga_icon.png",
    Cycling: "/images/cycling_icon.png",
    Swimming: "/images/swimming_icon.png",
    Basketball: "/images/basketball_icon.png",
    Football: "/images/football_icon.png",
    Tennis: "/images/tennis_icon.png",
    Gym: "/images/gym_icon.png",
    Other: "/images/other_icon.png"
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#35179d] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              <h1 className="text-2xl font-bold text-white">Activity Details</h1>
            </div>
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full transition-colors ${
                isFavorite ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Heart size={20} className="text-white" fill={isFavorite ? 'white' : 'none'} />
            </button>
          </div>

          {/* Activity Card */}
          <div className="bg-[#35179d] rounded-lg shadow-lg border border-white/20 overflow-hidden">
            {/* Activity Type Banner */}
            <div className="p-4 text-center bg-white/10">
              <span className="flex justify-center items-center mb-2">
                <img 
                  src={sportImageMap[room.sportType] || "/images/other_icon.png"} 
                  alt={room.sportType} 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/images/other_icon.png";
                  }}
                />
              </span>
              <h2 className="text-xl font-bold mt-1 text-white">{room.sportType}</h2>
            </div>
            
            {/* Activity Details */}
            <div className="p-5 bg-white text-[#35179d]">
              <h2 className="text-2xl font-bold mb-1 text-[#35179d]">{room.title}</h2>
              
              {room.price && (
                <div className="mb-4">
                  <span className="text-green-600 font-semibold">${room.price}</span>
                  <span className="text-[#35179d] text-sm"> per person</span>
                </div>
              )}
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Calendar size={18} className="mr-3 text-[#35179d]" />
                  <span className="text-[#35179d]">{formatDateTime(room.dateTime)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-3 text-[#35179d]" />
                  <span className="text-[#35179d]">{formatDuration(room.duration)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={18} className="mr-3 text-[#35179d]" />
                  <span className="text-[#35179d]">{room.location.address}, {room.location.city}</span>
                </div>
                <div className="flex items-center">
                  <ExternalLink size={18} className="mr-3 text-[#35179d]" />
                  <a 
                    href={getLocationLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#35179d] hover:underline flex items-center"
                  >
                    View on Map
                  </a>
                </div>
                <div className="flex items-center">
                  <Users size={18} className="mr-3 text-[#35179d]" />
                  <span className="text-[#35179d]">{participantsCount} of {room.maxParticipants} joined</span>
                </div>
                <div className="flex items-center">
                  <User size={18} className="mr-3 text-[#35179d]" />
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full overflow-hidden mr-2">
                      <img 
                        src={room.host?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} 
                        alt={room.host?.name || "Host"} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[#35179d]">Hosted by {room.hostName || room.host?.name || "Unknown"}</span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              {room.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-[#35179d]">Description</h3>
                  <p className="text-[#35179d]">{room.description}</p>
                </div>
              )}
              
              {/* Participants */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-[#35179d]">Participants ({participantsCount})</h3>
                <div className="flex flex-wrap gap-2">
                  {participants.map(participant => (
                    <div key={participant.id} className="flex items-center bg-[#35179d] rounded-full px-3 py-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                        <img 
                          src={participant.avatar || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                          alt={participant.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-white">{participant.name}</span>
                    </div>
                  ))}
                  {participantsCount === 0 && (
                    <p className="text-[#35179d]/60 text-sm">No participants yet. Be the first to join!</p>
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  className="flex-1 bg-orange-500 text-white font-bold hover:bg-orange-600 border-none"
                  onClick={() => navigate('/')}
                >
                  Back to Home
                </Button>
                {!isUserHost && (
                  <Button 
                    className={`flex-1 ${
                      isUserJoined 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : hasPendingRequest 
                          ? 'bg-gray-400 hover:bg-gray-500' 
                          : 'bg-[#887DC0] hover:bg-[#887DC0]/90'
                    }`}
                    disabled={isRoomFull && !isUserJoined || actionLoading}
                    onClick={isUserJoined ? handleJoinLeave : hasPendingRequest ? handleCancelRequest : handleRequestJoin}
                  >
                    {actionLoading 
                      ? "Processing..." 
                      : (isUserJoined 
                        ? "Leave Activity" 
                        : hasPendingRequest 
                          ? "Request Sent ✓" 
                          : (isRoomFull ? "Activity Full" : "Request to Join"))}
                  </Button>
                )}

                {isUserHost && (
                  <Button 
                    className="flex-1 bg-[#1A1A72] hover:bg-[#1A1A72]/90 text-white"
                    onClick={() => navigate(`/edit-room/${id}`)}
                  >
                    Edit Activity
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RoomDetailPage;