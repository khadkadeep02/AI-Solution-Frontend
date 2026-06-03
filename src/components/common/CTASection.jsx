export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-900/80 via-slate-900 to-slate-950 p-12 md:p-20">

          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 text-cyan-400 text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Enterprise Intelligence Ready
            </span>

            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Lead with
              <span className="block text-blue-400">
                Intelligence?
              </span>
            </h2>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
              Join hundreds of enterprise leaders leveraging
              advanced AI systems to automate workflows,
              accelerate growth and unlock new opportunities.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}