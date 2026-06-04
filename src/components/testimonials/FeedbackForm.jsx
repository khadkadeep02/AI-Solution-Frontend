import { useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8001/api";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [rating, setRating] = useState(4);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const payload = {
        client_name: name,
        company,
        designation: designation || "Client",
        rating,
        review,
        image_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Anonymous")}`,
      };

      await axios.post(`${API_BASE}/testimonials/`, payload);

      setStatus("success");
      setMessage("Thank you! Your testimonial was submitted.");
      setName("");
      setCompany("");
      setDesignation("");
      setRating(4);
      setReview("");
      setImageFile(null);
    } catch (error) {
      console.error("Failed to submit testimonial:", error);
      setStatus("error");
      setMessage("Unable to submit testimonial right now. Please try again later.");
    }
  };

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-800">
          <div className="p-10 bg-slate-900">
            <h2 className="text-3xl font-semibold mb-2">Share Your Experience</h2>

            <p className="text-slate-400 mb-8">Help us refine our intelligence.</p>

            <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Full Name"
                  className="bg-slate-950 p-3 rounded-lg border border-slate-700"
                  required
                />

                <input
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  placeholder="Company"
                  className="bg-slate-950 p-3 rounded-lg border border-slate-700"
                />
              </div>

              <div className="">
                <p className="mb-3">Rating</p>

                <div className="flex gap-2 w-full items-center flex-1 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="text-xl"
                    >
                      {star <= rating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>

              <input
                value={designation}
                onChange={(event) => setDesignation(event.target.value)}
                placeholder="Designation"
                className="bg-slate-950 p-3 rounded-lg border border-slate-700 w-full"
              />

              <textarea
                value={review}
                onChange={(event) => setReview(event.target.value)}
                rows="5"
                placeholder="Describe the impact..."
                className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700"
                required
              />

              {/* Image upload removed per request */}

              {message && (
                <p className={`text-sm ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-700 py-4 rounded-xl"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Submitting..." : "Submit Testimonial"}
              </button>
            </form>
          </div>

          <div className="hidden lg:block relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtuoLZ7Rx4tpY-TMC8zIgRyKEGKc04sjbH1vjJHo1kAa9d5fh-TB7fsqDeHxPLSQPdQFY0yoeJgI3Ix9Q-dp0Qe-dj-Z9Xjujwz82OPneRFveZtDpj4D-zYMgsNdCr4dcbVMhHzFN2Vmwpf1VsN0EB1okdkHGISbYdMk-VkLX1xL_FtyhR-pbR0Z_vVxFCvPHCDa-Y68gcE20YH-UJXkDVYsKExAadDxWa-ZFuehkqQAcEP4KlQTlnHtOKZGiph5pFUaOo-JvG9rw"
              alt="Feedback illustration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
