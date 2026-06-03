export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center mx-auto px-6 py-6">

      <div className="grid md:grid-cols-2 gap-12 items-center">

        <div className="space-y-8">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-400 text-sm">
              V2.0 Core Intelligence Live
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            AI-Powered Solutions for{" "}
            <span className="text-blue-400">
              Modern Businesses
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl">
            Harness the precision of machine learning to automate
            complex workflows, predict market shifts and deliver
            hyper-personalized customer experiences at scale.
          </p>

        </div>

        <div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Hk0TRzKzL2Ypr78KXiQBR5By7xBX2zsY3WxGnq6KK7zas9ssSh2slQKpx7dR-AsqIwDVXulDlwWlX9-RWnIrqFNcoCEM8aOBLcl6gbEf8pm8Fu03TLuhenfaz63R6V3e5bfsYyQIHwPP9UzmDchNSk5Ago5xM26aD33nauHRKD96SzhcijR-mGueoomH4HFY6mJs6ubM-eyu71p5xi9G8ID4Koh2H6X7by1XxfHXplZL1V-dfGpfxtGloTe6f3lMj8l42uC2Dvk"
            alt=""
            className="rounded-3xl border border-slate-800"
          />
        </div>

      </div>
    </section>
  );
}