import React, { useState } from "react";
import { Link } from "react-router-dom";
import api, { DASHBOARD_URL } from "../../api";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/login", form);

      const token = res.data?.token;

      if (!token) {
        throw new Error("Login response does not contain a token");
      }

      const dashboardUrl = DASHBOARD_URL.replace(/\/+$/, "");

      window.location.href = `${dashboardUrl}/#token=${encodeURIComponent(token)}`;

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5">

          <h2 className="text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="username"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && (
              <p className="text-danger">{error}</p>
            )}

            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-3">
            New here? <Link to="/signup">Sign up</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;