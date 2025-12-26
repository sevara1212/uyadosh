import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";

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

// Mock users data from Data.ts
const mockUsers = [
  { id: "1", name: "Xonazimxon A'zamova" },
  { id: "2", name: "Hojiakbar Abdug'offorov" },
  { id: "3", name: "Hojiakbar Abdugafforov" },
  { id: "4", name: "Humoyun Abduhalilov" },
  { id: "5", name: "Abdurahmon Abduhamidov" },
  { id: "6", name: "Fazliddin Abduholiqov" },
  { id: "7", name: "Abdusalim Abdukarimov" },
  { id: "8", name: "Maftuna Abdukhakimova" },
  { id: "9", name: "Shukrullo Abdulkhakimov" },
  { id: "10", name: "Ismoil Abdullayev" },
  { id: "11", name: "Muhammadamin Abdullayev" },
  { id: "12", name: "Rustambek Abdullayev" },
  { id: "13", name: "Sirojiddin Abdullayev" },
  { id: "14", name: "Abdujalil Abdumajidov" },
  { id: "15", name: "Aziz Abduqodirov" },
  { id: "16", name: "Muhabbatxon Abdurahimova" },
  { id: "17", name: "Mubina Abdurahmanova" },
  { id: "18", name: "Muhammadrizo Abduraimov" },
  { id: "19", name: "Abror Abdurashidov" },
  { id: "20", name: "Abubakr Abduraximov" },
  { id: "21", name: "Abdulloh Abdurazzoqov" },
  { id: "22", name: "Muxammadjon Abduvohidov" },
  { id: "23", name: "Dilnoza Abduvohidova" },
  { id: "24", name: "AHMADXO'JA Abrorhajaev" },
  { id: "25", name: "Asilbek Adilov" },
  { id: "26", name: "Dilnoza Ahmadova" },
  { id: "27", name: "Abdulaziz Ahmedov" },
  { id: "28", name: "Nursaid Akbarov" },
  { id: "29", name: "Mubina Akbarova" },
  { id: "30", name: "Oysha Akbarova" },
  { id: "31", name: "Saidolimxon Akmalxonov" },
  { id: "32", name: "Muhammadaziz Akramov" },
  { id: "33", name: "Humoyun Alijonov" },
  { id: "34", name: "Ozodbek Amirov" },
  { id: "35", name: "Muhammaddiyor Anvarov" },
  { id: "36", name: "Xadicha Artikbaeva" },
  { id: "37", name: "Rasulbek Artikboyev" },
  { id: "38", name: "Muhhamedov Asilbek" },
  { id: "39", name: "Abbos Athamjonov" },
  { id: "40", name: "Gavharoy Avbakirova" },
  { id: "41", name: "Ismoil Axrorjonov" },
  { id: "42", name: "Odina Axrorova" },
  { id: "43", name: "Abubakir Azambekov" },
  { id: "44", name: "Hasanjon Azamjonov" },
  { id: "45", name: "Husanjon Azamjonov" },
  { id: "46", name: "Firdavs Bahodirov" },
  { id: "47", name: "Ozodbek Bahromov" },
  { id: "48", name: "Xumoyun Bahtiyorov" },
  { id: "49", name: "Bilol Bakhrillaev" },
  { id: "50", name: "Begzod Baxodirov" },
  { id: "51", name: "Firdavs Baxodirov" },
  { id: "52", name: "Iskandar Baxtiyorjonov" },
  { id: "53", name: "Mardon Baxtiyorov" },
  { id: "54", name: "Mustafo Baxtiyorov" },
  { id: "55", name: "Nurbekjon Bobonqulov" },
  { id: "56", name: "Lola Bunyadova" },
  { id: "57", name: "Nozimxo'ja Burxonxo'jayev" },
  { id: "58", name: "Muslima Chanoyeva" },
  { id: "59", name: "Akbar Daminov" },
  { id: "60", name: "Nozima Doniyorova" },
  { id: "61", name: "Abror Egamberdiyev" },
  { id: "62", name: "Behruzbek Ergashev" },
  { id: "63", name: "Robiya Erkinova" },
  { id: "64", name: "Muhammadaziz Faxriddinov" },
  { id: "65", name: "Abbos G'ofurov" },
  { id: "66", name: "Azizjon G'opporov" },
  { id: "67", name: "Kamron Gulomov" },
  { id: "68", name: "Dilnavoz Gulomqodirova" },
  { id: "69", name: "Abdurashid Habibulaev" },
  { id: "70", name: "Abdullox Hosiyatov" },
  { id: "71", name: "Xojarxon Ibaydullayeva" },
  { id: "72", name: "Abdurauf Isakov" },
  { id: "73", name: "Jahongir Iskandarov" },
  { id: "74", name: "Samandar Ismailov" },
  { id: "75", name: "Kozimjon Isomov" },
  { id: "76", name: "Ulug`bek Istamov" },
  { id: "77", name: "Yasmina Jahongirova" },
  { id: "78", name: "Shohjahon Jumanazarov" },
  { id: "79", name: "Abdurahim Juramurodov" },
  { id: "80", name: "Asal Khojiyeva" },
  { id: "81", name: "Visola Kholmukhamedova" },
  { id: "82", name: "Husniddin Kironov" },
  { id: "83", name: "Abdulloh Komiljonov" },
  { id: "84", name: "Abdulloh Komilov" },
  { id: "85", name: "Elyor Komilov" },
  { id: "86", name: "Shoxruz Kukanboyev" },
  { id: "87", name: "Doniyor Kuziyev" },
  { id: "88", name: "Omadjon Latibjonov" },
  { id: "89", name: "Shirin Mahmudjanova" },
  { id: "90", name: "Dinora Maksudova" },
  { id: "91", name: "Mohinabonu Maksudova" },
  { id: "92", name: "Abrorbek Mammadiyev" },
  { id: "93", name: "Amirxon Matyakobov" },
  { id: "94", name: "Abdulaziz Maxamadjonov" },
  { id: "95", name: "Mirziyod Mirg'iyozov" },
  { id: "96", name: "Ulug`bek Mirhosilov" },
  { id: "97", name: "Rayya Mirsoatova" },
  { id: "98", name: "Mohira Mirzaahmadova" },
  { id: "99", name: "Amirbek Mirzajanov" },
  { id: "100", name: "Suhrob Mirzakulov" },
  { id: "101", name: "Abdurahmon Muhamedov" },
  { id: "102", name: "Munisbek Muhammadov" },
  { id: "103", name: "Shaxriyor Muhammadov" },
  { id: "104", name: "Turg`unov Muhammadzohid" },
  { id: "105", name: "Nizomiddin Mukhitdinov" },
  { id: "106", name: "Abdulboriy Muradjonov" },
  { id: "107", name: "Xasanboy Murodilov" },
  { id: "108", name: "Safiya Murodilova" },
  { id: "109", name: "Ibrohim Murodjonov" },
  { id: "110", name: "Hasanboy Murodov" },
  { id: "111", name: "Akbarjon Murodqosimov" },
  { id: "112", name: "Kamronbek Mustofokulov" },
  { id: "113", name: "Najmitdin Muxitdinov" },
  { id: "114", name: "Abdulloh Nabiyev" },
  { id: "115", name: "Asma Nabiyeva" },
  { id: "116", name: "Abrorjon Namozov" },
  { id: "117", name: "Madinabonu Nasriddinova" },
  { id: "118", name: "Madinabonu Nasritdinova" },
  { id: "119", name: "Aziz Nazarov" },
  { id: "120", name: "Iymona Nazarova" },
  { id: "121", name: "Mohichehra Ne'matillayeva" },
  { id: "122", name: "Mohir Niyozov" },
  { id: "123", name: "Ezoza Nizomova" },
  { id: "124", name: "Asilbek Nomozov" },
  { id: "125", name: "Diyorbek Nomozov" },
  { id: "126", name: "Asilbek Normatov" },
  { id: "127", name: "Jamshid Normuhammedov" },
  { id: "128", name: "Ayubhon Nurmuhammadov" },
  { id: "129", name: "Bobur Omonov" },
  { id: "130", name: "Mehrangiz Pirmatova" },
  { id: "131", name: "Mohinur Po'latboyeva" },
  { id: "132", name: "Ibroxim Po'latov" },
  { id: "133", name: "Ibrohim Pulatov" },
  { id: "134", name: "Ruqiya Pulatova" },
  { id: "135", name: "Husniddin Qironov" },
  { id: "136", name: "Shodmon Qodirov" },
  { id: "137", name: "Shuhrat Qodirov" },
  { id: "138", name: "Shaxriyor Qudratullayev" },
  { id: "139", name: "Asliddin Rahmatov" },
  { id: "140", name: "Maryamjon Raimova" },
  { id: "141", name: "Diyorbek Rashidov" },
  { id: "142", name: "Ibroxim Raupov" },
  { id: "143", name: "Rustam Rayimberdiyev" },
  { id: "144", name: "Abdullox Rustamov" },
  { id: "145", name: "Umarjon Rustamov" },
  { id: "146", name: "Muhammadsulton Ruziboyev" },
  { id: "147", name: "Qahramon Sa'dullayev" },
  { id: "148", name: "Umar Sadriddinov" },
  { id: "149", name: "Abdujabbor Sahiyev" },
  { id: "150", name: "Maftuna Saidazimova" },
  { id: "151", name: "Navruza Shamsiddinova" },
  { id: "152", name: "Shamshod Shavkatov" },
  { id: "153", name: "Yahyo Shavkatov" },
  { id: "154", name: "Nurmuxammatova Shaxzoda" },
  { id: "155", name: "Abubakr Shermamatov" },
  { id: "156", name: "Usmon Shomirzayev" },
  { id: "157", name: "Omina Shorahimova" },
  { id: "158", name: "Hadicha Shoyusufova" },
  { id: "159", name: "Firdavs Shuhratillayev" },
  { id: "160", name: "Soliha Shuxratova" },
  { id: "161", name: "Xondamir Siddiqov" },
  { id: "162", name: "Behruz Sodiqov" },
  { id: "163", name: "Javlonbek Sulaymonkulov" },
  { id: "164", name: "Asliddin Sulaymonqulov" },
  { id: "165", name: "Muslima Suleymanova" },
  { id: "166", name: "Madina Sultonkhodjayeva" },
  { id: "167", name: "Temur Tashniyozov" },
  { id: "168", name: "Abdulloh Tohirjonov" },
  { id: "169", name: "Muhiddin Tohirov" },
  { id: "170", name: "Sultonmurod Tojiboyev" },
  { id: "171", name: "Ibrohim Tolibboyev" },
  { id: "172", name: "Shohruh Tolibjonov" },
  { id: "173", name: "Akobirxon Tolibxonov" },
  { id: "174", name: "Gulsevar Toshtemirova" },
  { id: "175", name: "Begzod Toxirov" },
  { id: "176", name: "Saidxon Toxirxo'jayev" },
  { id: "177", name: "Muxammadamin Tulkinov" },
  { id: "178", name: "Begzod Turdiyev" },
  { id: "179", name: "Samir Turdiyev" },
  { id: "180", name: "Ravshan Ubaydullayev" },
  { id: "181", name: "Asadbek Ulug'bekov" },
  { id: "182", name: "Diyorbek Urozboev" },
  { id: "183", name: "Elyorbek Urozboev" },
  { id: "184", name: "Aziza Usmanova" },
  { id: "185", name: "Shohruz Vladimirov" },
  { id: "186", name: "Mamlakat Xakimova" },
  { id: "187", name: "Sevinch Xakimova" },
  { id: "188", name: "Xusanboy Xo'jamnazarov" },
  { id: "189", name: "Muxammadsaid Xolmirzayev" },
  { id: "190", name: "Xasanboy Xujamnazarov" },
  { id: "191", name: "Sardor Yarilkabov" },
  { id: "192", name: "Nurmahammedov Yaxyoxon" },
  { id: "193", name: "Ayaulim Yergasheva" },
  { id: "194", name: "Abdujabbor Yo'ldoshev" },
  { id: "195", name: "Hosilbek Yo'ldoshev" },
  { id: "196", name: "Muhammadnur Yusupov" },
  { id: "197", name: "Gulsevar Yusupova" },
  { id: "198", name: "Ulug'bek Zamirov" },
  { id: "199", name: "Abduraxmonova Zinnura" },
  { id: "200", name: "Asadbek Zohidov" },
  { id: "201", name: "Adham Zokirov" }
];

