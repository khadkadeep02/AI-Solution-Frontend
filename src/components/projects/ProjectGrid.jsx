import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

export default function ProjectGrid() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    axios
      .get(`${API_BASE}/projects/`)
      .then((response) => {
        if (!active) return;
        setProjects(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Failed to load projects:", error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <div className="flex flex-wrap flex-1 p-2 items-center justify-center">
        {loading
          ? [1, 2, 3, 4].map((placeholder) => (
              <div
                key={placeholder}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-slate-800" />
                <div className="p-6 space-y-4">
                  <div className="h-4 w-24 rounded bg-slate-800" />
                  <div className="h-5 w-32 rounded bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-3 rounded bg-slate-800" />
                    <div className="h-3 rounded bg-slate-800" />
                  </div>
                </div>
              </div>
            ))
          : projects.length > 0
          ? projects.map((project) => (
              <div
                key={project.id ?? project.title}
                className="w-[20%] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-video w-full object-cover"
                />

                <div className="p-6">
                  <span className="text-cyan-400 text-xs uppercase">
                    {project.category || project.client_name || "Project"}
                  </span>

                  <h3 className="text-xl font-semibold mt-2 mb-2 text-white">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm">
                    {project.short_description || project.description}
                  </p>
                </div>
              </div>
            ))
          : (
            <div className="col-span-full text-slate-400">
              No projects are available at the moment.
            </div>
          )}
      </div>
    </section>
  );
}
