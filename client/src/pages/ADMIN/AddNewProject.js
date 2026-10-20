import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/apiClient";

const AddNewProject = () => {
  const [projectImg, setProjectImg] = useState("");
  const [projectNumber, setProjectNumber] = useState("");
  const [header, setHeader] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const navigate = useNavigate();

  const changeProjectImg = (e) => {
    setProjectImg(e.target.value);
  };

  const changeProjectNumber = (e) => {
    setProjectNumber(e.target.value);
  };

  const changeHeader = (e) => {
    setHeader(e.target.value);
  };

  const changeParagraph = (e) => {
    setParagraph(e.target.value);
  };

  const changeLiveLink = (e) => {
    setLiveLink(e.target.value);
  };

  const changeGithubLink = (e) => {
    setGithubLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      projectImage: projectImg,
      projectNo: projectNumber,
      projectTitle: header,
      projectParagraph: paragraph,
      projectLiveLink: liveLink,
      projectGithubLink: githubLink,
    };
    API
      .post(`/liveProject`, newProject)
      .then(() => {
        navigate(`/page/admin`);
      })
      .catch((error) => {
        console.error("There was an error adding the service card!", error);
      });
  };

  return (
    <div>
      <div className="flex flex-col  justify-evenly w-full">
        <h1 className="py-10 text-4xl font-semibold text-center underline">
          Add New Project Information
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col  border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto space-y-5"
        >
          <div className="flex flex-col">
            <label
              htmlFor="header"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Project Image Link
            </label>

            <input
              name="header"
              id="header"
              value={projectImg}
              onChange={changeProjectImg}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="no"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Project No
            </label>

            <input
              name="no"
              id="no"
              value={projectNumber}
              onChange={changeProjectNumber}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="header"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Project Header
            </label>

            <input
              name="header"
              id="header"
              value={header}
              onChange={changeHeader}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="paragraph"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Project Paragraph
            </label>
            <textarea
              name="paragraph"
              id="paragraph"
              value={paragraph}
              onChange={changeParagraph}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
              rows={5}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="liveLink"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Project Live Link
            </label>

            <input
              name="liveLink"
              id="liveLink"
              value={liveLink}
              onChange={changeLiveLink}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="githubLink"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Project Github Link
            </label>

            <input
              name="githubLink"
              id="githubLink"
              value={githubLink}
              onChange={changeGithubLink}
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

export default AddNewProject;
