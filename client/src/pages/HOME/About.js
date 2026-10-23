import React, { useState, useRef } from "react";
import {
  FaArrowRight,
  FaPalette,
  FaUsers,
  FaLayerGroup,
  FaCube,
  FaCode,
  FaDatabase,
  FaBriefcase,
  FaGraduationCap,
  FaAward,
} from "react-icons/fa";
import { SiFigma } from "react-icons/si";
import { usePortfolio } from "../../context/PortfolioContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const [visibleSection, setVisibleSection] = useState("skills");
  const { about, intro } = usePortfolio();
  const aboutInfo = about || {};
  const containerRef = useRef(null);

  const profilePhoto = aboutInfo?.aboutImage || intro?.profileImage || "";

  useGSAP(
    () => {
      // Left bio column entrance
      gsap.fromTo(
        ".about-left-col",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Right tabs column entrance
      gsap.fromTo(
        ".about-right-col",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay: 0.1,
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

  // Tab switch subtle fade
  useGSAP(
    () => {
      gsap.fromTo(
        ".about-tab-content",
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          clearProps: "opacity,transform",
        }
      );
    },
    { scope: containerRef, dependencies: [visibleSection] }
  );

  return (
    <section
      ref={containerRef}
      className="py-10 md:py-14 bg-gray-900/60 border-t border-gray-800"
    >
      <div className="max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Eye-Catching Designer Profile Card, Bio & Pillars */}
          <div className="about-left-col lg:col-span-5 space-y-4 text-center md:text-left">
            {profilePhoto && (
              <div className="mb-4 flex justify-center md:justify-start">
                <div className="relative group">
                  {/* Subtle Ambient Radial Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-blue-600/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-300"></div>

                  <div className="relative rounded-2xl overflow-hidden border border-gray-700/80 shadow-2xl bg-gray-900 max-w-[220px] sm:max-w-[250px]">
                    <img
                      src={profilePhoto}
                      alt={aboutInfo?.aboutDesignation || "Profile"}
                      className="w-full h-auto object-cover block"
                    />
                    
                    {/* Live Status Pill with pulsating indicator */}
                    <div className="absolute bottom-2 left-2 right-2 bg-gray-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-gray-700/60 flex items-center justify-center gap-2 shadow-lg">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[11px] font-semibold text-gray-200 tracking-wide">
                        Available for Projects
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Editorial Heading Hook */}
            <div>
              <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1">
                About Me
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Designing with <span className="text-sky-400">Code &amp; Research</span>
              </h2>
            </div>

            {/* Breathable 2-Paragraph Bio */}
            <div className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
              <p>
                I design clean, functional, and user-friendly digital products. With a background in Computer Science &amp; Engineering, I bridge the gap between design and engineering - understanding code helps me create interfaces that are intuitive for users and practical for developers to build.
              </p>
              <p className="text-gray-400">
                I also have an active interest in scientific research, which keeps my design decisions grounded in user data, structured problem-solving, and intentional UX architecture.
              </p>
            </div>

            {/* 3 Core Designer Pillar Cards with Micro-Icons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-2">
              <div className="p-3 rounded-xl bg-gray-850/80 border border-gray-800 hover:border-sky-500/40 text-center transition-all duration-200 group">
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-1.5 text-xs">
                  <FaAward />
                </div>
                <span className="text-xs font-bold text-white block">
                  Q1 Elsevier
                </span>
                <span className="text-[10px] text-sky-400 font-medium block mt-0.5">
                  Published Paper
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-850/80 border border-gray-800 hover:border-sky-500/40 text-center transition-all duration-200 group">
                <div className="w-7 h-7 rounded-lg bg-[#F24E1E]/10 border border-[#F24E1E]/20 text-[#F24E1E] flex items-center justify-center mx-auto mb-1.5 text-xs">
                  <SiFigma />
                </div>
                <span className="text-xs font-bold text-white block">
                  Design Systems
                </span>
                <span className="text-[10px] text-sky-400 font-medium block mt-0.5">
                  Figma &amp; Prototyping
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-850/80 border border-gray-800 hover:border-sky-500/40 text-center transition-all duration-200 group">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-1.5 text-xs">
                  <FaGraduationCap />
                </div>
                <span className="text-xs font-bold text-white block">
                  B.Sc. Degree
                </span>
                <span className="text-[10px] text-sky-400 font-medium block mt-0.5 leading-tight">
                  Computer Science &amp; Eng.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tabs with Engaging Structured Cards */}
          <div className="about-right-col lg:col-span-7 bg-gray-900/85 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            {/* Interactive Tab Switcher */}
            <div className="flex justify-center md:justify-start gap-1.5 sm:gap-2 mb-5 border-b border-gray-800 pb-3 flex-wrap">
              {[
                { id: "skills", label: "Skills" },
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education" },
                { id: "research", label: "Publications" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setVisibleSection(tab.id)}
                  className={`text-xs uppercase tracking-wider font-semibold px-3 sm:px-4 py-1.5 rounded-lg transition-all duration-150 ${
                    visibleSection === tab.id
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="about-tab-content text-xs sm:text-sm text-gray-300">
              {/* Tab 1: Skills & Competencies */}
              {visibleSection === "skills" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-gray-850/60 border border-gray-800 text-left hover:border-gray-700 transition">
                    <div className="flex items-center gap-2 mb-1 text-sky-400">
                      <FaPalette className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">UI/UX &amp; Wireframing</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Figma, Adobe XD, Wireframes, Low &amp; High-Fidelity Interactive Mockups
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-850/60 border border-gray-800 text-left hover:border-gray-700 transition">
                    <div className="flex items-center gap-2 mb-1 text-emerald-400">
                      <FaUsers className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">User Research &amp; Testing</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      User Research, Usability Testing, Interaction Design, User Flows
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-850/60 border border-gray-800 text-left hover:border-gray-700 transition">
                    <div className="flex items-center gap-2 mb-1 text-amber-400">
                      <FaLayerGroup className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">Visual &amp; Design Systems</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Typography, Color Theory, Component Libraries, Scalable Guidelines
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-850/60 border border-gray-800 text-left hover:border-gray-700 transition">
                    <div className="flex items-center gap-2 mb-1 text-purple-400">
                      <FaCube className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">Core CS Concepts</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Object-Oriented Programming (OOP) &amp; Computing Principles
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-850/60 border border-gray-800 text-left hover:border-gray-700 transition">
                    <div className="flex items-center gap-2 mb-1 text-cyan-400">
                      <FaCode className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">Frontend Development</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      React.js, Tailwind CSS, Modern JavaScript (ES6+), Responsive DOM
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-850/60 border border-gray-800 text-left hover:border-gray-700 transition">
                    <div className="flex items-center gap-2 mb-1 text-indigo-400">
                      <FaDatabase className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">Data &amp; Foundations</h4>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Python, C Language, MySQL, Database Architecture
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Experience */}
              {visibleSection === "experience" && (
                <div className="space-y-3 text-left">
                  <div className="p-4 rounded-xl bg-gray-850/60 border border-gray-800">
                    <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                      <div className="flex items-center gap-2">
                        <FaBriefcase className="text-sky-400 text-xs" />
                        <h4 className="font-bold text-white text-sm">UI/UX &amp; Product Design</h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30">
                        Design &amp; Engineering
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed mt-1">
                      Specialized in transforming complex requirements into clean wireframes, interactive Figma prototypes, and scalable design systems.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {["Wireframing", "Figma", "User Flows", "Design Systems", "Prototyping"].map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-gray-900 text-gray-400 border border-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Education */}
              {visibleSection === "education" && (
                <div className="space-y-3 text-left">
                  <div className="p-4 rounded-xl bg-gray-850/60 border border-gray-800">
                    <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                      <div className="flex items-center gap-2">
                        <FaGraduationCap className="text-sky-400 text-sm" />
                        <h4 className="font-bold text-white text-sm">B.Sc. in Computer Science &amp; Engineering</h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30">
                        Academic Honors
                      </span>
                    </div>
                    <p className="text-xs text-sky-400 font-medium">Green University of Bangladesh</p>
                    <p className="text-xs text-gray-300 leading-relaxed mt-1.5">
                      Core focus on Human-Computer Interaction (HCI), computing logic, algorithms, Object-Oriented Programming, and scientific research methodologies.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-900 text-amber-300 border border-gray-800">
                        4× Vice Chancellor's Award (GPA ≥ 3.90)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-900 text-sky-300 border border-gray-800">
                        3× Dean's Award (GPA ≥ 3.80)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Publications */}
              {visibleSection === "research" && (
                <div className="space-y-3 text-left">
                  <div className="p-4 rounded-xl bg-gray-850/60 border border-gray-800">
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <FaAward className="text-emerald-400 text-xs" />
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Q1 Journal
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">
                        IF: 5.6 • CiteScore: 16.1
                      </span>
                    </div>

                    <h4 className="font-bold text-white leading-snug text-xs sm:text-sm">
                      Submerge Sentinel: An Energy Efficient Way for Securing Underwater Wireless Communication with Blockchain-Powered Data Security
                    </h4>
                    <p className="text-xs text-sky-400 font-medium mt-1">
                      Elsevier: Blockchain: Research and Applications
                    </p>
                    <a
                      href="https://www.sciencedirect.com/science/article/pii/S2096720925000983"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold mt-2.5 underline"
                    >
                      <span>Read Paper on ScienceDirect</span>
                      <FaArrowRight className="text-[10px]" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
