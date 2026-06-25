export default function EventsHero() {
  return (
    <section className="mx-auto max-w-7xl px-6">

      <div className="max-w-4xl space-y-6">

        <h1 className="text-6xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl">
          Engineered Experiences
          <br />
          &{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Digital Frontiers
          </span>
        </h1>

        <div className="flex items-center gap-2">
          <div className="h-0.5 w-20 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
          <div className="h-0.5 w-10 rounded-full bg-slate-700" />
          <div className="h-0.5 w-4 rounded-full bg-slate-800" />
        </div>

        <p className="max-w-xl text-[16.5px] leading-relaxed text-slate-400">
          Explore the intersection of architecture and artificial
          intelligence — where ideas meet execution.
        </p>

      </div>

    </section>
  );
}