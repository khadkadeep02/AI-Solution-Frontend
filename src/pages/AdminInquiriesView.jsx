import { useEffect, useState } from "react";
import { Mail, Filter, Phone, MapPin } from "lucide-react";
import AdminHeader from "../components/admin/AdminHeader";
import adminApi from "../api/adminApi";

const t = {
  bg:       "#0f0f0f",
  surface:  "#161616",
  surface2: "#1a1a1a",
  border:   "#242424",
  border2:  "#2a2a2a",
  text:     "#f0f0ee",
  textMid:  "#d8d8d4",
  textMuted:"#888",
  textDim:  "#555",
};

const statusColors = {
  NEW:         { bg: "#0e1e30", color: "#85B7EB", border: "#1a3a5a" },
  IN_PROGRESS: { bg: "#2a1e08", color: "#EF9F27", border: "#4a3a18" },
  COMPLETED:   { bg: "#152010", color: "#5DCAA5", border: "#1a4030" },
};

export default function AdminInquiriesView() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      try {
        const res = await adminApi.get("/inquiries/");
        setInquiries(Array.isArray(res.data) ? res.data : []);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  const filtered = statusFilter === "all"
    ? inquiries
    : inquiries.filter(i => i.status === statusFilter);

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      await adminApi.patch(`/inquiries/${inquiryId}/`, { status: newStatus });
      // Update local state
      const updated = inquiries.map(i =>
        i.id === inquiryId ? { ...i, status: newStatus } : i
      );
      setInquiries(updated);
      setSelectedInquiry(updated.find(i => i.id === inquiryId));
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div style={{ padding: "2rem 1.5rem", background: t.bg, minHeight: "100vh" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: t.text, marginBottom: 8 }}>
            User Inquiries
          </h1>
          <p style={{ fontSize: 14, color: t.textMuted }}>
            {filtered.length} inquiries{statusFilter !== "all" && ` (${statusFilter.toLowerCase()})`}
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: "2rem", alignItems: "center" }}>
          <Filter size={16} color={t.textMuted} />
          <span style={{ fontSize: 12, color: t.textMuted }}>Filter by status:</span>
          <div style={{ display: "flex", gap: 8 }}>
            {["all", "NEW", "IN_PROGRESS", "COMPLETED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 6,
                  background: statusFilter === status ? t.surface2 : t.surface,
                  border: `0.5px solid ${statusFilter === status ? t.border : t.border2}`,
                  color: statusFilter === status ? "#AFA9EC" : t.textMuted,
                  fontSize: 12,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {status === "all" ? "All" : status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Inquiries List */}
          <div style={{ border: `0.5px solid ${t.border}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{
              padding: "1rem 1.5rem",
              borderBottom: `0.5px solid ${t.border2}`,
              background: "#131313",
              fontWeight: 500,
              fontSize: 12,
              color: t.textDim,
              textTransform: "uppercase",
            }}>
              Inquiries ({filtered.length})
            </div>
            <div style={{ maxHeight: "calc(100vh - 300px)", overflowY: "auto" }}>
              {loading ? (
                <div style={{ padding: "2rem", textAlign: "center", color: t.textMuted }}>
                  Loading…
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: "2rem", textAlign: "center", color: t.textMuted }}>
                  No inquiries found
                </div>
              ) : (
                filtered.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    onClick={() => setSelectedInquiry(inquiry)}
                    style={{
                      padding: "1rem 1.5rem",
                      borderBottom: `0.5px solid ${t.border2}`,
                      cursor: "pointer",
                      background: selectedInquiry?.id === inquiry.id ? t.surface2 : "transparent",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedInquiry?.id !== inquiry.id) {
                        e.currentTarget.style.background = t.surface;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedInquiry?.id !== inquiry.id) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: t.text, marginBottom: 4 }}>
                          {inquiry.full_name}
                        </div>
                        <div style={{ fontSize: 11, color: t.textMuted }}>
                          {inquiry.company ? `${inquiry.company} • ` : ""}{inquiry.country}
                        </div>
                      </div>
                      <StatusBadge status={inquiry.status} />
                    </div>
                    <div style={{ fontSize: 11, color: t.textDim, lineHeight: 1.4 }}>
                      {inquiry.project_description.substring(0, 80)}…
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Details Panel */}
          {selectedInquiry ? (
            <InquiryDetails inquiry={selectedInquiry} onStatusChange={handleStatusUpdate} />
          ) : (
            <div
              style={{
                border: `0.5px solid ${t.border}`,
                borderRadius: 12,
                padding: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: t.textMuted,
                textAlign: "center",
              }}
            >
              Select an inquiry to view details
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }) {
  const c = statusColors[status] ?? { bg: t.surface2, color: t.textMuted, border: t.border2 };
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: 6,
        background: c.bg,
        color: c.color,
        border: `0.5px solid ${c.border}`,
        whiteSpace: "nowrap",
      }}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function InquiryDetails({ inquiry, onStatusChange }) {
  const statuses = ["NEW", "IN_PROGRESS", "COMPLETED"];
  
  return (
    <div
      style={{
        border: `0.5px solid ${t.border}`,
        borderRadius: 12,
        background: t.surface,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1.5rem",
          borderBottom: `0.5px solid ${t.border2}`,
          background: "#131313",
        }}
      >
        <div style={{ fontSize: 16, fontWeight: 600, color: t.text, marginBottom: 4 }}>
          {inquiry.full_name}
        </div>
        <div style={{ fontSize: 12, color: t.textMuted }}>
          {inquiry.designation && `${inquiry.designation} • `}{inquiry.company && inquiry.company}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}>
        {/* Contact Info */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 11, color: t.textDim, textTransform: "uppercase", marginBottom: 8, fontWeight: 500 }}>
            Contact Information
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12, color: t.textMid }}>
              <Mail size={14} color={t.textMuted} />
              <a href={`mailto:${inquiry.email}`} style={{ color: "#85B7EB", textDecoration: "none" }}>
                {inquiry.email}
              </a>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12, color: t.textMid }}>
              <Phone size={14} color={t.textMuted} />
              <a href={`tel:${inquiry.phone}`} style={{ color: "#85B7EB", textDecoration: "none" }}>
                {inquiry.phone}
              </a>
            </div>
            {inquiry.country && (
              <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 12, color: t.textMid }}>
                <MapPin size={14} color={t.textMuted} />
                {inquiry.country}
              </div>
            )}
          </div>
        </div>

        {/* Status */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 11, color: t.textDim, textTransform: "uppercase", marginBottom: 8, fontWeight: 500 }}>
            Change Status
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(inquiry.id, status)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 6,
                  background: inquiry.status === status ? statusColors[status].bg : t.surface2,
                  border: `0.5px solid ${inquiry.status === status ? statusColors[status].border : t.border2}`,
                  color: inquiry.status === status ? statusColors[status].color : t.textMuted,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {status.replace("_", " ")}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <StatusBadge status={inquiry.status} />
          </div>
        </div>

        {/* Project Description */}
        <div>
          <div style={{ fontSize: 11, color: t.textDim, textTransform: "uppercase", marginBottom: 8, fontWeight: 500 }}>
            Project Description
          </div>
          <div
            style={{
              fontSize: 13,
              color: t.textMid,
              lineHeight: 1.6,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "#0f0f0f",
              padding: "10px 12px",
              borderRadius: 8,
              border: `0.5px solid ${t.border2}`,
            }}
          >
            {inquiry.project_description}
          </div>
        </div>
      </div>
    </div>
  );
}
