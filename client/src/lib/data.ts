import heroImage from "@assets/generated_images/hero_image_of_a_majestic_mountain_landscape.png";
import lahijImage from "@assets/generated_images/hiking_trail_in_a_green_canyon.png";
import shahdagImage from "@assets/generated_images/snowy_mountain_peak_hiking_trail.png";
import goygolImage from "@assets/generated_images/lake_surrounded_by_forest_and_mountains.png";
import xinaliqImage from "@assets/generated_images/high_altitude_mountain_village_path.png";
import candyCaneImage from "@assets/generated_images/striped_red_and_white_clay_hills.png";
import qabalaImage from "@assets/generated_images/forest_waterfall_hiking_trail.png";

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

export interface User {
  name: string;
  avatar: string;
  completedHikes: number[]; // IDs of completed routes
  badges: UserBadge[];
  totalKm: number;
  totalElevation: number;
}

export const routes: Route[] = [
  {
    id: 1,
    name: "Lahij – Niyalçay Trail",
    region: "Ismayilli",
    difficulty: "Medium",
    distance_km: 11.3,
    elevation_m: 540,
    coordinates: [40.847, 48.366],
    duration_hours: 4.5,
    image: lahijImage,
    description: "Scenic trail passing through canyon views and forest paths connecting ancient villages.",
    fullDescription: "The trail starts from the historic copper-craft village of Lahij, winding through the Niyal mountains. You'll experience breathtaking views of the river canyon, navigate through dense forests, and cross small mountain streams. Best visited in late spring and early autumn."
  },
  {
    id: 2,
    name: "Shahdag Peak Route",
    region: "Gusar",
    difficulty: "Hard",
    distance_km: 16.5,
    elevation_m: 1200,
    coordinates: [41.286, 48.015],
    duration_hours: 7.5,
    image: shahdagImage,
    description: "Challenging alpine ascent with dramatic snow-capped peaks and rugged terrain.",
    fullDescription: "A serious hike for experienced trekkers. This route takes you towards the base of Shahdag mountain. Expect rapid weather changes, steep rocky ascents, and unparalleled panoramic views of the Greater Caucasus range."
  },
  {
    id: 3,
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
  },
  {
    id: 4,
    name: "Xinaliq to Galakhudat",
    region: "Quba",
    difficulty: "Medium",
    distance_km: 8.5,
    elevation_m: 420,
    coordinates: [41.179, 48.127],
    duration_hours: 3.5,
    image: xinaliqImage,
    description: "High-altitude trek between ancient mountain villages above the clouds.",
    fullDescription: "Starting from Europe's highest inhabited village, Xinaliq, this trail offers a glimpse into ancient mountain life. The path follows the ridge with views of deep valleys and jagged peaks, ending in the remote village of Galakhudat."
  },
  {
    id: 5,
    name: "Candy Cane Mountains",
    region: "Khizi",
    difficulty: "Easy",
    distance_km: 4.0,
    elevation_m: 220,
    coordinates: [40.873, 49.066],
    duration_hours: 1.5,
    image: candyCaneImage,
    description: "Surreal landscape of red and white striped clay hills.",
    fullDescription: "A geological wonder that looks like another planet. The striped hills are formed by layers of shale and iron compounds. It's an open terrain hike with no shade, so bring water and sun protection. The colors are most vibrant after rain."
  },
  {
    id: 6,
    name: "Yeddi Gozel Waterfall",
    region: "Gabala",
    difficulty: "Medium",
    distance_km: 6.8,
    elevation_m: 380,
    coordinates: [40.956, 47.881],
    duration_hours: 3,
    image: qabalaImage,
    description: "Forest trail leading to the famous 'Seven Beauties' waterfalls.",
    fullDescription: "A refreshing hike through dense deciduous forest. The sound of water accompanies you as you climb a series of stairs and paths to reach the different tiers of the waterfall. Can be slippery, so good shoes are essential."
  },
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
