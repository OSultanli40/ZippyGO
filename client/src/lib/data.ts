import guide1 from "@assets/generated_images/professional_hiking_guide_portrait.png";
import guide2 from "@assets/generated_images/experienced_mountain_guide_portrait.png";
import babysitter1 from "@assets/generated_images/friendly_babysitter_with_kids_outdoors.png";
// Import babysitter images from babysitter_images folder
import qerenfilHuseynovaImage from "@assets/babysitter_images/QerenfilHuseynova.jpg";
import tenzileAgakshiyevaImage from "@assets/babysitter_images/TenzileAgakshiyeva.jpg";
import saraAxundovaImage from "@assets/babysitter_images/SaraAxundova.jpg";
import medineCeferovaImage from "@assets/babysitter_images/Medineceferova.jpg";
import maryAnneImage from "@assets/babysitter_images/MaryAnne.jpg";
import elnareHaciyevaImage from "@assets/babysitter_images/ElnareHaciyeva.jpg";
import amyJaneImage from "@assets/babysitter_images/AmyJane.jpg";
// Import guide images from guide_images folder
import tyraneSlickImage from "@assets/guide_images/TyraneSlick.jpg";
import vladimirAlexsandrovichImage from "@assets/guide_images/VladimirAlexsandrovich.jpg";
import jackBlackImage from "@assets/guide_images/JackBlack.jpg";
import zahidQubadovImage from "@assets/guide_images/ZahidQubadov.jpg";
import leylaRafullayevaImage from "@assets/guide_images/LeylaRafullayeva.jpg";
import tofiqHaciyevImage from "@assets/guide_images/TofiqHaciyev.jpg";
import sabirAhmadovImage from "@assets/guide_images/SabirAhmadov.jpg";
import equipment1 from "@assets/generated_images/hiking_backpack_equipment.png";
import equipment2 from "@assets/generated_images/hiking_boots_equipment.png";
import equipment3 from "@assets/generated_images/camping_tent_equipment.png";
// Import equipment images from Equipments_images folder
import sleepingBagImage from "@assets/Equipments_images/SleapingBag.jpg";
import backpackCheap20lImage from "@assets/Equipments_images/BackpackCheap20lits.jpg";
import heavyDutyTetonRucksackImage from "@assets/Equipments_images/heavyDutyTetonRugsack.jpg";
import hikingVisorImage from "@assets/Equipments_images/HikingVisor.jpg";
import hikingGloveExpensiveImage from "@assets/Equipments_images/HikingGloveEXPENSIVE.jpg";
import hikingGloveCheapImage from "@assets/Equipments_images/HikingGloveCheap.jpg";
import hikingHeadLightImage from "@assets/Equipments_images/HikingHeadLight.jpg";
import salomonQuestBootsImage from "@assets/Equipments_images/SalomonQuestHikingBoots.jpg";
import fullHikingRopeKitImage from "@assets/Equipments_images/FullHikingRopeKit.jpg";
import hikingRopesImage from "@assets/Equipments_images/HikingRopes.jpg";
import bendableHikingRodImage from "@assets/Equipments_images/BendableHikingRod.jpg";
import hikingPickaxeCheapImage from "@assets/Equipments_images/HikingPickaxeCheap.jpg";
import hikingPickaxePricyImage from "@assets/Equipments_images/HikingPickaxePricy.jpg";
import fullQualityKitImage from "@assets/Equipments_images/FullQualityKitAllEssentialThings.jpg";

import heroImage from "@assets/generated_images/hero_image_of_a_majestic_mountain_landscape.png";
import lahijImage from "@assets/generated_images/hiking_trail_in_a_green_canyon.png";
import goygolImage from "@assets/generated_images/lake_surrounded_by_forest_and_mountains.png";

// Import trial images from trialsImages folder
import xinaliqImage from "@trials/xinaliqImage.jpg";
import candyCaneImage from "@trials/candyCaneImage.jpg";
import qabalaImage from "@trials/qabalaImage.jpg";
import mujuLahicImage from "@trials/mujuLahicImage.jpg";
import shahdagImage from "@trials/shahdagImage.jpg";
import tufandagImage from "@trials/tufandagImage.jpg";
import gizilGayaImage from "@trials/gizilGayaImage.jpg";
import lazaChiragImage from "@trials/lazaChiragImage.jpg";
import babadagImage from "@trials/babadagImage.jpg";
import surkhaykhanImage from "@trials/surkhaykhanImage.jpg";
import durjaImage from "@trials/durjaImage.webp";
import kishImage from "@trials/kishImage.webp";
import mamrukhImage from "@trials/mamrukhImage.jpg";
import pirguluImage from "@trials/pirguluImage.jpg";
import diriBabaImage from "@trials/diriBabaImage.jpg";
import niyaldagImage from "@trials/niyaldagImage.webp";
import kapazImage from "@trials/kapazImage.jpg";
import murovdagImage from "@trials/murovdagImage.jpg";
import narzanImage from "@trials/narzanImage.jpg";
import maralgolImage from "@trials/maralgolImage.jpg";
import ilandagImage from "@trials/ilandagImage.jpg";
import batabatImage from "@trials/batabatImage.jpg";
import gapijigImage from "@trials/gapijigImage.jpg";
import ilisuImage from "@trials/ilisuImage.jpg";

