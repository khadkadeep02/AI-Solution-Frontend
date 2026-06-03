export const inquiries = [
  {
    company: "NexGen Tech",
    email: "sarah.j@nexgen.io",
    type: "API Enterprise Setup",
    status: "Processing",
    priority: "High",
  },
  {
    company: "AeroLogistics",
    email: "ops@aerolog.com",
    type: "Model Fine-Tuning",
    status: "Pending",
    priority: "Medium",
  },
  {
    company: "Stellar Cloud",
    email: "billing@stellar.ai",
    type: "Demo Scheduling",
    status: "Completed",
    priority: "Low",
  },
  {
    company: "Quant Finance",
    email: "m.chen@quant.com",
    type: "License Expansion",
    status: "Processing",
    priority: "High",
  },
];

export default function InquiryTable() {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

      <div className="p-6 border-b border-slate-800">
        <h3 className="text-2xl font-semibold">
          Recent Inquiries
        </h3>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="border-b border-slate-800">
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Request</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Priority</th>
            </tr>
          </thead>

          <tbody>

            {inquiries.map((item) => (
              <tr
                key={item.company}
                className="border-b border-slate-800"
              >
                <td className="p-4">
                  {item.company}
                </td>

                <td className="p-4">
                  {item.type}
                </td>

                <td className="p-4">
                  {item.status}
                </td>

                <td className="p-4">
                  {item.priority}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}