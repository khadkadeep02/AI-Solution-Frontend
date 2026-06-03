import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950 rounded-sm">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold mb-12">
          Trusted By Leaders
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-slate-900 p-10 rounded-2xl"
            >
              <p className="italic mb-6">
                "{item.quote}"
              </p>

              <h4 className="font-semibold">
                {item.name}
              </h4>

              <p className="text-slate-400">
                {item.role}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}