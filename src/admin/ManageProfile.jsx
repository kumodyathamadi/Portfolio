import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import "./Admin.css";

function ManageProfile() {
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    about: "",
    image: "",
    email: "",
    phone: "",
    location: "",
    resumeUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    instagramUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [message, setMessage] = useState("");

  const loadProfile = async () => {
    setLoading(true);
    try {
      const data = await api.getProfile();
      if (data) {
        setProfile((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error("[Load Profile]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await api.uploadFile(file);
      setProfile((prev) => ({ ...prev, image: res.url || res.fullUrl }));
    } catch (err) {
      alert("Failed to upload profile photo: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const res = await api.uploadFile(file);
      setProfile((prev) => ({ ...prev, resumeUrl: res.url || res.fullUrl }));
    } catch (err) {
      alert("Failed to upload resume PDF: " + err.message);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await api.updateProfile(profile);
      setMessage("Profile updated successfully! Portfolio updated in real-time.");
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "2rem", color: "#94a3b8" }}>Loading profile details...</div>;
  }

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: "700" }}>Manage Personal Profile</h2>
        <p style={{ color: "#94a3b8", fontSize: "0.88rem" }}>
          Update hero introduction, profile picture, contact information, social handles, and resume file
        </p>
      </div>

      {message && (
        <div
          style={{
            padding: "0.85rem 1.25rem",
            background: "rgba(34, 197, 94, 0.15)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "10px",
            color: "#4ade80",
            marginBottom: "1.5rem",
            fontWeight: "600",
          }}
        >
          ✅ {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-card" style={{ maxWidth: "800px" }}>
        <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="form-label">Professional Title / Headline</label>
            <input
              type="text"
              className="form-input"
              value={profile.title}
              onChange={(e) => setProfile({ ...profile, title: e.target.value })}
              placeholder="e.g. Full-Stack Developer"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">About / Bio Description</label>
          <textarea
            className="form-textarea"
            style={{ minHeight: "120px" }}
            value={profile.about}
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            placeholder="Write a compelling professional summary..."
            required
          />
        </div>

        <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label className="form-label">Profile Image / Photo</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "block", color: "#cbd5e1" }} />
            {uploadingImage && <div style={{ fontSize: "0.8rem", color: "#a5b4fc" }}>Uploading photo...</div>}
            {profile.image && (
              <div className="upload-preview-box">
                <img src={profile.image} alt="" className="upload-preview-thumb" />
                <span style={{ fontSize: "0.8rem", wordBreak: "break-all" }}>{profile.image}</span>
              </div>
            )}
          </div>

          <div>
            <label className="form-label">Resume PDF File</label>
            <input type="file" accept=".pdf,image/*" onChange={handleResumeUpload} style={{ display: "block", color: "#cbd5e1" }} />
            {uploadingResume && <div style={{ fontSize: "0.8rem", color: "#a5b4fc" }}>Uploading PDF...</div>}
            {profile.resumeUrl && (
              <div className="upload-preview-box">
                <span style={{ fontSize: "1.2rem" }}>📄</span>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: "0.8rem", color: "#a5b4fc", wordBreak: "break-all" }}
                >
                  View Current Resume PDF ↗
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-input"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Location / City</label>
          <input
            type="text"
            className="form-input"
            value={profile.location}
            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
            placeholder="Colombo, Sri Lanka"
          />
        </div>

        <h4 style={{ fontSize: "1rem", fontWeight: "700", margin: "1.5rem 0 1rem 0", color: "#cbd5e1" }}>
          🌐 Social Media Profiles
        </h4>

        <div className="form-group" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label className="form-label">GitHub URL</label>
            <input
              type="url"
              className="form-input"
              value={profile.githubUrl}
              onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">LinkedIn URL</label>
            <input
              type="url"
              className="form-input"
              value={profile.linkedinUrl}
              onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="btn-primary" disabled={saving} style={{ padding: "0.85rem 2rem" }}>
            {saving ? "Saving Changes..." : "💾 Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ManageProfile;
