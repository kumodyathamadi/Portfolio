import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./NavBar.css";
import AnchorLink from "react-anchor-link-smooth-scroll";
import menu_open from "../../assets/menu_open.svg";
import menu_close from "../../assets/menu_close.svg";

const RESUME_URL =
  "https://mysliit-my.sharepoint.com/:b:/g/personal/it23331136_my_sliit_lk/IQDODqLGPa6SQ4vwVmP-XlCcAWoSNM8tz5aS5q88x4-I-yU?e=zClNvT";

function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMenu = () => setMobileOpen(false);

  const linkItem = (label, href) => (
    <li>
      <AnchorLink
        className="anchor_link nav-link-inner"
        offset={56}
        href={href}
        onClick={closeMenu}
      >
        <span data-cursor-hover>{label}</span>
      </AnchorLink>
    </li>
  );

  return (
    <motion.header
      className="navbar-wrap"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <div className="navbar">
        <AnchorLink
          className="navbar-brand anchor_link"
          offset={56}
          href="#home"
          onClick={closeMenu}
        >
          <span className="navbar-brand-text">KumodyaThamadi</span>
        </AnchorLink>

        <img
          src={menu_open}
          onClick={() => setMobileOpen(true)}
          alt="Open menu"
          className="nav_mob_open"
          data-cursor-hover
        />

        <nav>
          <ul className={`nav-menu ${mobileOpen ? "nav-menu--open" : ""}`}>
            <img
              src={menu_close}
              alt="Close menu"
              onClick={closeMenu}
              className="nav_mob_close"
              data-cursor-hover
            />
            {linkItem("About", "#about")}
            {linkItem("Skills", "#skills")}
            {linkItem("Experience", "#experience")}
            {linkItem("Education", "#education")}
            {linkItem("Projects", "#projects")}
            {linkItem("Contact", "#contact")}
          </ul>
        </nav>

        <div className="nav-actions">
          <a
            className="nav-resume"
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
          >
            Resume
          </a>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            className="nav-overlay"
            aria-label="Close menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default NavBar;
