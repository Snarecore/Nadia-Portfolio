import React, { useEffect, useState } from "react";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
    setSuccessMessage("Your message has been sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSuccessMessage(""), 4000);
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
    <section className="py-16 px-4 md:px-8 bg-gray-900/60 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          {/* Left Info Column */}
          <div>
            <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold mb-1 block">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
              Let's Talk About Your Project
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-md">
              {contactDescription ||
                "Have a question, proposal, or want to collaborate? Feel free to reach out anytime."}
            </p>

            <div className="space-y-3.5 text-sm text-gray-300">
              {gmail && (
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-lg bg-gray-800 text-sky-400">
                    <IoMail className="text-base" />
                  </span>
                  <Link to={`mailto:${gmail}`} className="hover:text-sky-400 transition">
                    {gmail}
                  </Link>
                </div>
              )}

              {phoneNo && (
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-lg bg-gray-800 text-sky-400">
                    <FaPhoneAlt className="text-sm" />
                  </span>
                  <Link to={`tel:${phoneNo}`} className="font-mono hover:text-sky-400 transition">
                    {phoneNo}
                  </Link>
                </div>
              )}

              {currentLocation && (
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-lg bg-gray-800 text-sky-400">
                    <FaLocationDot className="text-sm" />
                  </span>
                  <span>{currentLocation}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Form Column */}
          <div className="bg-gray-800/80 border border-gray-700/80 p-6 md:p-8 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Send a Message</h3>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Smith"
                  className="w-full bg-gray-900/90 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full bg-gray-900/90 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can I help you?"
                  className="w-full bg-gray-900/90 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 transition shadow-lg shadow-sky-600/30 text-sm"
              >
                Send Message
              </button>
            </form>

            {successMessage && (
              <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs text-center rounded-xl font-medium">
                ✓ {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
