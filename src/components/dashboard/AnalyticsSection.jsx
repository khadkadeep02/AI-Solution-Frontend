export default function AnalyticsSection() {
  return (
    <section className="grid lg:grid-cols-3 gap-6 mb-10">

      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h3 className="text-2xl font-semibold mb-6">
          Engagement Trends
        </h3>

        <div className="h-72 flex items-end gap-3">

          {[40, 65, 85, 55, 95, 45, 30].map((value) => (
            <div
              key={value}
              className="flex-1 bg-slate-800 rounded-t-lg relative"
            >
              <div
                className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg"
                style={{ height: `${value}%` }}
              />
            </div>
          ))}

        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h3 className="text-2xl font-semibold mb-8">
          Lead Sources
        </h3>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Organic Search</span>
            <span>45%</span>
          </div>

          <div className="flex justify-between">
            <span>Paid Advertising</span>
            <span>30%</span>
          </div>

          <div className="flex justify-between">
            <span>Direct Referrals</span>
            <span>25%</span>
          </div>

        </div>

      </div>

    </section>
  );
}