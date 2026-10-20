import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/apiClient";

import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

const LeftSlider = () => {
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");

  useEffect(() => {
    API.get("/intro")
      .then((res) => {
        const sliderInfo = res.data?.data?.[0];
        if (sliderInfo) {
          setFacebookLink(sliderInfo.facebookLink || "");
          setTwitterLink(sliderInfo.twitterLink || "");
          setGithubLink(sliderInfo.githubLink || "");
          setLinkedinLink(sliderInfo.linkedInLink || "");
        }
      })
      .catch((err) => console.error("Error fetching intro in LeftSlider:", err));
  }, []);
  return (
    <div className="static sm:fixed left-0 bottom-0 px-2">
      <div className="flex flex-col items-center">
        <div className="flex flex-row pt-10 sm:flex-col gap-3">
          <Link to={linkedinLink} target="_blank">
            <FaLinkedin className="text-gray-600 text-2xl cursor-pointer hover:text-white" />
          </Link>
          <Link to={facebookLink} target="_blank">
            <FaFacebook className="text-gray-600 text-2xl cursor-pointer hover:text-white" />
          </Link>
          <Link to={githubLink} target="_blank">
            <FaGithubSquare className="text-gray-600 text-2xl cursor-pointer hover:text-white" />
          </Link>
          <Link to={twitterLink} target="_blank">
            <FaSquareXTwitter className="text-gray-600 text-2xl cursor-pointer hover:text-white" />
          </Link>
        </div>
        <div className=" w-[1px] h-32 bg-[#125f63] hidden sm:block"></div>
      </div>
    </div>
  );
};

export default LeftSlider;
