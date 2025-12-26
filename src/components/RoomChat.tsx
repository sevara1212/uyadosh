import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, MessageCircle, Check, CheckCheck, RefreshCw } from "lucide-react";
import { sendChatMessage, subscribeToChatMessages, getInitialChatMessages } from "@/services/chatService";
import { ChatMessage, Room } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Avatar colors for different users
const AVATAR_COLORS = [
  "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", 
  "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"
];

function getAvatarColor(userId: string) {
  const index = userId.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getInitials(name?: string) {
  if (!name) return "?";
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

interface RoomChatProps {
  roomId: string;
  isOpen: boolean;
  onClose: () => void;
}

const RoomChat = ({ roomId, isOpen, onClose }: RoomChatProps) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [roomLoading, setRoomLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');
  const [subscriptionEstablished, setSubscriptionEstablished] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if user is approved to chat
  const isApproved = useMemo(() => {
    if (!room || !currentUser) return false;
    return room.approvedParticipants?.includes(currentUser.id) || room.hostId === currentUser.id;
  }, [room, currentUser]);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, []);

    // Test function to check Firebase directly (silent version)
  const testFirebaseMessages = async () => {
    try {
      console.log("🔍 Testing Firebase for messages in room:", roomId);
      const q = query(collection(db, "chatMessages"), where("roomId", "==", roomId));
      const snapshot = await getDocs(q);
      console.log("🔍 Found", snapshot.docs.length, "messages in Firebase");
      snapshot.forEach(doc => {
        console.log("🔍 Message:", { id: doc.id, ...doc.data() });
      });

      if (snapshot.docs.length > 0) {
        // If we found messages, force reload them silently
        const initialMessages = await getInitialChatMessages(roomId);
        setMessages(initialMessages);
        setChatLoading(false);
      }
    } catch (error) {
      console.error("❌ Error testing Firebase:", error);
    }
  };

  // Auto-check Firebase on mount (silent)
  useEffect(() => {
    if (isOpen && roomId && messages.length === 0) {
      console.log("🚀 Auto-checking Firebase for messages...");
      testFirebaseMessages();
    }
  }, [isOpen, roomId]);

  // Load initial messages automatically
  useEffect(() => {
    if (isOpen && roomId) {
      setChatLoading(true);
      setError(null);
      setSubscriptionEstablished(false);
      
      console.log("🔄 Loading initial messages for room:", roomId);
      
      // Force immediate load of messages
      const loadMessages = async () => {
        try {
          const initialMessages = await getInitialChatMessages(roomId);
          console.log("✅ Initial messages loaded:", initialMessages.length);
          console.log("✅ Messages state will be set to:", initialMessages);
          
          // Set messages immediately
          setMessages(initialMessages);
          setChatLoading(false);
          
          if (initialMessages.length === 0) {
            console.log("No initial messages found - this is normal for new chats");
          } else {
            console.log("✅ Messages loaded successfully, should display now");
            // Force re-render
            setTimeout(() => {
              setMessages([...initialMessages]);
            }, 100);
          }
          
          setTimeout(scrollToBottom, 100);
        } catch (err: any) {
          console.error("❌ Error loading initial messages:", err);
          console.error("❌ Error details:", {
            code: err.code,
            message: err.message,
            stack: err.stack
          });
          
          if (err.code === 'permission-denied' || err.code === 'unauthenticated') {
            setError("Failed to load messages. Please check your connection.");
          } else {
            console.warn("Non-critical error loading messages:", err);
            setMessages([]);
          }
          setChatLoading(false);
        }
      };
      
      // Execute immediately
      loadMessages();
    }
  }, [isOpen, roomId]);

  // Subscribe to real-time messages
  useEffect(() => {
    if (isOpen && roomId) {
      // Small delay to ensure initial messages are loaded first
      const subscriptionTimeout = setTimeout(() => {
        const setupSubscription = () => {
          setConnectionStatus('connecting');
          setError(null);
          
          unsubscribeRef.current = subscribeToChatMessages(
            roomId,
            (newMessages) => {
              console.log("📨 Received", newMessages.length, "messages from subscription");
              setMessages(newMessages);
              setError(null);
              setConnectionStatus('connected');
              setRetrying(false);
              setChatLoading(false);
              setSubscriptionEstablished(true);
              setTimeout(scrollToBottom, 50);
            },
            (error: any) => {
              console.error("Chat subscription error:", error);
              
              if (error.code === 'permission-denied' || error.code === 'unauthenticated') {
                setError("Connection lost. Trying to reconnect...");
                setRetrying(true);
                setConnectionStatus('disconnected');
                
                retryTimeoutRef.current = setTimeout(() => {
                  setRetrying(false);
                  if (unsubscribeRef.current) {
                    unsubscribeRef.current();
                  }
                  setupSubscription();
                }, 3000);
              } else {
                console.warn("Non-critical chat error:", error);
                setConnectionStatus('connected');
              }
            }
          );
        };

        setupSubscription();
      }, 500); // 500ms delay

      return () => {
        clearTimeout(subscriptionTimeout);
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
        }
        if (unsubscribeRef.current) {
          unsubscribeRef.current();
        }
      };
    }
  }, [isOpen, roomId]);

  // Load room data
  useEffect(() => {
    if (isOpen && roomId) {
      setRoomLoading(true);
      import("@/services/roomService").then(({ getRoomById }) => {
        getRoomById(roomId)
          .then((r) => setRoom(r))
          .finally(() => setRoomLoading(false));
      });
    }
  }, [isOpen, roomId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser || !isApproved || sending) return;
    
    console.log("🚀 Starting to send message:", {
      message: newMessage.trim(),
      currentUser: currentUser.id,
      isApproved,
      sending
    });
    
    const messageToSend = newMessage.trim();
    setNewMessage("");
    
    // Create optimistic message for immediate display
    const optimisticMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      roomId,
      userId: currentUser.id,
      message: messageToSend,
      timestamp: new Date(),
      user: currentUser,
      status: 'sending'
    };
    
    console.log("📝 Created optimistic message:", optimisticMessage);
    
    // Add optimistic message immediately
    setMessages(prev => [...prev, optimisticMessage]);
    setTimeout(scrollToBottom, 50);
    
    try {
      setSending(true);
      console.log("📤 Calling sendChatMessage...");
      const messageId = await sendChatMessage(roomId, currentUser.id, messageToSend);
      console.log("✅ Message sent successfully with ID:", messageId);
      // Message will be replaced by real message from subscription
    } catch (error: any) {
      console.error("❌ Error sending message:", error);
      console.error("❌ Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      // Remove optimistic message on error
      setMessages(prev => prev.filter(msg => msg.id !== optimisticMessage.id));
      
      if (error.code === 'permission-denied') {
        toast.error("You don't have permission to send messages in this chat");
      } else {
        toast.error(`Failed to send message: ${error.message || 'Unknown error'}`);
      }
      
      setNewMessage(messageToSend);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  const getMessageStatus = (message: ChatMessage) => {
    if (message.status === 'sending') return 'sending';
    if (message.userId === currentUser?.id) {
      // For now, assume messages are seen after 2 seconds
      const messageTime = message.timestamp?.toDate ? message.timestamp.toDate() : new Date(message.timestamp);
      const timeDiff = Date.now() - messageTime.getTime();
      return timeDiff > 2000 ? 'seen' : 'sent';
    }
    return 'none';
  };

  const renderMessageStatus = (status: string) => {
    switch (status) {
      case 'sending':
        return <Loader2 className="h-3 w-3 animate-spin text-gray-400" />;
      case 'sent':
        return <Check className="h-3 w-3 text-gray-400" />;
      case 'seen':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  // Group messages by date
  const groupedMessages = useMemo(() => {
    console.log("🔄 Grouping messages:", messages.length, "messages");
    console.log("🔄 Messages state:", messages);
    
    const groups: Array<{
      date: string;
      messages: ChatMessage[];
    }> = [];
    
    let currentDate = "";
    let currentGroup: ChatMessage[] = [];

    messages.forEach((msg) => {
      const messageDate = formatDate(msg.timestamp);
      
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, messages: currentGroup });
        }
        currentDate = messageDate;
        currentGroup = [];
      }
      
      currentGroup.push(msg);
    });

    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, messages: currentGroup });
    }

    console.log("🔄 Grouped messages:", groups.length, "groups");
    return groups;
  }, [messages]);

  return (
    <div className="relative h-full w-full flex flex-col bg-gray-100">
      {/* Participants Header */}
      {room && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {room.participants?.slice(0, 3).map((participantId, index) => {
                  const participant = messages.find(m => m.userId === participantId)?.user;
                  return (
                    <div
                      key={participantId}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white ${getAvatarColor(participantId)}`}
                      title={participant?.name || `Participant ${index + 1}`}
                    >
                      {getInitials(participant?.name)}
                    </div>
                  );
                })}
                {room.participants && room.participants.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                    +{room.participants.length - 3}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{room.title}</h3>
                <p className="text-sm text-gray-500">{room.participants?.length || 0} participants</p>
                                 </div>
                 </div>
               </div>
             </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-4" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {chatLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
                <p className="text-white/70 text-sm">Loading messages...</p>
              </div>
            </div>
          ) : error && !subscriptionEstablished ? (
            <div className="text-center py-8">
              <div className="p-4 bg-red-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-red-300" />
              </div>
              <h4 className="font-medium text-white mb-2">Connection Error</h4>
              <p className="text-sm text-white/70 mb-4">{error}</p>
              {retrying && (
                <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Reconnecting...</span>
                </div>
              )}
              <button
                onClick={() => {
                  setError(null);
                  setChatLoading(true);
                  getInitialChatMessages(roomId)
                    .then((initialMessages) => {
                      setMessages(initialMessages);
                      setChatLoading(false);
                    })
                    .catch(() => {
                      setError("Failed to reconnect. Please refresh the page.");
                      setChatLoading(false);
                    });
                }}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                disabled={retrying}
              >
                {retrying ? "Reconnecting..." : "Retry Connection"}
              </button>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-white/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-medium text-white mb-2">No messages yet</h4>
              <p className="text-sm text-white/70">Start the conversation with your activity participants!</p>
            </div>
          ) : (
            groupedMessages.map(({ date, messages: dayMessages }, groupIdx) => (
              <div key={groupIdx} className="space-y-3">
                {/* Date separator */}
                <div className="flex items-center justify-center">
                  <div className="bg-white/20 px-3 py-1 rounded-full text-xs text-white font-medium shadow-sm">
                    {date}
                  </div>
                </div>
                
                {/* Messages for this date */}
                {dayMessages.map((msg, idx) => {
                  const isOwnMessage = msg.userId === currentUser?.id;
                  const status = getMessageStatus(msg);
                  
                  return (
                    <div key={msg.id} className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex items-end gap-2 max-w-[70%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                        {/* Avatar - show for all messages */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0 ${getAvatarColor(msg.userId)}`}>
                          {getInitials(msg.user?.name)}
                        </div>
                        
                        {/* Message bubble */}
                        <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                          {/* Sender name - show for all messages */}
                          {msg.user?.name && (
                            <span className={`text-xs text-gray-500 mb-1 px-2 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                              {isOwnMessage ? 'You' : msg.user.name}
                            </span>
                          )}
                          
                          {/* Message content */}
                          <div className={`px-4 py-2 rounded-2xl shadow-sm max-w-full ${
                            isOwnMessage 
                              ? 'bg-[#35179d] text-white rounded-br-md' 
                              : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                          }`}>
                            <span className="text-sm leading-relaxed break-words whitespace-pre-line">
                              {msg.message}
                            </span>
                          </div>
                          
                          {/* Time and status */}
                          <div className={`flex items-center gap-1 mt-1 px-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                            <span className="text-xs text-gray-400">
                              {formatTime(msg.timestamp)}
                            </span>
                            {isOwnMessage && renderMessageStatus(status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
          
          <div ref={lastMessageRef} />
        </div>
      </ScrollArea>

      {/* Connection Status */}
      {connectionStatus !== 'connected' && (
        <div className="sticky bottom-0 left-0 right-0 bg-yellow-500/20 border-t border-yellow-500/30 p-2 z-20">
          <div className="flex items-center justify-center gap-2 text-sm text-yellow-200 max-w-4xl mx-auto">
            <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span>
              {connectionStatus === 'connecting' ? 'Connecting...' : 'Connection lost'}
            </span>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="sticky bottom-0 left-0 right-0 bg-[#35179d] border-t border-white/20 p-4 z-10">
        <div className="flex gap-3 items-end max-w-4xl mx-auto">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={roomLoading ? "Loading chat permissions..." : isApproved ? "Type your message..." : "You must be approved to chat"}
            className="flex-1 border-white/30 bg-white/10 text-white placeholder-white/60 focus:border-white/50 focus:ring-white/20 rounded-full px-4 py-3 text-sm"
            disabled={sending || !isApproved || roomLoading}
            autoFocus
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending || !isApproved || roomLoading}
            className="bg-orange-500 hover:bg-orange-600 rounded-full p-3 h-12 w-12 flex-shrink-0 shadow-md transition-all duration-200 disabled:opacity-50"
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
        {!roomLoading && !isApproved && (
          <div className="text-center text-xs text-white/70 mt-2 max-w-4xl mx-auto">
            You must be approved by the host to send messages in this chat.
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomChat; 