import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext"; // Corrected path here
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Get the login function
  const navigate = useNavigate(); // For navigation after successful signup

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would add your logic to register the user
    // For now, we simulate a successful signup

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // Simulate successful signup by logging the user in
    login(); // Mark the user as authenticated
    navigate("/"); // Redirect to the homepage after signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-md p-8 rounded-xl bg-gray-900 shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Create your NoteForge account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-gray-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-white text-black font-medium"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;