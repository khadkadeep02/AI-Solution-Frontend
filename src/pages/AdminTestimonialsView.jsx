import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
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
  amber:    "#EF9F27",
  purple:   "#AFA9EC",
};

export default function AdminTestimonialsView() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        const res = await adminApi.get("/testimonials/");
        setTestimonials(Array.isArray(res.data) ? res.data : []);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const filtered = ratingFilter === 0 
    ? testimonials 
    : testimonials.filter(t => t.rating === ratingFilter);

  return (
    <>
      <AdminHeader />
      <div style={{ padding: "2rem 1.5rem", background: t.bg, minHeight: "100vh" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, color: t.text, marginBottom: 8 }}>
            Client Testimonials
          </h1>
          <p style={{ fontSize: 14, color: t.textMuted }}>
            {filtered.length} testimonials
          </p>
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: "2rem", alignItems: "center" }}>
          <Filter size={16} color={t.textMuted} />
          <span style={{ fontSize: 12, color: t.textMuted }}>Filter by rating:</span>
          <div style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setRatingFilter(rating)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 6,
                  background: ratingFilter === rating ? t.surface2 : t.surface,
                  border: `0.5px solid ${ratingFilter === rating ? t.border : t.border2}`,
                  color: ratingFilter === rating ? t.purple : t.textMuted,
                  fontSize: 12,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {rating === 0 ? "All" : `${rating}★`}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 16 }}>
          {loading ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: t.textMuted }}>
              Loading testimonials…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: t.textMuted }}>
              No testimonials found
            </div>
          ) : (
            filtered.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div
      style={{
        background: t.surface,
        border: `0.5px solid ${t.border2}`,
        borderRadius: 12,
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Header: Photo + Name */}
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {testimonial.image && (
          <img
            src={testimonial.image}
            alt={testimonial.client_name}
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        )}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: t.text }}>
            {testimonial.client_name}
          </div>
          <div style={{ fontSize: 12, color: t.textMuted }}>
            {testimonial.designation} • {testimonial.company}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div style={{ display: "flex", gap: 2 }}>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            style={{
              color: i < testimonial.rating ? t.amber : t.textDim,
              fontSize: 14,
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review */}
      <div
        style={{
          fontSize: 13,
          color: t.textMid,
          lineHeight: 1.6,
          flex: 1,
          fontStyle: "italic",
        }}
      >
        "{testimonial.review}"
      </div>

      {/* Featured badge */}
      {testimonial.featured && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 8px",
            borderRadius: 6,
            background: "#152010",
            color: "#5DCAA5",
            fontSize: 11,
            fontWeight: 500,
            width: "fit-content",
          }}
        >
          ✓ Featured
        </div>
      )}
    </div>
  );
}
