
export enum Gender {
  Male = "Male",
  Female = "Female",
  Both = "Both"
}

export interface AgeRange {
  min: number;
  max: number;
}

export enum RequestStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected"
}

export interface JoinRequest {
  id: string;
  roomId: string;
  userId: string;
  user?: User; // Populated user data
  status: RequestStatus;
  requestedAt: any; // Timestamp
  respondedAt?: any; // Timestamp when host responded
  message?: string; // Optional message from user
}

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  user?: User; // Populated user data
  message: string;
  timestamp: any; // Timestamp
  status?: 'sending' | 'sent' | 'seen'; // Message status for read receipts
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  interests: SportType[];
  activityLevel: ActivityLevel;
  joinedDate: string;
  bio?: string;
  email?: string;
  joinedRooms?: string[]; // Array of room IDs the user has joined
  gender?: Gender;
  age?: number;
  preferredGender?: Gender; // For activity preferences
  preferredAgeRange?: AgeRange; // For activity preferences
  pendingRequests?: string[]; // Array of request IDs
}

export enum ActivityLevel {
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Advanced = "Advanced"
}

export enum SportType {
  Running = "Running",
  Yoga = "Yoga",
  Cycling = "Cycling",
  Swimming = "Swimming",
  Basketball = "Basketball",
  Football = "Football",
  Tennis = "Tennis",
  Gym = "Gym",
  Other = "Other"
}

export interface Room {
  id: string;
  title: string;
  sportType: SportType;
  hostId: string; // ID of the host user
  hostName?: string; // Name of the host user
  host?: User; // Full host user object (may be populated from hostId)
  location: Location;
  dateTime: string;
  duration: number; // in minutes
  maxParticipants: number;
  participants: string[]; // Array of user IDs who have joined
  approvedParticipants: string[]; // Array of approved user IDs
  pendingRequests: string[]; // Array of request IDs
  description?: string;
  price?: number; // Optional for paid activities
  createdAt?: any; // Timestamp from Firebase
  genderPreference?: Gender; // Gender preference for the activity
  ageRange?: AgeRange; // Age range preference for the activity
}

export interface Location {
  address: string;
  city: string;
  lat: number;
  lng: number;
  locationLink?: string;
}

export interface FirebaseRoom extends Omit<Room, 'id'> {
  // For Firestore document
}
