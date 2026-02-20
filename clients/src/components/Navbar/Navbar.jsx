import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext"; // Corrected the path here

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth(); // Get the authentication state and logout function

  return (
    <div className="flex items-center justify-between py-4 px-10">
      {/* Logo */}
      <Link to="/" className="text-white font-medium text-2xl">
        NoteForge
      </Link>

      <div className="space-x-6">
        {/* Show Login/Signup only if NOT on login/signup pages */}
        {location.pathname !== "/login" && location.pathname !== "/signup" && !isAuthenticated && (
          <>
            <Link to="/login" className="text-white">Login</Link>
            <Link to="/signup" className="text-white">Signup</Link>
          </>
        )}

        {/* Show Logout if the user is authenticated */}
        {isAuthenticated && (
          <button onClick={logout} className="text-white">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;