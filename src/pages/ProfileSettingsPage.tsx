import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { ActivityLevel, SportType } from "@/types";
import { ArrowLeft, Check, Camera, Edit2, X, Loader2, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
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

const ProfileSettingsPage = () => {
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Check if user is logged in and redirect if not
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, loading, navigate]);
  
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
      toast.success("Profile updated successfully!");
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
      toast.success("Logged out successfully");
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
              <h1 className="text-2xl font-bold text-white mb-1">Profile Settings</h1>
              <p className="text-white/70 text-sm">Manage your account and preferences</p>
            </div>
          </div>
          
          {isEditing ? (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="text-white border-white/30 hover:bg-white/20 bg-[#35179d]/20 font-medium"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button 
                size="sm"
                className="bg-white text-[#35179d] hover:bg-white/90"
                onClick={handleSaveProfile}
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              className="text-white border-white/30 hover:bg-white/20 bg-[#35179d]/20 font-medium"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
        
        {/* Profile Content */}
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-white/60" />
                  )}
                </div>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0 bg-white text-[#35179d] hover:bg-white/90"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                  >
                    {uploadingImage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1">
                  {displayUser.name || displayUser.email}
                </h3>
                <p className="text-white/70 text-sm">{displayUser.email}</p>
                {isEditing && (
                  <p className="text-white/50 text-xs mt-1">
                    Tap the camera icon to change photo
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-3">About Me</h3>
            {isEditing ? (
              <Textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="Tell us about yourself..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                rows={3}
              />
            ) : (
              <p className="text-white/80 text-sm">
                {displayUser.bio || "No bio added yet."}
              </p>
            )}
          </div>

          {/* Activity Level */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-3">Activity Level</h3>
            {isEditing ? (
              <Select
                value={selectedLevel || ""}
                onValueChange={(value) => setSelectedLevel(value as ActivityLevel)}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ActivityLevel.Beginner}>Beginner</SelectItem>
                  <SelectItem value={ActivityLevel.Intermediate}>Intermediate</SelectItem>
                  <SelectItem value={ActivityLevel.Advanced}>Advanced</SelectItem>
                  <SelectItem value={ActivityLevel.Expert}>Expert</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge variant="outline" className="text-white border-white/30">
                {displayUser.activityLevel || "Not specified"}
              </Badge>
            )}
          </div>

          {/* Sport Interests */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-3">Sport Interests</h3>
            <div className="flex flex-wrap gap-2">
              {Object.values(SportType).map((sport) => (
                <Badge
                  key={sport}
                  variant={selectedInterests.includes(sport) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedInterests.includes(sport)
                      ? "bg-white text-[#35179d]"
                      : "text-white border-white/30 hover:bg-white/20"
                  } ${isEditing ? "hover:scale-105" : ""}`}
                  onClick={() => isEditing && toggleSportInterest(sport)}
                >
                  {sport}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <p className="text-white/50 text-xs mt-2">
                Tap to select/deselect your interests
              </p>
            )}
          </div>

          {/* Account Actions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-4">Account</h3>
            <div className="space-y-3">
              <Button 
                variant="outline"
                className="w-full text-white border-white/30 hover:bg-white/20 bg-[#35179d]/20 transition-all duration-200 hover:scale-105"
                onClick={() => navigate('/payment')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Payment Settings
              </Button>
              <Button 
                variant="outline"
                className="w-full text-red-400 border-red-400/30 hover:bg-red-400/20 transition-all duration-200 hover:scale-105"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSettingsPage; 