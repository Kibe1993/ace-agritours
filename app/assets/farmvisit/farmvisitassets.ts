import aquaculture from "../../assets/farmvisit/aquaculture.jpg";
import livestock from "../../assets/farmvisit/livestock.jpg";
import beekeeping from "../../assets/farmvisit/beekeeping.jpg";
import horticulture from "../../assets/farmvisit/hoticulture.jpg";
import poultry from "../../assets/farmvisit/poutry.jpg";
import { StaticImageData } from "next/image";

import chicken1 from "./images/chicken1.jpg";
import chicken2 from "./images/chicken2.jpg";
import chicken3 from "./images/chicken3.jpg";

import livestock1 from "./images/livestock1.jpg";
import livestock2 from "./images/livestock2.jpg";
import livestock3 from "./images/livestock3.jpg";

export interface FarmVisit {
  id: string;
  slug: string;
  title: string;
  location: string;
  area: string; // ✅ Add this line
  date: string;
  time: string;
  category: string;
  guests: number;
  description: string;
  images: StaticImageData[];
  trainer: string;
  highlights: string[];
  treatmentSummary: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  feedback: {
    name: string;
    comment: string;
    rating: number;
  }[];
}
const description = `
  <h2>🐄 Introduction to Dairy Cows</h2>
  <p>Dairy cows are a cornerstone of agricultural economies and daily nutrition for millions of people around the world. These remarkable animals are bred and cared for specifically for their milk production...</p>

  <h3>🧬 Breeds and Characteristics</h3>
  <ul>
    <li><strong>Holstein-Friesian:</strong> The most common breed worldwide, known for high milk yield.</li>
    <li><strong>Jersey:</strong> Smaller in size but produces rich, high-fat milk.</li>
    <li><strong>Guernsey, Brown Swiss, and Ayrshire:</strong> Popular for balance of quantity and quality.</li>
  </ul>

  <h3>🍽 Feeding and Nutrition</h3>
  <p>Proper nutrition is essential for optimal milk production. Dairy cows are typically fed a combination of:</p>
  <ul>
    <li>Fresh pasture (especially in rotational grazing systems)</li>
    <li>Silage (fermented grasses or maize)</li>
    <li>Grains and concentrates rich in energy and protein</li>
    <li>Mineral supplements to ensure balanced calcium, phosphorus, and vitamin intake</li>
  </ul>

  <h3>🥛 Milking Process</h3>
  <p>Modern dairy farms often use automated milking machines to reduce stress...</p>

  <h3>🩺 Health and Welfare</h3>
  <p>Animal welfare is a critical component of dairy farming. Cows receive regular veterinary checkups...</p>

  <h3>🌍 Role in Sustainable Farming</h3>
  <p>Dairy cows also contribute to sustainability when managed correctly...</p>
`;

