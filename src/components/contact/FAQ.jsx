import { useState } from "react";

export const faqs = [
  {
    question: "How quickly can we start a project?",
    answer:
      "Our engineering team typically requires a 2-week discovery phase before technical kickoff to ensure alignment on scope, architecture, and success criteria.",
  },
  {
    question: "Do you offer on-site consulting?",
    answer:
      "Yes. For enterprise-tier projects our senior architects can provide on-site support globally, including embedded delivery sprints at client locations.",
  },
  {
    question: "What are your support SLAs?",
    answer:
      "Enterprise SLA guarantees a 4-hour response time with 24/7 critical support, dedicated Slack channels, and a named account engineer.",
  },
  {
    question: "Can we integrate with existing infrastructure?",
    answer:
      "Yes. Our solutions are API-first and designed for both legacy and modern systems, with connectors for the most common enterprise data platforms.",
  },
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`text-left w-full px-8 py-7 transition-colors duration-150 ${
        isOpen ? "bg-[#0f1923]" : "bg-[#0d1117] hover:bg-[#0f1923]"
      }`}
    >
      <p className="text-[10px] font-medium text-slate-800 tabular-nums mb-2">
        0{index + 1}
      </p>

      <div className="flex items-start justify-between gap-4">
        <h4 className="text-sm font-medium text-slate-200 leading-snug flex-1">
          {faq.question}
        </h4>
        <svg
          className={`w-4 h-4 shrink-0 mt-0.5 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-400" : "text-slate-700"
          }`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      <div
        className={`overflow-hidden transition-all duration-250 ${
          isOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[13px] text-slate-500 leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </button>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-[11px] font-medium text-slate-700 uppercase tracking-[0.1em] mb-3">
          FAQs
        </p>
        <h2 className="text-4xl font-semibold text-slate-100 mb-3 leading-tight">
          Common inquiries
        </h2>
        <p className="text-sm text-slate-600">
          Quick answers to frequently asked questions.
        </p>
      </div>

      {/* Accordion grid — 1px gap renders as hairline dividers */}
      <div
        className="grid md:grid-cols-2 gap-px rounded-2xl overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        {faqs.map((faq, i) => (
          <FAQItem
            key={faq.question}
            faq={faq}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

    </section>
  );
}