import React, { useRef } from "react";
import Navbar from "../../components/NAVBAR/Navbar";

import Intro from "./Intro";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Tools from "./Tools";
import Contact from "./Contact";
import Footer from "../../components/FOOTER/Footer";

const Index = () => {
  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const toolsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToIntro = () =>
    introRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToAbout = () =>
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToExperience = () =>
    experienceRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToProjects = () =>
    projectsRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToTools = () =>
    toolsRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () =>
    contactRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      <Navbar
        scrollToIntro={scrollToIntro}
        scrollToAbout={scrollToAbout}
        scrollToExperience={scrollToExperience}
        scrollToProjects={scrollToProjects}
        scrollToTools={scrollToTools}
        scrollToContact={scrollToContact}
      />
      <div className="w-full bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen overflow-x-hidden">
        <div ref={introRef}>
          <Intro />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={experienceRef}>
          <Experience />
        </div>
        <div ref={projectsRef}>
          <Projects />
        </div>
        <div ref={toolsRef}>
          <Tools />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
