// AdminCrudPage.jsx
// Dark-theme data table with schema-driven Add/Edit modal.
// Drop-in replacement for the original Bootstrap version.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../api/adminApi";
import { schemaRegistry } from "./modelSchemas";
import { DynamicFormModal } from "./DynamicFormModal";
import AdminHeader from "./AdminHeader";
import {
  ArrowLeft,
  Plus,
  Search,
  Loader2,
  DatabaseZap,
  Pencil,
  Trash2,
  Eye,
  X,
} from "lucide-react";

// ─── Tokens ────────────────────────────────────────────────────────────────────
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
  textHint: "#444",
  purple:   "#AFA9EC",
  purpleBg: "#1e1a38",
  purpleBdr:"#3a3460",
  red:      "#F09595",
  redBg:    "#2a1010",
  redBdr:   "#7a3030",
  blue:     "#85B7EB",
  blueBg:   "#0e1e30",
  blueBdr:  "#1a3a5a",
  amber:    "#EF9F27",
  amberBg:  "#2a1e08",
};

// ─── Status badge (for ContactInquiry) ────────────────────────────────────────
const statusColors = {
  NEW:         { bg: "#0e1e30", color: "#85B7EB", border: "#1a3a5a" },
  IN_PROGRESS: { bg: "#2a1e08", color: "#EF9F27", border: "#4a3a18" },
  COMPLETED:   { bg: "#152010", color: "#5DCAA5", border: "#1a4030" },
};

function StatusBadge({ status }) {
  const c = statusColors[status] ?? { bg: t.surface2, color: t.textMuted, border: t.border2 };
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        padding: "2px 8px",
        borderRadius: 6,
        background: c.bg,
        color: c.color,
        border: `0.5px solid ${c.border}`,
      }}
    >
      {status.replace("_", " ")}
    </span>
  );
}

