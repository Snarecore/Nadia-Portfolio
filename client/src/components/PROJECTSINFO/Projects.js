import React, { useRef } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectsInfo = () => {
  const { projectStats } = usePortfolio();
  const containerRef = useRef(null);

  const stats = [
    { value: projectStats?.noOfExperience ?? 0, label: "Years of Experience" },
    { value: projectStats?.noOfProjectCompleted ?? 0, label: "Projects Completed" },
    { value: projectStats?.noOfTechnology ?? 0, label: "Technologies Mastered" },
    { value: projectStats?.noOfCodeCommits ?? 0, label: "Code Commits" },
  ];

  useGSAP(
    () => {
      // Subtle entrance of cards
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );

      // Number counter animation
      const numberEls = gsap.utils.toArray(".stat-number");
      numberEls.forEach((el) => {
        const rawTarget = el.getAttribute("data-target");
        const targetVal = parseInt(rawTarget, 10) || 0;
        if (targetVal > 0) {
          const counterObj = { count: 0 };
          gsap.to(counterObj, {
            count: targetVal,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 95%",
              once: true,
            },
            onUpdate: () => {
              el.innerText = Math.floor(counterObj.count);
            },
            onComplete: () => {
              el.innerText = targetVal;
            },
          });
        }
      });
    },
    { scope: containerRef, dependencies: [projectStats] }
  );

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 py-3 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto"
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="stat-card flex items-center gap-2 sm:gap-3 p-2 rounded-lg bg-gray-800/20 sm:bg-transparent"
        >
          <span
            className="stat-number text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono text-sky-400"
            data-target={stat.value || 0}
          >
            {stat.value || 0}
          </span>
          <p className="text-[11px] sm:text-xs uppercase tracking-wider text-gray-400 font-medium leading-tight">
            {stat.label.split(" ").slice(0, 1).join(" ")} <br />
            {stat.label.split(" ").slice(1).join(" ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectsInfo;
