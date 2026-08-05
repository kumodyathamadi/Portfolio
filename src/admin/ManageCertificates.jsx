import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Admin.css";

function ManageCertificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [issuerFilter, setIssuerFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    description: "",
    issueDate: "",
    certificateId: "",
    verificationUrl: "",
    image: "",
    category: "General",
  });

  const loadCertificates = async () => {
    setLoading(true);
    try {
      const data = await api.getCertificates();
      setCerts(data);
    } catch (err) {
      console.error("[Load Certs]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleOpenModal = (cert = null) => {
    if (cert) {
      setEditingId(cert._id);
      setFormData({
        title: cert.title || "",
        issuer: cert.issuer || "",
        description: cert.description || "",
        issueDate: cert.issueDate || "",
        certificateId: cert.certificateId || "",
        verificationUrl: cert.verificationUrl || cert.link || "",
        image: cert.image || "",
        category: cert.category || "General",
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        issuer: "",
        description: "",
        issueDate: "",
        certificateId: "",
        verificationUrl: "",
        image: "",
        category: "General",
      });
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await api.uploadFile(file);
      setFormData((prev) => ({ ...prev, image: res.url || res.fullUrl }));
    } catch (err) {
      alert("Failed to upload certificate image/PDF: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.updateCertificate(editingId, formData);
      } else {
        await api.createCertificate(formData);
      }
      setIsModalOpen(false);
      loadCertificates();
    } catch (err) {
      alert("Failed to save certificate: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await api.deleteCertificate(id);
      loadCertificates();
    } catch (err) {
      alert("Failed to delete certificate: " + err.message);
    }
  };

  const filteredCerts = certs.filter((c) => {
    const title = (c.title || "").toLowerCase();
    const issuer = (c.issuer || "").toLowerCase();
    const matchesSearch = title.includes(search.toLowerCase()) || issuer.includes(search.toLowerCase());
    const matchesIssuer = issuerFilter === "All" || c.issuer === issuerFilter;
    return matchesSearch && matchesIssuer;
  });

  const uniqueIssuers = Array.from(new Set(certs.map((c) => c.issuer).filter(Boolean)));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "700" }}>Manage Certificates</h2>
          <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>Add, edit, or remove earned credentials</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal()}>
          📜 Add Certificate
        </button>
      </div>

      {/* Filter Bar */}
      <div className="admin-card" style={{ padding: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          className="form-input"
          style={{ maxWidth: "300px" }}
          placeholder="🔍 Search certificates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          style={{ maxWidth: "220px" }}
          value={issuerFilter}
          onChange={(e) => setIssuerFilter(e.target.value)}
        >
          <option value="All">All Issuers</option>
          {uniqueIssuers.map((iss) => (
            <option key={iss} value={iss}>
              {iss}
            </option>
          ))}
        </select>
      </div>

      {/* Certificates Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>Loading certificates...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Certificate Title</th>
                <th>Issuer</th>
                <th>Issue Date</th>
                <th>Verification</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCerts.map((c) => (
                <tr key={c._id || c.title}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                      {c.image && (
                        <img
                          src={c.image}
                          alt=""
                          style={{ width: "42px", height: "42px", borderRadius: "6px", objectFit: "cover" }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: "600", color: "#fff" }}>{c.title}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{c.category || "General"}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge-category">{c.issuer}</span>
                  </td>
                  <td style={{ color: "#cbd5e1" }}>{c.issueDate || "N/A"}</td>
                  <td>
                    {c.verificationUrl ? (
                      <a
                        href={c.verificationUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#8b5cf6", textDecoration: "underline", fontSize: "0.85rem" }}
                      >
                        Verify ↗
                      </a>
                    ) : (
                      <span className="badge-status">Verified</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button className="btn-edit" onClick={() => handleOpenModal(c)}>
                        ✏️ Edit
                      </button>
                      <button className="btn-danger" onClick={() => handleDelete(c._id)}>
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1.25rem", color: "#fff" }}>
              {editingId ? "Edit Certificate" : "Add Certificate"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Certificate Name / Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label className="form-label">Issuing Organization</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="e.g. University of Moratuwa / MongoDB"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Issue Date / Year</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    placeholder="e.g. July 2024"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Verification URL / Credential Link</label>
                <input
                  type="url"
                  className="form-input"
                  value={formData.verificationUrl}
                  onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                  placeholder="https://coursera.org/verify/..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Certificate Image or PDF</label>
                <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} style={{ display: "block", color: "#cbd5e1" }} />
                {uploading && <div style={{ fontSize: "0.8rem", color: "#a5b4fc" }}>Uploading file...</div>}
                {formData.image && (
                  <div className="upload-preview-box">
                    <img src={formData.image} alt="" className="upload-preview-thumb" />
                    <span style={{ fontSize: "0.8rem", wordBreak: "break-all" }}>{formData.image}</span>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  💾 Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageCertificates;
