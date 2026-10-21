import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../api/apiClient";

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [intro, setIntro] = useState(null);
  const [projectStats, setProjectStats] = useState(null);
  const [about, setAbout] = useState(null);
  const [service, setService] = useState(null);
  const [serviceCards, setServiceCards] = useState([]);
  const [liveProjects, setLiveProjects] = useState([]);
  const [contact, setContact] = useState(null);

  const fetchPortfolioData = useCallback(async () => {
    try {
      const [
        introRes,
        projectInfoRes,
        aboutRes,
        serviceRes,
        serviceCardRes,
        liveProjectsRes,
        contactRes,
      ] = await Promise.allSettled([
        API.get("/intro"),
        API.get("/projectInfo"),
        API.get("/about"),
        API.get("/service"),
        API.get("/serviceCard"),
        API.get("/liveProject"),
        API.get("/contact"),
      ]);

      if (introRes.status === "fulfilled") {
        setIntro(introRes.value.data?.data?.[0] || null);
      }
      if (projectInfoRes.status === "fulfilled") {
        setProjectStats(projectInfoRes.value.data?.data?.[0] || null);
      }
      if (aboutRes.status === "fulfilled") {
        setAbout(aboutRes.value.data?.data?.[0] || null);
      }
      if (serviceRes.status === "fulfilled") {
        setService(serviceRes.value.data?.data?.[0] || null);
      }
      if (serviceCardRes.status === "fulfilled") {
        setServiceCards(serviceCardRes.value.data?.data || []);
      }
      if (liveProjectsRes.status === "fulfilled") {
        setLiveProjects(liveProjectsRes.value.data?.data || []);
      }
      if (contactRes.status === "fulfilled") {
        setContact(contactRes.value.data?.data?.[0] || null);
      }
    } catch (error) {
      console.error("Error fetching portfolio context data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  const value = {
    loading,
    intro,
    projectStats,
    about,
    service,
    serviceCards,
    liveProjects,
    contact,
    refetch: fetchPortfolioData,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    return {
      loading: false,
      intro: null,
      projectStats: null,
      about: null,
      service: null,
      serviceCards: [],
      liveProjects: [],
      contact: null,
      refetch: () => Promise.resolve(),
    };
  }
  return context;
};

export default PortfolioContext;
