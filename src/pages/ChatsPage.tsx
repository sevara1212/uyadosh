import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Room } from '@/types';
import { ArrowLeft, Search } from 'lucide-react';
import { getJoinedRooms } from '@/services/roomService';
import { toast } from 'sonner';

interface ChatConversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: boolean;
}

const ChatsPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [joinedActivities, setJoinedActivities] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    loadJoinedActivities();
  }, [currentUser, navigate]);

  const loadJoinedActivities = async () => {
    try {
      setLoading(false);
      // Mock data for demo purposes
      const mockConversations: ChatConversation[] = [
        {
          id: '1',
          name: 'Aziza Karimova',
          avatar: 'AK',
          lastMessage: 'Hi! Is the room still available?',
          timestamp: '2m ago',
          unread: true
        },
        {
          id: '2',
          name: 'Bobur Rashidov',
          avatar: 'BR',
          lastMessage: 'Thank you for the information!',
          timestamp: '1h ago'
        },
        {
          id: '3',
          name: 'Dilnoza Umarova',
          avatar: 'DU',
          lastMessage: 'When can we schedule a viewing?',
          timestamp: '3h ago'
        }
      ];
      // You would normally load from your backend here
    } catch (error) {
      console.error('Error loading conversations:', error);
      toast.error('Failed to load messages');
    }
  };

  const mockConversations: ChatConversation[] = [
    {
      id: '1',
      name: 'Aziza Karimova',
      avatar: 'AK',
      lastMessage: 'Hi! Is the room still available?',
      timestamp: '2m ago',
      unread: true
    },
    {
      id: '2',
      name: 'Bobur Rashidov',
      avatar: 'BR',
      lastMessage: 'Thank you for the information!',
      timestamp: '1h ago'
    },
    {
      id: '3',
      name: 'Dilnoza Umarova',
      avatar: 'DU',
      lastMessage: 'When can we schedule a viewing?',
      timestamp: '3h ago'
    }
  ];

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ArrowLeft 
                size={20} 
                className="cursor-pointer text-gray-700"
                onClick={() => navigate(-1)}
              />
              <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="divide-y divide-gray-200">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No messages yet</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => navigate(`/chat-with/${conversation.id}`)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition flex items-center gap-3"
              >
                {/* Avatar */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold">
                  {conversation.avatar}
                </div>

                {/* Message Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className={`text-sm truncate ${conversation.unread ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Unread Indicator */}
                {conversation.unread && (
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-red-500"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChatsPage; 