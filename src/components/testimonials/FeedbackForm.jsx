import { useState } from "react";

export default function FeedbackForm() {
  const [rating, setRating] = useState(4);

  return (
    <section className="bg-slate-950 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-slate-800">

          <div className="p-10 bg-slate-900">

            <h2 className="text-3xl font-semibold mb-2">
              Share Your Experience
            </h2>

            <p className="text-slate-400 mb-8">
              Help us refine our intelligence.
            </p>

            <form className="space-y-6">

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="Full Name"
                  className="bg-slate-950 p-3 rounded-lg border border-slate-700"
                />

                <input
                  placeholder="Company"
                  className="bg-slate-950 p-3 rounded-lg border border-slate-700"
                />
              </div>

              <div>
                <p className="mb-3">Rating</p>

                <div className="flex gap-2">
                  {[1,2,3,4,5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                    >
                      {star <= rating ? "⭐" : "☆"}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                rows="5"
                placeholder="Describe the impact..."
                className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700"
              />

              <button
                type="submit"
                className="w-full bg-blue-700 py-4 rounded-xl"
              >
                Submit Testimonial
              </button>

            </form>

          </div>

          <div className="hidden lg:block relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtuoLZ7Rx4tpY-TMC8zIgRyKEGKc04sjbH1vjJHo1kAa9d5fh-TB7fsqDeHxPLSQPdQFY0yoeJgI3Ix9Q-dp0Qe-dj-Z9Xjujwz82OPneRFveZtDpj4D-zYMgsNdCr4dcbVMhHzFN2Vmwpf1VsN0EB1okdkHGISbYdMk-VkLX1xL_FtyhR-pbR0Z_vVxFCvPHCDa-Y68gcE20YH-UJXkDVYsKExAadDxWa-ZFuehkqQAcEP4KlQTlnHtOKZGiph5pFUaOo-JvG9rw"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>

    </section>
  );
}