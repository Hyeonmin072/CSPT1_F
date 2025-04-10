import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginButton from "../button/LoginButton";
import UserHamburgerButton from "../button/UserHamburgerButton";
import Sidebar from "../modal/sidebar/SideBar";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
              <Link to="/designerpage" className="text-gray-700">
                디자이너
              </Link>
              <Link to="/chat" className="text-gray-700">
                채팅
              </Link>
            </nav>
            <div className="flex space-x-4">
              <LoginButton />
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
