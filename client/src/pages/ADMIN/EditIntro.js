import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/apiClient";

const EditIntro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState("");
  const [CV, setCV] = useState("");
  const [name, setName] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");

  useEffect(() => {
    API
      .get(`/intro/${id}`)
      .then((res) => {
        const intro = res.data;
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
  }, [id]);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeParagraph = (e) => {
    setParagraph(e.target.value);
  };

  const changeGithubLink = (e) => {
    setGithubLink(e.target.value);
  };

  const changeLinkedInLink = (e) => {
    setLinkedInLink(e.target.value);
  };

  const changeFacebookLink = (e) => {
    setFacebookLink(e.target.value);
  };

  const changeTwitterLink = (e) => {
    setTwitterLink(e.target.value);
  };

  const changeCVLink = (e) => {
    setCV(e.target.value);
  };
  const changeProfileLink = (e) => {
    setProfileImg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedIntro = {
      name,
      paragraph,
      githubLink,
      linkedInLink,
      facebookLink,
      twitterLink,
      profileImg,
      CV,
    };
    API
      .put(`/intro/${id}`, updatedIntro)
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
          Edit Intro
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
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={changeName}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="paragraph"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Paragraph
            </label>
            <textarea
              name="paragraph"
              id="paragraph"
              value={paragraph}
              onChange={changeParagraph}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
              rows="6"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="github"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Github Link
            </label>
            <input
              type="text"
              name="github"
              id="github"
              value={githubLink}
              onChange={changeGithubLink}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="linkedin"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              LinkedIn Link
            </label>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              value={linkedInLink}
              onChange={changeLinkedInLink}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="facebook"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Facebook Link
            </label>
            <input
              type="text"
              name="facebook"
              id="facebook"
              value={facebookLink}
              onChange={changeFacebookLink}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="twitter"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Twitter Link
            </label>
            <input
              type="text"
              name="twitter"
              id="twitter"
              value={twitterLink}
              onChange={changeTwitterLink}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="twitter"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              CV Link
            </label>
            <input
              type="text"
              name="cv"
              id="cv"
              value={CV}
              onChange={changeCVLink}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col ">
            <label
              htmlFor="twitter"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Profile Image Link
            </label>
            <input
              type="text"
              name="profile"
              id="cv"
              value={profileImg}
              onChange={changeProfileLink}
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

export default EditIntro;
