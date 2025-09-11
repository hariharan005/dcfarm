import axios from "axios";

const api = axios.create({
  baseURL: "https://dcfarm.onrender.com",
  withCredentials: true,
});

export default api;
