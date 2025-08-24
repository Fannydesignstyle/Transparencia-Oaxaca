"use client";

import { useState, useEffect } from 'react';

interface User {
  username: string;
  role: string;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación al cargar el componente
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("isAdminAuthenticated");
        const userStr = localStorage.getItem("adminUser");
        
        if (authStatus === "true" && userStr) {
          const userData = JSON.parse(userStr);
          setIsAuthenticated(true);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Limpiar datos inválidos
        localStorage.removeItem("isAdminAuthenticated");
        localStorage.removeItem("adminUser");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (username: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulación de autenticación
      setTimeout(() => {
        if (username === "admin" && password === "admin123") {
          const userData: User = { username, role: "admin" };
          localStorage.setItem("isAdminAuthenticated", "true");
          localStorage.setItem("adminUser", JSON.stringify(userData));
          setIsAuthenticated(true);
          setUser(userData);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    localStorage.removeItem("adminUser");
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout
  };
}