// Create a map for quick lookup
const userMap = new Map();
mockUsers.forEach(user => {
  userMap.set(user.id, user.name);
});

const updateActivitiesWithRealNames = async () => {
  try {
    console.log('🚀 Starting to update activities with real user names...');
    
    const activitiesCollection = collection(db, "activities_upl");
    const querySnapshot = await getDocs(activitiesCollection);
    
    console.log(`📊 Found ${querySnapshot.size} activities to update`);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const docSnapshot of querySnapshot.docs) {
      try {
        const data = docSnapshot.data();
        const updates: any = {};
        
        // Update host name if it's a user ID
        if (data.hostId && data.hostId.startsWith('user')) {
          const userId = data.hostId.replace('user', '');
          const realName = userMap.get(userId);
          if (realName) {
            updates.hostName = realName;
            console.log(`✅ Updated host ${data.hostId} to ${realName}`);
          }
        }
        
        // Update participants names if they are user objects with IDs
        if (data.participants && Array.isArray(data.participants)) {
          const updatedParticipants = data.participants.map((participant: any) => {
            if (typeof participant === 'object' && participant.id && participant.id.startsWith('user')) {
              const userId = participant.id.replace('user', '');
              const realName = userMap.get(userId);
              if (realName) {
                return {
                  ...participant,
                  name: realName
                };
              }
            }
            return participant;
          });
          updates.participants = updatedParticipants;
        }
        
        // Update approved participants names
        if (data.approvedParticipants && Array.isArray(data.approvedParticipants)) {
          const updatedApprovedParticipants = data.approvedParticipants.map((participant: any) => {
            if (typeof participant === 'object' && participant.id && participant.id.startsWith('user')) {
              const userId = participant.id.replace('user', '');
              const realName = userMap.get(userId);
              if (realName) {
                return {
                  ...participant,
                  name: realName
                };
              }
            }
            return participant;
          });
          updates.approvedParticipants = updatedApprovedParticipants;
        }
        
        // Only update if there are changes
        if (Object.keys(updates).length > 0) {
          await updateDoc(doc(activitiesCollection, docSnapshot.id), updates);
          updatedCount++;
          
          if (updatedCount % 20 === 0) {
            console.log(`✅ Updated ${updatedCount}/${querySnapshot.size} activities...`);
          }
        }
        
      } catch (updateError) {
        errorCount++;
        console.log(`❌ Failed to update activity ${docSnapshot.id}: ${updateError.message}`);
      }
    }
    
    console.log(`🎉 Update complete!`);
    console.log(`✅ Successfully updated: ${updatedCount} activities`);
    if (errorCount > 0) {
      console.log(`❌ Failed to update: ${errorCount} activities`);
    }
    
  } catch (error) {
    console.error("❌ Update failed:", error);
  }
};

updateActivitiesWithRealNames(); 