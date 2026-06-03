export const kpis = [
  {
    title: "Total Inquiries",
    value: "2,842",
    change: "+12%",
    icon: "mail",
  },
  {
    title: "Active Requests",
    value: "456",
    change: "+5.4%",
    icon: "task_alt",
  },
  {
    title: "Demos Scheduled",
    value: "89",
    change: "-2.1%",
    icon: "play_circle",
  },
  {
    title: "Registrations",
    value: "1,104",
    change: "+18%",
    icon: "person_add",
  },
];

export default function KPIGrid() {
  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

      {kpis.map((item) => (
        <div
          key={item.title}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6"
        >
          <p className="text-slate-400 text-sm">
            {item.title}
          </p>

          <h3 className="text-4xl font-bold mt-2">
            {item.value}
          </h3>

          <p className="text-cyan-400 mt-2">
            {item.change}
          </p>
        </div>
      ))}

    </section>
  );
}