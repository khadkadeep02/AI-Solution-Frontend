export default function Methodology() {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-32">

      <div className="grid md:grid-cols-2 gap-8">

        <div className="rounded-xl overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8AMTP_88SOzAED_fpgJJUimlFu7OAW2hDL3z7T5UgzDlGo9TNeClOVJOzMxWNcsbGFloMk-6Cd8zgaa3fJ53g-4F8Ueju8DUUGL5o0Bk_5mPAsEC3NhbsTtqEFTwysknEa1LEKuQAKeUSCYEpKPPGr79q6-nWZKIbKHJ4tX8JGykIzpHHFjsKciBPVti-WvOhOx4OvvOjA6aMkQBEwP_-DbmhN6wWtEo3fmqYzF8dGEuB3ThFIyPPfpQTy6QsG888XKvzGv1WBOY"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-surface-container rounded-xl p-12">

          <h3 className="text-3xl font-semibold mb-8">
            Our Methodology
          </h3>

          <div className="space-y-8">

            <div>
              <h4 className="font-semibold">
                Discovery & Feasibility
              </h4>

              <p className="text-slate-400">
                Validating AI use cases before investment.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                Rapid Prototyping
              </h4>

              <p className="text-slate-400">
                Deploying MVPs in weeks.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                Enterprise Hardening
              </h4>

              <p className="text-slate-400">
                Scale testing and security integration.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}