
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { ActivityLevel, SportType, Room } from "@/types";
import { ArrowLeft, Check, Camera, Edit2, X, Loader2, LogOut, Heart, Plus, Send, Settings, HelpCircle } from "lucide-react";
import logo from '/public/images/logo.jpg';
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
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <ArrowLeft 
            size={20} 
            className="cursor-pointer text-gray-700"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-bold text-gray-900">Profile</h1>
          <div className="w-6"></div>
        </div>

        {/* Profile Content */}
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="text-center py-8 border-b border-gray-100">
            <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden flex items-center justify-center" style={{ background: '#f3f4f6' }}>
              <img src={logo} alt="Uyadosh" className="h-full w-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{displayUser?.displayName || 'User'}</h2>
            <p className="text-gray-600 mb-3">{displayUser?.email}</p>
            <Badge className="bg-gray-800 text-white border border-gray-700">
              ✓ Verified User
            </Badge>
          </div>

          {/* Edit Profile Button */}
          <div className="p-4">
            <Button 
              onClick={() => navigate('/profile-settings')}
              className="w-full bg-gray-800 text-white hover:bg-gray-900 font-bold py-3 rounded-full transition"
            >
              Edit Profile
            </Button>
          </div>

          {/* Menu Items */}
          <div className="divide-y divide-gray-200">
            {/* My Listings */}
            <div 
              onClick={() => navigate('/activities')}
              className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between"
            >
              <span className="font-semibold text-gray-900">My Listings</span>
              <span className="text-gray-400">→</span>
            </div>

            {/* Settings */}
            <div 
              onClick={() => navigate('/profile-settings')}
              className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Settings size={20} className="text-gray-700" />
                <span className="font-semibold text-gray-900">Settings</span>
              </div>
              <span className="text-gray-400">→</span>
            </div>

            {/* Help & Support */}
            <div 
              onClick={() => toast.info('Help & Support coming soon')}
              className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-gray-700" />
                <span className="font-semibold text-gray-900">Help & Support</span>
              </div>
              <span className="text-gray-400">→</span>
            </div>

            {/* Logout */}
            <div 
              onClick={handleLogout}
              className="p-4 hover:bg-red-50 cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <LogOut size={20} className="text-red-500" />
                <span className="font-semibold text-red-500">Log Out</span>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
