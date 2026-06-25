import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const ACCENT = {
  blue:   { color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  line: "#1d3a5c", gradient: "from-[#080e1a] to-[#0d1f35]" },
  purple: { color: "#8b5cf6", bg: "rgba(139,92,246,0.12)",  line: "#2d1f5e", gradient: "from-[#080e1a] to-[#1a0f2a]" },
  teal:   { color: "#14b8a6", bg: "rgba(20,184,166,0.12)",  line: "#0f3330", gradient: "from-[#080e1a] to-[#04191a]" },
  amber:  { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  line: "#3d2a05", gradient: "from-[#080e1a] to-[#1a1000]" },
  coral:  { color: "#f97316", bg: "rgba(249,115,22,0.12)",  line: "#3d1500", gradient: "from-[#080e1a] to-[#1a0d00]" },
  pink:   { color: "#ec4899", bg: "rgba(236,72,153,0.12)",  line: "#3d0f2a", gradient: "from-[#080e1a] to-[#1a0015]" },
};

function ImagePanel({ service, accent, imageLeft }) {
  return (
    <div
      className={`relative min-h-[340px] bg-gradient-to-br ${accent.gradient} flex items-center justify-center overflow-hidden ${
        imageLeft ? "md:order-first" : "md:order-last"
      } order-first`}
    >
      {service.image ? (
        <>
          <img src={service.image} alt={service.title}
            className="w-full h-full object-cover absolute inset-0 opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080e1a]/40 to-transparent" />
        </>
      ) : (
        /* Large ghosted icon as illustration */
        service.icon && (
          <i
            className={`ti ${service.icon}`}
            style={{ fontSize: 96, color: accent.color, opacity: 0.12 }}
            aria-hidden="true"
          />
        )
      )}
    </div>
  );
}

function ServiceRow({ service, index }) {
  const [expanded, setExpanded] = useState(false);
  const imageLeft  = index % 2 === 0;
  const accentKey  = service.color ?? "blue";
  const accent     = ACCENT[accentKey] ?? ACCENT.blue;
  const shortText  = service.short_description || service.description;
  const fullText   = service.full_description;

  return (
    <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.06] mb-4">
      <ImagePanel service={service} accent={accent} imageLeft={imageLeft} />

      {/* Content */}
      <div
        className={`px-11 py-12 flex flex-col justify-center bg-[#0d1117] ${
          imageLeft ? "md:order-last" : "md:order-first order-last"
        }`}
      >
        {/* Index */}
        <p className="text-[10px] font-medium text-slate-800 tabular-nums tracking-[0.08em] mb-5">
          {String(index + 1).padStart(2, "0")}
        </p>

        {/* Tag pill with icon */}
        <div
          className="inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full border border-white/[0.07] mb-5 w-fit"
        >
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: accent.bg }}
          >
            {service.icon && (
              <i className={`ti ${service.icon}`}
                style={{ fontSize: 13, color: accent.color }} aria-hidden="true" />
            )}
          </div>
          <span className="text-[11px] font-medium tracking-wide" style={{ color: accent.color }}>
            {service.tag || service.title}
          </span>
        </div>

        {/* Accent rule */}
        <div className="w-7 h-[2px] rounded-full mb-4" style={{ background: accent.line }} />

        {/* Title */}
        <h3 className="text-xl font-semibold text-slate-100 leading-snug mb-3.5">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-slate-500 leading-[1.85] mb-5">
          {shortText}
        </p>

        {/* Expandable full text */}
        {fullText && (
          <>
            <div className="h-px bg-white/[0.05] mb-4" />
            <div
              className={`text-[13px] text-slate-600 leading-[1.85] overflow-hidden transition-all duration-300 ${
                expanded ? "max-h-48 opacity-100 mb-4" : "max-h-0 opacity-0"
              }`}
            >
              {fullText}
            </div>
            <button
              type="button"
              onClick={() => setExpanded((p) => !p)}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-600 hover:text-slate-300 transition-colors self-start"
            >
              {expanded ? "Show less" : "Read more"}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function SkeletonRow({ reverse }) {
  return (
    <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-white/[0.06] mb-4 animate-pulse">
      <div className={`min-h-[340px] bg-slate-900 ${reverse ? "md:order-last" : ""}`} />
      <div className="px-11 py-12 bg-[#0d1117] flex flex-col gap-4">
        <div className="w-6 h-2.5 rounded bg-slate-800" />
        <div className="w-24 h-7 rounded-full bg-slate-800" />
        <div className="w-7 h-0.5 rounded bg-slate-800" />
        <div className="w-2/3 h-5 rounded bg-slate-800" />
        <div className="space-y-2">
          {[1,2,3].map(i => <div key={i} className="h-3 rounded bg-slate-800" style={{width: `${90 - i*10}%`}} />)}
        </div>
      </div>
    </div>
  );
}

export default function ServicesAlternating() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);

  useEffect(() => {
    let active = true;
    axios.get(`${API_BASE}/services/`)
      .then((res) => { if (active) setServices(Array.isArray(res.data) ? res.data : []); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">

      <div className="mb-14">
        <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-slate-700 mb-2">
          What we offer
        </p>
        <h2 className="text-4xl font-semibold text-slate-100">
          Our services
        </h2>
      </div>

      {loading ? (
        [0,1,2].map((i) => <SkeletonRow key={i} reverse={i % 2 !== 0} />)
      ) : error ? (
        <div className="py-16 text-center text-sm text-slate-600 border border-white/[0.06] rounded-2xl">
          Failed to load services. Please try again later.
        </div>
      ) : services.length > 0 ? (
        services.map((s, i) => <ServiceRow key={s.id ?? s.title} service={s} index={i} />)
      ) : (
        <div className="py-16 text-center text-sm text-slate-600 border border-white/[0.06] rounded-2xl">
          No services available at this time.
        </div>
      )}
    </section>
  );
}