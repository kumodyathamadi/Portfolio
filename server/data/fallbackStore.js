import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "store.json");

// Ensure data folder exists
const dataDir = path.dirname(dataFilePath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const defaultStore = {
  profile: {
    name: "Kumodya Thamadi",
    title: "Full-Stack Software Developer",
    about: "Passionate Information Technology student at SLIIT specializing in Full-Stack Web Application Development (MERN & Spring Boot), RESTful API design, and Database Architecture.",
    image: "/src/assets/mine2.jpg",
    email: "kumodyathamadi@gmail.com",
    phone: "+94 77 123 4567",
    location: "Colombo, Sri Lanka",
    resumeUrl: "https://mysliit-my.sharepoint.com/my?id=%2Fpersonal%2Fit23331136%5Fmy%5Fsliit%5Flk%2FDocuments%2FINTERN%2FKUMODYA%20CV%2Epdf&parent=%2Fpersonal%2Fit23331136%5Fmy%5Fsliit%5Flk%2FDocuments%2FINTERN&ga=1",
    githubUrl: "https://github.com/",
    linkedinUrl: "https://linkedin.com/",
  },
  projects: [
    {
      _id: "p1",
      title: "Online Food Delivery Application",
      subtitle: "Full-Stack MERN Food Delivery Web App",
      description: "A full-stack Online Food Delivery Web Application built using the MERN stack. Features secure authentication, food browsing, cart management, online payment, and real-time delivery tracking.",
      category: "MERN Stack",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Stripe", "MERN"],
      bullets: [
        "Secure user registration & login with JWT authentication",
        "Search food items and add to cart",
        "Online payment integration with Stripe (test mode)",
        "Real-time delivery status tracking",
        "Admin panel: add/remove food items, manage listings & order status",
      ],
      image: "/src/assets/img7.jpg",
      featured: true,
      status: "Completed",
    },
    {
      _id: "p2",
      title: "Smart Campus Operations Hub",
      subtitle: "Full-Stack Facility & Incident Management Platform",
      description: "A full-stack web application designed to modernize university operations by integrating facility management, booking workflows, and incident handling into one unified platform.",
      category: "Spring Boot",
      technologies: ["Spring Boot", "React", "MongoDB", "Firebase", "REST API"],
      bullets: [
        "Resource & facility management",
        "Booking system with approval workflow",
        "Incident/ticket management with real-time tracking",
        "Notifications for seamless communication",
        "Secure authentication with Firebase OAuth 2.0 and role-based access",
      ],
      image: "/src/assets/img5.png",
      featured: true,
      status: "Completed",
    },
    {
      _id: "p3",
      title: "Online Counseling Management System",
      subtitle: "MERN Stack Counseling Appointment Web App",
      description: "A full-stack Online Counseling Management Web Application to simplify and improve the counseling appointment process for university students.",
      category: "MERN Stack",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "Playwright", "Vite"],
      bullets: [
        "Admin & Counselor Management module",
        "Counselor and course management features",
        "CRUD operations and scheduling functionalities",
      ],
      image: "/src/assets/img6.png",
      featured: true,
      status: "Completed",
    },
    {
      _id: "p4",
      title: "IT Help Desk System",
      subtitle: "Internship Project — Internal IT Issue Tracking Platform",
      description: "Internal web-based IT Help Desk System designed to streamline the reporting, tracking, and resolution of IT issues.",
      category: "PHP & SQL",
      technologies: ["PHP", "AJAX", "JSON", "SQL", "MySQL"],
      bullets: [
        "Streamlined IT issue reporting and tracking workflow",
        "Covers hardware, software, network & new system requests",
        "Improved response time and accountability between staff and IT",
      ],
      image: "/src/assets/prj_1.png",
      featured: true,
      status: "Completed",
    },
    {
      _id: "p5",
      title: "Grievances Management System",
      subtitle: "Internship Project — Organizational Grievance Tracking Platform",
      description: "A Grievances Management System designed to efficiently manage, track, and resolve grievances within an organization.",
      category: "PHP & SQL",
      technologies: ["PHP", "AJAX", "JSON", "SQL", "MySQL"],
      bullets: [
        "Structured grievance submission and tracking workflow",
        "Transparency and accountability through status visibility",
      ],
      image: "/src/assets/prj_2.png",
      featured: true,
      status: "Completed",
    },
  ],
  certificates: [
    {
      _id: "c1",
      title: "Python for Beginners Course",
      issuer: "University of Moratuwa",
      issueDate: "2024",
      image: "/src/assets/ct4.jpg",
      category: "Programming",
    },
    {
      _id: "c2",
      title: "Web Design for Beginners",
      issuer: "University of Moratuwa",
      issueDate: "2024",
      image: "/src/assets/ct3.jpg",
      category: "Web Development",
    },
    {
      _id: "c3",
      title: "SQL Analytics and BI on Databricks",
      issuer: "Simplilearn",
      issueDate: "2024",
      image: "/src/assets/ct1.jpg",
      category: "Data & BI",
    },
    {
      _id: "c4",
      title: "Handling, storing & managing data",
      issuer: "UNICEF",
      issueDate: "2024",
      image: "/src/assets/ct2.jpg",
      category: "Data Management",
    },
  ],
  skills: [
    { _id: "s1", name: "JavaScript", category: "Languages", level: "Advanced" },
    { _id: "s2", name: "PHP", category: "Languages", level: "Intermediate" },
    { _id: "s3", name: "SQL", category: "Languages", level: "Advanced" },
    { _id: "s4", name: "HTML5 & CSS3", category: "Languages", level: "Expert" },
    { _id: "s5", name: "React", category: "Frontend", level: "Advanced" },
    { _id: "s6", name: "Node.js & Express", category: "Backend & Data", level: "Advanced" },
    { _id: "s7", name: "Spring Boot", category: "Backend & Data", level: "Intermediate" },
    { _id: "s8", name: "MongoDB & MySQL", category: "Backend & Data", level: "Advanced" },
    { _id: "s9", name: "REST APIs", category: "Backend & Data", level: "Advanced" },
    { _id: "s10", name: "Git & GitHub", category: "Tools", level: "Advanced" },
  ],
  education: [
    {
      _id: "e1",
      degree: "BSc (Hons) in Information Technology",
      institute: "Sri Lanka Institute of Information Technology (SLIIT)",
      duration: "Jul 2023 – Jul 2027",
      location: "Colombo, Sri Lanka",
      badge: "Current",
      logo: "/src/assets/sliit.webp",
      achievements: [
        "Specialization in Information Technology",
        "Coursework across Python, React, PHP, SQL, Kotlin, and MERN stack",
      ],
    },
    {
      _id: "e2",
      degree: "Certificate in Professional English & IT",
      institute: "Aquinas College of Higher Studies",
      duration: "March 2023",
      location: "Borella, Sri Lanka",
      badge: "2023",
      logo: "/src/assets/aquinas.jpg",
      achievements: ["English communication skills and core IT foundation"],
    },
    {
      _id: "e3",
      degree: "Secondary Education",
      institute: "Mahinda Rajapaksha College — Homagama",
      duration: "2014 – 2022",
      badge: "2014–2022",
      logo: "/src/assets/mrc.jpeg",
      achievements: ["Completed G.C.E. O/L and A/L examinations"],
    },
  ],
  experience: [
    {
      _id: "ex1",
      company: "Miami Clothing (Pvt) Ltd",
      position: "Intern Software Developer",
      duration: "June 2025 – December 2025",
      summary: "Six months of hands-on development on production internal systems, collaborating on requirements, implementation, and testing.",
      responsibilities: [
        "Built a Grievance Management System using PHP, MySQL, HTML, CSS, JavaScript, jQuery, JSON, and AJAX; used Navicat for database work.",
        "Delivered an IT Help Desk System with the same stack to improve internal support workflows and ticket handling.",
      ],
      technologies: ["PHP", "MySQL", "JavaScript", "jQuery", "AJAX", "JSON", "Navicat"],
      logo: "/src/assets/miamii.png",
    },
  ],
};

export const getStore = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultStore, null, 2));
    return defaultStore;
  }
  try {
    const raw = fs.readFileSync(dataFilePath, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed.projects || parsed.projects.length === 0) {
      fs.writeFileSync(dataFilePath, JSON.stringify(defaultStore, null, 2));
      return defaultStore;
    }
    return parsed;
  } catch (e) {
    return defaultStore;
  }
};

export const saveStore = (store) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(store, null, 2));
};
