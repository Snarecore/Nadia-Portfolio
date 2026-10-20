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
    <div className="flex-row md:flex justify-around items-center">
      <div className="text-2xl space-y-2 md:space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-8xl">{currentProject.projectNo}</h2>
          <div className="flex items-center gap-10 bg-white dark:bg-gray-900 p-3 rounded-full md:hidden">
            <TbPlayerTrackPrevFilled onClick={prevProject} />
            <TbPlayerTrackNextFilled onClick={nextProject} />
          </div>
        </div>
        <h2 className="text-2xl pt-4 md:pt-0 md:text-2xl lg:text-4xl font-bold tracking-wider text-sky-600">
          {currentProject.projectTitle}
        </h2>
        <p className="max-w-2xl text-lg md:text-xl lg:text-2xl text-justify leading-relaxed">
          {currentProject.projectParagraph}
        </p>
        {/* <h4 className="pb-5 text-xl md:text-2xl tracking-wider text-sky-600">
          {currentProject.languages}
        </h4> */}
        <div className="flex items-center justify-center md:justify-start gap-20 md:gap-40 text-xl md:text-4xl">
          <Link
            to={currentProject.projectLiveLink}
            target="_blank"
            className="bg-white dark:bg-gray-900 p-6 rounded-full hover:bg-gray-700"
          >
            <FaArrowUpRightFromSquare />
          </Link>
          <Link
            to={currentProject.projectGithubLink}
            target="_blank"
            className="bg-white dark:bg-gray-900 p-6 rounded-full hover:bg-gray-700"
          >
            <BsGithub />
          </Link>
        </div>
      </div>
      <div className="items-center py-6 md:py-10 md:px-5 xl:px-0">
        <img
          src={currentProject.projectImage}
          alt=""
          className="w-[500px] mx-auto rounded-2xl pb-5 md:w-[500px]"
        />
        <div className="hidden md:flex justify-between bg-white dark:bg-gray-900 p-6 rounded-full text-2xl cursor-pointer">
          <TbPlayerTrackPrevFilled onClick={prevProject} />
          <TbPlayerTrackNextFilled onClick={nextProject} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