import badgeStarter from "@assets/generated_images/bronze_hiking_boot_badge_icon.png";
import badgeTrailblazer from "@assets/generated_images/silver_compass_badge_icon.png";
import badgePro from "@assets/generated_images/gold_mountain_peak_badge_icon.png";

export interface Route {
  id: number;
  name: string;
  region: string;
  difficulty: "Easy" | "Medium" | "Hard";
  distance_km: number;
  elevation_m: number;
  duration_hours: number;
  coordinates: [number, number]; // [lat, lng]
  image: string;
  description: string;
  fullDescription?: string;
  images?: string[];
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  image: string;
  earned: boolean;
  dateEarned?: string;
}

export interface PendingPayment {
  serviceId: string;
  serviceName: string;
  amount: number;
  type: "Guide" | "Babysitter" | "Equipment";
  bookedAt: string;
  status: "pending" | "processing" | "completed" | "cancelled";
}

export interface User {
  id?: string;
  name: string;
  avatar: string;
  completedHikes: number[]; // IDs of completed routes
  communityHikes?: Array<{
    hikeId: string;
    joinedAt: string;
  }>;
  badges: UserBadge[];
  totalKm: number;
  totalElevation: number;
  challengePoints?: number;
  isInChallenge?: boolean;
  balance?: number;
  pendingPayments?: PendingPayment[];
}

export interface Service {
  id: string;
  type: "Guide" | "Babysitter" | "Equipment";
  name: string;
  price_per_day: number;
  rating: number;
  image: string;
  description: string;
  fullDescription: string;
  available: boolean;
}

export interface GroupHike {
  id: number;
  title: string;
  routeId: number;
  date: string;
  time: string;
  host: string;
  participants: number;
  participantNames: string[];
  maxParticipants: number;
  description: string;
}

