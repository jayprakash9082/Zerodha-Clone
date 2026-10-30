import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, FRONTEND_URL } from "../config";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const loginUrl = `${FRONTEND_URL}/login`;

    // After login the token arrives in the URL hash (#token=...), save it and clean the address bar
    const urlToken = new URLSearchParams(window.location.hash.slice(1)).get("token");
    if (urlToken) {
      localStorage.setItem("token", urlToken);
      window.history.replaceState(null, "", window.location.pathname);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = loginUrl;
      return;
    }

    // Ask the backend whether the token is valid
    axios
      .get(`${API_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setStatus("ok"))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = loginUrl;
      });
  }, []);

  if (status === "loading") return <p className="p-5">Loading...</p>;
  return children;
}

export default ProtectedRoute;