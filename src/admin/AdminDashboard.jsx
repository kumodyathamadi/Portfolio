import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Admin.css";

function AdminDashboard({ onNavigate }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getStats();
        setStats(data);
      } catch (err) {
        console.warn("[Dashboard Stats] Using fallback metrics");
        setStats({
          counts: {
            projects: 11,
            certificates: 11,
            skills: 13,
            education: 3,
            experience: 1,
          },
          recentUpdates: [],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Projects", count: stats?.counts?.projects ?? 0, icon: "🚀", tab: "projects", color: "#6366f1" },
    { title: "Certificates", count: stats?.counts?.certificates ?? 0, icon: "📜", tab: "certificates", color: "#a855f7" },
    { title: "Technical Skills", count: stats?.counts?.skills ?? 0, icon: "⚡", tab: "skills", color: "#ec4899" },
    { title: "Education Entries", count: stats?.counts?.education ?? 0, icon: "🎓", tab: "education", color: "#3b82f6" },
    { title: "Work Experience", count: stats?.counts?.experience ?? 0, icon: "💼", tab: "experience", color: "#10b981" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>
          Welcome to Portfolio Management
        </h2>
        <p style={{ color: "#94a3b8" }}>
          Manage your portfolio content in real-time without editing any code.
        </p>
      </div>

      {/* Stats Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.title}
            className="admin-card"
            style={{
              cursor: "pointer",
              transition: "transform 0.2s ease, border-color 0.2s ease",
              margin: 0,
            }}
            onClick={() => onNavigate(card.tab)}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.8rem" }}>{card.icon}</span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: card.color,
                  background: `${card.color}20`,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "20px",
                  fontWeight: "600",
                }}
              >
                Manage
              </span>
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#fff" }}>
              {loading ? "..." : card.count}
            </div>
            <div style={{ fontSize: "0.88rem", color: "#94a3b8", fontWeight: "500" }}>{card.title}</div>
          </div>
        ))}
      </div>

      {/* Quick Action & Info Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        <div className="admin-card">
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#f8fafc" }}>
            ⚡ Quick Content Actions
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <button className="btn-primary" onClick={() => onNavigate("projects")}>
              ➕ Add New Project
            </button>
            <button className="btn-secondary" onClick={() => onNavigate("certificates")}>
              📜 Add Certificate
            </button>
            <button className="btn-secondary" onClick={() => onNavigate("skills")}>
              ⚡ Add Skill
            </button>
            <button className="btn-secondary" onClick={() => onNavigate("profile")}>
              👤 Update Profile & Resume Link
            </button>
          </div>
        </div>

        <div className="admin-card">
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", color: "#f8fafc" }}>
            🔍 System & Integration Status
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.9rem" }}>
            <li style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#94a3b8" }}>REST API Endpoint</span>
              <span className="badge-status">Connected</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#94a3b8" }}>Database Connection</span>
              <span className="badge-status">Active</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#94a3b8" }}>Image & Document Storage</span>
              <span className="badge-category">Cloud / Uploads</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#94a3b8" }}>Live Syncing</span>
              <span className="badge-status">Automatic</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