function ViewModal({ schema, item, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.75)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        zIndex: 100,
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 700,
          maxHeight: "85vh",
          background: "#161616",
          border: "0.5px solid #2a2a2a",
          borderRadius: 16,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "0.5px solid #2a2a2a",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Eye size={16} color="#AFA9EC" />
            <span style={{ color: "#f0f0ee", fontWeight: 500 }}>
              View Details
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: t.surface2,
              border: `0.5px solid ${t.border2}`,
              color: t.textMuted,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content - scrollable */}
        <div
          style={{
            padding: "1.5rem",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {schema.fields.map((field, idx) => {
            const value = item[field.name];

            return (
              <div
                key={field.name}
                style={{
                  marginBottom: idx === schema.fields.length - 1 ? 0 : "1.5rem",
                  paddingBottom: idx === schema.fields.length - 1 ? 0 : "1.5rem",
                  borderBottom: idx === schema.fields.length - 1 ? "none" : "0.5px solid #242424",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    marginBottom: 8,
                    fontWeight: 500,
                  }}
                >
                  {field.label}
                </div>

                {field.type === "image" && value ? (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      maxWidth: 400,
                      height: 250,
                      background: "#0f0f0f",
                      border: "0.5px solid #2a2a2a",
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={value}
                      alt={field.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      color: "#d8d8d4",
                      fontSize: 13,
                      lineHeight: 1.5,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {typeof value === "boolean"
                      ? value
                        ? "Yes"
                        : "No"
                      : Array.isArray(value)
                      ? value.join(", ")
                      : value === null || value === undefined || value === ""
                      ? "—"
                      : String(value)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TableFieldValue({ field, item }) {
  const value = item[field.name];

  if (field.type === "image") {
    return value ? (
      <img
        src={value}
        alt={String(item.name ?? item.title ?? field.label)}
        style={{
          width: 42,
          height: 42,
          borderRadius: 8,
          objectFit: "cover",
          background: t.surface2,
          border: `0.5px solid ${t.border2}`,
        }}
      />
    ) : (
      <span style={{ color: t.textDim }}>—</span>
    );
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return value === null || value === undefined || value === "" ? "—" : String(value);
}
// ─── Delete confirm modal ──────────────────────────────────────────────────────
function DeleteModal({ name, onCancel, onConfirm }) {
  return (
    <div
      onClick={onCancel}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#161616",
          border: `0.5px solid ${t.border2}`,
          borderRadius: 14,
          padding: "1.5rem",
          width: 320,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: t.redBg,
              border: `0.5px solid ${t.redBdr}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: t.red,
              fontSize: 15,
            }}
          >
            <Trash2 size={13} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 500, color: t.text }}>Delete item?</span>
        </div>
        <p style={{ fontSize: 13, color: t.textMuted, marginBottom: "1.5rem", lineHeight: 1.55 }}>
          This will permanently remove{" "}
          <strong style={{ color: t.textMid }}>{name}</strong> from the list. This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "0 14px",
              height: 32,
              borderRadius: 7,
              background: t.surface2,
              border: `0.5px solid ${t.border2}`,
              color: t.textMuted,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "0 14px",
              height: 32,
              borderRadius: 7,
              background: t.redBg,
              border: `0.5px solid ${t.redBdr}`,
              color: t.red,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function AdminCrudPage({ endpoint }) {
  const navigate   = useNavigate();
  const schema     = schemaRegistry[endpoint];
  const [items,    setItems]    = useState([]);
  const [query,    setQuery]    = useState("");
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(null);
  const [editing,  setEditing]  = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [viewing, setViewing] = useState(null);

  const fetchData = async () => {
    if (!schema) return;
    const res = await adminApi.get(`/${endpoint}/`);
    setItems(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    let active = true;

    if (!schema) return undefined;

    const loadData = async () => {
      try {
        const res = await adminApi.get(`/${endpoint}/`);
        if (active) setItems(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);
        if (active) setItems([]);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [endpoint, schema]);

  const displayName = (item) => String(schema?.displayField?.(item) ?? "");
  // Determine which extra columns to show (status, featured, rating, etc.)
  const hasStatus   = schema?.fields.some((f) => f.name === "status") ?? false;
  const hasFeatured = schema?.fields.some((f) => f.name === "featured") ?? false;
  const hasRating   = schema?.fields.some((f) => f.name === "rating") ?? false;
  const tableFields = schema?.tableFields ?? [];
  const tableColumnCount =
    3 +
    tableFields.length +
    (hasStatus ? 1 : 0) +
    (hasFeatured ? 1 : 0) +
    (hasRating ? 1 : 0);

  const filtered = items.filter((item) => {
    const searchText = [
      displayName(item),
      ...tableFields.map((field) => item[field.name]),
    ]
      .filter((value) => value !== null && value !== undefined)
      .join(" ")
      .toLowerCase();

    return searchText.includes(query.toLowerCase());
  });

  const handleSubmit = async (data) => {
    if (modal === "edit" && editing?.id) {
      await adminApi.patch(`/${endpoint}/${editing.id}/`, data, {
        headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
      });
    } else {
      await adminApi.post(`/${endpoint}/`, data, {
        headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
      });
    }
    fetchData();
  };

  const handleDelete = async () => {
    if (!deleting?.id) return;
    await adminApi.delete(`/${endpoint}/${deleting.id}/`);
    setDeleting(null);
    fetchData();
  };

  if (!schema) {
    return (
      <div style={{ padding: "2rem", color: t.red, background: t.bg, minHeight: "100vh" }}>
        No schema found for endpoint: <code>{endpoint}</code>
      </div>
    );
  }

  return (
    <>
      <AdminHeader />
      <div style={{ padding: "2rem 1.5rem", background: t.bg, minHeight: "100vh", fontFamily: "inherit" }}>

        {/* Topbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => navigate("/admin")}
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: t.surface2, border: `0.5px solid ${t.border2}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: t.textDim, fontSize: 15,
              }}
            >
              <ArrowLeft size={16} />
            </button>
            <h2 style={{ fontSize: 20, fontWeight: 500, color: t.text }}>{schema.title}</h2>
          </div>
          <button
            onClick={() => { setEditing(null); setModal("add"); }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "0 14px", height: 34, borderRadius: 8,
              background: t.purpleBg, border: `0.5px solid ${t.purpleBdr}`,
              color: t.purple, fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}
          >
          <Plus size={14} />
          Add new
          </button>
        </div>

        {/* Search bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search
              size={15}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: t.textDim,
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${schema.title.toLowerCase()}…`}
              style={{
                width: "100%", height: 34, background: t.surface,
                border: `0.5px solid ${t.border2}`, borderRadius: 8,
                padding: "0 10px 0 32px", color: t.textMid, fontSize: 13, outline: "none",
                fontFamily: "inherit",
              }}
            />
          </div>
          <span style={{ fontSize: 12, color: t.textDim, whiteSpace: "nowrap" }}>
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table */}
        <div style={{ border: `0.5px solid ${t.border}`, borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#131313" }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name / Title</th>
                {tableFields.map((field) => (
                  <th key={field.name} style={thStyle}>{field.label}</th>
                ))}
                {hasStatus   && <th style={thStyle}>Status</th>}
                {hasFeatured && <th style={thStyle}>Featured</th>}
                {hasRating   && <th style={thStyle}>Rating</th>}
                <th style={{ ...thStyle, width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={tableColumnCount} style={emptyCell}>
                    <span
                      style={{
                        display: "flex",
                        gap: 5,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Loader2
                        size={16}
                        style={{
                          animation: "spin 1s linear infinite",
                        }}
                      />
                      Loading…
                    </span>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={tableColumnCount} style={emptyCell}>
                    <DatabaseZap
                      size={20}
                      style={{
                        display: "block",
                        margin: "0 auto 6px",
                      }}
                    />
                    {query ? "No results match your search" : "No items yet — add one to get started"}
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr
                    key={String(item.id)}
                    style={{
                      borderBottom: idx === filtered.length - 1 ? "none" : `0.5px solid #1e1e1e`,
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = t.surface)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ ...tdStyle, color: t.textHint, fontSize: 12, fontFamily: "monospace" }}>
                      #{String(item.id)}
                    </td>
                    <td style={{ ...tdStyle, color: t.textMid, fontWeight: 500 }}>
                      {displayName(item)}
                    </td>
                    {tableFields.map((field) => (
                      <td key={field.name} style={tdStyle}>
                        <TableFieldValue field={field} item={item} />
                      </td>
                    ))}
                    {hasStatus && (
                      <td style={tdStyle}>
                        <StatusBadge status={String(item.status ?? "")} />
                      </td>
                    )}
                    {hasFeatured && (
                      <td style={tdStyle}>
                        <span
                          style={{
                            fontSize: 11,
                            padding: "2px 8px",
                            borderRadius: 6,
                            background: item.featured ? "#152010" : t.surface2,
                            color: item.featured ? "#5DCAA5" : t.textDim,
                            border: `0.5px solid ${item.featured ? "#1a4030" : t.border2}`,
                          }}
                        >
                          {item.featured ? "Yes" : "No"}
                        </span>
                      </td>
                    )}
                    {hasRating && (
                      <td style={tdStyle}>
                        <span style={{ color: t.amber, fontSize: 13, letterSpacing: 1 }}>
                          {"★".repeat(Number(item.rating ?? 0))}
                          <span style={{ color: t.textDim }}>{"★".repeat(5 - Number(item.rating ?? 0))}</span>
                        </span>
                      </td>
                    )}
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => setViewing(item)}
                          style={viewBtn}
                        >
                          <Eye size={13} />
                          View
                        </button>
                        <button
                          onClick={() => { setEditing(item); setModal("edit"); }}
                          style={editBtn}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = t.blueBdr;
                            e.currentTarget.style.color = t.blue;
                            e.currentTarget.style.background = t.blueBg;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = t.border2;
                            e.currentTarget.style.color = t.textMuted;
                            e.currentTarget.style.background = t.surface2;
                          }}
                        >
                          <Pencil size={13} />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleting(item)}
                          style={delBtn}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = t.redBdr;
                            e.currentTarget.style.color = t.red;
                            e.currentTarget.style.background = t.redBg;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = t.border2;
                            e.currentTarget.style.color = t.textMuted;
                            e.currentTarget.style.background = t.surface2;
                          }}
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        {modal && (
          <DynamicFormModal
            schema={schema}
            mode={modal}
            initialData={modal === "edit" ? editing ?? undefined : undefined}
            onClose={() => { setModal(null); setEditing(null); }}
            onSubmit={handleSubmit}
          />
        )}

        {deleting && (
          <DeleteModal
            name={displayName(deleting)}
            onCancel={() => setDeleting(null)}
            onConfirm={handleDelete}
          />
        )}
        {viewing && (
          <ViewModal
            schema={schema}
            item={viewing}
            onClose={() => setViewing(null)}
          />
        )}

        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </>
  );
}

// ─── Style constants ───────────────────────────────────────────────────────────
const thStyle = {
  padding: "10px 16px",
  fontSize: 11,
  fontWeight: 500,
  color: "#555",
  textTransform: "uppercase",
  letterSpacing: "0.7px",
  borderBottom: "0.5px solid #242424",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px 16px",
  fontSize: 13,
  verticalAlign: "middle",
};

const emptyCell = {
  padding: "3rem",
  textAlign: "center",
  color: "#555",
  fontSize: 14,
};

const editBtn = {
  display: "flex",
  alignItems: "center",
  gap: 5,
  padding: "0 10px",
  height: 28,
  borderRadius: 6,
  background: "#1a1a1a",
  border: "0.5px solid #2a2a2a",
  color: "#888",
  fontSize: 12,
  cursor: "pointer",
  transition: "all 0.15s",
};

const delBtn = {
  ...editBtn,
};

const viewBtn = {
  ...editBtn,
  color: "#85B7EB",
};
