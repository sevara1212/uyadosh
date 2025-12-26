import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, writeBatch, doc, setDoc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mockUsers } from "../data/Data";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ2QGDCAO_QU-J1bC41KoSrHkro4iigVQ",
  authDomain: "fit-tribe-mobile-hub.firebaseapp.com",
  projectId: "fit-tribe-mobile-hub",
  storageBucket: "fit-tribe-mobile-hub.appspot.com",
  messagingSenderId: "784141035396",
  appId: "1:784141035396:web:8b0b5c01cdbc67d8721fd1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build quick lookup maps
const nameToUserId = new Map<string, string>(
  mockUsers.map(u => [u.name.trim().toLowerCase(), u.id])
);

// Helpers to map mockUsers[...] references to real IDs
const mockIdFromToken = (token: string): string | null => {
  const m = token.match(/mockUsers\[(\d+)\]/);
  if (!m) return null;
  const idx = parseInt(m[1], 10);
  if (Number.isNaN(idx) || idx < 0 || idx >= mockUsers.length) return null;
  return mockUsers[idx].id;
};

const resolveIdFromAny = (value: any): string | null => {
  if (!value) return null;
  if (typeof value === "string") {
    // mockUsers[index]
    const fromMock = mockIdFromToken(value);
    if (fromMock) return fromMock;
    // mockUsers[index].id
    const m = value.match(/mockUsers\[(\d+)\]\.id/);
    if (m) {
      const idx = parseInt(m[1], 10);
      if (!Number.isNaN(idx) && mockUsers[idx]) return mockUsers[idx].id;
    }
    // human name string
    const byName = nameToUserId.get(value.trim().toLowerCase());
    if (byName) return byName;
    // already an id
    return value;
  }
  if (typeof value === "object") {
    if (value.id) return value.id;
    if (value.name) {
      const byName = nameToUserId.get(String(value.name).trim().toLowerCase());
      if (byName) return byName;
    }
  }
  return null;
};

const normalizeParticipant = (p: any): string => {
  const id = resolveIdFromAny(p);
  return id ?? String(p);
};

const transformActivity = (raw: any) => {
  const transformed: any = { ...raw };

  // hostId can be like "mockUsers[66].id" or direct id or host name string
  let hostId: string | null = null;
  hostId = resolveIdFromAny(raw.hostId) || resolveIdFromAny(raw.host) || resolveIdFromAny(raw.hostName);
  if (hostId) transformed.hostId = hostId;

  // participants/approvedParticipants may contain mock tokens or names
  transformed.participants = Array.isArray(raw.participants)
    ? raw.participants.map(normalizeParticipant)
    : [];
  transformed.approvedParticipants = Array.isArray(raw.approvedParticipants)
    ? raw.approvedParticipants.map(normalizeParticipant)
    : (transformed.hostId ? [transformed.hostId] : []);

  // carry over enriched fields if present
  if (raw.title) transformed.title = raw.title;
  if (raw.description) transformed.description = raw.description;
  if (raw.price !== undefined) transformed.price = raw.price;
  if (raw.sportType) transformed.sportType = raw.sportType;
  if (raw.location) transformed.location = raw.location;
  if (raw.dateTime) transformed.dateTime = raw.dateTime;
  if (raw.maxParticipants) transformed.maxParticipants = raw.maxParticipants;
  if (!transformed.pendingRequests) transformed.pendingRequests = raw.pendingRequests || [];

  // Remove embedded host object/string if present
  delete transformed.host;
  delete transformed.hostName;

  return transformed;
};

async function clearCollection(collPath: string) {
  const collRef = collection(db, collPath);
  const snap = await getDocs(collRef);
  console.log(`🧹 Deleting ${snap.size} docs from ${collPath}...`);
  let processed = 0;
  // Batch delete in chunks of 400 to stay safe under 500 limit
  let docs = snap.docs;
  while (docs.length > 0) {
    const chunk = docs.splice(0, 400);
    const batch = writeBatch(db);
    chunk.forEach(d => batch.delete(d.ref));
    await batch.commit();
    processed += chunk.length;
    console.log(`   ✅ Deleted ${processed} so far...`);
  }
  console.log(`✅ Finished clearing ${collPath}`);
}

async function uploadActivitiesFromJson() {
  const jsonPath = path.resolve(__dirname, "./activities-data.json");
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`activities-data.json not found at ${jsonPath}`);
  }
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const data = JSON.parse(raw);
  const entries = data.activities_upl || data.activities || {};
  const ids = Object.keys(entries);
  console.log(`⬆️  Uploading ${ids.length} activities to activities_upl...`);

  let processed = 0;
  for (let i = 0; i < ids.length; i += 400) {
    const batch = writeBatch(db);
    const slice = ids.slice(i, i + 400);
    slice.forEach(id => {
      const activity = transformActivity(entries[id]);
      batch.set(doc(collection(db, "activities_upl"), id), activity);
    });
    await batch.commit();
    processed += slice.length;
    console.log(`   ✅ Uploaded ${processed}/${ids.length}...`);
  }
  console.log("🎉 Activities upload complete.");
}

async function ensureUserActivitiesCollection() {
  const metaRef = doc(collection(db, "activities"), "__meta");
  await setDoc(metaRef, {
    createdAt: new Date().toISOString(),
    note: "Collection for user-created activities",
  }, { merge: true });
  console.log("✅ Ensured 'activities' collection exists (meta doc created).");
}

(async function main() {
  try {
    await clearCollection("activities_upl");
    await uploadActivitiesFromJson();
    await ensureUserActivitiesCollection();
  } catch (e) {
    console.error("❌ Reset failed:", e);
    process.exit(1);
  }
})();
