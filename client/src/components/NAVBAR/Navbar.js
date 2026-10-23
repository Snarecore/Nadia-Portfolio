import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Navbar = ({
  scrollToIntro,
  scrollToAbout,
  scrollToExperience,
  scrollToResearch,
  scrollToProjects,
  scrollToTools,
  scrollToService,
  scrollToContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        navRef.current,
        { y: -15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "opacity,transform",
        }
      );
    },
    { scope: navRef }
  );

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (scrollFn) => {
    if (scrollFn) scrollFn();
    setIsOpen(false);
  };

  const onExperienceClick = scrollToExperience || scrollToService;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 bg-gray-900/85 backdrop-blur-md z-50 border-b border-gray-800 text-white transition-all"
    >
      <div className="max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3">
        <Link
          to={"/"}
          className="group flex items-center gap-2.5 text-white transition-all duration-200"
          aria-label="Nadia - UI/UX Designer"
        >
          <div className="w-8 h-8 rounded-xl bg-gray-850 border border-gray-700/80 group-hover:border-sky-500/60 group-hover:bg-gray-800 flex items-center justify-center transition-all duration-200 shadow-sm">
            <svg
              className="w-4 h-4 text-sky-400 transition-transform duration-200 group-hover:scale-105"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 19V5L18 19V5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors">
              Nadia<span className="text-sky-400">.</span>
            </span>
            <span className="text-[9px] tracking-widest uppercase font-semibold text-gray-400 group-hover:text-gray-300 transition-colors mt-0.5">
              Product Design
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6 text-xs sm:text-sm font-medium text-gray-300">
          <button onClick={scrollToIntro} className="hover:text-sky-400 transition">
            Home
          </button>
          <button onClick={scrollToAbout} className="hover:text-sky-400 transition">
            About
          </button>
          <button onClick={onExperienceClick} className="hover:text-sky-400 transition">
            Experience
          </button>
          {scrollToResearch && (
            <button onClick={scrollToResearch} className="hover:text-sky-400 transition">
              Research
            </button>
          )}
          <button onClick={scrollToProjects} className="hover:text-sky-400 transition">
            Projects
          </button>
          {scrollToTools && (
            <button onClick={scrollToTools} className="hover:text-sky-400 transition">
              Skills
            </button>
          )}
          <button onClick={scrollToContact} className="hover:text-sky-400 transition">
            Contact
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={scrollToContact}
            className="hidden sm:inline-block text-xs uppercase tracking-wider font-semibold border border-sky-500 text-sky-400 hover:bg-sky-600 hover:text-white px-3.5 py-1.5 rounded-lg transition duration-200"
          >
            Hire Me
          </button>
          <button
            onClick={toggleOpen}
            className="md:hidden text-gray-300 hover:text-white p-1.5 focus:outline-none"
            aria-label="Toggle navigation"
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 px-6 py-4 flex flex-col space-y-3 text-sm font-medium text-gray-300 shadow-xl">
          <button onClick={() => handleNavClick(scrollToIntro)} className="text-left py-1 hover:text-sky-400">
            Home
          </button>
          <button onClick={() => handleNavClick(scrollToAbout)} className="text-left py-1 hover:text-sky-400">
            About
          </button>
          <button onClick={() => handleNavClick(onExperienceClick)} className="text-left py-1 hover:text-sky-400">
            Experience
          </button>
          {scrollToResearch && (
            <button onClick={() => handleNavClick(scrollToResearch)} className="text-left py-1 hover:text-sky-400">
              Research
            </button>
          )}
          <button onClick={() => handleNavClick(scrollToProjects)} className="text-left py-1 hover:text-sky-400">
            Projects
          </button>
          {scrollToTools && (
            <button onClick={() => handleNavClick(scrollToTools)} className="text-left py-1 hover:text-sky-400">
              Skills
            </button>
          )}
          <button onClick={() => handleNavClick(scrollToContact)} className="text-left py-1 hover:text-sky-400">
            Contact
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
