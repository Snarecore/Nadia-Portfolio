import React from "react";

const Card = ({ image, title, paragraph }) => {
  return (
    <div className="bg-gray-800/80 border border-gray-700/70 p-6 rounded-2xl shadow-lg hover:border-sky-500/50 hover:shadow-sky-500/10 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between text-center group">
      <div>
        {image && (
          <div className="w-14 h-14 mx-auto mb-4 p-2.5 rounded-xl bg-gray-700/50 flex items-center justify-center">
            <img src={image} alt={title || "Service"} className="w-full h-full object-contain" />
          </div>
        )}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition">
          {title}
        </h3>
        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          {paragraph}
        </p>
      </div>

      <div className="pt-2">
        <span className="inline-block text-xs uppercase tracking-wider font-semibold text-sky-400 border border-sky-500/40 px-3 py-1.5 rounded-lg group-hover:bg-sky-600 group-hover:text-white transition">
          Learn More
        </span>
      </div>
    </div>
  );
};

export default Card;
