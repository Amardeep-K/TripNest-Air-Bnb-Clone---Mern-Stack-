import { createContext, useEffect, useState, useContext } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check login status on refresh
  useEffect(() => {
    api.get("/auth/me")
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data.user);
    return res;
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setUser(res.data.user); 
    return res;
  };

  const logout = async () => {
    await api.get("/auth/logout");
    setUser(null);
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      googleLogin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
