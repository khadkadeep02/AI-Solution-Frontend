import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ensureAdminAccessToken } from "../../api/adminApi";

const t = {
  bg: "#0f0f0f",
  surface: "#161616",
  border: "#2a2a2a",
  text: "#f0f0ee",
  textMuted: "#888",
};

export default function ProtectedAdminRoute({ children }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      try {
        const token = await ensureAdminAccessToken();
        if (active) setAuthenticated(Boolean(token));
      } catch {
        if (active) setAuthenticated(false);
      } finally {
        if (active) setChecking(false);
      }
    };

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  if (checking) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: t.bg,
          display: "grid",
          placeItems: "center",
          color: t.textMuted,
        }}
      >
        <div
          style={{
            background: t.surface,
            border: `0.5px solid ${t.border}`,
            borderRadius: 12,
            padding: "1rem 1.25rem",
            color: t.text,
          }}
        >
          Checking admin session...
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
}
