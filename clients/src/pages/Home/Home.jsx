import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext"; 

const Home = () => {
  const { isAuthenticated } = useAuth(); // Get authentication status
  const navigate = useNavigate();

  // Redirect to Dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // change path to your dashboard route
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-[var(--text-primary)] mb-6">
          Welcome to NoteForge
        </h1>
        <p className="text-[var(--text-secondary)] mb-8 text-lg">
          Create, manage, and organize your notes effortlessly. A clean, minimal experience for your ideas.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-[var(--border-default)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-tertiary)] transition"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="mt-16 max-w-4xl text-center text-[var(--text-muted)]">
        <p className="mb-4">
          Organize your thoughts, collaborate, and stay productive.
        </p>
        <p>
          Your notes are safe, accessible anywhere, and easy to manage.
        </p>
      </div>
    </div>
  );
};

export default Home;