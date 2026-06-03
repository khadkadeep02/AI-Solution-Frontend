export default function CompanyHero() {
  return (
    <section className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden">

      <div className="absolute top-0 right-0 opacity-20 -z-10">
        <div className="w-[600px] h-[600px] bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl">
        <h1 className="text-6xl font-bold mb-6">
          Pioneering the Intelligence Frontier.
        </h1>

        <p className="text-lg text-slate-400 mb-10">
          We don't just build models; we engineer the cognitive
          infrastructure for the next generation of industry leaders.
        </p>

        <div className="flex gap-4">
          <div className="h-1 w-24 bg-primary rounded-full" />
          <div className="h-1 w-12 bg-slate-700 rounded-full" />
        </div>
      </div>

    </section>
  );
}