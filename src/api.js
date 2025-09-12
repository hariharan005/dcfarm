import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://dcfarm.onrender.com/api",
  withCredentials: true,
});

export default api;
