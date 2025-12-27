import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderName: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const ChatWithUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock user data
  const userMap: Record<string, { name: string; avatar: string }> = {
    '1': { name: 'Aziza Karimova', avatar: 'AK' },
    '2': { name: 'Bobur Rashidov', avatar: 'BR' },
    '3': { name: 'Dilnoza Umarova', avatar: 'DU' }
  };

  // Mock messages for demo
  const mockMessages: Message[] = [
    {
      id: '1',
      sender: 'user2',
      senderName: 'Aziza Karimova',
      content: 'Hi! I saw your listing. Is the room still available?',
      timestamp: '2:30 PM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'currentUser',
      senderName: currentUser?.name || 'You',
      content: 'Yes, it is! Are you interested?',
      timestamp: '2:35 PM',
      isOwn: true
    },
    {
      id: '3',
      sender: 'user2',
      senderName: 'Aziza Karimova',
      content: 'Definitely! When can we schedule a viewing?',
      timestamp: '2:40 PM',
      isOwn: false
    },
    {
      id: '4',
      sender: 'currentUser',
      senderName: currentUser?.name || 'You',
      content: 'How about tomorrow at 3 PM?',
      timestamp: '2:45 PM',
      isOwn: true
    },
    {
      id: '5',
      sender: 'user2',
      senderName: 'Aziza Karimova',
      content: 'Perfect! I\'ll see you then. Here\'s my address...',
      timestamp: '2:50 PM',
      isOwn: false
    }
  ];

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Simulate loading messages
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 500);
  }, [currentUser, navigate, userId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: (messages.length + 1).toString(),
      sender: 'currentUser',
      senderName: currentUser?.name || 'You',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  const otherUser = userMap[userId || '1'] || { name: 'Unknown User', avatar: '?' };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">Loading messages...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideNav>
      <div className="flex flex-col h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:text-gray-900 transition"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-900">{otherUser.name}</h1>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.isOwn
                    ? 'bg-gray-800 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.isOwn ? 'text-gray-300' : 'text-gray-600'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white hover:bg-gray-900 disabled:bg-gray-400 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatWithUserPage;

