import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const CATEGORY_COLORS = {
  default: { text: "text-blue-400", dot: "bg-blue-400" },
  research: { text: "text-indigo-400", dot: "bg-indigo-400" },
  design: { text: "text-pink-400", dot: "bg-pink-400" },
  robotics: { text: "text-emerald-400", dot: "bg-emerald-400" },
};

function getCategoryColor(category = "") {
  const key = category.toLowerCase();
  return CATEGORY_COLORS[key] ?? CATEGORY_COLORS.default;
}

function SkeletonCard({ tall = false }) {
  return (
    <div className="mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-white/[0.06] bg-slate-900">
      <div
        className={`${tall ? "h-64" : "h-44"} animate-pulse bg-gradient-to-br from-slate-800 to-slate-900`}
      />
      <div className="px-4 py-3.5 space-y-2">
        <div className="h-2.5 w-16 bg-slate-800 rounded-full animate-pulse" />
        <div className="h-3.5 w-36 bg-slate-800 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

function GalleryCard({ item }) {
  const color = getCategoryColor(item.category);
  return (
    <div className="group mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-white/[0.06] bg-slate-900 hover:border-white/[0.14] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {/* Subtle gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900/60 to-transparent" />
      </div>
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className={`inline-block w-1.5 h-1.5 rounded-full ${color.dot}`} />
          <span className={`text-[10px] font-medium tracking-widest uppercase ${color.text}`}>
            {item.category}
          </span>
        </div>
        <h4 className="text-sm font-medium text-slate-100 leading-snug">
          {item.title}
        </h4>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    axios
      .get(`${API_BASE}/gallery/`)
      .then((res) => { if (active) setGallery(Array.isArray(res.data) ? res.data : []); })
      .catch(() => { if (active) setError("Unable to load gallery."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="mb-12">
        <p className="text-cyan-400 text-[11px] font-medium tracking-[0.12em] uppercase mb-2">
          Visual Archive
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Innovation Captured
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {[220, 160, 280, 200, 240, 170].map((h, i) => (
            <SkeletonCard key={i} tall={h > 200} />
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex flex-col items-center gap-3 py-20 rounded-2xl border border-red-900/40 bg-red-950/20 text-red-400">
          <svg className="w-6 h-6 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v3m0 3h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && gallery.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 rounded-2xl border border-slate-800 text-slate-500">
          <svg className="w-6 h-6 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm">No gallery images yet.</span>
        </div>
      )}

      {/* Gallery */}
      {!loading && !error && gallery.length > 0 && (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {gallery.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}