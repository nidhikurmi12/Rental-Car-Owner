import { createContext, useContext, useEffect, useState } from "react";
import Request from "../lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const verifyAuth = async () => {
    try {
      const res = await Request.get("/auth/verify");
      console.log(res.data);
      if (res.data.success) {
        setIsAuthenticated(true);
        setRole(res.data.Role);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setRole(null);
    } finally {
      setLoading(false);
    }
  };
 
  // 🚪 Logout
  const logout = async () => {
    try {
      await Request.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed");
    } finally {
      setIsAuthenticated(false);
      setRole(null);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        loading,
        logout,
        verifyAuth,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
