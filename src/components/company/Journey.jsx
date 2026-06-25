import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

// ─── Single timeline entry ────────────────────────────────────────────────────

function TimelineEntry({ item, index }) {
  const isLeft = index % 2 === 0;

  const content = (
    <div className={isLeft ? "text-right" : "text-left"}>
      {/* Tag */}
      {item.tag && (
        <span className="inline-block text-[10px] font-medium tracking-wide px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 mb-2">
          {item.tag}
        </span>
      )}

      {/* Year */}
      <p className="text-[28px] font-serif font-normal text-slate-900 dark:text-white leading-none mb-1">
        {item.year}
      </p>

      {/* Title */}
      <h3 className="text-[15px] font-medium text-slate-800 dark:text-slate-100 leading-snug mb-2">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-line">
        {item.description}
      </p>
    </div>
  );

  return (
    <div className="grid items-start" style={{ gridTemplateColumns: "1fr 48px 1fr" }}>
      {/* Left slot */}
      <div className="pr-6">{isLeft ? content : null}</div>

      {/* Centre node */}
      <div className="flex flex-col items-center gap-0 z-10">
        <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500 flex-shrink-0 mt-1">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Right slot */}
      <div className="pl-6">{!isLeft ? content : null}</div>
    </div>
  );
}

// ─── Skeleton entry ───────────────────────────────────────────────────────────

function SkeletonEntry({ index }) {
  const isLeft = index % 2 === 0;

  const block = (
    <div className={`flex flex-col gap-2 animate-pulse ${isLeft ? "items-end" : "items-start"}`}>
      <div className="h-3 w-12 rounded-full bg-slate-100 dark:bg-slate-800" />
      <div className="h-7 w-16 rounded bg-slate-100 dark:bg-slate-800" />
      <div className="h-4 w-40 rounded bg-slate-100 dark:bg-slate-800" />
      <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
      <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
    </div>
  );

  return (
    <div className="grid items-start" style={{ gridTemplateColumns: "1fr 48px 1fr" }}>
      <div className="pr-6">{isLeft ? block : null}</div>
      <div className="flex justify-center mt-1">
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
      </div>
      <div className="pl-6">{!isLeft ? block : null}</div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Journey() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

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
      .catch((err) => {
        console.error("Failed to load company timeline:", err);
        if (active) setError("Unable to load the company timeline.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  const items = loading ? [0, 1, 2, 3] : timeline;

  return (
    <section className="max-w-4xl mx-auto px-6 mb-32">

      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-400 dark:text-slate-500 mb-2">
          Our story
        </p>
        <h2 className="font-serif text-4xl font-normal text-slate-900 dark:text-white">
          Our journey
        </h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-3">
          Key milestones that shaped who we are.
        </p>
      </div>

      {/* Error state */}
      {error && (
        <p className="text-center text-sm text-red-400">{error}</p>
      )}

      {/* Empty state */}
      {!loading && !error && timeline.length === 0 && (
        <div className="py-20 text-center text-sm text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-2xl">
          No timeline milestones are available at this time.
        </div>
      )}

      {/* Timeline spine */}
      {!error && (loading || timeline.length > 0) && (
        <div className="relative">

          {/* Vertical spine line */}
          <div
            className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-100 dark:bg-slate-800 -translate-x-1/2"
            aria-hidden="true"
          />

          {/* Entries */}
          <div className="relative flex flex-col gap-10">
            {loading
              ? [0, 1, 2, 3].map((i) => <SkeletonEntry key={i} index={i} />)
              : timeline.map((item, index) => (
                  <TimelineEntry
                    key={item.id ?? `${item.year}-${item.title}`}
                    item={item}
                    index={index}
                  />
                ))}
          </div>
        </div>
      )}
    </section>
  );
}