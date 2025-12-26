import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Room, JoinRequest } from '@/types';
import { ArrowLeft, Clock, Check, X, Users, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getPendingRequests, approveJoinRequest, rejectJoinRequest } from '@/services/roomService';
import { toast } from 'sonner';

const RequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [pendingRequests, setPendingRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    loadPendingRequests();
  }, [currentUser, navigate]);

  const loadPendingRequests = async () => {
    try {
      setLoading(true);
      const requests = await getPendingRequests(currentUser!.id);
      setPendingRequests(requests);
    } catch (error) {
      console.error('Error loading pending requests:', error);
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    try {
      await approveJoinRequest(requestId);
      toast.success('Request approved!');
      loadPendingRequests(); // Reload to update the list
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error('Failed to approve request');
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await rejectJoinRequest(requestId);
      toast.success('Request rejected');
      loadPendingRequests(); // Reload to update the list
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast.error('Failed to reject request');
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

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#35179d] mx-auto mb-4" />
            <p className="text-gray-600">Loading requests...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#35179d] py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <ArrowLeft 
            size={20} 
            className="mr-3 cursor-pointer text-white" 
            onClick={() => navigate(-1)}
          />
          <h1 className="text-xl font-bold text-white">Join Requests</h1>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="text-center py-12">
            <Clock size={48} className="text-white/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No pending requests</h3>
            <p className="text-white/70 mb-4">When people request to join your activities, they'll appear here.</p>
            <Button 
              onClick={() => navigate('/create')}
              className="bg-[#ff8800] text-white hover:bg-orange-600"
            >
              Create Activity
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <Card 
                key={request.id}
                className="bg-white/10 backdrop-blur-sm border-white/20"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-xl">{getSportIcon(request.activity.sportType)}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{request.activity.title}</h3>
                        <Badge variant="secondary" className="text-xs bg-yellow-500/20 text-yellow-300">
                          Pending
                        </Badge>
                      </div>
                    </div>
                    <Clock size={20} className="text-yellow-400" />
                  </div>

                  <div className="space-y-2 text-sm text-white/80 mb-4">
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>Request from: {request.userName || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>
                        {new Date(request.activity.dateTime).toLocaleDateString()} at{' '}
                        {new Date(request.activity.dateTime).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{request.activity.location.address}</span>
                    </div>
                  </div>

                  {request.message && (
                    <div className="mb-4 p-3 bg-white/10 rounded-lg">
                      <p className="text-sm text-white/90 italic">"{request.message}"</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleApprove(request.id)}
                    >
                      <Check size={16} className="mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="flex-1 text-white border-white/30 hover:bg-white/20"
                      onClick={() => handleReject(request.id)}
                    >
                      <X size={16} className="mr-1" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RequestsPage; 