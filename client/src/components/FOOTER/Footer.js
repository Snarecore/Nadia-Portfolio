import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-800/80 py-5 text-center text-gray-400">
      <div className="max-w-screen-sm sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
        <p className="text-[11px] uppercase tracking-widest font-medium text-gray-500">
          Designed & Developed with Passion
        </p>
        <p className="text-xs sm:text-sm font-semibold text-gray-300">
          © {currentYear} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
