import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginButton from "../button/LoginButton";
import UserHamburgerButton from "../button/UserHamburgerButton";
import Sidebar from "../modal/sidebar/SideBar";
import Swal from "sweetalert2";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 체크 함수
  const checkLoginStatus = () => {
    const userType = localStorage.getItem("userType");
    const name = localStorage.getItem("userName");
    if (userType && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
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

  // 로그아웃 함수
  const handleLogout = () => {
    Swal.fire({
      title: "로그아웃",
      text: "정말 로그아웃 하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        // localStorage에서 사용자 정보 삭제
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userName");

        // 로그인 상태 변경 이벤트 발생
        window.dispatchEvent(new Event("loginStatusChanged"));

        // 메인 페이지로 이동
        window.location.href = "/";

        Swal.fire({
          icon: "success",
          title: "로그아웃 완료",
          text: "다음에 또 방문해주세요!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

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
      <header className="bg-white shadow-sm w-full z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 w-full">
          <div className="flex justify-between items-center w-full">
            <div className="leading-[0.85]">
              <h1 className="text-[26px] font-[900] font-sans">HAIRISM</h1>
              <span className="text-[13px] text-black font-[700] flex justify-center">
                My Hair Partner
              </span>
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
                <span className="text-gray-700 font-bold mt-2">
                  {userName}님
                </span>
              ) : (
                <LoginButton />
              )}
              <UserHamburgerButton isOpen={isOpen} onClick={toggleMenu} />
            </div>
          </div>
        </div>
      </header>

      {/* 사이드바 컴포넌트 추가 */}
      <Sidebar isOpen={isOpen} onClose={closeMenu} />
    </>
  );
}
