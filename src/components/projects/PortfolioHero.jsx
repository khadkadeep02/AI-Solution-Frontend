export default function PortfolioHero() {
  return (
    <section className="mx-auto max-w-3xl px-6 text-center">
      {/* Heading */}
      <h1 className="mb-5 text-6xl font-bold leading-[1.1] tracking-tight text-white md:text-7xl">
        Precision{" "}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Portfolio
        </span>
      </h1>

      {/* Divider */}
      <div className="mx-auto mb-7 h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Body */}
      <p className="mx-auto max-w-xl text-[16.5px] leading-relaxed text-slate-400">
        Explore our track record of engineering scalable AI ecosystems
        and enterprise solutions built to last.
      </p>

    </section>
  );
}