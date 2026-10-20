import React, { useEffect, useState } from "react";
import Slider from "../../components/SLIDER/Slider";
import API from "../../api/apiClient";

const Projects = () => {
  const [liveProjects, setLiveProjects] = useState([]);

  useEffect(() => {
    API.get("/liveProject")
      .then((res) => {
        setLiveProjects(res.data?.data || []);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto border-t border-gray-800">
      <div className="text-center mb-6">
        <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1">
          Recent Works
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Featured Projects
        </h2>
      </div>

      {liveProjects && liveProjects.length > 0 ? (
        <Slider projectData={liveProjects} />
      ) : (
        <div className="text-center py-10 text-sm text-gray-400">
          No projects published yet.
        </div>
      )}
    </section>
  );
};

export default Projects;
