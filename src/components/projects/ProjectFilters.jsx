const filters = [
  "All Projects",
  "Computer Vision",
  "NLP Systems",
  "Predictive Analytics",
  "Neural Robotics",
];

export default function ProjectFilters() {
  return (
    <section className="flex flex-wrap gap-3 mb-12">

      {filters.map((filter, index) => (
        <button
          key={filter}
          className={
            index === 0
              ? "px-6 py-2 rounded-full bg-blue-800 text-white"
              : "px-6 py-2 rounded-full border border-slate-700"
          }
        >
          {filter}
        </button>
      ))}

    </section>
  );
}