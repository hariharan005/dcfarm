import axios from "axios";

// Detect environment and set base URL
const baseURL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://dcfarm.onrender.com/api");

const api = axios.create({
  baseURL: "https://dcfarm.onrender.com/api",
  withCredentials: true,
});

export default api;
