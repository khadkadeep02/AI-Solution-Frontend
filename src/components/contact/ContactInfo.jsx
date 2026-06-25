export default function ContactForm() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

      <h2 className="text-3xl font-semibold mb-8">
        Project Inquiry
      </h2>

      <form className="space-y-6">

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Full Name"
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
          />

          <input
            placeholder="Email Address"
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Phone Number"
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
          />

          <input
            placeholder="Company"
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <select className="bg-slate-950 border border-slate-700 rounded-lg p-3">
            <option>USA</option>
            <option>UK</option>
            <option>India</option>
            <option>Nepal</option>
          </select>

          <input
            placeholder="Job Title"
            className="bg-slate-950 border border-slate-700 rounded-lg p-3"
          />

        </div>

        <textarea
          rows="5"
          placeholder="Tell us about your project..."
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-700 py-4 rounded-xl"
        >
          Initiate Consultation
        </button>

      </form>

    </div>
  );
}