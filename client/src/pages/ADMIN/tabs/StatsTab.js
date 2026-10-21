import React from "react";

const StatsTab = ({ data, onChange, onSave, saving }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-sky-400">
            {data._id ? "Edit Career Statistics" : "Create Career Statistics"}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Metrics displayed under hero section (e.g. Years, Commits)</p>
        </div>
        {data._id && (
          <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
            Saved
          </span>
        )}
      </div>

      <form onSubmit={onSave} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 2"
              value={data.noOfExperience ?? ""}
              onChange={(e) => onChange({ ...data, noOfExperience: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              Projects Completed
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 15"
              value={data.noOfProjectCompleted ?? ""}
              onChange={(e) => onChange({ ...data, noOfProjectCompleted: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              Technologies Mastered
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 8"
              value={data.noOfTechnology ?? ""}
              onChange={(e) => onChange({ ...data, noOfTechnology: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              Code Commits
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 500"
              value={data.noOfCodeCommits ?? ""}
              onChange={(e) => onChange({ ...data, noOfCodeCommits: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 transition shadow-lg shadow-sky-600/30 text-sm"
        >
          {saving ? "Saving..." : data._id ? "Update Statistics" : "Save Statistics"}
        </button>
      </form>
    </div>
  );
};

export default StatsTab;
