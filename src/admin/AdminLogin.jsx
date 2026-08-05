import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Admin.css";

function AdminLogin({ onBackToSite }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || "Invalid credentials. (Default: admin / admin123)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top right, #1e1b4b, #0b0f19 80%)",
        padding: "1.5rem",
      }}
    >
      <div
        className="admin-card"
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "2.5rem 2rem",
          background: "rgba(15, 23, 42, 0.85)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            className="admin-brand-icon"
            style={{ margin: "0 auto 1rem auto", width: "50px", height: "50px", fontSize: "1.5rem" }}
          >
            🔒
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#f8fafc" }}>Admin Login</h2>
          <p style={{ fontSize: "0.88rem", color: "#94a3b8", marginTop: "0.25rem" }}>
            Enter your portfolio management credentials
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "10px",
              color: "#fca5a5",
              fontSize: "0.88rem",
              marginBottom: "1.25rem",
              textAlign: "center",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", padding: "0.85rem", marginTop: "0.5rem" }}
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <button
            onClick={onBackToSite}
            style={{
              background: "none",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: "0.88rem",
            }}
          >
            ← Return to Portfolio Website
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
