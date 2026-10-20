import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import "./Navbar.module.css";

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
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200 px-2 text-white">
      <div className="container flex mx-auto justify-between items-center p-4 hover:cursor-pointer">
        <Link
          to={"/"}
          className="text-4xl font-bold tracking-tighter hover:cursor-pointer active:text-sky-600"
        >
          ZRF
        </Link>
        <div className="space-x-12 text-2xl hidden md:flex ">
          <button onClick={scrollToIntro} className="hover:text-sky-600">
            Home
          </button>
          <button onClick={scrollToAbout} className="hover:text-sky-600">
            About
          </button>
          <button onClick={scrollToService} className="hover:text-sky-600">
            Services
          </button>
          <button onClick={scrollToProjects} className="hover:text-sky-600">
            Projects
          </button>
          <button onClick={scrollToContact} className="hover:text-sky-600">
            Contact
          </button>
        </div>
        <div className="space-x-8 text-xl">
          <button
            onClick={scrollToContact}
            className="hidden lg:inline-block border-2 px-4 py-2 rounded-md border-sky-600 transition-all ease-in-out delay-150 hover:bg-sky-600"
          >
            Hire Me
          </button>
          <button onClick={toggleOpen} className="hover:cursor-pointer">
            <FaBars className="md:hidden"></FaBars>
          </button>
        </div>
      </div>
      <div
        className={`${
          isOpen
            ? "flex flex-col items-center border-y-2 py-2 space-y-5 bg-white dark:bg-gray-700"
            : "hidden"
        } md:hidden`}
      >
        <button onClick={scrollToIntro}>Home</button>
        <button onClick={scrollToAbout}>About</button>
        <button onClick={scrollToService}>Services</button>
        <button onClick={scrollToProjects}>Projects</button>
        <button onClick={scrollToContact}>Contact</button>
      </div>
    </nav>
  );
};

export default Navbar;
