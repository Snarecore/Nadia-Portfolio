import React from "react";
import { usePortfolio } from "../../context/PortfolioContext";

const ProjectsInfo = () => {
  const { projectStats } = usePortfolio();

  const stats = [
    { value: projectStats?.noOfExperience ?? 0, label: "Years of Experience" },
    { value: projectStats?.noOfProjectCompleted ?? 0, label: "Projects Completed" },
    { value: projectStats?.noOfTechnology ?? 0, label: "Technologies Mastered" },
    { value: projectStats?.noOfCodeCommits ?? 0, label: "Code Commits" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 py-3 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg bg-gray-800/20 sm:bg-transparent">
          <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-mono text-sky-400">
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
