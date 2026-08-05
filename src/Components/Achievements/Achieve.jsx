import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import "./Achieve.css";
import Modal from "../Modal/Modal";
import ct1 from "../../assets/ct1.jpg";
import ct2 from "../../assets/ct2.jpg";
import ct3 from "../../assets/ct3.jpg";
import ct4 from "../../assets/ct4.jpg";
import theme_pattern from "../../assets/theme_pattern.svg";
import { api } from "../../services/api";

const defaultCertificates = [
  { title: "Python for Beginners Course", issuer: "University of Moratuwa", image: ct4, link: null },
  { title: "Web Design for Beginners", issuer: "University of Moratuwa", image: ct3, link: null },
  { title: "SQL Analytics and BI on Databricks", issuer: "Simplilearn", image: ct1, link: null },
  { title: "Handling, storing & managing data", issuer: "UNICEF", image: ct2, link: null },
];

function Achieve() {
  const [certificates, setCertificates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await api.getCertificates();
        if (Array.isArray(data) && data.length > 0) {
          setCertificates(data);
        } else {
          setCertificates(defaultCertificates);
        }
      } catch (err) {
        console.warn("[Achieve] Using default certificates fallback");
        setCertificates(defaultCertificates);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  const uniqueIssuers = ["All", ...Array.from(new Set(certificates.map((c) => c.issuer).filter(Boolean)))];

  const filteredCerts = certificates.filter((c) => {
    const title = (c.title || "").toLowerCase();
    const issuer = (c.issuer || "").toLowerCase();
    const q = search.toLowerCase();

    const matchesSearch = !q || title.includes(q) || issuer.includes(q);
    const matchesIssuer = selectedIssuer === "All" || c.issuer === selectedIssuer;

    return matchesSearch && matchesIssuer;
  });

  return (
    <div className="certificates">
      <motion.div
        id="achievements"
        className="achieve-head"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mywork-title">
          <h1 className="section-title">My Achievements</h1>
          <img src={theme_pattern} alt="" className="achieve-deco" />
        </div>
      </motion.div>

      {/* Filter Controls */}
      <div style={{ maxWidth: "1200px", margin: "0 auto 2rem auto", padding: "0 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          className="form-input"
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "0.75rem 1.25rem",
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "12px",
            color: "#fff",
            fontSize: "0.95rem",
          }}
          placeholder="🔍 Search certificates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {uniqueIssuers.map((iss) => (
            <button
              key={iss}
              type="button"
              onClick={() => setSelectedIssuer(iss)}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "20px",
                fontSize: "0.82rem",
                fontWeight: 600,
                border: "1px solid",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: selectedIssuer === iss ? "linear-gradient(135deg, #a855f7, #6366f1)" : "rgba(255,255,255,0.05)",
                color: selectedIssuer === iss ? "#fff" : "#94a3b8",
                borderColor: selectedIssuer === iss ? "#a855f7" : "rgba(255,255,255,0.1)",
              }}
            >
              {iss}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        className="certificates-container"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {filteredCerts.map((cert) => {
          const title = cert.title;
          const issuer = cert.issuer;
          const image = cert.image || ct1;
          const link = cert.verificationUrl || cert.link;

          return (
            <motion.article
              key={cert._id || title}
              className="certificate-card certificate-card--clickable"
              onClick={() => setSelected(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(cert)}
              aria-label={`View ${title} certificate`}
              variants={{
                hidden: { opacity: 0, y: 32 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <div className="certificate-img-wrap">
                <img src={image} alt={title} />
                <div className="certificate-zoom-hint" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
              </div>
              <h2>{title}</h2>
              <p>Issued by {issuer}</p>
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  onClick={(e) => e.stopPropagation()}
                >
                  View certificate ↗
                </a>
              ) : (
                <span className="certificate-badge">Verified</span>
              )}
            </motion.article>
          );
        })}
      </motion.div>

      <Modal
        isOpen={!!selected}
        onClose={handleClose}
        title={selected?.title}
      >
        {selected && (
          <div className="cert-modal-content">
            <img
              src={selected.image || ct1}
              alt={selected.title}
              className="cert-modal-img"
            />
            <p className="cert-modal-issuer">Issued by {selected.issuer}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Achieve;
