import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Skills.css";
import { api } from "../../services/api";
import { skillsByCategory as defaultCategories, coreCompetencies } from "../../assets/skills_data";

function Skills() {
  const [skillsList, setSkillsList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await api.getSkills();
        if (Array.isArray(data) && data.length > 0) {
          setSkillsList(data);
        }
      } catch (err) {
        console.warn("[Skills] Using static skills fallback");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category if dynamic, otherwise fall back
  let groupedCategories = [];

  if (skillsList.length > 0) {
    const categoriesMap = {};
    skillsList.forEach((s) => {
      const cat = s.category || "General";
      if (!categoriesMap[cat]) categoriesMap[cat] = [];
      categoriesMap[cat].push(s);
    });

    groupedCategories = Object.keys(categoriesMap).map((catName) => ({
      title: catName,
      items: categoriesMap[catName],
    }));
  } else {
    groupedCategories = defaultCategories.map((c) => ({
      title: c.title,
      items: c.items.map((item) => ({ name: item, level: "Intermediate" })),
    }));
  }

  // Filter skills by search query
  const filteredCategories = groupedCategories
    .map((cat) => {
      const filteredItems = cat.items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      return { ...cat, items: filteredItems };
    })
    .filter((cat) => cat.items.length > 0);

  return (
    <section id="skills" className="skills section-block">
      <div className="section-wrap">
        <p className="section-label">My expertise</p>
        <h2 className="section-heading">Skills &amp; technologies</h2>
        <p className="section-sub">
          A practical stack shaped by coursework, internship work, and personal
          projects — managed dynamically through backend CMS.
        </p>

        {/* Live Search Input */}
        <div style={{ marginBottom: "2rem", maxWidth: "400px" }}>
          <input
            type="text"
            className="form-input"
            style={{
              width: "100%",
              padding: "0.75rem 1.25rem",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "12px",
              color: "#fff",
              fontSize: "0.95rem",
            }}
            placeholder="🔍 Search skills (e.g., React, PHP, SQL)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="skills-grid">
          {filteredCategories.map((cat, i) => (
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
                {cat.items.map((skillObj) => (
                  <li key={skillObj.name} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    <span>{skillObj.name}</span>
                    {skillObj.level && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          background: "rgba(168, 85, 247, 0.2)",
                          color: "#c084fc",
                          padding: "0.1rem 0.35rem",
                          borderRadius: "4px",
                          fontWeight: 600,
                        }}
                      >
                        {skillObj.level}
                      </span>
                    )}
                  </li>
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
