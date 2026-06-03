export default function DashboardHeader() {
  return (
    <section className="mb-10">

      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h1 className="text-5xl font-bold">
            Executive Overview
          </h1>

          <p className="text-slate-400 mt-3">
            Real-time performance metrics and lead management.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border border-slate-700 px-5 py-3 rounded-lg">
            Last 30 Days
          </button>

          <button className="bg-blue-700 px-5 py-3 rounded-lg">
            Export Report
          </button>
        </div>

      </div>

    </section>
  );
}