import React from "react";
import "./Work.css";
import miamii from "../../assets/miamii.png";

function Work() {
  return (
    <section
      id="experience"
      className="work section-block"
    >
      <div className="section-wrap">
        <p className="section-label">Experience</p>
        <h2 className="section-heading">Professional experience</h2>
        <p className="section-sub">
          Internship experience building internal tools with PHP, MySQL, and
          classic web stacks — from database design to AJAX-driven UIs.
        </p>

        <article className="exp-card">
          <div className="exp-card-head">
            <div className="exp-logo-wrap">
              <img
                src={miamii}
                alt=""
                width={72}
                height={72}
                className="exp-logo"
              />
            </div>
            <div className="exp-card-titles">
              <h3 className="exp-role">Intern Software Developer</h3>
              <p className="exp-company">Miami Clothing (Pvt) Ltd</p>
              <p className="exp-dates">June 2025 – December 2025</p>
            </div>
          </div>
          <div className="exp-card-body">
            <p className="exp-summary">
              Six months of hands-on development on production internal systems,
              collaborating on requirements, implementation, and testing.
            </p>
            <h4 className="exp-h4">Highlights</h4>
            <ul className="exp-list">
              <li>
                Built a Grievance Management System using PHP, MySQL, HTML,
                CSS, JavaScript, jQuery, JSON, and AJAX; used Navicat for
                database work.
              </li>
              <li>
                Delivered an IT Help Desk System with the same stack to improve
                internal support workflows and ticket handling.
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Work;
