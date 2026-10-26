
import React,{ createContext, useContext, useState } from "react";
import api from "../api";

const AuthContext = createContext(null);

function getSavedUser() {
  try {
    return JSON.parse(sessionStorage.getItem("doctorAppUser") || "null");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  const saveUser = (nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      sessionStorage.setItem("doctorAppUser", JSON.stringify(nextUser));
    } else {
      sessionStorage.removeItem("doctorAppUser");
    }
  };

  const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    saveUser(response.data.user);
    return response.data;
  };

  const register = async (details) => {
    const response = await api.post("/auth/register", details);
    // Backend registration uses a different cookie name ("token"),
    // while protected APIs expect "logtoken", so login is required next.
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      saveUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, saveUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}