import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { FaFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { usePortfolio } from "../../context/PortfolioContext";

const LeftSlider = () => {
  const { intro } = usePortfolio();

  const facebookLink = intro?.facebookLink || "";
  const twitterLink = intro?.twitterLink || "";
  const githubLink = intro?.githubLink || "";
  const linkedinLink = intro?.linkedInLink || "";

  const hasAnyLink = facebookLink || twitterLink || githubLink || linkedinLink;
  if (!hasAnyLink) return null;

  return (
    <div className="hidden xl:block fixed left-4 2xl:left-8 bottom-0 z-40">
      <div className="flex flex-col items-center gap-3">
        {linkedinLink && (
          <Link to={linkedinLink} target="_blank" className="text-gray-400 hover:text-sky-400 text-lg transition">
            <FaLinkedin />
          </Link>
        )}
        {facebookLink && (
          <Link to={facebookLink} target="_blank" className="text-gray-400 hover:text-sky-400 text-lg transition">
            <FaFacebook />
          </Link>
        )}
        {githubLink && (
          <Link to={githubLink} target="_blank" className="text-gray-400 hover:text-sky-400 text-lg transition">
            <FaGithubSquare />
          </Link>
        )}
        {twitterLink && (
          <Link to={twitterLink} target="_blank" className="text-gray-400 hover:text-sky-400 text-lg transition">
            <FaSquareXTwitter />
          </Link>
        )}
        <div className="w-[1px] h-16 bg-gray-700/80 mt-1"></div>
      </div>
    </div>
  );
};

export default LeftSlider;
