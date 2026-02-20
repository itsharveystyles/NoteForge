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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-white mb-6">
          Welcome to NoteForge
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          Create, manage, and organize your notes effortlessly. A clean, minimal experience for your ideas.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Optional placeholder for features */}
      <div className="mt-16 max-w-4xl text-center text-gray-400">
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