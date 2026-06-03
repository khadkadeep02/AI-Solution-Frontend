import { NavLink, useNavigate } from "react-router-dom";

const links = [
  {
    label: "Services",
    path: "/services",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Company",
    path: "/company",
  },
  {
    label:"Event",
    path:"/events"
  },
  {
    label:"Testimonials",
    path:"/testimonials"
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

export default function Header() {
    const navigate = useNavigate()
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-slate-800 bg-[#0b1326]">

      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">

        <div className="flex items-center gap-3"
            onClick={()=>{
                navigate("/")
            }}
        >

          <h2 className="font-bold text-blue-300 text-xl">
            AI-Solutions
          </h2>
        </div>

        <nav className="hidden md:flex gap-8">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 border-b-2 border-blue-400 pb-1"
                  : "text-slate-300 hover:text-blue-400"
              }
            >
              {link.label}
            </NavLink>
          ))}

        </nav>

      </div>
    </header>
  );
}