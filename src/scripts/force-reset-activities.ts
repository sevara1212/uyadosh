import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, writeBatch, doc } from "firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { mockUsers } from "../data/Data";
import { firebaseConfig } from "../lib/firebase.config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nameToUserId = new Map<string, string>(
  mockUsers.map(u => [u.name.trim().toLowerCase(), u.id])
);

function toDateTimeISO(dateStr?: string, timeStr?: string): string {
  try {
    if (dateStr) {
      const t = timeStr || "09:00";
      const d = new Date(`${dateStr}T${t}:00`);
      if (!Number.isNaN(d.getTime())) return d.toISOString();
    }
  } catch {}
  // Fallback: now + 3 days at 09:00
  const now = new Date();
  now.setDate(now.getDate() + 3);
  now.setHours(9, 0, 0, 0);
  return now.toISOString();
}

function resolveNameToId(name?: string): string | undefined {
  if (!name) return undefined;
  const id = nameToUserId.get(name.trim().toLowerCase());
  return id || undefined;
}

function pickRandomUserId(): string {
  return mockUsers[Math.floor(Math.random() * mockUsers.length)].id;
}

async function clearActivitiesUpl() {
  const collRef = collection(db, "activities_upl");
  const snap = await getDocs(collRef);
  console.log(`🧹 Deleting ${snap.size} docs from activities_upl...`);
  let remaining = snap.docs.slice();
  let processed = 0;
  while (remaining.length > 0) {
    const chunk = remaining.splice(0, 400);
    const batch = writeBatch(db);
    chunk.forEach(d => batch.delete(d.ref));
    await batch.commit();
    processed += chunk.length;
    console.log(`   ✅ Deleted ${processed} so far...`);
  }
  console.log(`✅ Finished clearing activities_upl`);
}

function readActivitiesArray(): any[] {
  const jsonPath = path.resolve(__dirname, "./activities-data.json");
  if (!fs.existsSync(jsonPath)) throw new Error(`activities-data.json not found at ${jsonPath}`);
  const raw = fs.readFileSync(jsonPath, "utf-8");
  const data = JSON.parse(raw);
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.activities)) return data.activities;
  if (data.activities_upl && typeof data.activities_upl === 'object') {
    return Object.values(data.activities_upl);
  }
  throw new Error("activities-data.json format not recognized (expecting array)");
}

function parseDurationToMinutes(input: any): number {
  if (typeof input === 'number' && Number.isFinite(input)) return input;
  if (typeof input !== 'string') return 60;
  const s = input.trim().toLowerCase();
  const hoursMatch = s.match(/(\d+(?:\.\d+)?)\s*h(?:ours?)?/);
  const minutesMatch = s.match(/(\d+)\s*m(?:in(?:ute)?s?)?/);
  let total = 0;
  if (hoursMatch) total += Math.round(parseFloat(hoursMatch[1]) * 60);
  if (minutesMatch) total += parseInt(minutesMatch[1], 10);
  if (!hoursMatch && !minutesMatch) {
    const num = parseInt(s, 10);
    if (!Number.isNaN(num)) return num; // assume minutes
    return 60;
  }
  return total || 60;
}

function transform(item: any) {
  let hostId = resolveNameToId(item.host) || resolveNameToId(item.hostName);
  if (!hostId) hostId = pickRandomUserId();

  const participants: string[] = Array.isArray(item.participants)
    ? item.participants.map((n: any) => resolveNameToId(String(n)) || pickRandomUserId())
    : [];
  if (hostId && !participants.includes(hostId)) participants.unshift(hostId);

  const maxParticipants = Number(item.participantsNeeded) || (participants.length || 10);
  const city = typeof item.city === 'string' ? item.city : '';
  const location = typeof item.location === 'string'
    ? { address: item.location, city }
    : (item.location && typeof item.location === 'object' ? { address: item.location.address || city, city: item.location.city || city } : { address: city, city });

  return {
    title: item.title || 'Untitled Activity',
    sportType: item.sportType?.startsWith("SportType.") ? item.sportType.replace(/^SportType\./, "") : (item.sportType || 'Other'),
    hostId,
    participants,
    approvedParticipants: participants.slice(),
    pendingRequests: [],
    dateTime: toDateTimeISO(item.date, item.time),
    duration: parseDurationToMinutes(item.duration),
    maxParticipants,
    location,
    city,
    description: item.description || "",
    price: Number(item.price) || 0
  };
}

async function uploadActivities(items: any[]) {
  console.log(`⬆️  Uploading ${items.length} activities to activities_upl...`);
  let processed = 0;
  for (let i = 0; i < items.length; i += 400) {
    const batch = writeBatch(db);
    const slice = items.slice(i, i + 400);
    slice.forEach((it: any) => {
      const id = String(it.id || it.ID || it.title || Math.random().toString(36).slice(2));
      const data = transform(it);
      batch.set(doc(collection(db, "activities_upl"), id), data);
    });
    await batch.commit();
    processed += slice.length;
    console.log(`   ✅ Uploaded ${processed}/${items.length}...`);
  }
  console.log("🎉 Upload complete.");
}

async function verifyCount(expected: number) {
  const snap = await getDocs(collection(db, "activities_upl"));
  console.log(`📊 activities_upl count: ${snap.size}`);
  if (snap.size !== expected) {
    console.warn(`⚠️  Expected ${expected} but found ${snap.size}`);
  }
}

(async function main() {
  try {
    await clearActivitiesUpl();
    const items = readActivitiesArray();
    if (items.length !== 250) {
      console.log(`ℹ️ JSON has ${items.length} items; proceeding to upload all of them.`);
    }
    await uploadActivities(items);
    await verifyCount(items.length);
  } catch (e) {
    console.error("❌ Force reset failed:", e);
    process.exit(1);
  }
})();
