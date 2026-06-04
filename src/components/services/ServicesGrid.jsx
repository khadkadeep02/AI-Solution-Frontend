import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown } from "lucide-react";

const API_BASE = "http://127.0.0.1:8000/api";

const COLOR_MAP = {
  blue:   { bg: "bg-blue-50",   icon: "text-blue-700",   tag: "bg-blue-50 text-blue-800",   imageBg: "bg-blue-50"   },
  pink:   { bg: "bg-pink-50",   icon: "text-pink-700",   tag: "bg-pink-50 text-pink-800",   imageBg: "bg-pink-50"   },
  amber:  { bg: "bg-amber-50",  icon: "text-amber-700",  tag: "bg-amber-50 text-amber-800",  imageBg: "bg-amber-50"  },
  teal:   { bg: "bg-teal-50",   icon: "text-teal-700",   tag: "bg-teal-50 text-teal-800",   imageBg: "bg-teal-50"   },
  coral:  { bg: "bg-orange-50", icon: "text-orange-700", tag: "bg-orange-50 text-orange-800", imageBg: "bg-orange-50" },
  purple: { bg: "bg-purple-50", icon: "text-purple-700", tag: "bg-purple-50 text-purple-800", imageBg: "bg-purple-50" },
};

function ServiceImagePlaceholder({ service, colors }) {
  return (
    <div 
  className={`w-full h-[320px] flex items-center justify-center overflow-hidden ${colors.imageBg}`}
      >
      {service.image ? (
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-fit"
        />
      ) : (
        <div className="flex flex-col items-center gap-4 opacity-40">
          {service.icon && (
            <i className={`ti ${service.icon} text-[64px] ${colors.icon}`} aria-hidden="true" />
          )}
        </div>
      )}
    </div>
  );
}

function ServiceRow({ service, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortText   = service.short_description || service.description;
  const fullText    = service.full_description;
  const colorKey    = service.color ?? "blue";
  const colors      = COLOR_MAP[colorKey] ?? COLOR_MAP.blue;
  const paddedIndex = String(index + 1).padStart(2, "0");

  // Even index → image left, odd → image right
  const imageLeft = index % 2 === 0;

  return (
    <div className="grid md:grid-cols-2 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden mb-5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors duration-200">

      {/* Image panel */}
      <div className={`${imageLeft ? "md:order-first" : "md:order-last"} order-first`}>
        <ServiceImagePlaceholder service={service} colors={colors} />
      </div>

      {/* Content panel */}
      <div className="p-8 md:p-10 flex flex-col justify-center">

        {/* Index */}
        <p className="text-xs font-medium tracking-widest text-slate-400 dark:text-slate-500 mb-5 font-mono">
          {paddedIndex}
        </p>

        {/* Icon */}
        {service.icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 flex-shrink-0 ${colors.bg}`}>
            <i className={`ti ${service.icon} text-[18px] ${colors.icon}`} aria-hidden="true" />
          </div>
        )}

        {/* Tag */}
        {service.tag && (
          <span className={`inline-block text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full mb-3 ${colors.tag}`}>
            {service.tag}
          </span>
        )}

        {/* Title */}
        <h3 className="text-2xl font-serif font-normal text-slate-900 dark:text-white leading-snug mb-3">
          {service.title}
        </h3>

        {/* Short description */}
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {shortText}
        </p>

        {/* Expanded content */}
        {fullText && (
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
              isExpanded ? "max-h-64" : "max-h-0"
            }`}
          >
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
              {fullText}
            </p>
          </div>
        )}

        {/* Toggle */}
        {fullText && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-1.5 mt-5 text-xs font-medium text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors group self-start"
          >
            {isExpanded ? "Show less" : "Read more"}
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
    </div>
  );
}

function SkeletonRow({ reverse }) {
  return (
    <div className="grid md:grid-cols-2 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden mb-5 animate-pulse">
      <div className={`min-h-[280px] bg-slate-100 dark:bg-slate-800 ${reverse ? "md:order-last" : ""}`} />
      <div className="p-10 flex flex-col gap-4">
        <div className="w-8 h-3 rounded bg-slate-100 dark:bg-slate-800" />
        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800" />
        <div className="w-16 h-4 rounded-full bg-slate-100 dark:bg-slate-800" />
        <div className="w-2/3 h-6 rounded bg-slate-100 dark:bg-slate-800" />
        <div className="space-y-2">
          <div className="h-3.5 rounded bg-slate-100 dark:bg-slate-800" />
          <div className="h-3.5 rounded bg-slate-100 dark:bg-slate-800 w-5/6" />
          <div className="h-3.5 rounded bg-slate-100 dark:bg-slate-800 w-4/6" />
        </div>
      </div>
    </div>
  );
}

export default function ServicesAlternating() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    let active = true;
    axios
      .get(`${API_BASE}/services/`)
      .then((res) => { if (active) setServices(Array.isArray(res.data) ? res.data : []); })
      .catch((err) => console.error("Failed to load services:", err))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">

      {/* Section header */}
      <div className="mb-10">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-400 dark:text-slate-500 mb-2">
          What we offer
        </p>
        <h2 className="font-serif text-4xl font-normal text-slate-900 dark:text-white">
          Our services
        </h2>
      </div>

      {/* Alternating rows */}
      {loading ? (
        [0, 1, 2].map((i) => <SkeletonRow key={i} reverse={i % 2 !== 0} />)
      ) : services.length > 0 ? (
        services.map((service, index) => (
          <ServiceRow key={service.id ?? service.title} service={service} index={index} />
        ))
      ) : (
        <div className="py-16 text-center text-sm text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700/60 rounded-2xl">
          No services are available at this time.
        </div>
      )}
    </section>
  );
}