import React, { useRef } from "react";
import Navbar from "../../components/NAVBAR/Navbar";

import Intro from "./Intro";
import About from "./About";
import Service from "./Service";
import Projects from "./Projects";
import Contact from "./Contact";
import Footer from "../../components/FOOTER/Footer";

const Index = () => {
  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const serviceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToIntro = () =>
    introRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToAbout = () =>
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToService = () =>
    serviceRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToProjects = () =>
    projectsRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToContact = () =>
    contactRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      <Navbar
        scrollToIntro={scrollToIntro}
        scrollToAbout={scrollToAbout}
        scrollToService={scrollToService}
        scrollToProjects={scrollToProjects}
        scrollToContact={scrollToContact}
      />
      <div className="w-full bg-white dark:bg-gray-900 text-black dark:text-white">
        <div ref={introRef}>
          <Intro />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={serviceRef}>
          <Service />
        </div>
        <div ref={projectsRef}>
          <Projects />
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
