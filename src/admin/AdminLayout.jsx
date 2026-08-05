import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Admin.css";

function AdminLayout({ currentTab, setCurrentTab, children, onGoToPortfolio }) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "projects", label: "Manage Projects", icon: "🚀" },
    { id: "certificates", label: "Manage Certificates", icon: "📜" },
    { id: "skills", label: "Manage Skills", icon: "⚡" },
    { id: "education", label: "Manage Education", icon: "🎓" },
    { id: "experience", label: "Manage Experience", icon: "💼" },
    { id: "profile", label: "Manage Profile", icon: "👤" },
  ];

  return (
    <div className="admin-shell">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <div className="admin-brand-icon">P</div>
          <div>
            <div className="admin-sidebar-title">Portfolio CMS</div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Admin Control Center</div>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`admin-nav-item ${currentTab === item.id ? "active" : ""}`}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileOpen(false);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button
            className="admin-nav-item"
            onClick={onGoToPortfolio}
            style={{ marginBottom: "0.75rem", background: "rgba(99, 102, 241, 0.1)", color: "#a5b4fc" }}
          >
            <span>🌐</span>
            <span>View Live Portfolio</span>
          </button>
          <div className="admin-user-pill">
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: "600" }}>{user?.username || "Admin"}</div>
              <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Administrator</div>
            </div>
            <button
              onClick={logout}
              title="Logout"
              style={{
                background: "none",
                border: "none",
                color: "#ef4444",
                cursor: "pointer",
                fontSize: "1.1rem",
              }}
            >
              🚪
            </button>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
                display: "block",
              }}
              className="admin-mobile-toggle"
            >
              ☰
            </button>
            <h1 className="admin-page-title">
              {navItems.find((n) => n.id === currentTab)?.label || "Admin Panel"}
            </h1>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button className="btn-secondary" onClick={onGoToPortfolio}>
              🌐 Back to Site
            </button>
          </div>
        </header>

        <div className="admin-content-view">{children}</div>
      </main>
    </div>
  );
}

export default AdminLayout;
