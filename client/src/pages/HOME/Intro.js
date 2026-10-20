import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import ProjectsInfo from "../../components/PROJECTSINFO/Projects";
import API from "../../api/apiClient";

const Intro = () => {
  const [profileImg, setProfileImg] = useState("");
  const [CV, setCV] = useState("");
  const [name, setName] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");

  useEffect(() => {
    API.get("/intro")
      .then((res) => {
        const intro = res.data?.data?.[0];
        if (intro) {
          setProfileImg(intro.profileImage || "");
          setCV(intro.cv || "");
          setName(intro.name || "");
          setParagraph(intro.paragraph || "");
          setGithubLink(intro.githubLink || "");
          setLinkedInLink(intro.linkedInLink || "");
          setFacebookLink(intro.facebookLink || "");
          setTwitterLink(intro.twitterLink || "");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <section className="pt-24 md:pt-32 pb-10 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block text-xs uppercase tracking-widest text-sky-400 font-semibold mb-2">
            As-salamu Alaikum
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Hello, I'm
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-sky-500 tracking-tight mt-1 mb-4">
            {name || "Your Name"}
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-xl leading-relaxed mb-6 mx-auto md:mx-0">
            {paragraph || "Full stack web developer passionate about crafting robust, scalable digital experiences."}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
            {CV ? (
              <a
                href={CV}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold border border-sky-500 text-sky-400 hover:bg-sky-600 hover:text-white px-5 py-2.5 rounded-lg transition duration-200"
                download
              >
                Download CV
                <MdOutlineFileDownload className="text-lg" />
              </a>
            ) : null}

            <div className="flex items-center space-x-3 text-lg text-gray-400">
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
          <div className="flex-shrink-0">
            <img
              src={profileImg}
              alt={name || "Profile"}
              className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-full ring-4 ring-sky-500/20 shadow-2xl"
            />
          </div>
        )}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-800/80">
        <ProjectsInfo />
      </div>
    </section>
  );
};

export default Intro;
