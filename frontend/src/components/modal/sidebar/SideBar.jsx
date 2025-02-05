import { Link } from "react-router-dom";
import { Zap, LogOut } from "lucide-react";

//eslint-disable-next-line
const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { id: 1, title: "예약 관리" },
    { id: 2, title: "디자이너 관리" },
    { id: 3, title: "메뉴 설정" },
    { id: 4, title: "이벤트 및 쿠폰 관리" },
    { id: 5, title: "블랙리스트 관리" },
    { id: 6, title: "리뷰 관리" },
    { id: 7, title: "매출 관리" },
    { id: 8, title: "근태 관리" },
    { id: 9, title: "구인구직" },
    { id: 10, title: "정보 수정" },
  ];

  return (
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? "-translate-x-0" : "translate-x-full"
      }`}
    >
      {/* 사이드바 헤더 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 text-lg font-bold">
          <Zap className="w-5 h-5" />
          <span>김봉필 헤어</span>
        </div>
      </div>

      {/* 메뉴 아이템 */}
      <nav className="py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 로그아웃 버튼 */}
      <div className="absolute bottom-4 w-full px-4">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
          <LogOut className="w-4 h-4" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
