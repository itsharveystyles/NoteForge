import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useAuth } from "../../utils/AuthContext";
import { authApi } from "../../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authApi.login({ email, password });
      login({ user: data.user, token: data.token });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <div className="w-full max-w-md p-8 rounded-xl card-dark border border-[var(--border-subtle)]">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition mb-4"
          aria-label="Go back"
        >
          <HiOutlineArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-2 text-center">
          Login to NoteForge
        </h2>
        {error && (
          <p className="text-sm text-red-400 text-center mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-dark w-full px-4 py-2.5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input-dark w-full px-4 py-2.5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-glow w-full py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-sm text-[var(--text-secondary)] mt-5">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[var(--accent)] font-medium hover:text-[var(--text-link-hover)] transition underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;