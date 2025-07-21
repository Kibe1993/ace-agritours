import FeaturedGrid from "@/components/Featured/FeaturedGrid";
import Hero from "@/components/Hero/Hero";
import InitiativeSection from "@/components/Initiative/InitiativeCard";
import TestimonialGrid from "@/components/Testimonials/TestimonialGrid";
import WhyUSGrid from "@/components/WhyUS/WhyUs";

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
