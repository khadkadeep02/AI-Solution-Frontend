// DynamicFormModal.jsx
// Renders Add / Edit modal by reading a ModelSchema.
// Supports: text, textarea, number, boolean, image, url, email, select, datetime, json-tags

import { Check, Loader2, Pencil, Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Shared dark tokens ───────────────────────────────────────────────────────
const t = {
  bg:          "#0f0f0f",
  surface:     "#161616",
  surface2:    "#1a1a1a",
  border:      "#2a2a2a",
  borderHover: "#3a3a3a",
  text:        "#f0f0ee",
  textMuted:   "#888",
  textDim:     "#555",
  purple:      "#AFA9EC",
  purpleBg:    "#1e1a38",
  purpleBdr:   "#3a3460",
  red:         "#F09595",
  redBg:       "#2a1010",
  redBdr:      "#7a3030",
  amber:       "#EF9F27",
  amberBg:     "#2a1e08",
  teal:        "#5DCAA5",
};

const inputBase = {
  width: "100%",
  background: t.surface2,
  border: `0.5px solid ${t.border}`,
  borderRadius: 8,
  color: t.text,
  fontSize: 13,
  outline: "none",
  transition: "border-color 0.15s",
  fontFamily: "inherit",
};

// ─── Tag input for json-tags ──────────────────────────────────────────────────
function TagInput({ value, onChange }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const tag = input.trim();
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setInput("");
  };

  return (
    <div>
      <div
        style={{
          ...inputBase,
          padding: "6px 8px",
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          minHeight: 38,
          cursor: "text",
        }}
      >
        {value.map((tag) => (
          <span
            key={tag}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              borderRadius: 6,
              background: t.purpleBg,
              color: t.purple,
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((x) => x !== tag))}
              style={{
                background: "none",
                border: "none",
                color: t.purple,
                cursor: "pointer",
                padding: 0,
                lineHeight: 1,
                fontSize: 14,
              }}
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); addTag(); }
            if (e.key === "Backspace" && !input && value.length)
              onChange(value.slice(0, -1));
          }}
          style={{
            background: "none",
            border: "none",
            outline: "none",
            color: t.text,
            fontSize: 13,
            minWidth: 120,
            flex: 1,
          }}
          placeholder={value.length ? "" : "Type and press Enter…"}
        />
      </div>
    </div>
  );
}

// ─── Image upload field ───────────────────────────────────────────────────────
function ImageField({
  value,
  onChange,
}) {
  const ref = useRef(null);
  const preview =
    value instanceof File
      ? URL.createObjectURL(value)
      : typeof value === "string"
      ? value
      : null;

  return (
    <div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      {preview ? (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={preview}
            alt="preview"
            onClick={() => ref.current?.click()}
            style={{
              height: 80,
              cursor: "pointer",
              borderRadius: 8,
              border: `0.5px solid ${t.border}`,
              objectFit: "cover",
            }}
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: t.redBg,
              border: `0.5px solid ${t.redBdr}`,
              color: t.red,
              cursor: "pointer",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          style={{
            ...inputBase,
            padding: "10px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: t.textMuted,
            textAlign: "left",
          }}
        >
          <Upload size={16} aria-hidden="true" />
          <span style={{ fontSize: 13 }}>Click to upload image</span>
        </button>
      )}
    </div>
  );
}

// ─── Single field renderer ────────────────────────────────────────────────────
function FormField({ field, value, onChange }) {
  const focusStyle = (e) => (e.target.style.borderColor = t.borderHover);
  const blurStyle = (e) => (e.target.style.borderColor = t.border);

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          onFocus={focusStyle}
          onBlur={blurStyle}
          rows={3}
          placeholder={field.placeholder}
          style={{ ...inputBase, padding: "8px 12px", resize: "vertical", minHeight: 80 }}
        />
      );

    case "boolean":
      return (
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div
            onClick={() => onChange(!value)}
            style={{
              width: 36,
              height: 20,
              borderRadius: 10,
              background: value ? t.purpleBg : t.surface2,
              border: `0.5px solid ${value ? t.purpleBdr : t.border}`,
              position: "relative",
              transition: "background 0.2s, border-color 0.2s",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: value ? 18 : 3,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: value ? t.purple : t.textDim,
                transition: "left 0.2s, background 0.2s",
              }}
            />
          </div>
          <span style={{ fontSize: 13, color: value ? t.purple : t.textMuted }}>
            {value ? "Yes" : "No"}
          </span>
        </label>
      );

    case "select":
      return (
        <select
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          onFocus={focusStyle}
          onBlur={blurStyle}
          style={{
            ...inputBase,
            padding: "8px 12px",
            height: 38,
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            paddingRight: 32,
          }}
        >
          <option value="" disabled>Select…</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      );

    case "image":
      return <ImageField value={value} onChange={onChange} />;

    case "json-tags":
      return <TagInput value={Array.isArray(value) ? value : []} onChange={onChange} />;

    default:
      // text, number, url, email, datetime
      return (
        <input
          type={
            field.type === "datetime"
              ? "datetime-local"
              : field.type === "number"
              ? "number"
              : field.type === "email"
              ? "email"
              : field.type === "url"
              ? "url"
              : "text"
          }
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          onFocus={focusStyle}
          onBlur={blurStyle}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          style={{ ...inputBase, padding: "8px 12px", height: 38 }}
        />
      );
  }
}

