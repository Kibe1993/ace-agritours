export interface TestimonialType {
  _id: string;
  name: string;
  title: string;
  location: string;
  rating: number;
  message: string;
  image: {
    url: string;
    public_id: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
export interface WhyUs {
  title: string;
  description: string;
  image: {
    url: string;
    public_id: string;
  };
}
export interface Partner {
  name: string;
  logo: {
    url: string;
    public_id: string;
  };
  website: string;
  description: string;
}

export interface FarmVisits {
  _id: string;
  slug: string;
  title: string;
  location: string;
  area: string;
  date: string;
  time: string;
  category: string;
  guests: number;
  trainer: string;
  highlights: string[];
  availableDays: string[];
  description: string;
  treatmentSummary: string;
  images: {
    url: string;
    public_id: string;
  }[];
  email: string;
  phone: string;
  feedback: {
    name: string;
    comment: string;
    rating: number;
  }[];
  status: string;
  featured: boolean;
}

type BlogCategory =
  | "Livestock"
  | "Aquaculture"
  | "Poultry"
  | "Beekeeping"
  | "Horticulture";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: BlogCategory;
  date: string;
  image: {
    url: string;
    public_id: string;
  };
  author: string;
  status: string;
  featured: boolean;
  createdAt: string;
}
export interface PlannedVisit {
  _id: string;
  title: string;
  slug: string;
  status: "Planned" | "Confirmed" | "Cancelled";
  location: string;
  category: "Livestock" | "Poultry" | "Aquaculture" | "Horticulture";
  date: string;
  time: string;
  guests: number;
  image: {
    url: string;
    public_id: string;
  };
  featured: boolean;
}

export interface Booking {
  _id: string;
  clerkId: string;
  name: string;
  phone: number;
  email: string;
  guests: number;
  status: "Unpaid" | "Paid";
  plannedVisitId: PlannedVisit;
  createdAt: string;
  updatedAt: string;
}
export interface UpdateFields {
  title: string;
  slug: string;
  description: string;
  category: string;
  date: string;
  author: string;
  image?: {
    url: string;
    public_id: string;
  };
}
