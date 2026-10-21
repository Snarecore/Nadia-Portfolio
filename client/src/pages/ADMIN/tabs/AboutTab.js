import React from "react";

const AboutTab = ({ data, onChange, onSave, saving }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-sky-400">
            {data._id ? "Edit About Information" : "Create About Information"}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Professional headline, biography, and profile picture</p>
        </div>
        {data._id && (
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
            Saved
          </span>
        )}
      </div>

      <form onSubmit={onSave} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
            Professional Title / Designation
          </label>
          <input
            type="text"
            placeholder="e.g. Full-Stack Software Engineer"
            value={data.aboutDesignation || ""}
            onChange={(e) => onChange({ ...data, aboutDesignation: e.target.value })}
            className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
            Detailed About Me Paragraph
          </label>
          <textarea
            rows="4"
            placeholder="Describe your background, mindset, and strengths..."
            value={data.aboutParagraph || ""}
            onChange={(e) => onChange({ ...data, aboutParagraph: e.target.value })}
            className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
            About Image URL
          </label>
          <input
            type="text"
            placeholder="e.g. https://... image URL"
            value={data.aboutImage || ""}
            onChange={(e) => onChange({ ...data, aboutImage: e.target.value })}
            className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Live Image Preview */}
        {data.aboutImage && (
          <div className="flex items-center gap-4 p-3 bg-gray-800/40 rounded-xl border border-gray-700/60 mt-2">
            <img
              src={data.aboutImage}
              alt="About Preview"
              className="w-16 h-16 object-cover rounded-xl border border-gray-700"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="text-xs text-gray-400">
              <span className="text-sky-400 font-semibold block">About Image Preview</span>
              Image is loaded and ready.
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 transition shadow-lg shadow-sky-600/30 text-sm"
        >
          {saving ? "Saving..." : data._id ? "Update About Information" : "Save About Information"}
        </button>
      </form>
    </div>
  );
};

export default AboutTab;
