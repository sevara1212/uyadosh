import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRooms } from './useRooms';
import { Room, SportType } from '@/types';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface RoomFormData {
  title: string;
  description: string;
  sportType: SportType;
  date: string;
  time: string;
  duration: number;
  maxParticipants: number;
  address: string;
  city: string;
  price?: number;
}

export function useRoomActions() {
  const { currentUser } = useAuth();
  const roomsHook = useRooms(currentUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Create a new room
  const createRoom = async (formData: RoomFormData) => {
    if (!currentUser) {
      toast.error('You must be logged in to create an activity');
      navigate('/login');
      return false;
    }

    setLoading(true);
    try {
      // Combine date and time into a single dateTime string
      const dateTime = new Date(`${formData.date}T${formData.time}`).toISOString();
      
      // Prepare room data
      const roomData = {
        title: formData.title,
        description: formData.description,
        sportType: formData.sportType,
        dateTime,
        duration: formData.duration,
        maxParticipants: formData.maxParticipants,
        location: {
          address: formData.address,
          city: formData.city,
          lat: 0, // Would use a geocoding service in a real app
          lng: 0
        },
        hostId: currentUser.id,
        price: formData.price
      };
      
      // Create room in Firebase
      const roomId = await roomsHook.createRoom(roomData);
      
      toast.success('Activity created successfully!');
      navigate(`/room/${roomId}`);
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create activity');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Join a room
  const joinRoom = async (roomId: string) => {
    if (!currentUser) {
      toast.error('You must be logged in to join an activity');
      navigate('/login');
      return false;
    }

    setLoading(true);
    try {
      await roomsHook.joinRoom(roomId);
      toast.success('You have joined the activity!');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to join activity');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Leave a room
  const leaveRoom = async (roomId: string) => {
    if (!currentUser) {
      toast.error('You must be logged in to leave an activity');
      navigate('/login');
      return false;
    }

    setLoading(true);
    try {
      await roomsHook.leaveRoom(roomId);
      toast.success('You have left the activity');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Failed to leave activity');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get room details with participants
  const getRoomDetails = async (roomId: string) => {
    setLoading(true);
    try {
      const room = await roomsHook.getRoomById(roomId);
      if (!room) {
        throw new Error('Activity not found');
      }
      
      const participants = await roomsHook.getRoomParticipants(roomId);
      
      return { room, participants };
    } catch (error: any) {
      toast.error(error.message || 'Failed to load activity details');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createRoom,
    joinRoom,
    leaveRoom,
    getRoomDetails,
    loading,
    ...roomsHook
  };
} 