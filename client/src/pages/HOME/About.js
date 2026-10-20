import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import API from "../../api/apiClient";
import { useParams } from "react-router-dom";

const About = () => {
  const { id } = useParams();
  const [visibleSection, setVisibleSection] = useState("skills");
  const [aboutInfo, setAboutInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/about")
      .then((res) => {
        setAboutInfo(res.data?.data?.[0] || {});
      })
      .catch((err) => {
        console.error("Error fetching about info:", err);
        setError("Could not load about information.");
      });
  }, [id]);

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-900/60 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {aboutInfo?.aboutImage && (
          <div className="flex-shrink-0">
            <img
              src={aboutInfo.aboutImage}
              alt={aboutInfo.aboutDesignation || "About"}
              className="w-52 sm:w-64 md:w-72 object-cover rounded-2xl border border-gray-700/80 shadow-2xl"
            />
          </div>
        )}

        <div className="flex-1 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-1 block">
            About Me
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
            {aboutInfo?.aboutDesignation || "Full-Stack Software Engineer"}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mb-8 mx-auto md:mx-0">
            {aboutInfo?.aboutParagraph ||
              "I am passionate about creating clean, scalable web applications with great user experience."}
          </p>

          {/* Interactive Tab Pills */}
          <div className="flex justify-center md:justify-start gap-2 mb-6 border-b border-gray-800 pb-3">
            {[
              { id: "skills", label: "Skills" },
              { id: "experience", label: "Experience" },
              { id: "education", label: "Education" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setVisibleSection(tab.id)}
                className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-lg transition ${
                  visibleSection === tab.id
                    ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="text-sm text-gray-300 max-w-xl mx-auto md:mx-0">
            {visibleSection === "skills" && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li className="flex items-center gap-2 text-white font-medium">
                  <FaArrowRight className="text-sky-400 text-xs flex-shrink-0" />
                  <span>UI/UX & Web Design</span>
                </li>
                <li className="flex items-center gap-2 text-white font-medium">
                  <FaArrowRight className="text-sky-400 text-xs flex-shrink-0" />
                  <span>React.js & Modern Frontend</span>
                </li>
                <li className="flex items-center gap-2 text-white font-medium">
                  <FaArrowRight className="text-sky-400 text-xs flex-shrink-0" />
                  <span>Node.js & Express APIs</span>
                </li>
                <li className="flex items-center gap-2 text-white font-medium">
                  <FaArrowRight className="text-sky-400 text-xs flex-shrink-0" />
                  <span>MongoDB & Database Architecture</span>
                </li>
              </ul>
            )}

            {visibleSection === "experience" && (
              <div className="space-y-3">
                <div className="border-l-2 border-sky-500 pl-3">
                  <h4 className="font-semibold text-white">Full Stack Intern / Developer</h4>
                  <p className="text-xs text-sky-400">Software & Web Development</p>
                  <p className="text-xs text-gray-400 mt-1">Worked on client websites and internal products.</p>
                </div>
              </div>
            )}

            {visibleSection === "education" && (
              <div className="space-y-3">
                <div className="border-l-2 border-sky-500 pl-3">
                  <h4 className="font-semibold text-white">B.Sc. in Computer Science & Engineering</h4>
                  <p className="text-xs text-sky-400">Undergraduate Degree</p>
                  <p className="text-xs text-gray-400 mt-1">Focused on software engineering, web algorithms and data structures.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {error && <div className="text-xs text-red-400 text-center mt-4">{error}</div>}
    </section>
  );
};

export default About;
