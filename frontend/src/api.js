import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002/api/auth",
  withCredentials: true,
});

export default api;