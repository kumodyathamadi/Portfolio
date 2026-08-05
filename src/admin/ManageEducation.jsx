import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Admin.css";

function ManageEducation() {
  const [eduList, setEduList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    degree: "",
    institute: "",
    duration: "",
    achievements: "",
    badge: "",
    location: "",
  });

  const loadEdu = async () => {
    setLoading(true);
    try {
      const data = await api.getEducation();
      setEduList(data);
    } catch (err) {
      console.error("[Load Edu]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEdu();
  }, []);

  const handleOpenModal = (edu = null) => {
    if (edu) {
      setEditingId(edu._id);
      setFormData({
        degree: edu.degree || "",
        institute: edu.institute || "",
        duration: edu.duration || "",
        achievements: Array.isArray(edu.achievements) ? edu.achievements.join("\n") : "",
        badge: edu.badge || "",
        location: edu.location || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        degree: "",
        institute: "",
        duration: "",
        achievements: "",
        badge: "",
        location: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      achievements: formData.achievements
        ? formData.achievements.split("\n").map((a) => a.trim()).filter(Boolean)
        : [],
    };

    try {
      if (editingId) {
        await api.updateEducation(editingId, payload);
      } else {
        await api.createEducation(payload);
      }
      setIsModalOpen(false);
      loadEdu();
    } catch (err) {
      alert("Failed to save education entry: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education entry?")) return;
    try {
      await api.deleteEducation(id);
      loadEdu();
    } catch (err) {
      alert("Failed to delete education entry: " + err.message);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700" }}>Manage Education</h2>
          <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>Manage degrees, institutes, and academic achievements</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          🎓 Add Education Entry
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>Loading education history...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Degree / Qualification</th>
                <th>Institute</th>
                <th>Duration</th>
                <th>Badge</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {eduList.map((e) => (
                <tr key={e._id || e.degree}>
                  <td style={{ fontWeight: "600", color: "#fff" }}>{e.degree}</td>
                  <td style={{ color: "#cbd5e1" }}>{e.institute}</td>
                  <td style={{ color: "#94a3b8", fontSize: "0.88rem" }}>{e.duration}</td>
                  <td>
                    <span className="badge-category">{e.badge || "Degree"}</span>
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
              {editingId ? "Edit Education Entry" : "Add Education Entry"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Degree / Program Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="BSc (Hons) in Information Technology"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Institute / University Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.institute}
                  onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                  placeholder="Sri Lanka Institute of Information Technology (SLIIT)"
                  required
                />
              </div>

              <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Duration / Timeline</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Jul 2023 – Jul 2027"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Status Badge</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Current / 2023"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Achievements & Key Modules (One per line)</label>
                <textarea
                  className="form-textarea"
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  placeholder="Specialization in Information Technology&#10;Coursework across React, Node, PHP, SQL"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  💾 Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageEducation;
