import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./About.css";
import { api } from "../../services/api";

function About() {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ projects: "8+", experience: "6+", certificates: "4+" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, projectsData, certsData] = await Promise.all([
          api.getProfile().catch(() => null),
          api.getProjects().catch(() => []),
          api.getCertificates().catch(() => []),
        ]);

        if (profData) setProfile(profData);
        if (projectsData.length > 0 || certsData.length > 0) {
          setStats({
            projects: `${projectsData.length || 8}+`,
            experience: "6+ Months",
            certificates: `${certsData.length || 4}+`,
          });
        }
      } catch (err) {
        console.warn("[About] Using fallback profile data");
      }
    };
    fetchData();
  }, []);

  const aboutIntro = profile?.about || "I'm an undergraduate at the Sri Lanka Institute of Information Technology (SLIIT), specializing in Information Technology.";

  return (
    <section id="about" className="about section-block">
      <div className="section-wrap">
        <p className="section-label">About me</p>
        <h2 className="section-heading">
          Turning ideas into
          <br />
          digital experiences
        </h2>
        <p className="section-sub about-intro">{aboutIntro}</p>
        <p className="about-body">
          My strengths include full-stack software development, database design, REST API architecture, and team collaboration. I&apos;m motivated by continuous learning and building production-grade code — whether on the front end with React or on the server with Node.js and Spring Boot.
        </p>

        <div className="about-stats">
          {[
            { value: stats.projects, label: "Projects completed" },
            { value: stats.experience, label: "Professional experience" },
            { value: stats.certificates, label: "Certificates earned" },
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
