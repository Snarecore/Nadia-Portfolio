import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/apiClient";

const ProjectInfoEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noOfExperience, setNoOfExperience] = useState("");
  const [noOfProjectCompleted, setNoOfProjectCompleted] = useState("");
  const [noOfTechnology, setNoOfTechnology] = useState("");
  const [noOfCodeCommits, setNoOfCodeCommits] = useState("");

  useEffect(() => {
    API
      .get(`/projectInfo/${id}`)
      .then((res) => {
        const projectInfo = res.data?.data || res.data;
        if (projectInfo) {
          setNoOfExperience(projectInfo.noOfExperience ?? "");
          setNoOfProjectCompleted(projectInfo.noOfProjectCompleted ?? "");
          setNoOfTechnology(projectInfo.noOfTechnology ?? "");
          setNoOfCodeCommits(projectInfo.noOfCodeCommits ?? "");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  const changeExperience = (e) => {
    setNoOfExperience(e.target.value);
  };

  const changeProjectCompleted = (e) => {
    setNoOfProjectCompleted(e.target.value);
  };

  const changeTechnology = (e) => {
    setNoOfTechnology(e.target.value);
  };

  const changeCodeCommits = (e) => {
    setNoOfCodeCommits(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProjectInfo = {
      noOfExperience,
      noOfProjectCompleted,
      noOfTechnology,
      noOfCodeCommits,
    };
    API
      .put(`/projectInfo/${id}`, updatedProjectInfo)
      .then(() => {
        navigate("/page/admin");
      })
      .catch((error) => {
        console.error("There was an error updating the data!", error);
      });
  };

  return (
    <div>
      <div className="flex flex-col justify-evenly w-full">
        <h1 className="py-10 text-4xl font-semibold text-center underline">
          Edit Project Information
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto space-y-5 "
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              No. of Experience
            </label>
            <input
              type="number"
              name="noOfExperience"
              id="noOfExperience"
              value={noOfExperience}
              onChange={changeExperience}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="paragraph"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              No. of Project Completed
            </label>
            <input
              type="number"
              name="noOfTechnologyMastered"
              id="noOfTechnologyMastered"
              value={noOfProjectCompleted}
              onChange={changeProjectCompleted}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="github"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              No. of Technology Mastered
            </label>
            <input
              type="number"
              name="noOfTechnologyMastered"
              id="noOfTechnologyMastered"
              value={noOfTechnology}
              onChange={changeTechnology}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="linkedin"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              No. of Code Commits
            </label>
            <input
              type="number"
              name="noOfCodeCommits"
              id="noOfCodeCommits"
              value={noOfCodeCommits}
              onChange={changeCodeCommits}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex justify-around items-center text-2xl">
            <button
              type="submit"
              className="bg-sky-700 px-4 py-2 rounded font-semibold tracking-widest hover:bg-sky-400"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectInfoEdit;
