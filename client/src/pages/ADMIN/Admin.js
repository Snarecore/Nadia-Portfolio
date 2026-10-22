import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/apiClient";
import { authService } from "../../services/portfolioService";
import { usePortfolio } from "../../context/PortfolioContext";

// Modular Tab Components
import IntroTab from "./tabs/IntroTab";
import StatsTab from "./tabs/StatsTab";
import AboutTab from "./tabs/AboutTab";
import ServiceTab from "./tabs/ServiceTab";
import ProjectsTab from "./tabs/ProjectsTab";
import ContactTab from "./tabs/ContactTab";

const Admin = () => {
  const navigate = useNavigate();
  const { refetch: refetchLivePortfolio } = usePortfolio();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [visibleSection, setVisibleSection] = useState("intro");

  // Local editable states for each section
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

  const [liveProjects, setLiveProjects] = useState([]);

  const [contactData, setContactData] = useState({
    _id: "",
    contactDescription: "",
    gmail: "",
    phoneNo: "",
    currentLocation: "",
  });

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

  // --- SAVE HANDLERS ---

  const handleSaveIntro = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (introData._id) {
        await API.put(`/intro/${introData._id}`, introData);
        showNotification("Hero / Intro updated successfully!");
      } else {
        const res = await API.post("/intro", introData);
        setIntroData((prev) => ({ ...prev, _id: res.data?._id || res.data?.data?._id }));
        showNotification("Hero / Intro created and saved successfully!");
      }
      refetchLivePortfolio();
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save intro data", true);
    } finally {
      setSaving(false);
    }
  };

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
        showNotification("Career statistics updated successfully!");
      } else {
        const res = await API.post("/projectInfo", payload);
        setProjectStats((prev) => ({ ...prev, _id: res.data?._id || res.data?.data?._id }));
        showNotification("Career statistics created and saved successfully!");
      }
      refetchLivePortfolio();
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save statistics", true);
    } finally {
      setSaving(false);
    }
  };

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
      refetchLivePortfolio();
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save about information", true);
    } finally {
      setSaving(false);
    }
  };

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
      refetchLivePortfolio();
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save services overview", true);
    } finally {
      setSaving(false);
    }
  };

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
      refetchLivePortfolio();
    } catch (err) {
      showNotification(err.response?.data?.message || "Failed to save contact information", true);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await API.delete(`/liveProject/${projectId}`);
      setLiveProjects((prev) => prev.filter((p) => p._id !== projectId));
      showNotification("Project deleted successfully!");
      refetchLivePortfolio();
    } catch (err) {
      showNotification("Failed to delete project", true);
    }
  };

  const handleDeleteServiceCard = async (cardId) => {
    if (!window.confirm("Are you sure you want to delete this service card?")) return;
    try {
      await API.delete(`/serviceCard/${cardId}`);
      setServiceCards((prev) => prev.filter((c) => c._id !== cardId));
      showNotification("Service card deleted successfully!");
      refetchLivePortfolio();
    } catch (err) {
      showNotification("Failed to delete service card", true);
    }
  };

  return (
    <div className="text-white px-4 md:px-8 bg-gray-950 min-h-screen pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center py-5 border-b border-gray-800 mb-6 gap-4 max-w-4xl mx-auto">
        <Link
          to="/"
          className="text-sky-400 hover:text-sky-300 font-medium text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
        >
          ← View Live Portfolio
        </Link>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-center text-white">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600/90 hover:bg-red-500 text-white px-4 py-1.5 rounded-lg font-semibold text-xs transition shadow"
        >
          Sign Out
        </button>
      </div>

      {/* Notification Banners */}
      {successMsg && (
        <div className="max-w-2xl mx-auto mb-5 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-center text-xs font-medium shadow-lg">
          ✓ {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="max-w-2xl mx-auto mb-5 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-center text-xs font-medium shadow-lg">
          ✕ {errorMsg}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-4xl mx-auto">
        {[
          { id: "intro", label: "Hero / Intro" },
          { id: "projectInfo", label: "Career Stats" },
          { id: "about", label: "About Me" },
          { id: "services", label: "Experience" },
          { id: "projects", label: "Projects" },
          { id: "contact", label: "Contact Info" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setVisibleSection(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition ${
              visibleSection === tab.id
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16 text-sm text-gray-400">
          Loading dashboard content...
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-gray-900/90 p-5 sm:p-7 rounded-2xl border border-gray-800 shadow-2xl">
          {visibleSection === "intro" && (
            <IntroTab
              data={introData}
              onChange={setIntroData}
              onSave={handleSaveIntro}
              saving={saving}
            />
          )}

          {visibleSection === "projectInfo" && (
            <StatsTab
              data={projectStats}
              onChange={setProjectStats}
              onSave={handleSaveStats}
              saving={saving}
            />
          )}

          {visibleSection === "about" && (
            <AboutTab
              data={aboutData}
              onChange={setAboutData}
              onSave={handleSaveAbout}
              saving={saving}
            />
          )}

          {visibleSection === "services" && (
            <ServiceTab
              data={serviceData}
              onChange={setServiceData}
              onSave={handleSaveService}
              saving={saving}
              cards={serviceCards}
              onDeleteCard={handleDeleteServiceCard}
            />
          )}

          {visibleSection === "projects" && (
            <ProjectsTab
              projects={liveProjects}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {visibleSection === "contact" && (
            <ContactTab
              data={contactData}
              onChange={setContactData}
              onSave={handleSaveContact}
              saving={saving}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
