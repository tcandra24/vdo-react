import { createContext, useEffect, useState } from "react";
import cookies from "js-cookie";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticate] = useState(!!cookies.get("token"));

  const [videoCount, setVideoCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const counts = {
    user: {
      state: userCount,
    },
    category: {
      state: categoryCount,
    },
    video: {
      state: videoCount,
    },
  };

  const fetchDataDashboard = async () => {
    try {
      if (isAuthenticated) {
        const token = cookies.get("token");

        if (!token) return new Error("Token Not Found");

        api.defaults.headers.common["Authorization"] = token;
        const { data } = await api.get("/api/dashboard/total-data");

        if (!data.success) {
          throw new Error(data.message);
        }

        setVideoCount(data.total.video);
        setCategoryCount(data.total.category);
        setUserCount(data.total.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleTokenChange = () => {
      setIsAuthenticate(!!cookies.get("token"));
    };

    window.addEventListener("storage", handleTokenChange);
    fetchDataDashboard();

    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticate, counts, fetchDataDashboard }}
    >
      {children}
    </AuthContext.Provider>
  );
};
