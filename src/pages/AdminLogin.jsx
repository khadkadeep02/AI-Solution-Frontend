import { useEffect, useState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ensureAdminAccessToken, loginAdmin } from "../api/adminApi";

const t = {
  bg: "#0f0f0f",
  surface: "#161616",
  surface2: "#1a1a1a",
  border: "#2a2a2a",
  text: "#f0f0ee",
  textMid: "#d8d8d4",
  textMuted: "#888",
  textDim: "#555",
  purple: "#AFA9EC",
  purpleBg: "#1e1a38",
  purpleBdr: "#3a3460",
  red: "#F09595",
  redBg: "#2a1010",
  redBdr: "#7a3030",
};

function getErrorMessage(error) {
  const data = error.response?.data;

  if (typeof data?.detail === "string") return data.detail;
  if (typeof data?.non_field_errors?.[0] === "string") return data.non_field_errors[0];
  if (typeof data?.username?.[0] === "string") return data.username[0];
  if (typeof data?.password?.[0] === "string") return data.password[0];
  if (error.message) return error.message;

  return "Unable to sign in with those admin credentials.";
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const redirectIfLoggedIn = async () => {
      const token = await ensureAdminAccessToken().catch(() => "");

      if (active && token) {
        navigate(from, { replace: true });
      }
    };

    redirectIfLoggedIn();

    return () => {
      active = false;
    };
  }, [from, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginAdmin(username, password);
      navigate(from, { replace: true });
    } catch (loginError) {
      setError(getErrorMessage(loginError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        display: "grid",
        placeItems: "center",
        padding: "2rem 1rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          background: t.surface,
          border: `0.5px solid ${t.border}`,
          borderRadius: 16,
          padding: "1.5rem",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.5rem" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: t.purpleBg,
              border: `0.5px solid ${t.purpleBdr}`,
              color: t.purple,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LockKeyhole size={18} />
          </div>
          <div>
            <h1 style={{ fontSize: 22, color: t.text, margin: 0, fontWeight: 600 }}>
              Admin Login
            </h1>
            <p style={{ fontSize: 13, color: t.textMuted, marginTop: 2 }}>
              Staff and superuser access only.
            </p>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: t.redBg,
              border: `0.5px solid ${t.redBdr}`,
              color: t.red,
              borderRadius: 8,
              padding: "0.75rem",
              fontSize: 13,
              marginBottom: "1rem",
            }}
          >
            {error}
          </div>
        )}

        <label style={labelStyle}>
          Username
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            style={inputStyle}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            height: 38,
            borderRadius: 8,
            border: `0.5px solid ${t.purpleBdr}`,
            background: t.purpleBg,
            color: loading ? t.textDim : t.purple,
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <LogIn size={15} />
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}

const labelStyle = {
  display: "block",
  color: t.textMid,
  fontSize: 12,
  fontWeight: 500,
  marginBottom: "1rem",
};

const inputStyle = {
  width: "100%",
  height: 38,
  marginTop: 6,
  background: t.surface2,
  border: `0.5px solid ${t.border}`,
  borderRadius: 8,
  color: t.text,
  fontSize: 13,
  outline: "none",
  padding: "0 12px",
  boxSizing: "border-box",
};