// ─── Modal ────────────────────────────────────────────────────────────────────
export function DynamicFormModal({ schema, mode, initialData, onClose, onSubmit }) {
    const initialValues = {};
    schema.fields.forEach((f) => {
      initialValues[f.name] =
        initialData?.[f.name] ??
        (f.type === "boolean" ? false : f.type === "json-tags" ? [] : "");
    });

    const [values, setValues] = useState(initialValues);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = () => {
    const errs = {};
    schema.fields.forEach((f) => {
      if (f.required) {
        const v = values[f.name];
        if (
          v === null ||
          v === undefined ||
          v === "" ||
          (Array.isArray(v) && v.length === 0 && f.type !== "json-tags")
        ) {
          errs[f.name] = `${f.label} is required`;
        }
      }
    });
    return errs;
  };

const handleSubmit = async () => {
  const errs = validate();

  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setSaving(true);

  try {
    const changedValues = {};

    schema.fields.forEach((f) => {
      const current = values[f.name];
      const original = initialValues[f.name];

      if (current instanceof File) {
        changedValues[f.name] = current;
        return;
      }

      if (
        JSON.stringify(current) !==
        JSON.stringify(original)
      ) {
        changedValues[f.name] = current;
      }
    });

    const payload =
      mode === "edit"
        ? changedValues
        : values;

    const hasFile = Object.values(payload).some(
      (v) => v instanceof File
    );

    if (hasFile) {
      const fd = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        if (value instanceof File) {
          fd.append(key, value);
        } else if (Array.isArray(value)) {
          fd.append(key, JSON.stringify(value));
        } else if (typeof value === "boolean") {
          fd.append(key, value ? "true" : "false");
        } else if (
          value !== null &&
          value !== undefined &&
          value !== ""
        ) {
          fd.append(key, String(value));
        }
      });

      await onSubmit(fd);
    } else {
      await onSubmit(payload);
    }

    onClose();
  } finally {
    setSaving(false);
  }
};
  const set = (name, val) => {
    setValues((prev) => ({ ...prev, [name]: val }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const title = mode === "add" ? `Add ${schema.title.replace(/s$/, "")}` : `Edit ${schema.title.replace(/s$/, "")}`;

  // Split fields into two columns where sensible
  const leftFields  = schema.fields.filter((_, i) => i % 2 === 0);
  const rightFields = schema.fields.filter((_, i) => i % 2 === 1);
  const useColumns  = schema.fields.length >= 4;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        padding: "2rem 1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.surface,
          border: `0.5px solid ${t.border}`,
          borderRadius: 16,
          width: "100%",
          maxWidth: useColumns ? 760 : 480,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: `0.5px solid ${t.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: t.purpleBg,
                border: `0.5px solid ${t.purpleBdr}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: t.purple,
                fontSize: 14,
              }}
            >
              {mode === "add" ? (
                  <Plus size={16} aria-hidden="true" />
                ) : (
                  <Pencil size={16} aria-hidden="true" />
                )}
            </div>
            <span style={{ fontSize: 15, fontWeight: 500, color: t.text }}>{title}</span>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: t.surface2,
              border: `0.5px solid ${t.border}`,
              color: t.textMuted,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
            }}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.5rem", overflowY: "auto", maxHeight: "calc(85vh - 130px)" }}>
          {useColumns ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.5rem" }}>
              {schema.fields.map((field) => (
                <div
                  key={field.name}
                  style={{
                    marginBottom: "1.25rem",
                    gridColumn:
                      field.type === "textarea" || field.type === "json-tags"
                        ? "1 / -1"
                        : undefined,
                  }}
                >
                  <FieldLabel field={field} error={errors[field.name]} />
                  <FormField field={field} value={values[field.name]} onChange={(v) => set(field.name, v)} />
                  {field.hint && !errors[field.name] && (
                    <p style={{ fontSize: 11, color: t.textDim, marginTop: 4 }}>{field.hint}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            schema.fields.map((field) => (
              <div key={field.name} style={{ marginBottom: "1.25rem" }}>
                <FieldLabel field={field} error={errors[field.name]} />
                <FormField field={field} value={values[field.name]} onChange={(v) => set(field.name, v)} />
                {field.hint && !errors[field.name] && (
                  <p style={{ fontSize: 11, color: t.textDim, marginTop: 4 }}>{field.hint}</p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            padding: "1rem 1.5rem",
            borderTop: `0.5px solid ${t.border}`,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "0 16px",
              height: 34,
              borderRadius: 8,
              background: t.surface2,
              border: `0.5px solid ${t.border}`,
              color: t.textMuted,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{
              padding: "0 18px",
              height: 34,
              borderRadius: 8,
              background: saving ? t.purpleBg : t.purpleBg,
              border: `0.5px solid ${t.purpleBdr}`,
              color: saving ? t.textDim : t.purple,
              fontSize: 13,
              fontWeight: 500,
              cursor: saving ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >

            {saving ? (
              <>
                <Loader2
                  size={14}
                  style={{ animation: "spin 1s linear infinite" }}
                  aria-hidden="true"
                />
                Saving…
              </>
            ) : (
              <>
                {mode === "add" ? (
                  <Plus size={14} aria-hidden="true" />
                ) : (
                  <Check size={14} aria-hidden="true" />
                )}
                {mode === "add" ? "Create" : "Save changes"}
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}

function FieldLabel({ field, error }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: 12,
        fontWeight: 500,
        color: error ? "#F09595" : "#888",
        marginBottom: 6,
        letterSpacing: "0.3px",
      }}
    >
      {field.label}
      {field.required && (
        <span style={{ color: "#F09595", marginLeft: 3 }}>*</span>
      )}
      {error && (
        <span style={{ fontWeight: 400, marginLeft: 8, color: "#F09595" }}>
          — {error}
        </span>
      )}
    </label>
  );
}