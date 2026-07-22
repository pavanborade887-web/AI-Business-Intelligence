import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

export const login = async (email, password) => {
  const response = await API.post("/login", {
    email,
    password,
  });

  if (response.data.success) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default API;