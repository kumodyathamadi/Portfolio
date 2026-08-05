import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Admin.css";

function ManageExperience() {
  const [expList, setExpList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    duration: "",
    summary: "",
    responsibilities: "",
    technologies: "",
  });

  const loadExp = async () => {
    setLoading(true);
    try {
      const data = await api.getExperience();
      setExpList(data);
    } catch (err) {
      console.error("[Load Exp]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExp();
  }, []);

  const handleOpenModal = (exp = null) => {
    if (exp) {
      setEditingId(exp._id);
      setFormData({
        company: exp.company || "",
        position: exp.position || "",
        duration: exp.duration || "",
        summary: exp.summary || "",
        responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities.join("\n") : "",
        technologies: Array.isArray(exp.technologies) ? exp.technologies.join(", ") : "",
      });
    } else {
      setEditingId(null);
      setFormData({
        company: "",
        position: "",
        duration: "",
        summary: "",
        responsibilities: "",
        technologies: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      responsibilities: formData.responsibilities
        ? formData.responsibilities.split("\n").map((r) => r.trim()).filter(Boolean)
        : [],
      technologies: formData.technologies
        ? formData.technologies.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };

    try {
      if (editingId) {
        await api.updateExperience(editingId, payload);
      } else {
        await api.createExperience(payload);
      }
      setIsModalOpen(false);
      loadExp();
    } catch (err) {
      alert("Failed to save experience entry: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience entry?")) return;
    try {
      await api.deleteExperience(id);
      loadExp();
    } catch (err) {
      alert("Failed to delete experience entry: " + err.message);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700" }}>Manage Experience</h2>
          <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>Add, edit, or remove professional work experience & internships</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          💼 Add Work Experience
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>Loading experience records...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Company</th>
                <th>Duration</th>
                <th>Technologies</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expList.map((e) => (
                <tr key={e._id || e.company}>
                  <td style={{ fontWeight: "600", color: "#fff" }}>{e.position}</td>
                  <td style={{ color: "#cbd5e1" }}>{e.company}</td>
                  <td style={{ color: "#94a3b8", fontSize: "0.88rem" }}>{e.duration}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                      {(e.technologies || []).slice(0, 4).map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: "0.75rem",
                            background: "rgba(255,255,255,0.06)",
                            padding: "0.15rem 0.4rem",
                            borderRadius: "4px",
                            color: "#cbd5e1",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button className="btn-edit" onClick={() => handleOpenModal(e)}>
                        ✏️ Edit
                      </button>
                      <button className="btn-danger" onClick={() => handleDelete(e._id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.25rem", color: "#fff" }}>
              {editingId ? "Edit Work Experience" : "Add Work Experience"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Position / Job Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Intern Software Developer"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Miami Clothing (Pvt) Ltd"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="June 2025 – December 2025"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Summary Overview</label>
                <textarea
                  className="form-textarea"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Brief summary of your role and team contributions..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Responsibilities / Achievements (One per line)</label>
                <textarea
                  className="form-textarea"
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="Built a Grievance Management System using PHP & MySQL&#10;Delivered an internal IT Help Desk System"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Technologies Used (Comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="PHP, MySQL, JavaScript, AJAX, Navicat"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  💾 Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageExperience;
