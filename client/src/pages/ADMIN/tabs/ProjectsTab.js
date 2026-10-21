import React from "react";
import { Link } from "react-router-dom";

const ProjectsTab = ({ projects, onDeleteProject }) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-3 border-b border-gray-800">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-sky-400">
            Featured Projects ({projects.length})
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Showcase items displayed in the homepage interactive slider</p>
        </div>
        <Link
          to="/page/admin/addNewProject"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg transition shadow"
        >
          + Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-400 bg-gray-800/40 rounded-xl border border-gray-800">
          No live projects available yet. Click above to add your first project.
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, idx) => (
            <div
              key={project._id}
              className="p-4 rounded-xl bg-gray-800/60 border border-gray-700/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="flex items-center gap-4">
                {project.projectImage ? (
                  <img
                    src={project.projectImage}
                    alt={project.projectTitle}
                    className="w-16 h-14 object-cover rounded-lg border border-gray-700 flex-shrink-0"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="w-16 h-14 bg-gray-700/40 rounded-lg flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                    No image
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-sky-400">
                      #{project.projectNo || idx + 1}
                    </span>
                    <h4 className="font-semibold text-white text-sm">
                      {project.projectTitle}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1 max-w-md mt-0.5">
                    {project.projectParagraph}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Link
                  to={`/page/admin/editProjectInfo/${project._id}`}
                  className="text-xs font-semibold text-sky-400 hover:text-sky-300 px-3 py-1.5 rounded-lg bg-sky-950/40 border border-sky-800/40 transition"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => onDeleteProject(project._id)}
                  className="text-xs font-semibold text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;
