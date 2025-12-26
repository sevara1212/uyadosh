import { 
  collection,
  doc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  getDocs,
  startAfter,
  DocumentSnapshot,
  db
} from "@/lib/firebase";
import { ChatMessage, User } from "@/types";

// Cache for user data to avoid repeated fetches
const userCache = new Map<string, User>();

// Batch fetch users for better performance
const fetchUsersBatch = async (userIds: string[]): Promise<Record<string, User>> => {
  const uniqueIds = [...new Set(userIds)].filter(id => !userCache.has(id));
  
  if (uniqueIds.length === 0) {
    return {};
  }

  const usersMap: Record<string, User> = {};
  
  // Fetch in batches of 10 (Firestore limit)
  for (let i = 0; i < uniqueIds.length; i += 10) {
    const batch = uniqueIds.slice(i, i + 10);
    try {
      const q = query(collection(db, "users"), where('__name__', 'in', batch));
      const snapshot = await getDocs(q);
      
      snapshot.forEach(doc => {
        const userData = { id: doc.id, ...doc.data() } as User;
        usersMap[doc.id] = userData;
        userCache.set(doc.id, userData); // Cache for future use
      });
    } catch (error) {
      console.error('Error batch fetching users:', error);
    }
  }
  
  return usersMap;
};

// Send a chat message
export const sendChatMessage = async (
  roomId: string, 
  userId: string, 
  message: string
): Promise<string> => {
  try {
    console.log("📤 Sending message:", { roomId, userId, message });
    
    const messageData = {
      roomId,
      userId,
      message: message.trim(),
      timestamp: serverTimestamp()
    };
    
    console.log("📤 Message data:", messageData);
    
    const messageRef = await addDoc(collection(db, "chatMessages"), messageData);
    console.log("✅ Message sent successfully:", messageRef.id);
    return messageRef.id;
  } catch (error) {
    console.error("❌ Error sending chat message:", error);
    console.error("❌ Error details:", {
      code: (error as any).code,
      message: (error as any).message,
      stack: (error as any).stack
    });
    throw error;
  }
};

// Get initial chat messages (last 50)
export const getInitialChatMessages = async (roomId: string): Promise<ChatMessage[]> => {
  try {
    console.log("📥 Loading initial messages for room:", roomId);
    
    const q = query(
      collection(db, "chatMessages"),
      where("roomId", "==", roomId),
      orderBy("timestamp", "asc")
    );
    
    const querySnapshot = await getDocs(q);
    console.log("📥 Found", querySnapshot.docs.length, "messages in Firebase");
    
    const messages: ChatMessage[] = [];
    const userIds: string[] = [];
    
    // Collect message data and user IDs
    querySnapshot.forEach(doc => {
      const data = doc.data();
      console.log("📥 Message data:", { id: doc.id, ...data });
      
      // Ensure timestamp is properly handled
      const messageData = {
        id: doc.id,
        ...data,
        timestamp: data.timestamp || new Date()
      } as ChatMessage;
      
      messages.push(messageData);
      userIds.push(data.userId);
    });
    
    console.log("📥 Collected", messages.length, "messages,", userIds.length, "user IDs");
    console.log("📥 User IDs:", userIds);
    
    // Batch fetch user data
    const usersMap = await fetchUsersBatch(userIds);
    console.log("📥 Fetched users:", Object.keys(usersMap));
    console.log("📥 Users map:", usersMap);
    
    // Combine message data with user data
    const messagesWithUsers = messages.map(message => {
      const user = usersMap[message.userId] || userCache.get(message.userId);
      console.log("📥 Message", message.id, "user:", user?.name || "Unknown");
      return {
        ...message,
        user
      };
    });
    
    console.log("📥 Returning", messagesWithUsers.length, "messages with users");
    console.log("📥 Final messages:", messagesWithUsers.map(m => ({
      id: m.id,
      message: m.message.substring(0, 20) + "...",
      userName: m.user?.name || "Unknown"
    })));
    
    return messagesWithUsers;
  } catch (error) {
    console.error("❌ Error getting chat messages:", error);
    console.error("❌ Error details:", {
      code: (error as any).code,
      message: (error as any).message,
      stack: (error as any).stack
    });
    throw error;
  }
};

