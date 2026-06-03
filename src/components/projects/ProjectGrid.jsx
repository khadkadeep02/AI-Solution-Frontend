export const projects = [
  {
    category: "Computer Vision",
    title: "OmniSight Analytics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMimA6UvUQ7iPhA5Jk1skUjCKFNMubNs8lTGkN6pO-le14Cd3MZuFenqUsLv5gA_bOU6bm67YjeHUnEKokcC24nFGj_pmRk_bahuUDKCR9huPxKvFabSX-rIazIZitWhoH5H0gib4X_HVQAL3ou2hvqzFhKixeabqS5Eq1ouQ19FOy7UueyVEbosS6scvv0JgUs2CgA3a3EkjRoFp8v68UfcYqTWS0mBT305owmb3H-sRm6K5XGKa0pyYhxtZNYFJ2Sh7HsGOSQKI",
    description:
      "Real-time object detection and spatial mapping.",
  },
  {
    category: "NLP Systems",
    title: "Lexicon Core",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDmXBjgx1V7wdoD404KPxePn_l8MshI50a0VpB-WwrkVUw3x3UuzhGP_ePiXyCXNhKFHW9HbXhxTZHfCXsJdkt8qLagIPusCv9_ln39Oaj7pCxYeNadLgohA7GHlIdeMgZsC9vYVlV8Fhm7hv86fZo84Ja7PBHr4xHcpZcbJPpjeCiilJ7T81sPrb-J9IK3l8t-TYxadHNzOtfcg0DCexOK55O3x_UbLEpanq8JIn6hCnaKIlFZdfKUx520eWhpRxydnq5V7el0Hg0",
    description:
      "Semantic understanding engine for legal documents.",
  },
  {
    category: "Security",
    title: "Sentinel AI",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBBAyXQYrUAHldjAVQWii6xsOCt2uE6HdPcUXm_TKGMuqdG19VntLYc_qNS4Ow8tlWIdZJ6JJMUvLWMUvaVwIfdhbTBfBGXYtxVzpC_UG5wpyANn_C_wmm6zndpvNO5RR8de5nTWDhTDoE5-qZ3e9EzdYZkn1w4tcJsdNXiKwwRWcxzg1VuOmSd40AecFfR4caft7OwjsY5ZsMbuoA9kvX3xkeASdoiw6DapDbxurrbadlvIur_RVuXAGHdo0A7IEoZs3PZJydYioY",
    description:
      "Autonomous cybersecurity layer.",
  },
  {
    category: "Neural Robotics",
    title: "Vertex Arm OS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFGOpQGOCQknwHOReGAs6f9EtKfZQqw0dBqjBVYdEuMgtgQWNG5N_U3tVMhuD18l02VToD8k9aewszlkaI6A-7XfwgKaWGI9YX3F7GYiPzmL3U8YayXt18b6FZX1o_N1zlyj0vNTed1SZQoKFsFG3tTUyRVDW6C3Q8wf0BOvFePGDLX9EiFSIpNFB-Ji6uK922LGr6Lyum8emNB3hnYKLelgxXHESHoaZjz4_R8Gn1ByYmV8PagjUMpvfV8QoeoaYY1mXAtTYDo4U",
    description:
      "Embedded intelligence for manufacturing robotics.",
  },
];

export default function ProjectGrid() {
  return (
    <section>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="aspect-video w-full object-cover"
            />

            <div className="p-6">

              <span className="text-cyan-400 text-xs uppercase">
                {project.category}
              </span>

              <h3 className="text-xl font-semibold mt-2 mb-2">
                {project.title}
              </h3>

              <p className="text-slate-400 text-sm">
                {project.description}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* <div className="text-center mt-16">
        <button className="px-8 py-4 rounded-full border border-slate-700">
          Load More Projects
        </button>
      </div> */}

    </section>
  );
}