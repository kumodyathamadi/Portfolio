import React, { useEffect } from "react";

function SEO({ title, description, keywords, image, url }) {
  useEffect(() => {
    // Page Title
    if (title) {
      document.title = `${title} | Portfolio Platform`;
    } else {
      document.title = "Kumodya Thamadi | Full-Stack Software Developer Portfolio";
    }

    // Helper function to set meta tag
    const setMetaTag = (selector, attribute, value) => {
      if (!value) return;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (selector.startsWith('meta[name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) element.setAttribute("name", name);
        } else if (selector.startsWith('meta[property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          if (prop) element.setAttribute("property", prop);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    const defaultDesc =
      description ||
      "Personal developer portfolio showcasing full-stack web applications, projects, skills, education, and professional certifications.";

    setMetaTag('meta[name="description"]', "content", defaultDesc);
    setMetaTag('meta[name="keywords"]', "content", keywords || "React, MERN, Spring Boot, Full-Stack, Portfolio, Web Developer");
    setMetaTag('meta[property="og:title"]', "content", title || "Kumodya Thamadi - Portfolio");
    setMetaTag('meta[property="og:description"]', "content", defaultDesc);
    if (image) setMetaTag('meta[property="og:image"]', "content", image);
    if (url) setMetaTag('meta[property="og:url"]', "content", url);
  }, [title, description, keywords, image, url]);

  return null;
}

export default SEO;
