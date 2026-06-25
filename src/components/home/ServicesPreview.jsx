import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ServicesPreview() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    axios
      .get(`${API_BASE}/services/`)
      .then((response) => {
        if (!active) return;
        setServices(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Failed to load services:", error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">Precision Engineering</h2>

          <p className="text-slate-400 mt-4">
            Scalable infrastructure designed for the next generation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map((placeholder) => (
                <div
                  key={placeholder}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-8 animate-pulse"
                >
                  <div className="h-12 w-12 mb-6 rounded-xl bg-slate-800" />
                  <div className="h-6 mb-4 rounded bg-slate-800" />
                  <div className="space-y-3">
                    <div className="h-4 rounded bg-slate-800" />
                    <div className="h-4 rounded bg-slate-800" />
                  </div>
                </div>
              ))
            : services.length > 0
            ? services.map((service) => (
                <div
                  key={service.id ?? service.title}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
                >
                  <div className="text-4xl mb-6">•</div>

                  <h3 className="text-2xl font-semibold mb-4 text-white">
                    {service.title}
                  </h3>

                  <p className="text-slate-400">
                    {service.short_description || service.description}
                  </p>
                </div>
              ))
            : (
              <div className="col-span-full text-slate-400">
                No services available at the moment.
              </div>
            )}
        </div>
      </div>
    </section>
  );
}
