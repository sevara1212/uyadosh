import { useNavigate, useParams } from "react-router-dom";
import RoomChat from "@/components/RoomChat";
import { ArrowLeft, MapPin, Calendar, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getRoomById } from "@/services/roomService";
import { Room } from "@/types";
import { formatDateTime, formatDuration } from "@/lib/utils";


const ChatPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roomId) {
      setLoading(true);
      getRoomById(roomId)
        .then((r) => setRoom(r))
        .finally(() => setLoading(false));
    }
  }, [roomId]);

  if (!roomId) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#35179d]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white mb-2">Room not found</h2>
          <p className="text-white/70 mb-4">The chat room you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#35179d] flex flex-col h-screen w-screen z-50">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-gradient-to-r from-[#35179d] to-[#2a146a] shadow-sm">
        <button
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <ArrowLeft className="h-6 w-6 text-white" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-lg text-white truncate">Activity Chat</h1>
          {room && (
            <p className="text-sm text-white/80 truncate">{room.title}</p>
          )}
        </div>
      </div>

      {/* Activity Details */}
      {room && (
        <div className="w-full flex flex-col items-center justify-center py-4 border-b bg-gradient-to-r from-[#35179d] to-[#2a146a] shadow-sm">
          <div className="font-bold text-white text-xl text-center mb-2">
            {room.sportType}
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center text-xs text-white mb-3">
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full shadow-sm border border-white/30 backdrop-blur-sm">
              <Calendar className="w-3 h-3 text-white" />
              {formatDateTime(room.dateTime)}
            </span>
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full shadow-sm border border-white/30 backdrop-blur-sm">
              <Clock className="w-3 h-3 text-white" />
              {formatDuration(room.duration)}
            </span>
            <span className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full shadow-sm border border-white/30 backdrop-blur-sm">
              <MapPin className="w-3 h-3 text-white" />
              {room.location.city}
            </span>
          </div>
          
          {room.description && (
            <div className="text-sm text-white/90 text-center max-w-md px-4 italic">
              "{room.description}"
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p className="text-white text-sm">Loading chat...</p>
          </div>
        </div>
      )}

      

      {/* Chat UI */}
      {!loading && (
        <div className="flex-1 min-h-0">
          <RoomChat roomId={roomId} isOpen={true} onClose={() => navigate(-1)} />
        </div>
      )}
    </div>
  );
};

export default ChatPage; 