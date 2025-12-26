import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Room } from '@/types';
import { ArrowLeft, Calendar, MapPin, Users, Clock, MessageCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllActivities, getJoinedRooms, getUserInvolvedActivities, getUserHostedActivities, getUserAcceptedActivities } from '@/services/roomService';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { formatDateTime, formatDuration } from '@/lib/utils';

const UpcomingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [upcomingActivities, setUpcomingActivities] = useState<Room[]>([]);
  const [currentActivities, setCurrentActivities] = useState<Room[]>([]);
  const [pastActivities, setPastActivities] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    upcoming: 0,
    thisMonth: 0,
    avgRating: 4.8
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    loadUpcomingActivities();
  }, [currentUser, navigate]);

  const loadUpcomingActivities = async () => {
    try {
      setLoading(true);
      const userId = currentUser!.id;

      const [hosted, accepted] = await Promise.all([
        getUserHostedActivities(userId),
        getUserAcceptedActivities(userId)
      ]);

      let involved = [...hosted, ...accepted];
      // Fallback: if still empty, try broad involved query
      if (involved.length === 0) {
        involved = await getUserInvolvedActivities(userId);
      }

      const now = new Date();
      const current = involved.filter(a => new Date(a.dateTime) > now)
        .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
      const past = involved.filter(a => new Date(a.dateTime) <= now)
        .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());

      setCurrentActivities(current);
      setPastActivities(past);
      setUpcomingActivities([...current, ...past]);

      // Calculate stats
      const thisMonth = new Date();
      thisMonth.setMonth(thisMonth.getMonth() - 1);
      const thisMonthActivities = involved.filter(a => new Date(a.dateTime) >= thisMonth).length;

      setStats({
        upcoming: current.length,
        thisMonth: thisMonthActivities,
        avgRating: 4.8 // This could be calculated from actual ratings
      });
    } catch (error) {
      console.error('Error loading upcoming activities:', error);
      toast.error('Failed to load upcoming activities');
    } finally {
      setLoading(false);
    }
  };

  const getSportIcon = (sportType: string) => {
    const icons: Record<string, string> = {
      'Running': '🏃‍♂️',
      'Yoga': '🧘‍♀️',
      'Cycling': '🚴‍♂️',
      'Swimming': '🏊‍♂️',
      'Basketball': '🏀',
      'Football': '⚽',
      'Tennis': '🎾',
      'Gym': '💪',
      'Other': '🏆'
    };
    return icons[sportType] || '🏆';
  };

  const getTimeUntilActivity = (dateTime: string) => {
    const now = new Date();
    const activityDate = new Date(dateTime);
    const diffTime = activityDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return `In ${Math.ceil(diffDays / 7)} weeks`;
  };

  const formatDateTime = (dateTime: string) => {
    try {
      const date = new Date(dateTime);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return format(date, "EEE, MMM d, yyyy 'at' h:mm a");
    } catch (error) {
      console.error('Error formatting date:', dateTime, error);
      return 'Invalid date';
    }
  };

  const formatDuration = (duration: any) => {
    try {
      const minutes = Number(duration);
      if (isNaN(minutes)) {
        return 'Duration not set';
      }
      if (minutes < 60) {
        return `${minutes} min`;
      } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes 
          ? `${hours}h ${remainingMinutes}m` 
          : `${hours}h`;
      }
    } catch (error) {
      console.error('Error formatting duration:', duration, error);
      return 'Duration not set';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#35179d] mx-auto mb-4" />
            <p className="text-gray-600">Loading upcoming activities...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#35179d] py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ArrowLeft 
              size={20} 
              className="mr-3 cursor-pointer text-white" 
              onClick={() => navigate(-1)}
            />
            <h1 className="text-xl font-bold text-white">My Events</h1>
          </div>
          <Button 
            onClick={() => navigate('/activities')}
            variant="outline"
            size="sm"
            className="text-white border-white/30 hover:bg-white/20 bg-[#35179d]/20 font-medium"
          >
            Discover More
          </Button>
        </div>

        <div className="space-y-6">
          {/* Activity Summary Card - Always Show */}
          <Card className="bg-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Your Activity Summary</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.upcoming}</div>
                  <div className="text-sm text-purple-100">Upcoming</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.thisMonth}</div>
                  <div className="text-sm text-purple-100">This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{stats.avgRating}</div>
                  <div className="text-sm text-purple-100 flex items-center justify-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    Avg Rating
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Based on Activities */}
          {upcomingActivities.length === 0 ? (
            <div className="text-center py-12">
              <Calendar size={48} className="text-white/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No upcoming activities</h3>
              <p className="text-white/70 mb-4">Join some activities to see them here!</p>
              <Button 
                onClick={() => navigate('/activities')}
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Discover Activities
              </Button>
            </div>
          ) : (
            <>
              {/* Activity List */}
              <div className="space-y-4">
                {currentActivities.map((activity) => (
                  <Card 
                    key={activity.id}
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                    onClick={() => navigate(`/room/${activity.id}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Sport Icon */}
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xl">{getSportIcon(activity.sportType)}</span>
                        </div>
                        
                        {/* Activity Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-base mb-1">{activity.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{getTimeUntilActivity(activity.dateTime)}</span>
                            <span>•</span>
                            <span>{activity.location?.address || 'Location TBD'}</span>
                            <span>•</span>
                            <span>{activity.participants?.length || 0} people</span>
                          </div>
                        </div>
                        
                        {/* Status Badge */}
                        <div className="flex flex-col items-end gap-2">
                          <Badge 
                            className={`text-xs px-3 py-1.5 font-medium ${
                              activity.hostId === currentUser?.id 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-green-500 text-white'
                            }`}
                          >
                            {activity.hostId === currentUser?.id ? 'Hosting' : 'Joined'}
                          </Badge>
                          <MessageCircle 
                            size={18} 
                            className="text-gray-400 hover:text-purple-600 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/chat/${activity.id}`);
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Past Activities Section */}
              {pastActivities.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
                  <div className="space-y-3">
                    {pastActivities.slice(0, 3).map((activity) => (
                      <Card 
                        key={activity.id}
                        className="bg-gray-50 border border-gray-200"
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm">{getSportIcon(activity.sportType)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                              <p className="text-xs text-gray-500">
                                {format(new Date(activity.dateTime), 'MMM d, yyyy')}
                              </p>
                            </div>
                            <Badge 
                              className={`text-xs px-2 py-1 ${
                                activity.hostId === currentUser?.id 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {activity.hostId === currentUser?.id ? 'Hosted' : 'Joined'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UpcomingPage; 