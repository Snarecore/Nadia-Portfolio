import React, { useRef } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";
import { FaLaptopCode } from "react-icons/fa";
import { usePortfolio } from "../../context/PortfolioContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectCard = ({ project, projectNum }) => {
  const targetLink = project.projectLiveLink || project.projectGithubLink || null;

  return (
    <div className="relative bg-gray-900/85 border border-gray-800 hover:border-gray-700 rounded-2xl overflow-hidden shadow-md transition-colors duration-200">
      {/* Project Image Preview (Fitted height without dead space) */}
      {project.projectImage ? (
        <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-60 overflow-hidden bg-gray-950 border-b border-gray-800/80">
          {targetLink ? (
            <a
              href={targetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img
                src={project.projectImage}
                alt={project.projectTitle || "Project Preview"}
                className="w-full h-full object-cover object-top opacity-95 hover:opacity-100 transition-opacity duration-200"
              />
            </a>
          ) : (
            <img
              src={project.projectImage}
              alt={project.projectTitle || "Project Preview"}
              className="w-full h-full object-cover object-top opacity-95"
            />
          )}
        </div>
      ) : (
        <div className="w-full h-36 sm:h-40 bg-gray-950/80 flex flex-col items-center justify-center text-gray-500 border-b border-gray-800">
          <FaLaptopCode className="text-3xl text-sky-400/60 mb-1.5" />
          <span className="text-xs font-mono text-gray-400">Featured Application</span>
        </div>
      )}

      {/* Card Content (Tight, clean padding and minimal gaps) */}
      <div className="px-4 pt-2 pb-3 sm:px-5 sm:pt-2 sm:pb-3.5 space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {targetLink ? (
              <a
                href={targetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 hover:underline transition-colors duration-150"
              >
                {project.projectTitle || "Featured Project"}
              </a>
            ) : (
              project.projectTitle || "Featured Project"
            )}
          </h3>
        </div>

        <p className="text-xs text-gray-300 leading-normal line-clamp-2">
          {project.projectParagraph ||
            "Web application designed for clean user interface, seamless interaction, and robust architecture."}
        </p>

        {/* Action Buttons styled consistently with the rest of the portfolio */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {project.projectLiveLink && (
            <a
              href={project.projectLiveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold border border-sky-500 text-sky-400 hover:bg-sky-600 hover:text-white px-3.5 py-1.5 rounded-lg transition duration-150"
            >
              <span>Live Demo</span>
              <FaArrowUpRightFromSquare className="text-xs" />
            </a>
          )}

          {project.projectGithubLink && (
            <a
              href={project.projectGithubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold border border-gray-700 bg-gray-800/80 hover:border-gray-600 hover:text-white text-gray-300 px-3.5 py-1.5 rounded-lg transition duration-150"
            >
              <BsGithub className="text-xs" />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { liveProjects } = usePortfolio();
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Header entrance
      gsap.fromTo(
        ".projects-header",
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

      // Individual project timeline rows
      const rows = gsap.utils.toArray(".project-timeline-row");
      rows.forEach((row, idx) => {
        const isEven = idx % 2 === 0;
        const card = row.querySelector(".project-card-wrapper");
        const badge = row.querySelector(".project-badge-node");

        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, scale: 0.85 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                once: true,
              },
            }
          );
        }

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, x: isEven ? -20 : 20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              ease: "power2.out",
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    },
    { scope: containerRef, dependencies: [liveProjects] }
  );

  return (
    <section
      ref={containerRef}
      className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto border-t border-gray-800"
    >
      {/* Header */}
      <div className="projects-header text-center mb-6 md:mb-8">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1.5">
          Recent Works
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Featured Projects
        </h2>
      </div>

      {liveProjects && liveProjects.length > 0 ? (
        <div className="relative w-full mx-auto">
          {/* Central Vertical Timeline Spine (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-sky-500/50 via-sky-500/20 to-transparent pointer-events-none" />

          {/* Left Vertical Timeline Spine (Mobile) */}
          <div className="md:hidden absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-sky-500/50 via-sky-500/20 to-transparent pointer-events-none" />

          <div className="space-y-12 md:space-y-16">
            {liveProjects.map((project, index) => {
              const isEven = index % 2 === 0;
              const projectNum = project.projectNo
                ? project.projectNo.replace("#", "")
                : String(index + 1).padStart(2, "0");

              return (
                <div
                  key={project._id || index}
                  className="project-timeline-row relative flex flex-col md:flex-row items-center"
                >
                  {/* Step / Number Badge Node on the Spine */}
                  <div className="project-badge-node absolute left-5 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 border-2 border-sky-500 shadow-md flex items-center justify-center text-sky-400 font-mono font-bold text-xs ring-4 ring-gray-900">
                      {projectNum}
                    </div>

                    {/* Horizontal Connector Line (Desktop) */}
                    {isEven ? (
                      <div className="hidden md:block absolute right-full top-1/2 -translate-y-1/2 w-8 lg:w-12 h-0.5 bg-sky-500/50" />
                    ) : (
                      <div className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 w-8 lg:w-12 h-0.5 bg-sky-500/50" />
                    )}
                  </div>

                  {/* Alternating Card Placement (ekta oi side, ekta ei side) */}
                  {isEven ? (
                    // Card on LEFT, Right empty
                    <div className="project-card-wrapper w-full md:w-1/2 md:pr-12 lg:pr-16 md:mr-auto pl-14 md:pl-0">
                      <ProjectCard project={project} projectNum={projectNum} />
                    </div>
                  ) : (
                    // Card on RIGHT, Left empty
                    <div className="project-card-wrapper w-full md:w-1/2 md:pl-12 lg:pr-0 lg:pl-16 md:ml-auto pl-14 md:pl-0">
                      <ProjectCard project={project} projectNum={projectNum} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-xs sm:text-sm text-gray-400 bg-gray-900/40 rounded-2xl border border-gray-800 max-w-md mx-auto">
          No projects published yet.
        </div>
      )}
    </section>
  );
};

export default Projects;
