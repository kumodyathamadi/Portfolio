import React, { useState, useCallback, useEffect } from "react";
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
import { api } from "../../services/api";

function Education() {
  const [selected, setSelected] = useState(null);
  const [eduList, setEduList] = useState([]);
  const [certList, setCertList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eData, cData] = await Promise.all([
          api.getEducation().catch(() => []),
          api.getCertificates().catch(() => []),
        ]);
        if (Array.isArray(eData) && eData.length > 0) setEduList(eData);
        if (Array.isArray(cData) && cData.length > 0) setCertList(cData);
      } catch (err) {
        console.warn("[Education] Using default fallbacks");
      }
    };
    fetchData();
  }, []);

  const handleClose = useCallback(() => setSelected(null), []);

  const defaultEdu = [
    {
      degree: "BSc (Hons) in Information Technology",
      institute: "Sri Lanka Institute of Information Technology (SLIIT)",
      duration: "Jul 2023 – Jul 2027 · Colombo, Sri Lanka",
      badge: "Current",
      logo: sliit,
      achievements: [
        "Specialization in Information Technology · coursework across Python, React, PHP, SQL, Kotlin, and more.",
      ],
    },
    {
      degree: "Certificate in Professional English & IT",
      institute: "Aquinas College of Higher Studies",
      duration: "March 2023 · Borella",
      badge: "2023",
      logo: aquainas,
      achievements: [],
    },
    {
      degree: "Secondary education",
      institute: "Mahinda Rajapaksha College — Homagama",
      duration: "G.C.E. O/L and A/L",
      badge: "2014–2022",
      logo: mrc,
      achievements: [],
    },
  ];

  const defaultCerts = [
    { title: "Python for Beginners", issuer: "University of Moratuwa", image: ct4 },
    { title: "Web Design for Beginners", issuer: "University of Moratuwa", image: ct3 },
    { title: "SQL Analytics and BI on Databricks", issuer: "Simplilearn", image: ct1 },
    { title: "Handling, storing & managing data", issuer: "UNICEF", image: ct2 },
  ];

  const displayEdu = eduList.length > 0 ? eduList : defaultEdu;
  const displayCerts = certList.length > 0 ? certList : defaultCerts;

  return (
    <section id="education" className="edu section-block">
      <div className="section-wrap">
        <p className="section-label">Background</p>
        <h2 className="section-heading">Education &amp; credentials</h2>
        <p className="section-sub">
          Formal education and professional certificates managed dynamically.
        </p>

        <h3 className="edu-subheading">Education</h3>
        <div className="edu-timeline">
          {displayEdu.map((e, idx) => (
            <motion.article
              key={e._id || e.degree + idx}
              className="edu-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <div className="edu-item-left">
                <div className={`edu-item-badge ${e.badge === "Current" ? "" : "edu-item-badge--muted"}`}>
                  {e.badge || "Degree"}
                </div>
                {e.logo && <img src={e.logo} alt="" className="edu-logo-img" />}
              </div>
              <div className="edu-item-main">
                <h4 className="edu-degree">{e.degree}</h4>
                <p className="edu-school">{e.institute}</p>
                <p className="edu-meta">{e.duration}</p>
                {e.achievements && e.achievements.length > 0 && (
                  <p className="edu-note">{e.achievements.join(" · ")}</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <h3 className="edu-subheading edu-subheading--certs">Certifications</h3>
        <div className="cert-grid">
          {displayCerts.map((c) => (
            <div
              key={c._id || c.title}
              className="cert-card cert-card--clickable"
              onClick={() => setSelected(c)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(c)}
              aria-label={`View ${c.title} certificate`}
            >
              <div className="cert-thumb">
                <img src={c.image || ct1} alt="" />
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
              src={selected.image || ct1}
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
