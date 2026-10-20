import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({
  scrollToIntro,
  scrollToAbout,
  scrollToService,
  scrollToProjects,
  scrollToContact,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (scrollFn) => {
    scrollFn();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800 text-white transition-all">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 md:px-8 py-3.5">
        <Link
          to={"/"}
          className="text-2xl font-extrabold tracking-tight text-white hover:text-sky-400 transition"
        >
          ZRF<span className="text-sky-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-7 text-sm font-medium text-gray-300">
          <button onClick={scrollToIntro} className="hover:text-sky-400 transition">
            Home
          </button>
          <button onClick={scrollToAbout} className="hover:text-sky-400 transition">
            About
          </button>
          <button onClick={scrollToService} className="hover:text-sky-400 transition">
            Services
          </button>
          <button onClick={scrollToProjects} className="hover:text-sky-400 transition">
            Projects
          </button>
          <button onClick={scrollToContact} className="hover:text-sky-400 transition">
            Contact
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={scrollToContact}
            className="hidden sm:inline-block text-xs uppercase tracking-wider font-semibold border border-sky-500 text-sky-400 hover:bg-sky-600 hover:text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Hire Me
          </button>
          <button
            onClick={toggleOpen}
            className="md:hidden text-gray-300 hover:text-white p-1 focus:outline-none"
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
          <button onClick={() => handleNavClick(scrollToService)} className="text-left py-1 hover:text-sky-400">
            Services
          </button>
          <button onClick={() => handleNavClick(scrollToProjects)} className="text-left py-1 hover:text-sky-400">
            Projects
          </button>
          <button onClick={() => handleNavClick(scrollToContact)} className="text-left py-1 hover:text-sky-400">
            Contact
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
