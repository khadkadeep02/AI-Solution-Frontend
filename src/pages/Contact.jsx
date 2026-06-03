import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import FAQ from "../components/contact/FAQ";

export default function Contact() {
  return (
    <>
      <ContactHero />

      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid lg:grid-cols-1 gap-12">
          <ContactForm />
        </div>
      </section>

      <FAQ />
    </>
  );
}