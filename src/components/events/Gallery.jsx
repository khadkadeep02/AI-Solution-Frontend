export const gallery = [
  {
    category: "Architecture",
    title: "Structural Synthesis v.1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGCfn4KZqJ4JisjWO6iR5a6M1H1GRotq22cUprLv_orPdwkCgVPEUYmFCxSGqS_C61oxxD6Kfd9jBfnfUwJNJnfzioZEBZbCKyvbRJnudKYRzZdR5o7n4Vax-tR3JmKfThK-z8P9kG_CXW8GQsU09cwybkBNcAr-wHsj1CITQKYxUaoLSVybMdKKzQQrgNcrBcLMzR1i2D6Zp7sQo3oos1H8I8kt4tb4FvIGHJ0tuiim_7OsM5BpdsNPS0voTLxsYe7ZZ-XkvrcQk",
  },
  {
    category: "Workflow",
    title: "Developer Sanctum",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBtrGr9J35-DQ-9T3taJ-adWQc8pvdWrpniPI2oNE5JKVKZ8Q9nDkaPuMJ7j6Ce7_tQduPCv09uUOqFHTSxpVEDedafuTsW-PEOyBjyYpGS6f0OJ7R1hHau_OU48FZkp3bvd00bK5sBdXc3tfeGSalyrIW2RFyuEoihDjPgDjIQLCHWb7FiFiXSoNbCEnhfJRCHghmyS5JWNcmBCYVnHfTI97rs4TV3sh9zMAqMiW8RFhyT7B9jAVJ3AB58RFVQUBMOWzqYADLun14",
  },
  {
    category: "Identity",
    title: "Biometric Precision",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDirpyqYvvAIcKegiRliskLvsSgK2phWmsDEIeLHiRbsn2yPLM8WGc9WxnfliN6RVyDVG5ESZAPrqVePVK78HsORZHc1LOeyJs4VxIjknlOIN3g_24Xrp4RZ_4w8y_2kD_wi3D75Ak1H7w8wohijPvN3RG_G2ov-qvWXyoePSqq9oQmJPh2ldY-rBFbeC2zjvreqAYZhygrzqoPxFteE5ww8TM3-_xiecVJwDV6eju1Q7Kp4Yfjb1m1l5vyoyIJRFhP6uPGFSkVyok",
  },
];
export default function Gallery() {
  return (
    <section className="max-w-7xl mx-auto px-6">

      <div className="mb-12">
        <span className="text-cyan-400 uppercase text-sm">
          Visual Archive
        </span>

        <h2 className="text-3xl font-semibold mt-2">
          Innovation Captured
        </h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">

        {gallery.map((item) => (
          <div
            key={item.title}
            className="mb-6 break-inside-avoid rounded-xl overflow-hidden border border-slate-800"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full"
            />

            <div className="p-5 bg-slate-900">
              <span className="text-blue-400 text-xs uppercase">
                {item.category}
              </span>

              <h4 className="mt-2">
                {item.title}
              </h4>
            </div>
          </div>
        ))}

      </div>

      <div className="text-center mt-12">
        <button className="px-8 py-3 border border-slate-700 rounded-full">
          Load More Archive
        </button>
      </div>

    </section>
  );
}