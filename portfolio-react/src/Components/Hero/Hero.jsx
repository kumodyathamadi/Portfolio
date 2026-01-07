import React from "react";
import "./Hero.css";
import mine from "../../assets/mine.png";
import AnchorLink from "react-anchor-link-smooth-scroll";

function Hero() {
  return (
    <div className="hero">
      <img src={mine} alt="" />
      <h1>
        <span>Hello, I'm Kumodya Thamadi </span>
        <br />
        "Welcome to my portfolio ,a showcase of my work, skills, and passion for
        web development."
      </h1>
      <p>
        I am 22-year-old undergraduate girl at the Sri Lanka Institute of
        Information Technology (SLIIT) with a BSc (Hons) in Information
        Technology with a Specialization in Information Technology. I have a
        strong interest in technology and innovation, and I like learning about
        statistical computing, software development, and new trends in
        technology.
      </p>

      <div className="hero-action">
        <div className="hero-connect">
          <AnchorLink className="anchor_link" offset={50} href="#contact">
            <p onClick={() => setMenu("contact")}></p>Connect
          </AnchorLink>
        </div>
        <div className="hero-resume">
        <a
          className="anchor_link"
          href="https://mysliit-my.sharepoint.com/:b:/g/personal/it23331136_my_sliit_lk/IQDODqLGPa6SQ4vwVmP-XlCcAWoSNM8tz5aS5q88x4-I-yU?e=zClNvT"
          target="_blank" // opens in new tab
          rel="noopener noreferrer" // security best practice
        >
          My Resume
        </a>
        </div>
      </div>

      
    </div>
  );
}

export default Hero;
