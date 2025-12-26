
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import RoomCard from "@/components/RoomCard";
import SportCategoryCard from "@/components/SportCategoryCard";
import { Room, SportType } from "@/types";
import { Search, Filter, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllActivities, getActivitiesBySport } from "@/services/roomService";
import { toast } from "sonner";

const ExplorePage = () => {
  const navigate = useNavigate();
  const { sport } = useParams<{ sport: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<SportType | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Fetch rooms from Firebase (by category or all)
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        let fetchedRooms: Room[];
        
        if (sport && Object.values(SportType).includes(sport as SportType)) {
          setSelectedCategory(sport as SportType);
          fetchedRooms = await getActivitiesBySport(sport);
        } else if (selectedCategory) {
          fetchedRooms = await getActivitiesBySport(selectedCategory);
        } else {
          fetchedRooms = await getAllActivities();
        }
        
        setRooms(fetchedRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast.error("Failed to load activities");
      } finally {
        setLoading(false);
      }
    };
    // Only fetch by category if search is empty
    if (!searchQuery) {
      fetchRooms();
    }
  }, [selectedCategory, sport, searchQuery]);

  // Fetch all rooms and filter when searching
  useEffect(() => {
    const fetchAndFilter = async () => {
      if (!searchQuery) return;
      setLoading(true);
      try {
        const allRooms = await getAllActivities();
        setRooms(allRooms);
      } catch (error) {
        console.error("Error fetching all rooms for search:", error);
        toast.error("Failed to search activities");
      } finally {
        setLoading(false);
      }
    };
    if (searchQuery) {
      fetchAndFilter();
    }
  }, [searchQuery]);

  // Instant search (no debounce)
  const filteredRooms = rooms.filter(room => {
    const q = searchQuery.trim().toLowerCase();
    
    // If there's a search query, filter by search terms
    if (q) {
      const title = (room.title || "").toLowerCase();
      const desc = (room.description || "").toLowerCase();
      const city = (room.location?.city || "").toLowerCase();
      return title.includes(q) || desc.includes(q) || city.includes(q);
    }
    
    // If there's a selected category (from URL or state), filter by sport type
    const currentCategory = sport || selectedCategory;
    if (currentCategory) {
      return room.sportType === currentCategory;
    }
    
    // If no search and no category, show all
    return true;
  });

  // Calculate recommendation score for an activity
  const calculateRecommendationScore = (room: Room) => {
    const now = new Date();
    let score = 0;
    
    // Base score for being upcoming
    score += 100;
    
    // Bonus for activities with available spots (not full)
    const participantsCount = room.participants?.length || 0;
    const availableSpots = room.maxParticipants - participantsCount;
    if (availableSpots > 0) {
      score += availableSpots * 10; // More available spots = higher score
    } else {
      score -= 100; // Penalty for full activities
    }
    
    // Bonus for activities happening soon (within next 7 days)
    const activityDate = new Date(room.dateTime);
    const daysUntilActivity = Math.ceil((activityDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilActivity <= 7) {
      score += 30;
    }
    
    // Bonus for activities with more participants (social factor)
    if (participantsCount > 0 && participantsCount < room.maxParticipants) {
      score += participantsCount * 2;
    }
    
    return score;
  };

  // Sort filtered rooms by recommendation score
  const sortedRooms = filteredRooms.sort((a, b) => {
    const scoreA = calculateRecommendationScore(a);
    const scoreB = calculateRecommendationScore(b);
    return scoreB - scoreA;
  });
  
  const handleCategorySelect = async (category: SportType) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    
    // Update URL if category changes
    if (newCategory) {
      navigate(`/category/${newCategory}`, { replace: true });
    } else {
      navigate('/explore', { replace: true });
    }
  };
  
  // Refresh rooms after join/leave actions
  const handleRoomAction = async () => {
    setLoading(true);
    try {
      let fetchedRooms: Room[];
      
      if (selectedCategory) {
        fetchedRooms = await getActivitiesBySport(selectedCategory);
      } else {
        fetchedRooms = await getAllActivities();
      }
      
      setRooms(fetchedRooms);
    } catch (error) {
      console.error("Error refreshing rooms:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Category list and icon mapping
  const categories = [
    { name: 'Running', icon: '/images/running_icon.png' },
    { name: 'Yoga', icon: '/images/yoga_icon.png' },
    { name: 'Cycling', icon: '/images/cycling_icon.png' },
    { name: 'Swimming', icon: '/images/swimming_icon.png' },
    { name: 'Basketball', icon: '/images/basketball_icon.png' },
    { name: 'Football', icon: '/images/football_icon.png' },
    { name: 'Tennis', icon: '/images/tennis_icon.png' },
    { name: 'Gym', icon: '/images/gym_icon.png' },
    { name: 'Other', icon: '/images/other_icon.png' },
  ];
  
  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center mb-4">
        <ArrowLeft 
          size={20} 
          className="mr-3 cursor-pointer text-white-force" 
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold text-white-force">Explore Activities</h1>
      </div>
      
      {/* Search Bar */}
      <div className="flex items-center bg-white rounded-full border p-2 px-4 mb-5">
        <Search size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by title, description or city..."
          className="flex-grow bg-transparent focus:outline-none text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter size={18} className="text-gray-400 cursor-pointer" />
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-white-force">Categories</h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name as SportType)}
              className={`${selectedCategory === cat.name ? 'ring-2 ring-fitness-primary' : ''} flex flex-col items-center justify-between bg-white rounded-2xl shadow h-20 w-20 mx-auto cursor-pointer hover:bg-gray-100 transition p-2`}
            >
              <div className="flex-grow flex flex-col items-center justify-center">
                <img src={cat.icon} alt={cat.name + ' icon'} className="h-14 w-14 object-contain mb-0" />
                <span className="text-xs font-semibold text-[#35179d] capitalize leading-tight text-center mt-0">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-white-force">Activities</h2>
          <span className="text-sm text-gray-500">
            {loading ? "Loading..." : `${sortedRooms.length} found`}
          </span>
        </div>
        
        {loading ? (
          <div className="text-center py-8 text-gray-500">
            <p>Loading activities...</p>
          </div>
        ) : sortedRooms.length > 0 ? (
          <div className="space-y-4">
            {/* Show recommended activities (first 7) */}
            {sortedRooms.slice(0, showAllActivities ? undefined : 7).map(room => (
              <RoomCard 
                key={room.id} 
                room={room} 
                onActionComplete={handleRoomAction}
              />
            ))}
            
            {/* Show More/Less button */}
            {sortedRooms.length > 7 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllActivities(!showAllActivities)}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-200"
                >
                  {showAllActivities ? 'Show Less' : `Show More (${sortedRooms.length - 7} more)`}
                </button>
              </div>
            )}
            
            {/* Recommendation info */}
            {!showAllActivities && sortedRooms.length > 7 && (
              <div className="text-center text-white/70 text-sm mt-4">
                <p>Showing top 7 recommended activities based on availability and timing</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No activities found matching your criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ExplorePage;
