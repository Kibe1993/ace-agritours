import aquaculture from "../../assets/farmvisit/aquaculture.jpg";
import livestock from "../../assets/farmvisit/livestock.jpg";
import beekeeping from "../../assets/farmvisit/beekeeping.jpg";
import poultry from "../../assets/farmvisit/poutry.jpg";
import { StaticImageData } from "next/image";

export type BlogCategory =
  | "Livestock"
  | "Aquaculture"
  | "Poultry"
  | "Beekeeping";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: BlogCategory;
  date: string;
  image: StaticImageData;
  author: string; // ✅ New field
};

// Utility to convert titles to slugs
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const dummyDescription = `
  <h2>Inside Kenya’s Farming Legacy</h2>

  <p>Agriculture in Kenya is more than just a livelihood—it's a legacy passed down through generations. From the sunlit tea plantations in Kericho to the rolling maize fields of the Rift Valley, each farm tells a unique story of resilience, innovation, and community spirit.</p>

  <h3>Tradition Meets Innovation</h3>
  <p>Modern-day farmers are blending traditional techniques with new-age tools to boost productivity and sustainability. Smart irrigation systems, organic composting, and crop rotation are being adopted to enhance yields while protecting the environment for future generations.</p>

  <h3>Farming as a Family and Community Affair</h3>
  <p>Farming is more than work—it's part of family culture. Knowledge is passed down through generations, often shared around dinner tables. Women are also stepping into leadership, managing farms, and forming cooperatives that empower entire villages.</p>

  <h3>Agritourism: Where Farming Meets Experience</h3>
  <p>Kenyan farmers are now inviting visitors to their farms for immersive experiences—milking cows, feeding goats, or learning about coffee processing. These activities both educate and provide extra income, bridging urban-rural understanding.</p>

  <p><em>Whether you're a student, policymaker, or just curious about where your food comes from—this is your window into the soul of Kenyan agriculture.</em></p>
`;

export const blogData: Blog[] = [
  {
    id: "1",
    title: "Best Practices for Cattle Rearing in Kenya",
    slug: slugify("Best Practices for Cattle Rearing in Kenya"),
    description: dummyDescription,
    category: "Livestock",
    date: "2025-06-15",
    image: livestock,
    author: "Richard Kibe",
  },
  {
    id: "2",
    title: "How to Start a Profitable Fish Farm",
    slug: slugify("How to Start a Profitable Fish Farm"),
    description: dummyDescription,
    category: "Aquaculture",
    date: "2025-06-17",
    image: aquaculture,
    author: "Richard Kibe",
  },
  {
    id: "3",
    title: "Raising Broilers for Profit in Small Spaces",
    slug: slugify("Raising Broilers for Profit in Small Spaces"),
    description: dummyDescription,
    category: "Poultry",
    date: "2025-06-20",
    image: poultry,
    author: "Richard Kibe",
  },
  {
    id: "4",
    title: "Modern Beekeeping Techniques for Busy Farmers",
    slug: slugify("Modern Beekeeping Techniques for Busy Farmers"),
    description: dummyDescription,
    category: "Beekeeping",
    date: "2025-06-22",
    image: beekeeping,
    author: "Richard Kibe",
  },
  {
    id: "5",
    title: "Common Diseases in Goats and How to Treat Them",
    slug: slugify("Common Diseases in Goats and How to Treat Them"),
    description: dummyDescription,
    category: "Livestock",
    date: "2025-06-25",
    image: livestock,
    author: "Richard Kibe",
  },
  {
    id: "6",
    title: "Feeding Tilapia: What You Should Know",
    slug: slugify("Feeding Tilapia: What You Should Know"),
    description: dummyDescription,
    category: "Aquaculture",
    date: "2025-06-27",
    image: aquaculture,
    author: "Richard Kibe",
  },
  {
    id: "7",
    title: "Free-Range vs Battery Cage Poultry Systems",
    slug: slugify("Free-Range vs Battery Cage Poultry Systems"),
    description: dummyDescription,
    category: "Poultry",
    date: "2025-06-29",
    image: poultry,
    author: "Richard Kibe",
  },
  {
    id: "8",
    title: "Harvesting Honey Safely and Efficiently",
    slug: slugify("Harvesting Honey Safely and Efficiently"),
    description: dummyDescription,
    category: "Beekeeping",
    date: "2025-07-01",
    image: beekeeping,
    author: "Richard Kibe",
  },
  {
    id: "9",
    title: "How to Start a Dairy Goat Farm",
    slug: slugify("How to Start a Dairy Goat Farm"),
    description: dummyDescription,
    category: "Livestock",
    date: "2025-07-03",
    image: livestock,
    author: "Richard Kibe",
  },
  {
    id: "10",
    title: "Breeding Catfish in Concrete Tanks",
    slug: slugify("Breeding Catfish in Concrete Tanks"),
    description: dummyDescription,
    category: "Aquaculture",
    date: "2025-07-05",
    image: aquaculture,
    author: "Richard Kibe",
  },
  {
    id: "11",
    title: "Vaccination Schedule for Healthy Layers",
    slug: slugify("Vaccination Schedule for Healthy Layers"),
    description: dummyDescription,
    category: "Poultry",
    date: "2025-07-08",
    image: poultry,
    author: "Richard Kibe",
  },
  {
    id: "12",
    title: "How to Attract Bees to Your Hive Naturally",
    slug: slugify("How to Attract Bees to Your Hive Naturally"),
    description: dummyDescription,
    category: "Beekeeping",
    date: "2025-07-10",
    image: beekeeping,
    author: "Richard Kibe",
  },
];
