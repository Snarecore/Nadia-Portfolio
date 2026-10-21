import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import ProjectsInfo from "../../components/PROJECTSINFO/Projects";
import { usePortfolio } from "../../context/PortfolioContext";

const Intro = () => {
  const { intro } = usePortfolio();

  const profileImg = intro?.profileImage || "";
  const CV = intro?.cv || "";
  const name = intro?.name || "";
  const paragraph = intro?.paragraph || "";
  const githubLink = intro?.githubLink || "";
  const linkedInLink = intro?.linkedInLink || "";
  const facebookLink = intro?.facebookLink || "";
  const twitterLink = intro?.twitterLink || "";

  return (
    <section className="pt-20 sm:pt-24 md:pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10">
        <div className="w-full md:w-auto md:max-w-md lg:max-w-lg xl:max-w-xl text-center md:text-left flex-shrink-0">
          <span className="inline-block text-xs uppercase tracking-widest text-sky-400 font-semibold mb-1.5">
            As-salamu Alaikum
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Hello, I'm
          </h2>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-sky-500 tracking-tight mt-0.5 mb-3">
            {name || "Your Name"}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-300 max-w-xl leading-relaxed mb-5 mx-auto md:mx-0">
            {paragraph || "Full stack web developer passionate about crafting robust, scalable digital experiences."}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
            {CV ? (
              <a
                href={CV}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold border border-sky-500 text-sky-400 hover:bg-sky-600 hover:text-white px-4 py-2 rounded-lg transition duration-200"
                download
              >
                Download CV
                <MdOutlineFileDownload className="text-base" />
              </a>
            ) : null}

            <div className="flex items-center space-x-2.5 text-base text-gray-400">
              {githubLink && (
                <Link
                  to={githubLink}
                  target="_blank"
                  className="p-2 rounded-lg bg-gray-800/80 hover:text-white hover:bg-gray-700 transition"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </Link>
              )}
              {linkedInLink && (
                <Link
                  to={linkedInLink}
                  target="_blank"
                  className="p-2 rounded-lg bg-gray-800/80 hover:text-sky-400 hover:bg-gray-700 transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </Link>
              )}
              {facebookLink && (
                <Link
                  to={facebookLink}
                  target="_blank"
                  className="p-2 rounded-lg bg-gray-800/80 hover:text-sky-400 hover:bg-gray-700 transition"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </Link>
              )}
              {twitterLink && (
                <Link
                  to={twitterLink}
                  target="_blank"
                  className="p-2 rounded-lg bg-gray-800/80 hover:text-sky-400 hover:bg-gray-700 transition"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </Link>
              )}
            </div>
          </div>
        </div>

        {profileImg && (
          <div className="flex-1 w-full flex justify-center md:justify-end">
            <div className="w-full rounded-2xl overflow-hidden border border-gray-700/80 shadow-2xl bg-gray-900/60 ring-1 ring-sky-500/20 flex items-center justify-center">
              <img
                src={profileImg}
                alt={name || "Profile"}
                className="w-full h-auto max-h-72 lg:max-h-80 xl:max-h-[340px] object-contain block"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800/80">
        <ProjectsInfo />
      </div>
    </section>
  );
};

export default Intro;
