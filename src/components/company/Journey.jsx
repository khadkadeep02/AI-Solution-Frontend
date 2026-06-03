const timeline = [
  {
    year: "2018",
    title: "The Genesis",
    description:
      "Founded by a collective of PhD researchers from Stanford and MIT.",
  },
  {
    year: "2021",
    title: "Scale & Integration",
    description:
      "Launched our proprietary platform processing billions of tokens.",
  },
  {
    year: "2024",
    title: "Global Impact",
    description:
      "Leading the transition to agentic AI across global supply chains.",
  },
];

export default function Journey() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto bg-slate-900 rounded-xl">

      <div className="grid md:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-3xl font-semibold text-primary mb-10">
            Our Journey
          </h2>

          <div className="space-y-10">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="flex gap-6"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center">
                    {item.year}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp4YQt9BHqP5yXx1Xy-OQOeyPj97H1zsYZHg3z8vUEJwfcxrInagVXB4-l4Al6eProxKysrXX1azpEhj6iBdNbjgS2zrv9esrKdcP6EUB9G3mm3HgrXqEuoTRtF3slrcpgharXYtmseuxb6RqqXtTQbxaiT_YrG5Nvl720vxRbZZUygXIXYLw9PiUXrBXSqjRWRz3uMccXZQXoXcmGEAXum8XZdGKRr5IiJPhrrSMXq2mTL2ix4NdVBwlAGMNtgAXaYsMLIsgNm2E"
            alt="Innovation Hub"
            className="rounded-xl"
          />
        </div>

      </div>
    </section>
  );
}