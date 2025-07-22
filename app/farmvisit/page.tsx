import ContactUs from "@/components/FarmVisitPage/cta/ContactUs";
import FarmVisitHero from "@/components/FarmVisitPage/FarmVisitHero/FarmVisitHero";
import OurVisitsGrid from "@/components/FarmVisitPage/Ourvists/OutVisitGrid";
import PlannedVisits from "@/components/FarmVisitPage/PlannedVisits/PlannedVisits";

export default function FarmVisitPage() {
  return (
    <>
      <FarmVisitHero />
      <OurVisitsGrid />
      <PlannedVisits />
      <ContactUs />
    </>
  );
}
