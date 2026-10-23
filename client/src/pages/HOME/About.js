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
      className="py-8 md:py-10 px-4 sm:px-6 lg:px-8 bg-gray-900/60 border-t border-gray-800"
    >
      <div className="max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Profile Card, Bio & Highlights */}
          <div className="about-left-col lg:col-span-5 space-y-4 text-center md:text-left">
            {profilePhoto && (
              <div className="mb-3 flex justify-center md:justify-start">
                <div className="relative rounded-2xl overflow-hidden border border-gray-700/80 shadow-2xl bg-gray-900 max-w-[220px] sm:max-w-[250px]">
                  <img
                    src={profilePhoto}
                    alt={aboutInfo?.aboutDesignation || "Profile"}
                    className="w-full h-auto object-cover block"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-gray-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-gray-700/50 text-[11px] font-medium text-sky-400 text-center">
                    UI/UX Designer • Researcher
                  </div>
                </div>
              </div>
            )}

            <div>
              <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1">
                About Me
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {aboutInfo?.aboutDesignation || "UI/UX Designer"}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {aboutInfo?.aboutParagraph ||
                "I design clean, functional, and user-friendly digital products. With a background in Computer Science, I bridge the gap between design and engineering—understanding code helps me create interfaces that are intuitive for users and practical for developers to build. I also have an active interest in scientific research, which keeps my design decisions grounded in user data, structured problem-solving, and intentional UX architecture."}
            </p>

            {/* Quick Highlight Metrics / Strengths */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-2.5">
                <span className="text-xs font-bold text-sky-400 block font-mono">Q1</span>
                <span className="text-[10px] text-gray-400 leading-tight block mt-0.5">Elsevier Paper</span>
              </div>
              <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-2.5">
                <span className="text-xs font-bold text-emerald-400 block font-mono">Figma</span>
                <span className="text-[10px] text-gray-400 leading-tight block mt-0.5">Design Systems</span>
              </div>
              <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-2.5">
                <span className="text-xs font-bold text-amber-400 block font-mono">B.Sc.</span>
                <span className="text-[10px] text-gray-400 leading-tight block mt-0.5">CSE Degree</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tabs with Engaging Structured Cards */}
          <div className="about-right-col lg:col-span-7 bg-gray-900/85 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl">
            {/* Interactive Tab Pills */}
            <div className="flex justify-center md:justify-start gap-1.5 sm:gap-2 mb-4 border-b border-gray-800 pb-3 flex-wrap">
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
              {/* Tab 1: Structured Visual Skills Grid (Engaging, Not Boring Text) */}
              {visibleSection === "skills" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-gray-850/60 border border-gray-800 text-left">
                    <div className="flex items-center gap-2 mb-1 text-sky-400">
                      <FaPalette className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">UI/UX & Wireframing</h4>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Figma, Adobe XD, Wireframes, Low & High-Fidelity Mockups
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-850/60 border border-gray-800 text-left">
                    <div className="flex items-center gap-2 mb-1 text-emerald-400">
                      <FaUsers className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">User Research & Testing</h4>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      User Research, Usability Testing, Interaction Design, User Flows
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-850/60 border border-gray-800 text-left">
                    <div className="flex items-center gap-2 mb-1 text-amber-400">
                      <FaLayerGroup className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">Visual & Design Systems</h4>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Typography, Color Theory, Component Libraries, Guidelines
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-850/60 border border-gray-800 text-left">
                    <div className="flex items-center gap-2 mb-1 text-purple-400">
                      <FaCube className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">Core CS Concepts</h4>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Object-Oriented Programming (OOP) & Computing Principles
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-850/60 border border-gray-800 text-left">
                    <div className="flex items-center gap-2 mb-1 text-cyan-400">
                      <FaCode className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">Frontend Development</h4>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      React.js, Tailwind CSS, Modern JavaScript (ES6+)
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-850/60 border border-gray-800 text-left">
                    <div className="flex items-center gap-2 mb-1 text-indigo-400">
                      <FaDatabase className="text-xs" />
                      <h4 className="text-xs font-bold text-white tracking-wide">Data & Foundations</h4>
                    </div>
                    <p className="text-[11px] text-gray-400">
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
                        <h4 className="font-bold text-white text-sm">UI/UX & Product Design</h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30">
                        Design & Engineering
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
                    <div className="flex items-center gap-2 mb-1.5">
                      <FaGraduationCap className="text-sky-400 text-sm" />
                      <h4 className="font-bold text-white text-sm">B.Sc. in Computer Science & Engineering</h4>
                    </div>
                    <p className="text-xs text-sky-400 font-medium">Undergraduate Degree</p>
                    <p className="text-xs text-gray-300 leading-relaxed mt-1.5">
                      Core focus on Human-Computer Interaction (HCI), computing logic, algorithms, Object-Oriented Programming, and scientific research methodologies.
                    </p>
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