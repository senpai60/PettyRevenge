import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------
  // Verify authenticated user
  // --------------------------
  const verifyUser = async () => {
    try {
      const res = await authApi.get("/verify");
      setUser(res.data.data.user || null);
      console.log(res.data.data.user);
      
    } catch (err) {
      console.error("Verify Error:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------
  // Signup
  // --------------------------
  const signup = async (formData) => {
    try {
      const res = await authApi.post("/signup", formData);
      setUser(res.data.data.user);
      await verifyUser()
      return res.data;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  // --------------------------
  // Login
  // --------------------------
  const login = async (credentials) => {
    try {
      const res = await authApi.post("/login", credentials);
      setUser(res.data.data.user);
      await verifyUser()
      return res.data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  // --------------------------
  // Logout
  // --------------------------
  const logout = async () => {
    try {
      await authApi.post("/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // --------------------------
  // Load user on first render
  // --------------------------
  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        verifyUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
