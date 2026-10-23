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
      className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto border-t border-gray-800"
    >
      {/* Section Header */}
      <div className="research-header text-center mb-10 md:mb-14">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1.5">
          Academic Scholarship & Scientific Publications
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Research <span className="text-sky-400">Publications</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-2 leading-relaxed">
          Peer-reviewed scientific contributions published in world-renowned journals, focusing on distributed consensus, marine sensor networks, and blockchain security.
        </p>
      </div>

      {/* Main Publication Showcase Card */}
      <div className="research-card relative bg-[#0b1120]/90 backdrop-blur-md border border-gray-800 hover:border-sky-500/50 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl transition-all duration-300 group">
        {/* Top Highlight Line / Glow */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-sky-500/60 to-transparent pointer-events-none" />

        {/* Header Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-gray-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[#FF6C37] shadow-sm">
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
            <span className="research-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-sm">
              <FaAward className="text-xs" />
              Q1 Journal
            </span>
            <span className="research-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/15 border border-sky-500/30 text-sky-400 shadow-sm">
              Impact Factor: 5.6
            </span>
            <span className="research-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-sm">
              CiteScore: 16.1
            </span>
          </div>
        </div>

        {/* Paper Title */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white group-hover:text-sky-300 transition-colors duration-200 leading-snug">
            <a
              href={paperLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
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
          <span className="font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/30">
            Nadia Esrat Ifti Sowa
          </span>
          <span>, Md. Jahidul Islam</span>
        </div>

        {/* Key Highlights / Bullets from User's Research */}
        <div className="space-y-3 mb-6 bg-gray-900/70 border border-gray-800/80 rounded-xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <FaCheckCircle className="text-emerald-400 text-sm mt-0.5 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Published as a research article in <strong className="text-white">Elsevier: Blockchain: Research and Applications</strong> (<span className="text-emerald-400 font-semibold">Q1 Journal</span>, Impact Factor: <span className="text-sky-400 font-semibold">5.6</span>, CiteScore: <span className="text-amber-400 font-semibold">16.1</span>).
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
                className="text-[11px] font-medium text-gray-400 bg-gray-800/80 px-2.5 py-1 rounded-lg border border-gray-700/60"
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
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold border border-sky-500 bg-sky-500/10 text-sky-400 hover:bg-sky-600 hover:text-white px-5 py-2.5 rounded-xl transition duration-200 shadow-lg shadow-sky-500/10 group/btn"
            >
              <FaBookOpen className="text-sm" />
              <span>Read on ScienceDirect</span>
              <FaArrowUpRightFromSquare className="text-xs group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;