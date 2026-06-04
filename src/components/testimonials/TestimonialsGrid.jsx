import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8001/api";

export default function TestimonialsGrid() {
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

  return (
    <section className="max-w-7xl mx-auto px-6 mb-24">
      <div className="grid md:grid-cols-2 gap-8">
        {loading
          ? [1, 2].map((placeholder) => (
              <div
                key={placeholder}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-slate-800" />
                    <div className="h-3 w-24 rounded bg-slate-800" />
                  </div>
                </div>
                <div className="h-4 w-full rounded bg-slate-800 mb-2" />
                <div className="h-4 w-5/6 rounded bg-slate-800 mb-2" />
                <div className="h-4 w-1/2 rounded bg-slate-800 mt-6" />
              </div>
            ))
          : testimonials.length > 0
          ? testimonials.map((item) => {
              const initials = (item.client_name || "User")
                .split(" ")
                .map((n) => (n ? n[0] : ""))
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <div
                  key={item.id ?? item.client_name}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {initials}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-white">{item.client_name}</h4>
                      <p className="text-slate-400 text-sm">{item.company || "Company"}</p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mb-4 font-medium">{item.designation || "Designation"}</p>

                  <p className="italic mb-6 text-slate-200">"{item.review}"</p>

                  <div className="text-yellow-400 flex justify-center">
                    {Array.from({ length: item.rating || 0 }, () => "⭐").join("")}
                  </div>
                </div>
              );
            })
          : (
            <div className="col-span-full text-slate-400">
              No testimonials are available at the moment.
            </div>
          )}
      </div>
    </section>
  );
}
