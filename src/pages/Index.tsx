
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import RoomCard from "@/components/RoomCard";
import SportCategoryCard from "@/components/SportCategoryCard";
import { SportType, Room } from "@/types";
import { Search, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllActivities } from "@/services/roomService";

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [userRooms, setUserRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedRooms, setRecommendedRooms] = useState<Room[]>([]);
  
  // Fetch activities when component mounts
  useEffect(() => {
    fetchAllActivities();
  }, [currentUser]);

  // Fetch all activities
  const fetchAllActivities = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const activities = await getAllActivities(); // Show all activities
      setRooms(activities || []);
      
      // Filter user's activities if logged in
      if (currentUser) {
        const userActivities = (activities || []).filter(activity => 
          activity.participants?.includes(currentUser.id)
        );
        setUserRooms(userActivities);
      } else {
        setUserRooms([]);
      }
    } catch (err: any) {
      console.error('Error fetching activities:', err);
      setError(err.message || 'Failed to fetch activities');
      setRooms([]);
      setUserRooms([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate recommendation score for an activity
  const calculateRecommendationScore = (room: Room) => {
    try {
      const now = new Date();
      let score = 0;
      
      // Base score for being upcoming
      score += 100;
      
      // Bonus for activities that match user interests
      if (currentUser && currentUser.interests) {
        if (currentUser.interests.includes(room.sportType)) {
          score += 50;
        }
      }
      
      // Bonus for activities with available spots (not full)
      const participantsCount = room.participants?.length || 0;
      const availableSpots = (room.maxParticipants || 0) - participantsCount;
      if (availableSpots > 0) {
        score += availableSpots * 10; // More available spots = higher score
      } else {
        score -= 100; // Penalty for full activities
      }
      
      // Bonus for activities happening soon (within next 7 days)
      try {
        const activityDate = new Date(room.dateTime);
        const daysUntilActivity = Math.ceil((activityDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        if (daysUntilActivity <= 7) {
          score += 30;
        }
      } catch (error) {
        console.error('Error calculating days until activity:', error);
      }
      
      // Bonus for activities with more participants (social factor)
      if (participantsCount > 0 && participantsCount < (room.maxParticipants || 0)) {
        score += participantsCount * 2;
      }
      
      return score;
    } catch (error) {
      console.error('Error calculating recommendation score:', error);
      return 0;
    }
  };
  
  // Sort rooms based on recommendations
  useEffect(() => {
    try {
      if (rooms && rooms.length > 0) {
        // Filter upcoming activities
        const now = new Date();
        const upcomingRooms = rooms.filter(room => {
          try {
            return new Date(room.dateTime) > now;
          } catch (error) {
            console.error('Error parsing date for room:', room.id, error);
            return false;
          }
        });
        
        // Sort by recommendation score
        const sortedRooms = upcomingRooms.sort((a, b) => {
          try {
            const scoreA = calculateRecommendationScore(a);
            const scoreB = calculateRecommendationScore(b);
            return scoreB - scoreA;
          } catch (error) {
            console.error('Error calculating recommendation score:', error);
            return 0;
          }
        });
        
        // Take first 7 recommended rooms
        setRecommendedRooms(sortedRooms.slice(0, 7));
      } else {
        setRecommendedRooms([]);
      }
    } catch (error) {
      console.error('Error in recommendation calculation:', error);
      setRecommendedRooms([]);
    }
  }, [rooms, currentUser]);

  // Determine popular sport categories (only show sports that exist in our data)
  const popularSportTypes = [SportType.Running, SportType.Yoga, SportType.Tennis, SportType.Gym];
  
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

  const handleRoomAction = () => {
    // Refresh data when a user joins or leaves a room
    fetchAllActivities();
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-[#35179d] text-white flex flex-col items-center justify-start font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* Header and Slogan */}
        <div className="w-full max-w-2xl px-4 pt-8 pb-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-full bg-white overflow-hidden" style={{ height: '3.5rem', width: '3.5rem', minWidth: '3.5rem' }}>
              <img src="/images/muvr_logo.png" alt="Muvr Logo" className="h-[60rem] w-[60rem] object-contain" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-left leading-tight">Muvr.u</h1>
          </div>
          {/* Search Bar */}
          <div className="my-4">
            <div className="flex items-center bg-[#7c5dfa]/60 rounded-full px-4 py-2 shadow-inner">
              <Search size={20} className="text-white/80 mr-2" />
              <input
                type="text"
                placeholder="Search activities..."
                className="bg-transparent outline-none border-none text-white/90 placeholder-white/70 w-full text-base"
                style={{ fontFamily: 'inherit' }}
                readOnly
                onClick={() => navigate('/explore')}
              />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-left mt-2 mb-4">Move , Match , Motivate!</div>
        </div>
        {/* Hero Image */}
        <div className="w-full max-w-2xl px-4 mb-4">
          <div className="rounded-[2.5rem] shadow-xl overflow-hidden">
            <img 
              src="/images/muvr_photo.png"
              alt="Muvr Team"
              className="w-full object-cover"
              style={{ maxHeight: '380px', minHeight: '220px', objectFit: 'cover' }}
            />
          </div>
        </div>
        {/* Categories */}
        <div className="w-full max-w-2xl px-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-left">Categories</h2>
            <button 
              onClick={() => navigate('/explore')}
              className="text-base text-white/80 hover:text-white underline font-medium"
            >
              See all
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {popularSportTypes.map(sport => (
              <div className="flex flex-col items-center justify-between bg-white rounded-2xl shadow h-24 w-20 mx-auto cursor-pointer hover:bg-gray-100 transition p-2" key={sport}>
                <div className="flex-grow flex flex-col items-center justify-center">
                  <img 
                    src={sportIcons[sport] || '/images/other_icon.png'} 
                    alt={sport + ' icon'} 
                    className="h-14 w-14 object-contain mb-[2px]" 
                    onError={(e) => {
                      e.currentTarget.src = '/images/other_icon.png';
                    }}
                  />
                  <span className="text-xs font-semibold text-[#35179d] capitalize leading-tight text-center mt-0.5">{sport}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Upcoming Activities */}
        <div className="w-full max-w-2xl px-4 mb-4">
          <h2 className="text-2xl font-bold text-left mb-2">Recommended Activities</h2>
          <div className="space-y-3">
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-white/80" />
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-300">
                Failed to load activities. Please try again.
              </div>
            ) : recommendedRooms && recommendedRooms.length > 0 ? (
              recommendedRooms.map(room => (
                <RoomCard 
                  key={room.id}
                  room={room} 
                  onActionComplete={handleRoomAction}
                />
              ))
            ) : (
              <div className="text-center py-4 text-white/60">
                No upcoming activities found. 
                <button 
                  onClick={() => navigate('/create')}
                  className="ml-2 underline hover:text-white"
                >
                  Create one?
                </button>
              </div>
            )}
          </div>
        </div>
        {/* User's Activities (if logged in) */}
        {currentUser && userRooms && userRooms.length > 0 && (
          <div className="w-full max-w-2xl px-4 mb-4">
            <h2 className="text-2xl font-bold text-left mb-2">Your Activities</h2>
            <div className="space-y-3">
              {userRooms.slice(0, 2).map(room => (
                <RoomCard 
                  key={room.id}
                  room={room} 
                  onActionComplete={handleRoomAction}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
