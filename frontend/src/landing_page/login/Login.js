import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/login", form);
      window.location.href = "http://localhost:3001"; 
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-3"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && <p className="text-danger">{error}</p>}

            <button className="btn btn-primary w-100" type="submit">
              Login
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