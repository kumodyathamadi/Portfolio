import React from "react";
import "./Work.css";
import miamii from "../../assets/miamii.png";

function Education() {
  return (
    <div id="work" className="work">
    <div className="education-section">
      <div className="my">
        <br></br>
        <h1>Professional Experience</h1>
      </div>

      {/* Container for all education blocks */}
      <div className="education-content">
        {/* Education Block 1 */}
        <div className="education-item">
          {/* Left Card */}
          <div className="education-card">
            
            <p><br></br><br></br>
            I have over 6 months of internship experience at Miami Clothing Pvt. Ltd.
            </p>
            <img src={miamii} alt="Miami Clothing Pvt. Ltd. Logo" height={80} width={90} />

          </div>

          {/* Right Details */}
          <div className="education-details">
            <h2>Intern Software Developer || Miami Clothing PVT (LTD)</h2>
            <hr />
            <p className="education-date">June 2025 - December 2025</p>

            <h3>Projects </h3>
            <ul>
              <li>
                
                
                Designed and developed a Grievance Management System during my
                internship using PHP, MySQL, HTML, CSS, JavaScript, jQuery,
                JSON, and AJAX, while also gaining practical experience with
                Navicat for database management..
              </li>

              <li>
                Designed and developed an IT Help Desk System during my
                internship using PHP, MySQL, HTML, CSS, JavaScript, jQuery,
                JSON, and AJAX, contributing to improved internal support
                processes.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Education;
