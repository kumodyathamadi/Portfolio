import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import mo1 from "../assets/mo1.jpeg";
import prj1 from "../assets/prj_1.png";
import prj2 from "../assets/prj_2.png";
import prj3 from "../assets/prj_3.png";

const mywork_data = [
  {
    w_no: 6,
    w_name: "Featured build",
    w_img: prj1,
    featured: true,
    subtitle: "Production-ready UI & responsive layouts",
    w_desc:
      "A polished front-end showcase emphasizing layout, typography, and responsive behavior across breakpoints.",
    bullets: [
      "Component-driven structure for scalable styling",
      "Responsive grid and typography tuned for all screen sizes",
      "Accessible contrast and focus states for core interactions",
    ],
    tags: ["React", "CSS", "Responsive", "UI"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 7,
    w_name: "Web experience",
    w_img: prj2,
    featured: true,
    subtitle: "Interactive interface patterns",
    w_desc:
      "Interactive interface patterns with a focus on clarity, motion, and consistent component styling.",
    bullets: [
      "Reusable UI primitives with consistent spacing",
      "Motion used sparingly for feedback and hierarchy",
      "State-driven views for a smoother user flow",
    ],
    tags: ["JavaScript", "UX", "Components"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 8,
    w_name: "Product screen",
    w_img: prj3,
    featured: true,
    subtitle: "Dashboard-style composition",
    w_desc:
      "Dashboard-style composition with cards, hierarchy, and emphasis on scannable content.",
    bullets: [
      "Card-based layout for at-a-glance metrics",
      "Clear hierarchy between primary and secondary actions",
      "Dark-friendly palette aligned with product dashboards",
    ],
    tags: ["UI", "Dashboard", "Product"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 1,
    w_name: "Creative layout",
    w_img: img1,
    featured: false,
    w_desc:
      "Exploration of grid systems, imagery, and gradient accents for a modern landing feel.",
    tags: ["Landing", "CSS", "Layout"],
  },
  {
    w_no: 2,
    w_name: "Brand-forward page",
    w_img: img2,
    featured: false,
    w_desc:
      "Strong visual identity with balanced whitespace and call-to-action placement.",
    tags: ["Branding", "Web", "HTML/CSS"],
  },
  {
    w_no: 3,
    w_name: "Interface study",
    w_img: img3,
    featured: false,
    w_desc:
      "Component-driven layout with attention to spacing, contrast, and accessibility basics.",
    tags: ["UI", "Accessibility", "Study"],
  },
  {
    w_no: 4,
    w_name: "Portfolio piece",
    w_img: img4,
    featured: false,
    w_desc:
      "Case-style presentation combining imagery and narrative blocks for storytelling.",
    tags: ["Portfolio", "Story", "Design"],
  },
  {
    w_no: 5,
    w_name: "Mobile-first view",
    w_img: mo1,
    featured: false,
    w_desc:
      "Touch-friendly patterns and readable typography tuned for smaller screens.",
    tags: ["Mobile", "UX", "Responsive"],
  },
];

export default mywork_data;
