import React, { createContext, useState, useEffect, useContext } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token") || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("admin_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const res = await api.getMe();
          setUser(res.user);
          localStorage.setItem("admin_user", JSON.stringify(res.user));
        } catch (err) {
          console.warn("[AuthContext] Token expired or invalid, logging out");
          logout();
        }
      }
      setLoading(false);
    };
    verifyAuth();
  }, [token]);

  const login = async (username, password) => {
    const data = await api.login({ username, password });
    if (data.token) {
      setToken(data.token);
      setUser({ username: data.username, role: data.role, _id: data._id });
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify({ username: data.username, role: data.role, _id: data._id }));
      return data;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
