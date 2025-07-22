import aquaculture from "../../assets/farmvisit/aquaculture.jpg";
import livestock from "../../assets/farmvisit/livestock.jpg";
import beekeeping from "../../assets/farmvisit/beekeeping.jpg";
import horticulture from "../../assets/farmvisit/hoticulture.jpg";
import poultry from "../../assets/farmvisit/poutry.jpg";
import { StaticImageData } from "next/image";

export interface FarmVisit {
  id: string;
  image: StaticImageData;
  name: string;
  category:
    | "Livestock"
    | "Poultry"
    | "Horticulture"
    | "Beekeeping"
    | "Aquaculture";
  location: string;
  description: string;
  date: string;
  guests: number;
}

export const farmVisits: FarmVisit[] = [
  {
    id: "1",
    image: livestock,
    name: "Green Valley Dairy Farm",
    category: "Livestock",
    location: "Nyeri",
    description:
      "Green Valley is a model dairy farm known for its sustainable practices and advanced milking technologies. Visitors enjoy hands-on experiences and learning sessions.",
    date: "2025-08-14",
    guests: 18,
  },
  {
    id: "2",
    image: poultry,
    name: "Sunny Acres Poultry Farm",
    category: "Poultry",
    location: "Nakuru",
    description:
      "Sunny Acres specializes in free-range chickens and organic egg production. The farm emphasizes community training and agricultural innovation.",
    date: "2025-09-02",
    guests: 24,
  },
  {
    id: "3",
    image: aquaculture,
    name: "Lakeview Aquaculture Center",
    category: "Aquaculture",
    location: "Kisumu",
    description:
      "This fish farm is located near Lake Victoria and is famous for its innovative aquaponics system. Guests learn about fish feeding, breeding, and water management.",
    date: "2025-10-21",
    guests: 12,
  },
  {
    id: "4",
    image: horticulture,
    name: "Harvest Bloom Horticulture",
    category: "Horticulture",
    location: "Muranga",
    description:
      "Harvest Bloom is a vibrant farm growing herbs and vegetables. It’s an excellent stop for anyone interested in irrigation systems and organic farming.",
    date: "2025-07-28",
    guests: 30,
  },
  {
    id: "5",
    image: beekeeping,
    name: "Golden Hive Apiaries",
    category: "Beekeeping",
    location: "Kitui",
    description:
      "Golden Hive trains visitors on modern beekeeping, honey harvesting, and hive care. A sweet learning experience in every sense.",
    date: "2025-08-06",
    guests: 14,
  },
  {
    id: "6",
    image: horticulture,
    name: "Fresh Field Greens",
    category: "Horticulture",
    location: "Kiambu",
    description:
      "This horticultural gem uses greenhouse and hydroponic techniques to grow fresh veggies year-round. Visitors get to try harvesting and packaging.",
    date: "2025-09-11",
    guests: 22,
  },
  {
    id: "7",
    image: aquaculture,
    name: "Blue Waters Aquafarm",
    category: "Aquaculture",
    location: "Kiambu",
    description:
      "Blue Waters focuses on sustainable tilapia production. Their cage fishing method in Lake Victoria draws big interest.",
    date: "2025-10-03",
    guests: 17,
  },
  {
    id: "8",
    image: livestock,
    name: "Maziwa Yetu Dairy Co-op",
    category: "Livestock",
    location: "Nyandarua",
    description:
      "Maziwa Yetu brings small dairy farmers together to process and market milk collectively. A great look into cooperative farming models.",
    date: "2025-10-29",
    guests: 19,
  },
];

export interface VisitSchedule {
  id: string;
  title: string;
  status: "Confirmed" | "Pending" | "Completed";
  location: string;
  category: string;
  date: string;
  time: string;
  guests: number;
  image: StaticImageData; // for Next.js Image component
}
export const upcomingVisits: VisitSchedule[] = [
  {
    id: "1",
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
