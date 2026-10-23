import React, { useRef } from "react";
import { FaAward, FaBookOpen, FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { SiElsevier } from "react-icons/si";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Research = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Header entrance
      gsap.fromTo(
        ".research-header",
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

      // Card entrance
      gsap.fromTo(
        ".research-card",
        { opacity: 0, y: 20 },
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

      // Badge chips stagger
      gsap.fromTo(
        ".research-badge",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
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

  const paperLink = "https://www.sciencedirect.com/science/article/pii/S2096720925000983";

  return (
    <section
      ref={containerRef}
      className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto border-t border-gray-800"
    >
      {/* Section Header */}
      <div className="research-header text-center mb-6 md:mb-8">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1.5">
          Academic Scholarship & Scientific Publications
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Research <span className="text-sky-400">Publications</span>
        </h2>
      </div>

      {/* Main Publication Showcase Card */}
      <div className="research-card relative bg-[#0b1120]/90 border border-gray-800 hover:border-gray-700 rounded-2xl p-6 sm:p-8 md:p-9 shadow-md transition-colors duration-200">
        {/* Header Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-gray-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-orange-500/10 text-[#FF6C37]">
              <SiElsevier className="text-xl sm:text-2xl" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide block">
                Elsevier: Blockchain: Research and Applications
              </span>
              <span className="text-[11px] text-gray-400">
                Peer-Reviewed Journal Article • ScienceDirect
              </span>
            </div>
          </div>

          {/* Prestige Metrics Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="research-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <FaAward className="text-xs" />
              Q1 Journal
            </span>
            <span className="research-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/15 border border-sky-500/30 text-sky-400">
              Impact Factor: 5.6
            </span>
            <span className="research-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 border border-amber-500/30 text-amber-400">
              CiteScore: 16.1
            </span>
          </div>
        </div>

        {/* Paper Title */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
            <a
              href={paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 hover:underline transition-colors duration-150"
            >
              Submerge Sentinel: An Energy Efficient Way for Securing Underwater Wireless Communication with Blockchain-Powered Data Security
            </a>
          </h3>
        </div>

        {/* Authors Row */}
        <div className="mb-5 flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-gray-400">
          <span className="text-gray-500 font-medium">Authors:</span>
          <span>Shahriar Ahsan Taisiq,</span>
          <span>Shagor Kumar Das,</span>
          <span className="font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
            Nadia Esrat Ifti Sowa
          </span>
          <span>, Md. Jahidul Islam</span>
        </div>

        {/* Key Highlights / Bullets from User's Research */}
        <div className="space-y-3 mb-6 bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-emerald-400 text-sm mt-0.5 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Published as a research article in <strong className="text-white">Elsevier: Blockchain: Research and Applications</strong> (<span className="text-emerald-400 font-medium">Q1 Journal</span>, Impact Factor: <span className="text-sky-400 font-medium">5.6</span>, CiteScore: <span className="text-amber-400 font-medium">16.1</span>).
            </p>
          </div>

          <div className="flex items-start gap-3">
            <FaShieldAlt className="text-sky-400 text-sm mt-0.5 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Developed an energy-efficient framework for underwater communication using blockchain technology to enhance data security, integrity, and tamper-proof transmission in Internet of Underwater Things (IoUT) and Underwater Wireless Sensor Networks (UWSNs).
            </p>
          </div>
        </div>

        {/* Tags & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Topic Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              "Blockchain",
              "Underwater Wireless Sensor Networks (UWSNs)",
              "IoUT",
              "Data Security & Integrity",
              "Energy Optimization",
            ].map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium text-gray-400 bg-gray-800/60 px-2.5 py-1 rounded-md border border-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Link to ScienceDirect */}
          <div className="flex-shrink-0">
            <a
              href={paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold border border-sky-500 text-sky-400 hover:bg-sky-600 hover:text-white px-4 py-2 rounded-lg transition-colors duration-150"
            >
              <FaBookOpen className="text-xs" />
              <span>Read on ScienceDirect</span>
              <FaArrowUpRightFromSquare className="text-[11px]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;