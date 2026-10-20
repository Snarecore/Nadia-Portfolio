import React, { useEffect, useState } from "react";
import API from "../../api/apiClient";

const ProjectsInfo = () => {
  const [noOfExperience, setNoOfExperience] = useState("");
  const [noOfProjectCompleted, setNoOfProjectCompleted] = useState("");
  const [noOfTechnology, setNoOfTechnology] = useState("");
  const [noOfCodeCommits, setNoOfCodeCommits] = useState("");

  useEffect(() => {
    API.get("/projectInfo")
      .then((res) => {
        const projectInfo = res.data?.data?.[0];
        if (projectInfo) {
          setNoOfExperience(projectInfo.noOfExperience ?? 0);
          setNoOfProjectCompleted(projectInfo.noOfProjectCompleted ?? 0);
          setNoOfTechnology(projectInfo.noOfTechnology ?? 0);
          setNoOfCodeCommits(projectInfo.noOfCodeCommits ?? 0);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const stats = [
    { value: noOfExperience, label: "Years of Experience" },
    { value: noOfProjectCompleted, label: "Projects Completed" },
    { value: noOfTechnology, label: "Technologies Mastered" },
    { value: noOfCodeCommits, label: "Code Commits" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 max-w-5xl mx-auto">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <span className="text-3xl md:text-4xl font-extrabold font-mono text-sky-400">
            {stat.value || 0}
          </span>
          <p className="text-xs uppercase tracking-wider text-gray-400 font-medium leading-tight">
            {stat.label.split(" ").slice(0, 1).join(" ")} <br />
            {stat.label.split(" ").slice(1).join(" ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectsInfo;
