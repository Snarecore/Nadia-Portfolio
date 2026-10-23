import React, { useRef } from "react";
import {
  SiFigma,
  SiAdobexd,
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiPython,
  SiC,
  SiMysql,
} from "react-icons/si";
import {
  FaPaintBrush,
  FaLayerGroup,
  FaPalette,
  FaUsers,
  FaMousePointer,
  FaFont,
  FaCube,
  FaSlidersH,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// All Skills & Tools in ONE Unified Line (Exception & Multithread Removed)
const allSkills = [
  { name: "Figma", icon: <SiFigma className="text-[#F24E1E]" /> },
  { name: "Adobe XD", icon: <SiAdobexd className="text-[#FF61F6]" /> },
  { name: "Wireframing", icon: <FaPaintBrush className="text-sky-400" /> },
  { name: "Prototyping", icon: <FaMousePointer className="text-sky-300" /> },
  { name: "User Research", icon: <FaUsers className="text-emerald-400" /> },
  { name: "Interaction", icon: <FaSlidersH className="text-purple-400" /> },
  { name: "Typography", icon: <FaFont className="text-amber-400" /> },
  { name: "Color Theory", icon: <FaPalette className="text-pink-400" /> },
  { name: "Design System", icon: <FaLayerGroup className="text-teal-400" /> },
  { name: "OOP", icon: <FaCube className="text-indigo-400" /> },
  { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-[#38BDF8]" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E]" /> },
  { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
  { name: "C Language", icon: <SiC className="text-[#A8B9CC]" /> },
  { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
];

const Tools = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Header entrance
      gsap.fromTo(
        ".tools-header",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Card entrance
      gsap.fromTo(
        ".tools-board",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Stagger on individual tiles
      gsap.fromTo(
        ".tool-tile",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.015,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="py-8 md:py-10 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto border-t border-gray-800"
    >
      {/* Section Header */}
      <div className="tools-header text-center mb-5 md:mb-6">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1">
          Toolkit & Core Skills
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Skills & <span className="text-sky-400">Capabilities</span>
        </h2>
      </div>

      {/* Unified Single-Line Strip (All Skills in ONE Continuous Row) */}
      <div className="tools-board bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-3.5 sm:p-4 md:p-5 max-w-screen-2xl mx-auto shadow-lg">
        <div className="flex items-center justify-start xl:justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1">
          {allSkills.map((tool, idx) => (
            <div
              key={idx}
              className="tool-tile flex-shrink-0 w-[68px] h-[68px] sm:w-[72px] sm:h-[72px] md:w-[76px] md:h-[76px] rounded-xl bg-gray-900/90 border border-gray-800 hover:border-sky-500/50 hover:bg-gray-850 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 shadow-sm cursor-pointer p-1"
            >
              <div className="text-xl sm:text-2xl">
                {tool.icon}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-gray-300 text-center px-1 truncate max-w-full">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;