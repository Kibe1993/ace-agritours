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
  description?: string;
  treatmentSummary?: string;
  images: {
    url: string;
    public_id?: string;
  }[];
  email: string;
  phone: string;
  feedback?: {
    name: string;
    comment: string;
    rating: number;
  }[];
  status: string;
  featured: boolean;
}
