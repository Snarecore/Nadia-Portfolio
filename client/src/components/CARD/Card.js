import React from "react";
import Button from "../BUTTON/Button";

const Card = ({ image, title, paragraph }) => {
  return (
    <div className=" px-5 py-2 md:px-10">
      <div className="bg-white dark:bg-gray-800 max-w-sm lg:max-w-lg p-5 rounded-lg shadow-md ">
        <div className="flex justify-center items-center h-full">
          <img src={image} alt="" className="w-64" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-center p-5 tracking-wider text-sky-600">
            {title}
          </h1>
          <p className="text-lg text-justify pb-5">{paragraph}</p>
        </div>
        <div className="flex items-center justify-center">
          <Button title={"Let's Talk"}></Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
