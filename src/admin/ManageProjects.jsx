import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Admin.css";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "Full-Stack",
    technologies: "",
    bullets: "",
    image: "",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    status: "Completed",
  });

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await api.getProjects();
      setProjects(data);
    } catch (err) {
      console.error("[Load Projects]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenModal = (proj = null) => {
    if (proj) {
      setEditingId(proj._id || proj.w_no);
      setFormData({
        title: proj.title || proj.w_name || "",
        subtitle: proj.subtitle || "",
        description: proj.description || proj.w_desc || "",
        category: proj.category || "Full-Stack",
        technologies: Array.isArray(proj.technologies || proj.tags)
          ? (proj.technologies || proj.tags).join(", ")
          : "",
        bullets: Array.isArray(proj.bullets) ? proj.bullets.join("\n") : "",
        image: proj.image || proj.w_img || "",
        githubUrl: proj.githubUrl || proj.sourceUrl || "",
        liveUrl: proj.liveUrl || "",
        featured: proj.featured !== false,
        status: proj.status || "Completed",
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        category: "Full-Stack",
        technologies: "",
        bullets: "",
        image: "",
        githubUrl: "",
        liveUrl: "",
        featured: true,
        status: "Completed",
      });
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploadFile(file);
      setFormData((prev) => ({ ...prev, image: res.url || res.fullUrl }));
    } catch (err) {
      alert("Failed to upload image: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies
        ? formData.technologies.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      bullets: formData.bullets
        ? formData.bullets.split("\n").map((b) => b.trim()).filter(Boolean)
        : [],
    };

    try {
      if (editingId) {
        await api.updateProject(editingId, payload);
      } else {
        await api.createProject(payload);
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (err) {
      alert("Failed to save project: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.deleteProject(id);
      loadProjects();
    } catch (err) {
      alert("Failed to delete project: " + err.message);
    }
  };

  // Filtered List
  const filteredProjects = projects.filter((p) => {
    const title = (p.title || p.w_name || "").toLowerCase();
    const matchesSearch = title.includes(search.toLowerCase());
    const matchesCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700" }}>Manage Projects</h2>
          <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>Add, edit, or remove work showcase projects</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          ➕ Add New Project
        </button>
      </div>

      {/* Filter Controls */}
      <div className="admin-card" style={{ padding: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          className="form-input"
          style={{ maxWidth: "300px" }}
          placeholder="🔍 Search projects..."
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
          <option value="Full-Stack">Full-Stack</option>
          <option value="MERN Stack">MERN Stack</option>
          <option value="Spring Boot">Spring Boot</option>
          <option value="React">React</option>
          <option value="PHP & SQL">PHP & SQL</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>Loading projects...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Technologies</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => {
                const id = p._id || p.w_no;
                const title = p.title || p.w_name;
                const image = p.image || p.w_img;
                const techList = p.technologies || p.tags || [];

                return (
                  <tr key={id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                        {image && (
                          <img
                            src={image}
                            alt=""
                            style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }}
                          />
                        )}
                        <div>
                          <div style={{ fontWeight: "600", color: "#fff" }}>{title}</div>
                          <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{p.subtitle}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge-category">{p.category || "Full-Stack"}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                        {techList.slice(0, 4).map((t) => (
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
                    <td>
                      <span className="badge-status">{p.status || "Completed"}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                        <button className="btn-edit" onClick={() => handleOpenModal(p)}>
                          ✏️ Edit
                        </button>
                        <button className="btn-danger" onClick={() => handleDelete(id)}>
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.25rem", color: "#fff" }}>
              {editingId ? "Edit Project" : "Create New Project"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subtitle / Short Tagline</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
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
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="MERN Stack">MERN Stack</option>
                    <option value="Spring Boot">Spring Boot</option>
                    <option value="React">React</option>
                    <option value="PHP & SQL">PHP & SQL</option>
                    <option value="Mobile App">Mobile App</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea
                  className="form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Key Highlights / Bullets (One per line)</label>
                <textarea
                  className="form-textarea"
                  value={formData.bullets}
                  onChange={(e) => setFormData({ ...formData, bullets: e.target.value })}
                  placeholder="Secure user authentication&#10;Real-time delivery status tracking"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Technologies Used (Comma-separated)</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React.js, Node.js, Express.js, MongoDB"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Image / Screenshot</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "block", color: "#cbd5e1" }} />
                {uploading && <div style={{ fontSize: "0.8rem", color: "#a5b4fc" }}>Uploading file...</div>}
                {formData.image && (
                  <div className="upload-preview-box">
                    <img src={formData.image} alt="" className="upload-preview-thumb" />
                    <span style={{ fontSize: "0.8rem", wordBreak: "break-all" }}>{formData.image}</span>
                  </div>
                )}
              </div>

              <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">GitHub Repository URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div>
                  <label className="form-label">Live Demo URL</label>
                  <input
                    type="url"
                    className="form-input"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://my-live-demo.com"
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  💾 Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProjects;
