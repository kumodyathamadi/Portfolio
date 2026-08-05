import React, { useEffect, useState } from "react";
import "./Work.css";
import miamii from "../../assets/miamii.png";
import { api } from "../../services/api";

function Work() {
  const [expList, setExpList] = useState([]);

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const data = await api.getExperience();
        if (Array.isArray(data) && data.length > 0) {
          setExpList(data);
        }
      } catch (err) {
        console.warn("[Work] Using static experience fallback");
      }
    };
    fetchExp();
  }, []);

  const displayList = expList.length > 0 ? expList : [
    {
      company: "Miami Clothing (Pvt) Ltd",
      position: "Intern Software Developer",
      duration: "June 2025 – December 2025",
      summary: "Six months of hands-on development on production internal systems, collaborating on requirements, implementation, and testing.",
      responsibilities: [
        "Built a Grievance Management System using PHP, MySQL, HTML, CSS, JavaScript, jQuery, JSON, and AJAX; used Navicat for database work.",
        "Delivered an IT Help Desk System with the same stack to improve internal support workflows and ticket handling.",
      ],
      logo: miamii,
    }
  ];

  return (
    <section id="experience" className="work section-block">
      <div className="section-wrap">
        <p className="section-label">Experience</p>
        <h2 className="section-heading">Professional experience</h2>
        <p className="section-sub">
          Work experience building internal tools, web services, and full-stack software.
        </p>

        {displayList.map((item, idx) => (
          <article className="exp-card" key={item._id || item.company + idx} style={{ marginBottom: "1.5rem" }}>
            <div className="exp-card-head">
              <div className="exp-logo-wrap">
                <img
                  src={item.logo || miamii}
                  alt={item.company}
                  width={72}
                  height={72}
                  className="exp-logo"
                />
              </div>
              <div className="exp-card-titles">
                <h3 className="exp-role">{item.position}</h3>
                <p className="exp-company">{item.company}</p>
                <p className="exp-dates">{item.duration}</p>
              </div>
            </div>
            <div className="exp-card-body">
              {item.summary && <p className="exp-summary">{item.summary}</p>}
              {item.responsibilities && item.responsibilities.length > 0 && (
                <>
                  <h4 className="exp-h4">Highlights & Responsibilities</h4>
                  <ul className="exp-list">
                    {item.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Work;
