export default function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080e1a] p-16 md:p-20 text-center">

          {/* Subtle dot grid */}
          <div
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-cyan-400/30 rounded-full px-4 py-1.5 text-cyan-400 text-xs tracking-wide mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Enterprise intelligence ready
            </div>

            {/* Heading */}
            <h2 className="text-5xl md:text-6xl font-semibold leading-tight text-slate-100 mb-5">
              Ready to lead with
              <span className="block text-blue-400">intelligence?</span>
            </h2>

            {/* Body */}
            <p className="text-base text-slate-400 leading-relaxed max-w-xl mx-auto mb-10">
              Join hundreds of enterprise leaders leveraging advanced AI systems
              to automate workflows, accelerate growth, and unlock new opportunities.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white rounded-xl px-7 py-3.5 text-sm font-medium transition-all duration-150">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get started free
              </button>

              <button className="inline-flex items-center justify-center gap-2 border border-white/[0.12] hover:border-white/[0.3] text-slate-300 hover:text-slate-100 active:scale-[0.98] rounded-xl px-7 py-3.5 text-sm font-normal transition-all duration-150">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch demo
              </button>
            </div>

            {/* Social proof stats */}
            <div className="flex justify-center gap-10 mt-14 pt-9 border-t border-white/[0.07]">
              {[
                { val: "500+", lbl: "Enterprise clients" },
                { val: "99.9%", lbl: "Uptime SLA" },
                { val: "3.2×", lbl: "Avg. productivity gain" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-semibold text-slate-100">{s.val}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}