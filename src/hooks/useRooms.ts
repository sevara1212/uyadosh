import { useState, useEffect } from 'react';
import { 
  roomsCollection, 
  usersCollection,
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
  db
} from '@/lib/firebase';
import { Room, User, SportType } from '@/types';
import { collection, addDoc, Timestamp, DocumentData } from 'firebase/firestore';

interface RoomsState {
  rooms: Room[];
  userRooms: Room[];
  loading: boolean;
  error: string | null;
}

export function useRooms(currentUser: User | null) {
  const [roomsState, setRoomsState] = useState<RoomsState>({
    rooms: [],
    userRooms: [],
    loading: true,
    error: null
  });

  // Fetch all rooms on mount
  useEffect(() => {
    fetchAllRooms();
  }, []);

  // Fetch user's rooms when currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchUserRooms(currentUser.id);
    } else {
      setRoomsState(prev => ({
        ...prev,
        userRooms: []
      }));
    }
  }, [currentUser]);

  // Helper function to batch fetch host data
  const fetchHostsData = async (hostIds: string[]): Promise<Record<string, User>> => {
    // Remove duplicates
    const uniqueHostIds = [...new Set(hostIds)];
    const hostsMap: Record<string, User> = {};
    
    // Batch fetch in groups of 10 (Firestore limit for 'in' queries)
    for (let i = 0; i < uniqueHostIds.length; i += 10) {
      const batch = uniqueHostIds.slice(i, i + 10);
      try {
        const q = query(usersCollection, where('__name__', 'in', batch));
        const hostSnaps = await getDocs(q);
        
        hostSnaps.forEach(doc => {
          hostsMap[doc.id] = { id: doc.id, ...doc.data() } as User;
        });
      } catch (error) {
        console.error('Error batch fetching hosts:', error);
      }
    }
    
    return hostsMap;
  };

  // Fetch all rooms
  const fetchAllRooms = async () => {
    setRoomsState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const roomsSnapshot = await getDocs(roomsCollection);
      const roomsData: DocumentData[] = [];
      const hostIds: string[] = [];
      
      // First, collect all room data and host IDs
      roomsSnapshot.forEach(doc => {
        const data = doc.data();
        roomsData.push({ id: doc.id, ...data });
        if (data.hostId) hostIds.push(data.hostId);
      });
      
      // Then batch fetch all hosts data
      const hostsMap = await fetchHostsData(hostIds);
      
      // Finally, combine room data with host data
      const roomsList = roomsData.map(room => ({
        ...room,
        host: hostsMap[room.hostId]
      })) as Room[];
      
      setRoomsState(prev => ({
        ...prev,
        rooms: roomsList,
        loading: false
      }));
      
      return roomsList;
    } catch (error: any) {
      setRoomsState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch rooms'
      }));
      return [];
    }
  };

  // Fetch rooms by sport type
  const fetchRoomsBySport = async (sportType: SportType) => {
    setRoomsState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const q = query(roomsCollection, where("sportType", "==", sportType));
      const roomsSnapshot = await getDocs(q);
      const roomsData: DocumentData[] = [];
      const hostIds: string[] = [];
      
      // First, collect all room data and host IDs
      roomsSnapshot.forEach(doc => {
        const data = doc.data();
        roomsData.push({ id: doc.id, ...data });
        if (data.hostId) hostIds.push(data.hostId);
      });
      
      // Then batch fetch all hosts data
      const hostsMap = await fetchHostsData(hostIds);
      
      // Finally, combine room data with host data
      const roomsList = roomsData.map(room => ({
        ...room,
        host: hostsMap[room.hostId]
      })) as Room[];
      
      setRoomsState(prev => ({
        ...prev,
        loading: false
      }));
      
      return roomsList;
    } catch (error: any) {
      setRoomsState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch rooms by sport'
      }));
      return [];
    }
  };

  // Fetch rooms joined by the user
  const fetchUserRooms = async (userId: string) => {
    setRoomsState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const q = query(roomsCollection, where("participants", "array-contains", userId));
      const roomsSnapshot = await getDocs(q);
      const roomsData: DocumentData[] = [];
      const hostIds: string[] = [];
      
      // First, collect all room data and host IDs
      roomsSnapshot.forEach(doc => {
        const data = doc.data();
        roomsData.push({ id: doc.id, ...data });
        if (data.hostId) hostIds.push(data.hostId);
      });
      
      // Then batch fetch all hosts data
      const hostsMap = await fetchHostsData(hostIds);
      
      // Finally, combine room data with host data
      const userRoomsList = roomsData.map(room => ({
        ...room,
        host: hostsMap[room.hostId]
      })) as Room[];
      
      setRoomsState(prev => ({
        ...prev,
        userRooms: userRoomsList,
        loading: false
      }));
      
      return userRoomsList;
    } catch (error: any) {
      setRoomsState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Failed to fetch user rooms'
      }));
      return [];
    }
  };

  // Get a room by ID
  const getRoomById = async (roomId: string) => {
    try {
      const roomRef = doc(roomsCollection, roomId);
      const roomSnap = await getDoc(roomRef);
      
      if (!roomSnap.exists()) {
        return null;
      }
      
      const roomData = roomSnap.data();
      
      // Get host data
      let host: User | undefined;
      if (roomData.hostId) {
        const hostRef = doc(usersCollection, roomData.hostId);
        const hostSnap = await getDoc(hostRef);
        if (hostSnap.exists()) {
          host = { id: hostSnap.id, ...hostSnap.data() } as User;
        }
      }
      
      return {
        id: roomId,
        ...roomData,
        host
      } as Room;
    } catch (error: any) {
      console.error('Error getting room:', error);
      throw error;
    }
  };

  // Create a new room
  const createRoom = async (roomData: Omit<Room, 'id' | 'participants' | 'createdAt'>) => {
    if (!currentUser) {
      throw new Error('User must be logged in to create a room');
    }
    
    try {
      // Prepare room data for Firestore
      const newRoom = {
        ...roomData,
        hostId: currentUser.id,
        participants: [currentUser.id], // Host is automatically a participant
        createdAt: serverTimestamp()
      };
      
      // Add room to Firestore
      const roomRef = await addDoc(roomsCollection, newRoom);
      const roomId = roomRef.id;
      
      // Update user's joinedRooms array
      const userRef = doc(usersCollection, currentUser.id);
      await updateDoc(userRef, {
        joinedRooms: arrayUnion(roomId)
      });
      
      // Refresh rooms list
      fetchAllRooms();
      fetchUserRooms(currentUser.id);
      
      return roomId;
    } catch (error: any) {
      console.error('Error creating room:', error);
      throw error;
    }
  };

  // Join a room
  const joinRoom = async (roomId: string) => {
    if (!currentUser) {
      throw new Error('User must be logged in to join a room');
    }
    
    try {
      const roomRef = doc(roomsCollection, roomId);
      const userRef = doc(usersCollection, currentUser.id);
      
      // Add user to room participants
      await updateDoc(roomRef, {
        participants: arrayUnion(currentUser.id)
      });
      
      // Add room to user's joinedRooms
      await updateDoc(userRef, {
        joinedRooms: arrayUnion(roomId)
      });
      
      // Refresh rooms
      fetchUserRooms(currentUser.id);
      
      return true;
    } catch (error: any) {
      console.error('Error joining room:', error);
      throw error;
    }
  };

  // Leave a room
  const leaveRoom = async (roomId: string) => {
    if (!currentUser) {
      throw new Error('User must be logged in to leave a room');
    }
    
    try {
      const roomRef = doc(roomsCollection, roomId);
      const userRef = doc(usersCollection, currentUser.id);
      
      // Remove user from room participants
      await updateDoc(roomRef, {
        participants: arrayRemove(currentUser.id)
      });
      
      // Remove room from user's joinedRooms
      await updateDoc(userRef, {
        joinedRooms: arrayRemove(roomId)
      });
      
      // Refresh rooms
      fetchUserRooms(currentUser.id);
      
      return true;
    } catch (error: any) {
      console.error('Error leaving room:', error);
      throw error;
    }
  };

  // Get room participants
  const getRoomParticipants = async (roomId: string) => {
    try {
      const roomRef = doc(roomsCollection, roomId);
      const roomSnap = await getDoc(roomRef);
      
      if (!roomSnap.exists()) {
        throw new Error('Room not found');
      }
      
      const roomData = roomSnap.data();
      const participantIds = roomData.participants || [];
      
      const participants: User[] = [];
      for (const userId of participantIds) {
        const userRef = doc(usersCollection, userId);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          participants.push({
            id: userSnap.id,
            ...userSnap.data()
          } as User);
        }
      }
      
      return participants;
    } catch (error: any) {
      console.error('Error getting room participants:', error);
      throw error;
    }
  };

  return {
    ...roomsState,
    fetchAllRooms,
    fetchRoomsBySport,
    fetchUserRooms,
    getRoomById,
    createRoom,
    joinRoom,
    leaveRoom,
    getRoomParticipants
  };
} 