// Subscribe to chat messages in real-time with improved error handling
export const subscribeToChatMessages = (
  roomId: string, 
  callback: (messages: ChatMessage[]) => void,
  onError?: (error: Error) => void
) => {
  console.log("🔗 Subscribing to chat messages for room:", roomId);
  
  let unsubscribe: (() => void) | null = null;
  let isSubscribed = true;

  const setupSubscription = () => {
    if (!isSubscribed) return;

    try {
      const q = query(
        collection(db, "chatMessages"),
        where("roomId", "==", roomId),
        orderBy("timestamp", "asc")
      );
      
      console.log("📡 Setting up Firestore subscription...");
      
      unsubscribe = onSnapshot(
        q, 
        async (snapshot) => {
          if (!isSubscribed) return;
          
          try {
            console.log("📨 Received chat snapshot with", snapshot.docs.length, "messages");
            console.log("📨 Snapshot changes:", snapshot.docChanges().map(change => ({
              type: change.type,
              docId: change.doc.id,
              data: change.doc.data()
            })));
            
            const messages: ChatMessage[] = [];
            const userIds: string[] = [];
            
            snapshot.forEach(doc => {
              const data = doc.data();
              // Ensure timestamp is properly handled
              const messageData = {
                id: doc.id,
                ...data,
                timestamp: data.timestamp || new Date()
              } as ChatMessage;
              messages.push(messageData);
              userIds.push(data.userId);
            });
            
            // Batch fetch user data
            const usersMap = await fetchUsersBatch(userIds);
            
            // Combine message data with user data
            const messagesWithUsers = messages.map(message => ({
              ...message,
              user: usersMap[message.userId] || userCache.get(message.userId)
            }));
            
            console.log("✅ Processed", messagesWithUsers.length, "messages");
            console.log("✅ Messages with users:", messagesWithUsers.map(m => ({
              id: m.id,
              userId: m.userId,
              message: m.message.substring(0, 20) + "...",
              userName: m.user?.name
            })));
            callback(messagesWithUsers);
          } catch (error) {
            console.error("❌ Error processing chat messages:", error);
            // Don't call onError for processing errors, just log them
          }
        },
        (error) => {
          if (!isSubscribed) return;
          
          console.error("❌ Chat subscription error:", error);
          
          // Only call onError for actual connection errors
          if (error.code === 'permission-denied' || error.code === 'unauthenticated') {
            onError?.(error);
          } else {
            console.warn("⚠️ Non-critical chat subscription error:", error);
            // For other errors, try to continue without calling onError
          }
        }
      );
      
      console.log("✅ Subscription setup complete");
    } catch (error) {
      console.error("❌ Error setting up chat subscription:", error);
      onError?.(error as Error);
    }
  };

  // Start the subscription immediately
  setupSubscription();

  // Return unsubscribe function
  return () => {
    console.log("🔌 Unsubscribing from chat messages");
    isSubscribed = false;
    if (unsubscribe) {
      unsubscribe();
    }
  };
};

// Load more messages (for pagination)
export const loadMoreMessages = async (
  roomId: string, 
  lastMessage: DocumentSnapshot,
  limitCount: number = 20
): Promise<ChatMessage[]> => {
  try {
    const q = query(
      collection(db, "chatMessages"),
      where("roomId", "==", roomId),
      orderBy("timestamp", "desc"),
      startAfter(lastMessage),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const messages: ChatMessage[] = [];
    const userIds: string[] = [];
    
    querySnapshot.forEach(doc => {
      const data = doc.data();
      messages.push({ id: doc.id, ...data } as ChatMessage);
      userIds.push(data.userId);
    });
    
    // Batch fetch user data
    const usersMap = await fetchUsersBatch(userIds);
    
    // Combine message data with user data and reverse to get chronological order
    const messagesWithUsers = messages
      .reverse()
      .map(message => ({
        ...message,
        user: usersMap[message.userId] || userCache.get(message.userId)
      }));
    
    return messagesWithUsers;
  } catch (error) {
    console.error("Error loading more messages:", error);
    throw error;
  }
};

// Clear user cache (useful for logout)
export const clearUserCache = () => {
  userCache.clear();
};

// Preload user data for better performance
export const preloadUsers = async (userIds: string[]) => {
  await fetchUsersBatch(userIds);
};

// Test connection to Firebase
export const testFirebaseConnection = async (): Promise<boolean> => {
  try {
    // Try to read a single document to test connection
    const testQuery = query(collection(db, "users"), limit(1));
    await getDocs(testQuery);
    return true;
  } catch (error) {
    console.error("Firebase connection test failed:", error);
    return false;
  }
}; 