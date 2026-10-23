import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/apiClient";

const ServiceParaEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    API
      .get(`/service/${id}`)
      .then((res) => {
        const service = res.data?.data || res.data;
        if (service) {
          setParagraph(service.serviceParagraph || "");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  const changeParagraph = (e) => {
    setParagraph(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedService = {
      serviceParagraph: paragraph,
    };
    API
      .put(`/service/${id}`, updatedService)
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
          Edit Service
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto space-y-5 "
        >
          <div className="flex flex-col">
            <label
              htmlFor="contactDescription"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Contact Description
            </label>

            <textarea
              name="contactDescription"
              id="contactDescription"
              value={paragraph}
              onChange={changeParagraph}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
              rows="4"
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

export default ServiceParaEdit;
