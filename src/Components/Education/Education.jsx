import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import "./Education.css";
import Modal from "../Modal/Modal";
import sliit from "../../assets/sliit.webp";
import aquainas from "../../assets/aquinas.jpg";
import mrc from "../../assets/mrc.jpeg";
import ct1 from "../../assets/ct1.jpg";
import ct2 from "../../assets/ct2.jpg";
import ct3 from "../../assets/ct3.jpg";
import ct4 from "../../assets/ct4.jpg";
import mongo1 from "../../assets/mongo (1).jpg";
import mongo2 from "../../assets/mongo (2).jpg";
import mongo3 from "../../assets/mongo (3).jpg";
import mongo4 from "../../assets/mongo (4).jpg";
import mongo5 from "../../assets/mongo (5).jpg";
import mongo6 from "../../assets/mongo (6).jpg";
import mongo7 from "../../assets/mongo (7).jpg";

const certifications = [
  {
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    image: ct4,
  },
  {
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    image: ct3,
  },
  {
    title: "SQL Analytics and BI on Databricks",
    issuer: "Simplilearn",
    image: ct1,
  },
  {
    title: "Handling, storing & managing data for information management",
    issuer: "UNICEF",
    image: ct2,
  },
  {
    title: "MongoDB Logging Basics",
    issuer: "Mongo DB",
    image: mongo1,
  },
  {
    title: "MongoDB Atlas Upgrades & Maintenance",
    issuer: "Mongo DB",
    image: mongo2,
  },
  {
    title: "MongoDB Atlas Administration",
    issuer: "Mongo DB",
    image: mongo3,
  },
  {
    title: "Replication in MongoDB",
    issuer: "Mongo DB",
    image: mongo4,
  },
  {
    title: "Getting Started with MongoDB Atlas",
    issuer: "Mongo DB",
    image: mongo5,
  },
  {
    title: "MongoDB Atlas Security",
    issuer: "Mongo DB",
    image: mongo6,
  },
  {
    title: "Monitoring and Insights with MongoDB's Observability Suite",
    issuer: "Mongo DB",
    image: mongo7,
  },
];

function Education() {
  const [selected, setSelected] = useState(null);
  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <section id="education" className="edu section-block">
      <div className="section-wrap">
        <p className="section-label">Background</p>
        <h2 className="section-heading">Education &amp; credentials</h2>
        <p className="section-sub">
          Formal education and professional certificates that support my
          technical foundation.
        </p>

        <h3 className="edu-subheading">Education</h3>
        <div className="edu-timeline">
          <motion.article
            className="edu-item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="edu-item-left">
              <div className="edu-item-badge">Current</div>
              <img src={sliit} alt="SLIIT" className="edu-logo-img" />
            </div>
            <div className="edu-item-main">
              <h4 className="edu-degree">
                BSc (Hons) in Information Technology
              </h4>
              <p className="edu-school">
                Sri Lanka Institute of Information Technology (SLIIT)
              </p>
              <p className="edu-meta">Jul 2023 – Jul 2027 · Colombo, Sri Lanka</p>
              <p className="edu-note">
                Specialization in Information Technology · coursework across
                Python, React, PHP, SQL, Kotlin, and more.
              </p>
            </div>
          </motion.article>

          <motion.article
            className="edu-item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div className="edu-item-left">
              <div className="edu-item-badge edu-item-badge--muted">2023</div>
              <img src={aquainas} alt="Aquinas" className="edu-logo-img" />
            </div>
            <div className="edu-item-main">
              <h4 className="edu-degree">
                Certificate in Professional English &amp; IT
              </h4>
              <p className="edu-school">Aquinas College of Higher Studies</p>
              <p className="edu-meta">March 2023 · Borella</p>
            </div>
          </motion.article>

          <motion.article
            className="edu-item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="edu-item-left">
              <div className="edu-item-badge edu-item-badge--muted">2014–2022</div>
              <img src={mrc} alt="Mahinda Rajapaksha College" className="edu-logo-img" />
            </div>
            <div className="edu-item-main">
              <h4 className="edu-degree">Secondary education</h4>
              <p className="edu-school">Mahinda Rajapaksha College — Homagama</p>
              <p className="edu-meta">G.C.E. O/L and A/L</p>
            </div>
          </motion.article>
        </div>

        <h3 className="edu-subheading edu-subheading--certs">Certifications</h3>
        <div className="cert-grid">
          {certifications.map((c) => (
            <div
              key={c.title}
              className="cert-card cert-card--clickable"
              onClick={() => setSelected(c)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(c)}
              aria-label={`View ${c.title} certificate`}
            >
              <div className="cert-thumb">
                <img src={c.image} alt="" />
                <div className="cert-thumb-hint" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
              </div>
              <div className="cert-text">
                <p className="cert-title">{c.title}</p>
                <p className="cert-issuer">{c.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!selected}
        onClose={handleClose}
        title={selected?.title}
      >
        {selected && (
          <div className="edu-cert-modal-content">
            <img
              src={selected.image}
              alt={selected.title}
              className="edu-cert-modal-img"
            />
            <p className="edu-cert-modal-issuer">Issued by {selected.issuer}</p>
          </div>
        )}
      </Modal>
    </section>
  );
}

export default Education;
