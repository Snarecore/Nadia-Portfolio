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
  FaCode,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Category 1: UI/UX & Design Tools
const designTools = [
  {
    name: "Figma",
    icon: <SiFigma className="text-[#F24E1E]" />,
  },
  {
    name: "Adobe XD",
    icon: <SiAdobexd className="text-[#FF61F6]" />,
  },
  {
    name: "Wireframing",
    icon: <FaPaintBrush className="text-sky-400" />,
  },
  {
    name: "Prototyping",
    icon: <FaLayerGroup className="text-sky-300" />,
  },
  {
    name: "Design System",
    icon: <FaPalette className="text-amber-400" />,
  },
  {
    name: "User Research",
    icon: <FaUsers className="text-emerald-400" />,
  },
];

// Category 2: Technologies I Use
const technologies = [
  {
    name: "React",
    icon: <SiReact className="text-[#61DAFB]" />,
  },
  {
    name: "Tailwind",
    icon: <SiTailwindcss className="text-[#38BDF8]" />,
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="text-[#F7DF1E]" />,
  },
  {
    name: "Python",
    icon: <SiPython className="text-[#3776AB]" />,
  },
  {
    name: "C Language",
    icon: <SiC className="text-[#A8B9CC]" />,
  },
  {
    name: "MySQL",
    icon: <SiMysql className="text-[#4479A1]" />,
  },
];

const Tools = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Header entrance
      gsap.fromTo(
        ".tools-header",
        { opacity: 0, y: 15 },
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

      // Categories cards entrance
      gsap.fromTo(
        ".tools-category-card",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Subtle stagger on individual tool items
      gsap.fromTo(
        ".tool-item-badge",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.025,
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
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto border-t border-gray-800"
    >
      {/* Section Header */}
      <div className="tools-header text-center mb-8 md:mb-12">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1.5">
          Tools & Stack
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Professional <span className="text-sky-400">Skillset</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mt-2 leading-relaxed">
          Technologies, design software, and development tools I use to build seamless user experiences.
        </p>
      </div>

      {/* 2 Divs in One Line (Side by Side on desktop/laptop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 xl:gap-8 items-stretch">
        {/* Div 1: UI/UX & Design Tools */}
        <div className="tools-category-card bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col items-center hover:border-sky-500/40 shadow-lg shadow-black/20 transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
            <FaPaintBrush className="text-sky-400 text-xs sm:text-sm" />
            <h3 className="text-xs sm:text-sm md:text-base font-semibold text-sky-400 tracking-wider uppercase">
              UI/UX & Design Tools
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 xl:gap-3 w-full">
            {designTools.map((tool, idx) => (
              <div
                key={idx}
                className="tool-item-badge w-16 h-16 sm:w-20 sm:h-20 lg:w-[68px] lg:h-[68px] xl:w-20 xl:h-20 2xl:w-[86px] 2xl:h-[86px] rounded-xl sm:rounded-2xl bg-gray-900/90 border border-gray-800 hover:border-sky-500/60 hover:bg-gray-850 shadow-md hover:shadow-xl hover:shadow-sky-500/15 flex flex-col items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                <div className="text-xl sm:text-2xl xl:text-3xl group-hover:scale-110 transition-transform duration-300">
                  {tool.icon}
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-gray-400 group-hover:text-white transition tracking-wide text-center px-1 truncate max-w-full">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Div 2: Technologies I Use */}
        <div className="tools-category-card bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col items-center hover:border-sky-500/40 shadow-lg shadow-black/20 transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
            <FaCode className="text-sky-400 text-xs sm:text-sm" />
            <h3 className="text-xs sm:text-sm md:text-base font-semibold text-sky-400 tracking-wider uppercase">
              Technologies I Use
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 xl:gap-3 w-full">
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className="tool-item-badge w-16 h-16 sm:w-20 sm:h-20 lg:w-[68px] lg:h-[68px] xl:w-20 xl:h-20 2xl:w-[86px] 2xl:h-[86px] rounded-xl sm:rounded-2xl bg-gray-900/90 border border-gray-800 hover:border-sky-500/60 hover:bg-gray-850 shadow-md hover:shadow-xl hover:shadow-sky-500/15 flex flex-col items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                <div className="text-xl sm:text-2xl xl:text-3xl group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <span className="text-[10px] sm:text-[11px] font-medium text-gray-400 group-hover:text-white transition tracking-wide text-center px-1 truncate max-w-full">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
