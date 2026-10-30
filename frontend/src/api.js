import axios from "axios";

const API_URL =
process.env.REACT_APP_API_URL ||
"https://tradeboard-api.onrender.com";

export const DASHBOARD_URL =
process.env.REACT_APP_DASHBOARD_URL ||
"https://tradeboard-dashboard.vercel.app";

const api = axios.create({
baseURL: `${API_URL}/api/auth`,
withCredentials: true,
});

export default api;
