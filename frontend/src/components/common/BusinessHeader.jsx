import LoginButton from "../button/LoginButton";
import RegisterButton from "../button/RegisterButton";
import HamburgerButton from "../button/UserHamburgerButton.jsx";
import BusinessSideBar from "../modal/sidebar/BusinessSideBar";

import { Link } from "react-router-dom";
import { useState } from "react";
export default function BusinessHeader() {
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
                        <nav className="flex space-x-2 gap-[60px] font-bold">
                            <Link to="/business" className="text-gray-700">
                                홈
                            </Link>
                            <Link to="" className="text-gray-700">
                                예약관리
                            </Link>
                            <Link to="" className="text-gray-700">
                                디자이너 관리
                            </Link>
                            <Link to="" className="text-gray-700">
                                메뉴설정
                            </Link>
                            <Link to="/sales" className="text-gray-700">
                                매출관리
                            </Link>
                        </nav>
                        <div className="flex space-x-4">
                            <RegisterButton />
                            <LoginButton />
                            <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
                        </div>
                    </div>
                </div>
            </header>

            {/* 사이드바 컴포넌트 추가 */}
            <BusinessSideBar isOpen={isOpen} onClose={closeMenu} />
        </>
    );
}