export const routes: Route[] = [
  {
    id: 1,
    name: "Xinaliq to Galakhudat",
    region: "Gusar",
    difficulty: "Easy",
    distance_km: 8.4,
    elevation_m: 297,
    coordinates: [41.1050, 48.0738],
    duration_hours: 2.5,
    image: xinaliqImage,
    description: "High-altitude trek between ancient mountain villages above the clouds.",
    fullDescription: "Starting from Europe's highest inhabited village, Xinaliq, this trail follows the ridge with views of deep valleys and jagged peaks, ending in the remote village of Galakhudat."
  },
  {
    id: 2,
    name: "Candy Cane Mountains",
    region: "Khizi",
    difficulty: "Easy",
    distance_km: 4.0,
    elevation_m: 220,
    coordinates: [40.5237, 49.1158],
    duration_hours: 1.5,
    image: candyCaneImage,
    description: "Surreal landscape of red and white striped clay hills.",
    fullDescription: "A geological wonder formed by layers of shale and iron compounds. An open terrain hike with no shade — bring water and sun protection."
  },
  {
    id: 3,
    name: "Yeddi Gozel Waterfall",
    region: "Gabala",
    difficulty: "Medium",
    distance_km: 6.8,
    elevation_m: 380,
    coordinates: [41.0105, 48.0122],
    duration_hours: 3,
    image: qabalaImage,
    description: "Forest trail leading to the famous 'Seven Beauties' waterfalls.",
    fullDescription: "A refreshing hike through dense forest with several tiers of waterfalls. The path can be slippery — proper shoes are recommended."
  },
  {
    id: 4,
    name: "Muju–Lahic Trail",
    region: "Ismayilli",
    difficulty: "Hard",
    distance_km: 10.6,
    elevation_m: 957,
    coordinates: [40.5657, 48.2430],
    duration_hours: 5.5,
    image: mujuLahicImage,
    description: "A culturally rich trail connecting Muju and Lahic villages.",
    fullDescription: "Muju village, once inhabited by Mountain Jews, lies near Mount Fit. Lahic is a historic craft town of the Tat people. The trail passes through mountain slopes, traditional villages, and scenic landscapes."
  },
  {
    id: 5,
    name: "Shahdag Trail (Laza → Shahdag)",
    region: "Gusar",
    difficulty: "Hard",
    distance_km: 11.2,
    elevation_m: 1250,
    coordinates: [41.1752, 48.0641],
    duration_hours: 6,
    image: shahdagImage,
    description: "A challenging high-mountain trek from Laza village to Shahdag peak.",
    fullDescription: "Steep rocky slopes, river crossings, and panoramic views make this one of the most iconic climbs in northern Azerbaijan."
  },
  {
    id: 6,
    name: "Tufandag Mountain Trail",
    region: "Gusar",
    difficulty: "Medium",
    distance_km: 7.5,
    elevation_m: 680,
    coordinates: [41.0942, 47.5930],
    duration_hours: 3.5,
    image: tufandagImage,
    description: "A scenic route around the slopes of Tufandag.",
    fullDescription: "The trail features mixed forest sections and open views of the Greater Caucasus range."
  },
  {
    id: 8,
    name: "Gizil Gaya Route",
    region: "Guba",
    difficulty: "Hard",
    distance_km: 12.4,
    elevation_m: 980,
    coordinates: [41.1339, 48.0750],
    duration_hours: 6.5,
    image: gizilGayaImage,
    description: "A demanding climb to the legendary 'Golden Rock'.",
    fullDescription: "Steep cliffside paths and high ridgelines offer breathtaking views of the Caucasus."
  },
  {
    id: 9,
    name: "Chirag Gala Trail",
    region: "Shabran",
    difficulty: "Medium",
    distance_km: 8.8,
    elevation_m: 510,
    coordinates: [41.0516, 48.5553],
    duration_hours: 3.5,
    image: lazaChiragImage,
    description: "A historical route from Laza waterfalls to the ancient fortress of Chirag Gala.",
    fullDescription: "The trail includes forest paths, waterfall viewpoints, and a climb to a medieval mountaintop fortress."
  },
  {
    id: 10,
    name: "Babadağ Mountain Hike",
    region: "Gabala",
    difficulty: "Hard",
    distance_km: 13.0,
    elevation_m: 1320,
    coordinates: [41.0108, 48.1813],
    duration_hours: 7,
    image: babadagImage,
    description: "A sacred and iconic summit hike in Azerbaijan.",
    fullDescription: "The trail climbs through rocky slopes to one of the region's highest and most revered peaks."
  },
  {
    id: 11,
    name: "Surkhaykhan Mountain",
    region: "Oguz",
    difficulty: "Medium",
    distance_km: 7.8,
    elevation_m: 640,
    coordinates: [40.4154, 47.3838],
    duration_hours: 4,
    image: surkhaykhanImage,
    description: "A scenic peak overlooking Oguz valleys.",
    fullDescription: "A blend of open pastures and forest paths leading to a panoramic summit."
  },
  {
    id: 12,
    name: "Durja Mountain Trail",
    region: "Gabala",
    difficulty: "Medium",
    distance_km: 6.5,
    elevation_m: 540,
    coordinates: [41.0239, 47.5310],
    duration_hours: 3,
    image: durjaImage,
    description: "A pleasant mountain hike with forested approaches.",
    fullDescription: "Ideal for mid-level hikers seeking calm nature and moderate elevation gain."
  },
  {
    id: 13,
    name: "Kish Mountain Path",
    region: "Sheki",
    difficulty: "Easy",
    distance_km: 5.2,
    elevation_m: 260,
    coordinates: [41.1653, 47.1113],
    duration_hours: 2,
    image: kishImage,
    description: "A gentle route from Sheki to the historical Kish village.",
    fullDescription: "Features forest paths and leads to the ancient Albanian Church."
  },
  {
    id: 14,
    name: "Mamrukh Mountain Trail",
    region: "Zaqatala",
    difficulty: "Medium",
    distance_km: 9.5,
    elevation_m: 620,
    coordinates: [41.3235, 46.8559],
    duration_hours: 4.5,
    image: mamrukhImage,
    description: "A popular mountain path starting from Mamrukh village.",
    fullDescription: "The trail winds through dense forest before reaching high pastures."
  },
  {
    id: 15,
    name: "Pirgulu Mountain Trail",
    region: "Shamakhi",
    difficulty: "Medium",
    distance_km: 7.0,
    elevation_m: 430,
    coordinates: [40.4627, 48.3456],
    duration_hours: 3,
    image: pirguluImage,
    description: "A forested trail inside Pirgulu National Park.",
    fullDescription: "Known for its clean air, tall pine trees, and cool climate."
  },
  {
    id: 16,
    name: "Diri Baba → Red Bridge Trail",
    region: "Shamakhi",
    difficulty: "Easy",
    distance_km: 4.8,
    elevation_m: 160,
    coordinates: [40.3157, 48.5631],
    duration_hours: 1.5,
    image: diriBabaImage,
    description: "A gentle hiking route starting from the Diri Baba Mausoleum.",
    fullDescription: "A mix of historical structures and rocky outcrops."
  },
  {
    id: 17,
    name: "Niyaldag Mountain Hike",
    region: "Ismayilli",
    difficulty: "Medium",
    distance_km: 10.2,
    elevation_m: 710,
    coordinates: [40.4836, 48.2251],
    duration_hours: 4.5,
    image: niyaldagImage,
    description: "A scenic ridge hike across the Niyaldag range.",
    fullDescription: "Wide-open pastures and mountain views connecting the Muju–Lahic area."
  },
  {
    id: 18,
    name: "Kapaz Mountain Hike",
    region: "Goygol",
    difficulty: "Hard",
    distance_km: 14.0,
    elevation_m: 1250,
    coordinates: [40.1803, 46.1546],
    duration_hours: 7,
    image: kapazImage,
    description: "A demanding climb to the iconic Kapaz peak.",
    fullDescription: "Steep slopes, alpine terrain, and unmatched views of Goygol National Park."
  },
  {
    id: 19,
    name: "Murovdag Foothills",
    region: "Dashkasan",
    difficulty: "Medium",
    distance_km: 9.8,
    elevation_m: 540,
    coordinates: [40.1612, 46.1911],
    duration_hours: 4.5,
    image: murovdagImage,
    description: "A foothill hike along the Murovdag mountain chain.",
    fullDescription: "Open terrain and strong winds characterize this mid-level trail."
  },
  {
    id: 20,
    name: "Gadabay Forest & Mountain Trails",
    region: "Gadabay",
    difficulty: "Easy",
    distance_km: 5.0,
    elevation_m: 250,
    coordinates: [40.3031, 47.4022],
    duration_hours: 2,
    image: narzanImage,
    description: "Gentle forest trails around the famous Narzan springs.",
    fullDescription: "Ideal for families and beginners looking for fresh air and natural mineral springs."
  },
  {
    id: 21,
    name: "Ganja → Maralgol Trail",
    region: "Goygol",
    difficulty: "Medium",
    distance_km: 7.6,
    elevation_m: 410,
    coordinates: [40.2234, 46.1846],
    duration_hours: 3,
    image: maralgolImage,
    description: "A scenic route around Maralgol Lake.",
    fullDescription: "Located within Goygol National Park, offering forest and lake views."
  },
  {
    id: 26,
    name: "Ilandag Foothills",
    region: "Nakhchivan",
    difficulty: "Medium",
    distance_km: 6.8,
    elevation_m: 530,
    coordinates: [39.0802, 45.4306],
    duration_hours: 3,
    image: ilandagImage,
    description: "A hike around the base of the iconic snake-shaped mountain.",
    fullDescription: "Climbing to the summit is restricted, but the foothill hike offers unique scenery."
  },
  {
    id: 28,
    name: "Batabat Plateau → Lake Loop",
    region: "Nakhchivan",
    difficulty: "Easy",
    distance_km: 4.0,
    elevation_m: 160,
    coordinates: [39.3221, 45.4703],
    duration_hours: 1.5,
    image: batabatImage,
    description: "A calm lakeside route in the famous Batabat plateau.",
    fullDescription: "A great beginner trail with alpine meadows and floating islands."
  },
  {
    id: 29,
    name: "Gapijig Mountain Foothills",
    region: "Nakhchivan",
    difficulty: "Medium",
    distance_km: 7.3,
    elevation_m: 540,
    coordinates: [39.0932, 46.0014],
    duration_hours: 3,
    image: gapijigImage,
    description: "A peaceful route along the foothills of Gapijig Mountain.",
    fullDescription: "Mostly open landscapes with fresh winds and clear horizon views."
  },
  {
    id: 30,
    name: "Ilisu Waterfall Trail",
    region: "Gakh",
    difficulty: "Medium",
    distance_km: 5.8,
    elevation_m: 360,
    coordinates: [41.2805, 47.0337],
    duration_hours: 3,
    image: ilisuImage,
    description: "A forest trail leading to the Ilisu waterfall.",
    fullDescription: "Shaded forest paths, river crossings, and refreshing waterfall views."
  },
  {
    id: 7,
    name: "Lake Goygol Loop",
    region: "Goygol",
    difficulty: "Easy",
    distance_km: 5.2,
    elevation_m: 150,
    coordinates: [40.414, 46.319],
    duration_hours: 2,
    image: goygolImage,
    description: "Peaceful walk around the azure lake surrounded by lush forest.",
    fullDescription: "Perfect for families and beginners. This well-maintained path circles the famous Lake Goygol. The turquoise water reflects the surrounding Kapaz mountain, creating a magical atmosphere. Great for photography and picnics."
  }
];

