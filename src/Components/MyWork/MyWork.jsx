import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./MyWork.css";
import mywork_data from "../../assets/mywork_data";
import Modal from "../Modal/Modal";
import { api } from "../../services/api";

function MyWork() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(mywork_data);
        }
      } catch (err) {
        console.warn("[MyWork] Using static projects fallback");
        setProjects(mywork_data);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter projects by search query and category
  const filteredProjects = projects.filter((p) => {
    const title = (p.title || p.w_name || "").toLowerCase();
    const desc = (p.description || p.w_desc || "").toLowerCase();
    const tech = Array.isArray(p.technologies || p.tags)
      ? (p.technologies || p.tags).join(" ").toLowerCase()
      : "";
    const q = search.toLowerCase();

    const matchesSearch = !q || title.includes(q) || desc.includes(q) || tech.includes(q);
    const matchesCategory =
      selectedCategory === "All" ||
      (p.category || "").toLowerCase() === selectedCategory.toLowerCase() ||
      (p.tags || []).some((t) => t.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Full-Stack", "MERN Stack", "Spring Boot", "React", "PHP & SQL"];

  return (
    <section id="projects" className="projects section-block">
      <div className="section-wrap">
        <p className="section-label">Portfolio</p>
        <h2 className="section-heading">Featured projects</h2>
        <p className="section-sub">
          A dynamic showcase of work, APIs, and applications managed seamlessly via CMS.
        </p>

        {/* Search Bar & Category Filters */}
        <div style={{ marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            className="form-input"
            style={{
              width: "100%",
              maxWidth: "480px",
              padding: "0.8rem 1.25rem",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "0.95rem",
            }}
            placeholder="🔍 Search projects by title, description, or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "0.45rem 0.95rem",
                  borderRadius: "20px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "1px solid",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: selectedCategory === cat ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.05)",
                  color: selectedCategory === cat ? "#fff" : "#94a3b8",
                  borderColor: selectedCategory === cat ? "#8b5cf6" : "rgba(255,255,255,0.1)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ color: "#94a3b8", padding: "2rem 0" }}>Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ color: "#94a3b8", padding: "2rem 0" }}>No projects match your search or filter criteria.</div>
        ) : (
          <div className="featured-list">
            {filteredProjects.map((project, i) => {
              const title = project.title || project.w_name;
              const subtitle = project.subtitle || "";
              const desc = project.description || project.w_desc;
              const image = project.image || project.w_img;
              const tags = project.technologies || project.tags || [];
              const bullets = project.bullets || [];
              const liveUrl = project.liveUrl;
              const githubUrl = project.githubUrl || project.sourceUrl;

              return (
                <motion.article
                  key={project._id || project.w_no || title}
                  className="featured-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                >
                  <div className="featured-visual">
                    <span className="featured-pill">{project.category || "Featured project"}</span>
                    <button
                      type="button"
                      className="featured-img-btn"
                      onClick={() => setActive(project)}
                      data-cursor-hover
                    >
                      <img src={image} alt={title} />
                    </button>
                  </div>
                  <div className="featured-content">
                    <h3 className="featured-title">{title}</h3>
                    {subtitle && <p className="featured-subtitle">{subtitle}</p>}
                    <p className="featured-desc">{desc}</p>
                    {bullets.length > 0 && (
                      <ul className="featured-bullets">
                        {bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                    <div className="featured-tags">
                      {tags.map((t) => (
                        <span key={t} className="featured-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="featured-actions" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {liveUrl && (
                        <a
                          className="btn btn-primary btn-sm"
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                        >
                          Live demo ↗
                        </a>
                      )}
                      {githubUrl && (
                        <a
                          className="btn btn-outline btn-sm"
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-hover
                        >
                          GitHub ↗
                        </a>
                      )}
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => setActive(project)}
                        data-cursor-hover
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      <Modal
        isOpen={!!active}
        onClose={() => setActive(null)}
        title={active?.title || active?.w_name}
      >
        {active && (
          <>
            <div className="mywork-modal-img-wrap">
              <img src={active.image || active.w_img} alt="" className="mywork-modal-img" />
            </div>
            <p className="mywork-modal-desc">{active.description || active.w_desc}</p>
            {active.bullets && active.bullets.length > 0 && (
              <ul className="modal-bullets">
                {active.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            <div className="mywork-modal-tags">
              {(active.technologies || active.tags || []).map((t) => (
                <span key={t} className="mywork-tag">
                  {t}
                </span>
              ))}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}

export default MyWork;
