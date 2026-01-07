import React from "react";
import "./Contact.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import mail_icon from "../../assets/mail_icon.svg";
import location_icon from "../../assets/location_icon.svg";

function Contact() {

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "533dd227-e265-4d46-bcae-8e069e7bbcb2");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        event.target.reset();
        alert("Message sent successfully!");
      } else {
        alert("Message failed to send. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div id="contact" className="Contact">
      <div className="Contact_title">
        <h1>Get in touch</h1>
        <img src={theme_pattern} alt="Theme Pattern" />
      </div>

      <div className="Contact_section">
        <div className="Contact_left">
          <h1>Let's talk</h1>
          <p>
            Feel free to get in touch with me for collaborations, project
            opportunities, or any questions you may have. I’m always open to
            connecting and exploring new ideas!
          </p>

          <div className="Contact_details">
            <div className="Contact_detail">
              <img src={mail_icon} alt="Mail Icon" />
              <p>kumodyathamadi@gmail.com</p>
            </div>

            

            <div className="Contact_detail">
              <img src={location_icon} alt="Location Icon" />
              <p>Colombo</p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="contact_right">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
          />

          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows="8"
            placeholder="Enter Your Message Here"
            required
          ></textarea>

          <button className="contact_submit" type="submit">
            Submit Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
