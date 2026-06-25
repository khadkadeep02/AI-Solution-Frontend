const advantages = [
  {
    title: "Military-grade security",
    description: "End-to-end encrypted training pipelines with zero-trust architecture.",
    icon: "shield-lock",
    iconColor: "#3b82f6",
    iconBg: "rgba(59,130,246,0.1)",
    divider: "#1d3a5c",
  },
  {
    title: "Latency mastery",
    description: "Sub-50ms inference times at any scale, guaranteed by SLA.",
    icon: "bolt",
    iconColor: "#8b5cf6",
    iconBg: "rgba(139,92,246,0.1)",
    divider: "#2d1f5e",
  },
  {
    title: "Contextual depth",
    description: "Advanced RAG architectures for deep enterprise knowledge retrieval.",
    icon: "brain",
    iconColor: "#14b8a6",
    iconBg: "rgba(20,184,166,0.1)",
    divider: "#0f3330",
  },
  {
    title: "Custom tuning",
    description: "Fine-tuned models aligned directly to your business KPIs and workflows.",
    icon: "adjustments-horizontal",
    iconColor: "#f59e0b",
    iconBg: "rgba(245,158,11,0.1)",
    divider: "#3d2a05",
  },
];

export default function Advantage() {
  return (
    <section className="py-32 px-6 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <p className="text-[11px] font-medium text-slate-700 uppercase tracking-[0.1em] mb-3">
            Why teams choose us
          </p>
          <h2 className="text-4xl font-semibold text-slate-100 mb-4 leading-tight">
            The precision advantage
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Why enterprise leaders trust our architecture.
          </p>
        </div>

        {/* Cards — 1px gap grid creates hairline dividers */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {advantages.map((item) => (
            <div
              key={item.title}
              className="bg-[#0d1117] hover:bg-[#111827] transition-colors duration-200 p-8"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                style={{ background: item.iconBg }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={item.iconColor}
                  strokeWidth={1.5}
                >
                  {/* swap per icon — or use an icon library */}
                </svg>
              </div>

              {/* Colored rule */}
              <div
                className="w-6 h-[1.5px] rounded-full mb-4"
                style={{ background: item.divider }}
              />

              <h3 className="text-sm font-medium text-slate-200 mb-2.5 leading-snug">
                {item.title}
              </h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}