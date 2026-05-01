import React from "react";
import { motion } from "framer-motion";
import "./Achieve.css";
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
            className="certificate-card"
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
            </div>
            <h2>{cert.title}</h2>
            <p>Issued by {cert.issuer}</p>
            {cert.link ? (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
              >
                View certificate
              </a>
            ) : (
              <span className="certificate-badge">Verified</span>
            )}
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}

export default Achieve;
