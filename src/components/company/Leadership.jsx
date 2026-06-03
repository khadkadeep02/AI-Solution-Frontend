const leaders = [
  {
    name: "Sarah Chen",
    role: "Chief Technical Officer",
    description:
      "Lead Architect behind the neural core.",
  },
  {
    name: "Marcus Vance",
    role: "Head of Product",
    description:
      "Transforms AI capabilities into experiences.",
  },
  {
    name: "Dr. Lena Sokolov",
    role: "Chief Operations Officer",
    description:
      "Expert in scaling deep-tech startups.",
  },
];

export default function Leadership() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">

      <div className="mb-16">
        <h2 className="text-4xl font-bold">
          Architects of Intelligence
        </h2>

        <p className="text-slate-400 mt-3">
          Meet the experts driving our vision.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {leaders.map((leader) => (
          <div
            key={leader.name}
            className="bg-slate-900 border border-slate-800 rounded-xl p-8"
          >
            <h3 className="text-xl font-semibold">
              {leader.name}
            </h3>

            <p className="text-primary uppercase text-sm my-2">
              {leader.role}
            </p>

            <p className="text-slate-400">
              {leader.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}