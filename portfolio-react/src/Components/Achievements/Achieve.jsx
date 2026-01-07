import React from "react";
import "./Achieve.css";
import ct1 from "../../assets/ct1.jpg";
import ct2 from "../../assets/ct2.jpg";
import ct3 from "../../assets/ct3.jpg";
import theme_pattern from "../../assets/theme_pattern.svg";
import ct4 from "../../assets/ct4.jpg";

// Certificate data should be declared outside the component's return
const certificateData = [
  {
    title: "Python for Beginners Course",
    issuer: "Universiry of Moratuwa",
    image: ct4, // ✅ Store the image path here
  },
  {
    title: "Web Design for Beginners",
    issuer: "Universiry of Moratuwa",
    image: ct3, // ✅ Store the image path here
  },
  {
    title: "SQL Analytics and BI on Databricks",
    issuer: "Simplilearn",
    image: ct1, // ✅ Store the image path here
  },
  {
    title: "Handling,storing & managing data for information management",
    issuer: "Unicef",
    image: ct2, // ✅ Store the image path here
  },
  
];

function Achieve() {
  return (
    <div className="certificates">
      <div id="achievements" className="mywork">
        <div className="mywork-title">
          <h1>My Achievements</h1>
          <img src={theme_pattern} alt="" />
        </div>
      </div>

      <div className="certificates-container">
        {certificateData.map((cert, index) => (
          <div key={index} className="certificate-card">
            <img src={cert.image} alt={cert.title} />
            <h2>{cert.title}</h2>
            <p>Issued by {cert.issuer}</p>
            <a href={cert.link} target="_blank" rel="noopener noreferrer">
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achieve;
