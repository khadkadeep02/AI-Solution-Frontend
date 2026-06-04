import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8001/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    axios
      .get(`${API_BASE}/testimonials/`)
      .then((response) => {
        if (!active) return;
        setTestimonials(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Failed to load testimonials:", error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleTestimonials = testimonials.slice(0, 2);

  return (
    <section className="py-24 bg-slate-950 rounded-sm">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold mb-12">Trusted By Leaders</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {loading
            ? [1, 2].map((placeholder) => (
                <div
                  key={placeholder}
                  className="bg-slate-900 p-10 rounded-2xl animate-pulse"
                >
                  <div className="h-4 w-32 rounded bg-slate-800 mb-6" />
                  <div className="h-4 w-full rounded bg-slate-800 mb-2" />
                  <div className="h-4 w-5/6 rounded bg-slate-800 mb-2" />
                  <div className="h-4 w-1/2 rounded bg-slate-800 mt-8" />
                </div>
              ))
            : visibleTestimonials.length > 0
            ? visibleTestimonials.map((item) => (
                <div
                  key={item.id ?? item.client_name}
                  className="bg-slate-900 p-10 rounded-2xl"
                >
                  <p className="italic mb-6 text-slate-200">
                    "{item.review}"
                  </p>

                  <h4 className="font-semibold text-white">
                    {item.client_name}
                  </h4>

                  <p className="text-slate-400 text-sm">
                    {item.designation && item.company
                      ? `${item.designation} at ${item.company}`
                      : item.designation || item.company}
                  </p>

                  <div className="text-yellow-400 mt-4 flex justify-center">
                    {Array.from({ length: item.rating || 0 }, () => "⭐").join("")}
                  </div>
                </div>
              ))
            : (
              <div className="col-span-full text-slate-400">
                No testimonials are available yet.
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
