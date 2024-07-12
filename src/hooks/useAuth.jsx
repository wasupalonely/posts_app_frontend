import { useState, useEffect, useCallback } from "react";
import { login as loginApi } from "../api/auth";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
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
      console.log("error ...", err);
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  }, []);

  return { isAuthenticated, login, logout, error };
};

export default useAuth;
