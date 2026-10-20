import API from "../api/apiClient";

export const authService = {
  login: (credentials) => API.post("/auth/login", credentials),
  verify: () => API.get("/auth/verify"),
  logout: () => {
    localStorage.removeItem("admin_token");
  },
  isAuthenticated: () => !!localStorage.getItem("admin_token"),
};

export const introService = {
  getAll: () => API.get("/intro"),
  getById: (id) => API.get(`/intro/${id}`),
  create: (data) => API.post("/intro", data),
  update: (id, data) => API.put(`/intro/${id}`, data),
  delete: (id) => API.delete(`/intro/${id}`),
};

export const projectInfoService = {
  getAll: () => API.get("/projectInfo"),
  getById: (id) => API.get(`/projectInfo/${id}`),
  create: (data) => API.post("/projectInfo", data),
  update: (id, data) => API.put(`/projectInfo/${id}`, data),
};

export const liveProjectService = {
  getAll: () => API.get("/liveProject"),
  getById: (id) => API.get(`/liveProject/${id}`),
  create: (data) => API.post("/liveProject", data),
  update: (id, data) => API.put(`/liveProject/${id}`, data),
  delete: (id) => API.delete(`/liveProject/${id}`),
};

export const serviceService = {
  getAll: () => API.get("/service"),
  getById: (id) => API.get(`/service/${id}`),
  update: (id, data) => API.put(`/service/${id}`, data),
};

export const serviceCardService = {
  getAll: () => API.get("/serviceCard"),
  getById: (id) => API.get(`/serviceCard/${id}`),
  create: (data) => API.post("/serviceCard", data),
  update: (id, data) => API.put(`/serviceCard/${id}`, data),
  delete: (id) => API.delete(`/serviceCard/${id}`),
};

export const aboutService = {
  getAll: () => API.get("/about"),
  getById: (id) => API.get(`/about/${id}`),
  update: (id, data) => API.put(`/about/${id}`, data),
};

export const contactService = {
  getAll: () => API.get("/contact"),
  getById: (id) => API.get(`/contact/${id}`),
  update: (id, data) => API.put(`/contact/${id}`, data),
};
