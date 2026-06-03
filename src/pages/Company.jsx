import CompanyHero from "../components/company/CompanyHero";
import Journey from "../components/company/Journey";
import Advantage from "../components/company/Advantage";
import Leadership from "../components/company/Leadership";
import CTASection from "../components/common/CTASection";

export default function Company() {
  return (
    <>
      <CompanyHero />
      <Journey />
      <Advantage />
      <Leadership />
      <CTASection />
    </>
  );
}