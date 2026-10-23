import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/apiClient";

const EditServiceCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceImg, setServiceImg] = useState("");
  const [header, setHeader] = useState("");
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    API
      .get(`/serviceCard/${id}`)
      .then((res) => {
        const cardInfo = res.data?.data || res.data;
        if (cardInfo) {
          setServiceImg(cardInfo.cardImage || "");
          setHeader(cardInfo.cardHeader || "");
          setParagraph(cardInfo.cardParagraph || "");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  const changeHeader = (e) => {
    setHeader(e.target.value);
  };

  const changeParagraph = (e) => {
    setParagraph(e.target.value);
  };
  const changeServiceImg = (e) => {
    setServiceImg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      cardImage: serviceImg,
      cardHeader: header,
      cardParagraph: paragraph,
    };
    API
      .put(`/serviceCard/${id}`, updatedData)
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
        Edit Service Card
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
            Card Image Link
          </label>
          <input
            type="text"
            name="cardImg"
            id="cardImg"
            value={serviceImg}
            onChange={changeServiceImg}
            className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="header"
            className="pb-2 text-2xl font-semibold tracking-wide"
          >
            Card Header
          </label>
          <input
            type="text"
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
            Card Paragraph
          </label>
          <textarea
            type="text"
            name="paragraph"
            id="paragraph"
            value={paragraph}
            onChange={changeParagraph}
            className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black text-justify"
            rows="5"
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

export default EditServiceCard;
