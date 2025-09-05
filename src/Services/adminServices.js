// src/services/adminService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

// ✅ Get admin profile
export const getProfile = async () => {
  const res = await axios.get(`${API_URL}/profile`);
  return res.data;
};

// ✅ Update admin profile
export const updateProfile = async (profile) => {
  const res = await axios.put(`${API_URL}/profile`, profile);
  return res.data;
};

// ✅ Update password
export const updatePassword = async (current, newPass) => {
  const res = await axios.put(`${API_URL}/password`, { current, newPass });
  return res.data;
};

// ✅ Update profile picture
export const updatePhoto = async (profilePic) => {
  const res = await axios.put(`${API_URL}/photo`, { profilePic });
  return res.data;
};
