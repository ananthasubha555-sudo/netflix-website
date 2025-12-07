import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Please enter a valid email";

    if (!password) e.password = "Password is required";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;

    try {
      setLoading(true);
      const res = await axios.post("/api/login", { email, password });
      if (res.data && res.data.success) {
        // redirect to dashboard
        navigate("/dashboard");
      } else {
        setServerError(res.data.message || "Login failed");
      }
    } catch (err) {
      // Axios error handling
      const msg =
        err.response?.data?.message || err.message || "Server error. Try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-netflix-hero">
      <div className="w-full max-w-sm p-8 bg-[rgba(0,0,0,0.7)] rounded-md shadow-md">
        <h1 className="text-3xl font-semibold mb-6">Sign In</h1>

        {serverError && (
          <div className="mb-4 text-sm text-red-300 bg-red-900/30 p-2 rounded">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className={`w-full p-3 rounded bg-[#333] placeholder-gray-400 outline-none ${
                errors.email ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-red-600"
              }`}
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className={`w-full p-3 rounded bg-[#333] placeholder-gray-400 outline-none ${
                errors.password ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-red-600"
              }`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-semibold bg-red-600 hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-sm text-gray-400 mt-4">
          New to Netflix? <span className="text-white">Sign up now.</span>
        </div>
      </div>
    </div>
  );
}
