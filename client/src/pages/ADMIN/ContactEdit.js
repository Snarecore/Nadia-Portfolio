import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/apiClient";

const ContactEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [gmail, setGmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    API
      .get(`/contact/${id}`)
      .then((res) => {
        const contact = res.data;
        if (contact) {
          setDescription(contact.contactDescription || "");
          setGmail(contact.gmail || "");
          setPhoneNo(contact.phoneNo || "");
          setCurrentLocation(contact.currentLocation || "");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [id]);

  const changeDescription = (e) => {
    setDescription(e.target.value);
  };

  const changeGmail = (e) => {
    setGmail(e.target.value);
  };

  const changePhoneNo = (e) => {
    setPhoneNo(e.target.value);
  };

  const changeCurrentLocation = (e) => {
    setCurrentLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedContact = {
      contactDescription: description,
      gmail,
      phoneNo,
      currentLocation,
    };
    API
      .put(`/contact/${id}`, updatedContact)
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
          Edit Contact
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
              value={description}
              onChange={changeDescription}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
              rows="4"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="gmail"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Gmail
            </label>
            <input
              type="text"
              name="gmail"
              id="gmail"
              value={gmail}
              onChange={changeGmail}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="phoneNo"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNo"
              id="phoneNo"
              value={phoneNo}
              onChange={changePhoneNo}
              className="bg-white dark:bg-gray-300 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 text-2xl font-semibold text-black"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="currentLocation"
              className="pb-2 text-2xl font-semibold tracking-wide"
            >
              Current Location
            </label>
            <input
              type="text"
              name="currentLocation"
              id="currentLocation"
              value={currentLocation}
              onChange={changeCurrentLocation}
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

export default ContactEdit;
