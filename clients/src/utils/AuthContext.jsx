import React, { createContext, useState, useContext } from "react";

// Create the context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function
  const login = () => setIsAuthenticated(true);

  // Logout function
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);