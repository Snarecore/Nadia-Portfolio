import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { BsGithub } from "react-icons/bs";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";

const Slider = ({ projectData }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  if (!projectData || projectData.length === 0) return null;

  const nextProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === projectData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentProjectIndex((prevIndex) =>
      prevIndex === 0 ? projectData.length - 1 : prevIndex - 1
    );
  };

  const currentProject = projectData[currentProjectIndex];

  return (
    <div className="bg-gray-900/60 border border-gray-800 p-6 md:p-8 rounded-2xl shadow-xl mt-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Left Side: Project Details */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl md:text-4xl font-mono font-extrabold text-sky-400">
              #{currentProject.projectNo}
            </span>
            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={prevProject}
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-sky-600 transition"
              >
                <TbPlayerTrackPrevFilled className="text-sm" />
              </button>
              <button
                onClick={nextProject}
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-sky-600 transition"
              >
                <TbPlayerTrackNextFilled className="text-sm" />
              </button>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white">
            {currentProject.projectTitle}
          </h3>

          <p className="text-sm text-gray-300 leading-relaxed max-w-lg">
            {currentProject.projectParagraph}
          </p>

          <div className="flex items-center gap-4 pt-2">
            {currentProject.projectLiveLink && (
              <Link
                to={currentProject.projectLiveLink}
                target="_blank"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg transition shadow"
              >
                <span>Live Demo</span>
                <FaArrowUpRightFromSquare className="text-xs" />
              </Link>
            )}
            {currentProject.projectGithubLink && (
              <Link
                to={currentProject.projectGithubLink}
                target="_blank"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold border border-gray-700 bg-gray-800 hover:border-sky-500 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition"
              >
                <BsGithub className="text-sm" />
                <span>Source Code</span>
              </Link>
            )}
          </div>
        </div>

        {/* Right Side: Project Image & Desktop Controls */}
        <div className="w-full md:w-auto flex flex-col items-center flex-shrink-0">
          {currentProject.projectImage ? (
            <img
              src={currentProject.projectImage}
              alt={currentProject.projectTitle}
              className="w-full md:w-96 h-52 sm:h-60 object-cover rounded-xl shadow-lg border border-gray-700/80 mb-4"
            />
          ) : (
            <div className="w-full md:w-96 h-52 bg-gray-800 rounded-xl mb-4 flex items-center justify-center text-gray-500 text-sm">
              No preview image
            </div>
          )}

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={prevProject}
              className="p-2.5 rounded-xl bg-gray-800 hover:bg-sky-600 hover:text-white text-gray-300 transition"
              title="Previous Project"
            >
              <TbPlayerTrackPrevFilled className="text-sm" />
            </button>
            <span className="text-xs text-gray-400 font-mono">
              {currentProjectIndex + 1} / {projectData.length}
            </span>
            <button
              onClick={nextProject}
              className="p-2.5 rounded-xl bg-gray-800 hover:bg-sky-600 hover:text-white text-gray-300 transition"
              title="Next Project"
            >
              <TbPlayerTrackNextFilled className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
