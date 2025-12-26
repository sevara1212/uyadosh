import { ActivityLevel, Room, SportType, User, Gender } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Xonazimxon A'zamova",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    interests: [SportType.Running, SportType.Football, SportType.Tennis],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-24",
    bio: "Fitness enthusiast with interest in Running, Football, Tennis.",
    gender: Gender.Female
  },
  {
    id: "2",
    name: "Hojiakbar Abdug'offorov",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    interests: [SportType.Yoga, SportType.Cycling, SportType.Football],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-18",
    bio: "Active lifestyle seeker with interest in Yoga, Cycling, Football.",
    gender: Gender.Male
  },
  {
    id: "3",
    name: "Hojiakbar Abdugafforov",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    interests: [SportType.Cycling, SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-16",
    bio: "Loves sports with interest in Cycling, Yoga.",
    gender: Gender.Male
  },
  {
    id: "4",
    name: "Humoyun Abduhalilov",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    interests: [SportType.Running, SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-09",
    bio: "Active lifestyle seeker with interest in Running, Football.",
    gender: Gender.Male
  },
  {
    id: "5",
    name: "Abdurahmon Abduhamidov",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-18",
    bio: "Active lifestyle seeker with interest in Yoga.",
    gender: Gender.Male
  },
  {
    id: "6",
    name: "Fazliddin Abduholiqov",
    avatar: "https://randomuser.me/api/portraits/women/80.jpg",
    interests: [SportType.Running],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-04",
    bio: "Fitness enthusiast with interest in Running.",
    gender: Gender.Female
  },
  {
    id: "7",
    name: "Abdusalim Abdukarimov",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    interests: [SportType.Swimming, SportType.Cycling, SportType.Tennis],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-11",
    bio: "Fitness enthusiast with interest in Swimming, Cycling, Tennis.",
    gender: Gender.Male
  },
  {
    id: "8",
    name: "Maftuna Abdukhakimova",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    interests: [SportType.Basketball, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-10",
    bio: "Fitness enthusiast with interest in Basketball, Yoga.",
    gender: Gender.Female
  },
  {
    id: "9",
    name: "Shukrullo Abdulkhakimov",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    interests: [SportType.Cycling],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-03",
    bio: "Loves sports with interest in Cycling.",
    gender: Gender.Male
  },
  {
    id: "10",
    name: "Ismoil Abdullayev",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    interests: [SportType.Swimming],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-08",
    bio: "Fitness enthusiast with interest in Swimming.",
    gender: Gender.Female
  },
  {
    id: "11",
    name: "Muhammadamin Abdullayev",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    interests: [SportType.Running],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-03",
    bio: "Loves sports with interest in Running.",
    gender: Gender.Male
  },
  {
    id: "12",
    name: "Rustambek Abdullayev",
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    interests: [SportType.Cycling, SportType.Basketball, SportType.Gym],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-24",
    bio: "Active lifestyle seeker with interest in Cycling, Basketball, Gym.",
    gender: Gender.Female
  },
  {
    id: "13",
    name: "Sirojiddin Abdullayev",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    interests: [SportType.Swimming, SportType.Basketball],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-02",
    bio: "Loves sports with interest in Swimming, Basketball.",
    gender: Gender.Female
  },
  {
    id: "14",
    name: "Abdujalil Abdumajidov",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    interests: [SportType.Cycling],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-28",
    bio: "Active lifestyle seeker with interest in Cycling.",
    gender: Gender.Female
  },
  {
    id: "15",
    name: "Aziz Abduqodirov",
    avatar: "https://randomuser.me/api/portraits/women/70.jpg",
    interests: [SportType.Football, SportType.Gym],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-08",
    bio: "Loves sports with interest in Football, Gym.",
    gender: Gender.Female
  },
  {
    id: "16",
    name: "Muhabbatxon Abdurahimova",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    interests: [SportType.Running],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-16",
    bio: "Active lifestyle seeker with interest in Running.",
    gender: Gender.Female
  },
  {
    id: "17",
    name: "Mubina Abdurahmanova",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    interests: [SportType.Yoga, SportType.Football, SportType.Gym],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-31",
    bio: "Loves sports with interest in Yoga, Football, Gym.",
    gender: Gender.Female
  },
  {
    id: "18",
    name: "Muhammadrizo Abduraimov",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    interests: [SportType.Tennis, SportType.Cycling],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-09",
    bio: "Fitness enthusiast with interest in Tennis, Cycling.",
    gender: Gender.Male
  },
  {
    id: "19",
    name: "Abror Abdurashidov",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    interests: [SportType.Basketball, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-17",
    bio: "Active lifestyle seeker with interest in Basketball, Yoga.",
    gender: Gender.Male
  },
  {
    id: "20",
    name: "Abubakr Abduraximov",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    interests: [SportType.Football, SportType.Gym, SportType.Running],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-17",
    bio: "Loves sports with interest in Football, Gym, Running.",
    gender: Gender.Female
  },
  {
    id: "21",
    name: "Abdulloh Abdurazzoqov",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    interests: [SportType.Tennis, SportType.Cycling],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-13",
    bio: "Loves sports with interest in Tennis, Cycling.",
    gender: Gender.Male
  },
  {
    id: "22",
    name: "Muxammadjon Abduvohidov",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    interests: [SportType.Yoga, SportType.Gym, SportType.Cycling],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-08",
    bio: "Fitness enthusiast with interest in Yoga, Gym, Cycling.",
    gender: Gender.Female
  },
  {
    id: "23",
    name: "Dilnoza Abduvohidova",
    avatar: "https://randomuser.me/api/portraits/women/76.jpg",
    interests: [SportType.Swimming],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-02",
    bio: "Fitness enthusiast with interest in Swimming.",
    gender: Gender.Female
  },
  {
    id: "24",
    name: "AHMADXO'JA Abrorhajaev",
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
    interests: [SportType.Swimming, SportType.Tennis],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-13",
    bio: "Loves sports with interest in Swimming, Tennis.",
    gender: Gender.Male
  },
  {
    id: "25",
    name: "Asilbek Adilov",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    interests: [SportType.Basketball, SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-13",
    bio: "Loves sports with interest in Basketball, Football.",
    gender: Gender.Male
  },
  {
    id: "26",
    name: "Dilnoza Ahmadova",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
    interests: [SportType.Swimming],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-08",
    bio: "Loves sports with interest in Swimming.",
    gender: Gender.Female
  },
  {
    id: "27",
    name: "Abdulaziz Ahmedov",
    avatar: "https://randomuser.me/api/portraits/men/61.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-10",
    bio: "Fitness enthusiast with interest in Yoga.",
    gender: Gender.Male
  },
  {
    id: "28",
    name: "Nursaid Akbarov",
    avatar: "https://randomuser.me/api/portraits/women/89.jpg",
    interests: [SportType.Tennis, SportType.Gym, SportType.Cycling],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-02",
    bio: "Loves sports with interest in Tennis, Gym, Cycling.",
    gender: Gender.Female
  },
  {
    id: "29",
    name: "Mubina Akbarova",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    interests: [SportType.Cycling, SportType.Tennis],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-19",
    bio: "Fitness enthusiast with interest in Cycling, Tennis.",
    gender: Gender.Female
  },
  {
    id: "30",
    name: "Oysha Akbarova",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    interests: [SportType.Swimming, SportType.Gym, SportType.Cycling],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-28",
    bio: "Active lifestyle seeker with interest in Swimming, Gym, Cycling.",
    gender: Gender.Female
  },
  {
    id: "31",
    name: "Saidolimxon Akmalxonov",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    interests: [SportType.Football, SportType.Tennis],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-04",
    bio: "Fitness enthusiast with interest in Football, Tennis.",
    gender: Gender.Female
  },
  {
    id: "32",
    name: "Muhammadaziz Akramov",
    avatar: "https://randomuser.me/api/portraits/women/85.jpg",
    interests: [SportType.Football],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-09",
    bio: "Active lifestyle seeker with interest in Football.",
    gender: Gender.Female
  },
  {
    id: "33",
    name: "Humoyun Alijonov",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    interests: [SportType.Cycling, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-11",
    bio: "Fitness enthusiast with interest in Cycling, Yoga.",
    gender: Gender.Male
  },
  {
    id: "34",
    name: "Ozodbek Amirov",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    interests: [SportType.Gym],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-31",
    bio: "Fitness enthusiast with interest in Gym.",
    gender: Gender.Male
  },
  {
    id: "35",
    name: "Muhammaddiyor Anvarov",
    avatar: "https://randomuser.me/api/portraits/men/27.jpg",
    interests: [SportType.Basketball],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-28",
    bio: "Active lifestyle seeker with interest in Basketball.",
    gender: Gender.Male
  },
  {
    id: "36",
    name: "Xadicha Artikbaeva",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    interests: [SportType.Cycling, SportType.Football, SportType.Gym],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-09",
    bio: "Loves sports with interest in Cycling, Football, Gym.",
    gender: Gender.Female
  },
  {
    id: "37",
    name: "Rasulbek Artikboyev",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    interests: [SportType.Running, SportType.Basketball],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-08",
    bio: "Loves sports with interest in Running, Basketball.",
    gender: Gender.Female
  },
  {
    id: "38",
    name: "Muhhamedov Asilbek",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
    interests: [SportType.Basketball, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-15",
    bio: "Fitness enthusiast with interest in Basketball, Yoga.",
    gender: Gender.Male
  },
  {
    id: "39",
    name: "Abbos Athamjonov",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    interests: [SportType.Cycling, SportType.Running],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-03",
    bio: "Fitness enthusiast with interest in Cycling, Running.",
    gender: Gender.Female
  },
  {
    id: "40",
    name: "Gavharoy Avbakirova",
    avatar: "https://randomuser.me/api/portraits/men/34.jpg",
    interests: [SportType.Gym, SportType.Basketball],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-05",
    bio: "Fitness enthusiast with interest in Gym, Basketball.",
    gender: Gender.Male
  },
  {
    id: "41",
    name: "Ismoil Axrorjonov",
    avatar: "https://randomuser.me/api/portraits/men/37.jpg",
    interests: [SportType.Basketball, SportType.Football],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-26",
    bio: "Fitness enthusiast with interest in Basketball, Football.",
    gender: Gender.Male
  },
  {
    id: "42",
    name: "Odina Axrorova",
    avatar: "https://randomuser.me/api/portraits/men/56.jpg",
    interests: [SportType.Football, SportType.Swimming, SportType.Running],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-20",
    bio: "Loves sports with interest in Football, Swimming, Running.",
    gender: Gender.Female
  },
  {
    id: "43",
    name: "Abubakir Azambekov",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    interests: [SportType.Yoga, SportType.Gym],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-16",
    bio: "Fitness enthusiast with interest in Yoga, Gym.",
    gender: Gender.Female
  },
  {
    id: "44",
    name: "Hasanjon Azamjonov",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    interests: [SportType.Basketball],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-22",
    bio: "Fitness enthusiast with interest in Basketball.",
    gender: Gender.Female
  },
  {
    id: "45",
    name: "Husanjon Azamjonov",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    interests: [SportType.Cycling, SportType.Yoga],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-23",
    bio: "Fitness enthusiast with interest in Cycling, Yoga.",
    gender: Gender.Female
  },
  {
    id: "46",
    name: "Firdavs Bahodirov",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    interests: [SportType.Cycling],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-05",
    bio: "Active lifestyle seeker with interest in Cycling.",
    gender: Gender.Male
  },
  {
    id: "47",
    name: "Ozodbek Bahromov",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    interests: [SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-04",
    bio: "Active lifestyle seeker with interest in Football.",
    gender: Gender.Female
  },
  {
    id: "48",
    name: "Xumoyun Bahtiyorov",
    avatar: "https://randomuser.me/api/portraits/men/80.jpg",
    interests: [SportType.Swimming, SportType.Football, SportType.Running],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-05",
    bio: "Active lifestyle seeker with interest in Swimming, Football, Running.",
    gender: Gender.Male
  },
  {
    id: "49",
    name: "Bilol Bakhrillaev",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    interests: [SportType.Basketball, SportType.Football, SportType.Swimming],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-14",
    bio: "Active lifestyle seeker with interest in Basketball, Football, Swimming.",
    gender: Gender.Female
  },
  {
    id: "50",
    name: "Begzod Baxodirov",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    interests: [SportType.Swimming, SportType.Football, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-17",
    bio: "Active lifestyle seeker with interest in Swimming, Football, Yoga.",
    gender: Gender.Female
  },
  {
    id: "51",
    name: "Firdavs Baxodirov",
    avatar: "https://randomuser.me/api/portraits/men/93.jpg",
    interests: [SportType.Cycling, SportType.Swimming, SportType.Gym],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-06",
    bio: "Fitness enthusiast with interest in Cycling, Swimming, Gym.",
    gender: Gender.Male
  },
  {
    id: "52",
    name: "Iskandar Baxtiyorjonov",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    interests: [SportType.Tennis],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-10",
    bio: "Fitness enthusiast with interest in Tennis.",
    gender: Gender.Female
  },
  {
    id: "53",
    name: "Mardon Baxtiyorov",
    avatar: "https://randomuser.me/api/portraits/men/79.jpg",
    interests: [SportType.Yoga, SportType.Football, SportType.Gym],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-07",
    bio: "Active lifestyle seeker with interest in Yoga, Football, Gym.",
    gender: Gender.Male
  },
  {
    id: "54",
    name: "Mustafo Baxtiyorov",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    interests: [SportType.Football, SportType.Running, SportType.Swimming],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-18",
    bio: "Active lifestyle seeker with interest in Football, Running, Swimming.",
    gender: Gender.Female
  },
  {
    id: "55",
    name: "Nurbekjon Bobonqulov",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    interests: [SportType.Swimming],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-14",
    bio: "Fitness enthusiast with interest in Swimming.",
    gender: Gender.Female
  },
  {
    id: "56",
    name: "Lola Bunyadova",
    avatar: "https://randomuser.me/api/portraits/women/39.jpg",
    interests: [SportType.Yoga, SportType.Tennis],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-30",
    bio: "Loves sports with interest in Yoga, Tennis.",
    gender: Gender.Female
  },
  {
    id: "57",
    name: "Nozimxo'ja Burxonxo'jayev",
    avatar: "https://randomuser.me/api/portraits/women/97.jpg",
    interests: [SportType.Gym, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-26",
    bio: "Fitness enthusiast with interest in Gym, Yoga.",
    gender: Gender.Female
  },
  {
    id: "58",
    name: "Muslima Chanoyeva",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-28",
    bio: "Active lifestyle seeker with interest in Yoga.",
    gender: Gender.Female
  },
  {
    id: "59",
    name: "Akbar Daminov",
    avatar: "https://randomuser.me/api/portraits/women/98.jpg",
    interests: [SportType.Basketball],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-01",
    bio: "Loves sports with interest in Basketball.",
    gender: Gender.Female
  },
  {
    id: "60",
    name: "Nozima Doniyorova",
    avatar: "https://randomuser.me/api/portraits/women/83.jpg",
    interests: [SportType.Swimming, SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-01",
    bio: "Active lifestyle seeker with interest in Swimming, Yoga.",
    gender: Gender.Female
  },
  {
    id: "61",
    name: "Abror Egamberdiyev",
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-04",
    bio: "Active lifestyle seeker with interest in Yoga.",
    gender: Gender.Female
  },
  {
    id: "62",
    name: "Behruzbek Ergashev",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    interests: [SportType.Football, SportType.Running],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-05",
    bio: "Active lifestyle seeker with interest in Football, Running.",
    gender: Gender.Male
  },
  {
    id: "63",
    name: "Robiya Erkinova",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    interests: [SportType.Cycling, SportType.Tennis],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-06",
    bio: "Active lifestyle seeker with interest in Cycling, Tennis.",
    gender: Gender.Female
  },
  {
    id: "64",
    name: "Muhammadaziz Faxriddinov",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    interests: [SportType.Gym, SportType.Basketball],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-19",
    bio: "Loves sports with interest in Gym, Basketball.",
    gender: Gender.Male
  },
  {
    id: "65",
    name: "Abbos G'ofurov",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    interests: [SportType.Basketball, SportType.Running, SportType.Yoga],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-23",
    bio: "Active lifestyle seeker with interest in Basketball, Running, Yoga.",
    gender: Gender.Female
  },
  {
    id: "66",
    name: "Azizjon G'opporov",
    avatar: "https://randomuser.me/api/portraits/men/38.jpg",
    interests: [SportType.Swimming, SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-01",
    bio: "Loves sports with interest in Swimming, Football.",
    gender: Gender.Male
  },
  {
    id: "67",
    name: "Kamron Gulomov",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    interests: [SportType.Tennis, SportType.Gym],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-09",
    bio: "Loves sports with interest in Tennis, Gym.",
    gender: Gender.Male
  },
  {
    id: "68",
    name: "Dilnavoz Gulomqodirova",
    avatar: "https://randomuser.me/api/portraits/women/70.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-04",
    bio: "Loves sports with interest in Yoga.",
    gender: Gender.Female
  },
  {
    id: "69",
    name: "Abdurashid Habibulaev",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    interests: [SportType.Basketball, SportType.Gym],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-08",
    bio: "Fitness enthusiast with interest in Basketball, Gym.",
    gender: Gender.Female
  },
  {
    id: "70",
    name: "Abdullox Hosiyatov",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    interests: [SportType.Football, SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-29",
    bio: "Loves sports with interest in Football, Yoga.",
    gender: Gender.Male
  },
  {
    id: "71",
    name: "Xojarxon Ibaydullayeva",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    interests: [SportType.Basketball, SportType.Tennis, SportType.Swimming],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-13",
    bio: "Loves sports with interest in Basketball, Tennis, Swimming.",
    gender: Gender.Female
  },
  {
    id: "72",
    name: "Abdurauf Isakov",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    interests: [SportType.Yoga, SportType.Gym],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-03",
    bio: "Loves sports with interest in Yoga, Gym.",
    gender: Gender.Female
  },
  {
    id: "73",
    name: "Jahongir Iskandarov",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    interests: [SportType.Gym, SportType.Cycling, SportType.Tennis],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-06",
    bio: "Fitness enthusiast with interest in Gym, Cycling, Tennis.",
    gender: Gender.Female
  },
  {
    id: "74",
    name: "Samandar Ismailov",
    avatar: "https://randomuser.me/api/portraits/women/97.jpg",
    interests: [SportType.Yoga, SportType.Gym, SportType.Tennis],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-30",
    bio: "Active lifestyle seeker with interest in Yoga, Gym, Tennis.",
    gender: Gender.Female
  },
  {
    id: "75",
    name: "Kozimjon Isomov",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    interests: [SportType.Tennis, SportType.Football, SportType.Gym],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-17",
    bio: "Active lifestyle seeker with interest in Tennis, Football, Gym.",
    gender: Gender.Male
  },
  {
    id: "76",
    name: "Ulug`bek Istamov",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    interests: [SportType.Basketball, SportType.Football, SportType.Gym],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-18",
    bio: "Active lifestyle seeker with interest in Basketball, Football, Gym.",
    gender: Gender.Male
  },
  {
    id: "77",
    name: "Yasmina Jahongirova",
    avatar: "https://randomuser.me/api/portraits/men/83.jpg",
    interests: [SportType.Tennis, SportType.Basketball],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-16",
    bio: "Loves sports with interest in Tennis, Basketball.",
    gender: Gender.Female
  },
  {
    id: "78",
    name: "Shohjahon Jumanazarov",
    avatar: "https://randomuser.me/api/portraits/women/70.jpg",
    interests: [SportType.Football],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-13",
    bio: "Loves sports with interest in Football.",
    gender: Gender.Female
  },
  {
    id: "79",
    name: "Abdurahim Juramurodov",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    interests: [SportType.Basketball, SportType.Yoga, SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-28",
    bio: "Fitness enthusiast with interest in Basketball, Yoga, Football.",
    gender: Gender.Female
  },
  {
    id: "80",
    name: "Asal Khojiyeva",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    interests: [SportType.Cycling, SportType.Basketball, SportType.Tennis],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-25",
    bio: "Fitness enthusiast with interest in Cycling, Basketball, Tennis.",
    gender: Gender.Female
  },
  {
    id: "81",
    name: "Visola Kholmukhamedova",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    interests: [SportType.Tennis, SportType.Yoga],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-01",
    bio: "Loves sports with interest in Tennis, Yoga.",
    gender: Gender.Female
  },
  {
    id: "82",
    name: "Husniddin Kironov",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    interests: [SportType.Yoga, SportType.Cycling],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-24",
    bio: "Loves sports with interest in Yoga, Cycling.",
    gender: Gender.Male
  },
  {
    id: "83",
    name: "Abdulloh Komiljonov",
    avatar: "https://randomuser.me/api/portraits/women/70.jpg",
    interests: [SportType.Yoga, SportType.Swimming, SportType.Basketball],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-05",
    bio: "Active lifestyle seeker with interest in Yoga, Swimming, Basketball.",
    gender: Gender.Female
  },
  {
    id: "84",
    name: "Abdulloh Komilov",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    interests: [SportType.Cycling],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-22",
    bio: "Fitness enthusiast with interest in Cycling.",
    gender: Gender.Female
  },
  {
    id: "85",
    name: "Elyor Komilov",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    interests: [SportType.Tennis, SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-07",
    bio: "Fitness enthusiast with interest in Tennis, Football.",
    gender: Gender.Male
  },
  {
    id: "86",
    name: "Shoxruz Kukanboyev",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    interests: [SportType.Gym, SportType.Football],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-17",
    bio: "Fitness enthusiast with interest in Gym, Football.",
    gender: Gender.Female
  },
  {
    id: "87",
    name: "Doniyor Kuziyev",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    interests: [SportType.Football, SportType.Cycling, SportType.Gym],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-04",
    bio: "Fitness enthusiast with interest in Football, Cycling, Gym.",
    gender: Gender.Male
  },
  {
    id: "88",
    name: "Omadjon Latibjonov",
    avatar: "https://randomuser.me/api/portraits/men/63.jpg",
    interests: [SportType.Basketball, SportType.Tennis],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-08",
    bio: "Loves sports with interest in Basketball, Tennis.",
    gender: Gender.Male
  },
  {
    id: "89",
    name: "Shirin Mahmudjanova",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    interests: [SportType.Swimming, SportType.Cycling],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-16",
    bio: "Fitness enthusiast with interest in Swimming, Cycling.",
    gender: Gender.Female
  },
  {
    id: "90",
    name: "Dinora Maksudova",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    interests: [SportType.Cycling],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-02",
    bio: "Loves sports with interest in Cycling.",
    gender: Gender.Female
  },
  {
    id: "91",
    name: "Mohinabonu Maksudova",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    interests: [SportType.Gym, SportType.Cycling],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-17",
    bio: "Active lifestyle seeker with interest in Gym, Cycling.",
    gender: Gender.Female
  },
  {
    id: "92",
    name: "Abrorbek Mammadiyev",
    avatar: "https://randomuser.me/api/portraits/women/59.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-24",
    bio: "Active lifestyle seeker with interest in Yoga.",
    gender: Gender.Female
  },
  {
    id: "93",
    name: "Amirxon Matyakobov",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-10",
    bio: "Active lifestyle seeker with interest in Yoga.",
    gender: Gender.Female
  },
  {
    id: "94",
    name: "Abdulaziz Maxamadjonov",
    avatar: "https://randomuser.me/api/portraits/women/69.jpg",
    interests: [SportType.Football, SportType.Running],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-16",
    bio: "Fitness enthusiast with interest in Football, Running.",
    gender: Gender.Female
  },
  {
    id: "95",
    name: "Mirziyod Mirg'iyozov",
    avatar: "https://randomuser.me/api/portraits/women/94.jpg",
    interests: [SportType.Gym, SportType.Running],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-26",
    bio: "Loves sports with interest in Gym, Running.",
    gender: Gender.Female
  },
  {
    id: "96",
    name: "Ulug`bek Mirhosilov",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    interests: [SportType.Swimming, SportType.Yoga],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-28",
    bio: "Fitness enthusiast with interest in Swimming, Yoga.",
    gender: Gender.Female
  },
  {
    id: "97",
    name: "Rayya Mirsoatova",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    interests: [SportType.Swimming],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-21",
    bio: "Loves sports with interest in Swimming.",
    gender: Gender.Female
  },
  {
    id: "98",
    name: "Mohira Mirzaahmadova",
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    interests: [SportType.Swimming, SportType.Football, SportType.Cycling],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-06",
    bio: "Active lifestyle seeker with interest in Swimming, Football, Cycling.",
    gender: Gender.Female
  },
  {
    id: "99",
    name: "Amirbek Mirzajanov",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    interests: [SportType.Tennis],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-15",
    bio: "Loves sports with interest in Tennis.",
    gender: Gender.Female
  },
  {
    id: "100",
    name: "Suhrob Mirzakulov",
    avatar: "https://randomuser.me/api/portraits/women/70.jpg",
    interests: [SportType.Basketball, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-10",
    bio: "Active lifestyle seeker with interest in Basketball, Yoga.",
    gender: Gender.Female
  },
  {
    id: "101",
    name: "Abdurahmon Muhamedov",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    interests: [SportType.Yoga, SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-08",
    bio: "Fitness enthusiast with interest in Yoga, Football.",
    gender: Gender.Female
  },
  {
    id: "102",
    name: "Munisbek Muhammadov",
    avatar: "https://randomuser.me/api/portraits/women/71.jpg",
    interests: [SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-25",
    bio: "Fitness enthusiast with interest in Football.",
    gender: Gender.Female
  },
  {
    id: "103",
    name: "Shaxriyor Muhammadov",
    avatar: "https://randomuser.me/api/portraits/men/84.jpg",
    interests: [SportType.Running],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-15",
    bio: "Loves sports with interest in Running.",
    gender: Gender.Male
  },
  {
    id: "104",
    name: "Turg`unov Muhammadzohid",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    interests: [SportType.Gym],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-26",
    bio: "Fitness enthusiast with interest in Gym.",
    gender: Gender.Female
  },
  {
    id: "105",
    name: "Nizomiddin Mukhitdinov",
    avatar: "https://randomuser.me/api/portraits/women/98.jpg",
    interests: [SportType.Tennis, SportType.Yoga, SportType.Running],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-22",
    bio: "Fitness enthusiast with interest in Tennis, Yoga, Running.",
    gender: Gender.Female
  },
  {
    id: "106",
    name: "Abdulboriy Muradjonov",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    interests: [SportType.Yoga, SportType.Football, SportType.Running],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-03",
    bio: "Active lifestyle seeker with interest in Yoga, Football, Running.",
    gender: Gender.Male
  },
  {
    id: "107",
    name: "Xasanboy Murodilov",
    avatar: "https://randomuser.me/api/portraits/men/38.jpg",
    interests: [SportType.Running],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-11",
    bio: "Fitness enthusiast with interest in Running.",
    gender: Gender.Male
  },
  {
    id: "108",
    name: "Safiya Murodilova",
    avatar: "https://randomuser.me/api/portraits/men/83.jpg",
    interests: [SportType.Running],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-25",
    bio: "Active lifestyle seeker with interest in Running.",
    gender: Gender.Female
  },
  {
    id: "109",
    name: "Ibrohim Murodjonov",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    interests: [SportType.Gym],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-04",
    bio: "Loves sports with interest in Gym.",
    gender: Gender.Male
  },
  {
    id: "110",
    name: "Hasanboy Murodov",
    avatar: "https://randomuser.me/api/portraits/men/90.jpg",
    interests: [SportType.Swimming, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-17",
    bio: "Loves sports with interest in Swimming, Yoga.",
    gender: Gender.Male
  },
  {
    id: "111",
    name: "Akbarjon Murodqosimov",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    interests: [SportType.Running, SportType.Swimming],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-15",
    bio: "Fitness enthusiast with interest in Running, Swimming.",
    gender: Gender.Female
  },
  {
    id: "112",
    name: "Kamronbek Mustofokulov",
    avatar: "https://randomuser.me/api/portraits/women/88.jpg",
    interests: [SportType.Gym, SportType.Swimming],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-05",
    bio: "Fitness enthusiast with interest in Gym, Swimming.",
    gender: Gender.Female
  },
  {
    id: "113",
    name: "Najmitdin Muxitdinov",
    avatar: "https://randomuser.me/api/portraits/women/69.jpg",
    interests: [SportType.Basketball, SportType.Football, SportType.Gym],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-19",
    bio: "Active lifestyle seeker with interest in Basketball, Football, Gym.",
    gender: Gender.Female
  },
  {
    id: "114",
    name: "Abdulloh Nabiyev",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
    interests: [SportType.Gym, SportType.Football, SportType.Cycling],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-13",
    bio: "Active lifestyle seeker with interest in Gym, Football, Cycling.",
    gender: Gender.Female
  },
  {
    id: "115",
    name: "Asma Nabiyeva",
    avatar: "https://randomuser.me/api/portraits/men/95.jpg",
    interests: [SportType.Swimming, SportType.Tennis],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-02",
    bio: "Fitness enthusiast with interest in Swimming, Tennis.",
    gender: Gender.Female
  },
  {
    id: "116",
    name: "Abrorjon Namozov",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
    interests: [SportType.Yoga, SportType.Swimming, SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-18",
    bio: "Fitness enthusiast with interest in Yoga, Swimming, Football.",
    gender: Gender.Male
  },
  {
    id: "117",
    name: "Madinabonu Nasriddinova",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-06",
    bio: "Fitness enthusiast with interest in Yoga.",
    gender: Gender.Female
  },
  {
    id: "118",
    name: "Madinabonu Nasritdinova",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    interests: [SportType.Tennis, SportType.Swimming],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-03",
    bio: "Active lifestyle seeker with interest in Tennis, Swimming.",
    gender: Gender.Female
  },
  {
    id: "119",
    name: "Aziz Nazarov",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg",
    interests: [SportType.Running, SportType.Football, SportType.Yoga],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-07",
    bio: "Fitness enthusiast with interest in Running, Football, Yoga.",
    gender: Gender.Male
  },
  {
    id: "120",
    name: "Iymona Nazarova",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    interests: [SportType.Basketball, SportType.Swimming],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-20",
    bio: "Fitness enthusiast with interest in Basketball, Swimming.",
    gender: Gender.Female
  },
  {
    id: "121",
    name: "Mohichehra Ne'matillayeva",
    avatar: "https://randomuser.me/api/portraits/women/91.jpg",
    interests: [SportType.Basketball, SportType.Gym, SportType.Tennis],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-08",
    bio: "Active lifestyle seeker with interest in Basketball, Gym, Tennis.",
    gender: Gender.Female
  },
  {
    id: "122",
    name: "Mohir Niyozov",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    interests: [SportType.Cycling, SportType.Gym, SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-09",
    bio: "Fitness enthusiast with interest in Cycling, Gym, Yoga.",
    gender: Gender.Male
  },
  {
    id: "123",
    name: "Ezoza Nizomova",
    avatar: "https://randomuser.me/api/portraits/men/16.jpg",
    interests: [SportType.Basketball],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-22",
    bio: "Loves sports with interest in Basketball.",
    gender: Gender.Male
  },
  {
    id: "124",
    name: "Asilbek Nomozov",
    avatar: "https://randomuser.me/api/portraits/men/81.jpg",
    interests: [SportType.Cycling, SportType.Yoga, SportType.Swimming],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-25",
    bio: "Loves sports with interest in Cycling, Yoga, Swimming.",
    gender: Gender.Female
  },
  {
    id: "125",
    name: "Diyorbek Nomozov",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    interests: [SportType.Running, SportType.Football],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-18",
    bio: "Fitness enthusiast with interest in Running, Football.",
    gender: Gender.Female
  },
  {
    id: "126",
    name: "Asilbek Normatov",
    avatar: "https://randomuser.me/api/portraits/women/94.jpg",
    interests: [SportType.Swimming, SportType.Basketball],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-02",
    bio: "Active lifestyle seeker with interest in Swimming, Basketball.",
    gender: Gender.Female
  },
  {
    id: "127",
    name: "Jamshid Normuhammedov",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    interests: [SportType.Gym, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-08",
    bio: "Loves sports with interest in Gym, Yoga.",
    gender: Gender.Female
  },
  {
    id: "128",
    name: "Ayubhon Nurmuhammadov",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    interests: [SportType.Gym, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-31",
    bio: "Active lifestyle seeker with interest in Gym, Yoga.",
    gender: Gender.Female
  },
  {
    id: "129",
    name: "Bobur Omonov",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    interests: [SportType.Swimming],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-05",
    bio: "Active lifestyle seeker with interest in Swimming.",
    gender: Gender.Female
  },
  {
    id: "130",
    name: "Mehrangiz Pirmatova",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    interests: [SportType.Gym, SportType.Tennis, SportType.Football],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-15",
    bio: "Active lifestyle seeker with interest in Gym, Tennis, Football.",
    gender: Gender.Female
  },
  {
    id: "131",
    name: "Mohinur Po'latboyeva",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    interests: [SportType.Swimming, SportType.Yoga],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-06",
    bio: "Active lifestyle seeker with interest in Swimming, Yoga.",
    gender: Gender.Female
  },
  {
    id: "132",
    name: "Ibroxim Po'latov",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    interests: [SportType.Football],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-11",
    bio: "Fitness enthusiast with interest in Football.",
    gender: Gender.Male
  },
  {
    id: "133",
    name: "Ibrohim Pulatov",
    avatar: "https://randomuser.me/api/portraits/women/31.jpg",
    interests: [SportType.Yoga, SportType.Basketball],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-04",
    bio: "Loves sports with interest in Yoga, Basketball.",
    gender: Gender.Female
  },
  {
    id: "134",
    name: "Ruqiya Pulatova",
    avatar: "https://randomuser.me/api/portraits/women/87.jpg",
    interests: [SportType.Running, SportType.Gym, SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-10",
    bio: "Loves sports with interest in Running, Gym, Yoga.",
    gender: Gender.Female
  },
  {
    id: "135",
    name: "Husniddin Qironov",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    interests: [SportType.Tennis, SportType.Running],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-20",
    bio: "Loves sports with interest in Tennis, Running.",
    gender: Gender.Female
  },
  {
    id: "136",
    name: "Shodmon Qodirov",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    interests: [SportType.Basketball, SportType.Football, SportType.Swimming],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-03",
    bio: "Fitness enthusiast with interest in Basketball, Football, Swimming.",
    gender: Gender.Female
  },
  {
    id: "137",
    name: "Shuhrat Qodirov",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    interests: [SportType.Yoga, SportType.Cycling],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-04",
    bio: "Loves sports with interest in Yoga, Cycling.",
    gender: Gender.Female
  },
  {
    id: "138",
    name: "Shaxriyor Qudratullayev",
    avatar: "https://randomuser.me/api/portraits/women/18.jpg",
    interests: [SportType.Tennis],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-08",
    bio: "Loves sports with interest in Tennis.",
    gender: Gender.Female
  },
  {
    id: "139",
    name: "Asliddin Rahmatov",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    interests: [SportType.Basketball],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-15",
    bio: "Loves sports with interest in Basketball.",
    gender: Gender.Male
  },
  {
    id: "140",
    name: "Maryamjon Raimova",
    avatar: "https://randomuser.me/api/portraits/men/94.jpg",
    interests: [SportType.Tennis, SportType.Running, SportType.Cycling],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-09",
    bio: "Fitness enthusiast with interest in Tennis, Running, Cycling.",
    gender: Gender.Female
  },
  {
    id: "141",
    name: "Diyorbek Rashidov",
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    interests: [SportType.Swimming, SportType.Football, SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-05",
    bio: "Loves sports with interest in Swimming, Football, Yoga.",
    gender: Gender.Female
  },
  {
    id: "142",
    name: "Ibroxim Raupov",
    avatar: "https://randomuser.me/api/portraits/men/79.jpg",
    interests: [SportType.Running],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-17",
    bio: "Active lifestyle seeker with interest in Running.",
    gender: Gender.Male
  },
  {
    id: "143",
    name: "Rustam Rayimberdiyev",
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    interests: [SportType.Yoga, SportType.Swimming, SportType.Football],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-12",
    bio: "Fitness enthusiast with interest in Yoga, Swimming, Football.",
    gender: Gender.Male
  },
  {
    id: "144",
    name: "Abdullox Rustamov",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
    interests: [SportType.Football, SportType.Yoga, SportType.Tennis],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-09",
    bio: "Active lifestyle seeker with interest in Football, Yoga, Tennis.",
    gender: Gender.Female
  },
  {
    id: "145",
    name: "Umarjon Rustamov",
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    interests: [SportType.Gym],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-16",
    bio: "Fitness enthusiast with interest in Gym.",
    gender: Gender.Female
  },
  {
    id: "146",
    name: "Muhammadsulton Ruziboyev",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    interests: [SportType.Running],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-15",
    bio: "Active lifestyle seeker with interest in Running.",
    gender: Gender.Female
  },
  {
    id: "147",
    name: "Qahramon Sa'dullayev",
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    interests: [SportType.Basketball, SportType.Swimming, SportType.Yoga],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-23",
    bio: "Fitness enthusiast with interest in Basketball, Swimming, Yoga.",
    gender: Gender.Female
  },
  {
    id: "148",
    name: "Umar Sadriddinov",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    interests: [SportType.Tennis],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-27",
    bio: "Fitness enthusiast with interest in Tennis.",
    gender: Gender.Female
  },
  {
    id: "149",
    name: "Abdujabbor Sahiyev",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    interests: [SportType.Gym],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-18",
    bio: "Fitness enthusiast with interest in Gym.",
    gender: Gender.Male
  },
  {
    id: "150",
    name: "Maftuna Saidazimova",
    avatar: "https://randomuser.me/api/portraits/men/97.jpg",
    interests: [SportType.Basketball],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-24",
    bio: "Fitness enthusiast with interest in Basketball.",
    gender: Gender.Female
  },
  {
    id: "151",
    name: "Navruza Shamsiddinova",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    interests: [SportType.Football, SportType.Gym, SportType.Swimming],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-19",
    bio: "Loves sports with interest in Football, Gym, Swimming.",
    gender: Gender.Female
  },
  {
    id: "152",
    name: "Shamshod Shavkatov",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    interests: [SportType.Yoga, SportType.Basketball, SportType.Running],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-28",
    bio: "Active lifestyle seeker with interest in Yoga, Basketball, Running.",
    gender: Gender.Female
  },
  {
    id: "153",
    name: "Yahyo Shavkatov",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    interests: [SportType.Swimming, SportType.Yoga, SportType.Gym],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-28",
    bio: "Fitness enthusiast with interest in Swimming, Yoga, Gym.",
    gender: Gender.Male
  },
  {
    id: "154",
    name: "Nurmuxammatova Shaxzoda",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    interests: [SportType.Football],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-23",
    bio: "Loves sports with interest in Football.",
    gender: Gender.Female
  },
  {
    id: "155",
    name: "Abubakr Shermamatov",
    avatar: "https://randomuser.me/api/portraits/men/51.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-30",
    bio: "Fitness enthusiast with interest in Yoga.",
    gender: Gender.Male
  },
  {
    id: "156",
    name: "Usmon Shomirzayev",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    interests: [SportType.Basketball],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-17",
    bio: "Loves sports with interest in Basketball.",
    gender: Gender.Female
  },
  {
    id: "157",
    name: "Omina Shorahimova",
    avatar: "https://randomuser.me/api/portraits/men/81.jpg",
    interests: [SportType.Tennis, SportType.Football],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-24",
    bio: "Active lifestyle seeker with interest in Tennis, Football.",
    gender: Gender.Female
  },
  {
    id: "158",
    name: "Hadicha Shoyusufova",
    avatar: "https://randomuser.me/api/portraits/men/91.jpg",
    interests: [SportType.Swimming],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-28",
    bio: "Loves sports with interest in Swimming.",
    gender: Gender.Female
  },
  {
    id: "159",
    name: "Firdavs Shuhratillayev",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    interests: [SportType.Swimming, SportType.Running],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-17",
    bio: "Active lifestyle seeker with interest in Swimming, Running.",
    gender: Gender.Male
  },
  {
    id: "160",
    name: "Soliha Shuxratova",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    interests: [SportType.Running, SportType.Tennis],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-18",
    bio: "Fitness enthusiast with interest in Running, Tennis.",
    gender: Gender.Female
  },
  {
    id: "161",
    name: "Xondamir Siddiqov",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    interests: [SportType.Tennis],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-09",
    bio: "Active lifestyle seeker with interest in Tennis.",
    gender: Gender.Male
  },
  {
    id: "162",
    name: "Behruz Sodiqov",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    interests: [SportType.Football, SportType.Cycling],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-21",
    bio: "Active lifestyle seeker with interest in Football, Cycling.",
    gender: Gender.Male
  },
  {
    id: "163",
    name: "Javlonbek Sulaymonkulov",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    interests: [SportType.Swimming, SportType.Football, SportType.Cycling],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-18",
    bio: "Loves sports with interest in Swimming, Football, Cycling.",
    gender: Gender.Female
  },
  {
    id: "164",
    name: "Asliddin Sulaymonqulov",
    avatar: "https://randomuser.me/api/portraits/men/98.jpg",
    interests: [SportType.Yoga, SportType.Football, SportType.Basketball],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-11",
    bio: "Active lifestyle seeker with interest in Yoga, Football, Basketball.",
    gender: Gender.Female
  },
  {
    id: "165",
    name: "Muslima Suleymanova",
    avatar: "https://randomuser.me/api/portraits/women/46.jpg",
    interests: [SportType.Basketball, SportType.Football],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-07",
    bio: "Active lifestyle seeker with interest in Basketball, Football.",
    gender: Gender.Female
  },
  {
    id: "166",
    name: "Madina Sultonkhodjayeva",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    interests: [SportType.Gym],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-06-04",
    bio: "Loves sports with interest in Gym.",
    gender: Gender.Female
  },
  {
    id: "167",
    name: "Temur Tashniyozov",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-15",
    bio: "Loves sports with interest in Yoga.",
    gender: Gender.Male
  },
  {
    id: "168",
    name: "Abdulloh Tohirjonov",
    avatar: "https://randomuser.me/api/portraits/women/95.jpg",
    interests: [SportType.Basketball],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-08",
    bio: "Fitness enthusiast with interest in Basketball.",
    gender: Gender.Female
  },
  {
    id: "169",
    name: "Muhiddin Tohirov",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg",
    interests: [SportType.Basketball, SportType.Football],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-07",
    bio: "Loves sports with interest in Basketball, Football.",
    gender: Gender.Male
  },
  {
    id: "170",
    name: "Sultonmurod Tojiboyev",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    interests: [SportType.Running, SportType.Cycling],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-08",
    bio: "Fitness enthusiast with interest in Running, Cycling.",
    gender: Gender.Female
  },
  {
    id: "171",
    name: "Ibrohim Tolibboyev",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    interests: [SportType.Football, SportType.Cycling, SportType.Swimming],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-03",
    bio: "Loves sports with interest in Football, Cycling, Swimming.",
    gender: Gender.Male
  },
  {
    id: "172",
    name: "Shohruh Tolibjonov",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    interests: [SportType.Running, SportType.Football],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-15",
    bio: "Active lifestyle seeker with interest in Running, Football.",
    gender: Gender.Female
  },
  {
    id: "173",
    name: "Akobirxon Tolibxonov",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    interests: [SportType.Swimming, SportType.Basketball],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-16",
    bio: "Active lifestyle seeker with interest in Swimming, Basketball.",
    gender: Gender.Male
  },
  {
    id: "174",
    name: "Gulsevar Toshtemirova",
    avatar: "https://randomuser.me/api/portraits/men/73.jpg",
    interests: [SportType.Football, SportType.Basketball, SportType.Cycling],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-07",
    bio: "Loves sports with interest in Football, Basketball, Cycling.",
    gender: Gender.Female
  },
  {
    id: "175",
    name: "Begzod Toxirov",
    avatar: "https://randomuser.me/api/portraits/women/74.jpg",
    interests: [SportType.Gym, SportType.Basketball, SportType.Running],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-05",
    bio: "Loves sports with interest in Gym, Basketball, Running.",
    gender: Gender.Female
  },
  {
    id: "176",
    name: "Saidxon Toxirxo'jayev",
    avatar: "https://randomuser.me/api/portraits/women/81.jpg",
    interests: [SportType.Cycling, SportType.Gym, SportType.Swimming],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-19",
    bio: "Active lifestyle seeker with interest in Cycling, Gym, Swimming.",
    gender: Gender.Female
  },
  {
    id: "177",
    name: "Muxammadamin Tulkinov",
    avatar: "https://randomuser.me/api/portraits/women/49.jpg",
    interests: [SportType.Gym, SportType.Basketball],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-10",
    bio: "Loves sports with interest in Gym, Basketball.",
    gender: Gender.Female
  },
  {
    id: "178",
    name: "Begzod Turdiyev",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg",
    interests: [SportType.Cycling],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-10",
    bio: "Fitness enthusiast with interest in Cycling.",
    gender: Gender.Male
  },
  {
    id: "179",
    name: "Samir Turdiyev",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    interests: [SportType.Football, SportType.Yoga, SportType.Cycling],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-07-15",
    bio: "Active lifestyle seeker with interest in Football, Yoga, Cycling.",
    gender: Gender.Female
  },
  {
    id: "180",
    name: "Ravshan Ubaydullayev",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    interests: [SportType.Cycling, SportType.Swimming],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-05",
    bio: "Loves sports with interest in Cycling, Swimming.",
    gender: Gender.Female
  },
  {
    id: "181",
    name: "Asadbek Ulug'bekov",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    interests: [SportType.Cycling],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-04",
    bio: "Active lifestyle seeker with interest in Cycling.",
    gender: Gender.Female
  },
  {
    id: "182",
    name: "Diyorbek Urozboev",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    interests: [SportType.Running, SportType.Tennis, SportType.Football],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-17",
    bio: "Loves sports with interest in Running, Tennis, Football.",
    gender: Gender.Male
  },
  {
    id: "183",
    name: "Elyorbek Urozboev",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    interests: [SportType.Basketball, SportType.Swimming, SportType.Tennis],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-11",
    bio: "Active lifestyle seeker with interest in Basketball, Swimming, Tennis.",
    gender: Gender.Male
  },
  {
    id: "184",
    name: "Aziza Usmanova",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    interests: [SportType.Running, SportType.Cycling],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-06",
    bio: "Fitness enthusiast with interest in Running, Cycling.",
    gender: Gender.Female
  },
  {
    id: "185",
    name: "Shohruz Vladimirov",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    interests: [SportType.Cycling],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-16",
    bio: "Fitness enthusiast with interest in Cycling.",
    gender: Gender.Male
  },
  {
    id: "186",
    name: "Mamlakat Xakimova",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
    interests: [SportType.Tennis, SportType.Swimming, SportType.Running],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-06",
    bio: "Active lifestyle seeker with interest in Tennis, Swimming, Running.",
    gender: Gender.Female
  },
  {
    id: "187",
    name: "Sevinch Xakimova",
    avatar: "https://randomuser.me/api/portraits/women/69.jpg",
    interests: [SportType.Running, SportType.Cycling, SportType.Tennis],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-20",
    bio: "Fitness enthusiast with interest in Running, Cycling, Tennis.",
    gender: Gender.Female
  },
  {
    id: "188",
    name: "Xusanboy Xo'jamnazarov",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    interests: [SportType.Swimming],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-07",
    bio: "Active lifestyle seeker with interest in Swimming.",
    gender: Gender.Male
  },
  {
    id: "189",
    name: "Muxammadsaid Xolmirzayev",
    avatar: "https://randomuser.me/api/portraits/men/74.jpg",
    interests: [SportType.Swimming, SportType.Gym],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-28",
    bio: "Active lifestyle seeker with interest in Swimming, Gym.",
    gender: Gender.Male
  },
  {
    id: "190",
    name: "Xasanboy Xujamnazarov",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    interests: [SportType.Football],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-07",
    bio: "Fitness enthusiast with interest in Football.",
    gender: Gender.Female
  },
  {
    id: "191",
    name: "Sardor Yarilkabov",
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    interests: [SportType.Yoga, SportType.Cycling, SportType.Gym],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-16",
    bio: "Loves sports with interest in Yoga, Cycling, Gym.",
    gender: Gender.Male
  },
  {
    id: "192",
    name: "Nurmahammedov Yaxyoxon",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    interests: [SportType.Tennis],
    activityLevel: ActivityLevel.Advanced,
    joinedDate: "2025-05-06",
    bio: "Active lifestyle seeker with interest in Tennis.",
    gender: Gender.Male
  },
  {
    id: "193",
    name: "Ayaulim Yergasheva",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    interests: [SportType.Basketball],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-27",
    bio: "Active lifestyle seeker with interest in Basketball.",
    gender: Gender.Female
  },
  {
    id: "194",
    name: "Abdujabbor Yo'ldoshev",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    interests: [SportType.Cycling, SportType.Running, SportType.Swimming],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-13",
    bio: "Active lifestyle seeker with interest in Cycling, Running, Swimming.",
    gender: Gender.Female
  },
  {
    id: "195",
    name: "Hosilbek Yo'ldoshev",
    avatar: "https://randomuser.me/api/portraits/women/51.jpg",
    interests: [SportType.Yoga],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-05-21",
    bio: "Loves sports with interest in Yoga.",
    gender: Gender.Female
  },
  {
    id: "196",
    name: "Muhammadnur Yusupov",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
    interests: [SportType.Gym, SportType.Tennis],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-07-10",
    bio: "Fitness enthusiast with interest in Gym, Tennis.",
    gender: Gender.Female
  },
  {
    id: "197",
    name: "Gulsevar Yusupova",
    avatar: "https://randomuser.me/api/portraits/men/20.jpg",
    interests: [SportType.Swimming, SportType.Tennis, SportType.Cycling],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-27",
    bio: "Loves sports with interest in Swimming, Tennis, Cycling.",
    gender: Gender.Female
  },
  {
    id: "198",
    name: "Ulug'bek Zamirov",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    interests: [SportType.Basketball],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-06-14",
    bio: "Active lifestyle seeker with interest in Basketball.",
    gender: Gender.Female
  },
  {
    id: "199",
    name: "Abduraxmonova Zinnura",
    avatar: "https://randomuser.me/api/portraits/men/26.jpg",
    interests: [SportType.Swimming, SportType.Running, SportType.Cycling],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-06-17",
    bio: "Loves sports with interest in Swimming, Running, Cycling.",
    gender: Gender.Female
  },
  {
    id: "200",
    name: "Asadbek Zohidov",
    avatar: "https://randomuser.me/api/portraits/men/39.jpg",
    interests: [SportType.Swimming, SportType.Cycling, SportType.Football],
    activityLevel: ActivityLevel.Beginner,
    joinedDate: "2025-05-18",
    bio: "Fitness enthusiast with interest in Swimming, Cycling, Football.",
    gender: Gender.Male
  },
  {
    id: "201",
    name: "Adham Zokirov",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    interests: [SportType.Running],
    activityLevel: ActivityLevel.Intermediate,
    joinedDate: "2025-07-18",
    bio: "Fitness enthusiast with interest in Running.",
    gender: Gender.Female
  },
];
// Mock current user
export const currentUser: User = mockUsers[0];

// Mock Rooms/Activities
export const mockRooms: Room[] = [
  {
    "id": "1000",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[119].id",
    "host": "mockUsers[119]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-22T07:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[119]",
      "mockUsers[53]",
      "mockUsers[148]",
      "mockUsers[111]",
      "mockUsers[150]"
    ],
    "approvedParticipants": [
      "mockUsers[119]",
      "mockUsers[53]",
      "mockUsers[148]",
      "mockUsers[111]",
      "mockUsers[150]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1001",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[168].id",
    "host": "mockUsers[168]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-28T19:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[168]",
      "mockUsers[41]",
      "mockUsers[6]",
      "mockUsers[113]",
      "mockUsers[114]"
    ],
    "approvedParticipants": [
      "mockUsers[168]",
      "mockUsers[41]",
      "mockUsers[6]",
      "mockUsers[113]",
      "mockUsers[114]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1002",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[11].id",
    "host": "mockUsers[11]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-16T07:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[11]",
      "mockUsers[15]",
      "mockUsers[178]",
      "mockUsers[114]",
      "mockUsers[81]",
      "mockUsers[9]",
      "mockUsers[46]",
      "mockUsers[149]"
    ],
    "approvedParticipants": [
      "mockUsers[11]",
      "mockUsers[15]",
      "mockUsers[178]",
      "mockUsers[114]",
      "mockUsers[81]",
      "mockUsers[9]",
      "mockUsers[46]",
      "mockUsers[149]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1003",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[150].id",
    "host": "mockUsers[150]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-10T17:00:00",
    "duration": 120,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[150]",
      "mockUsers[122]",
      "mockUsers[125]",
      "mockUsers[43]",
      "mockUsers[78]",
      "mockUsers[7]",
      "mockUsers[76]"
    ],
    "approvedParticipants": [
      "mockUsers[150]",
      "mockUsers[122]",
      "mockUsers[125]",
      "mockUsers[43]",
      "mockUsers[78]",
      "mockUsers[7]",
      "mockUsers[76]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1004",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[195].id",
    "host": "mockUsers[195]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-13T19:00:00",
    "duration": 60,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[195]",
      "mockUsers[182]",
      "mockUsers[77]",
      "mockUsers[161]",
      "mockUsers[103]"
    ],
    "approvedParticipants": [
      "mockUsers[195]",
      "mockUsers[182]",
      "mockUsers[77]",
      "mockUsers[161]",
      "mockUsers[103]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1005",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[22].id",
    "host": "mockUsers[22]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-07-25T18:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[22]",
      "mockUsers[29]",
      "mockUsers[4]",
      "mockUsers[53]",
      "mockUsers[135]",
      "mockUsers[104]",
      "mockUsers[38]",
      "mockUsers[134]"
    ],
    "approvedParticipants": [
      "mockUsers[22]",
      "mockUsers[29]",
      "mockUsers[4]",
      "mockUsers[53]",
      "mockUsers[135]",
      "mockUsers[104]",
      "mockUsers[38]",
      "mockUsers[134]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1006",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[199].id",
    "host": "mockUsers[199]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-04T17:00:00",
    "duration": 90,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[199]",
      "mockUsers[156]",
      "mockUsers[107]",
      "mockUsers[126]",
      "mockUsers[7]",
      "mockUsers[97]",
      "mockUsers[111]"
    ],
    "approvedParticipants": [
      "mockUsers[199]",
      "mockUsers[156]",
      "mockUsers[107]",
      "mockUsers[126]",
      "mockUsers[7]",
      "mockUsers[97]",
      "mockUsers[111]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1007",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[188].id",
    "host": "mockUsers[188]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-18T19:00:00",
    "duration": 90,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[188]",
      "mockUsers[165]",
      "mockUsers[51]",
      "mockUsers[23]",
      "mockUsers[83]",
      "mockUsers[136]",
      "mockUsers[84]",
      "mockUsers[143]",
      "mockUsers[115]",
      "mockUsers[65]",
      "mockUsers[175]"
    ],
    "approvedParticipants": [
      "mockUsers[188]",
      "mockUsers[165]",
      "mockUsers[51]",
      "mockUsers[23]",
      "mockUsers[83]",
      "mockUsers[136]",
      "mockUsers[84]",
      "mockUsers[143]",
      "mockUsers[115]",
      "mockUsers[65]",
      "mockUsers[175]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1008",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[107].id",
    "host": "mockUsers[107]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-23T07:00:00",
    "duration": 90,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[107]",
      "mockUsers[45]",
      "mockUsers[141]",
      "mockUsers[136]",
      "mockUsers[175]"
    ],
    "approvedParticipants": [
      "mockUsers[107]",
      "mockUsers[45]",
      "mockUsers[141]",
      "mockUsers[136]",
      "mockUsers[175]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1009",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[36].id",
    "host": "mockUsers[36]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-04T09:00:00",
    "duration": 90,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[36]",
      "mockUsers[87]",
      "mockUsers[6]",
      "mockUsers[35]",
      "mockUsers[192]",
      "mockUsers[151]",
      "mockUsers[186]"
    ],
    "approvedParticipants": [
      "mockUsers[36]",
      "mockUsers[87]",
      "mockUsers[6]",
      "mockUsers[35]",
      "mockUsers[192]",
      "mockUsers[151]",
      "mockUsers[186]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1010",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[130].id",
    "host": "mockUsers[130]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-07-20T18:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[130]",
      "mockUsers[113]",
      "mockUsers[94]",
      "mockUsers[6]"
    ],
    "approvedParticipants": [
      "mockUsers[130]",
      "mockUsers[113]",
      "mockUsers[94]",
      "mockUsers[6]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1011",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[122].id",
    "host": "mockUsers[122]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-26T09:00:00",
    "duration": 90,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[122]",
      "mockUsers[128]",
      "mockUsers[3]",
      "mockUsers[109]",
      "mockUsers[84]",
      "mockUsers[159]"
    ],
    "approvedParticipants": [
      "mockUsers[122]",
      "mockUsers[128]",
      "mockUsers[3]",
      "mockUsers[109]",
      "mockUsers[84]",
      "mockUsers[159]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1012",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[26].id",
    "host": "mockUsers[26]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-15T19:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[26]",
      "mockUsers[75]",
      "mockUsers[186]",
      "mockUsers[150]",
      "mockUsers[179]"
    ],
    "approvedParticipants": [
      "mockUsers[26]",
      "mockUsers[75]",
      "mockUsers[186]",
      "mockUsers[150]",
      "mockUsers[179]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1013",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[36].id",
    "host": "mockUsers[36]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-07-15T17:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[36]",
      "mockUsers[10]",
      "mockUsers[140]",
      "mockUsers[123]"
    ],
    "approvedParticipants": [
      "mockUsers[36]",
      "mockUsers[10]",
      "mockUsers[140]",
      "mockUsers[123]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1014",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[61].id",
    "host": "mockUsers[61]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-18T18:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[61]",
      "mockUsers[122]",
      "mockUsers[192]",
      "mockUsers[117]",
      "mockUsers[78]",
      "mockUsers[101]",
      "mockUsers[180]",
      "mockUsers[150]"
    ],
    "approvedParticipants": [
      "mockUsers[61]",
      "mockUsers[122]",
      "mockUsers[192]",
      "mockUsers[117]",
      "mockUsers[78]",
      "mockUsers[101]",
      "mockUsers[180]",
      "mockUsers[150]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1015",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[163].id",
    "host": "mockUsers[163]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-22T17:00:00",
    "duration": 90,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[163]",
      "mockUsers[20]",
      "mockUsers[173]",
      "mockUsers[104]",
      "mockUsers[149]",
      "mockUsers[3]",
      "mockUsers[151]",
      "mockUsers[129]",
      "mockUsers[128]",
      "mockUsers[79]",
      "mockUsers[58]"
    ],
    "approvedParticipants": [
      "mockUsers[163]",
      "mockUsers[20]",
      "mockUsers[173]",
      "mockUsers[104]",
      "mockUsers[149]",
      "mockUsers[3]",
      "mockUsers[151]",
      "mockUsers[129]",
      "mockUsers[128]",
      "mockUsers[79]",
      "mockUsers[58]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1016",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[39].id",
    "host": "mockUsers[39]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-04T09:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[39]",
      "mockUsers[45]",
      "mockUsers[78]",
      "mockUsers[73]",
      "mockUsers[44]",
      "mockUsers[200]",
      "mockUsers[142]",
      "mockUsers[34]"
    ],
    "approvedParticipants": [
      "mockUsers[39]",
      "mockUsers[45]",
      "mockUsers[78]",
      "mockUsers[73]",
      "mockUsers[44]",
      "mockUsers[200]",
      "mockUsers[142]",
      "mockUsers[34]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1017",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[13].id",
    "host": "mockUsers[13]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-25T17:00:00",
    "duration": 60,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[13]",
      "mockUsers[31]",
      "mockUsers[148]",
      "mockUsers[55]",
      "mockUsers[121]",
      "mockUsers[12]",
      "mockUsers[95]"
    ],
    "approvedParticipants": [
      "mockUsers[13]",
      "mockUsers[31]",
      "mockUsers[148]",
      "mockUsers[55]",
      "mockUsers[121]",
      "mockUsers[12]",
      "mockUsers[95]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1018",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[81].id",
    "host": "mockUsers[81]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-11T07:00:00",
    "duration": 60,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[81]",
      "mockUsers[43]",
      "mockUsers[56]",
      "mockUsers[21]",
      "mockUsers[183]",
      "mockUsers[103]",
      "mockUsers[76]",
      "mockUsers[42]",
      "mockUsers[50]",
      "mockUsers[127]"
    ],
    "approvedParticipants": [
      "mockUsers[81]",
      "mockUsers[43]",
      "mockUsers[56]",
      "mockUsers[21]",
      "mockUsers[183]",
      "mockUsers[103]",
      "mockUsers[76]",
      "mockUsers[42]",
      "mockUsers[50]",
      "mockUsers[127]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1019",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[155].id",
    "host": "mockUsers[155]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-07-31T17:00:00",
    "duration": 120,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[155]",
      "mockUsers[51]",
      "mockUsers[157]",
      "mockUsers[109]",
      "mockUsers[196]",
      "mockUsers[134]",
      "mockUsers[169]",
      "mockUsers[123]",
      "mockUsers[67]",
      "mockUsers[24]"
    ],
    "approvedParticipants": [
      "mockUsers[155]",
      "mockUsers[51]",
      "mockUsers[157]",
      "mockUsers[109]",
      "mockUsers[196]",
      "mockUsers[134]",
      "mockUsers[169]",
      "mockUsers[123]",
      "mockUsers[67]",
      "mockUsers[24]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1020",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[119].id",
    "host": "mockUsers[119]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-26T07:00:00",
    "duration": 90,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[119]",
      "mockUsers[5]",
      "mockUsers[56]",
      "mockUsers[67]",
      "mockUsers[137]",
      "mockUsers[26]",
      "mockUsers[171]",
      "mockUsers[169]",
      "mockUsers[62]"
    ],
    "approvedParticipants": [
      "mockUsers[119]",
      "mockUsers[5]",
      "mockUsers[56]",
      "mockUsers[67]",
      "mockUsers[137]",
      "mockUsers[26]",
      "mockUsers[171]",
      "mockUsers[169]",
      "mockUsers[62]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1021",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[50].id",
    "host": "mockUsers[50]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-20T07:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[50]",
      "mockUsers[162]",
      "mockUsers[19]",
      "mockUsers[185]",
      "mockUsers[13]",
      "mockUsers[154]",
      "mockUsers[53]",
      "mockUsers[200]",
      "mockUsers[117]",
      "mockUsers[170]",
      "mockUsers[101]"
    ],
    "approvedParticipants": [
      "mockUsers[50]",
      "mockUsers[162]",
      "mockUsers[19]",
      "mockUsers[185]",
      "mockUsers[13]",
      "mockUsers[154]",
      "mockUsers[53]",
      "mockUsers[200]",
      "mockUsers[117]",
      "mockUsers[170]",
      "mockUsers[101]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1022",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[180].id",
    "host": "mockUsers[180]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-04T17:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[180]",
      "mockUsers[94]",
      "mockUsers[80]",
      "mockUsers[21]",
      "mockUsers[9]",
      "mockUsers[98]",
      "mockUsers[102]",
      "mockUsers[97]"
    ],
    "approvedParticipants": [
      "mockUsers[180]",
      "mockUsers[94]",
      "mockUsers[80]",
      "mockUsers[21]",
      "mockUsers[9]",
      "mockUsers[98]",
      "mockUsers[102]",
      "mockUsers[97]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1023",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[87].id",
    "host": "mockUsers[87]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-18T19:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[87]",
      "mockUsers[175]",
      "mockUsers[51]",
      "mockUsers[89]",
      "mockUsers[18]",
      "mockUsers[193]",
      "mockUsers[167]",
      "mockUsers[145]",
      "mockUsers[187]"
    ],
    "approvedParticipants": [
      "mockUsers[87]",
      "mockUsers[175]",
      "mockUsers[51]",
      "mockUsers[89]",
      "mockUsers[18]",
      "mockUsers[193]",
      "mockUsers[167]",
      "mockUsers[145]",
      "mockUsers[187]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1024",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[31].id",
    "host": "mockUsers[31]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-25T07:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[31]",
      "mockUsers[131]",
      "mockUsers[15]",
      "mockUsers[72]"
    ],
    "approvedParticipants": [
      "mockUsers[31]",
      "mockUsers[131]",
      "mockUsers[15]",
      "mockUsers[72]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1025",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[144].id",
    "host": "mockUsers[144]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-07-31T18:00:00",
    "duration": 60,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[144]",
      "mockUsers[28]",
      "mockUsers[38]",
      "mockUsers[66]",
      "mockUsers[11]",
      "mockUsers[188]"
    ],
    "approvedParticipants": [
      "mockUsers[144]",
      "mockUsers[28]",
      "mockUsers[38]",
      "mockUsers[66]",
      "mockUsers[11]",
      "mockUsers[188]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1026",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[8].id",
    "host": "mockUsers[8]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-07-31T19:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[8]",
      "mockUsers[159]",
      "mockUsers[115]",
      "mockUsers[15]",
      "mockUsers[186]",
      "mockUsers[134]",
      "mockUsers[76]",
      "mockUsers[77]"
    ],
    "approvedParticipants": [
      "mockUsers[8]",
      "mockUsers[159]",
      "mockUsers[115]",
      "mockUsers[15]",
      "mockUsers[186]",
      "mockUsers[134]",
      "mockUsers[76]",
      "mockUsers[77]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1027",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[64].id",
    "host": "mockUsers[64]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-07-25T18:00:00",
    "duration": 60,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[64]",
      "mockUsers[134]",
      "mockUsers[40]",
      "mockUsers[75]",
      "mockUsers[23]"
    ],
    "approvedParticipants": [
      "mockUsers[64]",
      "mockUsers[134]",
      "mockUsers[40]",
      "mockUsers[75]",
      "mockUsers[23]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1028",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[8].id",
    "host": "mockUsers[8]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-07-27T17:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[8]",
      "mockUsers[62]",
      "mockUsers[133]",
      "mockUsers[159]"
    ],
    "approvedParticipants": [
      "mockUsers[8]",
      "mockUsers[62]",
      "mockUsers[133]",
      "mockUsers[159]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1029",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[140].id",
    "host": "mockUsers[140]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-07T07:00:00",
    "duration": 120,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[140]",
      "mockUsers[157]",
      "mockUsers[103]",
      "mockUsers[146]"
    ],
    "approvedParticipants": [
      "mockUsers[140]",
      "mockUsers[157]",
      "mockUsers[103]",
      "mockUsers[146]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1030",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[116].id",
    "host": "mockUsers[116]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-07-31T07:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[116]",
      "mockUsers[9]",
      "mockUsers[159]",
      "mockUsers[119]",
      "mockUsers[52]",
      "mockUsers[65]"
    ],
    "approvedParticipants": [
      "mockUsers[116]",
      "mockUsers[9]",
      "mockUsers[159]",
      "mockUsers[119]",
      "mockUsers[52]",
      "mockUsers[65]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1031",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[193].id",
    "host": "mockUsers[193]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-04T09:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[193]",
      "mockUsers[192]",
      "mockUsers[102]",
      "mockUsers[43]",
      "mockUsers[58]",
      "mockUsers[68]",
      "mockUsers[154]",
      "mockUsers[63]",
      "mockUsers[119]"
    ],
    "approvedParticipants": [
      "mockUsers[193]",
      "mockUsers[192]",
      "mockUsers[102]",
      "mockUsers[43]",
      "mockUsers[58]",
      "mockUsers[68]",
      "mockUsers[154]",
      "mockUsers[63]",
      "mockUsers[119]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1032",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[82].id",
    "host": "mockUsers[82]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-23T09:00:00",
    "duration": 90,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[82]",
      "mockUsers[68]",
      "mockUsers[64]",
      "mockUsers[29]",
      "mockUsers[28]",
      "mockUsers[170]",
      "mockUsers[126]",
      "mockUsers[133]",
      "mockUsers[100]",
      "mockUsers[39]"
    ],
    "approvedParticipants": [
      "mockUsers[82]",
      "mockUsers[68]",
      "mockUsers[64]",
      "mockUsers[29]",
      "mockUsers[28]",
      "mockUsers[170]",
      "mockUsers[126]",
      "mockUsers[133]",
      "mockUsers[100]",
      "mockUsers[39]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1033",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[96].id",
    "host": "mockUsers[96]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-23T09:00:00",
    "duration": 120,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[96]",
      "mockUsers[143]",
      "mockUsers[36]",
      "mockUsers[80]",
      "mockUsers[186]",
      "mockUsers[133]",
      "mockUsers[73]"
    ],
    "approvedParticipants": [
      "mockUsers[96]",
      "mockUsers[143]",
      "mockUsers[36]",
      "mockUsers[80]",
      "mockUsers[186]",
      "mockUsers[133]",
      "mockUsers[73]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1034",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[25].id",
    "host": "mockUsers[25]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-07-30T07:00:00",
    "duration": 90,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[25]",
      "mockUsers[185]",
      "mockUsers[121]",
      "mockUsers[191]",
      "mockUsers[37]",
      "mockUsers[118]",
      "mockUsers[139]"
    ],
    "approvedParticipants": [
      "mockUsers[25]",
      "mockUsers[185]",
      "mockUsers[121]",
      "mockUsers[191]",
      "mockUsers[37]",
      "mockUsers[118]",
      "mockUsers[139]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1035",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[158].id",
    "host": "mockUsers[158]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-04T09:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[158]",
      "mockUsers[145]",
      "mockUsers[170]",
      "mockUsers[28]",
      "mockUsers[69]",
      "mockUsers[129]",
      "mockUsers[130]",
      "mockUsers[116]",
      "mockUsers[48]"
    ],
    "approvedParticipants": [
      "mockUsers[158]",
      "mockUsers[145]",
      "mockUsers[170]",
      "mockUsers[28]",
      "mockUsers[69]",
      "mockUsers[129]",
      "mockUsers[130]",
      "mockUsers[116]",
      "mockUsers[48]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1036",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[19].id",
    "host": "mockUsers[19]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-26T17:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[19]",
      "mockUsers[101]",
      "mockUsers[94]",
      "mockUsers[97]",
      "mockUsers[79]",
      "mockUsers[74]",
      "mockUsers[85]",
      "mockUsers[200]",
      "mockUsers[31]",
      "mockUsers[30]",
      "mockUsers[106]"
    ],
    "approvedParticipants": [
      "mockUsers[19]",
      "mockUsers[101]",
      "mockUsers[94]",
      "mockUsers[97]",
      "mockUsers[79]",
      "mockUsers[74]",
      "mockUsers[85]",
      "mockUsers[200]",
      "mockUsers[31]",
      "mockUsers[30]",
      "mockUsers[106]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1037",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[119].id",
    "host": "mockUsers[119]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-07-22T19:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[119]",
      "mockUsers[34]",
      "mockUsers[3]",
      "mockUsers[150]",
      "mockUsers[196]",
      "mockUsers[145]",
      "mockUsers[48]",
      "mockUsers[143]",
      "mockUsers[199]",
      "mockUsers[109]",
      "mockUsers[178]"
    ],
    "approvedParticipants": [
      "mockUsers[119]",
      "mockUsers[34]",
      "mockUsers[3]",
      "mockUsers[150]",
      "mockUsers[196]",
      "mockUsers[145]",
      "mockUsers[48]",
      "mockUsers[143]",
      "mockUsers[199]",
      "mockUsers[109]",
      "mockUsers[178]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1038",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[83].id",
    "host": "mockUsers[83]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-11T18:00:00",
    "duration": 60,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[83]",
      "mockUsers[75]",
      "mockUsers[42]",
      "mockUsers[172]",
      "mockUsers[40]",
      "mockUsers[181]",
      "mockUsers[82]",
      "mockUsers[130]",
      "mockUsers[187]",
      "mockUsers[7]"
    ],
    "approvedParticipants": [
      "mockUsers[83]",
      "mockUsers[75]",
      "mockUsers[42]",
      "mockUsers[172]",
      "mockUsers[40]",
      "mockUsers[181]",
      "mockUsers[82]",
      "mockUsers[130]",
      "mockUsers[187]",
      "mockUsers[7]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1039",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[132].id",
    "host": "mockUsers[132]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-14T19:00:00",
    "duration": 60,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[132]",
      "mockUsers[131]",
      "mockUsers[35]",
      "mockUsers[86]",
      "mockUsers[173]",
      "mockUsers[159]",
      "mockUsers[105]"
    ],
    "approvedParticipants": [
      "mockUsers[132]",
      "mockUsers[131]",
      "mockUsers[35]",
      "mockUsers[86]",
      "mockUsers[173]",
      "mockUsers[159]",
      "mockUsers[105]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1040",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[141].id",
    "host": "mockUsers[141]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-22T18:00:00",
    "duration": 90,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[141]",
      "mockUsers[174]",
      "mockUsers[179]",
      "mockUsers[176]",
      "mockUsers[86]"
    ],
    "approvedParticipants": [
      "mockUsers[141]",
      "mockUsers[174]",
      "mockUsers[179]",
      "mockUsers[176]",
      "mockUsers[86]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1041",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[102].id",
    "host": "mockUsers[102]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-07-21T09:00:00",
    "duration": 90,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[102]",
      "mockUsers[73]",
      "mockUsers[165]",
      "mockUsers[157]",
      "mockUsers[148]",
      "mockUsers[92]"
    ],
    "approvedParticipants": [
      "mockUsers[102]",
      "mockUsers[73]",
      "mockUsers[165]",
      "mockUsers[157]",
      "mockUsers[148]",
      "mockUsers[92]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1042",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[97].id",
    "host": "mockUsers[97]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-29T18:00:00",
    "duration": 60,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[97]",
      "mockUsers[43]",
      "mockUsers[55]",
      "mockUsers[146]",
      "mockUsers[102]",
      "mockUsers[24]"
    ],
    "approvedParticipants": [
      "mockUsers[97]",
      "mockUsers[43]",
      "mockUsers[55]",
      "mockUsers[146]",
      "mockUsers[102]",
      "mockUsers[24]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1043",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[134].id",
    "host": "mockUsers[134]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-25T18:00:00",
    "duration": 90,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[134]",
      "mockUsers[196]",
      "mockUsers[53]",
      "mockUsers[19]",
      "mockUsers[91]",
      "mockUsers[100]",
      "mockUsers[141]",
      "mockUsers[31]",
      "mockUsers[105]"
    ],
    "approvedParticipants": [
      "mockUsers[134]",
      "mockUsers[196]",
      "mockUsers[53]",
      "mockUsers[19]",
      "mockUsers[91]",
      "mockUsers[100]",
      "mockUsers[141]",
      "mockUsers[31]",
      "mockUsers[105]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1044",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[67].id",
    "host": "mockUsers[67]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-06T18:00:00",
    "duration": 120,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[67]",
      "mockUsers[94]",
      "mockUsers[66]",
      "mockUsers[149]"
    ],
    "approvedParticipants": [
      "mockUsers[67]",
      "mockUsers[94]",
      "mockUsers[66]",
      "mockUsers[149]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1045",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[25].id",
    "host": "mockUsers[25]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-23T07:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[25]",
      "mockUsers[116]",
      "mockUsers[88]",
      "mockUsers[30]",
      "mockUsers[114]",
      "mockUsers[140]"
    ],
    "approvedParticipants": [
      "mockUsers[25]",
      "mockUsers[116]",
      "mockUsers[88]",
      "mockUsers[30]",
      "mockUsers[114]",
      "mockUsers[140]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1046",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[21].id",
    "host": "mockUsers[21]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-13T19:00:00",
    "duration": 60,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[21]",
      "mockUsers[35]",
      "mockUsers[181]",
      "mockUsers[94]",
      "mockUsers[41]",
      "mockUsers[107]"
    ],
    "approvedParticipants": [
      "mockUsers[21]",
      "mockUsers[35]",
      "mockUsers[181]",
      "mockUsers[94]",
      "mockUsers[41]",
      "mockUsers[107]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1047",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[152].id",
    "host": "mockUsers[152]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-07-29T09:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[152]",
      "mockUsers[90]",
      "mockUsers[147]",
      "mockUsers[75]",
      "mockUsers[64]",
      "mockUsers[19]",
      "mockUsers[103]",
      "mockUsers[108]"
    ],
    "approvedParticipants": [
      "mockUsers[152]",
      "mockUsers[90]",
      "mockUsers[147]",
      "mockUsers[75]",
      "mockUsers[64]",
      "mockUsers[19]",
      "mockUsers[103]",
      "mockUsers[108]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1048",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[87].id",
    "host": "mockUsers[87]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-08T17:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[87]",
      "mockUsers[93]",
      "mockUsers[156]",
      "mockUsers[194]",
      "mockUsers[46]",
      "mockUsers[50]"
    ],
    "approvedParticipants": [
      "mockUsers[87]",
      "mockUsers[93]",
      "mockUsers[156]",
      "mockUsers[194]",
      "mockUsers[46]",
      "mockUsers[50]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1049",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[130].id",
    "host": "mockUsers[130]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-18T19:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[130]",
      "mockUsers[26]",
      "mockUsers[108]",
      "mockUsers[153]",
      "mockUsers[185]",
      "mockUsers[124]"
    ],
    "approvedParticipants": [
      "mockUsers[130]",
      "mockUsers[26]",
      "mockUsers[108]",
      "mockUsers[153]",
      "mockUsers[185]",
      "mockUsers[124]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1050",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[45].id",
    "host": "mockUsers[45]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-13T19:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[45]",
      "mockUsers[119]",
      "mockUsers[33]",
      "mockUsers[75]",
      "mockUsers[99]",
      "mockUsers[178]",
      "mockUsers[113]",
      "mockUsers[89]",
      "mockUsers[29]"
    ],
    "approvedParticipants": [
      "mockUsers[45]",
      "mockUsers[119]",
      "mockUsers[33]",
      "mockUsers[75]",
      "mockUsers[99]",
      "mockUsers[178]",
      "mockUsers[113]",
      "mockUsers[89]",
      "mockUsers[29]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1051",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[3].id",
    "host": "mockUsers[3]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-30T18:00:00",
    "duration": 60,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[3]",
      "mockUsers[194]",
      "mockUsers[74]",
      "mockUsers[113]",
      "mockUsers[146]",
      "mockUsers[94]",
      "mockUsers[87]",
      "mockUsers[172]"
    ],
    "approvedParticipants": [
      "mockUsers[3]",
      "mockUsers[194]",
      "mockUsers[74]",
      "mockUsers[113]",
      "mockUsers[146]",
      "mockUsers[94]",
      "mockUsers[87]",
      "mockUsers[172]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1052",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[61].id",
    "host": "mockUsers[61]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-07-31T17:00:00",
    "duration": 60,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[61]",
      "mockUsers[84]",
      "mockUsers[150]",
      "mockUsers[77]",
      "mockUsers[108]",
      "mockUsers[18]",
      "mockUsers[19]",
      "mockUsers[119]"
    ],
    "approvedParticipants": [
      "mockUsers[61]",
      "mockUsers[84]",
      "mockUsers[150]",
      "mockUsers[77]",
      "mockUsers[108]",
      "mockUsers[18]",
      "mockUsers[19]",
      "mockUsers[119]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1053",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[95].id",
    "host": "mockUsers[95]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-29T18:00:00",
    "duration": 120,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[95]",
      "mockUsers[160]",
      "mockUsers[35]",
      "mockUsers[195]",
      "mockUsers[154]",
      "mockUsers[42]",
      "mockUsers[6]",
      "mockUsers[97]",
      "mockUsers[78]",
      "mockUsers[71]"
    ],
    "approvedParticipants": [
      "mockUsers[95]",
      "mockUsers[160]",
      "mockUsers[35]",
      "mockUsers[195]",
      "mockUsers[154]",
      "mockUsers[42]",
      "mockUsers[6]",
      "mockUsers[97]",
      "mockUsers[78]",
      "mockUsers[71]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1054",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[172].id",
    "host": "mockUsers[172]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-25T09:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[172]",
      "mockUsers[198]",
      "mockUsers[108]",
      "mockUsers[47]"
    ],
    "approvedParticipants": [
      "mockUsers[172]",
      "mockUsers[198]",
      "mockUsers[108]",
      "mockUsers[47]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1055",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[99].id",
    "host": "mockUsers[99]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-14T07:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[99]",
      "mockUsers[150]",
      "mockUsers[102]",
      "mockUsers[36]",
      "mockUsers[149]",
      "mockUsers[127]",
      "mockUsers[86]",
      "mockUsers[84]"
    ],
    "approvedParticipants": [
      "mockUsers[99]",
      "mockUsers[150]",
      "mockUsers[102]",
      "mockUsers[36]",
      "mockUsers[149]",
      "mockUsers[127]",
      "mockUsers[86]",
      "mockUsers[84]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1056",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[29].id",
    "host": "mockUsers[29]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-07-29T17:00:00",
    "duration": 60,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[29]",
      "mockUsers[135]",
      "mockUsers[102]",
      "mockUsers[140]",
      "mockUsers[131]"
    ],
    "approvedParticipants": [
      "mockUsers[29]",
      "mockUsers[135]",
      "mockUsers[102]",
      "mockUsers[140]",
      "mockUsers[131]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1057",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[93].id",
    "host": "mockUsers[93]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-04T17:00:00",
    "duration": 120,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[93]",
      "mockUsers[79]",
      "mockUsers[64]",
      "mockUsers[116]",
      "mockUsers[8]",
      "mockUsers[172]",
      "mockUsers[78]"
    ],
    "approvedParticipants": [
      "mockUsers[93]",
      "mockUsers[79]",
      "mockUsers[64]",
      "mockUsers[116]",
      "mockUsers[8]",
      "mockUsers[172]",
      "mockUsers[78]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1058",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[9].id",
    "host": "mockUsers[9]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-27T07:00:00",
    "duration": 90,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[9]",
      "mockUsers[28]",
      "mockUsers[177]",
      "mockUsers[73]",
      "mockUsers[102]",
      "mockUsers[161]",
      "mockUsers[94]",
      "mockUsers[196]",
      "mockUsers[35]",
      "mockUsers[135]"
    ],
    "approvedParticipants": [
      "mockUsers[9]",
      "mockUsers[28]",
      "mockUsers[177]",
      "mockUsers[73]",
      "mockUsers[102]",
      "mockUsers[161]",
      "mockUsers[94]",
      "mockUsers[196]",
      "mockUsers[35]",
      "mockUsers[135]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1059",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[12].id",
    "host": "mockUsers[12]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-10T17:00:00",
    "duration": 60,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[12]",
      "mockUsers[45]",
      "mockUsers[150]",
      "mockUsers[190]",
      "mockUsers[24]",
      "mockUsers[38]",
      "mockUsers[42]"
    ],
    "approvedParticipants": [
      "mockUsers[12]",
      "mockUsers[45]",
      "mockUsers[150]",
      "mockUsers[190]",
      "mockUsers[24]",
      "mockUsers[38]",
      "mockUsers[42]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1060",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[153].id",
    "host": "mockUsers[153]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-07T09:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[153]",
      "mockUsers[106]",
      "mockUsers[147]",
      "mockUsers[123]",
      "mockUsers[82]",
      "mockUsers[167]",
      "mockUsers[62]",
      "mockUsers[143]",
      "mockUsers[130]"
    ],
    "approvedParticipants": [
      "mockUsers[153]",
      "mockUsers[106]",
      "mockUsers[147]",
      "mockUsers[123]",
      "mockUsers[82]",
      "mockUsers[167]",
      "mockUsers[62]",
      "mockUsers[143]",
      "mockUsers[130]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1061",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[62].id",
    "host": "mockUsers[62]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-25T07:00:00",
    "duration": 90,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[62]",
      "mockUsers[36]",
      "mockUsers[19]",
      "mockUsers[115]",
      "mockUsers[128]",
      "mockUsers[89]",
      "mockUsers[16]",
      "mockUsers[65]",
      "mockUsers[156]",
      "mockUsers[107]",
      "mockUsers[174]"
    ],
    "approvedParticipants": [
      "mockUsers[62]",
      "mockUsers[36]",
      "mockUsers[19]",
      "mockUsers[115]",
      "mockUsers[128]",
      "mockUsers[89]",
      "mockUsers[16]",
      "mockUsers[65]",
      "mockUsers[156]",
      "mockUsers[107]",
      "mockUsers[174]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1062",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[159].id",
    "host": "mockUsers[159]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-04T07:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[159]",
      "mockUsers[148]",
      "mockUsers[179]",
      "mockUsers[156]",
      "mockUsers[88]",
      "mockUsers[1]",
      "mockUsers[151]",
      "mockUsers[27]"
    ],
    "approvedParticipants": [
      "mockUsers[159]",
      "mockUsers[148]",
      "mockUsers[179]",
      "mockUsers[156]",
      "mockUsers[88]",
      "mockUsers[1]",
      "mockUsers[151]",
      "mockUsers[27]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1063",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[62].id",
    "host": "mockUsers[62]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-21T07:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[62]",
      "mockUsers[24]",
      "mockUsers[89]",
      "mockUsers[45]",
      "mockUsers[63]",
      "mockUsers[12]",
      "mockUsers[130]",
      "mockUsers[10]",
      "mockUsers[180]"
    ],
    "approvedParticipants": [
      "mockUsers[62]",
      "mockUsers[24]",
      "mockUsers[89]",
      "mockUsers[45]",
      "mockUsers[63]",
      "mockUsers[12]",
      "mockUsers[130]",
      "mockUsers[10]",
      "mockUsers[180]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1064",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[150].id",
    "host": "mockUsers[150]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-07-21T17:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[150]",
      "mockUsers[168]",
      "mockUsers[91]",
      "mockUsers[177]",
      "mockUsers[89]"
    ],
    "approvedParticipants": [
      "mockUsers[150]",
      "mockUsers[168]",
      "mockUsers[91]",
      "mockUsers[177]",
      "mockUsers[89]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1065",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[101].id",
    "host": "mockUsers[101]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-19T09:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[101]",
      "mockUsers[129]",
      "mockUsers[171]",
      "mockUsers[105]",
      "mockUsers[72]",
      "mockUsers[40]",
      "mockUsers[131]",
      "mockUsers[178]"
    ],
    "approvedParticipants": [
      "mockUsers[101]",
      "mockUsers[129]",
      "mockUsers[171]",
      "mockUsers[105]",
      "mockUsers[72]",
      "mockUsers[40]",
      "mockUsers[131]",
      "mockUsers[178]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1066",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[135].id",
    "host": "mockUsers[135]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-16T09:00:00",
    "duration": 60,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[135]",
      "mockUsers[109]",
      "mockUsers[9]",
      "mockUsers[183]",
      "mockUsers[41]",
      "mockUsers[69]",
      "mockUsers[50]",
      "mockUsers[157]",
      "mockUsers[43]",
      "mockUsers[165]"
    ],
    "approvedParticipants": [
      "mockUsers[135]",
      "mockUsers[109]",
      "mockUsers[9]",
      "mockUsers[183]",
      "mockUsers[41]",
      "mockUsers[69]",
      "mockUsers[50]",
      "mockUsers[157]",
      "mockUsers[43]",
      "mockUsers[165]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1067",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[51].id",
    "host": "mockUsers[51]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-02T19:00:00",
    "duration": 60,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[51]",
      "mockUsers[73]",
      "mockUsers[61]",
      "mockUsers[183]",
      "mockUsers[74]",
      "mockUsers[119]",
      "mockUsers[177]",
      "mockUsers[49]",
      "mockUsers[20]",
      "mockUsers[185]"
    ],
    "approvedParticipants": [
      "mockUsers[51]",
      "mockUsers[73]",
      "mockUsers[61]",
      "mockUsers[183]",
      "mockUsers[74]",
      "mockUsers[119]",
      "mockUsers[177]",
      "mockUsers[49]",
      "mockUsers[20]",
      "mockUsers[185]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1068",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[160].id",
    "host": "mockUsers[160]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-06T18:00:00",
    "duration": 120,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[160]",
      "mockUsers[189]",
      "mockUsers[76]",
      "mockUsers[9]"
    ],
    "approvedParticipants": [
      "mockUsers[160]",
      "mockUsers[189]",
      "mockUsers[76]",
      "mockUsers[9]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1069",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[60].id",
    "host": "mockUsers[60]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-07-25T18:00:00",
    "duration": 120,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[60]",
      "mockUsers[26]",
      "mockUsers[40]",
      "mockUsers[85]",
      "mockUsers[165]",
      "mockUsers[47]",
      "mockUsers[149]",
      "mockUsers[17]",
      "mockUsers[130]"
    ],
    "approvedParticipants": [
      "mockUsers[60]",
      "mockUsers[26]",
      "mockUsers[40]",
      "mockUsers[85]",
      "mockUsers[165]",
      "mockUsers[47]",
      "mockUsers[149]",
      "mockUsers[17]",
      "mockUsers[130]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1070",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[19].id",
    "host": "mockUsers[19]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-25T18:00:00",
    "duration": 120,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[19]",
      "mockUsers[175]",
      "mockUsers[25]",
      "mockUsers[57]"
    ],
    "approvedParticipants": [
      "mockUsers[19]",
      "mockUsers[175]",
      "mockUsers[25]",
      "mockUsers[57]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1071",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[103].id",
    "host": "mockUsers[103]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-20T09:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[103]",
      "mockUsers[188]",
      "mockUsers[12]",
      "mockUsers[23]",
      "mockUsers[163]",
      "mockUsers[26]",
      "mockUsers[54]",
      "mockUsers[131]",
      "mockUsers[157]",
      "mockUsers[196]",
      "mockUsers[164]"
    ],
    "approvedParticipants": [
      "mockUsers[103]",
      "mockUsers[188]",
      "mockUsers[12]",
      "mockUsers[23]",
      "mockUsers[163]",
      "mockUsers[26]",
      "mockUsers[54]",
      "mockUsers[131]",
      "mockUsers[157]",
      "mockUsers[196]",
      "mockUsers[164]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1072",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[180].id",
    "host": "mockUsers[180]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-28T18:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[180]",
      "mockUsers[116]",
      "mockUsers[115]",
      "mockUsers[55]"
    ],
    "approvedParticipants": [
      "mockUsers[180]",
      "mockUsers[116]",
      "mockUsers[115]",
      "mockUsers[55]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1073",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[25].id",
    "host": "mockUsers[25]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-10T18:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[25]",
      "mockUsers[179]",
      "mockUsers[136]",
      "mockUsers[58]",
      "mockUsers[81]",
      "mockUsers[74]",
      "mockUsers[173]",
      "mockUsers[6]"
    ],
    "approvedParticipants": [
      "mockUsers[25]",
      "mockUsers[179]",
      "mockUsers[136]",
      "mockUsers[58]",
      "mockUsers[81]",
      "mockUsers[74]",
      "mockUsers[173]",
      "mockUsers[6]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1074",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[182].id",
    "host": "mockUsers[182]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-15T17:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[182]",
      "mockUsers[26]",
      "mockUsers[24]",
      "mockUsers[111]",
      "mockUsers[70]",
      "mockUsers[176]"
    ],
    "approvedParticipants": [
      "mockUsers[182]",
      "mockUsers[26]",
      "mockUsers[24]",
      "mockUsers[111]",
      "mockUsers[70]",
      "mockUsers[176]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1075",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[21].id",
    "host": "mockUsers[21]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-29T19:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[21]",
      "mockUsers[3]",
      "mockUsers[186]",
      "mockUsers[6]",
      "mockUsers[46]",
      "mockUsers[195]",
      "mockUsers[160]",
      "mockUsers[100]"
    ],
    "approvedParticipants": [
      "mockUsers[21]",
      "mockUsers[3]",
      "mockUsers[186]",
      "mockUsers[6]",
      "mockUsers[46]",
      "mockUsers[195]",
      "mockUsers[160]",
      "mockUsers[100]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1076",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[41].id",
    "host": "mockUsers[41]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-01T07:00:00",
    "duration": 60,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[41]",
      "mockUsers[136]",
      "mockUsers[86]",
      "mockUsers[0]",
      "mockUsers[111]",
      "mockUsers[199]"
    ],
    "approvedParticipants": [
      "mockUsers[41]",
      "mockUsers[136]",
      "mockUsers[86]",
      "mockUsers[0]",
      "mockUsers[111]",
      "mockUsers[199]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1077",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[49].id",
    "host": "mockUsers[49]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-18T19:00:00",
    "duration": 120,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[49]",
      "mockUsers[35]",
      "mockUsers[13]",
      "mockUsers[193]",
      "mockUsers[142]",
      "mockUsers[16]",
      "mockUsers[30]",
      "mockUsers[54]",
      "mockUsers[116]"
    ],
    "approvedParticipants": [
      "mockUsers[49]",
      "mockUsers[35]",
      "mockUsers[13]",
      "mockUsers[193]",
      "mockUsers[142]",
      "mockUsers[16]",
      "mockUsers[30]",
      "mockUsers[54]",
      "mockUsers[116]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1078",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[75].id",
    "host": "mockUsers[75]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-19T09:00:00",
    "duration": 60,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[75]",
      "mockUsers[108]",
      "mockUsers[110]",
      "mockUsers[111]",
      "mockUsers[94]",
      "mockUsers[56]",
      "mockUsers[41]",
      "mockUsers[165]"
    ],
    "approvedParticipants": [
      "mockUsers[75]",
      "mockUsers[108]",
      "mockUsers[110]",
      "mockUsers[111]",
      "mockUsers[94]",
      "mockUsers[56]",
      "mockUsers[41]",
      "mockUsers[165]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1079",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[75].id",
    "host": "mockUsers[75]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-07-29T19:00:00",
    "duration": 90,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[75]",
      "mockUsers[128]",
      "mockUsers[144]",
      "mockUsers[76]",
      "mockUsers[189]"
    ],
    "approvedParticipants": [
      "mockUsers[75]",
      "mockUsers[128]",
      "mockUsers[144]",
      "mockUsers[76]",
      "mockUsers[189]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1080",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[140].id",
    "host": "mockUsers[140]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-06T09:00:00",
    "duration": 60,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[140]",
      "mockUsers[67]",
      "mockUsers[168]",
      "mockUsers[125]",
      "mockUsers[178]",
      "mockUsers[8]",
      "mockUsers[116]"
    ],
    "approvedParticipants": [
      "mockUsers[140]",
      "mockUsers[67]",
      "mockUsers[168]",
      "mockUsers[125]",
      "mockUsers[178]",
      "mockUsers[8]",
      "mockUsers[116]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1081",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[126].id",
    "host": "mockUsers[126]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-04T17:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[126]",
      "mockUsers[101]",
      "mockUsers[36]",
      "mockUsers[31]",
      "mockUsers[64]",
      "mockUsers[102]",
      "mockUsers[77]",
      "mockUsers[82]"
    ],
    "approvedParticipants": [
      "mockUsers[126]",
      "mockUsers[101]",
      "mockUsers[36]",
      "mockUsers[31]",
      "mockUsers[64]",
      "mockUsers[102]",
      "mockUsers[77]",
      "mockUsers[82]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1082",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[164].id",
    "host": "mockUsers[164]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-14T18:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[164]",
      "mockUsers[21]",
      "mockUsers[47]",
      "mockUsers[168]"
    ],
    "approvedParticipants": [
      "mockUsers[164]",
      "mockUsers[21]",
      "mockUsers[47]",
      "mockUsers[168]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1083",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[60].id",
    "host": "mockUsers[60]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-15T09:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[60]",
      "mockUsers[156]",
      "mockUsers[74]",
      "mockUsers[177]",
      "mockUsers[145]",
      "mockUsers[138]"
    ],
    "approvedParticipants": [
      "mockUsers[60]",
      "mockUsers[156]",
      "mockUsers[74]",
      "mockUsers[177]",
      "mockUsers[145]",
      "mockUsers[138]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1084",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[91].id",
    "host": "mockUsers[91]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-07-17T07:00:00",
    "duration": 60,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[91]",
      "mockUsers[107]",
      "mockUsers[41]",
      "mockUsers[74]",
      "mockUsers[114]",
      "mockUsers[105]",
      "mockUsers[69]",
      "mockUsers[49]",
      "mockUsers[173]",
      "mockUsers[113]"
    ],
    "approvedParticipants": [
      "mockUsers[91]",
      "mockUsers[107]",
      "mockUsers[41]",
      "mockUsers[74]",
      "mockUsers[114]",
      "mockUsers[105]",
      "mockUsers[69]",
      "mockUsers[49]",
      "mockUsers[173]",
      "mockUsers[113]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1085",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[61].id",
    "host": "mockUsers[61]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-07-22T19:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[61]",
      "mockUsers[73]",
      "mockUsers[48]",
      "mockUsers[150]",
      "mockUsers[16]"
    ],
    "approvedParticipants": [
      "mockUsers[61]",
      "mockUsers[73]",
      "mockUsers[48]",
      "mockUsers[150]",
      "mockUsers[16]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1086",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[142].id",
    "host": "mockUsers[142]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-07-26T09:00:00",
    "duration": 60,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[142]",
      "mockUsers[81]",
      "mockUsers[176]",
      "mockUsers[63]",
      "mockUsers[159]",
      "mockUsers[53]",
      "mockUsers[91]",
      "mockUsers[122]",
      "mockUsers[84]",
      "mockUsers[167]",
      "mockUsers[90]"
    ],
    "approvedParticipants": [
      "mockUsers[142]",
      "mockUsers[81]",
      "mockUsers[176]",
      "mockUsers[63]",
      "mockUsers[159]",
      "mockUsers[53]",
      "mockUsers[91]",
      "mockUsers[122]",
      "mockUsers[84]",
      "mockUsers[167]",
      "mockUsers[90]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1087",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[132].id",
    "host": "mockUsers[132]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-04T07:00:00",
    "duration": 90,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[132]",
      "mockUsers[103]",
      "mockUsers[9]",
      "mockUsers[114]",
      "mockUsers[123]",
      "mockUsers[62]",
      "mockUsers[91]",
      "mockUsers[122]",
      "mockUsers[142]"
    ],
    "approvedParticipants": [
      "mockUsers[132]",
      "mockUsers[103]",
      "mockUsers[9]",
      "mockUsers[114]",
      "mockUsers[123]",
      "mockUsers[62]",
      "mockUsers[91]",
      "mockUsers[122]",
      "mockUsers[142]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1088",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[127].id",
    "host": "mockUsers[127]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-07T09:00:00",
    "duration": 90,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[127]",
      "mockUsers[78]",
      "mockUsers[184]",
      "mockUsers[174]",
      "mockUsers[108]",
      "mockUsers[0]",
      "mockUsers[163]",
      "mockUsers[140]",
      "mockUsers[3]",
      "mockUsers[28]"
    ],
    "approvedParticipants": [
      "mockUsers[127]",
      "mockUsers[78]",
      "mockUsers[184]",
      "mockUsers[174]",
      "mockUsers[108]",
      "mockUsers[0]",
      "mockUsers[163]",
      "mockUsers[140]",
      "mockUsers[3]",
      "mockUsers[28]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1089",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[87].id",
    "host": "mockUsers[87]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-15T19:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[87]",
      "mockUsers[167]",
      "mockUsers[39]",
      "mockUsers[177]",
      "mockUsers[134]",
      "mockUsers[194]",
      "mockUsers[60]",
      "mockUsers[11]",
      "mockUsers[33]",
      "mockUsers[46]",
      "mockUsers[191]"
    ],
    "approvedParticipants": [
      "mockUsers[87]",
      "mockUsers[167]",
      "mockUsers[39]",
      "mockUsers[177]",
      "mockUsers[134]",
      "mockUsers[194]",
      "mockUsers[60]",
      "mockUsers[11]",
      "mockUsers[33]",
      "mockUsers[46]",
      "mockUsers[191]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1090",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[26].id",
    "host": "mockUsers[26]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-24T07:00:00",
    "duration": 90,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[26]",
      "mockUsers[87]",
      "mockUsers[157]",
      "mockUsers[94]",
      "mockUsers[153]",
      "mockUsers[148]",
      "mockUsers[112]"
    ],
    "approvedParticipants": [
      "mockUsers[26]",
      "mockUsers[87]",
      "mockUsers[157]",
      "mockUsers[94]",
      "mockUsers[153]",
      "mockUsers[148]",
      "mockUsers[112]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1091",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[193].id",
    "host": "mockUsers[193]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-07-16T09:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[193]",
      "mockUsers[194]",
      "mockUsers[156]",
      "mockUsers[104]",
      "mockUsers[39]",
      "mockUsers[84]",
      "mockUsers[142]",
      "mockUsers[157]"
    ],
    "approvedParticipants": [
      "mockUsers[193]",
      "mockUsers[194]",
      "mockUsers[156]",
      "mockUsers[104]",
      "mockUsers[39]",
      "mockUsers[84]",
      "mockUsers[142]",
      "mockUsers[157]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1092",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[47].id",
    "host": "mockUsers[47]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-30T19:00:00",
    "duration": 90,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[47]",
      "mockUsers[64]",
      "mockUsers[16]",
      "mockUsers[62]",
      "mockUsers[171]",
      "mockUsers[57]"
    ],
    "approvedParticipants": [
      "mockUsers[47]",
      "mockUsers[64]",
      "mockUsers[16]",
      "mockUsers[62]",
      "mockUsers[171]",
      "mockUsers[57]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1093",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[103].id",
    "host": "mockUsers[103]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-04T17:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[103]",
      "mockUsers[26]",
      "mockUsers[10]",
      "mockUsers[152]",
      "mockUsers[13]",
      "mockUsers[15]"
    ],
    "approvedParticipants": [
      "mockUsers[103]",
      "mockUsers[26]",
      "mockUsers[10]",
      "mockUsers[152]",
      "mockUsers[13]",
      "mockUsers[15]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1094",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[196].id",
    "host": "mockUsers[196]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-10T19:00:00",
    "duration": 90,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[196]",
      "mockUsers[98]",
      "mockUsers[9]",
      "mockUsers[158]",
      "mockUsers[52]",
      "mockUsers[175]",
      "mockUsers[30]",
      "mockUsers[70]",
      "mockUsers[143]",
      "mockUsers[160]"
    ],
    "approvedParticipants": [
      "mockUsers[196]",
      "mockUsers[98]",
      "mockUsers[9]",
      "mockUsers[158]",
      "mockUsers[52]",
      "mockUsers[175]",
      "mockUsers[30]",
      "mockUsers[70]",
      "mockUsers[143]",
      "mockUsers[160]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1095",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[151].id",
    "host": "mockUsers[151]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-07-29T19:00:00",
    "duration": 120,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[151]",
      "mockUsers[169]",
      "mockUsers[149]",
      "mockUsers[166]",
      "mockUsers[99]",
      "mockUsers[29]",
      "mockUsers[0]"
    ],
    "approvedParticipants": [
      "mockUsers[151]",
      "mockUsers[169]",
      "mockUsers[149]",
      "mockUsers[166]",
      "mockUsers[99]",
      "mockUsers[29]",
      "mockUsers[0]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1096",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[117].id",
    "host": "mockUsers[117]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-27T07:00:00",
    "duration": 90,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[117]",
      "mockUsers[66]",
      "mockUsers[48]",
      "mockUsers[71]",
      "mockUsers[2]",
      "mockUsers[126]"
    ],
    "approvedParticipants": [
      "mockUsers[117]",
      "mockUsers[66]",
      "mockUsers[48]",
      "mockUsers[71]",
      "mockUsers[2]",
      "mockUsers[126]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1097",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[26].id",
    "host": "mockUsers[26]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-18T17:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[26]",
      "mockUsers[197]",
      "mockUsers[28]",
      "mockUsers[52]",
      "mockUsers[136]",
      "mockUsers[98]",
      "mockUsers[105]",
      "mockUsers[156]"
    ],
    "approvedParticipants": [
      "mockUsers[26]",
      "mockUsers[197]",
      "mockUsers[28]",
      "mockUsers[52]",
      "mockUsers[136]",
      "mockUsers[98]",
      "mockUsers[105]",
      "mockUsers[156]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1098",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[28].id",
    "host": "mockUsers[28]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-09T17:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[28]",
      "mockUsers[148]",
      "mockUsers[56]",
      "mockUsers[194]",
      "mockUsers[59]",
      "mockUsers[120]"
    ],
    "approvedParticipants": [
      "mockUsers[28]",
      "mockUsers[148]",
      "mockUsers[56]",
      "mockUsers[194]",
      "mockUsers[59]",
      "mockUsers[120]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1099",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[179].id",
    "host": "mockUsers[179]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-07-22T19:00:00",
    "duration": 90,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[179]",
      "mockUsers[151]",
      "mockUsers[111]",
      "mockUsers[79]",
      "mockUsers[75]",
      "mockUsers[91]",
      "mockUsers[47]"
    ],
    "approvedParticipants": [
      "mockUsers[179]",
      "mockUsers[151]",
      "mockUsers[111]",
      "mockUsers[79]",
      "mockUsers[75]",
      "mockUsers[91]",
      "mockUsers[47]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1100",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[186].id",
    "host": "mockUsers[186]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-02T09:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[186]",
      "mockUsers[153]",
      "mockUsers[187]",
      "mockUsers[43]",
      "mockUsers[77]"
    ],
    "approvedParticipants": [
      "mockUsers[186]",
      "mockUsers[153]",
      "mockUsers[187]",
      "mockUsers[43]",
      "mockUsers[77]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1101",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[107].id",
    "host": "mockUsers[107]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-22T17:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[107]",
      "mockUsers[192]",
      "mockUsers[61]",
      "mockUsers[48]",
      "mockUsers[62]",
      "mockUsers[106]",
      "mockUsers[126]",
      "mockUsers[80]",
      "mockUsers[63]"
    ],
    "approvedParticipants": [
      "mockUsers[107]",
      "mockUsers[192]",
      "mockUsers[61]",
      "mockUsers[48]",
      "mockUsers[62]",
      "mockUsers[106]",
      "mockUsers[126]",
      "mockUsers[80]",
      "mockUsers[63]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1102",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[69].id",
    "host": "mockUsers[69]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-03T19:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[69]",
      "mockUsers[24]",
      "mockUsers[183]",
      "mockUsers[107]",
      "mockUsers[34]"
    ],
    "approvedParticipants": [
      "mockUsers[69]",
      "mockUsers[24]",
      "mockUsers[183]",
      "mockUsers[107]",
      "mockUsers[34]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1103",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[16].id",
    "host": "mockUsers[16]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-21T18:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[16]",
      "mockUsers[139]",
      "mockUsers[83]",
      "mockUsers[50]",
      "mockUsers[132]",
      "mockUsers[152]",
      "mockUsers[26]",
      "mockUsers[6]",
      "mockUsers[168]",
      "mockUsers[62]",
      "mockUsers[12]"
    ],
    "approvedParticipants": [
      "mockUsers[16]",
      "mockUsers[139]",
      "mockUsers[83]",
      "mockUsers[50]",
      "mockUsers[132]",
      "mockUsers[152]",
      "mockUsers[26]",
      "mockUsers[6]",
      "mockUsers[168]",
      "mockUsers[62]",
      "mockUsers[12]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1104",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[191].id",
    "host": "mockUsers[191]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-12T18:00:00",
    "duration": 120,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[191]",
      "mockUsers[18]",
      "mockUsers[47]",
      "mockUsers[84]",
      "mockUsers[67]",
      "mockUsers[29]",
      "mockUsers[145]"
    ],
    "approvedParticipants": [
      "mockUsers[191]",
      "mockUsers[18]",
      "mockUsers[47]",
      "mockUsers[84]",
      "mockUsers[67]",
      "mockUsers[29]",
      "mockUsers[145]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1105",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[197].id",
    "host": "mockUsers[197]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-21T18:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[197]",
      "mockUsers[1]",
      "mockUsers[18]",
      "mockUsers[198]",
      "mockUsers[62]",
      "mockUsers[110]",
      "mockUsers[28]",
      "mockUsers[97]"
    ],
    "approvedParticipants": [
      "mockUsers[197]",
      "mockUsers[1]",
      "mockUsers[18]",
      "mockUsers[198]",
      "mockUsers[62]",
      "mockUsers[110]",
      "mockUsers[28]",
      "mockUsers[97]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1106",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[72].id",
    "host": "mockUsers[72]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-07-29T19:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[72]",
      "mockUsers[191]",
      "mockUsers[17]",
      "mockUsers[158]",
      "mockUsers[96]",
      "mockUsers[59]",
      "mockUsers[121]",
      "mockUsers[52]",
      "mockUsers[64]"
    ],
    "approvedParticipants": [
      "mockUsers[72]",
      "mockUsers[191]",
      "mockUsers[17]",
      "mockUsers[158]",
      "mockUsers[96]",
      "mockUsers[59]",
      "mockUsers[121]",
      "mockUsers[52]",
      "mockUsers[64]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1107",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[97].id",
    "host": "mockUsers[97]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-07T19:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[97]",
      "mockUsers[0]",
      "mockUsers[115]",
      "mockUsers[167]",
      "mockUsers[108]"
    ],
    "approvedParticipants": [
      "mockUsers[97]",
      "mockUsers[0]",
      "mockUsers[115]",
      "mockUsers[167]",
      "mockUsers[108]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1108",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[101].id",
    "host": "mockUsers[101]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-21T07:00:00",
    "duration": 60,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[101]",
      "mockUsers[102]",
      "mockUsers[69]",
      "mockUsers[4]",
      "mockUsers[148]",
      "mockUsers[89]",
      "mockUsers[111]",
      "mockUsers[88]"
    ],
    "approvedParticipants": [
      "mockUsers[101]",
      "mockUsers[102]",
      "mockUsers[69]",
      "mockUsers[4]",
      "mockUsers[148]",
      "mockUsers[89]",
      "mockUsers[111]",
      "mockUsers[88]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1109",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[17].id",
    "host": "mockUsers[17]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-28T09:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[17]",
      "mockUsers[157]",
      "mockUsers[118]",
      "mockUsers[59]",
      "mockUsers[161]",
      "mockUsers[126]",
      "mockUsers[52]",
      "mockUsers[120]"
    ],
    "approvedParticipants": [
      "mockUsers[17]",
      "mockUsers[157]",
      "mockUsers[118]",
      "mockUsers[59]",
      "mockUsers[161]",
      "mockUsers[126]",
      "mockUsers[52]",
      "mockUsers[120]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1110",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[162].id",
    "host": "mockUsers[162]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-15T09:00:00",
    "duration": 120,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[162]",
      "mockUsers[49]",
      "mockUsers[194]",
      "mockUsers[142]",
      "mockUsers[160]",
      "mockUsers[0]",
      "mockUsers[36]",
      "mockUsers[181]",
      "mockUsers[27]"
    ],
    "approvedParticipants": [
      "mockUsers[162]",
      "mockUsers[49]",
      "mockUsers[194]",
      "mockUsers[142]",
      "mockUsers[160]",
      "mockUsers[0]",
      "mockUsers[36]",
      "mockUsers[181]",
      "mockUsers[27]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1111",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[26].id",
    "host": "mockUsers[26]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-13T07:00:00",
    "duration": 90,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[26]",
      "mockUsers[126]",
      "mockUsers[106]",
      "mockUsers[170]",
      "mockUsers[184]",
      "mockUsers[17]",
      "mockUsers[151]",
      "mockUsers[145]",
      "mockUsers[138]",
      "mockUsers[123]",
      "mockUsers[6]"
    ],
    "approvedParticipants": [
      "mockUsers[26]",
      "mockUsers[126]",
      "mockUsers[106]",
      "mockUsers[170]",
      "mockUsers[184]",
      "mockUsers[17]",
      "mockUsers[151]",
      "mockUsers[145]",
      "mockUsers[138]",
      "mockUsers[123]",
      "mockUsers[6]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1112",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[141].id",
    "host": "mockUsers[141]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-07-21T18:00:00",
    "duration": 90,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[141]",
      "mockUsers[170]",
      "mockUsers[133]",
      "mockUsers[46]",
      "mockUsers[91]",
      "mockUsers[182]",
      "mockUsers[164]"
    ],
    "approvedParticipants": [
      "mockUsers[141]",
      "mockUsers[170]",
      "mockUsers[133]",
      "mockUsers[46]",
      "mockUsers[91]",
      "mockUsers[182]",
      "mockUsers[164]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1113",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[33].id",
    "host": "mockUsers[33]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-10T09:00:00",
    "duration": 90,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[33]",
      "mockUsers[120]",
      "mockUsers[194]",
      "mockUsers[178]",
      "mockUsers[82]",
      "mockUsers[47]"
    ],
    "approvedParticipants": [
      "mockUsers[33]",
      "mockUsers[120]",
      "mockUsers[194]",
      "mockUsers[178]",
      "mockUsers[82]",
      "mockUsers[47]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1114",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[140].id",
    "host": "mockUsers[140]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-07-29T09:00:00",
    "duration": 90,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[140]",
      "mockUsers[114]",
      "mockUsers[88]",
      "mockUsers[172]",
      "mockUsers[194]",
      "mockUsers[87]",
      "mockUsers[184]",
      "mockUsers[18]",
      "mockUsers[166]"
    ],
    "approvedParticipants": [
      "mockUsers[140]",
      "mockUsers[114]",
      "mockUsers[88]",
      "mockUsers[172]",
      "mockUsers[194]",
      "mockUsers[87]",
      "mockUsers[184]",
      "mockUsers[18]",
      "mockUsers[166]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1115",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[113].id",
    "host": "mockUsers[113]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-21T19:00:00",
    "duration": 60,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[113]",
      "mockUsers[75]",
      "mockUsers[44]",
      "mockUsers[167]",
      "mockUsers[72]"
    ],
    "approvedParticipants": [
      "mockUsers[113]",
      "mockUsers[75]",
      "mockUsers[44]",
      "mockUsers[167]",
      "mockUsers[72]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1116",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[136].id",
    "host": "mockUsers[136]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-09T07:00:00",
    "duration": 90,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[136]",
      "mockUsers[58]",
      "mockUsers[82]",
      "mockUsers[132]",
      "mockUsers[1]",
      "mockUsers[158]",
      "mockUsers[102]",
      "mockUsers[64]",
      "mockUsers[199]",
      "mockUsers[169]",
      "mockUsers[54]"
    ],
    "approvedParticipants": [
      "mockUsers[136]",
      "mockUsers[58]",
      "mockUsers[82]",
      "mockUsers[132]",
      "mockUsers[1]",
      "mockUsers[158]",
      "mockUsers[102]",
      "mockUsers[64]",
      "mockUsers[199]",
      "mockUsers[169]",
      "mockUsers[54]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1117",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[0].id",
    "host": "mockUsers[0]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-08T07:00:00",
    "duration": 120,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[0]",
      "mockUsers[33]",
      "mockUsers[6]",
      "mockUsers[58]"
    ],
    "approvedParticipants": [
      "mockUsers[0]",
      "mockUsers[33]",
      "mockUsers[6]",
      "mockUsers[58]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1118",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[6].id",
    "host": "mockUsers[6]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-07T07:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[6]",
      "mockUsers[85]",
      "mockUsers[86]",
      "mockUsers[120]"
    ],
    "approvedParticipants": [
      "mockUsers[6]",
      "mockUsers[85]",
      "mockUsers[86]",
      "mockUsers[120]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1119",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[37].id",
    "host": "mockUsers[37]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-17T09:00:00",
    "duration": 90,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[37]",
      "mockUsers[54]",
      "mockUsers[191]",
      "mockUsers[120]",
      "mockUsers[171]",
      "mockUsers[157]",
      "mockUsers[151]",
      "mockUsers[61]",
      "mockUsers[149]",
      "mockUsers[172]",
      "mockUsers[138]"
    ],
    "approvedParticipants": [
      "mockUsers[37]",
      "mockUsers[54]",
      "mockUsers[191]",
      "mockUsers[120]",
      "mockUsers[171]",
      "mockUsers[157]",
      "mockUsers[151]",
      "mockUsers[61]",
      "mockUsers[149]",
      "mockUsers[172]",
      "mockUsers[138]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1120",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[178].id",
    "host": "mockUsers[178]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-21T17:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[178]",
      "mockUsers[35]",
      "mockUsers[140]",
      "mockUsers[33]",
      "mockUsers[21]",
      "mockUsers[129]",
      "mockUsers[159]",
      "mockUsers[123]"
    ],
    "approvedParticipants": [
      "mockUsers[178]",
      "mockUsers[35]",
      "mockUsers[140]",
      "mockUsers[33]",
      "mockUsers[21]",
      "mockUsers[129]",
      "mockUsers[159]",
      "mockUsers[123]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1121",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[42].id",
    "host": "mockUsers[42]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-16T18:00:00",
    "duration": 90,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[42]",
      "mockUsers[193]",
      "mockUsers[18]",
      "mockUsers[1]",
      "mockUsers[37]",
      "mockUsers[51]",
      "mockUsers[171]",
      "mockUsers[84]",
      "mockUsers[189]",
      "mockUsers[92]"
    ],
    "approvedParticipants": [
      "mockUsers[42]",
      "mockUsers[193]",
      "mockUsers[18]",
      "mockUsers[1]",
      "mockUsers[37]",
      "mockUsers[51]",
      "mockUsers[171]",
      "mockUsers[84]",
      "mockUsers[189]",
      "mockUsers[92]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1122",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[98].id",
    "host": "mockUsers[98]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-10T18:00:00",
    "duration": 90,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[98]",
      "mockUsers[79]",
      "mockUsers[15]",
      "mockUsers[189]"
    ],
    "approvedParticipants": [
      "mockUsers[98]",
      "mockUsers[79]",
      "mockUsers[15]",
      "mockUsers[189]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1123",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[190].id",
    "host": "mockUsers[190]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-06T07:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[190]",
      "mockUsers[18]",
      "mockUsers[175]",
      "mockUsers[128]"
    ],
    "approvedParticipants": [
      "mockUsers[190]",
      "mockUsers[18]",
      "mockUsers[175]",
      "mockUsers[128]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1124",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[192].id",
    "host": "mockUsers[192]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-07-28T18:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[192]",
      "mockUsers[2]",
      "mockUsers[110]",
      "mockUsers[84]",
      "mockUsers[29]",
      "mockUsers[13]",
      "mockUsers[101]",
      "mockUsers[169]"
    ],
    "approvedParticipants": [
      "mockUsers[192]",
      "mockUsers[2]",
      "mockUsers[110]",
      "mockUsers[84]",
      "mockUsers[29]",
      "mockUsers[13]",
      "mockUsers[101]",
      "mockUsers[169]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1125",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[53].id",
    "host": "mockUsers[53]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-23T09:00:00",
    "duration": 90,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[53]",
      "mockUsers[90]",
      "mockUsers[155]",
      "mockUsers[12]",
      "mockUsers[175]",
      "mockUsers[167]"
    ],
    "approvedParticipants": [
      "mockUsers[53]",
      "mockUsers[90]",
      "mockUsers[155]",
      "mockUsers[12]",
      "mockUsers[175]",
      "mockUsers[167]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1126",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[151].id",
    "host": "mockUsers[151]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-07-27T09:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[151]",
      "mockUsers[6]",
      "mockUsers[164]",
      "mockUsers[92]",
      "mockUsers[194]"
    ],
    "approvedParticipants": [
      "mockUsers[151]",
      "mockUsers[6]",
      "mockUsers[164]",
      "mockUsers[92]",
      "mockUsers[194]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1127",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[23].id",
    "host": "mockUsers[23]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-07-31T19:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[23]",
      "mockUsers[92]",
      "mockUsers[29]",
      "mockUsers[109]",
      "mockUsers[123]",
      "mockUsers[2]",
      "mockUsers[9]",
      "mockUsers[196]",
      "mockUsers[120]",
      "mockUsers[134]",
      "mockUsers[179]"
    ],
    "approvedParticipants": [
      "mockUsers[23]",
      "mockUsers[92]",
      "mockUsers[29]",
      "mockUsers[109]",
      "mockUsers[123]",
      "mockUsers[2]",
      "mockUsers[9]",
      "mockUsers[196]",
      "mockUsers[120]",
      "mockUsers[134]",
      "mockUsers[179]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1128",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[146].id",
    "host": "mockUsers[146]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-07-20T19:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[146]",
      "mockUsers[189]",
      "mockUsers[78]",
      "mockUsers[104]",
      "mockUsers[100]",
      "mockUsers[30]",
      "mockUsers[147]",
      "mockUsers[24]",
      "mockUsers[95]",
      "mockUsers[29]",
      "mockUsers[74]"
    ],
    "approvedParticipants": [
      "mockUsers[146]",
      "mockUsers[189]",
      "mockUsers[78]",
      "mockUsers[104]",
      "mockUsers[100]",
      "mockUsers[30]",
      "mockUsers[147]",
      "mockUsers[24]",
      "mockUsers[95]",
      "mockUsers[29]",
      "mockUsers[74]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1129",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[175].id",
    "host": "mockUsers[175]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-12T09:00:00",
    "duration": 60,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[175]",
      "mockUsers[181]",
      "mockUsers[81]",
      "mockUsers[84]",
      "mockUsers[134]",
      "mockUsers[128]",
      "mockUsers[147]"
    ],
    "approvedParticipants": [
      "mockUsers[175]",
      "mockUsers[181]",
      "mockUsers[81]",
      "mockUsers[84]",
      "mockUsers[134]",
      "mockUsers[128]",
      "mockUsers[147]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1130",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[191].id",
    "host": "mockUsers[191]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-07-27T17:00:00",
    "duration": 90,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[191]",
      "mockUsers[51]",
      "mockUsers[43]",
      "mockUsers[32]",
      "mockUsers[45]",
      "mockUsers[151]",
      "mockUsers[17]"
    ],
    "approvedParticipants": [
      "mockUsers[191]",
      "mockUsers[51]",
      "mockUsers[43]",
      "mockUsers[32]",
      "mockUsers[45]",
      "mockUsers[151]",
      "mockUsers[17]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1131",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[46].id",
    "host": "mockUsers[46]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-16T18:00:00",
    "duration": 120,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[46]",
      "mockUsers[117]",
      "mockUsers[142]",
      "mockUsers[188]",
      "mockUsers[25]",
      "mockUsers[164]",
      "mockUsers[122]",
      "mockUsers[84]",
      "mockUsers[79]",
      "mockUsers[65]"
    ],
    "approvedParticipants": [
      "mockUsers[46]",
      "mockUsers[117]",
      "mockUsers[142]",
      "mockUsers[188]",
      "mockUsers[25]",
      "mockUsers[164]",
      "mockUsers[122]",
      "mockUsers[84]",
      "mockUsers[79]",
      "mockUsers[65]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1132",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[78].id",
    "host": "mockUsers[78]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-29T07:00:00",
    "duration": 120,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[78]",
      "mockUsers[174]",
      "mockUsers[77]",
      "mockUsers[18]",
      "mockUsers[184]",
      "mockUsers[55]",
      "mockUsers[106]",
      "mockUsers[66]",
      "mockUsers[13]",
      "mockUsers[44]"
    ],
    "approvedParticipants": [
      "mockUsers[78]",
      "mockUsers[174]",
      "mockUsers[77]",
      "mockUsers[18]",
      "mockUsers[184]",
      "mockUsers[55]",
      "mockUsers[106]",
      "mockUsers[66]",
      "mockUsers[13]",
      "mockUsers[44]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1133",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[94].id",
    "host": "mockUsers[94]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-07-23T07:00:00",
    "duration": 60,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[94]",
      "mockUsers[150]",
      "mockUsers[198]",
      "mockUsers[81]",
      "mockUsers[146]",
      "mockUsers[186]"
    ],
    "approvedParticipants": [
      "mockUsers[94]",
      "mockUsers[150]",
      "mockUsers[198]",
      "mockUsers[81]",
      "mockUsers[146]",
      "mockUsers[186]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1134",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[120].id",
    "host": "mockUsers[120]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-30T19:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[120]",
      "mockUsers[115]",
      "mockUsers[12]",
      "mockUsers[8]",
      "mockUsers[168]",
      "mockUsers[118]",
      "mockUsers[167]",
      "mockUsers[50]"
    ],
    "approvedParticipants": [
      "mockUsers[120]",
      "mockUsers[115]",
      "mockUsers[12]",
      "mockUsers[8]",
      "mockUsers[168]",
      "mockUsers[118]",
      "mockUsers[167]",
      "mockUsers[50]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1135",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[152].id",
    "host": "mockUsers[152]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-27T19:00:00",
    "duration": 60,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[152]",
      "mockUsers[192]",
      "mockUsers[180]",
      "mockUsers[12]",
      "mockUsers[102]",
      "mockUsers[120]",
      "mockUsers[35]",
      "mockUsers[20]"
    ],
    "approvedParticipants": [
      "mockUsers[152]",
      "mockUsers[192]",
      "mockUsers[180]",
      "mockUsers[12]",
      "mockUsers[102]",
      "mockUsers[120]",
      "mockUsers[35]",
      "mockUsers[20]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1136",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[1].id",
    "host": "mockUsers[1]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-23T17:00:00",
    "duration": 90,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[1]",
      "mockUsers[91]",
      "mockUsers[106]",
      "mockUsers[110]",
      "mockUsers[101]",
      "mockUsers[9]",
      "mockUsers[22]",
      "mockUsers[188]",
      "mockUsers[199]",
      "mockUsers[78]"
    ],
    "approvedParticipants": [
      "mockUsers[1]",
      "mockUsers[91]",
      "mockUsers[106]",
      "mockUsers[110]",
      "mockUsers[101]",
      "mockUsers[9]",
      "mockUsers[22]",
      "mockUsers[188]",
      "mockUsers[199]",
      "mockUsers[78]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1137",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[75].id",
    "host": "mockUsers[75]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-20T19:00:00",
    "duration": 90,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[75]",
      "mockUsers[65]",
      "mockUsers[145]",
      "mockUsers[161]",
      "mockUsers[120]",
      "mockUsers[148]",
      "mockUsers[179]",
      "mockUsers[137]",
      "mockUsers[196]",
      "mockUsers[104]",
      "mockUsers[34]"
    ],
    "approvedParticipants": [
      "mockUsers[75]",
      "mockUsers[65]",
      "mockUsers[145]",
      "mockUsers[161]",
      "mockUsers[120]",
      "mockUsers[148]",
      "mockUsers[179]",
      "mockUsers[137]",
      "mockUsers[196]",
      "mockUsers[104]",
      "mockUsers[34]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1138",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[79].id",
    "host": "mockUsers[79]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-18T19:00:00",
    "duration": 60,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[79]",
      "mockUsers[67]",
      "mockUsers[158]",
      "mockUsers[14]",
      "mockUsers[166]",
      "mockUsers[116]",
      "mockUsers[31]",
      "mockUsers[75]"
    ],
    "approvedParticipants": [
      "mockUsers[79]",
      "mockUsers[67]",
      "mockUsers[158]",
      "mockUsers[14]",
      "mockUsers[166]",
      "mockUsers[116]",
      "mockUsers[31]",
      "mockUsers[75]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1139",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[132].id",
    "host": "mockUsers[132]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-01T17:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[132]",
      "mockUsers[192]",
      "mockUsers[113]",
      "mockUsers[89]",
      "mockUsers[92]",
      "mockUsers[2]",
      "mockUsers[198]",
      "mockUsers[95]"
    ],
    "approvedParticipants": [
      "mockUsers[132]",
      "mockUsers[192]",
      "mockUsers[113]",
      "mockUsers[89]",
      "mockUsers[92]",
      "mockUsers[2]",
      "mockUsers[198]",
      "mockUsers[95]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1140",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[32].id",
    "host": "mockUsers[32]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-13T09:00:00",
    "duration": 120,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[32]",
      "mockUsers[76]",
      "mockUsers[109]",
      "mockUsers[165]"
    ],
    "approvedParticipants": [
      "mockUsers[32]",
      "mockUsers[76]",
      "mockUsers[109]",
      "mockUsers[165]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1141",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[113].id",
    "host": "mockUsers[113]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-19T09:00:00",
    "duration": 60,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[113]",
      "mockUsers[168]",
      "mockUsers[194]",
      "mockUsers[64]",
      "mockUsers[107]",
      "mockUsers[3]",
      "mockUsers[103]"
    ],
    "approvedParticipants": [
      "mockUsers[113]",
      "mockUsers[168]",
      "mockUsers[194]",
      "mockUsers[64]",
      "mockUsers[107]",
      "mockUsers[3]",
      "mockUsers[103]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1142",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[151].id",
    "host": "mockUsers[151]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-23T07:00:00",
    "duration": 60,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[151]",
      "mockUsers[69]",
      "mockUsers[21]",
      "mockUsers[105]",
      "mockUsers[108]",
      "mockUsers[197]",
      "mockUsers[167]",
      "mockUsers[195]",
      "mockUsers[148]",
      "mockUsers[145]",
      "mockUsers[72]"
    ],
    "approvedParticipants": [
      "mockUsers[151]",
      "mockUsers[69]",
      "mockUsers[21]",
      "mockUsers[105]",
      "mockUsers[108]",
      "mockUsers[197]",
      "mockUsers[167]",
      "mockUsers[195]",
      "mockUsers[148]",
      "mockUsers[145]",
      "mockUsers[72]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1143",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[103].id",
    "host": "mockUsers[103]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-04T18:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[103]",
      "mockUsers[51]",
      "mockUsers[21]",
      "mockUsers[1]",
      "mockUsers[93]",
      "mockUsers[81]",
      "mockUsers[149]",
      "mockUsers[8]"
    ],
    "approvedParticipants": [
      "mockUsers[103]",
      "mockUsers[51]",
      "mockUsers[21]",
      "mockUsers[1]",
      "mockUsers[93]",
      "mockUsers[81]",
      "mockUsers[149]",
      "mockUsers[8]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1144",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[97].id",
    "host": "mockUsers[97]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-04T09:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[97]",
      "mockUsers[180]",
      "mockUsers[10]",
      "mockUsers[139]",
      "mockUsers[148]",
      "mockUsers[156]"
    ],
    "approvedParticipants": [
      "mockUsers[97]",
      "mockUsers[180]",
      "mockUsers[10]",
      "mockUsers[139]",
      "mockUsers[148]",
      "mockUsers[156]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1145",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[143].id",
    "host": "mockUsers[143]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-10T07:00:00",
    "duration": 60,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[143]",
      "mockUsers[75]",
      "mockUsers[71]",
      "mockUsers[116]",
      "mockUsers[80]",
      "mockUsers[87]"
    ],
    "approvedParticipants": [
      "mockUsers[143]",
      "mockUsers[75]",
      "mockUsers[71]",
      "mockUsers[116]",
      "mockUsers[80]",
      "mockUsers[87]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1146",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[146].id",
    "host": "mockUsers[146]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-15T07:00:00",
    "duration": 90,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[146]",
      "mockUsers[95]",
      "mockUsers[22]",
      "mockUsers[100]",
      "mockUsers[25]",
      "mockUsers[156]",
      "mockUsers[168]",
      "mockUsers[1]",
      "mockUsers[104]",
      "mockUsers[187]"
    ],
    "approvedParticipants": [
      "mockUsers[146]",
      "mockUsers[95]",
      "mockUsers[22]",
      "mockUsers[100]",
      "mockUsers[25]",
      "mockUsers[156]",
      "mockUsers[168]",
      "mockUsers[1]",
      "mockUsers[104]",
      "mockUsers[187]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1147",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[62].id",
    "host": "mockUsers[62]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-01T09:00:00",
    "duration": 120,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[62]",
      "mockUsers[165]",
      "mockUsers[55]",
      "mockUsers[48]",
      "mockUsers[161]",
      "mockUsers[193]",
      "mockUsers[90]"
    ],
    "approvedParticipants": [
      "mockUsers[62]",
      "mockUsers[165]",
      "mockUsers[55]",
      "mockUsers[48]",
      "mockUsers[161]",
      "mockUsers[193]",
      "mockUsers[90]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1148",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[32].id",
    "host": "mockUsers[32]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-11T17:00:00",
    "duration": 60,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[32]",
      "mockUsers[13]",
      "mockUsers[127]",
      "mockUsers[78]",
      "mockUsers[141]"
    ],
    "approvedParticipants": [
      "mockUsers[32]",
      "mockUsers[13]",
      "mockUsers[127]",
      "mockUsers[78]",
      "mockUsers[141]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1149",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[19].id",
    "host": "mockUsers[19]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-21T07:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[19]",
      "mockUsers[57]",
      "mockUsers[191]",
      "mockUsers[32]",
      "mockUsers[13]",
      "mockUsers[184]",
      "mockUsers[23]",
      "mockUsers[77]",
      "mockUsers[173]"
    ],
    "approvedParticipants": [
      "mockUsers[19]",
      "mockUsers[57]",
      "mockUsers[191]",
      "mockUsers[32]",
      "mockUsers[13]",
      "mockUsers[184]",
      "mockUsers[23]",
      "mockUsers[77]",
      "mockUsers[173]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1150",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[26].id",
    "host": "mockUsers[26]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-20T09:00:00",
    "duration": 60,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[26]",
      "mockUsers[73]",
      "mockUsers[109]",
      "mockUsers[56]",
      "mockUsers[177]",
      "mockUsers[54]",
      "mockUsers[78]",
      "mockUsers[155]",
      "mockUsers[147]",
      "mockUsers[182]",
      "mockUsers[74]"
    ],
    "approvedParticipants": [
      "mockUsers[26]",
      "mockUsers[73]",
      "mockUsers[109]",
      "mockUsers[56]",
      "mockUsers[177]",
      "mockUsers[54]",
      "mockUsers[78]",
      "mockUsers[155]",
      "mockUsers[147]",
      "mockUsers[182]",
      "mockUsers[74]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1151",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[88].id",
    "host": "mockUsers[88]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-04T07:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[88]",
      "mockUsers[194]",
      "mockUsers[23]",
      "mockUsers[15]",
      "mockUsers[52]",
      "mockUsers[4]",
      "mockUsers[184]",
      "mockUsers[98]",
      "mockUsers[19]",
      "mockUsers[26]",
      "mockUsers[50]"
    ],
    "approvedParticipants": [
      "mockUsers[88]",
      "mockUsers[194]",
      "mockUsers[23]",
      "mockUsers[15]",
      "mockUsers[52]",
      "mockUsers[4]",
      "mockUsers[184]",
      "mockUsers[98]",
      "mockUsers[19]",
      "mockUsers[26]",
      "mockUsers[50]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1152",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[163].id",
    "host": "mockUsers[163]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-07-29T07:00:00",
    "duration": 90,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[163]",
      "mockUsers[195]",
      "mockUsers[101]",
      "mockUsers[40]",
      "mockUsers[170]",
      "mockUsers[95]",
      "mockUsers[7]",
      "mockUsers[60]",
      "mockUsers[46]",
      "mockUsers[166]",
      "mockUsers[184]"
    ],
    "approvedParticipants": [
      "mockUsers[163]",
      "mockUsers[195]",
      "mockUsers[101]",
      "mockUsers[40]",
      "mockUsers[170]",
      "mockUsers[95]",
      "mockUsers[7]",
      "mockUsers[60]",
      "mockUsers[46]",
      "mockUsers[166]",
      "mockUsers[184]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1153",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[74].id",
    "host": "mockUsers[74]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-02T09:00:00",
    "duration": 120,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[74]",
      "mockUsers[77]",
      "mockUsers[131]",
      "mockUsers[25]"
    ],
    "approvedParticipants": [
      "mockUsers[74]",
      "mockUsers[77]",
      "mockUsers[131]",
      "mockUsers[25]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1154",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[124].id",
    "host": "mockUsers[124]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-08-03T19:00:00",
    "duration": 60,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[124]",
      "mockUsers[114]",
      "mockUsers[147]",
      "mockUsers[167]",
      "mockUsers[170]"
    ],
    "approvedParticipants": [
      "mockUsers[124]",
      "mockUsers[114]",
      "mockUsers[147]",
      "mockUsers[167]",
      "mockUsers[170]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1155",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[42].id",
    "host": "mockUsers[42]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-16T17:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[42]",
      "mockUsers[62]",
      "mockUsers[70]",
      "mockUsers[115]"
    ],
    "approvedParticipants": [
      "mockUsers[42]",
      "mockUsers[62]",
      "mockUsers[70]",
      "mockUsers[115]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1156",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[180].id",
    "host": "mockUsers[180]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-23T07:00:00",
    "duration": 120,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[180]",
      "mockUsers[145]",
      "mockUsers[128]",
      "mockUsers[54]"
    ],
    "approvedParticipants": [
      "mockUsers[180]",
      "mockUsers[145]",
      "mockUsers[128]",
      "mockUsers[54]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1157",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[136].id",
    "host": "mockUsers[136]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-04T18:00:00",
    "duration": 60,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[136]",
      "mockUsers[118]",
      "mockUsers[145]",
      "mockUsers[198]",
      "mockUsers[122]",
      "mockUsers[156]",
      "mockUsers[177]",
      "mockUsers[18]",
      "mockUsers[183]",
      "mockUsers[142]",
      "mockUsers[126]"
    ],
    "approvedParticipants": [
      "mockUsers[136]",
      "mockUsers[118]",
      "mockUsers[145]",
      "mockUsers[198]",
      "mockUsers[122]",
      "mockUsers[156]",
      "mockUsers[177]",
      "mockUsers[18]",
      "mockUsers[183]",
      "mockUsers[142]",
      "mockUsers[126]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1158",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[179].id",
    "host": "mockUsers[179]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-07-17T07:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[179]",
      "mockUsers[185]",
      "mockUsers[42]",
      "mockUsers[54]",
      "mockUsers[162]",
      "mockUsers[182]",
      "mockUsers[38]",
      "mockUsers[20]",
      "mockUsers[189]"
    ],
    "approvedParticipants": [
      "mockUsers[179]",
      "mockUsers[185]",
      "mockUsers[42]",
      "mockUsers[54]",
      "mockUsers[162]",
      "mockUsers[182]",
      "mockUsers[38]",
      "mockUsers[20]",
      "mockUsers[189]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1159",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[85].id",
    "host": "mockUsers[85]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-07-21T19:00:00",
    "duration": 90,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[85]",
      "mockUsers[77]",
      "mockUsers[104]",
      "mockUsers[71]",
      "mockUsers[130]",
      "mockUsers[136]",
      "mockUsers[140]",
      "mockUsers[109]",
      "mockUsers[62]"
    ],
    "approvedParticipants": [
      "mockUsers[85]",
      "mockUsers[77]",
      "mockUsers[104]",
      "mockUsers[71]",
      "mockUsers[130]",
      "mockUsers[136]",
      "mockUsers[140]",
      "mockUsers[109]",
      "mockUsers[62]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1160",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[68].id",
    "host": "mockUsers[68]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-30T09:00:00",
    "duration": 60,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[68]",
      "mockUsers[25]",
      "mockUsers[81]",
      "mockUsers[76]",
      "mockUsers[154]",
      "mockUsers[63]",
      "mockUsers[87]",
      "mockUsers[139]",
      "mockUsers[41]",
      "mockUsers[136]"
    ],
    "approvedParticipants": [
      "mockUsers[68]",
      "mockUsers[25]",
      "mockUsers[81]",
      "mockUsers[76]",
      "mockUsers[154]",
      "mockUsers[63]",
      "mockUsers[87]",
      "mockUsers[139]",
      "mockUsers[41]",
      "mockUsers[136]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1161",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[161].id",
    "host": "mockUsers[161]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-04T18:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[161]",
      "mockUsers[10]",
      "mockUsers[130]",
      "mockUsers[64]",
      "mockUsers[171]",
      "mockUsers[113]",
      "mockUsers[65]",
      "mockUsers[186]"
    ],
    "approvedParticipants": [
      "mockUsers[161]",
      "mockUsers[10]",
      "mockUsers[130]",
      "mockUsers[64]",
      "mockUsers[171]",
      "mockUsers[113]",
      "mockUsers[65]",
      "mockUsers[186]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1162",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[13].id",
    "host": "mockUsers[13]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-15T18:00:00",
    "duration": 120,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[13]",
      "mockUsers[200]",
      "mockUsers[163]",
      "mockUsers[154]",
      "mockUsers[73]",
      "mockUsers[119]",
      "mockUsers[62]",
      "mockUsers[1]",
      "mockUsers[43]",
      "mockUsers[90]"
    ],
    "approvedParticipants": [
      "mockUsers[13]",
      "mockUsers[200]",
      "mockUsers[163]",
      "mockUsers[154]",
      "mockUsers[73]",
      "mockUsers[119]",
      "mockUsers[62]",
      "mockUsers[1]",
      "mockUsers[43]",
      "mockUsers[90]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1163",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[140].id",
    "host": "mockUsers[140]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-17T09:00:00",
    "duration": 60,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[140]",
      "mockUsers[62]",
      "mockUsers[71]",
      "mockUsers[129]",
      "mockUsers[114]",
      "mockUsers[30]",
      "mockUsers[199]",
      "mockUsers[79]"
    ],
    "approvedParticipants": [
      "mockUsers[140]",
      "mockUsers[62]",
      "mockUsers[71]",
      "mockUsers[129]",
      "mockUsers[114]",
      "mockUsers[30]",
      "mockUsers[199]",
      "mockUsers[79]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1164",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[103].id",
    "host": "mockUsers[103]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-07-19T19:00:00",
    "duration": 90,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[103]",
      "mockUsers[69]",
      "mockUsers[169]",
      "mockUsers[162]",
      "mockUsers[70]",
      "mockUsers[22]",
      "mockUsers[191]",
      "mockUsers[148]",
      "mockUsers[185]",
      "mockUsers[117]"
    ],
    "approvedParticipants": [
      "mockUsers[103]",
      "mockUsers[69]",
      "mockUsers[169]",
      "mockUsers[162]",
      "mockUsers[70]",
      "mockUsers[22]",
      "mockUsers[191]",
      "mockUsers[148]",
      "mockUsers[185]",
      "mockUsers[117]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1165",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[169].id",
    "host": "mockUsers[169]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-07-16T07:00:00",
    "duration": 90,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[169]",
      "mockUsers[78]",
      "mockUsers[130]",
      "mockUsers[172]",
      "mockUsers[199]",
      "mockUsers[184]",
      "mockUsers[158]",
      "mockUsers[156]",
      "mockUsers[15]"
    ],
    "approvedParticipants": [
      "mockUsers[169]",
      "mockUsers[78]",
      "mockUsers[130]",
      "mockUsers[172]",
      "mockUsers[199]",
      "mockUsers[184]",
      "mockUsers[158]",
      "mockUsers[156]",
      "mockUsers[15]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1166",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[7].id",
    "host": "mockUsers[7]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-25T19:00:00",
    "duration": 60,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[7]",
      "mockUsers[154]",
      "mockUsers[64]",
      "mockUsers[108]",
      "mockUsers[196]"
    ],
    "approvedParticipants": [
      "mockUsers[7]",
      "mockUsers[154]",
      "mockUsers[64]",
      "mockUsers[108]",
      "mockUsers[196]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1167",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[194].id",
    "host": "mockUsers[194]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-21T07:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[194]",
      "mockUsers[3]",
      "mockUsers[148]",
      "mockUsers[33]",
      "mockUsers[34]",
      "mockUsers[174]"
    ],
    "approvedParticipants": [
      "mockUsers[194]",
      "mockUsers[3]",
      "mockUsers[148]",
      "mockUsers[33]",
      "mockUsers[34]",
      "mockUsers[174]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1168",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[69].id",
    "host": "mockUsers[69]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-07-24T17:00:00",
    "duration": 120,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[69]",
      "mockUsers[85]",
      "mockUsers[180]",
      "mockUsers[107]",
      "mockUsers[164]",
      "mockUsers[97]",
      "mockUsers[50]",
      "mockUsers[9]"
    ],
    "approvedParticipants": [
      "mockUsers[69]",
      "mockUsers[85]",
      "mockUsers[180]",
      "mockUsers[107]",
      "mockUsers[164]",
      "mockUsers[97]",
      "mockUsers[50]",
      "mockUsers[9]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1169",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[176].id",
    "host": "mockUsers[176]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-12T07:00:00",
    "duration": 120,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[176]",
      "mockUsers[64]",
      "mockUsers[109]",
      "mockUsers[83]"
    ],
    "approvedParticipants": [
      "mockUsers[176]",
      "mockUsers[64]",
      "mockUsers[109]",
      "mockUsers[83]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1170",
    "title": "Anhor Park Rink Other Session",
    "sportType": "SportType.Other",
    "hostId": "mockUsers[117].id",
    "host": "mockUsers[117]",
    "location": {
      "address": "Labzak Street, Shaykhantaur",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.24
    },
    "dateTime": "2025-07-17T18:00:00",
    "duration": 90,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[117]",
      "mockUsers[115]",
      "mockUsers[29]",
      "mockUsers[66]",
      "mockUsers[194]",
      "mockUsers[140]"
    ],
    "approvedParticipants": [
      "mockUsers[117]",
      "mockUsers[115]",
      "mockUsers[29]",
      "mockUsers[66]",
      "mockUsers[194]",
      "mockUsers[140]"
    ],
    "pendingRequests": [],
    "description": "A fun and social other event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1171",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[190].id",
    "host": "mockUsers[190]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-16T17:00:00",
    "duration": 90,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[190]",
      "mockUsers[44]",
      "mockUsers[121]",
      "mockUsers[39]",
      "mockUsers[171]",
      "mockUsers[18]",
      "mockUsers[196]",
      "mockUsers[76]",
      "mockUsers[17]"
    ],
    "approvedParticipants": [
      "mockUsers[190]",
      "mockUsers[44]",
      "mockUsers[121]",
      "mockUsers[39]",
      "mockUsers[171]",
      "mockUsers[18]",
      "mockUsers[196]",
      "mockUsers[76]",
      "mockUsers[17]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1172",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[82].id",
    "host": "mockUsers[82]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-10T09:00:00",
    "duration": 90,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[82]",
      "mockUsers[109]",
      "mockUsers[151]",
      "mockUsers[63]",
      "mockUsers[92]",
      "mockUsers[79]",
      "mockUsers[40]"
    ],
    "approvedParticipants": [
      "mockUsers[82]",
      "mockUsers[109]",
      "mockUsers[151]",
      "mockUsers[63]",
      "mockUsers[92]",
      "mockUsers[79]",
      "mockUsers[40]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1173",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[71].id",
    "host": "mockUsers[71]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-14T17:00:00",
    "duration": 120,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[71]",
      "mockUsers[75]",
      "mockUsers[135]",
      "mockUsers[104]",
      "mockUsers[8]",
      "mockUsers[143]",
      "mockUsers[52]",
      "mockUsers[116]",
      "mockUsers[191]"
    ],
    "approvedParticipants": [
      "mockUsers[71]",
      "mockUsers[75]",
      "mockUsers[135]",
      "mockUsers[104]",
      "mockUsers[8]",
      "mockUsers[143]",
      "mockUsers[52]",
      "mockUsers[116]",
      "mockUsers[191]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1174",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[176].id",
    "host": "mockUsers[176]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-08-25T18:00:00",
    "duration": 60,
    "maxParticipants": 4,
    "participants": [
      "mockUsers[176]",
      "mockUsers[193]",
      "mockUsers[151]",
      "mockUsers[85]"
    ],
    "approvedParticipants": [
      "mockUsers[176]",
      "mockUsers[193]",
      "mockUsers[151]",
      "mockUsers[85]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1175",
    "title": "Chamanzar Field Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[45].id",
    "host": "mockUsers[45]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-07-21T07:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[45]",
      "mockUsers[73]",
      "mockUsers[189]",
      "mockUsers[124]",
      "mockUsers[132]",
      "mockUsers[161]"
    ],
    "approvedParticipants": [
      "mockUsers[45]",
      "mockUsers[73]",
      "mockUsers[189]",
      "mockUsers[124]",
      "mockUsers[132]",
      "mockUsers[161]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1176",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[190].id",
    "host": "mockUsers[190]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-26T09:00:00",
    "duration": 90,
    "maxParticipants": 8,
    "participants": [
      "mockUsers[190]",
      "mockUsers[24]",
      "mockUsers[60]",
      "mockUsers[157]",
      "mockUsers[129]",
      "mockUsers[36]",
      "mockUsers[151]",
      "mockUsers[70]"
    ],
    "approvedParticipants": [
      "mockUsers[190]",
      "mockUsers[24]",
      "mockUsers[60]",
      "mockUsers[157]",
      "mockUsers[129]",
      "mockUsers[36]",
      "mockUsers[151]",
      "mockUsers[70]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1177",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[130].id",
    "host": "mockUsers[130]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-30T18:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[130]",
      "mockUsers[5]",
      "mockUsers[193]",
      "mockUsers[185]",
      "mockUsers[161]",
      "mockUsers[91]"
    ],
    "approvedParticipants": [
      "mockUsers[130]",
      "mockUsers[5]",
      "mockUsers[193]",
      "mockUsers[185]",
      "mockUsers[161]",
      "mockUsers[91]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1178",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[162].id",
    "host": "mockUsers[162]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-20T17:00:00",
    "duration": 60,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[162]",
      "mockUsers[178]",
      "mockUsers[18]",
      "mockUsers[160]",
      "mockUsers[93]"
    ],
    "approvedParticipants": [
      "mockUsers[162]",
      "mockUsers[178]",
      "mockUsers[18]",
      "mockUsers[160]",
      "mockUsers[93]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1179",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[27].id",
    "host": "mockUsers[27]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-07-25T07:00:00",
    "duration": 90,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[27]",
      "mockUsers[134]",
      "mockUsers[64]",
      "mockUsers[144]",
      "mockUsers[159]",
      "mockUsers[39]",
      "mockUsers[153]"
    ],
    "approvedParticipants": [
      "mockUsers[27]",
      "mockUsers[134]",
      "mockUsers[64]",
      "mockUsers[144]",
      "mockUsers[159]",
      "mockUsers[39]",
      "mockUsers[153]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1180",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[196].id",
    "host": "mockUsers[196]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-08-30T09:00:00",
    "duration": 120,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[196]",
      "mockUsers[36]",
      "mockUsers[125]",
      "mockUsers[22]",
      "mockUsers[110]",
      "mockUsers[88]"
    ],
    "approvedParticipants": [
      "mockUsers[196]",
      "mockUsers[36]",
      "mockUsers[125]",
      "mockUsers[22]",
      "mockUsers[110]",
      "mockUsers[88]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1181",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[152].id",
    "host": "mockUsers[152]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-08-29T17:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[152]",
      "mockUsers[185]",
      "mockUsers[46]",
      "mockUsers[99]",
      "mockUsers[95]",
      "mockUsers[107]",
      "mockUsers[151]",
      "mockUsers[181]",
      "mockUsers[76]",
      "mockUsers[141]",
      "mockUsers[30]"
    ],
    "approvedParticipants": [
      "mockUsers[152]",
      "mockUsers[185]",
      "mockUsers[46]",
      "mockUsers[99]",
      "mockUsers[95]",
      "mockUsers[107]",
      "mockUsers[151]",
      "mockUsers[181]",
      "mockUsers[76]",
      "mockUsers[141]",
      "mockUsers[30]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1182",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[7].id",
    "host": "mockUsers[7]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-07-23T18:00:00",
    "duration": 90,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[7]",
      "mockUsers[85]",
      "mockUsers[164]",
      "mockUsers[154]",
      "mockUsers[3]",
      "mockUsers[126]",
      "mockUsers[136]"
    ],
    "approvedParticipants": [
      "mockUsers[7]",
      "mockUsers[85]",
      "mockUsers[164]",
      "mockUsers[154]",
      "mockUsers[3]",
      "mockUsers[126]",
      "mockUsers[136]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1183",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[31].id",
    "host": "mockUsers[31]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-22T09:00:00",
    "duration": 90,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[31]",
      "mockUsers[18]",
      "mockUsers[38]",
      "mockUsers[167]",
      "mockUsers[101]",
      "mockUsers[166]",
      "mockUsers[34]",
      "mockUsers[137]",
      "mockUsers[50]"
    ],
    "approvedParticipants": [
      "mockUsers[31]",
      "mockUsers[18]",
      "mockUsers[38]",
      "mockUsers[167]",
      "mockUsers[101]",
      "mockUsers[166]",
      "mockUsers[34]",
      "mockUsers[137]",
      "mockUsers[50]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1184",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[50].id",
    "host": "mockUsers[50]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-07-15T09:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[50]",
      "mockUsers[104]",
      "mockUsers[97]",
      "mockUsers[63]",
      "mockUsers[70]",
      "mockUsers[197]",
      "mockUsers[23]",
      "mockUsers[31]",
      "mockUsers[38]",
      "mockUsers[113]",
      "mockUsers[141]"
    ],
    "approvedParticipants": [
      "mockUsers[50]",
      "mockUsers[104]",
      "mockUsers[97]",
      "mockUsers[63]",
      "mockUsers[70]",
      "mockUsers[197]",
      "mockUsers[23]",
      "mockUsers[31]",
      "mockUsers[38]",
      "mockUsers[113]",
      "mockUsers[141]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1185",
    "title": "Tennis Court Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[189].id",
    "host": "mockUsers[189]",
    "location": {
      "address": "Oqqurghon Street, 16",
      "city": "Tashkent",
      "lat": 41.32,
      "lng": 69.285
    },
    "dateTime": "2025-07-27T07:00:00",
    "duration": 90,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[189]",
      "mockUsers[187]",
      "mockUsers[12]",
      "mockUsers[94]",
      "mockUsers[75]",
      "mockUsers[151]",
      "mockUsers[74]",
      "mockUsers[66]",
      "mockUsers[69]"
    ],
    "approvedParticipants": [
      "mockUsers[189]",
      "mockUsers[187]",
      "mockUsers[12]",
      "mockUsers[94]",
      "mockUsers[75]",
      "mockUsers[151]",
      "mockUsers[74]",
      "mockUsers[66]",
      "mockUsers[69]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1186",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[159].id",
    "host": "mockUsers[159]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-29T09:00:00",
    "duration": 90,
    "maxParticipants": 10,
    "participants": [
      "mockUsers[159]",
      "mockUsers[105]",
      "mockUsers[144]",
      "mockUsers[68]",
      "mockUsers[13]",
      "mockUsers[2]",
      "mockUsers[32]",
      "mockUsers[135]",
      "mockUsers[91]",
      "mockUsers[167]"
    ],
    "approvedParticipants": [
      "mockUsers[159]",
      "mockUsers[105]",
      "mockUsers[144]",
      "mockUsers[68]",
      "mockUsers[13]",
      "mockUsers[2]",
      "mockUsers[32]",
      "mockUsers[135]",
      "mockUsers[91]",
      "mockUsers[167]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1187",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[11].id",
    "host": "mockUsers[11]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-06T18:00:00",
    "duration": 60,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[11]",
      "mockUsers[2]",
      "mockUsers[181]",
      "mockUsers[129]",
      "mockUsers[105]",
      "mockUsers[88]"
    ],
    "approvedParticipants": [
      "mockUsers[11]",
      "mockUsers[2]",
      "mockUsers[181]",
      "mockUsers[129]",
      "mockUsers[105]",
      "mockUsers[88]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1188",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[150].id",
    "host": "mockUsers[150]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-08-29T17:00:00",
    "duration": 60,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[150]",
      "mockUsers[12]",
      "mockUsers[94]",
      "mockUsers[32]",
      "mockUsers[42]"
    ],
    "approvedParticipants": [
      "mockUsers[150]",
      "mockUsers[12]",
      "mockUsers[94]",
      "mockUsers[32]",
      "mockUsers[42]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1189",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[184].id",
    "host": "mockUsers[184]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-14T19:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[184]",
      "mockUsers[36]",
      "mockUsers[142]",
      "mockUsers[20]",
      "mockUsers[34]"
    ],
    "approvedParticipants": [
      "mockUsers[184]",
      "mockUsers[36]",
      "mockUsers[142]",
      "mockUsers[20]",
      "mockUsers[34]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1190",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[82].id",
    "host": "mockUsers[82]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-08-03T07:00:00",
    "duration": 120,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[82]",
      "mockUsers[195]",
      "mockUsers[45]",
      "mockUsers[162]",
      "mockUsers[48]",
      "mockUsers[81]",
      "mockUsers[105]",
      "mockUsers[181]",
      "mockUsers[176]"
    ],
    "approvedParticipants": [
      "mockUsers[82]",
      "mockUsers[195]",
      "mockUsers[45]",
      "mockUsers[162]",
      "mockUsers[48]",
      "mockUsers[81]",
      "mockUsers[105]",
      "mockUsers[181]",
      "mockUsers[176]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1191",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[177].id",
    "host": "mockUsers[177]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-07-17T19:00:00",
    "duration": 60,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[177]",
      "mockUsers[180]",
      "mockUsers[82]",
      "mockUsers[123]",
      "mockUsers[83]",
      "mockUsers[160]",
      "mockUsers[57]",
      "mockUsers[8]",
      "mockUsers[88]"
    ],
    "approvedParticipants": [
      "mockUsers[177]",
      "mockUsers[180]",
      "mockUsers[82]",
      "mockUsers[123]",
      "mockUsers[83]",
      "mockUsers[160]",
      "mockUsers[57]",
      "mockUsers[8]",
      "mockUsers[88]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1192",
    "title": "Aqualand Swimming Session",
    "sportType": "SportType.Swimming",
    "hostId": "mockUsers[139].id",
    "host": "mockUsers[139]",
    "location": {
      "address": "Chinabad Street, 61A",
      "city": "Tashkent",
      "lat": 41.36,
      "lng": 69.29
    },
    "dateTime": "2025-07-28T07:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[139]",
      "mockUsers[34]",
      "mockUsers[91]",
      "mockUsers[136]",
      "mockUsers[26]"
    ],
    "approvedParticipants": [
      "mockUsers[139]",
      "mockUsers[34]",
      "mockUsers[91]",
      "mockUsers[136]",
      "mockUsers[26]"
    ],
    "pendingRequests": [],
    "description": "A fun and social swimming event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1193",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[171].id",
    "host": "mockUsers[171]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-21T18:00:00",
    "duration": 60,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[171]",
      "mockUsers[188]",
      "mockUsers[162]",
      "mockUsers[39]",
      "mockUsers[141]"
    ],
    "approvedParticipants": [
      "mockUsers[171]",
      "mockUsers[188]",
      "mockUsers[162]",
      "mockUsers[39]",
      "mockUsers[141]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1194",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[98].id",
    "host": "mockUsers[98]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-10T09:00:00",
    "duration": 120,
    "maxParticipants": 11,
    "participants": [
      "mockUsers[98]",
      "mockUsers[181]",
      "mockUsers[147]",
      "mockUsers[139]",
      "mockUsers[8]",
      "mockUsers[4]",
      "mockUsers[0]",
      "mockUsers[140]",
      "mockUsers[198]",
      "mockUsers[192]",
      "mockUsers[7]"
    ],
    "approvedParticipants": [
      "mockUsers[98]",
      "mockUsers[181]",
      "mockUsers[147]",
      "mockUsers[139]",
      "mockUsers[8]",
      "mockUsers[4]",
      "mockUsers[0]",
      "mockUsers[140]",
      "mockUsers[198]",
      "mockUsers[192]",
      "mockUsers[7]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1195",
    "title": "Yunusabad Stadium Football Session",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[161].id",
    "host": "mockUsers[161]",
    "location": {
      "address": "Yunusabad District, 3-mavze",
      "city": "Tashkent",
      "lat": 41.364559,
      "lng": 69.294178
    },
    "dateTime": "2025-08-30T18:00:00",
    "duration": 90,
    "maxParticipants": 9,
    "participants": [
      "mockUsers[161]",
      "mockUsers[180]",
      "mockUsers[44]",
      "mockUsers[151]",
      "mockUsers[6]",
      "mockUsers[55]",
      "mockUsers[122]",
      "mockUsers[155]",
      "mockUsers[71]"
    ],
    "approvedParticipants": [
      "mockUsers[161]",
      "mockUsers[180]",
      "mockUsers[44]",
      "mockUsers[151]",
      "mockUsers[6]",
      "mockUsers[55]",
      "mockUsers[122]",
      "mockUsers[155]",
      "mockUsers[71]"
    ],
    "pendingRequests": [],
    "description": "A fun and social football event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1196",
    "title": "Fitness First Gym Session",
    "sportType": "SportType.Gym",
    "hostId": "mockUsers[96].id",
    "host": "mockUsers[96]",
    "location": {
      "address": "Afrosiyob Street, 41",
      "city": "Tashkent",
      "lat": 41.31,
      "lng": 69.28
    },
    "dateTime": "2025-07-16T07:00:00",
    "duration": 90,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[96]",
      "mockUsers[47]",
      "mockUsers[129]",
      "mockUsers[8]",
      "mockUsers[100]"
    ],
    "approvedParticipants": [
      "mockUsers[96]",
      "mockUsers[47]",
      "mockUsers[129]",
      "mockUsers[8]",
      "mockUsers[100]"
    ],
    "pendingRequests": [],
    "description": "A fun and social gym event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1197",
    "title": "River Park Running Session",
    "sportType": "SportType.Running",
    "hostId": "mockUsers[138].id",
    "host": "mockUsers[138]",
    "location": {
      "address": "Tashkent",
      "city": "Tashkent",
      "lat": 41.33,
      "lng": 69.31
    },
    "dateTime": "2025-08-03T17:00:00",
    "duration": 60,
    "maxParticipants": 6,
    "participants": [
      "mockUsers[138]",
      "mockUsers[27]",
      "mockUsers[172]",
      "mockUsers[53]",
      "mockUsers[121]",
      "mockUsers[21]"
    ],
    "approvedParticipants": [
      "mockUsers[138]",
      "mockUsers[27]",
      "mockUsers[172]",
      "mockUsers[53]",
      "mockUsers[121]",
      "mockUsers[21]"
    ],
    "pendingRequests": [],
    "description": "A fun and social running event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1198",
    "title": "TTClub Tennis Session",
    "sportType": "SportType.Tennis",
    "hostId": "mockUsers[23].id",
    "host": "mockUsers[23]",
    "location": {
      "address": "Mahtumquli Street, 105\u0413",
      "city": "Tashkent",
      "lat": 41.35,
      "lng": 69.3
    },
    "dateTime": "2025-07-16T17:00:00",
    "duration": 60,
    "maxParticipants": 7,
    "participants": [
      "mockUsers[23]",
      "mockUsers[124]",
      "mockUsers[186]",
      "mockUsers[130]",
      "mockUsers[29]",
      "mockUsers[63]",
      "mockUsers[45]"
    ],
    "approvedParticipants": [
      "mockUsers[23]",
      "mockUsers[124]",
      "mockUsers[186]",
      "mockUsers[130]",
      "mockUsers[29]",
      "mockUsers[63]",
      "mockUsers[45]"
    ],
    "pendingRequests": [],
    "description": "A fun and social tennis event open to all skill levels!",
    "price": 0
  },
  {
    "id": "1199",
    "title": "Yoga Space Yoga Session",
    "sportType": "SportType.Yoga",
    "hostId": "mockUsers[136].id",
    "host": "mockUsers[136]",
    "location": {
      "address": "Kichik Beshyogoch street, 56",
      "city": "Tashkent",
      "lat": 41.311,
      "lng": 69.27
    },
    "dateTime": "2025-08-09T18:00:00",
    "duration": 120,
    "maxParticipants": 5,
    "participants": [
      "mockUsers[136]",
      "mockUsers[150]",
      "mockUsers[162]",
      "mockUsers[82]",
      "mockUsers[161]"
    ],
    "approvedParticipants": [
      "mockUsers[136]",
      "mockUsers[150]",
      "mockUsers[162]",
      "mockUsers[82]",
      "mockUsers[161]"
    ],
    "pendingRequests": [],
    "description": "A fun and social yoga event open to all skill levels!",
    "price": 0
  },
  {
    "id": "307",
    "title": "Evening Football Match",
    "sportType": "SportType.Football",
    "hostId": "mockUsers[66].id",
    "host": "mockUsers[66]",
    "location": {
      "address": "Uchtepa District, Chamanzar Mahallah",
      "city": "Tashkent",
      "lat": 41.295,
      "lng": 69.211
    },
    "dateTime": "2025-06-01T19:00:00",
    "duration": 90,
    "maxParticipants": 12,
    "participants": [
      "mockUsers[66]",
      "mockUsers[5]",
      "mockUsers[29]",
      "mockUsers[7]",
      "mockUsers[17]",
      "mockUsers[28]",
      "mockUsers[56]",
      "mockUsers[67]",
      "mockUsers[68]",
      "mockUsers[69]",
      "mockUsers[48]",
      "mockUsers[6]"
    ],
    "approvedParticipants": [
      "mockUsers[66]",
      "mockUsers[5]",
      "mockUsers[29]",
      "mockUsers[7]",
      "mockUsers[17]",
      "mockUsers[28]",
      "mockUsers[56]",
      "mockUsers[67]",
      "mockUsers[68]",
      "mockUsers[69]",
      "mockUsers[48]",
      "mockUsers[6]"
    ],
    "pendingRequests": [],
    "description": "Friendly football match, all skill levels welcome!",
    "price": 0
  }
];

// Helper function to filter rooms by sport type
export const getRoomsBySport = (sportType: SportType): Room[] => {
  return mockRooms.filter(room => room.sportType === sportType);
};

// Helper function to get upcoming rooms
export const getUpcomingRooms = (): Room[] => {
  const now = new Date();
  return mockRooms
    .filter(room => new Date(room.dateTime) > now)
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
};

// Helper function to get joined rooms for current user
export const getJoinedRooms = (): Room[] => {
  // Mock implementation - in real app would check participant list
  return [mockRooms[0], mockRooms[4]];
};