export const farmVisits: FarmVisit[] = [
  {
    id: "1",
    slug: "green-valley-dairy-farm",
    title: "Green Valley Dairy Farm",
    location: "Nyeri",
    area: "Othaya, Nyeri",
    date: "2025-08-14",
    time: "10:00 AM",
    category: "Livestock",
    guests: 18,
    trainer: "Mr. Daniel Kamau",
    highlights: [
      "Advanced milking technologies",
      "Sustainable dairy practices",
      "Hands-on cow milking",
      "Feeding and breeding routines",
    ],
    description: description,
    treatmentSummary:
      "Demonstrated modern feeding and milking techniques with a focus on sustainability.",
    images: [livestock1, livestock2, livestock3, beekeeping],
    contactInfo: {
      email: "info@greenvalleydairy.co.ke",
      phone: "+254700123456",
    },
    feedback: [
      {
        name: "Alice M.",
        comment: "Very informative and the cows are well-kept.",
        rating: 4.8,
      },
    ],
  },
  {
    id: "2",
    slug: "sunny-acres-poultry-farm",
    title: "Sunny Acres Poultry Farm",
    location: "Nakuru",
    area: "Saika, Nairobi",
    date: "2025-09-02",
    time: "10:00 AM",
    category: "Poultry",
    guests: 24,
    trainer: "Mr. John Mwangi",
    highlights: [
      "Organic egg production techniques",
      "Free-range poultry housing systems",
      "Feeding schedules and nutrition",
      "Disease management in poultry",
    ],
    description: description,
    treatmentSummary:
      "Hands-on training in free-range poultry systems and organic feeding methods.",
    images: [chicken1, chicken2, chicken3, livestock],
    contactInfo: {
      email: "info@sunnyacresfarm.co.ke",
      phone: "+254712345678",
    },
    feedback: [
      {
        name: "Grace W.",
        comment:
          "The visit was enlightening and very hands-on. Loved the trainer!",
        rating: 5,
      },
      {
        name: "Peter M.",
        comment:
          "Great hospitality and I learned a lot about poultry diseases.",
        rating: 4.5,
      },
    ],
  },
  {
    id: "3",
    slug: "lakeview-aquaculture-center",
    title: "Lakeview Aquaculture Center",
    location: "Kisumu",
    area: "Asembo Bay, Kisumu",
    date: "2025-10-21",
    time: "10:00 AM",
    category: "Aquaculture",
    guests: 12,
    trainer: "Ms. Achieng Odhiambo",
    highlights: [
      "Aquaponics system demo",
      "Fish breeding and feeding",
      "Water quality management",
      "Tilapia farming techniques",
    ],
    description: description,
    treatmentSummary:
      "Participants learned about sustainable aquaponics and fish nutrition systems.",
    images: [aquaculture, chicken1, livestock2, chicken3],
    contactInfo: {
      email: "contact@lakeviewaqua.co.ke",
      phone: "+254701234567",
    },
    feedback: [
      {
        name: "Kevin O.",
        comment: "Fascinating to see how aquaponics really works!",
        rating: 4.7,
      },
    ],
  },
  {
    id: "4",
    slug: "harvest-bloom-horticulture",
    title: "Harvest Bloom Horticulture",
    location: "Muranga",
    area: "Kandara, Muranga",
    date: "2025-07-28",
    time: "10:00 AM",
    category: "Horticulture",
    guests: 30,
    trainer: "Mrs. Lydia Wambui",
    highlights: [
      "Greenhouse farming techniques",
      "Irrigation system demos",
      "Organic vegetable production",
      "Herb cultivation tours",
    ],
    description: description,
    treatmentSummary:
      "Training focused on organic herb farming and smart irrigation systems.",
    images: [horticulture, chicken1, livestock3, chicken2],
    contactInfo: {
      email: "hello@harvestbloom.co.ke",
      phone: "+254703567890",
    },
    feedback: [
      {
        name: "Brian N.",
        comment: "So much practical knowledge packed into one visit!",
        rating: 4.9,
      },
    ],
  },
  {
    id: "5",
    slug: "golden-hive-apiaries",
    title: "14",
    location: "Kitui",
    area: "Kwa Vonza, Kitui",
    date: "2025-08-06",
    time: "10:00 AM",
    category: "Beekeeping",
    guests: 14,
    trainer: "Mr. Samson Mumo",
    highlights: [
      "Modern beekeeping practices",
      "Honey harvesting demos",
      "Hive construction and care",
      "Pollination education",
    ],
    description: description,
    treatmentSummary:
      "Focused on apiary setup, maintenance, and bee-friendly harvesting.",
    images: [beekeeping, horticulture, chicken3, aquaculture],
    contactInfo: {
      email: "goldenhive@farmkenya.co.ke",
      phone: "+254702345678",
    },
    feedback: [
      {
        name: "Lucy K.",
        comment: "Loved learning about bees! Plus, the honey was delicious!",
        rating: 5,
      },
    ],
  },
  {
    id: "6",
    slug: "fresh-field-greens",
    title: "Fresh Field Greens",
    location: "Kiambu",
    area: "Limuru, Kiambu",
    date: "2025-09-11",
    time: "10:00 AM",
    category: "Horticulture",
    guests: 22,
    trainer: "Ms. Brenda Chebet",
    highlights: [
      "Hydroponics system walkthrough",
      "Greenhouse vegetable tours",
      "Composting workshop",
      "Fresh produce sampling",
    ],
    description: description,
    treatmentSummary:
      "Visitors learned about hydroponic systems and nutrient-rich soil substitutes.",
    images: [livestock, beekeeping, poultry, aquaculture],
    contactInfo: {
      email: "info@freshfieldgreens.co.ke",
      phone: "+254700112233",
    },
    feedback: [
      {
        name: "Derrick T.",
        comment:
          "It was my first time seeing hydroponics in real life. Amazing stuff.",
        rating: 4.6,
      },
    ],
  },
  {
    id: "7",
    slug: "blue-waters-aquafarm",
    title: "Blue Waters Aquafarm",
    location: "Kiambu",
    area: "Githunguri, Kiambu",
    date: "2025-10-03",
    time: "10:00 AM",
    category: "Aquaculture",
    guests: 17,
    trainer: "Mr. Evans Otieno",
    highlights: [
      "Cage fishing method overview",
      "Fish harvesting demo",
      "Sustainable tilapia production",
      "Water recycling system tour",
    ],
    description: description,
    treatmentSummary:
      "Focus on cage fish farming and water quality optimization.",
    images: [aquaculture, horticulture, aquaculture, poultry],
    contactInfo: {
      email: "hello@bluewaters.co.ke",
      phone: "+254706789012",
    },
    feedback: [
      {
        name: "Janet W.",
        comment:
          "So much detail in how they operate their cages. Very organized.",
        rating: 4.7,
      },
    ],
  },
  {
    id: "8",
    slug: "maziwa-yetu-dairy-coop",
    title: "Maziwa Yetu Dairy Co-op",
    location: "Nyandarua",
    area: "Ol Kalou, Nyandarua",
    date: "2025-10-29",
    time: "10:00 AM",
    category: "Livestock",
    guests: 19,
    trainer: "Mrs. Mercy Njeri",
    highlights: [
      "Cooperative farming model",
      "Milk pasteurization and storage",
      "Feeding practices and silage",
      "Breeding management",
    ],
    description: description,
    treatmentSummary:
      "Training covered milk hygiene, storage, and co-op value chains.",
    images: [livestock1, livestock, livestock3, poultry],
    contactInfo: {
      email: "info@maziwayetu.co.ke",
      phone: "+254705123456",
    },
    feedback: [
      {
        name: "Joseph K.",
        comment: "The co-op system is eye-opening. I might try it myself.",
        rating: 4.8,
      },
    ],
  },
];

export interface VisitSchedule {
  id: string;
  slug: string;
  title: string;
  status: "Confirmed" | "Pending" | "Completed";
  location: string;
  category: string;
  date: string;
  time: string;
  guests: number;
  image: StaticImageData;
}

export const upcomingVisits: VisitSchedule[] = [
  {
    id: "1",
    slug: "green-valley-livestock-farm",
    title: "Green Valley Livestock Farm",
    status: "Confirmed",
    location: "Nakuru",
    category: "Livestock",
    date: "2024-03-15",
    time: "09:00 AM",
    guests: 4,
    image: livestock,
  },
  {
    id: "2",
    slug: "highland-coffee-plantation",
    title: "Highland Coffee Plantation",
    status: "Pending",
    location: "Kiambu",
    category: "Cash Crops",
    date: "2024-03-22",
    time: "10:30 AM",
    guests: 2,
    image: horticulture,
  },
  {
    id: "3",
    slug: "eco-harmony-organic-farm",
    title: "Eco-Harmony Organic Farm",
    status: "Confirmed",
    location: "Meru",
    category: "Organic",
    date: "2024-04-05",
    time: "11:00 AM",
    guests: 3,
    image: poultry,
  },
];
