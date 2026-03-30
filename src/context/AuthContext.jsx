import { createContext, useContext, useEffect, useState } from "react";
import { registerUser, loginUser, logoutUser, verifyToken } from "../api/auth";
import { useToast } from "./ToastContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { showError } = useToast();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await verifyToken();
        setUser(res.data.user);
        setIsAuthenticated(true);
        setError(null);
      } catch (error) {
        const msg = error?.response?.data?.message ?? "Sesión expirada. Inicia sesión de nuevo.";
        setError(msg);
        // Session errors surface as a toast on any page
        showError(msg);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const register = async (user) => {
    setLoading(true);
    setIsAuthenticated(false);
    setError(null);
    try {
      const res = await registerUser(user);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setError(null);
      return res.data;
    } catch (error) {
      const msg = error?.response?.data?.message ?? "Error al registrarse.";
      setError(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (user) => {
    setLoading(true);
    setIsAuthenticated(false);
    setError(null);
    try {
      const res = await loginUser(user);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setError(null);
      return res.data;
    } catch (error) {
      const msg = error?.response?.data?.message ?? "Error al iniciar sesión.";
      setError(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setIsAuthenticated(false);
    setError(null);
    try {
      const res = await logoutUser();
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      return res.data;
    } catch (error) {
      const msg = error?.response?.data?.message ?? "Error al cerrar sesión.";
      setError(msg);
      showError(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, user, loading, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;