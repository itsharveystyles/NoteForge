import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  return (
    <div className="flex items-center justify-between py-4 px-10 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)]">
      <Link to="/" className="text-[var(--text-primary)] font-semibold text-xl">
        NoteForge
      </Link>

      <div className="flex items-center gap-6">
        {isAuthenticated && (
          <Link
            to="/dashboard"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition font-medium"
          >
            Dashboard
          </Link>
        )}
        {location.pathname !== "/login" && location.pathname !== "/signup" && !isAuthenticated && (
          <>
            <Link to="/login" className="text-[var(--text-secondary)] hover:text-white transition">Login</Link>
            <Link to="/signup" className="text-[var(--text-secondary)] hover:text-white transition">Signup</Link>
          </>
        )}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition text-sm font-medium"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;