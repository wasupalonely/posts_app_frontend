import { useState, useEffect, useCallback } from "react";
import { login as loginApi } from "../api/auth";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Añadir un estado de carga
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false); // Una vez verificado el token, setea loading a false
  }, []);

  const login = useCallback(async (identifier, password) => {
    try {
      const data = await loginApi(identifier, password);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : "Login failed");
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }, []);

  return { isAuthenticated, loading, login, logout, error }; // Añadir loading al retorno
};

export default useAuth;
