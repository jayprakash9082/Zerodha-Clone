import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, FRONTEND_URL } from "../config";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios
      .get(`${API_URL}/api/auth/verify`, { withCredentials: true })
      .then(() => setStatus("ok"))
      .catch(() => {
        // Not logged in, send the user to the login page
        window.location.href = `${FRONTEND_URL}/login`;
      });
  }, []);

  if (status === "loading") return <p className="p-5">Loading...</p>;
  return children;
}

export default ProtectedRoute;