import React from "react";
import { Link } from "react-router-dom";

const ServiceTab = ({
  data,
  onChange,
  onSave,
  saving,
  cards,
  onDeleteCard,
}) => {
  return (
    <div className="space-y-8">
      {/* 1. Experience Overview Paragraph */}
      <div>
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-sky-400">
              Experience Overview
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Top-level introductory paragraph for experience section</p>
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
              Section Description
            </label>
            <textarea
              rows="3"
              placeholder="Describe your career journey, expertise, and development experience..."
              value={data.serviceParagraph || ""}
              onChange={(e) => onChange({ ...data, serviceParagraph: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 transition shadow-lg shadow-sky-600/30 text-sm"
          >
            {saving ? "Saving..." : data._id ? "Update Overview" : "Save Overview"}
          </button>
        </form>
      </div>

      {/* 2. Experience Cards Management */}
      <div className="pt-6 border-t border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Experience Roles ({cards.length})</h3>
            <p className="text-xs text-gray-400">Individual jobs, internships, or professional roles</p>
          </div>
          <Link
            to="/page/admin/addServiceCard"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg transition shadow"
          >
            + Add New Experience Role
          </Link>
        </div>

        {cards.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-400 bg-gray-800/40 rounded-xl border border-gray-800">
            No service cards added yet. Click above to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card) => (
              <div
                key={card._id}
                className="p-4 rounded-xl bg-gray-800/60 border border-gray-700/80 flex flex-col justify-between"
              >
                <div>
                  {card.cardImage && (
                    <img
                      src={card.cardImage}
                      alt={card.cardHeader}
                      className="w-10 h-10 object-contain mb-2 p-1.5 bg-gray-700/40 rounded-lg"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <h4 className="font-semibold text-white text-sm mb-1">{card.cardHeader}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-3">{card.cardParagraph}</p>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-700/60">
                  <Link
                    to={`/page/admin/editServiceCard/${card._id}`}
                    className="text-xs font-semibold text-sky-400 hover:text-sky-300 px-2.5 py-1 rounded bg-sky-950/40 border border-sky-800/40 transition"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDeleteCard(card._id)}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 px-2.5 py-1 rounded bg-red-950/40 border border-red-800/40 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceTab;
