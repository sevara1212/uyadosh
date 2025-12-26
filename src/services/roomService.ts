import { 
  roomsCollection, 
  usersCollection,
  activitiesCollection,
  userActivitiesCollection,
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  query, 
  where, 
  getDocs,
  serverTimestamp,
  db,
  collection,
  addDoc,
  orderBy,
  limit,
  onSnapshot,
  startAfter,
  deleteDoc
} from "@/lib/firebase";
import { FirebaseRoom, Room, User, JoinRequest, RequestStatus, ChatMessage } from "@/types";
import { DocumentData } from "firebase/firestore";
import { mockUsers } from "@/data/Data";

// Cache for activities and hosts data
const activitiesCache = new Map<string, Room[]>();
const hostsCache = new Map<string, User>();
const cacheExpiry = new Map<string, number>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to check if cache is valid
const isCacheValid = (key: string): boolean => {
  const expiry = cacheExpiry.get(key);
  return expiry ? Date.now() < expiry : false;
};

// Helper function to set cache with expiry
const setCache = (key: string, data: any) => {
  activitiesCache.set(key, data);
  cacheExpiry.set(key, Date.now() + CACHE_DURATION);
};



// Helper function to batch fetch host data with caching
const fetchHostsData = async (hostIds: string[]): Promise<Record<string, User>> => {
  console.log('🔍 Fetching host data for IDs:', hostIds);
  // Remove duplicates
  const uniqueHostIds = [...new Set(hostIds)];
  const hostsMap: Record<string, User> = {};
  
  // Check cache first
  const uncachedHostIds: string[] = [];
  uniqueHostIds.forEach(hostId => {
    if (hostsCache.has(hostId) && isCacheValid(`host_${hostId}`)) {
      hostsMap[hostId] = hostsCache.get(hostId)!;
    } else {
      uncachedHostIds.push(hostId);
    }
  });
  
  // Batch fetch uncached hosts in groups of 10 (Firestore limit for 'in' queries)
  for (let i = 0; i < uncachedHostIds.length; i += 10) {
    const batch = uncachedHostIds.slice(i, i + 10);
    try {
      const q = query(usersCollection, where('__name__', 'in', batch));
      const hostSnaps = await getDocs(q);
      
      // Track which IDs we resolved from Firestore
      const resolvedIds = new Set<string>();

      hostSnaps.forEach(doc => {
        const hostData = { id: doc.id, ...doc.data() } as User;
        hostsMap[doc.id] = hostData;
        resolvedIds.add(doc.id);
        console.log(`✅ Found host data for ${doc.id}: ${hostData.name}`);
        // Cache the host data
        hostsCache.set(doc.id, hostData);
        cacheExpiry.set(`host_${doc.id}`, Date.now() + CACHE_DURATION);
      });

      // Fallback: derive names from mockUsers for any unresolved IDs
      const unresolved = batch.filter(id => !resolvedIds.has(id));
      if (unresolved.length > 0) {
        unresolved.forEach((id) => {
          const fromMock = mockUsers.find(u => String(u.id) === String(id));
          if (fromMock) {
            const derived: User = {
              id: String(fromMock.id),
              name: fromMock.name,
              email: (fromMock as any).email || `${fromMock.id}@example.com`,
              avatar: (fromMock as any).avatar || undefined,
            } as User;
            hostsMap[id] = derived;
            hostsCache.set(id, derived);
            cacheExpiry.set(`host_${id}`, Date.now() + CACHE_DURATION);
            console.log(`🪄 Derived host from mockUsers for ${id}: ${fromMock.name}`);
          }
        });
      }
    } catch (error) {
      console.error('Error batch fetching hosts:', error);
    }
  }
  
  return hostsMap;
};

