import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/apiClient";

const EditAbout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aboutImg, setAboutImg] = useState("");
  const [designation, setDesignation] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    API
      .get(`/about/${id}`)
      .then((res) => {
        const aboutInfo = res.data;
        if (aboutInfo) {
          setAboutImg(aboutInfo.aboutImage || "");
          setDesignation(aboutInfo.aboutDesignation || "");
          setParagraph(aboutInfo.aboutParagraph || "");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setError("There was an error fetching the data!");
      });
  }, [id]);

  const changeAboutImage = (e) => {
    setAboutImg(e.target.value);
  };

  const changeDesignation = (e) => {
    setDesignation(e.target.value);
  };

  const changeParagraph = (e) => {
    setParagraph(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedInfo = {
      aboutImage: aboutImg,
      aboutDesignation: designation,
      aboutParagraph: paragraph,
    };
    API
      .put(`/about/${id}`, updatedInfo)
      .then(() => {
        navigate("/page/admin");
      })
      .catch((error) => {
        console.error("There was an error updating the data!", error);
        setError("There was an error updating the data!");
      });
  };

  return (
    <div className="flex flex-col justify-evenly w-full">
      <h1 className="py-10 text-4xl font-semibold text-center underline">
        Edit About Section
      </h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col border-2 border-sky-400 rounded-xl w-[1000px] p-4 mx-auto space-y-5"
      >
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="pb-2 text-2xl font-semibold tracking-wide"
          >
            About Image Link
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={aboutImg}
            onChange={changeAboutImage}
            className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-xl font-semibold text-black"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="designation"
            className="pb-2 text-2xl font-semibold tracking-wide"
          >
            Designation
          </label>
          <input
            type="text"
            name="designation"
            id="designation"
            value={designation}
            onChange={changeDesignation}
            className="bg-white dark:bg-gray-300 w-[700px] border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-xl font-semibold text-black"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="para"
            className="pb-2 text-2xl font-semibold tracking-wide"
          >
            Paragraph
          </label>
          <textarea
            name="para"
            id="para"
            value={paragraph}
            onChange={changeParagraph}
            rows={5}
            className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black text-justify"
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

export default EditAbout;
