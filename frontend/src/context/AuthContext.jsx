import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../components/sign/axios/AxiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const checkLoginStatus = async () => {
    try {
      const response = await axiosInstance.get("/user/loadheader", {
        withCredentials: true,
      });

      if (response.data) {
        setIsLoggedIn(true);
        if (typeof response.data === "object" && "userName" in response.data) {
          setUserName(response.data.userName);
        } else if (typeof response.data === "string") {
          setUserName(response.data);
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    } catch (err) {
      console.error("사용자 정보 조회 실패 : 로그인하지 않음");
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkLoginStatus();

    // 로그인 상태 변경 이벤트 리스너
    window.addEventListener("loginStatusChanged", checkLoginStatus);
    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    userRole,
    setUserRole,
    checkLoginStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
