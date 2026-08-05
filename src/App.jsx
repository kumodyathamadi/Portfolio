import React, { useState, useEffect } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Skills from "./Components/Skills/Skills";
import Work from "./Components/Work/Work";
import Education from "./Components/Education/Education";
import MyWork from "./Components/MyWork/MyWork";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import SEO from "./Components/SEO/SEO";

import { AuthProvider, useAuth } from "./context/AuthContext";
// import AdminLogin removed - admin access no login
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import ManageProjects from "./admin/ManageProjects";
import ManageCertificates from "./admin/ManageCertificates";
import ManageSkills from "./admin/ManageSkills";
import ManageEducation from "./admin/ManageEducation";
import ManageExperience from "./admin/ManageExperience";
import ManageProfile from "./admin/ManageProfile";

const MainContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [view, setView] = useState(() => {
    return window.location.pathname.startsWith("/admin") ? "admin" : "portfolio";
  });
  const [adminTab, setAdminTab] = useState("dashboard");

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith("/admin")) {
        setView("admin");
      } else {
        setView("portfolio");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateToAdmin = () => {
    // Open admin dashboard on a separate dev server (port 5174)
    window.location.href = "http://localhost:5174/admin";
  };

  const navigateToPortfolio = () => {
    window.history.pushState({}, "", "/");
    setView("portfolio");
  };

  if (view === "admin") {
    if (loading) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b0f19", color: "#94a3b8" }}>
          Checking admin authentication...
        </div>
      );
    }

    // Authentication bypassed - admin access without login

    const renderAdminTabContent = () => {
      switch (adminTab) {
        case "dashboard":
          return <AdminDashboard onNavigate={(tab) => setAdminTab(tab)} />;
        case "projects":
          return <ManageProjects />;
        case "certificates":
          return <ManageCertificates />;
        case "skills":
          return <ManageSkills />;
        case "education":
          return <ManageEducation />;
        case "experience":
          return <ManageExperience />;
        case "profile":
          return <ManageProfile />;
        default:
          return <AdminDashboard onNavigate={(tab) => setAdminTab(tab)} />;
      }
    };

    return (
      <AdminLayout
        currentTab={adminTab}
        setCurrentTab={setAdminTab}
        onGoToPortfolio={navigateToPortfolio}
      >
        <SEO title={`Admin CMS - ${adminTab.toUpperCase()}`} description="Portfolio Management System Admin Panel" />
        {renderAdminTabContent()}
      </AdminLayout>
    );
  }

  return (
    <div className="app-shell">
      <SEO
        title="Kumodya Thamadi - Full-Stack Developer Portfolio"
        description="Dynamic personal portfolio showcasing software projects, certifications, technical skills, education, and experience."
      />
      <div className="app-bg" aria-hidden>
        <div className="app-bg-orb app-bg-orb--a" />
        <div className="app-bg-orb app-bg-orb--b" />
        <div className="app-bg-grid" />
      </div>

      <NavBar onOpenAdmin={navigateToAdmin} />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Education />
      <MyWork />
      <Contact />
      <Footer />

      {/* Floating Admin Button */}

    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
};

export default App;
