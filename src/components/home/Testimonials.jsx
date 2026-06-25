import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const AVATAR_COLORS = [
  { bg: "rgba(59,130,246,0.12)", text: "#60a5fa" },
  { bg: "rgba(20,184,166,0.12)", text: "#14b8a6" },
  { bg: "rgba(139,92,246,0.12)", text: "#8b5cf6" },
  { bg: "rgba(245,158,11,0.12)", text: "#f59e0b" },
];

function initials(name = "") {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function StarRating({ rating = 5 }) {
  return (
    <div className="flex gap-0.5 ml-auto">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3 h-3" viewBox="0 0 24 24"
          fill={i < rating ? "#f59e0b" : "none"}
          stroke={i < rating ? "#f59e0b" : "#334155"}
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-[#0f1923] border border-white/[0.06] rounded-2xl p-8 animate-pulse">
      <div className="h-8 w-6 bg-slate-800 rounded mb-3" />
      <div className="space-y-2 mb-8">
        <div className="h-3 w-full bg-slate-800 rounded" />
        <div className="h-3 w-5/6 bg-slate-800 rounded" />
        <div className="h-3 w-4/6 bg-slate-800 rounded" />
      </div>
      <div className="h-px bg-slate-800 mb-5" />
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-800" />
        <div className="space-y-1.5">
          <div className="h-3 w-24 bg-slate-800 rounded" />
          <div className="h-2.5 w-32 bg-slate-800 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    axios
      .get(`${API_BASE}/testimonials/`)
      .then((res) => { if (active) setTestimonials(Array.isArray(res.data) ? res.data : []); })
      .catch((err) => console.error("Failed to load testimonials:", err))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const visible = testimonials.slice(0, 2);

  return (
    <section className="py-24 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] font-medium text-slate-700 uppercase tracking-[0.1em] mb-3">
            Client stories
          </p>
          <h2 className="text-4xl font-semibold text-slate-100 leading-tight">
            Trusted by leaders
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {loading ? (
            [1, 2].map((i) => <SkeletonCard key={i} />)
          ) : visible.length > 0 ? (
            visible.map((item, idx) => {
              const color = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const label = item.designation && item.company
                ? `${item.designation} at ${item.company}`
                : item.designation || item.company || "";

              return (
                <div
                  key={item.id ?? item.client_name}
                  className="bg-[#0f1923] border border-white/[0.06] rounded-2xl p-8 flex flex-col"
                >
                  {/* Opening quote */}
                  <div className="text-5xl leading-none text-slate-800 font-serif mb-1 select-none">
                    "
                  </div>

                  {/* Review */}
                  <p className="text-sm text-slate-400 leading-[1.8] flex-1 mb-7">
                    {item.review}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.05] mb-5" />

                  {/* Meta */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0"
                      style={{ background: color.bg, color: color.text }}
                    >
                      {initials(item.client_name)}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-slate-200">
                        {item.client_name}
                      </p>
                      {label && (
                        <p className="text-xs text-slate-600 mt-0.5">{label}</p>
                      )}
                    </div>
                    <StarRating rating={item.rating} />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="col-span-full text-sm text-slate-600">
              No testimonials available yet.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}