import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL || "";

export const registerUser = async (username, email, password, role = "user") => {
  const { data } = await axios.post(`${API_URL}/register`, {
     username,
    email,
    password,
    role,
  });
  return data; // { user, token }
};

export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_URL}/login`, { email, password });
  return data; // { user, token }
};

export const getCurrentUser = async (token) => {
  const { data } = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const logoutUser = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
