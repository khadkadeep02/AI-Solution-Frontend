import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  { value: "10x", label: "Faster workflows" },
  { value: "98%", label: "Accuracy rate" },
  { value: "500+", label: "Businesses served" },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6">
        <div className="grid w-full items-center gap-12 md:grid-cols-2">

          {/* Left: copy */}
          <div className="space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/40 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
              <span className="text-[13px] font-medium text-cyan-400">
                V2.0 Core Intelligence Live
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl xl:text-7xl">
              AI-Powered Solutions{" "}
              <br className="hidden sm:block" />
              for{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Modern Businesses
              </span>
            </h1>

            {/* Body */}
            <p className="max-w-lg text-[16.5px] leading-relaxed text-slate-400">
              Harness the precision of machine learning to automate complex
              workflows, predict market shifts, and deliver hyper-personalized
              customer experiences at scale.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/contact")}
                className="flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                Get started free
                <ArrowRight size={15} />
              </button>
              <button
                onClick={() => navigate("/projects")}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-[14px] font-semibold text-slate-300 backdrop-blur-sm transition-colors hover:border-slate-600 hover:text-white"
              >
                See our work
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 border-t border-slate-800 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-0.5 text-[12.5px] text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

          {/* Right: image */}
          <div className="relative">

            {/* Glow ring behind image */}
            <div className="absolute inset-4 rounded-3xl bg-blue-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-800/30 backdrop-blur-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Hk0TRzKzL2Ypr78KXiQBR5By7xBX2zsY3WxGnq6KK7zas9ssSh2slQKpx7dR-AsqIwDVXulDlwWlX9-RWnIrqFNcoCEM8aOBLcl6gbEf8pm8Fu03TLuhenfaz63R6V3e5bfsYyQIHwPP9UzmDchNSk5Ago5xM26aD33nauHRKD96SzhcijR-mGueoomH4HFY6mJs6ubM-eyu71p5xi9G8ID4Koh2H6X7by1XxfHXplZL1V-dfGpfxtGloTe6f3lMj8l42uC2Dvk"
                alt="AI Solutions platform preview"
                className="h-full w-full object-cover"
              />

              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 py-2 backdrop-blur-md">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20">
                  <Sparkles size={13} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-white">AI Engine Active</p>
                  <p className="text-[10px] text-slate-400">Processing in real-time</p>
                </div>
                <span className="ml-1 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}