export const testimonials = [
  {
    name: "Marcus Chen",
    role: "CTO, Nexus Dynamics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCFxhfkZlKNuHqTNVlH2pmztc0L3GaE3PsOeuCwavgfufxAlQFz798fcRY4rPFPR8LnnURKzML8OPwBOvzu6iK8pLtXT7w_hAPfYWPzSK9OFOgJncRdgUZMGzEWhoU96v-T7xZCOrVI9X7jJrl0vCSFFb0xPFenCztT5QlfKcmuUDAOBt27srSahuNUScVZh8P1FF0MvWgthCFDr07EM-FnrTBTpEGiPDZsbfO9wx_Zn3GF9cVrLPDaH1yUYT97Y7TBPn1OazYQQnQ",
    rating: 5,
    quote:
      "The integration of AI-Solutions predictive analytics reduced our operational latency by 42% in the first quarter.",
  },
  {
    name: "David Vogler",
    role: "Product Manager, Orbit Labs",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCvzK2_qNYq8_C6yilCC2dHsVt98DK2CRIXFPPwofpPdRf_ZXUOSrZRHnaMnGKQILMZ6Ijt9Sd3FW70GIM5WYHhuo1UrlztLVTovNpA4eZDp7t64zqBC10bo_t-wjruJqpy0JoRPVOq_ipq-LCkQtZU1gC4XJOyy7czC5cMDLVDUATOXKjyxUs4QqQiIFAMT0PHbkGM1Kt3QwTKmqBJiAxOX4kjEOuz50w6r74fLnoXl8DjJbUGZfL_sumiUJNpqZjoRZrn9_FgYz4",
    rating: 5,
    quote:
      "The interface is a breath of fresh air. Efficient, sleek and incredibly powerful.",
  },
];
export default function TestimonialsGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-24">

      <div className="grid md:grid-cols-2 gap-8">

        {testimonials.map((item) => (
          <div
            key={item.name}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">

              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div>
                <h4 className="font-semibold">
                  {item.name}
                </h4>

                <p className="text-slate-400 text-sm">
                  {item.role}
                </p>
              </div>

            </div>

            <p className="italic mb-6">
              "{item.quote}"
            </p>

            <div>
              {"⭐".repeat(item.rating)}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}