// Create a new room
export const createRoom = async (roomData: Omit<Room, 'id' | 'participants' | 'createdAt'>, userId: string): Promise<string> => {
  try {
    // Create a new document with auto-generated ID
    const roomRef = doc(roomsCollection);
    const roomId = roomRef.id;
    
    // Prepare room data for Firestore
    const newRoom: FirebaseRoom = {
      ...roomData,
      hostId: userId,
      participants: [userId], // Host is automatically a participant
      approvedParticipants: [userId], // Host is automatically approved
      pendingRequests: [], // Initialize empty pending requests array
      createdAt: serverTimestamp()
    };
    
    // Add room to Firestore (rooms)
    await setDoc(roomRef, newRoom);

    // Also add to user-created activities collection (activities)
    await setDoc(doc(userActivitiesCollection, roomId), newRoom);
    
    // Update user's joinedRooms array
    const userRef = doc(usersCollection, userId);
    await updateDoc(userRef, {
      joinedRooms: arrayUnion(roomId)
    });
    
    return roomId;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

// Get a room by ID with populated host data
export const getRoomById = async (roomId: string): Promise<Room | null> => {
  try {
    // First try to get from activities collection
    const activityRef = doc(activitiesCollection, roomId);
    const activityDoc = await getDoc(activityRef);
    
    if (activityDoc.exists()) {
      const activityData = activityDoc.data();
      
      // Get host user data
      let host: User | undefined;
      if (activityData.hostId) {
        const hostRef = doc(usersCollection, activityData.hostId);
        const hostDoc = await getDoc(hostRef);
        
        if (hostDoc.exists()) {
          host = { id: hostDoc.id, ...hostDoc.data() } as User;
        }
      }
      
      // Create fallback host if not found
      const fallbackHost = host || {
        id: activityData.hostId,
        name: activityData.hostName || `User ${activityData.hostId}`,
        email: `${activityData.hostId}@example.com`,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      };
      
      return {
        id: roomId,
        ...activityData,
        host: fallbackHost,
        hostName: activityData.hostName || fallbackHost.name
      } as Room;
    }
    
    // If not found in activities, try rooms collection (for backward compatibility)
    const roomRef = doc(roomsCollection, roomId);
    const roomDoc = await getDoc(roomRef);
    
    if (!roomDoc.exists()) {
      return null;
    }
    
    const roomData = roomDoc.data() as FirebaseRoom;
    
    // Get host user data
    let host: User | undefined;
    if (roomData.hostId) {
      const hostRef = doc(usersCollection, roomData.hostId);
      const hostDoc = await getDoc(hostRef);
      
      if (hostDoc.exists()) {
        host = { id: hostDoc.id, ...hostDoc.data() } as User;
      }
    }
    
    // Return room with ID and host data, ensuring new fields have default values
    return {
      id: roomId,
      ...roomData,
      approvedParticipants: roomData.approvedParticipants || [roomData.hostId], // Default to host if not set
      pendingRequests: roomData.pendingRequests || [], // Default to empty array if not set
      host
    };
  } catch (error) {
    console.error("Error getting room:", error);
    throw error;
  }
};

// Get all rooms with populated host data
export const getAllRooms = async (): Promise<Room[]> => {
  try {
    const querySnapshot = await getDocs(roomsCollection);
    const roomsData: DocumentData[] = [];
    const hostIds: string[] = [];
    
    // First, collect all room data and host IDs
    querySnapshot.forEach(doc => {
      const data = doc.data();
      roomsData.push({ 
        id: doc.id, 
        ...data,
        approvedParticipants: data.approvedParticipants || [data.hostId], // Default to host if not set
        pendingRequests: data.pendingRequests || [] // Default to empty array if not set
      });
      if (data.hostId) hostIds.push(data.hostId);
    });
    
    // Then batch fetch all hosts data
    const hostsMap = await fetchHostsData(hostIds);
    
    // Finally, combine room data with host data
    return roomsData.map(room => ({
      ...room,
      host: hostsMap[room.hostId]
    })) as Room[];
  } catch (error) {
    console.error("Error getting rooms:", error);
    throw error;
  }
};

// Get all activities from curated and user-created collections
export const getAllActivities = async (limitCount?: number, lastDoc?: any): Promise<Room[]> => {
  const cacheKey = `all_activities_${limitCount}_${lastDoc?.id || 'first'}`;
  
  if (activitiesCache.has(cacheKey) && isCacheValid(cacheKey)) {
    console.log('📦 Using cached activities');
    return activitiesCache.get(cacheKey)!;
  }
  
  try {
    console.log('🚀 Fetching activities from Firestore (curated + user created)...');

    // Helper to read a collection with shared normalization
    const readCollection = async (coll: any) => {
      let q = query(coll, orderBy('dateTime', 'asc'));
      if (limitCount) q = query(coll, orderBy('dateTime', 'asc'), limit(limitCount));
      if (lastDoc) {
        if (limitCount) {
          q = query(coll, orderBy('dateTime', 'asc'), startAfter(lastDoc), limit(limitCount));
        } else {
          q = query(coll, orderBy('dateTime', 'asc'), startAfter(lastDoc));
        }
      }
      const snap = await getDocs(q);
      const items: DocumentData[] = [];
      const hostIds: string[] = [];

      snap.forEach(docSnap => {
        const data = docSnap.data();
        let participants = data.participants || [];
        if (participants.length > 0 && typeof participants[0] === 'object') {
          participants = participants.map((p: any) => p.id || p);
        }
        let approvedParticipants = data.approvedParticipants || [data.hostId];
        if (approvedParticipants.length > 0 && typeof approvedParticipants[0] === 'object') {
          approvedParticipants = approvedParticipants.map((p: any) => p.id || p);
        }
        const rawSportType = data.sportType;
        const normalizedSportType = typeof rawSportType === 'string' ? rawSportType.replace(/^SportType\./, '') : rawSportType;
        items.push({ id: docSnap.id, ...data, sportType: normalizedSportType, participants, approvedParticipants, pendingRequests: data.pendingRequests || [] });
        if (data.hostId) hostIds.push(data.hostId);
      });
      const hostsMap = await fetchHostsData(hostIds);
      return items.map(activity => {
        const host = hostsMap[activity.hostId];
        if (host) {
          return { ...activity, host, hostName: host.name } as Room;
        }
        const fallbackHost = { id: activity.hostId, name: `User ${activity.hostId}`, email: `${activity.hostId}@example.com`, avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg` };
        return { ...activity, host: fallbackHost, hostName: fallbackHost.name } as Room;
      });
    };

    const [curated, userCreated] = await Promise.all([
      readCollection(activitiesCollection),
      readCollection(userActivitiesCollection),
    ]);

    // Merge and sort
    const merged = [...curated, ...userCreated];
    merged.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    setCache(cacheKey, merged);
    console.log(`✅ Cached ${merged.length} activities (curated + user)`);
    return merged;
  } catch (error) {
    console.error("Error getting activities:", error);
    throw error;
  }
};

// Get activities by sport type from the activities_upl collection with caching
export const getActivitiesBySport = async (sportType: string, limitCount?: number): Promise<Room[]> => {
  const cacheKey = `sport_activities_${sportType}_${limitCount}`;
  
  // Check cache first
  if (activitiesCache.has(cacheKey) && isCacheValid(cacheKey)) {
    console.log(`📦 Using cached ${sportType} activities`);
    return activitiesCache.get(cacheKey)!;
  }
  
  try {
    console.log(`🚀 Fetching ${sportType} activities from Firestore...`);
    let q = query(
      activitiesCollection, 
      where("sportType", "==", sportType)
    );
    
    if (limitCount) {
      q = query(
        activitiesCollection, 
        where("sportType", "==", sportType),
        limit(limitCount)
      );
    }
    const querySnapshot = await getDocs(q);
    
    const activitiesData: DocumentData[] = [];
    const hostIds: string[] = [];
    
    // First, collect all activity data and host IDs
    querySnapshot.forEach(doc => {
      const data = doc.data();
      
      // Convert participants from User objects to user IDs if needed
      let participants = data.participants || [];
      if (participants.length > 0 && typeof participants[0] === 'object') {
        participants = participants.map((p: any) => p.id || p);
      }
      
      // Convert approvedParticipants from User objects to user IDs if needed
      let approvedParticipants = data.approvedParticipants || [data.hostId];
      if (approvedParticipants.length > 0 && typeof approvedParticipants[0] === 'object') {
        approvedParticipants = approvedParticipants.map((p: any) => p.id || p);
      }
      
      activitiesData.push({ 
        id: doc.id, 
        ...data,
        participants: participants,
        approvedParticipants: approvedParticipants,
        pendingRequests: data.pendingRequests || []
      });
      if (data.hostId) hostIds.push(data.hostId);
    });
    
    // Then batch fetch all hosts data (with caching)
    const hostsMap = await fetchHostsData(hostIds);
    
    // Finally, combine activity data with host data
    const result = activitiesData.map(activity => {
      const host = hostsMap[activity.hostId];
      
      // Always prioritize real host data from users collection
      if (host) {
        return {
          ...activity,
          host: host,
          hostName: host.name // Always use the real name from users collection
        };
      }
      
      // Fallback only if host is not found in users collection
      const fallbackHost = {
        id: activity.hostId,
        name: `User ${activity.hostId}`,
        email: `${activity.hostId}@example.com`,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      };

      return {
        ...activity,
        host: fallbackHost,
        hostName: fallbackHost.name
      };
    }) as Room[];
    
    // Sort by date (ascending - earliest first)
    result.sort((a, b) => {
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
      return dateA.getTime() - dateB.getTime();
    });
    
    // Cache the result
    setCache(cacheKey, result);
    console.log(`✅ Cached ${result.length} ${sportType} activities`);
    
    return result;
  } catch (error) {
    console.error("Error getting activities by sport:", error);
    throw error;
  }
};

// Join a room
export const joinRoom = async (roomId: string, userId: string): Promise<void> => {
  try {
    const userRef = doc(usersCollection, userId);
    
    // Try to update in activities collection first
    try {
      const activityRef = doc(activitiesCollection, roomId);
      await updateDoc(activityRef, {
        participants: arrayUnion(userId)
      });
    } catch (error) {
      // If not found in activities, try rooms collection
      const roomRef = doc(roomsCollection, roomId);
      await updateDoc(roomRef, {
        participants: arrayUnion(userId)
      });
    }
    
    // Add room to user's joined rooms
    await updateDoc(userRef, {
      joinedRooms: arrayUnion(roomId)
    });
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
};

// Leave a room
export const leaveRoom = async (roomId: string, userId: string): Promise<void> => {
  try {
    const userRef = doc(usersCollection, userId);
    
    // Try to update in activities collection first
    try {
      const activityRef = doc(activitiesCollection, roomId);
      await updateDoc(activityRef, {
        participants: arrayRemove(userId)
      });
    } catch (error) {
      // If not found in activities, try rooms collection
      const roomRef = doc(roomsCollection, roomId);
      await updateDoc(roomRef, {
        participants: arrayRemove(userId)
      });
    }
    
    // Remove room from user's joined rooms
    await updateDoc(userRef, {
      joinedRooms: arrayRemove(roomId)
    });
  } catch (error) {
    console.error("Error leaving room:", error);
    throw error;
  }
};

// Get rooms by sport type with populated host data
export const getRoomsBySport = async (sportType: string): Promise<Room[]> => {
  try {
    const q = query(roomsCollection, where("sportType", "==", sportType));
    const querySnapshot = await getDocs(q);
    
    const roomsData: DocumentData[] = [];
    const hostIds: string[] = [];
    
    // First, collect all room data and host IDs
    querySnapshot.forEach(doc => {
      const data = doc.data();
      roomsData.push({ 
        id: doc.id, 
        ...data,
        approvedParticipants: data.approvedParticipants || [data.hostId], // Default to host if not set
        pendingRequests: data.pendingRequests || [] // Default to empty array if not set
      });
      if (data.hostId) hostIds.push(data.hostId);
    });
    
    // Then batch fetch all hosts data
    const hostsMap = await fetchHostsData(hostIds);
    
    // Finally, combine room data with host data
    return roomsData.map(room => ({
      ...room,
      host: hostsMap[room.hostId]
    })) as Room[];
  } catch (error) {
    console.error("Error getting rooms by sport:", error);
    throw error;
  }
};

// Get rooms joined by a user with populated host data
export const getJoinedRooms = async (userId: string): Promise<Room[]> => {
  try {
    const q = query(roomsCollection, where("participants", "array-contains", userId));
    const querySnapshot = await getDocs(q);
    
    const roomsData: DocumentData[] = [];
    const hostIds: string[] = [];
    
    // First, collect all room data and host IDs
    querySnapshot.forEach(doc => {
      const data = doc.data();
      roomsData.push({ 
        id: doc.id, 
        ...data,
        approvedParticipants: data.approvedParticipants || [data.hostId], // Default to host if not set
        pendingRequests: data.pendingRequests || [] // Default to empty array if not set
      });
      if (data.hostId) hostIds.push(data.hostId);
    });
    
    // Then batch fetch all hosts data
    const hostsMap = await fetchHostsData(hostIds);
    
    // Finally, combine room data with host data
    return roomsData.map(room => ({
      ...room,
      host: hostsMap[room.hostId]
    })) as Room[];
  } catch (error) {
    console.error("Error getting joined rooms:", error);
    throw error;
  }
};

// Get room participants with user details
export const getRoomParticipants = async (roomId: string): Promise<User[]> => {
  try {
    // First try to get from activities collection
    const activityRef = doc(activitiesCollection, roomId);
    const activityDoc = await getDoc(activityRef);
    
    let participantIds: string[] = [];
    
    if (activityDoc.exists()) {
      const activityData = activityDoc.data();
      participantIds = activityData.participants || [];
    } else {
      // If not found in activities, try rooms collection
      const roomRef = doc(roomsCollection, roomId);
      const roomDoc = await getDoc(roomRef);
      
      if (!roomDoc.exists()) {
        throw new Error("Room not found");
      }
      
      const roomData = roomDoc.data() as FirebaseRoom;
      participantIds = roomData.participants || [];
    }
    
    if (participantIds.length === 0) {
      return [];
    }
    
    // Batch fetch all participants
    const participantsMap = await fetchHostsData(participantIds);
    
    // Convert map to array
    return participantIds
      .map(id => participantsMap[id])
      .filter(Boolean); // Filter out any undefined values
  } catch (error) {
    console.error("Error getting room participants:", error);
    throw error;
  }
}; 

// Update user's sport type preference
export const updateUserSportType = async (userId: string, sportType: string): Promise<void> => {
  try {
    const userRef = doc(usersCollection, userId);
    await updateDoc(userRef, {
      sportType: sportType
    });
  } catch (error) {
    console.error("Error updating user sport type:", error);
    throw error;
  }
}; 

// Request to join a room
// Cancel a join request
export const cancelJoinRequest = async (roomId: string, userId: string): Promise<void> => {
  try {
    console.log('❌ Cancelling join request for activity:', roomId);
    
    // Find the pending request
    const joinRequestsCollection = collection(db, "joinRequests");
    const requestQuery = query(
      joinRequestsCollection,
      where("roomId", "==", roomId),
      where("userId", "==", userId),
      where("status", "==", "pending")
    );
    
    const requestSnapshot = await getDocs(requestQuery);
    
    if (requestSnapshot.empty) {
      throw new Error('No pending request found to cancel');
    }
    
    // Delete the request document
    const requestDoc = requestSnapshot.docs[0];
    await deleteDoc(requestDoc.ref);
    
    console.log('✅ Join request cancelled successfully');
    
    // Remove request from activity's pending requests
    let activityRef = doc(activitiesCollection, roomId);
    let activityDoc = await getDoc(activityRef);
    
    if (!activityDoc.exists()) {
      // Try rooms collection as fallback
      activityRef = doc(roomsCollection, roomId);
      activityDoc = await getDoc(activityRef);
    }
    
    if (activityDoc.exists()) {
      const activityData = activityDoc.data();
      const pendingRequests = activityData.pendingRequests || [];
      const updatedRequests = pendingRequests.filter((reqId: string) => reqId !== requestDoc.id);
      
      await updateDoc(activityRef, {
        pendingRequests: updatedRequests
      });
    }
    
    // Remove request from user's pending requests
    const userRef = doc(usersCollection, userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const pendingRequests = userData.pendingRequests || [];
      const updatedRequests = pendingRequests.filter((reqId: string) => reqId !== requestDoc.id);
      
      await updateDoc(userRef, {
        pendingRequests: updatedRequests
      });
    }
    
    console.log('✅ Request removed from activity and user documents');
    
  } catch (error) {
    console.error("❌ Error cancelling join request:", error);
    throw error;
  }
};

export const requestToJoinRoom = async (roomId: string, userId: string, message?: string): Promise<string> => {
  try {
    console.log('📝 Processing join request for activity:', roomId);
    
    // First, check if the activity exists and get its current data
    let activityRef = doc(activitiesCollection, roomId);
    let activityDoc = await getDoc(activityRef);
    
    if (!activityDoc.exists()) {
      // Try rooms collection as fallback
      activityRef = doc(roomsCollection, roomId);
      activityDoc = await getDoc(activityRef);
      
      if (!activityDoc.exists()) {
        throw new Error('Activity not found');
      }
    }
    
    const activityData = activityDoc.data();
    const currentParticipants = activityData.participants?.length || 0;
    const maxParticipants = activityData.maxParticipants || 0;
    
    // Check if activity is full
    if (currentParticipants >= maxParticipants) {
      console.log('⚠️ Activity is full, but still allowing request');
      // Even if full, we'll still create the request (for waitlist functionality)
    }
    
    // Check if user is already a participant
    if (activityData.participants?.includes(userId)) {
      throw new Error('You are already a participant in this activity');
    }
    
    // Check if user already has a pending request
    const existingRequestsQuery = query(
      collection(db, "joinRequests"),
      where("roomId", "==", roomId),
      where("userId", "==", userId),
      where("status", "==", "pending")
    );
    const existingRequests = await getDocs(existingRequestsQuery);
    
    if (!existingRequests.empty) {
      throw new Error('You already have a pending request for this activity');
    }
    
    // Create request document
    const requestData = {
      roomId,
      userId,
      hostId: activityData.hostId,
      status: "pending",
      requestedAt: serverTimestamp(),
      message: message || ""
    };
    
    const requestRef = await addDoc(collection(db, "joinRequests"), requestData);
    const requestId = requestRef.id;
    
    console.log('✅ Join request created:', requestId);
    
    // Update activity with pending request (try activities collection first, then rooms)
    try {
      await updateDoc(doc(activitiesCollection, roomId), {
        pendingRequests: arrayUnion(requestId)
      });
    } catch (error) {
      // Fallback to rooms collection
      await updateDoc(doc(roomsCollection, roomId), {
        pendingRequests: arrayUnion(requestId)
      });
    }
    
    // Update user with pending request
    const userRef = doc(usersCollection, userId);
    await updateDoc(userRef, {
      pendingRequests: arrayUnion(requestId)
    });
    
    console.log('✅ Join request processed successfully');
    return requestId;
  } catch (error) {
    console.error("❌ Error requesting to join room:", error);
    throw error;
  }
};

// Get pending requests for a room
export const getPendingRequests = async (userId: string): Promise<JoinRequest[]> => {
  try {
    let querySnapshot;
    try {
      // Try to query with orderBy requestedAt
      const q = query(
        collection(db, "joinRequests"),
        where("hostId", "==", userId),
        where("status", "==", "pending"),
        orderBy("requestedAt", "desc")
      );
      querySnapshot = await getDocs(q);
    } catch (err) {
      // Fallback: query without orderBy if requestedAt is missing
      const q = query(
        collection(db, "joinRequests"),
        where("hostId", "==", userId),
        where("status", "==", "pending")
      );
      querySnapshot = await getDocs(q);
    }
    const requests: JoinRequest[] = [];
    const userIds: string[] = [];
    
    // Collect request data and user IDs
    querySnapshot.forEach(doc => {
      const data = doc.data();
      requests.push({ id: doc.id, ...data } as JoinRequest);
      userIds.push(data.userId);
    });
    
    // Batch fetch user data
    const usersMap = await fetchHostsData(userIds);
    
    // Combine request data with user data
    return requests.map(request => ({
      ...request,
      user: usersMap[request.userId]
    }));
  } catch (error) {
    console.error("Error getting pending requests:", error);
    throw error;
  }
};

// Approve or reject a join request
export const approveJoinRequest = async (requestId: string): Promise<void> => {
  try {
    // Get the request document
    const requestRef = doc(db, 'joinRequests', requestId);
    const requestSnap = await getDoc(requestRef);
    
    if (!requestSnap.exists()) {
      throw new Error('Join request not found');
    }
    
    const requestData = requestSnap.data();
    const { roomId, userId } = requestData;
    
    // Update the request status to approved
    await updateDoc(requestRef, {
      status: RequestStatus.Approved,
      respondedAt: serverTimestamp()
    });
    
    // Add user to room's approved participants
    const roomRef = doc(roomsCollection, roomId);
    await updateDoc(roomRef, {
      approvedParticipants: arrayUnion(userId),
      participants: arrayUnion(userId),
      pendingRequests: arrayRemove(requestId)
    });
    
    console.log(`✅ Join request ${requestId} approved for user ${userId} in room ${roomId}`);
  } catch (error) {
    console.error('❌ Error approving join request:', error);
    throw error;
  }
};

export const rejectJoinRequest = async (requestId: string): Promise<void> => {
  try {
    // Get the request document
    const requestRef = doc(db, 'joinRequests', requestId);
    const requestSnap = await getDoc(requestRef);
    
    if (!requestSnap.exists()) {
      throw new Error('Join request not found');
    }
    
    const requestData = requestSnap.data();
    const { roomId } = requestData;
    
    // Update the request status to rejected
    await updateDoc(requestRef, {
      status: RequestStatus.Rejected,
      respondedAt: serverTimestamp()
    });
    
    // Remove request from room's pending requests
    const roomRef = doc(roomsCollection, roomId);
    await updateDoc(roomRef, {
      pendingRequests: arrayRemove(requestId)
    });
    
    console.log(`❌ Join request ${requestId} rejected for room ${roomId}`);
  } catch (error) {
    console.error('❌ Error rejecting join request:', error);
    throw error;
  }
};

export const respondToJoinRequest = async (
  requestId: string, 
  roomId: string, 
  userId: string, 
  status: RequestStatus
): Promise<void> => {
  try {
    console.log('📝 Responding to join request:', requestId, 'Status:', status);
    
    // Update request status
    const requestRef = doc(db, "joinRequests", requestId);
    await updateDoc(requestRef, {
      status,
      respondedAt: serverTimestamp()
    });
    
    // Try to update activity in activities collection first, then fallback to rooms
    let activityRef = doc(activitiesCollection, roomId);
    let activityDoc = await getDoc(activityRef);
    
    if (!activityDoc.exists()) {
      // Fallback to rooms collection
      activityRef = doc(roomsCollection, roomId);
      activityDoc = await getDoc(activityRef);
      
      if (!activityDoc.exists()) {
        throw new Error('Activity not found');
      }
    }
    
    const userRef = doc(usersCollection, userId);
    
    if (status === RequestStatus.Approved) {
      // Check if activity is full
      const activityData = activityDoc.data();
      const currentParticipants = activityData.participants?.length || 0;
      const maxParticipants = activityData.maxParticipants || 0;
      
      if (currentParticipants >= maxParticipants) {
        console.log('⚠️ Activity is full, but still approving request');
        // Even if full, we'll still approve (for waitlist functionality)
      }
      
      // Add user to approved participants
      await updateDoc(activityRef, {
        participants: arrayUnion(userId),
        approvedParticipants: arrayUnion(userId),
        pendingRequests: arrayRemove(requestId)
      });
      
      // Add room to user's joined rooms
      await updateDoc(userRef, {
        joinedRooms: arrayUnion(roomId),
        pendingRequests: arrayRemove(requestId)
      });
      
      console.log('✅ User approved and added to activity');
    } else {
      // Remove from pending requests
      await updateDoc(activityRef, {
        pendingRequests: arrayRemove(requestId)
      });
      
      await updateDoc(userRef, {
        pendingRequests: arrayRemove(requestId)
      });
    }
    
    console.log('✅ Join request response processed successfully');
  } catch (error) {
    console.error("❌ Error responding to join request:", error);
    throw error;
  }
};

// Send chat message
export const sendChatMessage = async (roomId: string, userId: string, message: string): Promise<string> => {
  try {
    const messageData = {
      roomId,
      userId,
      message,
      timestamp: serverTimestamp()
    };
    
    const messageRef = await addDoc(collection(db, "chatMessages"), messageData);
    return messageRef.id;
  } catch (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
};

// Get chat messages for a room
export const getChatMessages = async (roomId: string): Promise<ChatMessage[]> => {
  try {
    const q = query(
      collection(db, "chatMessages"),
      where("roomId", "==", roomId),
      orderBy("timestamp", "asc"),
      limit(100)
    );
    
    const querySnapshot = await getDocs(q);
    const messages: ChatMessage[] = [];
    const userIds: string[] = [];
    
    // Collect message data and user IDs
    querySnapshot.forEach(doc => {
      const data = doc.data();
      messages.push({ id: doc.id, ...data } as ChatMessage);
      userIds.push(data.userId);
    });
    
    // Batch fetch user data
    const usersMap = await fetchHostsData(userIds);
    
    // Combine message data with user data
    return messages.map(message => ({
      ...message,
      user: usersMap[message.userId]
    }));
  } catch (error) {
    console.error("Error getting chat messages:", error);
    throw error;
  }
};

// Subscribe to chat messages in real-time
export const subscribeToChatMessages = (
  roomId: string, 
  callback: (messages: ChatMessage[]) => void
) => {
  const q = query(
    collection(db, "chatMessages"),
    where("roomId", "==", roomId),
    orderBy("timestamp", "asc")
  );
  
  return onSnapshot(q, async (snapshot) => {
    const messages: ChatMessage[] = [];
    const userIds: string[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      messages.push({ id: doc.id, ...data } as ChatMessage);
      userIds.push(data.userId);
    });
    
    // Batch fetch user data
    const usersMap = await fetchHostsData(userIds);
    
    // Combine message data with user data
    const messagesWithUsers = messages.map(message => ({
      ...message,
      user: usersMap[message.userId]
    }));
    
    callback(messagesWithUsers);
  });
}; 

// Update existing rooms to include new fields (for backward compatibility)
export const updateExistingRoomsWithNewFields = async (): Promise<void> => {
  try {
    console.log("Starting to update existing rooms...");
    
    const querySnapshot = await getDocs(roomsCollection);
    let updatedCount = 0;
    
    for (const roomDoc of querySnapshot.docs) {
      const roomData = roomDoc.data();
      const roomId = roomDoc.id;
      
      // Check if room needs updating (missing new fields)
      if (!roomData.approvedParticipants || !roomData.pendingRequests) {
        console.log(`Updating room: ${roomId}`);
        
        const updates: any = {};
        
        // Add approvedParticipants if missing
        if (!roomData.approvedParticipants) {
          updates.approvedParticipants = [roomData.hostId]; // Host is automatically approved
        }
        
        // Add pendingRequests if missing
        if (!roomData.pendingRequests) {
          updates.pendingRequests = [];
        }
        
        // Update the room
        await updateDoc(doc(roomsCollection, roomId), updates);
        updatedCount++;
      }
    }
    
    console.log(`Updated ${updatedCount} rooms successfully!`);
  } catch (error) {
    console.error("Error updating existing rooms:", error);
    throw error;
  }
};

// Cache management functions
export const clearActivitiesCache = () => {
  activitiesCache.clear();
  cacheExpiry.clear();
  console.log('🧹 Cleared activities cache');
};

export const clearHostsCache = () => {
  hostsCache.clear();
  console.log('🧹 Cleared hosts cache');
};

export const clearAllCache = () => {
  activitiesCache.clear();
  hostsCache.clear();
  cacheExpiry.clear();
  console.log('🧹 Cleared all cache');
};

export const getSentRequests = async (userId: string): Promise<JoinRequest[]> => {
  try {
    let querySnapshot;
    try {
      const q = query(
        collection(db, "joinRequests"),
        where("userId", "==", userId),
        orderBy("requestedAt", "desc")
      );
      querySnapshot = await getDocs(q);
    } catch {
      const q = query(
        collection(db, "joinRequests"),
        where("userId", "==", userId)
      );
      querySnapshot = await getDocs(q);
    }

    const requests: JoinRequest[] = [];
    const roomIds: string[] = [];

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      requests.push({ id: docSnap.id, ...data } as JoinRequest);
      roomIds.push(data.roomId);
    });

    // Fetch related activities/rooms
    const roomsMap: Record<string, Room> = {};
    // Try activities_upl first in chunks of 10 using __name__ in
    for (let i = 0; i < roomIds.length; i += 10) {
      const batch = roomIds.slice(i, i + 10);
      try {
        const qActs = query(activitiesCollection, where('__name__', 'in', batch));
        const actsSnap = await getDocs(qActs);
        actsSnap.forEach((s) => {
          const d: any = s.data();
          roomsMap[s.id] = {
            id: s.id,
            ...d,
          } as Room;
        });
      } catch {}
    }

    // Fallback: fetch from rooms collection for any missing
    const missing = roomIds.filter((id) => !roomsMap[id]);
    for (let i = 0; i < missing.length; i += 10) {
      const batch = missing.slice(i, i + 10);
      try {
        const qRooms = query(roomsCollection, where('__name__', 'in', batch));
        const roomsSnap = await getDocs(qRooms);
        roomsSnap.forEach((s) => {
          const d: any = s.data();
          roomsMap[s.id] = { id: s.id, ...d } as Room;
        });
      } catch {}
    }

    // Attach room data
    const enriched = requests.map((req) => ({
      ...req,
      room: roomsMap[req.roomId],
    }));

    return enriched;
  } catch (error) {
    console.error('Error getting sent requests:', error);
    throw error;
  }
};

export const cancelRequestById = async (requestId: string): Promise<void> => {
  try {
    const requestRef = doc(db, 'joinRequests', requestId);
    const snap = await getDoc(requestRef);
    if (!snap.exists()) throw new Error('Request not found');
    const data = snap.data() as any;
    const { roomId, userId } = data;

    // Remove from activity or room pendingRequests
    let activityRef = doc(activitiesCollection, roomId);
    let activityDoc = await getDoc(activityRef);
    if (!activityDoc.exists()) {
      activityRef = doc(roomsCollection, roomId);
      activityDoc = await getDoc(activityRef);
    }
    if (activityDoc.exists()) {
      const activityData = activityDoc.data() as any;
      const pending = (activityData.pendingRequests || []).filter((id: string) => id !== requestId);
      await updateDoc(activityRef, { pendingRequests: pending });
    }

    // Remove from user's pendingRequests
    const userRef = doc(usersCollection, userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data() as any;
      const pending = (userData.pendingRequests || []).filter((id: string) => id !== requestId);
      await updateDoc(userRef, { pendingRequests: pending });
    }

    // Finally delete the request
    await deleteDoc(requestRef);
  } catch (error) {
    console.error('Error cancelling request by id:', error);
    throw error;
  }
};

export const getUserInvolvedActivities = async (userId: string): Promise<Room[]> => {
  try {
    const collectFrom = async (coll: any) => {
      const results: DocumentData[] = [];
      const ids = new Set<string>();

      // host
      try {
        const qHost = query(coll, where('hostId', '==', userId));
        const snap = await getDocs(qHost);
        snap.forEach(d => { if (!ids.has(d.id)) { ids.add(d.id); results.push({ id: d.id, ...d.data() }); } });
      } catch {}

      // participants
      try {
        const qPart = query(coll, where('participants', 'array-contains', userId));
        const snap = await getDocs(qPart);
        snap.forEach(d => { if (!ids.has(d.id)) { ids.add(d.id); results.push({ id: d.id, ...d.data() }); } });
      } catch {}

      // approvedParticipants
      try {
        const qApproved = query(coll, where('approvedParticipants', 'array-contains', userId));
        const snap = await getDocs(qApproved);
        snap.forEach(d => { if (!ids.has(d.id)) { ids.add(d.id); results.push({ id: d.id, ...d.data() }); } });
      } catch {}

      // normalize host names and participants similar to getAllActivities
      const hostIds: string[] = [];
      results.forEach((r: any) => { if (r.hostId) hostIds.push(r.hostId); });
      const hostsMap = await fetchHostsData(hostIds);
      return results.map((activity: any) => {
        let participants = activity.participants || [];
        if (participants.length > 0 && typeof participants[0] === 'object') {
          participants = participants.map((p: any) => p.id || p);
        }
        let approvedParticipants = activity.approvedParticipants || [activity.hostId];
        if (approvedParticipants.length > 0 && typeof approvedParticipants[0] === 'object') {
          approvedParticipants = approvedParticipants.map((p: any) => p.id || p);
        }
        const rawSportType = activity.sportType;
        const normalizedSportType = typeof rawSportType === 'string' ? rawSportType.replace(/^SportType\./, '') : rawSportType;
        const host = hostsMap[activity.hostId];
        const hostName = host?.name || activity.hostName || `User ${activity.hostId}`;
        return { id: activity.id, ...activity, sportType: normalizedSportType, participants, approvedParticipants, host, hostName } as Room;
      });
    };

    const [fromCurated, fromUserCreated, fromRooms] = await Promise.all([
      collectFrom(activitiesCollection),
      collectFrom(userActivitiesCollection),
      collectFrom(roomsCollection),
    ]);

    // merge unique by id preferring room/user-created over curated
    const map = new Map<string, Room>();
    [...fromCurated, ...fromUserCreated, ...fromRooms].forEach(a => { map.set(a.id, a); });
    return Array.from(map.values());
  } catch (e) {
    console.error('Error fetching user involved activities:', e);
    return [];
  }
};

export const getUserHostedActivities = async (userId: string): Promise<Room[]> => {
  try {
    const q = query(roomsCollection, where('hostId', '==', userId));
    const snap = await getDocs(q);
    const rooms: Room[] = [];
    const hostMap = await fetchHostsData([userId]);
    snap.forEach(s => {
      const d: any = s.data();
      rooms.push({ id: s.id, ...d, host: hostMap[userId], hostName: hostMap[userId]?.name || d.hostName } as Room);
    });
    return rooms;
  } catch (e) {
    console.error('Error fetching hosted rooms:', e);
    return [];
  }
};

export const getUserAcceptedActivities = async (userId: string): Promise<Room[]> => {
  try {
    const requestsQ = query(collection(db, 'joinRequests'), where('userId', '==', userId), where('status', '==', 'approved'));
    const reqSnap = await getDocs(requestsQ);
    const roomIds: string[] = [];
    reqSnap.forEach(d => { const data: any = d.data(); if (data.roomId) roomIds.push(data.roomId); });
    if (roomIds.length === 0) return [];

    const fetchByIds = async (coll: any, ids: string[]) => {
      const results: Room[] = [];
      for (let i = 0; i < ids.length; i += 10) {
        const batch = ids.slice(i, i + 10);
        try {
          const q = query(coll, where('__name__', 'in', batch));
          const snap = await getDocs(q);
          const hostIds: string[] = [];
          const items: any[] = [];
          snap.forEach(s => { const d: any = s.data(); items.push({ id: s.id, ...d }); if (d.hostId) hostIds.push(d.hostId); });
          const hostsMap = await fetchHostsData(hostIds);
          items.forEach(it => {
            const host = hostsMap[it.hostId];
            const hostName = host?.name || it.hostName;
            results.push({ id: it.id, ...it, host, hostName } as Room);
          });
        } catch (e) { console.warn('batch fetch failed', e); }
      }
      return results;
    };

    const [fromCurated, fromRooms, fromUser] = await Promise.all([
      fetchByIds(activitiesCollection, roomIds),
      fetchByIds(roomsCollection, roomIds),
      fetchByIds(userActivitiesCollection, roomIds),
    ]);

    const map = new Map<string, Room>();
    [...fromCurated, ...fromRooms, ...fromUser].forEach(a => map.set(a.id, a));
    return Array.from(map.values());
  } catch (e) {
    console.error('Error fetching accepted activities:', e);
    return [];
  }
};