import React, { useState } from "react";
import { motion } from "framer-motion";
import "./MyWork.css";
import mywork_data from "../../assets/mywork_data";
import Modal from "../Modal/Modal";

function MyWork() {
  const [active, setActive] = useState(null);
  const featured = mywork_data.filter((p) => p.featured);
  const other = mywork_data.filter((p) => !p.featured);

  return (
    <section id="projects" className="projects section-block">
      <div className="section-wrap">
        <p className="section-label">Portfolio</p>
        <h2 className="section-heading">Featured projects</h2>
        <p className="section-sub">
          A selection of work that highlights UI craft, structure, and
          full-stack coursework — add live links when you publish demos.
        </p>

        <div className="featured-list">
          {featured.map((project, i) => (
            <motion.article
              key={project.w_no}
              className="featured-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
            >
              <div className="featured-visual">
                <span className="featured-pill">Featured project</span>
                <button
                  type="button"
                  className="featured-img-btn"
                  onClick={() => setActive(project)}
                  data-cursor-hover
                >
                  <img src={project.w_img} alt="" />
                </button>
              </div>
              <div className="featured-content">
                <h3 className="featured-title">{project.w_name}</h3>
                {project.subtitle && (
                  <p className="featured-subtitle">{project.subtitle}</p>
                )}
                <p className="featured-desc">{project.w_desc}</p>
                {project.bullets && (
                  <ul className="featured-bullets">
                    {project.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                <div className="featured-tags">
                  {project.tags?.map((t) => (
                    <span key={t} className="featured-tag">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="featured-actions">
                  {project.liveUrl ? (
                    <a
                      className="btn btn-primary btn-sm"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                    >
                      Live demo
                    </a>
                  ) : null}
                  {project.sourceUrl ? (
                    <a
                      className="btn btn-outline btn-sm"
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-hover
                    >
                      Source
                    </a>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setActive(project)}
                      data-cursor-hover
                    >
                      Details
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <h3 className="other-heading">Other notable work</h3>
        <div className="other-grid">
          {other.map((project) => (
            <button
              key={project.w_no}
              type="button"
              className="other-card"
              onClick={() => setActive(project)}
              data-cursor-hover
            >
              <div className="other-thumb">
                <img src={project.w_img} alt="" />
              </div>
              <div className="other-body">
                <p className="other-title">{project.w_name}</p>
                <p className="other-desc">{project.w_desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!active}
        onClose={() => setActive(null)}
        title={active?.w_name}
      >
        {active && (
          <>
            <div className="mywork-modal-img-wrap">
              <img src={active.w_img} alt="" className="mywork-modal-img" />
            </div>
            <p className="mywork-modal-desc">{active.w_desc}</p>
            {active.bullets && (
              <ul className="modal-bullets">
                {active.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            <div className="mywork-modal-tags">
              {active.tags?.map((t) => (
                <span key={t} className="mywork-tag">
                  {t}
                </span>
              ))}
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}

export default MyWork;
