import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "noteforge-auth";

export const getInitials = (user) => {
  if (!user) return "?";
  if (user.name && user.name.trim()) {
    const parts = user.name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (user.email && user.email.trim()) {
    const prefix = user.email.split("@")[0] || "";
    return prefix.slice(0, 2).toUpperCase() || "?";
  }
  return "?";
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && parsed.token) {
        setToken(parsed.token);
        setUser(parsed.user || null);
        setIsAuthenticated(true);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (!token) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          token,
          user,
        })
      );
    } catch {
      // ignore
    }
  }, [token, user]);

  const login = ({ user: userData, token: authToken }) => {
    setIsAuthenticated(true);
    setUser(userData && typeof userData === "object" ? userData : null);
    setToken(authToken || null);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, getInitials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);