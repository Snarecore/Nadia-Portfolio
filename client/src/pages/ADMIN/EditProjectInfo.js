import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/apiClient";

const EditProjectInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setProjectImg] = useState("");
  const [projectNum, setProjectNumber] = useState("");
  const [header, setHeader] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  useEffect(() => {
    API
      .get(`/liveProject/${id}`)
      .then((res) => {
        const projectInfo = res.data;
        if (projectInfo) {
          setProjectImg(projectInfo.projectImage || "");
          setProjectNumber(projectInfo.projectNo || "");
          setHeader(projectInfo.projectTitle || "");
          setParagraph(projectInfo.projectParagraph || "");
          setLiveLink(projectInfo.projectLiveLink || "");
          setGithubLink(projectInfo.projectGithubLink || "");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  const changeProjectImage = (e) => {
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
    const updatedData = {
      projectImage: image,
      projectNo: projectNum,
      projectTitle: header,
      projectParagraph: paragraph,
      projectLiveLink: liveLink,
      projectGithubLink: githubLink,
    };
    API
      .put(`/liveProject/${id}`, updatedData)
      .then((res) => {
        navigate(`/page/admin`);
      })
      .catch((error) => {
        console.error("There was an error updating the data!", error);
      });
  };

  return (
    <div className="flex flex-col justify-evenly w-full">
      <h1 className="py-10 text-4xl font-semibold text-center underline">
        Edit Project Information
      </h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[1000px] p-4 mx-auto space-y-5"
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
            value={image}
            onChange={changeProjectImage}
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
            value={projectNum}
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

        <button
          type="submit"
          className="bg-sky-700 text-2xl px-4 py-2 rounded font-semibold tracking-widest hover:bg-sky-400"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProjectInfo;
