import { useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard } from "lucide-react";
import { clearAdminTokens } from "../../api/adminApi";

const t = {
  bg:       "#0f0f0f",
  surface:  "#161616",
  text:     "#f0f0ee",
  textMuted:"#888",
  purple:   "#AFA9EC",
  purpleBg: "#1e1a38",
  purpleBdr:"#3a3460",
};

export default function AdminHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearAdminTokens();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div style={{
      background: t.surface,
      borderBottom: "0.5px solid #2a2a2a",
      padding: "1rem 1.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      {/* Left: Logo / Brand */}
      <div         onClick={() => navigate("/admin")} className="cursor-pointer"style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: t.purpleBg,
          border: `0.5px solid ${t.purpleBdr}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: t.purple,
        }}

        >
          <LayoutDashboard size={18} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>
            Admin Panel
          </div>
          <div style={{ fontSize: 11, color: t.textMuted }}>
            Content Management
          </div>
        </div>
      </div>

      {/* Center: Navigation */}
      <div style={{ display: "flex", gap: 24, flex: 1, marginLeft: "3rem" }}>
        <NavLink 
          label="Dashboard" 
          onClick={() => navigate("/admin")}
        />
        <NavLink 
          label="View Testimonials" 
          onClick={() => navigate("/admin/testimonials-view")}
        />
        <NavLink 
          label="View Inquiries" 
          onClick={() => navigate("/admin/inquiries-view")}
        />
      </div>

      {/* Right: Logout */}
      <button
        onClick={handleLogout}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "0 14px",
          height: 34,
          borderRadius: 8,
          background: "#2a1010",
          border: "0.5px solid #7a3030",
          color: "#F09595",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        <LogOut size={14} />
        Logout
      </button>
    </div>
  );
}

function NavLink({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        color: t.textMuted,
        fontSize: 13,
        cursor: "pointer",
        padding: 0,
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => (e.target.style.color = t.purple)}
      onMouseLeave={(e) => (e.target.style.color = t.textMuted)}
    >
      {label}
    </button>
  );
}
