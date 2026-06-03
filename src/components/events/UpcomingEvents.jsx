export const events = [
  {
    date: "OCT 14-16",
    location: "San Francisco Tech Hub",
    title: "The Neural Architecture Summit",
    description:
      "A deep dive into how generative AI is reshaping the physical world.",
    type: "location",
  },
  {
    date: "NOV 02",
    location: "Global Digital Stream",
    title: "Precision Engineering Workshop",
    description:
      "Exclusive technical workshop focusing on enterprise-scale AI.",
    type: "videocam",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">

      <div className="mb-12">
        <span className="text-cyan-400 uppercase text-sm">
          Chronicle
        </span>

        <h2 className="text-3xl font-semibold mt-2">
          Upcoming Events
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {events.map((event) => (
          <div
            key={event.title}
            className="bg-slate-900 border border-slate-800 rounded-xl p-8"
          >
            <span className="bg-blue-700 px-4 py-1 rounded-full text-sm">
              {event.date}
            </span>

            <p className="mt-4 text-cyan-400">
              {event.location}
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-4">
              {event.title}
            </h3>

            <p className="text-slate-400">
              {event.description}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}