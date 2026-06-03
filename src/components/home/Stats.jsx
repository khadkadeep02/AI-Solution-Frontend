const stats = [
  {
    value: "99.9%",
    label: "Model Accuracy",
  },
  {
    value: "2.4M",
    label: "Daily API Requests",
  },
  {
    value: "450+",
    label: "Enterprise Partners",
  },
  {
    value: "12ms",
    label: "Average Latency",
  },
];

export default function Stats() {
  return (
    <section className="border-y border-slate-800 py-12">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

        {stats.map((item) => (
          <div key={item.label}>
            <h2 className="text-blue-400 text-4xl font-bold">
              {item.value}
            </h2>

            <p className="text-slate-400 mt-2">
              {item.label}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}