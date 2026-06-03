import {
  Brain,
  LineChart,
  Bot,
  Database,
  ShieldCheck,
  CloudCog,
} from "lucide-react";

export const services = [
  {
    icon: Brain,
    title: "Custom AI Strategy",
    description:
      "A roadmap designed to align your business goals with the latest advancements in AI.",
  },
  {
    icon: LineChart,
    title: "Predictive Analytics",
    description:
      "Leverage historical data to forecast trends, demand and risk.",
  },
  {
    icon: Bot,
    title: "LLM Integration",
    description:
      "Embed advanced natural language processing into your workflow.",
  },
];


import { ArrowRight } from "lucide-react";

export default function ServicesGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Icon
                  size={28}
                  className="text-blue-400"
                />
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-white">
                {service.title}
              </h3>

              <p className="text-slate-400 flex-grow leading-relaxed">
                {service.description}
              </p>

              <button className="mt-8 flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all">
                Learn More
                <ArrowRight size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}