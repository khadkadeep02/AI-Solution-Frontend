const advantages = [
  {
    title: "Military-Grade Security",
    icon: "🛡️",
    description:
      "End-to-end encrypted training pipelines.",
  },
  {
    title: "Latency Mastery",
    icon: "🚀",
    description:
      "Sub-50ms inference times.",
  },
  {
    title: "Contextual Depth",
    icon: "🧠",
    description:
      "Advanced RAG architectures.",
  },
  {
    title: "Custom Tuning",
    icon: "⚙️",
    description:
      "Fine-tuned for your business KPIs.",
  },
];

export default function Advantage() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">

      <div className="text-center max-w-2xl mx-auto mb-20">
        <h2 className="text-4xl font-bold mb-4">
          The Precision Advantage
        </h2>

        <p className="text-slate-400">
          Why enterprise leaders trust our architecture.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {advantages.map((item) => (
          <div
            key={item.title}
            className="bg-slate-900 border border-slate-800 rounded-xl p-8"
          >
            <div className="text-4xl mb-6">
              {item.icon}
            </div>

            <h3 className="font-semibold mb-3">
              {item.title}
            </h3>

            <p className="text-slate-400">
              {item.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}