export const initialUser: User = {
  name: "Alex Hiker",
  avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Alex",
  completedHikes: [3, 5],
  totalKm: 9.2,
  totalElevation: 370,
  badges: [
    {
      id: "starter",
      name: "Starter",
      description: "Completed your first hike",
      image: badgeStarter,
      earned: true,
      dateEarned: "2024-05-12"
    },
    {
      id: "trailblazer",
      name: "Trailblazer",
      description: "Completed 3 hikes",
      image: badgeTrailblazer,
      earned: false
    },
    {
      id: "mountain-pro",
      name: "Mountain Pro",
      description: "Completed 5+ hikes",
      image: badgePro,
      earned: false
    }
  ]
};

export const tips = [
  {
    id: 1,
    title: "Hydration is Key",
    description: "Carry at least 2 liters of water for medium hikes. Dehydration hits faster at altitude.",
    icon: "Droplets"
  },
  {
    id: 2,
    title: "Layer Up",
    description: "Mountain weather is unpredictable. Bring a waterproof shell and warm layers even in summer.",
    icon: "Shirt"
  },
  {
    id: 3,
    title: "Leave No Trace",
    description: "Pack out everything you pack in. Protect Azerbaijan's pristine nature for others.",
    icon: "Trash2"
  },
  {
    id: 4,
    title: "Check Forecast",
    description: "Always check the local mountain forecast before heading out. Conditions change rapidly.",
    icon: "CloudSun"
  }
];

