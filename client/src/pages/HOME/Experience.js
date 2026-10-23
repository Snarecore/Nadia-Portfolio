import React, { useRef } from "react";
import {
  FaCalendarAlt,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { usePortfolio } from "../../context/PortfolioContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Rich fallback experience matching the user's career portfolio
const defaultExperiences = [
  {
    role: "Jr. Software Engineer",
    company: "Qligence Limited",
    location: "Dhanmondi, Dhaka",
    duration: "February 2025 – Present",
    points: [
      {
        icon: "🛒",
        text: "Developed an e-commerce website for users and sellers with real-time notifications.",
      },
      {
        icon: "🔌",
        text: "Integrated RESTful APIs for dynamic data fetching and updates.",
      },
      {
        icon: "⚛️",
        text: "Built reusable React components and implemented state management with Redux.",
      },
      {
        icon: "👥",
        text: "Applied Agile methodology for rapid feature delivery and collaboration.",
      },
      {
        icon: "📱",
        text: "Designed mobile-first responsive user interfaces using Figma.",
      },
    ],
    skills: ["React", "Zustand", "REST APIs", "Figma", "Agile"],
  },
  {
    role: "MERN Stack Developer",
    company: "Code Prophet",
    location: "Nirala, Khulna",
    duration: "July 2024 – December 2024",
    points: [
      {
        icon: "🛒",
        text: "Contributed to healthcare and society management web applications.",
      },
      {
        icon: "⚡",
        text: "Architected scalable backend microservices using Node.js, Express, and MongoDB.",
      },
      {
        icon: "🔒",
        text: "Implemented secure JWT authentication and role-based access control (RBAC).",
      },
      {
        icon: "🚀",
        text: "Optimized database queries and API response times for high-volume endpoints.",
      },
    ],
    skills: ["Node.js", "Express", "MongoDB", "React", "JWT"],
  },
  {
    role: "Frontend Developer / Intern",
    company: "Tech Innovators Lab",
    location: "Remote, Bangladesh",
    duration: "January 2024 – June 2024",
    points: [
      {
        icon: "💻",
        text: "Engineered responsive, accessible web interfaces utilizing Tailwind CSS and React.js.",
      },
      {
        icon: "🎯",
        text: "Collaborated on component libraries and reusable UI design systems.",
      },
      {
        icon: "📈",
        text: "Audited Core Web Vitals and reduced initial bundle load times by 35%.",
      },
    ],
    skills: ["React.js", "Tailwind CSS", "JavaScript", "Git"],
  },
];

// Helper to parse dynamic database cards from admin if added
const parseDatabaseCard = (card, index) => {
  const rawHeader = card.cardHeader || "";
  const rawParagraph = card.cardParagraph || "";

  // Header parsing: "Role | Company | Location | Duration"
  const headerParts = rawHeader.split("|").map((s) => s.trim());
  const role = headerParts[0] || `Role #${index + 1}`;
  const company = headerParts[1] || "";
  const location = headerParts[2] || "";
  const duration = headerParts[3] || "";

  // Paragraph lines parsing
  const rawLines = rawParagraph
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  let skills = [];
  const points = [];

  for (const line of rawLines) {
    if (
      line.toLowerCase().startsWith("skills:") ||
      line.toLowerCase().startsWith("tech:") ||
      line.toLowerCase().startsWith("technologies:")
    ) {
      const skillsStr = line.split(":")[1] || "";
      skills = skillsStr
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      const cleanLine = line.replace(/^[-•*]\s*/, "").replace(/^\d+\.\s*/, "");
      if (cleanLine) {
        // Detect if line already starts with emoji
        const emojiMatch = cleanLine.match(
          /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u
        );
        if (emojiMatch) {
          points.push({
            icon: emojiMatch[0],
            text: cleanLine.replace(emojiMatch[0], "").trim(),
          });
        } else {
          points.push({
            icon: null,
            text: cleanLine,
          });
        }
      }
    }
  }

  if (points.length === 0 && rawParagraph) {
    points.push({ icon: null, text: rawParagraph });
  }

  return {
    role,
    company,
    location,
    duration,
    points,
    skills,
  };
};

const Experience = () => {
  const { service, serviceCards } = usePortfolio();
  const paragraph = service?.serviceParagraph || "";
  const containerRef = useRef(null);

  // Determine whether to use database cards or rich fallback
  const experiences =
    serviceCards && serviceCards.length > 0
      ? serviceCards.map(parseDatabaseCard)
      : defaultExperiences;

  useGSAP(
    () => {
      // Header entrance
      gsap.fromTo(
        ".experience-header",
        { opacity: 0, y: 18 },
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

      // Individual cards reveal as they scroll into view
      const cards = gsap.utils.toArray(".experience-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    },
    { scope: containerRef, dependencies: [experiences] }
  );

  return (
    <section
      ref={containerRef}
      className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto border-t border-gray-800"
    >
      {/* Header */}
      <div className="experience-header text-center mb-12 md:mb-16">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1.5">
          Career & Journey
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Work Experience
        </h2>
        {paragraph ? (
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-2 leading-relaxed">
            {paragraph}
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-2 leading-relaxed">
            A comprehensive overview of my professional roles, engineering contributions, and technical expertise.
          </p>
        )}
      </div>

      {/* Experience Cards List aligned with Navbar */}
      <div className="w-full space-y-8 md:space-y-10">
        {experiences.map((exp, index) => (
          <div
            key={exp.id || index}
            className="experience-card bg-[#0b1120]/90 backdrop-blur-md border border-gray-800 hover:border-sky-500/40 rounded-2xl p-5 sm:p-7 md:p-8 shadow-2xl transition-all duration-300 group"
          >
            {/* Card Header: Role & Duration Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-sky-300 transition">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-2.5 mt-1.5 text-xs sm:text-sm">
                  {exp.company && (
                    <span className="text-sky-400 font-semibold tracking-wide">
                      {exp.company}
                    </span>
                  )}
                  {exp.location && (
                    <span className="text-gray-400 flex items-center gap-1 font-medium">
                      <FaMapMarkerAlt className="text-red-400 text-xs" />
                      {exp.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Duration Badge with Sky Blue theme */}
              {exp.duration && (
                <div className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-semibold shadow-sm">
                  <FaCalendarAlt className="text-sky-400 text-xs" />
                  <span>{exp.duration}</span>
                  <FaBriefcase className="text-sky-400 text-xs ml-0.5" />
                </div>
              )}
            </div>

            {/* Responsibilities Bullets as individual strip pills */}
            <div className="space-y-2.5 my-5">
              {exp.points &&
                exp.points.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-800/80 hover:border-sky-500/30 hover:bg-gray-800/50 transition-all text-xs sm:text-sm text-gray-300"
                  >
                    <span className="text-sm flex-shrink-0 mt-0.5">
                      {point.icon || (
                        <FaCheckCircle className="text-sky-400 text-xs mt-1" />
                      )}
                    </span>
                    <span className="leading-relaxed font-normal">
                      {point.text || point}
                    </span>
                  </div>
                ))}
            </div>

            {/* Tech Stack Pills in Primary Sky Theme */}
            {exp.skills && exp.skills.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-800/80">
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3.5 py-1 rounded-full text-xs font-medium bg-sky-500/10 border border-sky-500/25 text-sky-300 hover:bg-sky-500/20 hover:text-white transition duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
