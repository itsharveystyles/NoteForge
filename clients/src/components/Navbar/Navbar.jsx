import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="flex items-center justify-between py-4 px-10">
      
      {/* Logo */}
      <Link to="/" className="text-white font-medium text-2xl">
        NoteForge
      </Link>

      <div className="space-x-6">
        
        {/* Show Login only if NOT on login page */}
        {location.pathname !== "/login" && (
          <Link to="/login" className="text-white">
            Login
          </Link>
        )}

        {/* Show Signup only if NOT on signup page */}
        {location.pathname !== "/signup" && (
          <Link to="/signup" className="text-white">
            Signup
          </Link>
        )}

      </div>
    </div>
  );
};

export default Navbar;