export const services: Service[] = [
  {
    id: "elvinmammadov",
    type: "Guide",
    name: "Elvin Mammadov",
    price_per_day: 50,
    rating: 4.9,
    image: guide1,
    description: "Certified mountain guide with 10 years experience in the Greater Caucasus.",
    fullDescription: "Elvin is a UIAA certified guide with extensive knowledge of the Shahdag and Bazarduzu regions. He specializes in both summer trekking and winter mountaineering. He is also trained in first aid and speaks English, Russian, and Azerbaijani fluently.",
    available: true
  },
  {
    id: "sarahaliyeva",
    type: "Guide",
    name: "Sarah Aliyeva",
    price_per_day: 60,
    rating: 5.0,
    image: guide2,
    description: "Expert in high-altitude trekking and wilderness survival skills.",
    fullDescription: "Sarah is one of Azerbaijan's premier high-altitude guides. She has led expeditions across the Caucasus and focuses on sustainable trekking practices. Her tours often include workshops on navigation and survival skills.",
    available: true
  },
  {
    id: "tyraneslick",
    type: "Guide",
    name: "Tyrane Slick",
    price_per_day: 55,
    rating: 4.8,
    image: tyraneSlickImage,
    description: "Experienced alpine guide specializing in challenging mountain routes.",
    fullDescription: "Tyrane brings years of mountain expertise to Azerbaijan's peaks. Known for his calm demeanor in challenging conditions and excellent route planning. He is well-versed in alpine safety and weather assessment.",
    available: true
  },
  {
    id: "vladimiralexsandrovich",
    type: "Guide",
    name: "Vladimir Alexandrovich",
    price_per_day: 65,
    rating: 4.9,
    image: vladimirAlexsandrovichImage,
    description: "Professional mountaineer with international expedition experience.",
    fullDescription: "Vladimir has guided expeditions across the Caucasus, Alps, and Himalayas. His expertise in technical climbing and mountain rescue makes him ideal for advanced treks. Fluent in Russian, English, and Azerbaijani.",
    available: true
  },
  {
    id: "jackblack",
    type: "Guide",
    name: "Jack Black",
    price_per_day: 45,
    rating: 4.7,
    image: jackBlackImage,
    description: "Friendly and knowledgeable guide perfect for groups and beginners.",
    fullDescription: "Jack makes hiking accessible to everyone. His patient teaching style and extensive knowledge of local flora and fauna create memorable experiences. Great for families and first-time hikers.",
    available: true
  },
  {
    id: "zahidqubadov",
    type: "Guide",
    name: "Zahid Qubadov",
    price_per_day: 52,
    rating: 4.9,
    image: zahidQubadovImage,
    description: "Local guide with deep knowledge of Azerbaijan's hidden trails.",
    fullDescription: "Born and raised in the mountains, Zahid knows every secret path and scenic viewpoint. His passion for Azerbaijan's nature is infectious, and he loves sharing stories about local history and culture.",
    available: true
  },
  {
    id: "leylarafullayeva",
    type: "Guide",
    name: "Leyla Rafullayeva",
    price_per_day: 58,
    rating: 5.0,
    image: leylaRafullayevaImage,
    description: "Expert guide specializing in cultural and nature photography hikes.",
    fullDescription: "Leyla combines her love for photography with expert trail knowledge. Perfect for travelers who want to capture Azerbaijan's beauty while learning about local traditions. She knows the best times and locations for stunning photos.",
    available: true
  },
  {
    id: "tofiqhaciyev",
    type: "Guide",
    name: "Tofiq Haciyev",
    price_per_day: 48,
    rating: 4.8,
    image: tofiqHaciyevImage,
    description: "Seasoned mountain guide with expertise in wildlife and bird watching.",
    fullDescription: "Tofiq is a naturalist at heart. His hikes often become educational experiences as he shares knowledge about Azerbaijan's diverse wildlife, bird species, and ecosystems. Perfect for nature enthusiasts.",
    available: true
  },
  {
    id: "sabirahmadov",
    type: "Guide",
    name: "Sabir Ahmadov",
    price_per_day: 50,
    rating: 4.9,
    image: sabirAhmadovImage,
    description: "Professional guide with strong focus on safety and group management.",
    fullDescription: "Sabir is known for his meticulous attention to safety protocols and excellent group coordination. His clear communication and organizational skills make him ideal for larger groups and corporate hiking trips.",
    available: true
  },
  {
    id: "leylakarimova",
    type: "Babysitter",
    name: "Leyla Karimova",
    price_per_day: 35,
    rating: 4.8,
    image: babysitter1,
    description: "Nature-loving babysitter who organizes outdoor games for kids while you hike.",
    fullDescription: "Leyla combines childcare with outdoor education. While you tackle the harder trails, your children will be safe at base camp learning about local flora and fauna, playing nature-themed games, and enjoying the fresh air.",
    available: true
  },
  {
    id: "qerenfilhuseynova",
    type: "Babysitter",
    name: "Qerenfil Huseynova",
    price_per_day: 32,
    rating: 4.9,
    image: qerenfilHuseynovaImage,
    description: "Experienced childcare provider with a warm and nurturing approach.",
    fullDescription: "Qerenfil has years of experience caring for children of all ages. Her calm and patient nature makes children feel safe and comfortable. She organizes creative activities and ensures kids have fun while parents explore the trails.",
    available: true
  },
  {
    id: "tenzileagakshiyeva",
    type: "Babysitter",
    name: "Tenzile Agakshiyeva",
    price_per_day: 30,
    rating: 4.7,
    image: tenzileAgakshiyevaImage,
    description: "Energetic babysitter who keeps kids active and engaged outdoors.",
    fullDescription: "Tenzile brings enthusiasm and creativity to childcare. She loves organizing outdoor activities, nature scavenger hunts, and educational games. Perfect for families with active children who need constant engagement.",
    available: true
  },
  {
    id: "saraaxundova",
    type: "Babysitter",
    name: "Sara Axundova",
    price_per_day: 38,
    rating: 5.0,
    image: saraAxundovaImage,
    description: "Professional babysitter with first aid certification and child psychology background.",
    fullDescription: "Sara combines professional childcare training with a genuine love for children. Certified in first aid and CPR, she ensures the highest safety standards. Her background in child psychology helps her understand and respond to each child's unique needs.",
    available: true
  },
  {
    id: "medineceferova",
    type: "Babysitter",
    name: "Medine Ceferova",
    price_per_day: 33,
    rating: 4.8,
    image: medineCeferovaImage,
    description: "Gentle and caring babysitter perfect for younger children and toddlers.",
    fullDescription: "Medine specializes in caring for infants and toddlers. Her gentle approach and attention to detail ensure that even the youngest children are well-cared for. She creates a safe, nurturing environment while parents enjoy their hiking adventure.",
    available: true
  },
  {
    id: "maryanne",
    type: "Babysitter",
    name: "Mary Anne",
    price_per_day: 40,
    rating: 4.9,
    image: maryAnneImage,
    description: "Bilingual babysitter with international childcare experience.",
    fullDescription: "Mary Anne brings international childcare experience to Azerbaijan. Fluent in English and Azerbaijani, she's perfect for international families. Her structured approach includes educational activities, storytelling, and age-appropriate games.",
    available: true
  },
  {
    id: "elnarehaciyeva",
    type: "Babysitter",
    name: "Elnare Haciyeva",
    price_per_day: 36,
    rating: 4.8,
    image: elnareHaciyevaImage,
    description: "Creative babysitter who organizes arts and crafts activities for children.",
    fullDescription: "Elnare combines childcare with creative expression. She organizes nature-inspired arts and crafts, storytelling sessions, and educational games. Her artistic approach helps children learn about nature while having fun and creating memories.",
    available: true
  },
  {
    id: "amyjane",
    type: "Babysitter",
    name: "Amy Jane",
    price_per_day: 34,
    rating: 4.7,
    image: amyJaneImage,
    description: "Friendly and reliable babysitter with flexible scheduling.",
    fullDescription: "Amy Jane is known for her reliability and flexibility. She adapts to different family needs and schedules. Her friendly personality makes children feel at ease, and she's great at managing groups of children of different ages.",
    available: true
  },
  {
    id: "backpack50l",
    type: "Equipment",
    name: "Pro Hiker Backpack (50L)",
    price_per_day: 15,
    rating: 4.7,
    image: equipment1,
    description: "Lightweight, waterproof backpack suitable for multi-day treks.",
    fullDescription: "This 50L backpack is designed for comfort and durability. Features include a fully adjustable suspension system, integrated rain cover, and multiple compartments for organized packing. Perfect for 2-3 day hiking trips.",
    available: true
  },
  {
    id: "trekkingboots",
    type: "Equipment",
    name: "Alpine Trekking Boots",
    price_per_day: 12,
    rating: 4.6,
    image: equipment2,
    description: "Sturdy boots with excellent ankle support for rugged terrain.",
    fullDescription: "High-quality leather boots with Vibram soles for superior grip on rocky and slippery surfaces. Waterproof Gore-Tex lining ensures your feet stay dry in all conditions. Available in sizes 36-46.",
    available: true
  },
  {
    id: "tent2person",
    type: "Equipment",
    name: "2-Person Tent",
    price_per_day: 25,
    rating: 4.8,
    image: equipment3,
    description: "Easy to set up, weather-resistant tent for camping trips.",
    fullDescription: "A lightweight 3-season tent that offers great protection against wind and rain. Quick and easy to pitch with color-coded poles. Spacious interior with double vestibules for gear storage.",
    available: true
  },
  {
    id: "sleepingbag",
    type: "Equipment",
    name: "Sleeping Bag",
    price_per_day: 10,
    rating: 4.7,
    image: sleepingBagImage,
    description: "Warm and comfortable sleeping bag for overnight camping adventures.",
    fullDescription: "Designed for cold weather conditions, this sleeping bag keeps you warm during chilly mountain nights. Compact and lightweight design makes it easy to carry. Perfect for camping trips and multi-day hikes.",
    available: true
  },
  {
    id: "backpack20l",
    type: "Equipment",
    name: "Lightweight Daypack (20L)",
    price_per_day: 8,
    rating: 4.5,
    image: backpackCheap20lImage,
    description: "Affordable daypack perfect for short hikes and day trips.",
    fullDescription: "Ideal for day hikes and short adventures. This 20-liter backpack is compact yet spacious enough for essentials like water, snacks, and extra layers. Comfortable shoulder straps and breathable back panel.",
    available: true
  },
  {
    id: "tetonrucksack",
    type: "Equipment",
    name: "Heavy Duty Teton Rucksack",
    price_per_day: 18,
    rating: 4.9,
    image: heavyDutyTetonRucksackImage,
    description: "Durable and spacious rucksack for extended hiking expeditions.",
    fullDescription: "Built for serious hikers who need reliable gear for long trips. This heavy-duty rucksack features reinforced stitching, multiple compartments, and excellent weight distribution. Perfect for multi-day expeditions.",
    available: true
  },
  {
    id: "hikingvisor",
    type: "Equipment",
    name: "Hiking Visor",
    price_per_day: 5,
    rating: 4.6,
    image: hikingVisorImage,
    description: "UV-protective visor to keep sun out of your eyes on bright trails.",
    fullDescription: "Lightweight and breathable visor that provides excellent sun protection while allowing airflow. Adjustable strap ensures a comfortable fit. Perfect for sunny day hikes and mountain treks.",
    available: true
  },
  {
    id: "hikingglovesexpensive",
    type: "Equipment",
    name: "Premium Hiking Gloves",
    price_per_day: 7,
    rating: 4.8,
    image: hikingGloveExpensiveImage,
    description: "High-quality gloves with superior grip and weather protection.",
    fullDescription: "Professional-grade hiking gloves designed for challenging conditions. Features excellent grip, waterproof materials, and reinforced palms. Ideal for rocky terrain and cold weather hiking.",
    available: true
  },
  {
    id: "hikingglovescheap",
    type: "Equipment",
    name: "Budget Hiking Gloves",
    price_per_day: 4,
    rating: 4.4,
    image: hikingGloveCheapImage,
    description: "Affordable gloves perfect for casual hiking and warm weather.",
    fullDescription: "Lightweight and comfortable gloves that provide basic protection and grip. Great for beginners or warm-weather hikes. Good value for occasional hikers.",
    available: true
  },
  {
    id: "hikingheadlight",
    type: "Equipment",
    name: "Hiking Headlamp",
    price_per_day: 6,
    rating: 4.7,
    image: hikingHeadLightImage,
    description: "Bright LED headlamp for early morning starts and night hikes.",
    fullDescription: "Essential for early morning departures and evening hikes. This headlamp features multiple brightness settings, long battery life, and comfortable headband. Water-resistant design ensures reliability in all conditions.",
    available: true
  },
  {
    id: "salomonboots",
    type: "Equipment",
    name: "Salomon Quest Hiking Boots",
    price_per_day: 15,
    rating: 4.9,
    image: salomonQuestBootsImage,
    description: "Premium hiking boots with advanced traction and ankle support.",
    fullDescription: "Top-of-the-line hiking boots from Salomon. Features Contagrip sole technology for superior grip on all terrains, advanced cushioning, and excellent ankle support. Perfect for challenging mountain trails.",
    available: true
  },
  {
    id: "fullropekit",
    type: "Equipment",
    name: "Complete Hiking Rope Kit",
    price_per_day: 20,
    rating: 4.8,
    image: fullHikingRopeKitImage,
    description: "Professional rope kit with all necessary safety equipment.",
    fullDescription: "Comprehensive rope kit including climbing rope, carabiners, and safety equipment. Essential for technical hikes, rock scrambling, and mountaineering. All gear is certified and regularly inspected for safety.",
    available: true
  },
  {
    id: "hikingropes",
    type: "Equipment",
    name: "Hiking Ropes Set",
    price_per_day: 12,
    rating: 4.6,
    image: hikingRopesImage,
    description: "Reliable rope set for basic climbing and safety purposes.",
    fullDescription: "High-quality climbing ropes suitable for basic mountaineering and safety applications. Lightweight yet durable, these ropes are perfect for guided climbs and technical trail sections.",
    available: true
  },
  {
    id: "bendablehikingrod",
    type: "Equipment",
    name: "Bendable Hiking Pole",
    price_per_day: 5,
    rating: 4.5,
    image: bendableHikingRodImage,
    description: "Adjustable and collapsible hiking pole for extra support on trails.",
    fullDescription: "Lightweight and collapsible hiking pole that provides stability and reduces strain on knees and joints. Adjustable height and shock-absorbing technology make it ideal for all types of terrain.",
    available: true
  },
  {
    id: "hikingpickaxecheap",
    type: "Equipment",
    name: "Budget Hiking Pickaxe",
    price_per_day: 10,
    rating: 4.3,
    image: hikingPickaxeCheapImage,
    description: "Affordable pickaxe for basic ice and snow conditions.",
    fullDescription: "Entry-level hiking pickaxe suitable for basic mountaineering and winter conditions. Good value option for occasional winter hikes and snow-covered trails.",
    available: true
  },
  {
    id: "hikingpickaxepricy",
    type: "Equipment",
    name: "Premium Mountaineering Ice Axe",
    price_per_day: 18,
    rating: 4.9,
    image: hikingPickaxePricyImage,
    description: "Professional-grade ice axe for advanced mountaineering.",
    fullDescription: "High-end mountaineering ice axe designed for serious climbers. Features premium materials, excellent balance, and superior grip. Essential equipment for winter mountaineering and glacier crossings.",
    available: true
  },
  {
    id: "fullqualitykit",
    type: "Equipment",
    name: "Complete Quality Hiking Kit",
    price_per_day: 45,
    rating: 5.0,
    image: fullQualityKitImage,
    description: "All-in-one premium hiking equipment package.",
    fullDescription: "Comprehensive hiking kit containing all essential gear: backpack, tent, sleeping bag, boots, headlamp, and safety equipment. Everything you need for a multi-day adventure in one convenient package. Perfect for first-time hikers or those traveling light.",
    available: true
  }
];

