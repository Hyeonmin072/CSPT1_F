import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "../button/LoginButton";
import UserHamburgerButton from "../button/UserHamburgerButton";
import DesignerSideBar from "../modal/sidebar/DesignerSideBar";
import axiosInstance from "../sign/axios/AxiosInstance";
import Swal from "sweetalert2";
import hairLogo from "../../assets/logo/hairlogo.png";

export default function DesignerHeader() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 체크 함수
  const checkLoginStatus = async () => {
    try {
      const response = await axiosInstance.get("/designer/loadheader", {
        withCredentials: true,
      });

      if (response.data) {
        setIsLoggedIn(true);
        if (typeof response.data === "object" && "userName" in response.data) {
          setUserName(response.data.userName);
        } else if (typeof response.data === "string") {
          setUserName(response.data);
        }
      }
    } catch (error) {
      console.error("사용자 정보 조회 실패 : 로그인하지 않음");
      setIsLoggedIn(false);
      setUserName("");
    }
  };

  // 초기 로그인 상태 체크
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 로그인 상태 변경 이벤트 리스너
  useEffect(() => {
    window.addEventListener("loginStatusChanged", checkLoginStatus);
    return () => {
      window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
  }, []);

  // 햄버거 버튼 클릭 시 메뉴 토글
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // 메뉴닫기
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 상단바 */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md w-full z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <img src={hairLogo} alt="Hairism Logo" className="h-12 mr-3" />
              <div className="leading-[0.85]">
                <h1 className="text-[26px] font-[900] font-sans">HAIRISM</h1>
                <span className="text-[13px] text-black font-[700] flex justify-center">
                  My Hair Partner
                </span>
              </div>
            </div>
            <nav className="flex space-x-8 gap-[60px] font-bold">
              <Link to="/" className="text-gray-700">
                홈
              </Link>
              <Link to="/hairshop" className="text-gray-700">
                헤어샵
              </Link>
              <Link to="/designer" className="text-gray-700">
                디자이너
              </Link>
              <Link to="/chat" className="text-gray-700">
                채팅
              </Link>
            </nav>
            <div className="flex space-x-4">
              {isLoggedIn ? (
                <>
                  <span className="text-gray-700 font-bold mt-2">
                    {userName}님
                  </span>
                  <UserHamburgerButton isOpen={isOpen} onClick={toggleMenu} />
                </>
              ) : (
                <LoginButton />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 사이드바 컴포넌트 추가 - 로그인 상태일 때만 표시 */}
      {isLoggedIn && <DesignerSideBar isOpen={isOpen} onClose={closeMenu} />}
    </>
  );
}
