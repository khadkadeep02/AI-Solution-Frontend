import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(null);
  const active = hovered ?? value;

  return (
    <div className="flex gap-1.5" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <svg
            className="w-6 h-6 transition-colors duration-100"
            viewBox="0 0 24 24"
            fill={star <= active ? "#f59e0b" : "none"}
            stroke={star <= active ? "#f59e0b" : "#1e3a5f"}
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}

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
  "bg-[#080e1a] border border-white/[0.08] focus:border-blue-500/40 rounded-xl px-4 py-2.5 text-[13px] text-slate-200 placeholder-slate-800 outline-none transition-colors duration-150 w-full";

export default function FeedbackForm() {
  const [name, setName]               = useState("");
  const [company, setCompany]         = useState("");
  const [designation, setDesignation] = useState("");
  const [rating, setRating]           = useState(4);
  const [review, setReview]           = useState("");
  const [status, setStatus]           = useState("idle");
  const [message, setMessage]         = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      await axios.post(`${API_BASE}/testimonials/`, {
        client_name: name,
        company,
        designation: designation || "Client",
        rating,
        review,
        image_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Anonymous")}`,
      });

      setStatus("success");
      setMessage("Thank you! Your testimonial was submitted.");
      setName(""); setCompany(""); setDesignation("");
      setRating(4); setReview("");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Unable to submit right now. Please try again later.");
    }
  };

  return (
    <section className="py-24 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.07]">

          {/* Form side */}
          <div className="p-10 bg-[#0f1923]">
            <h2 className="text-2xl font-semibold text-slate-100 mb-1.5">
              Share your experience
            </h2>
            <p className="text-[13px] text-slate-600 mb-8">
              Help us refine our intelligence.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Full name">
                  <input
                    value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Sarah Reynolds" required className={inputCls}
                  />
                </Field>
                <Field label="Company">
                  <input
                    value={company} onChange={(e) => setCompany(e.target.value)}
                    placeholder="Meridian Capital" className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Designation">
                <input
                  value={designation} onChange={(e) => setDesignation(e.target.value)}
                  placeholder="CTO" className={inputCls}
                />
              </Field>

              <Field label="Rating">
                <StarRating value={rating} onChange={setRating} />
              </Field>

              <Field label="Your review">
                <textarea
                  value={review} onChange={(e) => setReview(e.target.value)}
                  rows={4} required placeholder="Describe the impact on your team..."
                  className={`${inputCls} resize-none leading-relaxed`}
                />
              </Field>

              {message && (
                <p className={`text-xs px-4 py-2.5 rounded-lg border ${
                  status === "success"
                    ? "bg-teal-500/[0.08] text-teal-400 border-teal-500/20"
                    : "bg-red-500/[0.08] text-red-400 border-red-500/20"
                }`}>
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-[#1e3a5f] disabled:text-slate-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl py-3.5 transition-colors duration-150 active:scale-[0.99]"
              >
                {status === "sending" ? "Submitting…" : "Submit testimonial"}
              </button>
            </form>
          </div>

          {/* Image side */}
          <div className="hidden lg:block relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtuoLZ7Rx4tpY-TMC8zIgRyKEGKc04sjbH1vjJHo1kAa9d5fh-TB7fsqDeHxPLSQPdQFY0yoeJgI3Ix9Q-dp0Qe-dj-Z9Xjujwz82OPneRFveZtDpj4D-zYMgsNdCr4dcbVMhHzFN2Vmwpf1VsN0EB1okdkHGISbYdMk-VkLX1xL_FtyhR-pbR0Z_vVxFCvPHCDa-Y68gcE20YH-UJXkDVYsKExAadDxWa-ZFuehkqQAcEP4KlQTlnHtOKZGiph5pFUaOo-JvG9rw"
              alt="Feedback illustration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1923]/40 to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
}