export const groupHikes: GroupHike[] = [
  {
    id: 1,
    title: "Weekend Waterfall Chase",
    routeId: 3,
    date: "2025-06-15",
    time: "09:00 AM",
    host: "Nature Lovers Club",
    participants: 8,
    participantNames: ["John Doe", "Alice Smith", "Murad Aliyev", "Nigar Qasimli"],
    maxParticipants: 15,
    description: "Join us for a refreshing hike to Yeddi Gozel Waterfall. Beginners welcome!"
  },
  {
    id: 2,
    title: "Shahdag Summit Push",
    routeId: 5,
    date: "2025-07-20",
    time: "05:00 AM",
    host: "Extreme Hikers AZ",
    participants: 4,
    participantNames: ["Mike Johnson", "Elena Petrova"],
    maxParticipants: 10,
    description: "Attempting the summit of Shahdag. Only for experienced hikers with proper gear."
  },
  {
    id: 3,
    title: "Sunset at Candy Cane Mountains",
    routeId: 2,
    date: "2025-05-28",
    time: "04:30 PM",
    host: "Photo Trekkers",
    participants: 12,
    participantNames: ["Samir Guliyev", "Aynur Mammadova", "David Wilson"],
    maxParticipants: 20,
    description: "A relaxed hike to capture the golden hour at the colorful mountains. Bring your camera!"
  }
];
