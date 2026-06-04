import AdminHeader from "../components/admin/AdminHeader";

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f0f0f" }}>
      <AdminHeader />
      <div style={{ flex: 1, overflow: "auto" }}>
        {children}
      </div>
    </div>
  );
}
