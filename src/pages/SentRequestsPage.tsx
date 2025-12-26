import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { JoinRequest, Room } from '@/types';
import { ArrowLeft, Bell, Clock, MapPin, Users, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getSentRequests, cancelRequestById } from '@/services/roomService';

const SentRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [sentRequests, setSentRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    loadSentRequests();
  }, [currentUser, navigate]);

  const loadSentRequests = async () => {
    try {
      setLoading(true);
      if (!currentUser) return;
      const requests = await getSentRequests(currentUser.id);
      setSentRequests(requests);
    } catch (error) {
      console.error('Error loading sent requests:', error);
      toast.error('Failed to load sent requests');
    } finally {
      setLoading(false);
    }
  };

  const cancelRequest = async (requestId: string) => {
    try {
      await cancelRequestById(requestId);
      setSentRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Request cancelled successfully');
    } catch (error) {
      console.error('Error cancelling request:', error);
      toast.error('Failed to cancel request');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 border-yellow-400/30';
      case 'approved':
        return 'text-green-400 border-green-400/30';
      case 'rejected':
        return 'text-red-400 border-red-400/30';
      default:
        return 'text-white/60 border-white/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const formatDate = (date: any) => {
    const d = date?.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Sent Requests</h1>
        </div>

        {loading ? (
          <p className="text-sm text-white/70">Loading...</p>
        ) : sentRequests.length === 0 ? (
          <p className="text-sm text-white/70">You haven't sent any requests yet.</p>
        ) : (
          <div className="space-y-3">
            {sentRequests.map((req) => (
              <Card key={req.id} className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{req.room?.title || 'Activity'}</h3>
                      <div className="text-sm text-white/70 flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4" /> {req.room?.dateTime ? formatDate(req.room?.dateTime) : '—'}
                      </div>
                      {req.room?.location?.address && (
                        <div className="text-sm text-white/70 flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4" /> {req.room.location.address}
                        </div>
                      )}
                      <div className="text-xs mt-2 inline-flex items-center gap-2 border px-2 py-0.5 rounded-full {getStatusColor(String(req.status))}">
                        <span>{getStatusText(String(req.status))}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => cancelRequest(req.id)}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    </div>
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

export default SentRequestsPage; 