import React from "react";
import LeftSlider from "../LEFTSLIDER/LeftSlider";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-800/80 py-8 text-center text-gray-400">
      <div className="max-w-6xl mx-auto px-4 space-y-2">
        <p className="text-xs uppercase tracking-widest font-medium text-gray-500">
          Designed & Developed with Passion
        </p>
        <p className="text-sm font-semibold text-gray-300">
          © {currentYear} All Rights Reserved.
        </p>
      </div>
      <LeftSlider />
    </footer>
  );
};

export default Footer;
