import React from "react";
import "./Footer.css";
import footer_logo from "../../assets/footer_logo.svg";
import user_icon from "../../assets/user_icon.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_top">
        {/* <div className="footer_top_left">
          <img src={footer_logo} alt="Footer Logo" />
          <p>I am Full Stack Developer </p>
        </div> */}

        {/* <div className="footer_top_right">
          <div className="footer_email_input">
            <img src={user_icon} alt="" />
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="footer_subscribe">Subscribe</div>
        </div> */}
      </div>
      <hr />

      <div className="footer_bottom">
        <div className="footer_bottom_left">
          @2025 Kumodya Thamadi. All rights Reserved
        </div>

        <div className="footer_bottom_right">
          <p>Term of services</p>
          <p>Privacy Policy</p>
          
        </div>
      </div>
    </div>
  );
}

export default Footer;
