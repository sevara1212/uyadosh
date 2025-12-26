# Firebase Data Upload Guide for Muvr App

This guide shows you different ways to put activity data into Firebase for your Muvr app.

## 🚀 Quick Start: Upload Your Existing Data

You have a comprehensive `data.ts` file with 200+ users and multiple activities. To upload this data to Firebase:

```bash
npm run upload-data
```

This will:
- Clear existing data (optional - you can comment this out)
- Upload all 200+ users from `mockUsers`
- Upload all activities from `mockRooms`
- Convert the data format to work with Firebase

## 📊 What Data Gets Uploaded

### Users Collection
- 200+ user profiles with names, avatars, interests
- Activity levels (Beginner, Intermediate, Advanced)
- Sport interests (Running, Yoga, Cycling, etc.)
- Gender and bio information

### Rooms Collection (Activities)
- Football matches in Tashkent
- Various sport activities with locations
- Participant lists and approval status
- Pricing and descriptions

## 🔧 Other Ways to Add Data to Firebase

### 1. Using the App Interface
Users can create activities through your app:
- Go to "Create Activity" page
- Fill in activity details
- Data automatically saves to Firebase

### 2. Programmatically Adding Data
You can add data directly in your code:

```typescript
import { db, roomsCollection } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

// Add a single activity
const addActivity = async () => {
  const activityData = {
    title: "Morning Yoga Session",
    sportType: "Yoga",
    hostId: "user123",
    location: {
      address: "Central Park",
      city: "Tashkent",
      lat: 41.364559,
      lng: 69.294178
    },
    dateTime: "2025-01-20T08:00:00",
    duration: 60,
    maxParticipants: 15,
    participants: ["user123"],
    approvedParticipants: ["user123"],
    pendingRequests: [],
    description: "Relaxing morning yoga session",
    price: 0,
    createdAt: new Date()
  };

  await setDoc(doc(roomsCollection, "activity123"), activityData);
};
```

### 3. Using Firebase Console
- Go to [Firebase Console](https://console.firebase.google.com)
- Select your project
- Go to Firestore Database
- Click "Start collection" or add documents manually

### 4. Using the Setup Script
Run the existing setup script for sample data:
```bash
npm run setup-db
```

## 📁 File Structure

```
src/
├── data/
│   └── Data.ts              # Your mock data
├── scripts/
│   ├── upload-data-to-firebase.ts    # Upload your data
│   ├── setup-firebase-database.ts    # Sample data setup
│   └── init-firebase-data.ts         # Initial data setup
└── lib/
    └── firebase.ts          # Firebase configuration
```

## 🔍 Data Structure

### User Document
```typescript
{
  name: string,
  avatar: string,
  interests: SportType[],
  activityLevel: ActivityLevel,
  joinedDate: string,
  bio: string,
  gender: Gender,
  joinedRooms: string[],
  pendingRequests: string[]
}
```

### Room/Activity Document
```typescript
{
  title: string,
  sportType: SportType,
  hostId: string,
  location: {
    address: string,
    city: string,
    lat: number,
    lng: number
  },
  dateTime: string,
  duration: number,
  maxParticipants: number,
  participants: string[],
  approvedParticipants: string[],
  pendingRequests: string[],
  description: string,
  price: number,
  createdAt: Timestamp
}
```

## ⚠️ Important Notes

1. **Backup First**: The upload script clears existing data. Make sure to backup if needed.

2. **Firebase Rules**: Ensure your Firestore security rules allow write access.

3. **Rate Limits**: Firebase has rate limits. For large datasets, consider batching.

4. **Data Validation**: The script includes basic data validation and conversion.

## 🛠️ Customization

You can modify the upload script to:
- Skip clearing existing data
- Add more data validation
- Upload additional collections
- Add indexes for better querying

## 📈 Next Steps

After uploading data:
1. Test your app with real data
2. Add Firebase indexes for better performance
3. Set up proper security rules
4. Monitor usage in Firebase Console

## 🆘 Troubleshooting

### Common Issues:
- **Permission Denied**: Check Firebase security rules
- **Rate Limit Exceeded**: Add delays between operations
- **Data Format Errors**: Check the data structure matches your types

### Getting Help:
- Check Firebase Console for errors
- Review the script logs for specific issues
- Ensure your Firebase config is correct 