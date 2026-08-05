import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Hero.css";
import mine from "../../assets/mine.png";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { api } from "../../services/api";

function Hero() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.getProfile();
        setProfile(data);
      } catch (err) {
        console.warn("[Hero] Using default profile fallback");
      }
    };
    fetchProfile();
  }, []);

  const name = profile?.name || "Kumodya Thamadi";
  const tagline = profile?.title || "IT undergraduate at SLIIT building thoughtful web experiences with React, Node, and modern databases.";
  const about = profile?.about || "Passionate Information Technology student specializing in Full-Stack Web Development, REST APIs, and Database Architecture.";
  const photo = profile?.image || mine;
  const resumeUrl = profile?.resumeUrl || "#";
  const location = profile?.location || "Colombo, Sri Lanka";

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
            {name}
          </motion.h1>
          <motion.p
            className="hero-tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {tagline}
          </motion.p>
          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            {about}
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
              href={resumeUrl}
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
            <li>{location}</li>
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
            <img src={photo} alt={name} className="hero-photo" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
