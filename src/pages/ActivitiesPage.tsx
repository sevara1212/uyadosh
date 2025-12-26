
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getAllActivities } from '@/services/roomService';
import { Room, SportType, ActivityLevel, Gender } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import { 
  Heart, 
  X, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  SlidersHorizontal,
  Navigation
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface ActivityCardProps {
  activity: Room;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
  onTap: () => void;
  showDetails?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  onSwipeRight, 
  onSwipeLeft, 
  onTap, 
  showDetails = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const spotsLeft = activity.maxParticipants - (activity.participants?.length || 0);
  const capacityPercentage = ((activity.participants?.length || 0) / activity.maxParticipants) * 100;
  
  const getSportIcon = (sport: SportType) => {
    const icons: Record<SportType, string> = {
      [SportType.Running]: '🏃‍♂️',
      [SportType.Yoga]: '🧘‍♀️',
      [SportType.Cycling]: '🚴‍♂️',
      [SportType.Swimming]: '🏊‍♂️',
      [SportType.Basketball]: '🏀',
      [SportType.Football]: '⚽',
      [SportType.Tennis]: '🎾',
      [SportType.Gym]: '💪',
      [SportType.Other]: '🏆'
    };
    return icons[sport] || '🏆';
  };

  const getAIBlurb = () => {
    if (spotsLeft <= 2) return "🔥 Fills fast — only 2 spots left!";
    if (spotsLeft <= 5) return "⚡ Popular activity — join quickly!";
    if (capacityPercentage > 70) return "🎯 Great group forming!";
    return "✨ Perfect timing to join!";
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragStartX(e.touches[0].clientX);
    setIsDragging(true);
    setHasDragged(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragStartX !== null) {
      const currentX = e.touches[0].clientX;
      const delta = currentX - dragStartX;
      setDragDelta(delta);
      if (Math.abs(delta) > 5) {
        setHasDragged(true);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (Math.abs(dragDelta) > 30) {
      if (dragDelta > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
    setDragStartX(null);
    setDragDelta(0);
    setIsDragging(false);
    setHasDragged(false);
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragStartX(e.clientX);
    setIsDragging(true);
    setHasDragged(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (dragStartX !== null) {
      const currentX = e.clientX;
      const delta = currentX - dragStartX;
      setDragDelta(delta);
      if (Math.abs(delta) > 5) {
        setHasDragged(true);
      }
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    if (Math.abs(dragDelta) > 30) {
      if (dragDelta > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
    setDragStartX(null);
    setDragDelta(0);
    setIsDragging(false);
    setHasDragged(false);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  React.useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

    return (
    <Card 
      ref={cardRef}
      className="w-full max-w-xs mx-auto bg-white rounded-3xl shadow-2xl border-0 overflow-hidden cursor-grab active:cursor-grabbing select-none touch-none"
      style={{
        transform: `translateX(${dragDelta}px) rotate(${dragDelta / 20}deg)`,
        transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isDragging ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        opacity: isDragging ? 0.9 : 1,
        touchAction: 'none',
      }}
      onClick={(e) => {
        if (!hasDragged) {
          onTap();
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {/* Activity Image/Background */}
      <div className="relative h-64 bg-gradient-to-br from-purple-500 to-blue-600">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Tap to expand indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-xs font-medium text-gray-700">
              {showDetails ? 'Tap to collapse' : 'Tap for details'}
            </span>
          </div>
        </div>
        
        {/* Sport Icon Overlay */}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
            <span className="text-2xl">{getSportIcon(activity.sportType)}</span>
          </div>
        </div>

        {/* Host Info */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 flex items-center gap-1">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-semibold">4.8</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-800">
                {spotsLeft} spots left
              </span>
              <span className="text-xs text-gray-600">
                {activity.participants?.length || 0}/{activity.maxParticipants}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${capacityPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Details */}
      <CardContent className="p-6">
        {/* Title and Sport */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {activity.title}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {activity.sportType}
            </Badge>
          </div>
        </div>

        {/* AI Blurb */}
        <p className="text-sm text-purple-600 font-medium mb-4">
          {getAIBlurb()}
        </p>

        {/* Basic Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock size={14} />
            <span>{new Date(activity.dateTime).toLocaleDateString()} at {new Date(activity.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={14} />
            <span>{activity.location.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={14} />
            <span>Hosted by {activity.hostName || 'Anonymous'}</span>
          </div>
        </div>

        {/* Expanded Details */}
        {showDetails && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Activity Details</h4>
            <div className="space-y-2 text-sm text-gray-600">
              {activity.description && (
                <p className="text-gray-700">{activity.description}</p>
              )}
              <div className="flex items-center gap-2">
                <span className="font-medium">Difficulty:</span>
                <Badge variant="outline" className="text-xs">
                  Not specified
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Gender Preference:</span>
                <Badge variant="outline" className="text-xs">
                  {activity.genderPreference || 'All'}
                </Badge>
              </div>
              {activity.ageRange && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Age Range:</span>
                  <span>{activity.ageRange.min} - {activity.ageRange.max} years</span>
                </div>
              )}
              {activity.price && activity.price > 0 && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Price:</span>
                  <span>${activity.price}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface FilterSettings {
  distance: number;
  ageRange: [number, number];
  gender: Gender | 'All';
  activityLevel: ActivityLevel | 'All';
  selectedSports: SportType[];
  priceRange: [number, number];
  useLocation: boolean;
}

const ActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activities, setActivities] = useState<Room[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Room[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swipedActivities, setSwipedActivities] = useState<Set<string>>(new Set());
  const [showDetails, setShowDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const [filters, setFilters] = useState<FilterSettings>({
    distance: 25,
    ageRange: [18, 65],
    gender: 'All',
    activityLevel: 'All',
    selectedSports: [],
    priceRange: [0, 100],
    useLocation: false
  });
  
  useEffect(() => {
    loadActivities();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [activities, filters]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setFilters(prev => ({ ...prev, useLocation: true }));
          toast.success('Location enabled!');
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Could not get your location');
        }
      );
    } else {
      toast.error('Location services not available');
    }
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const applyFilters = () => {
    if (activities.length === 0) return;

    const now = new Date();

    let filtered = activities.filter(activity => {
      // Exclude past activities
      try {
        if (!activity.dateTime) return false;
        if (new Date(activity.dateTime) <= now) return false;
      } catch {
        return false;
      }

      // Filter by sport type, or use user interests when none selected
      if (filters.selectedSports.length > 0) {
        if (!filters.selectedSports.includes(activity.sportType)) {
          return false;
        }
      } else if (currentUser?.interests && currentUser.interests.length > 0) {
        if (!currentUser.interests.includes(activity.sportType)) {
          return false;
        }
      }

      // Filter by gender preference
      if (filters.gender !== 'All' && activity.genderPreference && activity.genderPreference !== filters.gender) {
        return false;
      }

      // Filter by age range
      if (activity.ageRange) {
        const { min, max } = activity.ageRange;
        if (filters.ageRange[0] > max || filters.ageRange[1] < min) {
          return false;
        }
      }

      // Filter by price
      if (activity.price && (activity.price < filters.priceRange[0] || activity.price > filters.priceRange[1])) {
        return false;
      }

      return true;
    });

    // If user has no interests and no explicit sport filter, provide a randomized mix
    if (filters.selectedSports.length === 0 && (!currentUser?.interests || currentUser.interests.length === 0)) {
      filtered = [...filtered].sort(() => Math.random() - 0.5);
    }

    setFilteredActivities(filtered);
    setCurrentIndex(0);
    setSwipedActivities(new Set());
  };

  const loadActivities = async () => {
    try {
      setLoading(true);
      const allActivities = await getAllActivities();
      // Show everything by default (user can filter afterward)
      setActivities(allActivities);
    } catch (error) {
      console.error('Error loading activities:', error);
      toast.error('Failed to load activities');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSwipeRight = async () => {
    if (currentIndex >= filteredActivities.length) return;
    
    const activity = filteredActivities[currentIndex];
    setSwipedActivities(prev => new Set([...prev, activity.id]));
    
    // Move to next card and reset details view
    setCurrentIndex(prev => prev + 1);
    setShowDetails(false);
  };

  const handleSwipeLeft = () => {
    if (currentIndex >= filteredActivities.length) return;
    
    const activity = filteredActivities[currentIndex];
    setSwipedActivities(prev => new Set([...prev, activity.id]));
    
    // Move to next card and reset details view
    setCurrentIndex(prev => prev + 1);
    setShowDetails(false);
  };

  const handleTap = () => {
    if (currentIndex >= filteredActivities.length) return;
    setShowDetails(!showDetails);
  };

  const handleFilter = () => {
    setShowFilters(true);
  };

  const handleFilterChange = (newFilters: Partial<FilterSettings>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      distance: 25,
      ageRange: [18, 65],
      gender: 'All',
      activityLevel: 'All',
      selectedSports: [],
      priceRange: [0, 100],
      useLocation: false
    });
    setShowFilters(true);
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setSwipedActivities(new Set());
    setShowDetails(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#35179d] mx-auto mb-4" />
          <p className="text-gray-600">Loading activities...</p>
        </div>
      </div>
    );
  }

  if (filteredActivities.length === 0) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Heart size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No activities match your filters</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or check back later!</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={resetFilters} variant="outline">
                Reset Filters
              </Button>
              <Button onClick={loadActivities} variant="outline">
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (currentIndex >= filteredActivities.length) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Heart size={48} className="text-[#35179d] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">You've seen all activities!</h3>
            <p className="text-gray-600 mb-4">Check back later for new activities or reset to see them again.</p>
            <Button onClick={resetCards} className="bg-[#35179d] hover:bg-[#2a146a]">
              See Activities Again
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const currentActivity = filteredActivities[currentIndex];
  
  return (
    <Layout>
      <style jsx>{`
        .swipe-container {
          touch-action: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
      <div className="min-h-screen bg-[#35179d] py-6 overflow-hidden swipe-container">
      {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Discover Activities</h1>
            <p className="text-white/70 text-sm">Find your next adventure</p>
          </div>
          <Dialog open={showFilters} onOpenChange={setShowFilters}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/30 hover:bg-white/20 backdrop-blur-sm bg-[#35179d]/20 transition-all duration-200 hover:scale-105"
              >
                <SlidersHorizontal size={20} className="mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Activities</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Distance Filter */}
                <div>
                  <Label className="text-sm font-medium">Distance (km)</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Slider
                      value={[filters.distance]}
                      onValueChange={(value) => handleFilterChange({ distance: value[0] })}
                      max={50}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 w-12">{filters.distance}km</span>
                  </div>
                </div>

                {/* Age Range */}
                <div>
                  <Label className="text-sm font-medium">Age Range</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Slider
                      value={filters.ageRange}
                      onValueChange={(value) => handleFilterChange({ ageRange: value as [number, number] })}
                      max={80}
                      min={14}
                      step={1}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 w-20">
                      {filters.ageRange[0]}-{filters.ageRange[1]}
                    </span>
                  </div>
      </div>

                {/* Gender Filter */}
                <div>
                  <Label className="text-sm font-medium">Gender Preference</Label>
                  <Select
                    value={filters.gender}
                    onValueChange={(value) => handleFilterChange({ gender: value as Gender | 'All' })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Genders</SelectItem>
                      <SelectItem value={Gender.Male}>Male Only</SelectItem>
                      <SelectItem value={Gender.Female}>Female Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sport Types */}
                <div>
                  <Label className="text-sm font-medium">Sport Types</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
          {Object.values(SportType).map((sport) => (
                      <div key={sport} className="flex items-center space-x-2">
                        <Checkbox
                          id={sport}
                          checked={filters.selectedSports.includes(sport)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              handleFilterChange({
                                selectedSports: [...filters.selectedSports, sport]
                              });
                            } else {
                              handleFilterChange({
                                selectedSports: filters.selectedSports.filter(s => s !== sport)
                              });
                            }
                          }}
                        />
                        <Label htmlFor={sport} className="text-sm">{sport}</Label>
                      </div>
          ))}
        </div>
      </div>
      
                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium">Price Range ($)</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => handleFilterChange({ priceRange: value as [number, number] })}
                      max={200}
                      min={0}
                      step={5}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 w-20">
                      ${filters.priceRange[0]}-${filters.priceRange[1]}
                    </span>
                  </div>
                </div>

                {/* Location Services */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Use Location</Label>
                    <p className="text-xs text-gray-500">Filter by distance from your location</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={getCurrentLocation}
                    disabled={filters.useLocation}
                  >
                    <Navigation size={16} className="mr-1" />
                    {filters.useLocation ? 'Enabled' : 'Enable'}
                  </Button>
                </div>

                {/* Reset Button */}
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className="w-full"
                >
                  Reset Filters
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Activity Card */}
        <div className="flex justify-center mb-8 touch-none">
          <div className="relative">
            <ActivityCard
              activity={currentActivity}
              onSwipeRight={handleSwipeRight}
              onSwipeLeft={handleSwipeLeft}
              onTap={handleTap}
              showDetails={showDetails}
            />
            
            {/* Swipe Instructions removed per request */}
          </div>
            </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-6 mb-8 touch-none">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-20 h-20 p-0 border-2 border-red-400 hover:border-red-500 hover:bg-red-500/20 text-red-400 backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-105"
            onClick={handleSwipeLeft}
          >
            <X size={28} />
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-20 h-20 p-0 border-2 border-green-400 hover:border-green-500 hover:bg-green-500/20 text-green-400 backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-105"
            onClick={handleSwipeRight}
          >
            <Heart size={28} />
          </Button>
            </div>
            </div>
    </Layout>
  );
};

export default ActivitiesPage;
