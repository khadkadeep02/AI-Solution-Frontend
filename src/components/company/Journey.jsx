import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export default function Journey() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    axios
      .get(`${API_BASE}/timeline/`)
      .then((response) => {
        if (!active) return;

        const items = Array.isArray(response.data) ? response.data : [];
        setTimeline(
          [...items].sort(
            (a, b) =>
              (a.display_order ?? 0) - (b.display_order ?? 0) ||
              (a.year ?? 0) - (b.year ?? 0)
          )
        );
      })
      .catch((apiError) => {
        console.error("Failed to load company timeline:", apiError);
        if (active) setError("Unable to load the company timeline.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-slate-900 rounded-xl">

      <div className="grid md:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-3xl font-semibold text-primary mb-10">
            Our Journey
          </h2>

          <div className="space-y-10 text-left">
            {loading ? (
              [1, 2, 3].map((placeholder) => (
                <div key={placeholder} className="flex gap-6 animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-slate-800 shrink-0" />
                  <div className="flex-1 pt-1">
                    <div className="h-6 w-40 rounded bg-slate-800 mb-4" />
                    <div className="space-y-3">
                      <div className="h-4 rounded bg-slate-800" />
                      <div className="h-4 w-4/5 rounded bg-slate-800" />
                    </div>
                  </div>
                </div>
              ))
            ) : error ? (
              <p className="text-rose-400">{error}</p>
            ) : timeline.length > 0 ? (
              timeline.map((item) => (
                <div
                  key={item.id ?? `${item.year}-${item.title}`}
                  className="flex gap-6"
                >
                  <div>
                    <div className="min-w-12 h-12 rounded-full bg-blue-900 px-3 flex items-center justify-center text-sm font-semibold text-white">
                      {item.year}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-400">
                No timeline milestones are available at this time.
              </p>
            )}
          </div>
        </div>

        <div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp4YQt9BHqP5yXx1Xy-OQOeyPj97H1zsYZHg3z8vUEJwfcxrInagVXB4-l4Al6eProxKysrXX1azpEhj6iBdNbjgS2zrv9esrKdcP6EUB9G3mm3HgrXqEuoTRtF3slrcpgharXYtmseuxb6RqqXtTQbxaiT_YrG5Nvl720vxRbZZUygXIXYLw9PiUXrBXSqjRWRz3uMccXZQXoXcmGEAXum8XZdGKRr5IiJPhrrSMXq2mTL2ix4NdVBwlAGMNtgAXaYsMLIsgNm2E"
            alt="Innovation Hub"
            className="rounded-xl w-full"
          />
        </div>

      </div>
    </section>
  );
}
