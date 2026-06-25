import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

// Color palette keyed to category — extend as needed
const CATEGORY_COLORS = {
  Fintech:    { bg: "bg-blue-50",   text: "text-blue-700",   icon: "#185FA5" },
  Retail:     { bg: "bg-teal-50",   text: "text-teal-700",   icon: "#0F6E56" },
  SaaS:       { bg: "bg-purple-50", text: "text-purple-700", icon: "#534AB7" },
  Health:     { bg: "bg-pink-50",   text: "text-pink-700",   icon: "#993556" },
  Geospatial: { bg: "bg-orange-50", text: "text-orange-700", icon: "#993C1D" },
  Design:     { bg: "bg-amber-50",  text: "text-amber-700",  icon: "#854F0B" },
};

const DEFAULT_COLOR = { bg: "bg-slate-100", text: "text-slate-600", icon: "#5F5E5A" };

function getCategoryColor(category) {
  return CATEGORY_COLORS[category] ?? DEFAULT_COLOR;
}

// Thumbnail — uses project image if provided, otherwise a tinted placeholder with icon
function Thumbnail({ project }) {
  const c = getCategoryColor(project.category);

  if (project.image) {
    return (
      <div className="w-full aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div className={`w-full aspect-[16/10] flex items-center justify-center ${c.bg}`}>
      {project.icon ? (
        <i
          className={`ti ${project.icon} text-[36px] opacity-30`}
          style={{ color: c.icon }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}

function ProjectCard({ project, featured }) {
  const c = getCategoryColor(project.category);
  const label = project.category || project.client_name || "Project";

  return (
    <div
      className={`
        group flex flex-col bg-white dark:bg-slate-900 cursor-pointer
        hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors duration-150
        ${featured ? "col-span-2" : ""}
      `}
    >
      <Thumbnail project={project} />

      <div className="p-5 flex flex-col gap-1.5 flex-1 border-t border-slate-100 dark:border-slate-800">
        {/* Category */}
        <span className={`text-[11px] font-medium tracking-widest uppercase ${c.text}`}>
          {label}
        </span>

        {/* Title */}
        <h3 className="text-[15px] font-medium text-slate-900 dark:text-white leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed flex-1">
          {project.short_description || project.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {project.year ? (
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              {project.year}
            </span>
          ) : (
            <span />
          )}
          <ArrowUpRight
            size={14}
            className="text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}

function SkeletonCard({ wide }) {
  return (
    <div className={`flex flex-col animate-pulse ${wide ? "col-span-2" : ""}`}>
      <div className="w-full aspect-[16/10] bg-slate-100 dark:bg-slate-800" />
      <div className="p-5 flex flex-col gap-3 border-t border-slate-100 dark:border-slate-800">
        <div className="h-3 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
        <div className="h-4 w-3/4 rounded bg-slate-100 dark:bg-slate-800" />
        <div className="space-y-1.5">
          <div className="h-3 rounded bg-slate-100 dark:bg-slate-800" />
          <div className="h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-3.5 py-1 rounded-full text-xs font-medium border transition-all duration-150
        ${active
          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
          : "bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
        }
      `}
    >
      {label}
    </button>
  );
}

export default function ProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    let active = true;
    axios
      .get(`${API_BASE}/projects/`)
      .then((res) => {
        if (active) setProjects(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(projects.map((p) => p.category || p.client_name).filter(Boolean))];
    return ["All", ...unique];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(
      (p) => (p.category || p.client_name) === activeFilter
    );
  }, [projects, activeFilter]);

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-400 dark:text-slate-500 mb-1.5">
            Selected work
          </p>
          <h2 className="font-serif text-4xl font-normal text-slate-900 dark:text-white">
            Our projects
          </h2>
        </div>

        {/* Category filters */}
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Project count */}
      {!loading && !error && (
        <p className="text-xs text-slate-400 dark:text-slate-500 mb-4 font-mono">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          {activeFilter !== "All" && ` · ${activeFilter}`}
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <SkeletonCard key={i} wide={i === 0} />
          ))}
        </div>
      ) : error ? (
        <div className="py-20 text-center text-sm text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-2xl">
          Could not load projects. Please try again later.
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-sm text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-2xl">
          No projects in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id ?? project.title}
              project={project}
              featured={index === 0 && filtered.length >= 3}
            />
          ))}
        </div>
      )}
    </section>
  );
}