import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "http://localhost:5000/api/admin";

// 🔹 Get profile
export const getProfile = async () => {
  const res = await axios.get(`${API_URL}/profile`);
  return res.data;
};

// 🔹 Update profile
export const updateProfile = async (profile) => {
  const res = await axios.put(`${API_URL}/profile`, profile);
  return res.data;
};

// 🔹 Update password
export const updatePassword = async (passwords) => {
  const res = await axios.put(`${API_URL}/password`, passwords);
  return res.data;
};
