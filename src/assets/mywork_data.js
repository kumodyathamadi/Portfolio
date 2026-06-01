import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.jpg";
import mo1 from "../assets/mo1.jpeg";
import prj1 from "../assets/prj_1.png";
import prj2 from "../assets/prj_2.png";
import prj3 from "../assets/prj_3.png";

const mywork_data = [
  {
    w_no: 11,
    w_name: "Online Food Delivery Application",
    w_img: img7,
    featured: true,
    subtitle: "Full-Stack MERN Food Delivery Web App",
    w_desc:
      "A full-stack Online Food Delivery Web Application built using the MERN stack to understand real-world full-stack development concepts. Features secure authentication, food browsing, cart management, online payment, and real-time delivery tracking.",
    bullets: [
      "Secure user registration & login with JWT authentication",
      "Search food items and add to cart",
      "Online payment integration with Stripe (test mode)",
      "Real-time delivery status tracking",
      "Admin panel: add/remove food items, manage listings & order status",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Stripe", "MERN"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 9,
    w_name: "Smart Campus Operations Hub",
    w_img: img5,
    featured: true,
    subtitle: "Full-Stack Facility & Incident Management Platform",
    w_desc:
      "A full-stack web application designed to modernize university operations by integrating facility management, booking workflows, and incident handling into one unified platform.",
    bullets: [
      "Resource & facility management",
      "Booking system with approval workflow",
      "Incident/ticket management with real-time tracking",
      "Notifications for seamless communication",
      "Secure authentication with Firebase OAuth 2.0 and role-based access",
    ],
    tags: ["Spring Boot", "React", "MongoDB", "Firebase", "REST API"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 10,
    w_name: "Online Counseling Management System",
    w_img: img6,
    featured: true,
    subtitle: "MERN Stack Counseling Appointment Web App",
    w_desc:
      "A full-stack Online Counseling Management Web Application to simplify and improve the counseling appointment process for university students.",
    bullets: [
      "Admin & Counselor Management module",
      "Counselor and course management features",
      "CRUD operations and scheduling functionalities",
      "API integration and automated testing with Playwright",
    ],
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Playwright", "Vite"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 6,
    w_name: "IT Help Desk System",
    w_img: prj1,
    featured: true,
    subtitle: "Internship Project — Internal IT Issue Tracking Platform",
    w_desc:
      "During my internship, I contributed to the development of an internal web-based IT Help Desk System designed to streamline the reporting, tracking, and resolution of IT issues such as hardware, software, network, and new system implementation requests. This system significantly improved response time, accountability, and communication between employees and the IT Department.",
    bullets: [
      "Streamlined IT issue reporting and tracking workflow",
      "Covers hardware, software, network & new system requests",
      "Improved response time and accountability between staff and IT",
      "Role: Assisted in system development, testing, and basic deployment under supervision",
    ],
    tags: ["PHP", "AJAX", "JSON", "SQL", "MySQL"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 7,
    w_name: "Grievances Management System",
    w_img: prj2,
    featured: true,
    subtitle: "Internship Project — Organizational Grievance Tracking Platform",
    w_desc:
      "My second internship project — a Grievances Management System designed to efficiently manage, track, and resolve grievances within an organization. The system ensures transparency, structured workflows, and timely responses, improving overall issue-handling processes. This project further strengthened my hands-on experience in full-stack web development and real-world problem solving.",
    bullets: [
      "Structured grievance submission and tracking workflow",
      "Transparency and accountability through status visibility",
      "Timely resolution with automated notifications",
      "Improved overall organizational issue-handling processes",
    ],
    tags: ["PHP", "AJAX", "JSON", "SQL", "MySQL"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 8,
    w_name: "Employee Task Management System",
    w_img: prj3,
    featured: true,
    subtitle: "Full-Stack Task & Workforce Management App",
    w_desc:
      "An Employee Task Management System designed to help organizations efficiently assign, track, and manage tasks across their workforce. Streamlines productivity and accountability within teams.",
    bullets: [
      "Task assignment and tracking across employees",
      "Status updates and progress monitoring",
      "Role-based access for managers and employees",
      "Dashboard overview of team workload and deadlines",
    ],
    tags: ["MERN", "React", "Node.js", "MongoDB", "Express.js"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 1,
    w_name: "Personal Portfolio Website",
    w_img: img1,
    featured: true,
    subtitle: "My Personal Developer Portfolio — Built with React",
    w_desc:
      "My personal portfolio website where I showcase my projects, skills, and journey as a developer. Built using React, this is an exciting step in sharing my technical work and growth with the world.",
    bullets: [
      "Showcases projects, skills, and developer journey",
      "Built with React for a fast, component-driven experience",
      "Responsive and modern design across all devices",
    ],
    tags: ["React", "CSS", "Portfolio", "Responsive"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 2,
    w_name: "Fluent Future Academy",
    w_img: img2,
    featured: true,
    subtitle: "Scalable Online English Learning Platform — MERN Stack",
    w_desc:
      "A scalable Online English Learning Platform built using the MERN Stack. It seamlessly integrates student management, employee management, finance management, program management, and exam management to deliver an optimized and engaging learning experience.",
    bullets: [
      "Easy student registration and dynamic course management",
      "Real-time class scheduling and availability tracking",
      "Interactive dashboards for students, lecturers, and employees",
      "Finance management and real-time reporting",
      "Program and exam management with live updates",
      "Secure, scalable architecture with high availability",
    ],
    tags: ["Node.js", "Express.js", "React", "MongoDB", "MERN"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 3,
    w_name: "Online Hotel Room Booking System",
    w_img: img3,
    featured: true,
    subtitle: "Frontend Hotel Booking UI — HTML, CSS & JavaScript",
    w_desc:
      "A Simple Online Hotel Room Booking System built with HTML, CSS, and JavaScript, designed to offer a seamless user experience for guests booking rooms online. A great showcase of frontend development and UI design skills.",
    bullets: [
      "Room type selection with detailed descriptions",
      "Image gallery showcasing property and rooms",
      "Property details and amenities overview",
      "Functional booking form for reservations",
    ],
    tags: ["HTML", "CSS", "JavaScript", "UI/UX", "Frontend"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 4,
    w_name: "User Tracking System",
    w_img: img4,
    featured: true,
    subtitle: "MERN Stack CRUD Application",
    w_desc:
      "A User Tracking System developed using the MERN stack. A simple yet effective CRUD application for managing and tracking user records within an organization.",
    bullets: [
      "Create, read, update, and delete user records",
      "MERN stack full-stack architecture",
      "Clean and simple UI for easy user management",
    ],
    tags: ["MongoDB", "Express.js", "React", "Node.js", "MERN", "CRUD"],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    w_no: 5,
    w_name: "EZENGLISH",
    w_img: mo1,
    featured: true,
    subtitle: "Mobile English Learning App — Kotlin & XML",
    w_desc:
      "My first project — EZENGLISH, an easy-to-use online English learning mobile application. Users can learn English online and advance their proficiency with the help of top-notch courses and resources. Accessible to children, teenagers, employees, and anyone who wants to learn English at home or anywhere they choose.",
    bullets: [
      "Categorized courses and learning resources",
      "Home page, categorized jobs, and job application flow",
      "XML-based UI for a clean and modern design",
      "UI/UX designed with Figma",
      "Integrated secure payment gateway",
    ],
    tags: ["Kotlin", "XML", "Android", "Figma", "UI/UX"],
    liveUrl: null,
    sourceUrl: null,
  },
];

export default mywork_data;
