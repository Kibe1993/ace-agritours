import FeaturedGrid from "@/components/homepage/Featured/FeaturedGrid";
import Hero from "@/components/homepage/Hero/Hero";
import InitiativeSection from "@/components/homepage/Initiative/InitiativeCard";
import TestimonialGrid from "@/components/homepage/Testimonials/TestimonialGrid";
import WhyUSGrid from "@/components/homepage/WhyUS/WhyUs";

export default function Home() {
  return (
    <main className="pt-[100px] min-h-screen bg-white">
      <Hero />
      <WhyUSGrid />
      <FeaturedGrid />
      <TestimonialGrid />
      <InitiativeSection />
    </main>
  );
}
