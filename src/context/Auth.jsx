import { createContext, useEffect, useState } from "react";
import cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticate] = useState(!!cookies.get("token"));

  useEffect(() => {
    const handleTokenChange = () => {
      setIsAuthenticate(!!cookies.get("token"));
    };

    window.addEventListener("storage", handleTokenChange);

    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticate }}>
      {children}
    </AuthContext.Provider>
  );
};
