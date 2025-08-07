// assets.ts

import certified from "./certified.png";
import community from "./community.jpeg";
import education from "./education.jpeg";
import support from "./support.png";
import sustainable from "./sustainable.jpeg";
import training from "./training.avif";

import coffee from "./coffee.jpg";
import poutry from "./poutry.jpg";
import dairy from "./hero-1.jpg";
import pigs from "./ace-pig.jpg";
import { StaticImageData } from "next/image";

export type FarmVisit = {
  title: string;
  location: string;
  date: string;
  visitors: number;
  description: string;
  subtitle?: string;
  tags: string[];
  image: StaticImageData;
};
export type HeroFeature = {
  image: StaticImageData;
  title: string;
  p: string;
};
export const heroFeatures: HeroFeature[] = [
  {
    image: training,
    title: "Guided Farm Visits",
    p: "Experience authentic Kenyan agriculture with expert guides who share farming knowledge and sustainable practices.",
  },
  {
    image: community,
    title: "Community Connection",
    p: "Connect with local farmers, learn their stories, and build lasting relationships within agricultural communities.",
  },
  {
    image: sustainable,
    title: "Sustainable Practices",
    p: "Learn innovative and traditional farming methods that promote environmental sustainability and food security.",
  },
  {
    image: education,
    title: "Educational Resources",
    p: "Access our comprehensive library of agricultural knowledge, tips, and success stories from across Kenya.",
  },
  {
    image: support,
    title: "Support Local Farmers",
    p: "Your visit directly supports local farmers and contributes to the growth of sustainable agriculture in Kenya.",
  },
  {
    image: certified,
    title: "Certified Learning",
    p: "Receive certificates for completed farm visits and agricultural training programs.",
  },
  {
    image: support,
    title: "Support Local Farmers",
    p: "Your visit directly supports local farmers and contributes to the growth of sustainable agriculture in Kenya.",
  },
  {
    image: certified,
    title: "Certified Learning",
    p: "Receive certificates for completed farm visits and agricultural training programs.",
  },
];


export interface Testimonial {
  id: string;
  name: string;
  title: string;
  location: string;
  rating: number;
  message: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Wanjiku",
    title: "Aspiring Farmer",
    location: "Nairobi",
    rating: 5,
    message: `"ACEAgritours opened my eyes to modern farming techniques. The visit to the Nyeri coffee plantation was life-changing. I learned so much about sustainable practices that I'm now implementing on my own small farm."`,
    image: "https://via.placeholder.com/60?text=👩‍🌾",
  },
  {
    id: "2",
    name: "John Mwangi",
    title: "Agri Student",
    location: "Eldoret",
    rating: 4,
    message: `"I appreciated the hands-on approach to learning. The sessions on irrigation systems and composting were especially insightful."`,
    image: "https://via.placeholder.com/60?text=🧑‍🎓",
  },
  {
    id: "3",
    name: "Grace Achieng",
    title: "Tea Farmer",
    location: "Kericho",
    rating: 5,
    message: `"After the training, I switched to organic fertilizers and saw immediate improvement in my yield. I recommend ACEAgritours to every farmer I meet."`,
    image: "https://via.placeholder.com/60?text=🌱",
  },
];
export type WhyUsCard = {
  title: string;
  description: string;
  image: StaticImageData;
};
export const whyUsData: WhyUsCard[] = [
  {
    title: "Authentic Farm Experiences",
    description:
      "Step into real Kenyan farms, interact with local farmers, and experience the heartbeat of agriculture up close. No filters, no staged setups—just the real thing.",
    image: certified,
  },
  {
    title: "Support Local Communities",
    description:
      "Every visit directly contributes to the livelihoods of small-scale farmers and rural families, creating lasting impact beyond tourism.",
    image: support,
  },
  {
    title: "Educational & Eye-Opening",
    description:
      "Whether you're a student, traveler, or curious explorer, our tours offer immersive lessons in farming, sustainability, and food systems.",
    image: education,
  },
  {
    title: "Safe, Guided Adventures",
    description:
      "Our experienced guides ensure you feel safe and informed throughout your journey—whether you're walking through fields or milking a cow!",
    image: community,
  },
];

// types.ts
export interface Partner {
  name: string;
  logo: string;
  website: string;
  description: string;
}

export const partnersData: Partner[] = [
  {
    name: "GreenHarvest Ltd",
    logo: "https://cdn-icons-png.flaticon.com/512/2909/2909761.png",
    website: "https://greenharvest.co.ke",
    description:
      "Promoting sustainable farming practices and organic agriculture across Kenya.",
  },
  {
    name: "AgroTech Africa",
    logo: "https://img.icons8.com/color/96/sprout.png",
    website: "https://agrotechafrica.org",
    description:
      "Innovating farming through precision agriculture and tech-driven solutions.",
  },
  {
    name: "Kenya Farmers Union",
    logo: "https://img.icons8.com/color/96/tractor.png",
    website: "https://kfu.or.ke",
    description:
      "Empowering local farmers through education, finance, and community support.",
  },
  {
    name: "FreshFoods Exporters",
    logo: "https://img.icons8.com/color/96/organic-food.png",
    website: "https://freshfoods.co.ke",
    description:
      "Connecting local producers with global markets for fresh, organic produce.",
  },
];
