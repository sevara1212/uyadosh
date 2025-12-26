import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, writeBatch } from "firebase/firestore";
import { firebaseConfig } from "../lib/firebase.config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearActivitiesUpl() {
  const collRef = collection(db, "activities_upl");
  const snap = await getDocs(collRef);
  console.log(`🧹 Deleting ${snap.size} docs from activities_upl (project: ${firebaseConfig.projectId})...`);
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

(async function main() {
  try {
    await clearActivitiesUpl();
    process.exit(0);
  } catch (e) {
    console.error("❌ Clear failed:", e);
    process.exit(1);
  }
})();
