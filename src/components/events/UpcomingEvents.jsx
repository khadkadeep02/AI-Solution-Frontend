import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

function parseDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  const normalized = value.replace(/\./g, "").trim();
  const parts = normalized.match(/([A-Za-z]{3})\s*(\d{1,2})(?:-(\d{1,2}))?/);
  if (!parts) return null;
  const monthNames = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec",
  ];
  const monthIndex = monthNames.indexOf(parts[1].toLowerCase());
  if (monthIndex === -1) return null;
  const day = Number(parts[2]);
  const year = new Date().getFullYear();
  return new Date(year, monthIndex, day);
}

function formatDateRange(event) {
  if (event.date) return event.date;
  const start = parseDate(event.start_date);
  const end = parseDate(event.end_date);

  if (start && end) {
    const options = { month: "short", day: "numeric" };
    const startLabel = start.toLocaleDateString(undefined, options);
    const endLabel = end.toLocaleDateString(undefined, options);
    return startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`;
  }

  if (start) return start.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  if (end) return end.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return "TBA";
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE}/events/`);
        if (!active) return;
        setEvents(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        if (active) setError("Unable to load events.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadEvents();
    return () => {
      active = false;
    };
  }, []);

  const now = new Date();
  const upcomingEvents = [];
  const conductedEvents = [];

  events.forEach((event) => {
    const eventDate = parseDate(event.end_date) || parseDate(event.start_date) || parseDate(event.date);
    if (eventDate && eventDate >= new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
      upcomingEvents.push(event);
    } else {
      conductedEvents.push(event);
    }
  });

  const sortedUpcoming = [...upcomingEvents].sort((a, b) => {
    const aDate = parseDate(a.start_date) || parseDate(a.end_date) || parseDate(a.date) || new Date(0);
    const bDate = parseDate(b.start_date) || parseDate(b.end_date) || parseDate(b.date) || new Date(0);
    return aDate - bDate;
  });

  const sortedConducted = [...conductedEvents].sort((a, b) => {
    const aDate = parseDate(a.end_date) || parseDate(a.start_date) || parseDate(a.date) || new Date(0);
    const bDate = parseDate(b.end_date) || parseDate(b.start_date) || parseDate(b.date) || new Date(0);
    return bDate - aDate;
  });

  const renderCard = (event) => (
    <div key={event.id ?? event.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <span className="bg-blue-700 px-4 py-1 rounded-full text-sm inline-flex items-center">
        {formatDateRange(event)}
      </span>

      {event.location && <p className="mt-4 text-cyan-400">{event.location}</p>}

      <h3 className="text-2xl font-semibold mt-4 mb-3 text-white">{event.title}</h3>
      <p className="text-slate-400 leading-relaxed whitespace-pre-line">{event.description}</p>
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">

      {loading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 animate-pulse h-64" />
          ))}
        </div>
      ) : error ? (
        <div className="text-rose-400">{error}</div>
      ) : (
        <>
          {sortedUpcoming.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">Upcoming Events</h3>
                  <p className="text-slate-500 mt-2">Events that are scheduled now or in the future.</p>
                </div>
                <span className="text-sm uppercase tracking-[0.24em] text-slate-500">{sortedUpcoming.length} upcoming</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {sortedUpcoming.map(renderCard)}
              </div>
            </div>
          )}

          {sortedConducted.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-semibold">Conducted Events</h3>
                  <p className="text-slate-500 mt-2">Past events that have already finished.</p>
                </div>
                <span className="text-sm uppercase tracking-[0.24em] text-slate-500">{sortedConducted.length} conducted</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {sortedConducted.map(renderCard)}
              </div>
            </div>
          )}

          {sortedUpcoming.length === 0 && sortedConducted.length === 0 && (
            <div className="text-slate-400">No events available at this time.</div>
          )}
        </>
      )}
    </section>
  );
}
