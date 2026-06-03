export const faqs = [
  {
    question: "How quickly can we start a project?",
    answer:
      "Our engineering team typically requires a 2-week discovery phase before technical kickoff.",
  },
  {
    question: "Do you offer on-site consulting?",
    answer:
      "Yes, for enterprise-tier projects our senior architects can provide on-site support globally.",
  },
  {
    question: "What are your support SLAs?",
    answer:
      "Enterprise SLA guarantees a 4-hour response time with 24/7 critical support.",
  },
  {
    question: "Can we integrate with existing infrastructure?",
    answer:
      "Yes. Our solutions are API-first and designed for legacy and modern systems.",
  },
];

export default function FAQ() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">

      <div className="text-center mb-16">

        <h2 className="text-5xl font-bold mb-4">
          Common Inquiries
        </h2>

        <p className="text-slate-400">
          Quick answers to frequently asked questions.
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6"
          >
            <h4 className="font-semibold mb-3">
              {faq.question}
            </h4>

            <p className="text-slate-400">
              {faq.answer}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}