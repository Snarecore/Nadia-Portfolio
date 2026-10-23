import React, { useState, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { usePortfolio } from "../../context/PortfolioContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const [visibleSection, setVisibleSection] = useState("skills");
  const { about } = usePortfolio();
  const aboutInfo = about || {};
  const containerRef = useRef(null);

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
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/60 border-t border-gray-800"
    >
      <div className="max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Designation, Bio & Image */}
          <div
            className={`about-left-col ${
              aboutInfo?.aboutImage ? "lg:col-span-5" : "lg:col-span-6"
            } space-y-3.5 text-center md:text-left`}
          >
            {aboutInfo?.aboutImage && (
              <div className="mb-4">
                <img
                  src={aboutInfo.aboutImage}
                  alt={aboutInfo.aboutDesignation || "About"}
                  className="w-48 sm:w-56 md:w-64 lg:w-72 object-cover rounded-2xl border border-gray-700/80 shadow-2xl mx-auto md:mx-0"
                />
              </div>
            )}
            <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1">
              About Me
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {aboutInfo?.aboutDesignation || "Full-Stack Software Engineer"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {aboutInfo?.aboutParagraph ||
                "I am passionate about creating clean, scalable web applications with great user experience."}
            </p>
          </div>

          {/* Right Column: Interactive Tabs spanning to right navbar alignment */}
          <div
            className={`about-right-col ${
              aboutInfo?.aboutImage ? "lg:col-span-7" : "lg:col-span-6"
            } bg-gray-900/85 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-xl`}
          >
            {/* Interactive Tab Pills */}
            <div className="flex justify-center md:justify-start gap-2 mb-4 border-b border-gray-800 pb-2.5">
              {[
                { id: "skills", label: "Skills" },
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education" },
                { id: "research", label: "Publications" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setVisibleSection(tab.id)}
                  className={`text-xs uppercase tracking-wider font-semibold px-3.5 py-1.5 rounded-lg transition ${
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
              {visibleSection === "skills" && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <li className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-850/60 border border-gray-800 text-white font-medium">
                    <FaArrowRight className="text-sky-400 text-xs flex-shrink-0" />
                    <span>UI/UX & Web Design</span>
                  </li>
                  <li className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-850/60 border border-gray-800 text-white font-medium">
                    <FaArrowRight className="text-sky-400 text-xs flex-shrink-0" />
                    <span>React.js & Modern Frontend</span>
                  </li>
                  <li className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-850/60 border border-gray-800 text-white font-medium">
                    <FaArrowRight className="text-sky-400 text-xs flex-shrink-0" />
                    <span>Node.js & Express APIs</span>
                  </li>
                  <li className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-850/60 border border-gray-800 text-white font-medium">
                    <FaArrowRight className="text-sky-400 text-xs flex-shrink-0" />
                    <span>MongoDB & Database Architecture</span>
                  </li>
                </ul>
              )}

              {visibleSection === "experience" && (
                <div className="space-y-3 text-left">
                  <div className="border-l-2 border-sky-500 pl-3.5 py-1">
                    <h4 className="font-semibold text-white">Full Stack Intern / Developer</h4>
                    <p className="text-xs text-sky-400 font-medium">Software & Web Development</p>
                    <p className="text-xs text-gray-400 mt-1">Worked on client websites, database architecture, and internal tools.</p>
                  </div>
                </div>
              )}

              {visibleSection === "education" && (
                <div className="space-y-3 text-left">
                  <div className="border-l-2 border-sky-500 pl-3.5 py-1">
                    <h4 className="font-semibold text-white">B.Sc. in Computer Science & Engineering</h4>
                    <p className="text-xs text-sky-400 font-medium">Undergraduate Degree</p>
                    <p className="text-xs text-gray-400 mt-1">Focused on software engineering, web algorithms, and distributed systems.</p>
                  </div>
                </div>
              )}

              {visibleSection === "research" && (
                <div className="space-y-3 text-left">
                  <div className="border-l-2 border-emerald-500 pl-3.5 py-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Q1 Journal
                      </span>
                      <span className="text-[10px] text-gray-400">
                        IF: 5.6 • CiteScore: 16.1
                      </span>
                    </div>
                    <h4 className="font-semibold text-white leading-snug">
                      Submerge Sentinel: An Energy Efficient Way for Securing Underwater Wireless Communication with Blockchain-Powered Data Security
                    </h4>
                    <p className="text-xs text-sky-400 font-medium mt-1">
                      Elsevier: Blockchain: Research and Applications
                    </p>
                    <a
                      href="https://www.sciencedirect.com/science/article/pii/S2096720925000983"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-semibold mt-2 underline"
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
