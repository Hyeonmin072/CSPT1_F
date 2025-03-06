import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, LogOut, Bell } from "lucide-react";
import { Overlay } from "../../overlay/OverLay";

// 사이드바 컴포넌트 자체

const DesignerSideBar = ({ isOpen, onClose }) => {
    // 각각 페이지가 완성되면 path 추가
    const menuItems = [
        { id: 1, title: "홈", path: "/"},
        { id: 2, title: "고객 확인"},
        { id: 3, title: "실적 확인", path: "/sales"},
        { id: 4, title: "구인구직" },
        { id: 5, title: "이력서", path: "/cv"},
        { id: 6, title: "프로필"},
    ];

    // 클릭 핸들러
    const handleClick = () => {
        onClose(); // 사이드바 닫기
        // 추가로 실행하고 싶은 다른 동작이 있다면 여기에 추가
    };

    return (
        <>
            <Overlay isOpen={isOpen} onClose={onClose} />
            <div
                className={`fixed top-0 right-0 w-64 h-full rounded-md bg-white w-[370px] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* 사이드바 헤더 */}
                <div className="p-4">
                    <div className="flex items-start justify-center p-3">
                        <div className="flex items-center gap-2 text-lg font-bold">
                            <Zap className="w-10 h-10 bg-black stroke-white" />
                            {/* 이름 부분은 나중에 정보를 받아오면 받아온 정보로 수정 */}
                            <span>김봉팔</span>
                        </div>
                    </div>
                    {/* 알림 버튼 */}
                    <button
                        className="flex mt-auto p-1 rounded-lg hover:bg-gray-100 focus:outline-none ml-[300px]"
                        aria-label="알림"
                    >
                        <Bell className="w-8 h-8 text-gray-600" />
                    </button>
                </div>

                {/* 메뉴 아이템 */}
                <nav className="py-4">
                    <ul className="space-y-2 font-bold p-5 -mt-[40px]">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                {/* 라우트 기능 */}
                                {item.path ? (
                                    <Link
                                        to={item.path}
                                        onClick={handleClick}
                                        className="block px-4 py-2 text-gray-500 hover:bg-gray-100 text-md"
                                    >
                                        {item.title}
                                    </Link>
                                ) : (
                                    // 그냥 클릭만 되는 항목
                                    <span className="block px-4 py-2 text-gray-500 hover:bg-gray-100 text-md">
                                        {item.title}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* 로그아웃 버튼 */}
                <div className="absolute bottom-4 w-full px-4">
                    <button className="flex items-center gap-2 text-md text-gray-600 hover:text-gray-900 p-5 font-bold">
                        <LogOut className="w-4 h-4" />
                        <span>로그아웃</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default DesignerSideBar;
