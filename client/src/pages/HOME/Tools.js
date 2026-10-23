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

// All Skills & Tools in ONE Unified Line
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

      // Skills board entrance
      gsap.fromTo(
        ".tools-board",
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
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
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
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

      // Achievements section entrance (subtle, unified)
      gsap.fromTo(
        ".achievements-section",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: ".achievements-section",
            start: "top 88%",
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
      className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto border-t border-gray-800"
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

      {/* Clean, Editorial Resume-Style Presentation (Understated, No Fake AI Gradients) */}
      <div className="achievements-section mt-10 md:mt-12 pt-8 border-t border-gray-800/80">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Column 1: Achievements & Certifications */}
          <div>
            <div className="border-b border-gray-800 pb-2.5 mb-4">
              <h3 className="text-xs uppercase tracking-widest text-sky-400 font-semibold">
                Achievements
              </h3>
            </div>

            <div className="space-y-4">
              {/* Vice Chancellor's Award */}
              <div className="pb-3 border-b border-gray-850">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-sm font-semibold text-white">
                    Vice Chancellor's Award
                  </h4>
                  <span className="text-[11px] text-sky-400 shrink-0 font-medium">
                    GPA ≥ 3.90
                  </span>
                </div>
                <div className="text-xs text-sky-400/90 mt-0.5">
                  Green University of Bangladesh
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                  Received four Vice Chancellor's Certificates for maintaining an outstanding GPA of 3.90 or above.
                </p>
              </div>

              {/* Dean's Award */}
              <div className="pb-3 border-b border-gray-850">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-sm font-semibold text-white">
                    Dean's Award
                  </h4>
                  <span className="text-[11px] text-sky-400 shrink-0 font-medium">
                    GPA ≥ 3.80
                  </span>
                </div>
                <div className="text-xs text-sky-400/90 mt-0.5">
                  Green University of Bangladesh
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                  Received three Dean's Certificates for securing and maintaining a GPA of 3.80 or above.
                </p>
              </div>

              {/* Professional Certifications */}
              <div className="pt-0.5">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <h4 className="text-sm font-semibold text-white">
                    Professional Certifications
                  </h4>
                  <span className="text-[11px] text-sky-400 shrink-0 font-medium">
                    Coursera
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-gray-400 pl-3">
                  <li className="list-disc">
                    <span className="text-gray-300 font-medium">University of Michigan:</span>{" "}
                    Programming for Everybody (Getting Started with Python) &amp; Python Data Structures.
                  </li>
                  <li className="list-disc">
                    <span className="text-gray-300 font-medium">DeepLearning.AI:</span>{" "}
                    AI for Everyone (Offered through Coursera).
                  </li>
                  <li className="list-disc">
                    <span className="text-gray-300 font-medium">Coursera Project Network:</span>{" "}
                    Google Ads for Beginners.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 2: Extra-Curricular Activities */}
          <div>
            <div className="border-b border-gray-800 pb-2.5 mb-4">
              <h3 className="text-xs uppercase tracking-widest text-sky-400 font-semibold">
                Extra-Curricular Activities
              </h3>
            </div>

            <div className="space-y-4">
              {/* Student Mentor */}
              <div className="pb-3 border-b border-gray-850">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-sm font-semibold text-white">
                    Student Mentor
                  </h4>
                  <span className="text-[11px] text-sky-400 shrink-0 font-medium">
                    Jan 2022 – Jan 2023
                  </span>
                </div>
                <div className="text-xs text-sky-400/90 mt-0.5">
                  Green University of Bangladesh <span className="text-gray-600">•</span> Dhaka, Bangladesh
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                  Guided and mentored junior students, assisting them with academic course material and university transition.
                </p>
              </div>

              {/* Volunteer */}
              <div className="pb-3 border-b border-gray-850">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="text-sm font-semibold text-white">
                    Volunteer
                  </h4>
                  <span className="text-[11px] text-sky-400 shrink-0 font-medium">
                    2022
                  </span>
                </div>
                <div className="text-xs text-sky-400/90 mt-0.5">
                  ICPC Asia Dhaka Regional Contest <span className="text-gray-600">•</span> Dhaka, Bangladesh
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mt-1.5">
                  Contributed as a volunteer for the International Collegiate Programming Contest (ICPC), assisting in event coordination and logistics.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Tools;
