import React from "react";

const IntroTab = ({ data, onChange, onSave, saving }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-sky-400">
            {data._id ? "Edit Hero / Intro" : "Create Hero / Intro Information"}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Customize hero greeting, biography, and social profiles</p>
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
            Your Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={data.name || ""}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
            Introduction Paragraph
          </label>
          <textarea
            rows="3"
            placeholder="Write a brief intro about yourself..."
            value={data.paragraph || ""}
            onChange={(e) => onChange({ ...data, paragraph: e.target.value })}
            className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              GitHub Profile URL
            </label>
            <input
              type="text"
              placeholder="https://github.com/yourusername"
              value={data.githubLink || ""}
              onChange={(e) => onChange({ ...data, githubLink: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="text"
              placeholder="https://linkedin.com/in/yourprofile"
              value={data.linkedInLink || ""}
              onChange={(e) => onChange({ ...data, linkedInLink: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              Facebook Profile URL
            </label>
            <input
              type="text"
              placeholder="https://facebook.com/yourprofile"
              value={data.facebookLink || ""}
              onChange={(e) => onChange({ ...data, facebookLink: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              Twitter / X Profile URL
            </label>
            <input
              type="text"
              placeholder="https://twitter.com/yourprofile"
              value={data.twitterLink || ""}
              onChange={(e) => onChange({ ...data, twitterLink: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              CV Download Link / URL
            </label>
            <input
              type="text"
              placeholder="e.g. Google Drive link or PDF URL"
              value={data.cv || ""}
              onChange={(e) => onChange({ ...data, cv: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              placeholder="e.g. https://... image URL"
              value={data.profileImage || ""}
              onChange={(e) => onChange({ ...data, profileImage: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Live Profile Image Preview */}
        {data.profileImage && (
          <div className="flex items-center gap-4 p-3 bg-gray-800/40 rounded-xl border border-gray-700/60 mt-2">
            <img
              src={data.profileImage}
              alt="Preview"
              className="w-14 h-14 object-cover rounded-full ring-2 ring-sky-500/30"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="text-xs text-gray-400">
              <span className="text-sky-400 font-semibold block">Live Profile Image Preview</span>
              Image is loading and formatted properly.
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 transition shadow-lg shadow-sky-600/30 text-sm"
        >
          {saving ? "Saving..." : data._id ? "Update Hero Information" : "Save Hero Information"}
        </button>
      </form>
    </div>
  );
};

export default IntroTab;
