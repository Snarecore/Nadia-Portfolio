import React, { useEffect, useState } from "react";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

import Button from "../../components/BUTTON/Button";
import API from "../../api/apiClient";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [contactDescription, setContactDescription] = useState("");
  const [gmail, setGmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      access_key: "7d54ed91-2ba8-432a-a598-bd1aae19eb17",
      name,
      email,
      message,
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());

    if (res.success) {
      setSuccessMessage("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setSuccessMessage("There was an error sending your message.");
    }
  };

  useEffect(() => {
    API.get("/contact")
      .then((res) => {
        const contact = res.data?.data?.[0];
        if (contact) {
          setContactDescription(contact.contactDescription || "");
          setGmail(contact.gmail || "");
          setPhoneNo(contact.phoneNo || "");
          setCurrentLocation(contact.currentLocation || "");
        }
      })
      .catch((error) => {
        console.error("Error fetching contact info:", error);
      });
  }, []);

  return (
    <div className="w-full bg-white dark:bg-gray-900 text-black dark:text-white pt-10 pb-10">
      <h1 className="text-center tracking-widest">Get in Touch</h1>
      <h1 className="text-5xl font-bold text-center">Contact Me</h1>

      <div className=" lg:flex justify-around pt-10">
        <div>
          <h1 className="text-4xl font-bold pb-2 lg:pb-8 px-10 lg:px-0 ">
            Let's Talk
          </h1>
          <p className="lg:max-w-xl text-2xl pb-8 leading-relaxed text-justify px-10 lg:px-0">
            {contactDescription}
          </p>
          <div className="flex items-center space-x-6 pb-5 text-2xl lg:text-2xl px-10 lg:px-0">
            <IoMail />
            <Link to="mailto:forazizubayer@gmail.com">{gmail}</Link>
          </div>
          <div className="flex items-center space-x-6 pb-5 text-2xl lg:text-2xl px-10 lg:px-0">
            <FaPhoneAlt />
            <Link to="tel:01646745401" className="font-mono">
              {phoneNo}
            </Link>
          </div>
          <div className="flex items-center space-x-6 text-2xl lg:text-2xl px-10 lg:px-0">
            <FaLocationDot />
            <Link to="#">{currentLocation}</Link>
          </div>
        </div>

        <div className="px-10 py-10 w-full lg:w-1/4 lg:px-0 lg:py-0">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-5">
              <label
                htmlFor="name"
                className="text-2xl font-semibold tracking-wider"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="bg-white dark:bg-gray-800 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 tracking-widest text-lg capitalize"
              />
            </div>

            <div className="flex flex-col space-y-5">
              <label
                htmlFor="email"
                className="pt-5 text-2xl font-semibold tracking-wider"
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="bg-white dark:bg-gray-800 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 tracking-widest text-lg lowercase"
              />
            </div>

            <div className="flex flex-col space-y-5">
              <label
                htmlFor="message"
                className="pt-5 text-2xl font-semibold tracking-wider"
              >
                Write Your Message Here
              </label>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter Your Message"
                className="bg-white dark:bg-gray-800 w-full border border-slate-700 rounded-xl py-4 pl-4 pr-10 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 tracking-widest text-lg"
              ></textarea>
              <Button type="submit" title={"Submit"}></Button>
            </div>
          </form>
          {successMessage && (
            <div className="mt-5 p-4 bg-sky-600 text-white rounded-md">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
