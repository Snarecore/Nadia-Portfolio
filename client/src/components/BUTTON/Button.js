import React from "react";

const Button = ({ title }) => {
  return (
    <button className="border-2 px-4 py-2 rounded-md  border-sky-600 hover:bg-sky-600 hover:text-white transition-all ease-in-out delay-150 uppercase tracking-wider text-sky-600 font-semibold">
      {title}
    </button>
  );
};

export default Button;
