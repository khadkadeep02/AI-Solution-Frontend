import { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE;

// One accent color per index slot — cycles if there are more than 6 members
const AVATAR_PALETTE = [
  { bg: "bg-blue-50   dark:bg-blue-950",  text: "text-blue-800   dark:text-blue-200"  },
  { bg: "bg-teal-50   dark:bg-teal-950",  text: "text-teal-800   dark:text-teal-200"  },
  { bg: "bg-purple-50 dark:bg-purple-950",text: "text-purple-800 dark:text-purple-200"},
  { bg: "bg-pink-50   dark:bg-pink-950",  text: "text-pink-800   dark:text-pink-200"  },
  { bg: "bg-amber-50  dark:bg-amber-950", text: "text-amber-800  dark:text-amber-200" },
  { bg: "bg-orange-50 dark:bg-orange-950",text: "text-orange-800 dark:text-orange-200"},
];

function getInitials(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

function Avatar({ member, index }) {
  const palette = AVATAR_PALETTE[index % AVATAR_PALETTE.length];

  if (member.image) {
    return (
      <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium ${palette.bg} ${palette.text}`}
    >
      {getInitials(member.name)}
    </div>
  );
}

// ─── Single member row ────────────────────────────────────────────────────────

function MemberRow({ member, index }) {
  return (
    <article
      className="
        grid items-center gap-x-5 py-4
        border-b border-slate-100 dark:border-slate-800 last:border-0
        hover:bg-slate-50 dark:hover:bg-slate-800/40
        rounded-lg transition-colors duration-150 px-2 -mx-2
      "
      style={{ gridTemplateColumns: "36px 44px 180px 1fr auto" }}
    >
      {/* Index */}
      <span className="text-[11px] font-mono text-slate-300 dark:text-slate-600 text-right pr-1 group-hover:text-slate-400 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Avatar */}
      <Avatar member={member} index={index} />

      {/* Name + role */}
      <div className="min-w-0">
        <p className="text-[14px] font-medium text-slate-900 dark:text-white truncate leading-snug">
          {member.name}
        </p>
        <p className="text-[11px] font-medium tracking-wide uppercase text-slate-400 dark:text-slate-500 truncate mt-0.5">
          {member.designation}
        </p>
      </div>

      {/* Bio */}
      <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed min-w-0 line-clamp-2">
        {member.bio}
      </p>

      {/* Social links */}
      <div className="flex items-center gap-2 pl-2 flex-shrink-0">
        {member.linkedin_url && (
          <a
            href={member.linkedin_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="w-7 h-7 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
          >
            <FaLinkedinIn size={13} />
          </a>
        )}
        {member.github_url && (
          <a
            href={member.github_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on GitHub`}
            className="w-7 h-7 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
          >
            <FaGithub size={13} />
          </a>
        )}
        {/* Keep spacing consistent when no links */}
        {!member.linkedin_url && !member.github_url && (
          <div className="w-7" />
        )}
      </div>
    </article>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div
      className="grid items-center gap-x-5 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 animate-pulse px-2"
      style={{ gridTemplateColumns: "36px 44px 180px 1fr auto" }}
    >
      <div className="h-3 w-5 rounded bg-slate-100 dark:bg-slate-800 ml-auto" />
      <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800" />
      <div className="flex flex-col gap-1.5">
        <div className="h-3.5 w-32 rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-2.5 w-24 rounded bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3 rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="flex gap-2">
        <div className="w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-800" />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Leadership() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

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
      .catch((err) => {
        console.error("Failed to load team members:", err);
        if (active) setError("Unable to load team members.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 mb-32">

      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
        <div>
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-400 dark:text-slate-500 mb-1.5">
            Our people
          </p>
          <h2 className="font-serif text-4xl font-normal text-slate-900 dark:text-white">
            The team
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
            Meet the experts driving our vision.
          </p>
        </div>

        {!loading && !error && (
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 pb-1">
            {teamMembers.length} {teamMembers.length === 1 ? "member" : "members"}
          </span>
        )}
      </div>

      {/* Roster */}
      {loading ? (
        <div>
          {[1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)}
        </div>
      ) : error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : teamMembers.length > 0 ? (
        <div>
          {teamMembers.map((member, index) => (
            <MemberRow
              key={member.id ?? member.name}
              member={member}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-sm text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-2xl">
          No team members are available at this time.
        </div>
      )}
    </section>
  );
}