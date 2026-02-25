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
  const [accounts, setAccounts] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        if (Array.isArray(parsed.accounts)) {
          setAccounts(parsed.accounts);
          setActiveId(parsed.activeId || (parsed.accounts[0] && parsed.accounts[0].id) || null);
        } else if (parsed.token) {
          const legacyUser = parsed.user || null;
          const id = legacyUser?.email || "primary";
          setAccounts([{ id, user: legacyUser, token: parsed.token }]);
          setActiveId(id);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (!accounts.length) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          version: 2,
          activeId,
          accounts,
        })
      );
    } catch {
      // ignore
    }
  }, [accounts, activeId]);

  const login = ({ user: userData, token: authToken }) => {
    const safeUser = userData && typeof userData === "object" ? userData : null;
    const email = safeUser?.email || null;
    const id = email || `account-${Date.now()}`;
    setAccounts((prev) => {
      const existingIndex = email ? prev.findIndex((a) => a.user?.email === email) : -1;
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = { ...next[existingIndex], user: safeUser, token: authToken || null };
        return next;
      }
      return [...prev, { id, user: safeUser, token: authToken || null }];
    });
    setActiveId(id);
  };

  const switchAccount = (id) => {
    setActiveId(id);
  };

  const logout = () => {
    setAccounts([]);
    setActiveId(null);
  };

  const activeAccount = accounts.find((a) => a.id === activeId) || null;
  const isAuthenticated = !!(activeAccount && activeAccount.token);
  const user = activeAccount?.user || null;
  const token = activeAccount?.token || null;

  return (
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          token,
          login,
          logout,
          getInitials,
          accounts,
          activeAccountId: activeId,
          switchAccount,
        }}
      >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);