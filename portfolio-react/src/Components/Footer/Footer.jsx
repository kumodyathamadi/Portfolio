import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-inner">
        <p className="footer-built">
          Designed &amp; built by{" "}
          <strong>Kumodya Thamadi</strong>
        </p>
        <p className="footer-copy">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
