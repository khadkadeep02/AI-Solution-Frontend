import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";

const links = [
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Company", path: "/company" },
  { label: "Events", path: "/events" },
  { label: "Testimonials", path: "/testimonials" },
];

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  const handleNav = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-800/80 bg-[#080f1f]/95 shadow-lg shadow-black/20 backdrop-blur-md"
            : "border-b border-transparent bg-[#080f1f]"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <button
            onClick={() => handleNav("/")}
            className="flex items-center gap-2 outline-none"
            aria-label="Go to homepage"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 ring-1 ring-blue-500/30">
              <Sparkles size={15} className="text-blue-400" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              AI<span className="text-blue-400">Solutions</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-1.5 text-[13.5px] font-medium transition-colors ${
                    isActive
                      ? "bg-blue-500/10 text-blue-400"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav("/contact")}
              className="hidden rounded-lg bg-blue-500 px-4 py-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90 md:block"
            >
              Get in touch
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200 md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>

        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-slate-800 bg-[#080f1f] px-4 pb-4 pt-2 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-500/10 text-blue-400"
                        : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <button
                onClick={() => handleNav("/contact")}
                className="mt-2 rounded-lg bg-blue-500 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Get in touch
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer so page content clears the fixed header */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}