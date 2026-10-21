import React from "react";

const ContactTab = ({ data, onChange, onSave, saving }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-sky-400">
            {data._id ? "Edit Contact Information" : "Create Contact Information"}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Email, phone, location, and contact section message</p>
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
            Contact Heading Description
          </label>
          <textarea
            rows="3"
            placeholder="Invite visitors to reach out..."
            value={data.contactDescription || ""}
            onChange={(e) => onChange({ ...data, contactDescription: e.target.value })}
            className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              Contact Email
            </label>
            <input
              type="text"
              placeholder="e.g. yourname@example.com"
              value={data.gmail || ""}
              onChange={(e) => onChange({ ...data, gmail: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="e.g. +880 1700 000000"
              value={data.phoneNo || ""}
              onChange={(e) => onChange({ ...data, phoneNo: e.target.value })}
              className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-300 mb-1">
            Current Location / Address
          </label>
          <input
            type="text"
            placeholder="e.g. Dhaka, Bangladesh"
            value={data.currentLocation || ""}
            onChange={(e) => onChange({ ...data, currentLocation: e.target.value })}
            className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 transition shadow-lg shadow-sky-600/30 text-sm"
        >
          {saving ? "Saving..." : data._id ? "Update Contact Information" : "Save Contact Information"}
        </button>
      </form>
    </div>
  );
};

export default ContactTab;
