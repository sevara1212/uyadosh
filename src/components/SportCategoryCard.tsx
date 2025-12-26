
import { SportType } from "@/types";
import { getSportIcon } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SportCategoryCardProps {
  sportType: SportType;
}

const SportCategoryCard = ({ sportType }: SportCategoryCardProps) => {
  const navigate = useNavigate();
  const sportLowerCase = sportType.toLowerCase();
  
  return (
    <div 
      className={`flex flex-col items-center justify-center p-3 rounded-lg sport-${sportLowerCase} cursor-pointer hover:opacity-90 transition-opacity`} 
      onClick={() => navigate(`/category/${sportType}`)}
    >
      <span className="text-2xl mb-1">{getSportIcon(sportType)}</span>
      <span className="text-xs font-medium">{sportType}</span>
    </div>
  );
};

export default SportCategoryCard;
