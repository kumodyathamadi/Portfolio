import React from "react";
import "./About.css";
import aboutimg from "../../assets/aboutimg.png";
import mine2 from "../../assets/mine2.jpg";

function About() {
  return (
    <div id="about" className="about">
      <div className="about-title">
        <h1>About me</h1>
        <img src={aboutimg} alt="" />
      </div>

      <div className="about-sections">
        <div className="about-left">
          <img src={mine2} alt="" />
        </div>

        <div className="about-right">
          <div className="about-para">
            <p>
              I enjoy working on new projects, choosing up new skills, and
              keeping up with the most recent developments in IT when I have
              free time. I'm constantly excited to meet like-minded people and
              and collaborative setting.
              technical proficiency,</p>
              <p>I also have excellent leadership, teamwork,
              communication, and project management abilities. I am committed to
              continuous learning and professional growth, and I am eager to
              contribute to innovative software solutions and succeed in dynamic
            </p>
          </div>

          <div className="about-skills">
            <div className="about-skill">
              <p>HTML & CSS</p><hr style={{width:"60%"}}/>
            </div>
            <div className="about-skill">
              <p>JavaScript</p><hr style={{width:"50%"}}/>
            </div>
            <div className="about-skill">
              <p>React</p><hr style={{width:"35%"}}/>
            </div>
            

            <div className="about-skill">
              <p>PHP</p><hr style={{width:"40%"}}/>
            </div>
            <div className="about-skill">
              <p>MYSQL</p><hr style={{width:"45%"}}/>
            </div>
            <div className="about-skill">
              <p>SQL</p><hr style={{width:"40%"}}/>
            </div>

            
          </div>
        </div>
      </div>

      <div className="about-achievements">
        <div className="about-achievement">
          <h1>6+ Months</h1>
          <p>EXPERIENCE</p>
        </div>
        <hr/>

        <div className="about-achievement">
          <h1>8+</h1>
          <p>PROJECTS COMPLETED</p>
        </div>
        <hr/>
        
        
        <hr/>
        
      </div>
    </div>
  );
}

export default About;
