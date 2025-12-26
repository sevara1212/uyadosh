import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

async function printCollection(coll: string) {
  const snap = await getDocs(collection(db, coll));
  console.log(`\n📚 Collection '${coll}': count=${snap.size}`);
  snap.docs.slice(0, 5).forEach((d, i) => {
    const data = d.data();
    console.log(`  ${i + 1}. id=${d.id} title=${data.title ?? '(no title)'} hostId=${data.hostId ?? '(none)'}`);
  });
}

(async function main() {
  try {
    await printCollection('activities_upl');
    await printCollection('activities');
  } catch (e) {
    console.error('❌ Verification error:', e);
    process.exit(1);
  }
})();
