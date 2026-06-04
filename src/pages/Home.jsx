import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import ServicesPreview from "../components/home/ServicesPreview";
import Testimonials from "../components/home/Testimonials";
import CTASection from "../components/common/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Testimonials />
      <CTASection />
    </>
  );
}