import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../sign/axios/AxiosInstance";
import { Zap, LogOut, Bell } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 사이드바 컴포넌트 자체

const DesignerSideBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
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

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    // SweetAlert2를 사용하여 확인 창 표시
    const result = await Swal.fire({
      title: "로그아웃",
      text: "정말 로그아웃 하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    // 사용자가 확인을 눌렀을 경우에만 로그아웃 처리
    if (result.isConfirmed) {
      try {
        console.log("로그아웃 요청 시작");
        const response = await axiosInstance.post(
          "/designer/signout",
          {},
          { withCredentials: true }
        );
        console.log("로그아웃 응답:", response);

        // 로그아웃 성공 메시지 표시
        toast.success("로그아웃 성공!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // 로그인 상태 변경 이벤트 발생
        window.dispatchEvent(new Event("loginStatusChanged"));
        // 메인 페이지로 리다이렉트
        navigate("/");
      } catch (error) {
        console.error("로그아웃 실패 상세:", error);
        console.error("로그아웃 실패 응답:", error.response);

        // 로그아웃 실패 메시지 표시
        toast.error("로그아웃 실패. 다시 시도해주세요.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // 에러가 발생해도 로그인 상태 변경 이벤트 발생
        window.dispatchEvent(new Event("loginStatusChanged"));
        // 메인 페이지로 리다이렉트
        navigate("/");
      }
    }
  };

  // 각각 페이지가 완성되면 path 추가
  const menuItems = [
    { id: 1, title: "홈", path: "/designer" },
    { id: 2, title: "고객 확인", path: "/client" },
    { id: 3, title: "실적 확인", path: "/sales" },
    { id: 4, title: "구인구직", path: "/job" },
    { id: 5, title: "이력서", path: "/cv" },
    { id: 6, title: "프로필", path: "/profile" },
  ];

  // 클릭 핸들러
  const handleClick = () => {
    onClose(); // 사이드바 닫기
    // 추가로 실행하고 싶은 다른 동작이 있다면 여기에 추가
  };

  return (
    <>
      {/* 오버레이 - 항상 렌더링하되 isOpen이 true일 때만 표시 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        ></div>
      )}

      {/* 사이드바 - 항상 렌더링하되 transform으로 위치 조정 */}
      <div
        className={`fixed top-0 right-0 h-full w-[370px] bg-white shadow-lg z-[70] transition-transform duration-300 ease-in-out rounded-md ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 사이드바 헤더 */}
        <div className="p-4">
          <div className="flex items-start justify-center p-3">
            <div className="flex items-center gap-2 text-lg font-bold">
              <Zap className="w-10 h-10 bg-black stroke-white" />
              <span>{userName}</span>
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
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-md text-gray-600 hover:text-gray-900 p-5 font-bold"
          >
            <LogOut className="w-4 h-4" />
            <span>로그아웃</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DesignerSideBar;
