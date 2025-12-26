
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { ActivityLevel, SportType, Room } from "@/types";
import { ArrowLeft, Check, Camera, Edit2, X, Loader2, MessageCircle, Bell, User, Heart, Plus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { getSportIcon } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { getJoinedRooms, getSentRequests, getUserInvolvedActivities } from "@/services/roomService";
import { toast } from "sonner";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { 
    user, 
    loading, 
    uploadingImage, 
    uploadProfileImage, 
    updateActivityLevel, 
    updateSportInterests,
    updateBio 
  } = useProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<ActivityLevel | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<SportType[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [joinedActivities, setJoinedActivities] = useState<Room[]>([]);
  const [sentRequests, setSentRequests] = useState<Room[]>([]);
  const [involvedActivities, setInvolvedActivities] = useState<Room[]>([]);
  const [activeTab, setActiveTab] = useState<'join-requests' | 'sent-requests' | 'activity-chats'>('join-requests');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Check if user is logged in and redirect if not
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, loading, navigate]);

  // Load activities and requests
  useEffect(() => {
    if (currentUser) {
      loadActivities();
    }
  }, [currentUser]);

  const loadActivities = async () => {
    try {
      const [joined, sent, involved] = await Promise.all([
        getJoinedRooms(currentUser!.id),
        getSentRequests(currentUser!.id),
        getUserInvolvedActivities(currentUser!.id)
      ]);
      setJoinedActivities(joined);
      setSentRequests(sent);
      setInvolvedActivities(involved);
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  };
  
  // Initialize edit fields when user data is available
  useEffect(() => {
    if (user) {
      setEditBio(user.bio || "");
      setSelectedLevel(user.activityLevel);
      setSelectedInterests([...user.interests]);
      setAvatarUrl(user.avatar || null);
    } else if (currentUser) {
      // If user is not available from useProfile but currentUser is available from useAuth
      setEditBio(currentUser.bio || "");
      setSelectedLevel(currentUser.activityLevel);
      setSelectedInterests([...currentUser.interests]);
      setAvatarUrl(currentUser.avatar || null);
    }
  }, [user, currentUser]);
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    
    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }
    
    const newAvatarUrl = await uploadProfileImage(file);
    if (newAvatarUrl) {
      setAvatarUrl(newAvatarUrl);
    }
  };
  
  const handleSaveProfile = async () => {
    let success = true;
    
    // Update bio if changed
    if (editBio !== (user?.bio || "")) {
      success = await updateBio(editBio) && success;
    }
    
    // Update activity level if changed
    if (selectedLevel && selectedLevel !== user?.activityLevel) {
      success = await updateActivityLevel(selectedLevel) && success;
    }
    
    // Update interests if changed
    const currentInterests = user?.interests || [];
    if (JSON.stringify(selectedInterests.sort()) !== JSON.stringify(currentInterests.sort())) {
      success = await updateSportInterests(selectedInterests) && success;
    }
    
    if (success) {
      setIsEditing(false);
    }
  };
  
  const toggleSportInterest = (sport: SportType) => {
    if (selectedInterests.includes(sport)) {
      setSelectedInterests(selectedInterests.filter(s => s !== sport));
    } else {
      setSelectedInterests([...selectedInterests, sport]);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast.error("Failed to log out");
    }
  };
  
  // Use either user from useProfile or currentUser from useAuth
  const displayUser = user || currentUser;
  
  if (loading || !displayUser) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-72">
          <Loader2 className="h-8 w-8 animate-spin text-fitness-primary" />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="min-h-screen bg-[#35179d] py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <ArrowLeft 
              size={20} 
              className="mr-3 cursor-pointer text-white hover:text-white/80 transition-colors" 
              onClick={() => navigate(-1)}
            />
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Chats</h1>
              <p className="text-white/70 text-sm">Stay connected with your activities</p>
            </div>
          </div>
          
          {/* Profile Button */}
          <Button 
            variant="outline" 
            size="sm"
            className="text-white border-white/30 hover:bg-white/20 bg-[#35179d]/20 rounded-full w-12 h-12 p-0 transition-all duration-200 hover:scale-105 shadow-lg"
            onClick={() => navigate('/profile-settings')}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Chats Content */}
        <div className="space-y-6">
          {/* Messages & Requests Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Messages & Requests</h3>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab('join-requests')}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                  activeTab === 'join-requests'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Join Requests
                {joinedActivities.length > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {joinedActivities.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('sent-requests')}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                  activeTab === 'sent-requests'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sent Requests
                {sentRequests.length > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {sentRequests.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('activity-chats')}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                  activeTab === 'activity-chats'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Activity Chats
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'join-requests' && (
              <div>
                {joinedActivities.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell size={40} className="text-white/50 mx-auto mb-3" />
                    <p className="text-white/80 text-base font-medium mb-1">No join requests</p>
                    <p className="text-white/60 text-sm">You'll be notified when someone wants to join your activities</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {joinedActivities.slice(0, 5).map((activity) => (
                      <div 
                        key={activity.id}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-200 border border-white/10"
                        onClick={() => navigate(`/room/${activity.id}`)}
                      >
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-xl">{getSportIcon(activity.sportType)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate text-base">{activity.title}</h4>
                          <p className="text-white/70 text-sm truncate">
                            {new Date(activity.dateTime).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="bg-green-500 text-white text-xs">New</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'sent-requests' && (
              <div>
                {sentRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Send size={40} className="text-white/50 mx-auto mb-3" />
                    <p className="text-white/80 text-base font-medium mb-1">No sent requests</p>
                    <p className="text-white/60 text-sm">You haven't sent any join requests yet</p>
                    <Button 
                      className="mt-4 bg-[#35179d] hover:bg-[#35179d]/80 text-white"
                      onClick={() => navigate('/activities')}
                    >
                      Find Activities
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sentRequests.map((activity) => (
                      <div 
                        key={activity.id}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-200 border border-white/10"
                        onClick={() => navigate(`/room/${activity.id}`)}
                      >
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-xl">{getSportIcon(activity.sportType)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate text-base">{activity.title}</h4>
                          <p className="text-white/70 text-sm truncate">
                            Hosted by {activity.hostName || 'Unknown'}
                          </p>
                          <p className="text-white/60 text-xs truncate">
                            {new Date(activity.dateTime).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className="bg-yellow-500 text-white text-xs">Pending</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'activity-chats' && (
              <div>
                {involvedActivities.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle size={40} className="text-white/50 mx-auto mb-3" />
                    <p className="text-white/80 text-base font-medium mb-1">No active chats</p>
                    <p className="text-white/60 text-sm">Join activities to start chatting with other participants</p>
                    <Button 
                      className="mt-4 bg-[#35179d] hover:bg-[#35179d]/80 text-white"
                      onClick={() => navigate('/activities')}
                    >
                      Find Activities
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {involvedActivities.map((activity) => (
                      <div 
                        key={activity.id}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all duration-200 border border-white/10"
                        onClick={() => navigate(`/chat/${activity.id}`)}
                      >
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-xl">{getSportIcon(activity.sportType)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate text-base">{activity.title}</h4>
                          <p className="text-white/70 text-sm truncate">
                            {activity.hostId === currentUser?.id ? 'You created this' : `Hosted by ${activity.hostName || 'Unknown'}`}
                          </p>
                          <p className="text-white/60 text-xs truncate">
                            {new Date(activity.dateTime).toLocaleDateString()}
                          </p>
                        </div>
                        <MessageCircle size={18} className="text-white/60" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-1">Quick Actions</h3>
              <p className="text-white/70 text-sm">Get started quickly</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline"
                className="text-white border-white/30 hover:bg-white/20 bg-[#35179d]/20 transition-all duration-200 hover:scale-105 h-12"
                onClick={() => navigate('/activities')}
              >
                <Heart className="h-5 w-5 mr-2" />
                Discover
              </Button>
              <Button 
                variant="outline"
                className="text-white border-white/30 hover:bg-white/20 bg-[#35179d]/20 transition-all duration-200 hover:scale-105 h-12"
                onClick={() => navigate('/create')}
              >
                <Plus className="h-5 w-5 mr-2" />
                Create
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
