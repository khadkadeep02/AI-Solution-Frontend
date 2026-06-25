import { useEffect, useState } from "react";
import axios from "axios";
import { MapPin } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

// ─── Date helpers ────────────────────────────────────────────────────────────

function parseDate(value) {
  if (!value) return null;

  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct;

  const normalized = value.replace(/\./g, "").trim();
  const parts = normalized.match(/([A-Za-z]{3})\s*(\d{1,2})(?:-(\d{1,2}))?/);
  if (!parts) return null;

  const monthNames = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  const monthIndex = monthNames.indexOf(parts[1].toLowerCase());
  if (monthIndex === -1) return null;

  return new Date(new Date().getFullYear(), monthIndex, Number(parts[2]));
}

function formatDateRange(event) {
  if (event.date) return event.date;

  const start = parseDate(event.start_date);
  const end   = parseDate(event.end_date);
  const opts  = { month: "short", day: "numeric" };

  if (start && end) {
    const s = start.toLocaleDateString(undefined, opts);
    const e = end.toLocaleDateString(undefined, opts);
    return s === e ? s : `${s} – ${e}`;
  }
  if (start) return start.toLocaleDateString(undefined, opts);
  if (end)   return end.toLocaleDateString(undefined, opts);
  return "TBA";
}

function getDateParts(event) {
  const d = parseDate(event.start_date) || parseDate(event.date);
  if (!d) return { month: "—", day: "—" };
  return {
    month: d.toLocaleDateString(undefined, { month: "short" }),
    day:   d.getDate(),
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusPill({ upcoming }) {
  if (upcoming) {
    return (
      <span className="self-start shrink-0 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
        Upcoming
      </span>
    );
  }
  return (
    <span className="self-start shrink-0 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
      Conducted
    </span>
  );
}

function EventRow({ event, upcoming }) {
  const { month, day } = getDateParts(event);

  return (
    <div
      className={`
        grid gap-x-5 gap-y-1 px-6 py-5 transition-colors duration-150
        bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50
        ${!upcoming ? "opacity-60 hover:opacity-80" : ""}
      `}
      style={{ gridTemplateColumns: "52px 1fr auto" }}
    >
      {/* Date column */}
      <div className="flex flex-col items-center pt-0.5">
        <span className="text-[10px] font-medium tracking-widest uppercase text-slate-400 dark:text-slate-500">
          {month}
        </span>
        <span className="text-[22px] font-medium text-slate-900 dark:text-white leading-none mt-0.5">
          {day}
        </span>
        <div className="w-px flex-1 bg-slate-100 dark:bg-slate-800 mt-2" />
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h3 className="text-[15px] font-medium text-slate-900 dark:text-white leading-snug mb-1">
          {event.title}
        </h3>
        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-line">
          {event.description}
        </p>
        {event.location && (
          <p className="inline-flex items-center gap-1 mt-2 text-[12px] text-slate-400 dark:text-slate-500">
            <MapPin size={12} aria-hidden="true" />
            {event.location}
          </p>
        )}
      </div>

      {/* Status pill */}
      <StatusPill upcoming={upcoming} />
    </div>
  );
}

function SectionBlock({ title, label, count, events, upcoming }) {
  return (
    <div className="mb-10">
      {/* Section header */}
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-400 dark:text-slate-500 mb-0.5">
            {label}
          </p>
          <h2 className="text-[22px] font-serif font-normal text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>
        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 pb-1">
          {count} {count === 1 ? "event" : "events"}
        </span>
      </div>

      {/* Event list */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden">
        {events.map((event) => (
          <EventRow
            key={event.id ?? event.title}
            event={event}
            upcoming={upcoming}
          />
        ))}
      </div>
    </div>
  );
}

function Divider({ label }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
      <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-slate-400 dark:text-slate-500">
        {label}
      </span>
      <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
    </div>
  );
}

function SkeletonRow() {
  return (
    <div
      className="grid gap-x-5 gap-y-2 px-6 py-5 animate-pulse"
      style={{ gridTemplateColumns: "52px 1fr auto" }}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="h-2.5 w-8 rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-6 w-7 rounded bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="flex flex-col gap-2 pt-0.5">
        <div className="h-4 w-48 rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
        <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="h-5 w-16 rounded-full bg-slate-100 dark:bg-slate-800 self-start" />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function UpcomingEvents() {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let active = true;

    axios
      .get(`${API_BASE}/events/`)
      .then((res) => {
        if (active) setEvents(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        if (active) setError("Unable to load events.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  // Split and sort
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming  = [];
  const conducted = [];

  events.forEach((event) => {
    const d =
      parseDate(event.end_date) ||
      parseDate(event.start_date) ||
      parseDate(event.date);
    (d && d >= today ? upcoming : conducted).push(event);
  });

  const sortAsc  = (arr) =>
    [...arr].sort((a, b) => {
      const da = parseDate(a.start_date) || parseDate(a.date) || new Date(0);
      const db = parseDate(b.start_date) || parseDate(b.date) || new Date(0);
      return da - db;
    });

  const sortDesc = (arr) =>
    [...arr].sort((a, b) => {
      const da = parseDate(a.end_date) || parseDate(a.start_date) || parseDate(a.date) || new Date(0);
      const db = parseDate(b.end_date) || parseDate(b.start_date) || parseDate(b.date) || new Date(0);
      return db - da;
    });

  const sortedUpcoming  = sortAsc(upcoming);
  const sortedConducted = sortDesc(conducted);

  return (
    <section className="max-w-4xl mx-auto px-6 mb-32">

      {/* Top header */}
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-400 dark:text-slate-500 mb-1.5">
            Schedule
          </p>
          <h2 className="font-serif text-4xl font-normal text-slate-900 dark:text-white">
            Events
          </h2>
        </div>
        {!loading && !error && (
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 pb-1">
            {events.length} total
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-2xl overflow-hidden">
          {[1, 2, 3].map((i) => <SkeletonRow key={i} />)}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="py-16 text-center text-sm text-red-400 border border-slate-200 dark:border-slate-700 rounded-2xl">
          {error}
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {sortedUpcoming.length > 0 && (
            <SectionBlock
              title="Upcoming events"
              label="Upcoming"
              count={sortedUpcoming.length}
              events={sortedUpcoming}
              upcoming={true}
            />
          )}

          {sortedUpcoming.length > 0 && sortedConducted.length > 0 && (
            <Divider label="Past events" />
          )}

          {sortedConducted.length > 0 && (
            <SectionBlock
              title="Conducted events"
              label="Conducted"
              count={sortedConducted.length}
              events={sortedConducted}
              upcoming={false}
            />
          )}

          {sortedUpcoming.length === 0 && sortedConducted.length === 0 && (
            <div className="py-20 text-center text-sm text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 rounded-2xl">
              No events available at this time.
            </div>
          )}
        </>
      )}
    </section>
  );
}