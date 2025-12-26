
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Heart, Plus, Calendar, User } from "lucide-react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => currentPath === path;
  
  return (
    <div className="bottom-nav-fixed h-16 flex items-center justify-between px-6">
      <button 
        onClick={() => navigate('/')}
        className={`flex flex-col items-center justify-center flex-1 ${isActive('/') ? 'text-[#35179d]' : 'text-gray-400'}`}
      >
        <Home size={20} />
        <span className="text-xs mt-1">Home</span>
      </button>
      
      <button 
        onClick={() => navigate('/activities')}
        className={`flex flex-col items-center justify-center flex-1 ${isActive('/activities') ? 'text-[#35179d]' : 'text-gray-400'}`}
      >
        <Heart size={20} />
        <span className="text-xs mt-1">Activities</span>
      </button>
      
      <div className="flex-1 flex justify-center">
        <button 
          onClick={() => navigate('/create')}
          className="flex flex-col items-center justify-center bg-[#35179d] text-white rounded-full w-14 h-14 shadow-lg border-4 border-white -mt-2"
        >
          <Plus size={28} />
        </button>
      </div>
      
      <button 
        onClick={() => navigate('/upcoming')}
        className={`flex flex-col items-center justify-center flex-1 ${isActive('/upcoming') ? 'text-[#35179d]' : 'text-gray-400'}`}
      >
        <Calendar size={20} />
        <span className="text-xs mt-1">Upcoming</span>
      </button>
      
      <button 
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center justify-center flex-1 ${isActive('/profile') ? 'text-[#35179d]' : 'text-gray-400'}`}
      >
        <User size={20} />
        <span className="text-xs mt-1">Chats</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
