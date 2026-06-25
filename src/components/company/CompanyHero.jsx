export default function CompanyHero() {
  return (
    <section className="relative overflow-hidden px-6">

      {/* Glow */}
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full" />

      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl space-y-7">

          {/* Heading */}
          <h1 className="text-6xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl">
            Pioneering the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Intelligence
            </span>{" "}
            Frontier.
          </h1>

          {/* Body */}
          <p className="max-w-xl text-[16.5px] leading-relaxed text-slate-400">
            We don't just build models — we engineer the cognitive
            infrastructure for the next generation of industry leaders.
          </p>

          {/* Accent bars */}
          <div className="flex items-center gap-2 pt-2">
            <div className="h-0.5 w-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
            <div className="h-0.5 w-10 rounded-full bg-slate-700" />
            <div className="h-0.5 w-4 rounded-full bg-slate-800" />
          </div>

        </div>
      </div>

    </section>
  );
}