import React from "react";
import { motion } from "framer-motion";
import "./About.css";

function About() {
  return (
    <section
      id="about"
      className="about section-block"
    >
      <div className="section-wrap">
        <p className="section-label">About me</p>
        <h2 className="section-heading">
          Turning ideas into
          <br />
          digital experiences
        </h2>
        <p className="section-sub about-intro">
          I&apos;m an undergraduate at the Sri Lanka Institute of Information
          Technology (SLIIT), specializing in Information Technology. I love
          picking up new skills, shipping coursework and personal projects, and
          staying curious about how software can solve real problems.
        </p>
        <p className="about-body">
          My strengths include teamwork, communication, and project delivery.
          I&apos;m motivated by continuous learning and contributing to
          well-structured, maintainable code — whether on the front end with
          React or on the server with PHP and MySQL.
        </p>

        <div className="about-stats">
          {[
            { value: "8+", label: "Projects completed" },
            { value: "6+", label: "Months experience" },
            { value: "4+", label: "Certificates" },
          ].map((s) => (
            <motion.div
              key={s.label}
              className="about-stat-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
