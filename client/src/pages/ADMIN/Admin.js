import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/apiClient";
import { authService } from "../../services/portfolioService";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const [visibleSection, setVisibleSection] = useState("intro");

  // State for each section
  const [introData, setIntroData] = useState({
    _id: "",
    name: "",
    paragraph: "",
    githubLink: "",
    linkedInLink: "",
    facebookLink: "",
    twitterLink: "",
    cv: "",
    profileImage: "",
  });

  const [projectStats, setProjectStats] = useState({
    _id: "",
    noOfExperience: "",
    noOfProjectCompleted: "",
    noOfTechnology: "",
    noOfCodeCommits: "",
  });

  const [aboutData, setAboutData] = useState({
    _id: "",
    aboutDesignation: "",
    aboutImage: "",
    aboutParagraph: "",
  });

  const [serviceData, setServiceData] = useState({
    _id: "",
    serviceParagraph: "",
  });
  const [serviceCards, setServiceCards] = useState([]);

  const [contactData, setContactData] = useState({
    _id: "",
    contactDescription: "",
    gmail: "",
    phoneNo: "",
    currentLocation: "",
  });

  const [liveProjects, setLiveProjects] = useState([]);

  const showNotification = (msg, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setSuccessMsg("");
    } else {
      setSuccessMsg(msg);
      setErrorMsg("");
    }
    setTimeout(() => {
      setSuccessMsg("");
      setErrorMsg("");
    }, 4000);
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [
        introRes,
        projectInfoRes,
        contactRes,
        serviceRes,
        serviceCardRes,
        liveProjectsRes,
        aboutRes,
      ] = await Promise.allSettled([
        API.get("/intro"),
        API.get("/projectInfo"),
        API.get("/contact"),
        API.get("/service"),
        API.get("/serviceCard"),
        API.get("/liveProject"),
        API.get("/about"),
      ]);

      if (introRes.status === "fulfilled" && introRes.value.data?.data?.[0]) {
        const item = introRes.value.data.data[0];
        setIntroData({
          _id: item._id || "",
          name: item.name || "",
          paragraph: item.paragraph || "",
          githubLink: item.githubLink || "",
          linkedInLink: item.linkedInLink || "",
          facebookLink: item.facebookLink || "",
          twitterLink: item.twitterLink || "",
          cv: item.cv || "",
          profileImage: item.profileImage || "",
        });
      }

      if (projectInfoRes.status === "fulfilled" && projectInfoRes.value.data?.data?.[0]) {
        const item = projectInfoRes.value.data.data[0];
        setProjectStats({
          _id: item._id || "",
          noOfExperience: item.noOfExperience ?? "",
          noOfProjectCompleted: item.noOfProjectCompleted ?? "",
          noOfTechnology: item.noOfTechnology ?? "",
          noOfCodeCommits: item.noOfCodeCommits ?? "",
        });
      }

      if (contactRes.status === "fulfilled" && contactRes.value.data?.data?.[0]) {
        const item = contactRes.value.data.data[0];
        setContactData({
          _id: item._id || "",
          contactDescription: item.contactDescription || "",
          gmail: item.gmail || "",
          phoneNo: item.phoneNo || "",
          currentLocation: item.currentLocation || "",
        });
      }

      if (serviceRes.status === "fulfilled" && serviceRes.value.data?.data?.[0]) {
        const item = serviceRes.value.data.data[0];
        setServiceData({
          _id: item._id || "",
          serviceParagraph: item.serviceParagraph || "",
        });
      }

      if (serviceCardRes.status === "fulfilled") {
        setServiceCards(serviceCardRes.value.data?.data || []);
      }

      if (liveProjectsRes.status === "fulfilled") {
        setLiveProjects(liveProjectsRes.value.data?.data || []);
      }

      if (aboutRes.status === "fulfilled" && aboutRes.value.data?.data?.[0]) {
        const item = aboutRes.value.data.data[0];
        setAboutData({
          _id: item._id || "",
          aboutDesignation: item.aboutDesignation || "",
          aboutImage: item.aboutImage || "",
          aboutParagraph: item.aboutParagraph || "",
        });
      }
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/page/admin/login");
  };

  // --- SAVE / UPDATE HANDLERS ---

  // 1. Intro Save / Update
  const handleSaveIntro = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (introData._id) {
        await API.put(`/intro/${introData._id}`, introData);
        showNotification("Intro updated successfully!");
      } else {
        const res = await API.post("/intro", introData);
        setIntroData((prev) => ({ ...prev, _id: res.data?._id || res.data?.data?._id }));
        showNotification("Intro created and saved successfully!");
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save intro data", true);
    } finally {
      setSaving(false);
    }
  };

  // 2. Stats Save / Update
  const handleSaveStats = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      noOfExperience: Number(projectStats.noOfExperience) || 0,
      noOfProjectCompleted: Number(projectStats.noOfProjectCompleted) || 0,
      noOfTechnology: Number(projectStats.noOfTechnology) || 0,
      noOfCodeCommits: Number(projectStats.noOfCodeCommits) || 0,
    };
    try {
      if (projectStats._id) {
        await API.put(`/projectInfo/${projectStats._id}`, payload);
        showNotification("Statistics updated successfully!");
      } else {
        const res = await API.post("/projectInfo", payload);
        setProjectStats((prev) => ({ ...prev, _id: res.data?._id || res.data?.data?._id }));
        showNotification("Statistics created and saved successfully!");
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save statistics", true);
    } finally {
      setSaving(false);
    }
  };

  // 3. About Save / Update
  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (aboutData._id) {
        await API.put(`/about/${aboutData._id}`, aboutData);
        showNotification("About information updated successfully!");
      } else {
        const res = await API.post("/about", aboutData);
        setAboutData((prev) => ({ ...prev, _id: res.data?._id || res.data?.data?._id }));
        showNotification("About information created and saved successfully!");
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save about information", true);
    } finally {
      setSaving(false);
    }
  };

  // 4. Service Overview Save / Update
  const handleSaveService = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (serviceData._id) {
        await API.put(`/service/${serviceData._id}`, serviceData);
        showNotification("Services overview updated successfully!");
      } else {
        const res = await API.post("/service", serviceData);
        setServiceData((prev) => ({ ...prev, _id: res.data?._id || res.data?.data?._id }));
        showNotification("Services overview created and saved successfully!");
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save services overview", true);
    } finally {
      setSaving(false);
    }
  };

  // 5. Contact Save / Update
  const handleSaveContact = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (contactData._id) {
        await API.put(`/contact/${contactData._id}`, contactData);
        showNotification("Contact information updated successfully!");
      } else {
        const res = await API.post("/contact", contactData);
        setContactData((prev) => ({ ...prev, _id: res.data?._id || res.data?.data?._id }));
        showNotification("Contact information created and saved successfully!");
      }
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save contact information", true);
    } finally {
      setSaving(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await API.delete(`/liveProject/${projectId}`);
      setLiveProjects((prev) => prev.filter((p) => p._id !== projectId));
      showNotification("Project deleted successfully!");
    } catch (err) {
      showNotification("Failed to delete project", true);
    }
  };

  // Delete Service Card
  const handleDeleteServiceCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this service card?")) return;
    try {
      await API.delete(`/serviceCard/${cardId}`);
      setServiceCards((prev) => prev.filter((c) => c._id !== cardId));
      showNotification("Service card deleted successfully!");
    } catch (err) {
      showNotification("Failed to delete service card", true);
    }
  };

  return (
    <div className="text-white px-4 md:px-10 bg-gray-950 min-h-screen pb-20">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-center py-6 border-b border-gray-800 mb-8 gap-4 max-w-5xl mx-auto">
        <Link
          to="/"
          className="text-sky-400 hover:text-sky-300 font-medium text-base flex items-center gap-2"
        >
          ← View Live Portfolio
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider text-center text-white">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition text-sm"
        >
          Sign Out
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="max-w-3xl mx-auto mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-center font-medium shadow-lg animate-fade-in">
          ✓ {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="max-w-3xl mx-auto mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-center font-medium shadow-lg">
          ✕ {errorMsg}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 max-w-5xl mx-auto">
        {[
          { id: "intro", label: "Hero / Intro" },
          { id: "projectInfo", label: "Technology Stats" },
          { id: "about", label: "About Me" },
          { id: "services", label: "Services" },
          { id: "projects", label: "Projects" },
          { id: "contact", label: "Contact Info" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setVisibleSection(tab.id)}
            className={`px-5 py-2.5 rounded-xl text-base font-semibold transition ${
              visibleSection === tab.id
                ? "bg-sky-600 text-white shadow-lg shadow-sky-600/30"
                : "bg-gray-900 text-gray-300 hover:bg-gray-800 hover:text-white border border-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-lg text-gray-400">
          Loading dashboard content...
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-gray-900/90 p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl">
          {/* TAB 1: INTRO */}
          {visibleSection === "intro" && (
            <div>
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-sky-400">
                  {introData._id ? "Edit Hero / Intro" : "Create Hero / Intro Information"}
                </h2>
                {introData._id && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                    Existing Data Loaded
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveIntro} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={introData.name}
                    onChange={(e) => setIntroData({ ...introData, name: e.target.value })}
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Introduction Paragraph</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Write a brief intro about yourself..."
                    value={introData.paragraph}
                    onChange={(e) => setIntroData({ ...introData, paragraph: e.target.value })}
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">GitHub Profile URL</label>
                    <input
                      type="text"
                      required
                      placeholder="https://github.com/yourusername"
                      value={introData.githubLink}
                      onChange={(e) => setIntroData({ ...introData, githubLink: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      required
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={introData.linkedInLink}
                      onChange={(e) => setIntroData({ ...introData, linkedInLink: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Facebook Profile URL</label>
                    <input
                      type="text"
                      required
                      placeholder="https://facebook.com/yourprofile"
                      value={introData.facebookLink}
                      onChange={(e) => setIntroData({ ...introData, facebookLink: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Twitter / X URL</label>
                    <input
                      type="text"
                      required
                      placeholder="https://twitter.com/yourprofile"
                      value={introData.twitterLink}
                      onChange={(e) => setIntroData({ ...introData, twitterLink: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">CV Download Link / URL</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Google Drive link or PDF URL"
                      value={introData.cv}
                      onChange={(e) => setIntroData({ ...introData, cv: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Profile Image URL</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. https://imgur.com/... or image link"
                      value={introData.profileImage}
                      onChange={(e) => setIntroData({ ...introData, profileImage: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50 transition shadow-lg shadow-sky-600/30"
                >
                  {saving ? "Saving..." : introData._id ? "Update Intro Information" : "Save Intro Information"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: PROJECT STATS */}
          {visibleSection === "projectInfo" && (
            <div>
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-sky-400">
                  {projectStats._id ? "Edit Career Statistics" : "Create Career Statistics"}
                </h2>
                {projectStats._id && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                    Existing Data Loaded
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveStats} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Years of Experience</label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 2"
                      value={projectStats.noOfExperience}
                      onChange={(e) => setProjectStats({ ...projectStats, noOfExperience: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-3 px-4 text-white text-xl font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Completed Projects</label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 15"
                      value={projectStats.noOfProjectCompleted}
                      onChange={(e) => setProjectStats({ ...projectStats, noOfProjectCompleted: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-3 px-4 text-white text-xl font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Technologies Mastered</label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 8"
                      value={projectStats.noOfTechnology}
                      onChange={(e) => setProjectStats({ ...projectStats, noOfTechnology: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-3 px-4 text-white text-xl font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Code Commits</label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 500"
                      value={projectStats.noOfCodeCommits}
                      onChange={(e) => setProjectStats({ ...projectStats, noOfCodeCommits: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-3 px-4 text-white text-xl font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50 transition shadow-lg shadow-sky-600/30"
                >
                  {saving ? "Saving..." : projectStats._id ? "Update Statistics" : "Save Statistics"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: ABOUT */}
          {visibleSection === "about" && (
            <div>
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-sky-400">
                  {aboutData._id ? "Edit About Information" : "Create About Information"}
                </h2>
                {aboutData._id && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                    Existing Data Loaded
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveAbout} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Designation / Role Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Full-Stack MERN Developer"
                    value={aboutData.aboutDesignation}
                    onChange={(e) => setAboutData({ ...aboutData, aboutDesignation: e.target.value })}
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">About Image URL</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. https://your-image-link.png"
                    value={aboutData.aboutImage}
                    onChange={(e) => setAboutData({ ...aboutData, aboutImage: e.target.value })}
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Detailed About Description</label>
                  <textarea
                    rows="5"
                    required
                    placeholder="Write details about your experience, education, passions..."
                    value={aboutData.aboutParagraph}
                    onChange={(e) => setAboutData({ ...aboutData, aboutParagraph: e.target.value })}
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50 transition shadow-lg shadow-sky-600/30"
                >
                  {saving ? "Saving..." : aboutData._id ? "Update About Info" : "Save About Info"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {visibleSection === "services" && (
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
                  <h2 className="text-2xl font-bold text-sky-400">
                    {serviceData._id ? "Edit Services Overview" : "Create Services Overview"}
                  </h2>
                  {serviceData._id && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                      Existing Data Loaded
                    </span>
                  )}
                </div>

                <form onSubmit={handleSaveService} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Services Introduction Paragraph</label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Explain what services you provide to clients..."
                      value={serviceData.serviceParagraph}
                      onChange={(e) => setServiceData({ ...serviceData, serviceParagraph: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50 transition shadow-lg shadow-sky-600/30"
                  >
                    {saving ? "Saving..." : serviceData._id ? "Update Services Overview" : "Save Services Overview"}
                  </button>
                </form>
              </div>

              {/* Service Cards Sub-Section */}
              <div className="pt-6 border-t border-gray-800">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Service Cards ({serviceCards.length})</h3>
                  <Link
                    to="/page/admin/addServiceCard"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition shadow"
                  >
                    + Add New Service Card
                  </Link>
                </div>

                {serviceCards.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceCards.map((card) => (
                      <div
                        key={card._id}
                        className="bg-gray-800/70 border border-gray-700/80 p-4 rounded-xl flex flex-col justify-between"
                      >
                        <div>
                          {card.cardImage && (
                            <img src={card.cardImage} alt="" className="w-12 h-12 object-contain mb-2" />
                          )}
                          <h4 className="font-bold text-lg text-white">{card.cardHeader}</h4>
                          <p className="text-sm text-gray-300 mt-1 line-clamp-2">{card.cardParagraph}</p>
                        </div>
                        <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-700/60">
                          <Link
                            to={`/page/admin/editServiceCard/${card._id}`}
                            className="bg-sky-600/80 hover:bg-sky-600 text-white text-xs px-3 py-1.5 rounded-lg"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteServiceCard(card._id)}
                            className="bg-red-600/80 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">No service cards added yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS */}
          {visibleSection === "projects" && (
            <div>
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-sky-400">Live Projects ({liveProjects.length})</h2>
                <Link
                  to="/page/admin/addNewProject"
                  className="bg-sky-600 hover:bg-sky-500 text-white px-5 py-2 rounded-xl font-semibold transition text-sm shadow-md"
                >
                  + Add New Project
                </Link>
              </div>

              {liveProjects && liveProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {liveProjects.map((project) => (
                    <div
                      key={project._id}
                      className="bg-gray-800/80 border border-gray-700 p-5 rounded-xl flex flex-col justify-between"
                    >
                      <div>
                        {project.projectImage && (
                          <img
                            src={project.projectImage}
                            alt={project.projectTitle}
                            className="w-full h-36 object-cover rounded-lg mb-3"
                          />
                        )}
                        <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                          Project #{project.projectNo}
                        </span>
                        <h3 className="text-lg font-bold text-white mt-1 mb-1">
                          {project.projectTitle}
                        </h3>
                        <p className="text-sm text-gray-300 line-clamp-3 mb-2">
                          {project.projectParagraph}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-700/60 mt-3">
                        <Link
                          to={`/page/admin/editProjectInfo/${project._id}`}
                          className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">No projects found in database.</p>
                  <Link
                    to="/page/admin/addNewProject"
                    className="inline-block bg-sky-600 hover:bg-sky-500 text-white px-6 py-2.5 rounded-xl font-semibold transition"
                  >
                    Create Your First Project
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: CONTACT */}
          {visibleSection === "contact" && (
            <div>
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-800">
                <h2 className="text-2xl font-bold text-sky-400">
                  {contactData._id ? "Edit Contact Information" : "Create Contact Information"}
                </h2>
                {contactData._id && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
                    Existing Data Loaded
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveContact} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Contact Description</label>
                  <textarea
                    rows="3"
                    required
                    placeholder="Short description inviting clients or recruiters to reach out..."
                    value={contactData.contactDescription}
                    onChange={(e) => setContactData({ ...contactData, contactDescription: e.target.value })}
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@gmail.com"
                      value={contactData.gmail}
                      onChange={(e) => setContactData({ ...contactData, gmail: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      placeholder="+8801XXXXXXXXX"
                      value={contactData.phoneNo}
                      onChange={(e) => setContactData({ ...contactData, phoneNo: e.target.value })}
                      className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Current Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhaka, Bangladesh"
                    value={contactData.currentLocation}
                    onChange={(e) => setContactData({ ...contactData, currentLocation: e.target.value })}
                    className="w-full bg-gray-800/80 border border-gray-700 rounded-xl py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50 transition shadow-lg shadow-sky-600/30"
                >
                  {saving ? "Saving..." : contactData._id ? "Update Contact Info" : "Save Contact Info"}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
