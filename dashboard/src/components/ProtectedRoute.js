import React, { useEffect, useState } from "react";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/auth/verify", { withCredentials: true })
      .then(() => setStatus("ok"))
      .catch(() => {
        window.location.href = "http://localhost:3000/login";
      });
  }, []);

  if (status === "loading") return <p className="p-5">Loading...</p>;
  return children;
}

export default ProtectedRoute;