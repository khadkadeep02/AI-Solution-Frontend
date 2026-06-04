// AdminPage.jsx  (updated — now connects to AdminCrudPage via React Router)
// Each dashboard card links to /admin/dashboard/:endpoint
// AdminCrudPage reads the :endpoint param and looks up the schema automatically.

import { useState, useEffect } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import adminApi from "../api/adminApi";
import AdminCrudPage from "../components/admin/AdminCrudPage";
import AdminHeader from "../components/admin/AdminHeader";
import {
  Settings,
  LayoutGrid,
  Calendar,
  Users,
  Images,
  Milestone,
} from "lucide-react";

const sections = [
  {
    name: "Services",
    endpoint: "services",
    icon: Settings,
    color: "purple",
    desc: "Manage offered services and descriptions",
  },
  {
    name: "Projects",
    endpoint: "projects",
    icon: LayoutGrid,
    color: "teal",
    desc: "Add, edit, and archive project listings",
  },
  {
    name: "Events",
    endpoint: "events",
    icon: Calendar,
    color: "amber",
    desc: "Schedule and publish upcoming events",
  },
  {
    name: "Team Members",
    endpoint: "team-members",
    icon: Users,
    color: "coral",
    desc: "Update profiles, roles, and bios",
  },
  {
    name: "Gallery",
    endpoint: "gallery",
    icon: Images,
    color: "pink",
    desc: "Upload and organise media assets",
  },
  {
    name: "Timeline",
    endpoint: "timeline",
    icon: Milestone,
    color: "gray",
    desc: "Edit milestones and company history",
  }
];

const colorMap = {
  purple: { bg: "#1e1a38", text: "#AFA9EC" },
  teal:   { bg: "#0d2820", text: "#5DCAA5" },
  amber:  { bg: "#2a1e08", text: "#EF9F27" },
  blue:   { bg: "#0e1e30", text: "#85B7EB" },
  coral:  { bg: "#2a150e", text: "#F0997B" },
  pink:   { bg: "#28101c", text: "#ED93B1" },
  gray:   { bg: "#1e1e1c", text: "#B4B2A9" },
  green:  { bg: "#152010", text: "#97C459" },
};

// ─── Dashboard home ────────────────────────────────────────────────────────────
function DashboardHome() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    // Fetch counts for each section
    const fetchCounts = async () => {
      const newCounts = {};
      for (const section of sections) {
        try {
          const response = await adminApi.get(`/${section.endpoint}/`);
          newCounts[section.endpoint] = Array.isArray(response.data) ? response.data.length : 0;
        } catch (error) {
          console.error(`Failed to fetch ${section.endpoint}:`, error);
          newCounts[section.endpoint] = 0;
        }
      }
      setCounts(newCounts);
    };

    fetchCounts();
  }, []);

  return (
    <>
      <AdminHeader />
      <div style={{ padding: "2rem 1.5rem", background: "#0f0f0f", minHeight: "100vh" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: 22, fontWeight: 500, color: "#f0f0ee", letterSpacing: "-0.3px", marginBottom: 8 }}>
            Admin Dashboard
          </h1>
          <p style={{ fontSize: 14, color: "#666" }}>
            Manage website content, team members, projects, events and more.
          </p>
        </div>
        {/* Section grid */}
        <div style={{ fontSize: 11, fontWeight: 500, color: "#444", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "1rem" }}>
          Content sections
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {sections.map((s) => {
            const c = colorMap[s.color];
            const Icon = s.icon;

            return (
              <Link
                key={s.name}
                to={`/admin/dashboard/${s.endpoint}`}
                style={{
                  background: "#161616",
                  border: "0.5px solid #242424",
                  borderRadius: 12,
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: c.bg,
                      color: c.text,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </div>

                  {"badge" in s && s.badge && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: "#2a1e08",
                        color: "#EF9F27",
                      }}
                    >
                      {s.badge}
                    </span>
                  )}

                  {counts[s.endpoint] !== undefined && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        padding: "4px 10px",
                        borderRadius: 6,
                        background: "#1a2a1a",
                        color: "#97C459",
                      }}
                    >
                      {counts[s.endpoint]} item{counts[s.endpoint] !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#d8d8d4",
                    }}
                  >
                    {s.name}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#555",
                      lineHeight: 1.45,
                      marginTop: 2,
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── Route wrapper that reads :endpoint from URL ───────────────────────────────
function CrudRoute() {
  const { endpoint = "" } = useParams();
  return <AdminCrudPage endpoint={endpoint} />;
}

// ─── Root export: wrap this in your Router ─────────────────────────────────────
// Usage in App.tsx:
//   <Route path="/admin/dashboard/*" element={<AdminPage />} />
export default function AdminPage() {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path=":endpoint" element={<CrudRoute />} />
    </Routes>
  );
}
