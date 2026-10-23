import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import ProjectsInfo from "../../components/PROJECTSINFO/Projects";
import { usePortfolio } from "../../context/PortfolioContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Intro = () => {
  const { intro } = usePortfolio();
  const containerRef = useRef(null);

  const profileImg = intro?.profileImage || "";
  const CV = intro?.cv || "";
  const name = intro?.name || "";
  const paragraph = intro?.paragraph || "";
  const githubLink = intro?.githubLink || "";
  const linkedInLink = intro?.linkedInLink || "";
  const facebookLink = intro?.facebookLink || "";
  const twitterLink = intro?.twitterLink || "";

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".intro-greeting",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, clearProps: "opacity,transform" }
      )
        .fromTo(
          ".intro-title",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, clearProps: "opacity,transform" },
          "-=0.3"
        )
        .fromTo(
          ".intro-name",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, clearProps: "opacity,transform" },
          "-=0.35"
        )
        .fromTo(
          ".intro-desc",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, clearProps: "opacity,transform" },
          "-=0.35"
        )
        .fromTo(
          ".intro-action-item",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
            clearProps: "opacity,transform",
          },
          "-=0.3"
        )
        .fromTo(
          ".intro-image-container",
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "opacity,transform",
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="pt-20 sm:pt-24 md:pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto"
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10">
        <div className="w-full md:w-auto md:max-w-md lg:max-w-lg xl:max-w-xl text-center md:text-left flex-shrink-0">
          <span className="intro-greeting inline-block text-xs uppercase tracking-widest text-sky-400 font-semibold mb-1.5">
            As-salamu Alaikum
          </span>
          <h2 className="intro-title text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Hello, I'm
          </h2>
          <h1 className="intro-name text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-sky-500 tracking-tight mt-0.5 mb-3">
            {name || "Your Name"}
          </h1>
          <p className="intro-desc text-xs sm:text-sm md:text-base text-gray-300 max-w-xl leading-relaxed mb-5 mx-auto md:mx-0">
            {paragraph || "UI/UX Designer with a Computer Science background. I design clean, functional digital experiences with a solid understanding of frontend code and research-driven thinking."}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-1">
            {CV ? (
              <a
                href={CV}
                target="_blank"
                rel="noopener noreferrer"
                className="intro-action-item inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold border border-sky-500 text-sky-400 hover:bg-sky-600 hover:text-white px-4 py-2 rounded-lg transition duration-200"
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
                  className="intro-action-item p-2 rounded-lg bg-gray-800/80 hover:text-white hover:bg-gray-700 transition"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </Link>
              )}
              {linkedInLink && (
                <Link
                  to={linkedInLink}
                  target="_blank"
                  className="intro-action-item p-2 rounded-lg bg-gray-800/80 hover:text-sky-400 hover:bg-gray-700 transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </Link>
              )}
              {facebookLink && (
                <Link
                  to={facebookLink}
                  target="_blank"
                  className="intro-action-item p-2 rounded-lg bg-gray-800/80 hover:text-sky-400 hover:bg-gray-700 transition"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </Link>
              )}
              {twitterLink && (
                <Link
                  to={twitterLink}
                  target="_blank"
                  className="intro-action-item p-2 rounded-lg bg-gray-800/80 hover:text-sky-400 hover:bg-gray-700 transition"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </Link>
              )}
            </div>
          </div>
        </div>

        {profileImg && (
          <div className="intro-image-container flex-1 w-full flex justify-center md:justify-end">
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
