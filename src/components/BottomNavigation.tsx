
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Heart, MessageCircle, User } from "lucide-react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => currentPath === path;
  
  return (
    <div className="bottom-nav-fixed h-16 flex items-center justify-between px-6 bg-white border-t border-gray-200">
      <button 
        onClick={() => navigate('/')}
        className={`flex flex-col items-center justify-center flex-1 gap-1 ${isActive('/') ? 'text-[#FFC107]' : 'text-gray-400'}`}
      >
        <Home size={24} />
        <span className="text-xs">Home</span>
      </button>
      
      <button 
        onClick={() => navigate('/activities')}
        className={`flex flex-col items-center justify-center flex-1 gap-1 ${isActive('/activities') ? 'text-[#FFC107]' : 'text-gray-400'}`}
      >
        <Heart size={24} />
        <span className="text-xs">Favorites</span>
      </button>
      
      <button 
        onClick={() => navigate('/chats')}
        className={`flex flex-col items-center justify-center flex-1 gap-1 relative ${isActive('/chats') ? 'text-[#FFC107]' : 'text-gray-400'}`}
      >
        <div className="relative">
          <MessageCircle size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        <span className="text-xs">Messages</span>
      </button>
      
      <button 
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center justify-center flex-1 gap-1 ${isActive('/profile') ? 'text-[#FFC107]' : 'text-gray-400'}`}
      >
        <User size={24} />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
