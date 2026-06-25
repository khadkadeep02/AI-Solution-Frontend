const NAV = {
  Product: ["Features", "Integrations", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

const SOCIALS = [
  { label: "Twitter", href: "#", icon: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4l16 16M4 20L20 4" />
  )},
  { label: "LinkedIn", href: "#", icon: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
  )},
  { label: "GitHub", href: "#", icon: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  )},
];

export default function Footer() {
  return (
<footer className="
  relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen
  overflow-hidden
  border-t border-white/[0.08]
  bg-[#080e1a]
  pt-14 pb-8
  before:absolute
  before:inset-0
  before:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]
  before:pointer-events-none
  mt-10
">
  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />

  <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />

  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-24 bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.07]">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-blue-400 font-semibold text-sm tracking-tight">
              AI-Solutions
            </p>
            <p className="mt-2 text-slate-500 text-sm leading-relaxed">
              Engineered for precision.<br />
              Built for enterprise scale.
            </p>
            <div className="flex gap-2.5 mt-5">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.08] hover:border-white/[0.22] text-slate-500 hover:text-slate-300 transition-all duration-150"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest mb-3.5">
                {heading}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-100"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} AI-Solutions. All rights reserved.
          </p>
          <a
            href="mailto:ai.solution@gmail.com"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            ai.solution@gmail.com
          </a>
        </div>

      </div>
    </footer>
  );
}