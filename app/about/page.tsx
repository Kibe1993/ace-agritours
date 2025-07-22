import AboutHeroSection from "@/components/About-Section/Hero/AboutHero";
import OurServicesSection from "@/components/About-Section/OurServices/OurServices";
import OurStoriesSection from "@/components/About-Section/OurStories/OutStories";
import PartnerGrid from "@/components/About-Section/Partners/PartnersGrid";
import StatsSection from "@/components/About-Section/Statistics/Stats";
import WhyUsGrid from "@/components/About-Section/WhyUs/WhyUsGrid";

export default function About() {
  return (
    <>
      <AboutHeroSection />
      <OurStoriesSection />
      <OurServicesSection />
      <WhyUsGrid />
      <PartnerGrid />
      <StatsSection />
    </>
  );
}
