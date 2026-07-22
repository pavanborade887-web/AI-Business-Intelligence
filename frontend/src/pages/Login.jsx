import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

import logo from "../assets/images/aibi-logo.png";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  setError("");

  if (!email || !password) {
    setError("Please enter email and password.");
    return;
  }

  try {
    setLoading(true);

    const response = await login(email, password);

    if (response.success) {
      navigate("/dashboard");
    } else {
      setError(response.message);
    }
  } catch (err) {
    setError(
      err.response?.data?.message || "Login failed."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex bg-slate-950">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 items-center justify-center p-14">

        <div className="max-w-lg">

          <img
            src={logo}
            alt="AIBI Logo"
            className="w-40 mb-8"
          />

          <h1 className="text-6xl font-bold text-white">
            AIBI
          </h1>

          <h2 className="mt-3 text-2xl text-blue-400">
            AI Business Intelligence Platform
          </h2>

          <p className="mt-8 text-slate-300 leading-8 text-lg">
            Transform your business data into powerful
            AI-driven insights, predictive analytics and
            intelligent reports.
          </p>

          <div className="mt-10 space-y-4 text-slate-300">

            <p>📊 Business Analytics</p>

            <p>📈 Predictive Intelligence</p>

            <p>🤖 AI Powered Reports</p>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 flex items-center justify-center p-10">

        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">

          <h2 className="text-3xl font-bold text-white text-center">
            Sign In
          </h2>

          <p className="text-center text-slate-400 mt-2">
            Securely access your dashboard
          </p>

          <form onSubmit={handleLogin} className="mt-8">

                      {/* EMAIL */}

            <label className="block text-slate-300 mb-2">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">

              <FaEnvelope className="text-slate-400" />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent p-4 outline-none text-white"
              />

            </div>

            {/* PASSWORD */}

            <label className="block text-slate-300 mt-6 mb-2">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800 px-4">

              <FaLock className="text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent p-4 outline-none text-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-slate-400" />
                ) : (
                  <FaEye className="text-slate-400" />
                )}
              </button>

            </div>

            <div className="mt-6 flex justify-between text-sm text-slate-400">

              <label className="flex items-center gap-2">

                <input type="checkbox" />

                Remember Me

              </label>

              <button
                type="button"
                className="text-blue-400 hover:text-blue-300"
              >
                Forgot Password?
              </button>

            </div>

            {error && (
              <p className="mt-4 text-center text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-blue-600 p-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;