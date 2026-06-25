import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const COUNTRIES = [
  "United States", "United Kingdom", "Germany",
  "Japan", "India", "Australia", "Canada",
];

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-medium text-slate-700 uppercase tracking-[0.07em]">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "bg-[#080e1a] border border-white/[0.07] focus:border-blue-500/40 rounded-xl px-4 py-2.5 text-[13px] text-slate-200 placeholder-slate-800 outline-none transition-colors duration-150 w-full";

export default function ContactForm() {
  const [fullName, setFullName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [company, setCompany]     = useState("");
  const [country, setCountry]     = useState("United States");
  const [jobTitle, setJobTitle]   = useState("");
  const [message, setMessage]     = useState("");
  const [status, setStatus]       = useState("idle");
  const [feedback, setFeedback]   = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      await axios.post(`${API_BASE}/inquiries/`, {
        full_name: fullName,
        email,
        phone,
        company,
        country,
        designation: jobTitle,
        project_description: message,
        status: "NEW",
      });

      setStatus("success");
      setFeedback("Your inquiry has been submitted. We'll contact you within 24 hours.");
      setFullName(""); setEmail(""); setPhone("");
      setCompany(""); setCountry("United States");
      setJobTitle(""); setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedback("Unable to submit your inquiry right now. Please try again later.");
    }
  };

  return (
    <div className="bg-[#0f1923] border border-white/[0.07] rounded-2xl p-10">

      {/* Header */}
      <p className="text-[10px] font-medium text-slate-700 uppercase tracking-[0.1em] mb-2">
        Get in touch
      </p>
      <h2 className="text-2xl font-semibold text-slate-100 mb-1.5">
        Project inquiry
      </h2>
      <p className="text-[13px] text-slate-600 mb-8">
        Tell us about your project and we'll be in touch within 24 hours.
      </p>

      <form className="space-y-3" onSubmit={handleSubmit}>

        <div className="grid md:grid-cols-2 gap-3">
          <Field label="Full name">
            <input value={fullName} onChange={(e) => setFullName(e.target.value)}
              placeholder="Sarah Reynolds" required className={inputCls} />
          </Field>
          <Field label="Email address">
            <input value={email} onChange={(e) => setEmail(e.target.value)}
              type="email" placeholder="sarah@company.com" required className={inputCls} />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <Field label="Phone number">
            <input value={phone} onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000" required className={inputCls} />
          </Field>
          <Field label="Company">
            <input value={company} onChange={(e) => setCompany(e.target.value)}
              placeholder="Meridian Capital" className={inputCls} />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <Field label="Country">
            <select value={country} onChange={(e) => setCountry(e.target.value)}
              className={`${inputCls} cursor-pointer`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23334155' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                paddingRight: "36px",
                appearance: "none",
              }}
            >
              {COUNTRIES.map((c) => (
                <option key={c} className="bg-[#0f1923]">{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Job title">
            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
              placeholder="CTO" className={inputCls} />
          </Field>
        </div>

        <Field label="Project description">
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}
            rows={4} required placeholder="Tell us about your project, goals, and timeline..."
            className={`${inputCls} resize-none leading-relaxed`} />
        </Field>

        <div className="h-px bg-white/[0.05] my-2" />

        {feedback && (
          <p className={`text-xs px-4 py-2.5 rounded-lg border ${
            status === "success"
              ? "bg-teal-500/[0.07] text-teal-400 border-teal-500/20"
              : "bg-red-500/[0.07] text-red-400 border-red-500/20"
          }`}>
            {feedback}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-[#1e3a5f] disabled:text-slate-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl py-3.5 transition-colors duration-150 active:scale-[0.99]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          {status === "sending" ? "Sending…" : "Initiate consultation"}
        </button>

      </form>
    </div>
  );
}