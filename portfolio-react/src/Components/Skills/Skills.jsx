import React from "react";
import { motion } from "framer-motion";
import "./Skills.css";
import { skillsByCategory, coreCompetencies } from "../../assets/skills_data";

function Skills() {
  return (
    <section id="skills" className="skills section-block">
      <div className="section-wrap">
        <p className="section-label">My expertise</p>
        <h2 className="section-heading">Skills &amp; technologies</h2>
        <p className="section-sub">
          A practical stack shaped by coursework, internship work, and personal
          projects — focused on web UIs, PHP backends, and relational data.
        </p>

        <div className="skills-grid">
          {skillsByCategory.map((cat, i) => (
            <motion.div
              key={cat.title}
              className="skills-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <h3 className="skills-cat-title">{cat.title}</h3>
              <ul className="skills-pills">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="skills-competencies">
          <h3 className="skills-comp-title">Core competencies</h3>
          <ul className="skills-comp-list">
            {coreCompetencies.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;
