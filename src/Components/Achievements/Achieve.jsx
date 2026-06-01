import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import "./Achieve.css";
import Modal from "../Modal/Modal";
import ct1 from "../../assets/ct1.jpg";
import ct2 from "../../assets/ct2.jpg";
import ct3 from "../../assets/ct3.jpg";
import theme_pattern from "../../assets/theme_pattern.svg";
import ct4 from "../../assets/ct4.jpg";

const certificateData = [
  {
    title: "Python for Beginners Course",
    issuer: "University of Moratuwa",
    image: ct4,
    link: null,
  },
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    image: ct3,
    link: null,
  },
  {
    title: "SQL Analytics and BI on Databricks",
    issuer: "Simplilearn",
    image: ct1,
    link: null,
  },
  {
    title: "Handling, storing & managing data for information management",
    issuer: "UNICEF",
    image: ct2,
    link: null,
  },
];

function Achieve() {
  const [selected, setSelected] = useState(null);
  const handleClose = useCallback(() => setSelected(null), []);

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
        {certificateData.map((cert) => (
          <motion.article
            key={cert.title}
            className="certificate-card certificate-card--clickable"
            onClick={() => setSelected(cert)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setSelected(cert)}
            aria-label={`View ${cert.title} certificate`}
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
              <img src={cert.image} alt={cert.title} />
              <div className="certificate-zoom-hint" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
            </div>
            <h2>{cert.title}</h2>
            <p>Issued by {cert.issuer}</p>
            {cert.link ? (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                onClick={(e) => e.stopPropagation()}
              >
                View certificate
              </a>
            ) : (
              <span className="certificate-badge">Verified</span>
            )}
          </motion.article>
        ))}
      </motion.div>

      <Modal
        isOpen={!!selected}
        onClose={handleClose}
        title={selected?.title}
      >
        {selected && (
          <div className="cert-modal-content">
            <img
              src={selected.image}
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
