// API Service Layer for Portfolio & Admin CMS
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getHeaders = (isMultipart = false) => {
  const token = localStorage.getItem("admin_token");
  const headers = {};
  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const isMultipart = options.body instanceof FormData;
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getHeaders(isMultipart),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[API Client Warning] Call to ${endpoint} failed:`, error.message);
    throw error;
  }
};

// API Methods
export const api = {
  // Auth
  login: (credentials) =>
    apiFetch("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  getMe: () => apiFetch("/auth/me"),

  // Profile
  getProfile: () => apiFetch("/profile"),
  updateProfile: (data) =>
    apiFetch("/profile", { method: "PUT", body: JSON.stringify(data) }),

  // Projects
  getProjects: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/projects${query ? `?${query}` : ""}`);
  },
  createProject: (data) =>
    apiFetch("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id, data) =>
    apiFetch(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id) =>
    apiFetch(`/projects/${id}`, { method: "DELETE" }),

  // Certificates
  getCertificates: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/certificates${query ? `?${query}` : ""}`);
  },
  createCertificate: (data) =>
    apiFetch("/certificates", { method: "POST", body: JSON.stringify(data) }),
  updateCertificate: (id, data) =>
    apiFetch(`/certificates/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCertificate: (id) =>
    apiFetch(`/certificates/${id}`, { method: "DELETE" }),

  // Skills
  getSkills: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/skills${query ? `?${query}` : ""}`);
  },
  createSkill: (data) =>
    apiFetch("/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id, data) =>
    apiFetch(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkill: (id) =>
    apiFetch(`/skills/${id}`, { method: "DELETE" }),

  // Education
  getEducation: () => apiFetch("/education"),
  createEducation: (data) =>
    apiFetch("/education", { method: "POST", body: JSON.stringify(data) }),
  updateEducation: (id, data) =>
    apiFetch(`/education/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteEducation: (id) =>
    apiFetch(`/education/${id}`, { method: "DELETE" }),

  // Experience
  getExperience: () => apiFetch("/experience"),
  createExperience: (data) =>
    apiFetch("/experience", { method: "POST", body: JSON.stringify(data) }),
  updateExperience: (id, data) =>
    apiFetch(`/experience/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteExperience: (id) =>
    apiFetch(`/experience/${id}`, { method: "DELETE" }),

  // Upload File/Image
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiFetch("/upload", {
      method: "POST",
      body: formData,
    });
  },

  // Stats
  getStats: () => apiFetch("/stats"),
};
