import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// 🔐 attach token automatically
api.interceptors.request.use(
  (config) => {
    // Prefer token based on request URL when possible to avoid using a stale token
    const driverAuth = localStorage.getItem("driver_auth");
    const supplierAuth = localStorage.getItem("supplier_auth");
    let token = null;
    const url = (config.url || "").toLowerCase();

    const extract = (raw) => {
      if (!raw) return null;
      try {
        return JSON.parse(raw).token;
      } catch (e) {
        return localStorage.getItem("token");
      }
    };

    // If the request is clearly for supplier routes, prefer supplier token
    if (url.includes("/supplier")) {
      token =
        extract(supplierAuth) ||
        extract(driverAuth) ||
        localStorage.getItem("token");
    } else if (url.includes("/driver")) {
      token =
        extract(driverAuth) ||
        extract(supplierAuth) ||
        localStorage.getItem("token");
    } else {
      // Default behavior: prefer driver auth if present, then supplier, then legacy token
      token =
        extract(driverAuth) ||
        extract(supplierAuth) ||
        localStorage.getItem("token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
