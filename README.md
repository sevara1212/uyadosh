# Muvr.u Mobile App 

A mobile-friendly web application for creating and joining fitness activities with like-minded individuals.

## Features

- **User Authentication**: Sign up, login, and profile management
- **Activity Creation**: Create fitness activities with details like location, time, and capacity
- **Activity Discovery**: Browse and search for activities by sport type
- **Social Interaction**: Join activities and see other participants
- **Location Sharing**: Share activity locations with links to maps

## Tech Stack

- React with TypeScript
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS for styling
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/fit-tribe-mobile-hub.git
cd fit-tribe-mobile-hub
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up Firebase
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Add your Firebase configuration in `src/lib/firebase.config.ts`

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Deployment

The application can be deployed to Firebase Hosting:

```bash
npm run build
firebase deploy
```

## License

[MIT](LICENSE)
