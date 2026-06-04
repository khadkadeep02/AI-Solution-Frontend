import { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const API_BASE = "http://127.0.0.1:8001/api";

export default function Leadership() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    axios
      .get(`${API_BASE}/team-members/`)
      .then((response) => {
        if (!active) return;

        const members = Array.isArray(response.data) ? response.data : [];
        setTeamMembers(
          [...members].sort(
            (a, b) =>
              (a.display_order ?? 0) - (b.display_order ?? 0) ||
              String(a.name ?? "").localeCompare(String(b.name ?? ""))
          )
        );
      })
      .catch((apiError) => {
        console.error("Failed to load team members:", apiError);
        if (active) setError("Unable to load team members.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto flex items-center flex-1 flex-col ">

      <div className="mb-16 text-left">
        <h2 className="text-4xl font-bold">
          Architects of Intelligence
        </h2>

        <p className="text-slate-400 mt-3">
          Meet the experts driving our vision.
        </p>
      </div>

      <div className="flex items-center flex-1 justify-between w-[90%] flex-wrap gap-5">

        {loading ? (
          [1, 2, 3].map((placeholder) => (
            <div
              key={placeholder}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-pulse"
            >
              <div className="aspect-[4/3] bg-slate-800" />
              <div className="p-8">
                <div className="h-6 w-40 rounded bg-slate-800 mb-3" />
                <div className="h-4 w-32 rounded bg-slate-800 mb-6" />
                <div className="space-y-3">
                  <div className="h-4 rounded bg-slate-800" />
                  <div className="h-4 rounded bg-slate-800" />
                  <div className="h-4 w-3/4 rounded bg-slate-800" />
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-full text-rose-400">{error}</div>
        ) : teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <article
              key={member.id ?? member.name}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden text-left"
            >
              <div className="aspect-[4/3] bg-slate-950 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-[300px] h-[200px] object-cover"
                />
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {member.name}
                    </h3>

                    <p className="text-primary uppercase text-sm my-2">
                      {member.designation}
                    </p>
                  </div>

                  <span className="text-xs text-slate-500">
                    #{member.display_order ?? 0}
                  </span>
                </div>

                <p className="text-slate-400 whitespace-pre-line">
                  {member.bio}
                </p>

                {(member.linkedin_url || member.github_url) && (
                  <div className="flex items-center gap-3 mt-6">
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} on LinkedIn`}
                        title={`${member.name} on LinkedIn`}
                        className="w-10 h-10 rounded-lg border border-slate-700 inline-flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500 transition-colors"
                      >
                        <FaLinkedinIn size={18} />
                      </a>
                    )}

                    {member.github_url && (
                      <a
                        href={member.github_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} on GitHub`}
                        title={`${member.name} on GitHub`}
                        className="w-10 h-10 rounded-lg border border-slate-700 inline-flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500 transition-colors"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full text-slate-400">
            No team members are available at this time.
          </div>
        )}

      </div>
    </section>
  );
}
