import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import API from "../../api/apiClient";
import { useParams } from "react-router-dom";

const About = () => {
  const { id } = useParams();
  const [visibleSection, setVisibleSection] = useState("education");
  const [aboutInfo, setAboutInfo] = useState({});
  const [error, setError] = useState(null);

  const showExperience = () => setVisibleSection("experience");
  const showEducation = () => setVisibleSection("education");
  const showSkills = () => setVisibleSection("skills");

  useEffect(() => {
    API.get("/about")
      .then((res) => {
        setAboutInfo(res.data?.data?.[0] || {});
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setError("There was an error fetching the data!");
      });
  }, [id]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 text-black dark:text-white pt-10 pb-10">
      <div className="flex flex-col md:flex-row justify-around items-center px-5 md:px-10 space-y-2 md:space-y-0 md:space-x-10">
        <div>
          <img
            src={aboutInfo?.aboutImage || "default-image-path"} // Fallback for image
            alt="Profile"
            className="w-48 md:w-64 lg:w-80"
          />
        </div>
        <div className="text-lg text-justify md:text-xl leading-8 max-w-4xl md:max-w-5xl">
          <h1 className="text-5xl font-bold border-b leading-relaxed text-center md:text-left">
            About Me
          </h1>
          <h1 className="py-2 text-center md:text-left">
            {aboutInfo?.aboutDesignation || "Designation"}
          </h1>
          <p className="py-4">
            {aboutInfo?.aboutParagraph || "About paragraph goes here."}
          </p>
          <div className="flex justify-around">
            <div>
              <h1 className="font-bold cursor-pointer" onClick={showSkills}>
                Skills
              </h1>
              {visibleSection === "skills" && (
                <ul className="pt-4">
                  <li className="font-semibold text-sky-600 inline-flex items-center gap-2">
                    <FaArrowRight /> UI/UX
                  </li>
                  <p>Designing Web</p>
                  <li className="font-semibold text-sky-600 inline-flex items-center gap-2 pt-4">
                    <FaArrowRight /> Web Development
                  </li>
                  <p>Web App Development</p>
                  <li className="font-semibold text-sky-600 inline-flex items-center gap-2 pt-4">
                    <FaArrowRight /> Programming Languages
                  </li>
                  <p>C, Java, JavaScript, React</p>
                  <li className="font-semibold text-sky-600 inline-flex items-center gap-2 pt-4">
                    <FaArrowRight /> Databases
                  </li>
                  <p>SQL, MongoDB</p>
                </ul>
              )}
            </div>
            <div>
              <h1 className="font-bold cursor-pointer" onClick={showExperience}>
                Experience
              </h1>
              {visibleSection === "experience" && (
                <ul className="pt-4">
                  <li className="font-semibold text-sky-600 inline-flex items-center gap-2">
                    <FaArrowRight /> Internship at
                  </li>
                  <p>TechnoArt Software (TAS)</p>
                </ul>
              )}
            </div>
            <div>
              <h1 className="font-bold cursor-pointer" onClick={showEducation}>
                Education
              </h1>
              {visibleSection === "education" && (
                <ul className="pt-4">
                  <li className="font-semibold text-sky-600 inline-flex items-center gap-2">
                    <FaArrowRight /> B.Sc in CSE
                  </li>
                  <p>Notre Dame University Bangladesh</p>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
    </div>
  );
};

export default About;
