import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User as FirebaseUser, connectAuthEmulator, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDocs,
  Timestamp,
  serverTimestamp,
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
  enableMultiTabIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  addDoc,
  orderBy,
  limit,
  onSnapshot,
  startAfter,
  DocumentSnapshot,
  deleteDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import { firebaseConfig, firestoreRegion } from "./firebase.config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Connect to emulators in development mode
// Set USE_FIREBASE_EMULATOR to false to use the live Firebase services
const USE_FIREBASE_EMULATOR = false;
const isLocalhost = window.location.hostname === 'localhost';

if (isLocalhost && USE_FIREBASE_EMULATOR) {
  console.log("Using Firebase Emulators");
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectStorageEmulator(storage, 'localhost', 9199);
} else {
  console.log("Using live Firebase services");
  
  // Enable offline persistence with better error handling
  enableIndexedDbPersistence(db)
    .then(() => {
      console.log("✅ Firestore persistence enabled successfully");
    })
    .catch((err) => {
      console.error("❌ Error enabling persistence:", err);
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.warn("⚠️ Multiple tabs open, persistence enabled in first tab only");
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required for persistence
        console.warn("⚠️ This browser doesn't support persistence");
      } else if (err.code === 'unavailable') {
        // IndexedDB is not available (private browsing, etc.)
        console.warn("⚠️ IndexedDB not available - running in online-only mode");
      } else {
        // For any other error, disable persistence and continue
        console.warn("⚠️ Disabling persistence due to error:", err.code);
      }
    });
}

// Collections references
const roomsCollection = collection(db, "rooms");
const usersCollection = collection(db, "users");
const activitiesCollection = collection(db, "activities_upl"); // curated activities
const userActivitiesCollection = collection(db, "activities"); // user-created activities

export {
  app,
  auth,
  db,
  storage,
  roomsCollection,
  usersCollection,
  activitiesCollection,
  userActivitiesCollection,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDocs,
  Timestamp,
  serverTimestamp,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  collection,
  addDoc,
  orderBy,
  limit,
  onSnapshot,
  startAfter,
  DocumentSnapshot,
  deleteDoc,
  GoogleAuthProvider,
  signInWithPopup
};

export type { FirebaseUser }; 