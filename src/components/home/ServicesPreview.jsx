import { services } from "../../data/services";

export default function ServicesPreview() {
  return (
    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold">
            Precision Engineering
          </h2>

          <p className="text-slate-400 mt-4">
            Scalable infrastructure designed for the next generation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {services.map((service) => (
            <div
              key={service.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
            >
              <div className="text-4xl mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              <p className="text-slate-400">
                {service.description}
              </p>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}