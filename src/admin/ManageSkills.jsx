import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Admin.css";

function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Languages",
    level: "Intermediate",
    icon: "",
  });

  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await api.getSkills();
      setSkills(data);
    } catch (err) {
      console.error("[Load Skills]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleOpenModal = (skill = null) => {
    if (skill) {
      setEditingId(skill._id);
      setFormData({
        name: skill.name || "",
        category: skill.category || "Languages",
        level: skill.level || "Intermediate",
        icon: skill.icon || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        category: "Languages",
        level: "Intermediate",
        icon: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.updateSkill(editingId, formData);
      } else {
        await api.createSkill(formData);
      }
      setIsModalOpen(false);
      loadSkills();
    } catch (err) {
      alert("Failed to save skill: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await api.deleteSkill(id);
      loadSkills();
    } catch (err) {
      alert("Failed to delete skill: " + err.message);
    }
  };

  const filteredSkills = skills.filter((s) => {
    const name = (s.name || "").toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || s.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700" }}>Manage Skills</h2>
          <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>Add, edit, or remove technical skills & competencies</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          ⚡ Add New Skill
        </button>
      </div>

      {/* Filters */}
      <div className="admin-card" style={{ padding: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          className="form-input"
          style={{ maxWidth: "300px" }}
          placeholder="🔍 Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          style={{ maxWidth: "200px" }}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Languages">Languages</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend & Data">Backend & Data</option>
          <option value="Tools">Tools</option>
        </select>
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>Loading skills...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Category</th>
                <th>Proficiency Level</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSkills.map((s) => (
                <tr key={s._id || s.name}>
                  <td style={{ fontWeight: "600", color: "#fff" }}>{s.name}</td>
                  <td>
                    <span className="badge-category">{s.category}</span>
                  </td>
                  <td>
                    <span className="badge-status">{s.level || "Intermediate"}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button className="btn-edit" onClick={() => handleOpenModal(s)}>
                        ✏️ Edit
                      </button>
                      <button className="btn-danger" onClick={() => handleDelete(s._id)}>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.25rem", color: "#fff" }}>
              {editingId ? "Edit Skill" : "Add Skill"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Skill Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. React.js, Python, MongoDB"
                  required
                />
              </div>

              <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Languages">Languages</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend & Data">Backend & Data</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Proficiency Level</label>
                  <select
                    className="form-select"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  💾 Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageSkills;
