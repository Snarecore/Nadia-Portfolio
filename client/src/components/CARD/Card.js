import React from "react";

const Card = ({ image, title, paragraph }) => {
  return (
    <div className="bg-gray-800/80 border border-gray-700/70 p-4 sm:p-5 rounded-xl shadow-lg hover:border-sky-500/50 hover:shadow-sky-500/10 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between text-center group">
      <div>
        {image && (
          <div className="w-11 h-11 mx-auto mb-3 p-2 rounded-lg bg-gray-700/50 flex items-center justify-center">
            <img src={image} alt={title || "Service"} className="w-full h-full object-contain" />
          </div>
        )}
        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-sky-400 transition">
          {title}
        </h3>
        <p className="text-xs text-gray-300 leading-relaxed mb-3">
          {paragraph}
        </p>
      </div>

      <div className="pt-1">
        <span className="inline-block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-sky-400 border border-sky-500/40 px-3 py-1 rounded-lg group-hover:bg-sky-600 group-hover:text-white transition">
          Learn More
        </span>
      </div>
    </div>
  );
};

export default Card;
