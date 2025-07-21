import AboutHeroSection from "@/components/About-Section/Hero/AboutHero";
import OurServicesSection from "@/components/About-Section/OurServices/OurServices";
import OurStoriesSection from "@/components/About-Section/OurStories/OutStories";
import PartnerGrid from "@/components/About-Section/Partners/PartnersGrid";
import WhyUsGrid from "@/components/About-Section/WhyUs/WhyUsGrid";
import WhyUSGrid from "@/components/WhyUS/WhyUs";

export default function About() {
  return (
    <>
      <AboutHeroSection />
      <OurStoriesSection />
      <OurServicesSection />
      <WhyUsGrid />
      <PartnerGrid />
    </>
  );
}
