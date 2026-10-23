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

// Authentic default experiences matching user's real career history
const defaultExperiences = [
  {
    role: "UI/UX Designer (Product Design)",
    company: "Moni Trading Corporation",
    location: "Dhaka, Bangladesh",
    duration: "May 2026 – Present",
    points: [
      {
        icon: null,
        text: "Designed user-friendly UI layouts and product interfaces using Figma.",
      },
      {
        icon: null,
        text: "Created clean, high-quality product visuals to improve brand presentation and online product displays.",
      },
      {
        icon: null,
        text: "Improved user experience through consistent design systems, visual hierarchy, and responsive layouts.",
      },
    ],
    skills: ["Figma", "Product Design", "Design Systems", "Visual Hierarchy", "Responsive Layouts"],
  },
  {
    role: "Junior UI/UX Designer",
    company: "L2N Software Limited",
    location: "Dhaka, Bangladesh",
    duration: "Oct 2025 – Apr 2026",
    points: [
      {
        icon: null,
        text: "Designed clean, user-friendly, and responsive interfaces by focusing on user experience, accessibility, and modern design principles.",
      },
      {
        icon: null,
        text: "Developed high-fidelity wireframes and prototypes to improve usability and streamline the user journey for web applications.",
      },
      {
        icon: null,
        text: "Collaborated with development teams to ensure design consistency and technical feasibility across various digital platforms.",
      },
    ],
    skills: ["Wireframing", "Prototyping", "Accessibility", "User Experience", "Cross-Platform"],
  },
  {
    role: "Front-End Developer (Intern)",
    company: "Shoveler Info Tech",
    location: "Dhaka, Bangladesh",
    duration: "Oct 2023 – Mar 2024",
    points: [
      {
        icon: null,
        text: "Collaborated with senior front-end developers to solve practical problems and implement UI components for various client projects.",
      },
      {
        icon: null,
        text: "Gained hands-on experience in building responsive web layouts and ensuring cross-browser compatibility.",
      },
    ],
    skills: ["Frontend Development", "UI Components", "Responsive Layouts", "Cross-Browser Compatibility"],
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
      className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto border-t border-gray-800"
    >
      {/* Header */}
      <div className="experience-header text-center mb-8 md:mb-10">
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
      <div className="w-full space-y-4 sm:space-y-5">
        {experiences.map((exp, index) => (
          <div
            key={exp.id || index}
            className="experience-card bg-[#0b1120]/85 border border-gray-800 hover:border-gray-700 rounded-xl p-4 sm:p-5 md:p-6 shadow-md transition-colors duration-200"
          >
            {/* Card Header: Role & Duration Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm">
                  {exp.company && (
                    <span className="text-sky-400 font-semibold tracking-wide">
                      {exp.company}
                    </span>
                  )}
                  {exp.location && (
                    <span className="text-gray-400 flex items-center gap-1 font-medium text-xs">
                      <FaMapMarkerAlt className="text-red-400 text-[10px]" />
                      {exp.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Duration Badge */}
              {exp.duration && (
                <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-medium">
                  <FaCalendarAlt className="text-[11px]" />
                  <span>{exp.duration}</span>
                  <FaBriefcase className="text-[10px] ml-0.5" />
                </div>
              )}
            </div>

            {/* Responsibilities Bullets as individual strip pills */}
            <div className="space-y-2 my-3">
              {exp.points &&
                exp.points.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-start gap-2.5 px-3.5 py-2 rounded-lg bg-gray-900/60 border border-gray-800/80 text-xs sm:text-sm text-gray-300"
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
              <div className="flex flex-wrap items-center gap-1.5 pt-2.5 border-t border-gray-800/80">
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-gray-900 text-gray-400 border border-gray-800"
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
