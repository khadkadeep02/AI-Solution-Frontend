import { useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export default function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("United States");
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      setFeedback("Your inquiry has been submitted. We'll contact you soon.");
      setFullName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setCountry("United States");
      setJobTitle("");
      setMessage("");
    } catch (error) {
      console.error("Failed to submit inquiry:", error);
      setStatus("error");
      setFeedback("Unable to submit your inquiry right now. Please try again later.");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <h2 className="text-3xl font-semibold mb-8">Project Inquiry</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Full Name"
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
            required
          />

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email Address"
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Phone Number"
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
            required
          />

          <input
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            placeholder="Company"
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
          >
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Germany</option>
            <option>Japan</option>
          </select>

          <input
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
            placeholder="Job Title"
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
          />
        </div>

        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows="5"
          placeholder="Tell us about your project..."
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3"
          required
        />

        {feedback && (
          <p className={`text-sm ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}>
            {feedback}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-700 py-4 rounded-xl"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Initiate Consultation"}
        </button>
      </form>
    </div>
  );
}
