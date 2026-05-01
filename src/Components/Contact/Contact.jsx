import React, { useState } from "react";
import "./Contact.css";
import Modal from "../Modal/Modal";

const EMAIL = "kumodyathamadi@gmail.com";

function Contact() {
  const [feedback, setFeedback] = useState(null);

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
          Accept: "application/json",
        },
        body: json,
      }).then((r) => r.json());

      if (res.success) {
        event.target.reset();
        setFeedback({
          title: "Message sent",
          message: "Thanks for reaching out — I’ll get back to you soon.",
          ok: true,
        });
      } else {
        setFeedback({
          title: "Couldn’t send",
          message: "Please try again in a moment.",
          ok: false,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFeedback({
        title: "Something went wrong",
        message: "Check your connection and try again.",
        ok: false,
      });
    }
  };

  return (
    <section id="contact" className="contact section-block">
      <div className="section-wrap">
        <p className="section-label">Get in touch</p>
        <h2 className="section-heading">Let&apos;s work together</h2>
        <p className="section-sub contact-lead">
          Open to collaborations, internships, and project conversations. Send a
          message or email — I&apos;d love to hear from you.
        </p>

        <div className="contact-grid">
          <div className="contact-info">
            <h3 className="contact-info-title">Contact information</h3>
            <div className="contact-rows">
              <div className="contact-row">
                <span className="contact-label">Email</span>
                <a href={`mailto:${EMAIL}`} className="contact-value" data-cursor-hover>
                  {EMAIL}
                </a>
              </div>
              <div className="contact-row">
                <span className="contact-label">Location</span>
                <span className="contact-value">Colombo, Sri Lanka</span>
              </div>
            </div>

            <a
              className="btn btn-primary contact-mailto"
              href={`mailto:${EMAIL}`}
              data-cursor-hover
            >
              Send an email
            </a>
            <p className="contact-availability">
              Availability: Open to opportunities
            </p>
          </div>

          <form onSubmit={onSubmit} className="contact-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Write your message..."
              required
            />
            <button className="btn btn-primary" type="submit" data-cursor-hover>
              Send message
            </button>
          </form>
        </div>
      </div>

      <Modal
        isOpen={!!feedback}
        onClose={() => setFeedback(null)}
        title={feedback?.title}
      >
        {feedback && (
          <p
            className={
              feedback.ok ? "contact-popup-msg ok" : "contact-popup-msg err"
            }
          >
            {feedback.message}
          </p>
        )}
      </Modal>
    </section>
  );
}

export default Contact;
