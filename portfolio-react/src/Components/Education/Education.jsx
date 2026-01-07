import React from "react";
import "./Education.css";
import sliit from "../../assets/sliit.webp";
import aquainas from "../../assets/aquinas.jpg";

import mrc from "../../assets/mrc.jpeg";

function Education() {
  return (
    
    <div className="education-section">
      <div className="my">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Educational Background</h1>
       
      </div>

      {/* Container for all education blocks */}
      <div className="education-content">
        {/* Education Block 1 */}
        <div className="education-item">
          {/* Left Card */}
          <div className="education-card">
            <div className="education-rating">★★★★★</div>
            <p>
              Pursuing a degree with a focus on software engineering, actively
              engaging in various programming languages and technologies.
            </p>
            <img src={sliit} alt="SLIIT Logo" />
          </div>

          {/* Right Details */}
          <div className="education-details">
            <h2>
              SLIIT - Bachelor of Science - BSc, Information Technology,
              Specialize in Information Technology
            </h2>
            <hr />
            <p className="education-date">Jul 2023 - Jul 2027</p>

            <h3>Highlights</h3>
            <ul>
              <li>Sri Lanka Institute of Information Technology (SLIIT)</li>
              <li>Grade: 3rd year 2nd semester</li>
              <li>
                Skills:
                <br />
                Python, Microsoft Office, Front-End Development, Problem
                Solving, PHP, SQL, English, Team Leadership, React.js,
                Presentations, Back-End Web Development, Information Technology,
                JavaScript, Kotlin, Machine Learning
              </li>
            </ul>
          </div>
        </div>

        {/* Education Block 2 */}
        <div className="education-item">
          {/* Left Card */}
          <div className="education-card">
            <div className="education-rating">★★★★</div>
            <p>
              Successfully achieved the Certificate in Professional English and
              Information Technology, improving my expertise in IT and
              professional English usage
            </p>
            <img src={aquainas} alt="SLIIT Logo" />
          </div>

          {/* Right Details */}
          <div className="education-details">
            <h2>Aquinas College of Higher Studies -Borella</h2>
            <hr />
            <p className="education-date">March 2023</p>

            <h3>Highlights</h3>
            <ul>
              <li>
                Certificate in Professional English And Information Technology
              </li>
              <li>Grade: Successfully Completed</li>
              <li>
                Skills:
                <br />
                Spoken English, IT
              </li>
            </ul>
          </div>
        </div>

        {/* Education Block 3 */}
        <div className="education-item">
          {/* Left Card */}
          <div className="education-card">
            <div className="education-rating">★★★★</div>
            <p>
              "Completed (G.C.E.) Ordinary Level and Advanced Level studies at
              Mahinda Rajapaksha College, Homagama, where I gained comprehensive
              knowledge across multiple disciplines and actively engaged in both
              academic and extracurricular activities."
            </p>
            <img src={mrc} alt="SLIIT Logo" />
          </div>

          {/* Right Details */}
          <div className="education-details">
            <h2>Mahinda Rajapaksha College - Homagama</h2>
            <hr />
            <p className="education-date">2014 - 2022</p>

            <h3>Highlights</h3>
            <ul>
              <li>Grade: 6 to 13</li>
              <li>
                G.C.E Ordinary Level<br></br>
                G.C.E Advanced Level
              </li>

              <li>
                Skills:
                <br />
                Problem Solving, Communication, Team Leadership, Creative
                Problem Solving
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
