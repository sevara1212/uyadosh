
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import RoomCard from "@/components/RoomCard";
import SportCategoryCard from "@/components/SportCategoryCard";
import { SportType, Room } from "@/types";
import { Search, Loader2, Heart, Filter, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllActivities } from "@/services/roomService";
import logo from '/public/images/logo.jpg';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [userRooms, setUserRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedRooms, setRecommendedRooms] = useState<Room[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    gender: '',
    ageMin: 18,
    ageMax: 65,
    verified: false,
    type: 'all'
  });
  
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch activities';
      console.error('Error fetching activities:', err);
      setError(errorMessage);
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

  // Apply filters to recommendations
  const filteredRooms = recommendedRooms.filter(room => {
    // Filter by location
    if (filters.location && !room.location?.address?.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    // Filter by gender (if applicable to user profile)
    if (filters.gender && currentUser) {
      // This would need to check user profile or room preferences
      // For now, we'll skip this as it depends on user data structure
    }

    // Filter by age range
    if (currentUser?.age) {
      if (currentUser.age < filters.ageMin || currentUser.age > filters.ageMax) {
        return false;
      }
    }

    return true;
  });
  
  return (
    <Layout>
      <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-start font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        {/* Header */}
        <div className="w-full max-w-2xl px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-lg overflow-hidden" style={{ height: '48px', width: '48px', minWidth: '48px' }}>
                <img src={logo} alt="Uyadosh Logo" className="h-full w-full object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>Uyadosh</h1>
            </div>
            <button 
              className="w-10 h-10 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center font-bold hover:bg-gray-400 transition"
              onClick={() => navigate('/profile')}
              title="Go to profile"
            >
              {currentUser?.displayName?.charAt(0).toUpperCase() || '👤'}
            </button>
          </div>
          
          {/* Search Bar and Filter */}
          <div className="mb-4">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search locations, roommates..."
                className="bg-transparent outline-none border-none text-gray-700 placeholder-gray-500 w-full text-sm"
                style={{ fontFamily: 'inherit' }}
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
              <button 
                className="ml-2 text-gray-600 hover:text-gray-800 transition"
                onClick={() => setShowFilter(!showFilter)}
              >
                <Filter size={20} />
              </button>
            </div>

            {/* Advanced Filter Panel */}
            {showFilter && (
              <div className="mt-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900">Filter Roommates</h3>
                  <button 
                    onClick={() => setShowFilter(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Gender Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={filters.gender}
                      onChange={(e) => setFilters({...filters, gender: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                    >
                      <option value="">Any</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Age Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="18"
                        max="100"
                        value={filters.ageMin}
                        onChange={(e) => setFilters({...filters, ageMin: parseInt(e.target.value)})}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
                        placeholder="Min age"
                      />
                      <input
                        type="number"
                        min="18"
                        max="100"
                        value={filters.ageMax}
                        onChange={(e) => setFilters({...filters, ageMax: parseInt(e.target.value)})}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700"
                        placeholder="Max age"
                      />
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                    >
                      <option value="all">All</option>
                      <option value="properties">Properties</option>
                      <option value="seekers">Roommate Seekers</option>
                    </select>
                  </div>

                  {/* Verified Only */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="verified"
                      checked={filters.verified}
                      onChange={(e) => setFilters({...filters, verified: e.target.checked})}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <label htmlFor="verified" className="ml-2 text-sm text-gray-700 font-medium">
                      Verified Only
                    </label>
                  </div>

                  <button
                    onClick={() => setShowFilter(false)}
                    className="w-full mt-4 bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-2xl px-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => {
                if (currentUser) {
                  navigate('/create');
                } else {
                  navigate('/login');
                }
              }}
              className="bg-gray-800 text-white rounded-full py-3 font-bold text-lg hover:bg-gray-900 transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>🏠</span> Add Property
            </button>
            <button 
              onClick={() => {
                if (currentUser) {
                  navigate('/activities');
                } else {
                  navigate('/login');
                }
              }}
              className="bg-gray-600 text-white rounded-full py-3 font-bold text-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 shadow-md"
            >
              <span>👥</span> Find Roommate
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="w-full max-w-2xl px-4 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-full font-medium text-sm whitespace-nowrap">
              All
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200">
              Properties
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200">
              Seekers
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200">
              Verified
            </button>
          </div>
        </div>

        {/* Available Listings */}
        <div className="w-full max-w-2xl px-4 mb-6">
          <h2 className="text-xl font-bold mb-3 text-gray-900">Available Listings</h2>
          <div className="space-y-3">
            {loading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#1e3a8a]" />
              </div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">
                Failed to load listings. Please try again.
              </div>
            ) : filteredRooms && filteredRooms.length > 0 ? (
              filteredRooms.map(room => (
                <div 
                  key={room.id}
                  onClick={() => navigate(`/room/${room.id}`)}
                  className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-white text-2xl">
                      🏠
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-gray-900">{room.title}</h3>
                      <p className="text-sm text-gray-600">{room.location.address}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                        <span>👥 {room.participants?.length || 0} roommate(s)</span>
                        <span>📅 {new Date(room.dateTime).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button className="text-gray-600 hover:text-gray-800">
                        <Heart size={20} fill="currentColor" />
                      </button>
                      <button className="text-gray-600 text-2xl">⭐</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No listings found. 
                <button 
                  onClick={() => navigate('/create')}
                  className="ml-2 underline text-gray-800 font-semibold"
                >
                  Create one?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
