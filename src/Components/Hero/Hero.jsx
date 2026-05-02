import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import mine from "../../assets/mine.png";
import AnchorLink from "react-anchor-link-smooth-scroll";

const RESUME_URL =
  "https://mysliit-my.sharepoint.com/:b:/g/personal/it23331136_my_sliit_lk/IQA4jROddbsWQbhQTjnmbJBiAR_530cwa8I5YZIqq4UvDNw?e=1zKikx";

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="section-wrap hero-inner">
        <div className="hero-copy">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            Kumodya Thamadi
          </motion.h1>
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            IT undergraduate at SLIIT building thoughtful web experiences with
            React, PHP, and modern databases. Passionate about clean interfaces
            and reliable backend workflows.
          </motion.p>
          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            I enjoy statistical computing, software development, and exploring
            new tools — from jQuery and AJAX to full-stack coursework projects.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <AnchorLink
              className="btn btn-primary"
              offset={56}
              href="#projects"
              data-cursor-hover
            >
              View projects
            </AnchorLink>
            <a
              className="btn btn-outline"
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
            >
              Download CV
            </a>
          </motion.div>

          <motion.ul
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.28 }}
          >
            <li>Colombo, Sri Lanka</li>
            <li className="hero-meta-dot" aria-hidden />
            <li>Information Technology undergraduate</li>
            <li className="hero-meta-dot" aria-hidden />
            <li>Open to opportunities</li>
          </motion.ul>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="hero-photo-frame">
            <img src={mine} alt="Kumodya Thamadi" className="hero-photo" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
