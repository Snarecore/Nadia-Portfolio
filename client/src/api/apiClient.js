import axios from "axios";

const getBaseURL = () => {
  const envUrl = process.env.REACT_APP_API_BASE_URL;

  // On production domains (e.g. Vercel, Netlify, or custom domains)
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    // If env variable is omitted or points to localhost in production build
    if (!envUrl || envUrl.includes("localhost") || envUrl.includes("127.0.0.1")) {
      return "https://nadia-portfolio-chi.vercel.app/api";
    }
    return envUrl.trim().replace(/\/+$/, "");
  }

  // Local development
  if (envUrl) {
    return envUrl.trim().replace(/\/+$/, "");
  }
  return "http://localhost:4000/api";
};

const API = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to automatically attach JWT token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors gracefully
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("admin_token");
      if (window.location.pathname.startsWith("/page/admin") && !window.location.pathname.includes("/login")) {
        window.location.href = "/page/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
