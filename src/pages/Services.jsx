import ServicesHero from "../components/services/ServicesHero";
import ServicesGrid from "../components/services/ServicesGrid";
import Methodology from "../components/services/Methodology";
import CTASection from "../components/common/CTASection";

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <Methodology />
      <CTASection />
    </>
  );
}