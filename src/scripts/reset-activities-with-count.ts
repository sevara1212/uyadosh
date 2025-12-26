import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, writeBatch, doc } from "firebase/firestore";
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nameToUserId = new Map<string, string>(
  mockUsers.map(u => [u.name.trim().toLowerCase(), u.id])
);

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
    const fromMock = mockIdFromToken(value);
    if (fromMock) return fromMock;
    const m = value.match(/mockUsers\[(\d+)\]\.id/);
    if (m) {
      const idx = parseInt(m[1], 10);
      if (!Number.isNaN(idx) && mockUsers[idx]) return mockUsers[idx].id;
    }
    const byName = nameToUserId.get(value.trim().toLowerCase());
    if (byName) return byName;
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
  const hostId = resolveIdFromAny(raw.hostId) || resolveIdFromAny(raw.host) || resolveIdFromAny(raw.hostName);
  if (hostId) transformed.hostId = hostId;
  transformed.participants = Array.isArray(raw.participants) ? raw.participants.map(normalizeParticipant) : [];
  transformed.approvedParticipants = Array.isArray(raw.approvedParticipants)
    ? raw.approvedParticipants.map(normalizeParticipant)
    : (transformed.hostId ? [transformed.hostId] : []);
  delete transformed.host;
  delete transformed.hostName;
  return transformed;
};

async function clearActivitiesUpl() {
  const collRef = collection(db, "activities_upl");
  const snap = await getDocs(collRef);
  console.log(`🧹 Deleting ${snap.size} docs from activities_upl...`);
  let docs = snap.docs;
  let processed = 0;
  while (docs.length > 0) {
    const chunk = docs.splice(0, 400);
    const batch = writeBatch(db);
    chunk.forEach(d => batch.delete(d.ref));
    await batch.commit();
    processed += chunk.length;
    console.log(`   ✅ Deleted ${processed} so far...`);
  }
  console.log(`✅ Finished clearing activities_upl`);
}

function readBaseActivities(): Record<string, any> {
  const jsonPath = path.resolve(__dirname, "./activities-data.json");
  if (!fs.existsSync(jsonPath)) throw new Error(`activities-data.json not found at ${jsonPath}`);
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const data = JSON.parse(raw);
  return data.activities_upl || data.activities || {};
}

function generateIdSequence(existingIds: string[], needed: number): string[] {
  // Try numeric IDs continuing after max numeric id, else use 9000+
  const numeric = existingIds.map(id => parseInt(id, 10)).filter(n => !Number.isNaN(n));
  let start = numeric.length ? Math.max(...numeric) + 1 : 9000;
  return Array.from({ length: needed }, (_, i) => String(start + i));
}

function cloneWithVariations(base: any, index: number): any {
  const a = { ...base };
  // shift date by index days if dateTime exists
  if (a.dateTime) {
    const d = new Date(a.dateTime);
    if (!Number.isNaN(d.getTime())) {
      d.setDate(d.getDate() + index);
      a.dateTime = d.toISOString();
    }
  }
  // tweak title to indicate variant
  if (a.title) a.title = `${a.title} (v${index + 1})`;
  // ensure hostId exists
  if (!a.hostId) {
    const randomHost = mockUsers[Math.floor(Math.random() * mockUsers.length)].id;
    a.hostId = randomHost;
  }
  // ensure participants contain host
  if (!Array.isArray(a.participants)) a.participants = [];
  if (!a.participants.includes(a.hostId)) a.participants.unshift(a.hostId);
  if (!Array.isArray(a.approvedParticipants)) a.approvedParticipants = [a.hostId];
  return a;
}

async function uploadCount(targetCount: number) {
  const entries = readBaseActivities();
  const ids = Object.keys(entries);

  // Transform base activities
  const transformed: Array<{ id: string; data: any }> = ids.map(id => ({ id, data: transformActivity(entries[id]) }));

  // If we need more, clone from base
  if (transformed.length < targetCount) {
    const deficit = targetCount - transformed.length;
    const newIds = generateIdSequence(ids, deficit);
    for (let i = 0; i < deficit; i++) {
      const base = transformed[i % transformed.length].data;
      const cloned = cloneWithVariations(base, i);
      transformed.push({ id: newIds[i], data: cloned });
    }
  } else if (transformed.length > targetCount) {
    transformed.length = targetCount;
  }

  console.log(`⬆️  Uploading ${targetCount} activities to activities_upl...`);
  let processed = 0;
  for (let i = 0; i < transformed.length; i += 400) {
    const batch = writeBatch(db);
    const slice = transformed.slice(i, i + 400);
    slice.forEach(({ id, data }) => {
      batch.set(doc(collection(db, "activities_upl"), id), data);
    });
    await batch.commit();
    processed += slice.length;
    console.log(`   ✅ Uploaded ${processed}/${targetCount}...`);
  }
  console.log("🎉 Upload complete.");
}

(async function main() {
  try {
    const target = parseInt(process.argv[2] ?? "250", 10);
    await clearActivitiesUpl();
    await uploadCount(target);
  } catch (e) {
    console.error("❌ Error:", e);
    process.exit(1);
  }
})();
