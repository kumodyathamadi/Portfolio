import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Skills from "./Components/Skills/Skills";
import Work from "./Components/Work/Work";
import Education from "./Components/Education/Education";
import MyWork from "./Components/MyWork/MyWork";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import CustomCursor from "./Components/CustomCursor/CustomCursor";

const App = () => {
  return (
    <div className="app-shell">
      <div className="app-bg" aria-hidden>
        <div className="app-bg-orb app-bg-orb--a" />
        <div className="app-bg-orb app-bg-orb--b" />
        <div className="app-bg-grid" />
      </div>
      <CustomCursor />
      <NavBar />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Education />
      <MyWork />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
