import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, LogOut, Bell } from "lucide-react";
import CouponModal from "../coupon/CouponModal.jsx";
import NotificationModal from "../../notification/NotificationModal.jsx";
import Swal from "sweetalert2";
import axiosInstance from "../../../axios/AxiosInstance";

//사이드바 컴포넌트 자체
const Sidebar = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("게스트");
  const navigate = useNavigate();

  useEffect(() => {
    // 사용자 정보 가져오기
    axiosInstance
      .get("/user/header")
      .then((response) => {
        console.log("전체 응답:", response);
        console.log("응답 데이터:", response.data);
        console.log("응답 데이터 타입:", typeof response.data);

        // 응답이 객체인 경우
        if (response.data && typeof response.data === "object") {
          // userName이 직접 있는 경우
          if ("userName" in response.data) {
            setUserName(response.data.userName);
          }
          // data 객체 안에 userName이 있는 경우
          else if (response.data.data && "userName" in response.data.data) {
            setUserName(response.data.data.userName);
          }
          // name이 있는 경우
          else if ("name" in response.data) {
            setUserName(response.data.name);
          }
          // data 객체 안에 name이 있는 경우
          else if (response.data.data && "name" in response.data.data) {
            setUserName(response.data.data.name);
          }
        }
        // 응답이 문자열인 경우
        else if (typeof response.data === "string") {
          setUserName(response.data);
        }
      })
      .catch((error) => {
        console.error("사용자 정보 가져오기 실패:", error);
      });
  }, []);

  // 각각 페이지가 완성되면 path 추가
  const menuItems = [
    { id: 1, title: "현재 예약", path: "/reservationcheck" },
    { id: 2, title: "헤어샵", path: "/hairshop" },
    { id: 3, title: "디자이너", path: "/designerpage" },
    { id: 4, title: "채팅" },
    { id: 5, title: "프로필", path: "/userprofile" },
    { id: 6, title: "쿠폰함", modal: true },
    { id: 7, title: "좋아하는 디자이너", path: "/subscriptdesigner" },
    { id: 8, title: "나만의 디자이너 찾기" },
  ];

  //클릭 핸들러
  const handleClick = () => {
    onClose(); // 사이드바 닫기
    // 추가로 실행하고 싶은 다른 동작이 있다면 여기에 추가
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // 로그아웃 핸들러
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
        // 로그아웃 API 호출
        axiosInstance
          .post("/user/signout", {}, { withCredentials: true })
          .then(() => {
            // 로그인 상태 변경 이벤트 발생
            window.dispatchEvent(new Event("loginStatusChanged"));

            // 사이드바 닫기
            onClose();

            // 메인 페이지로 이동 및 새로고침
            window.location.href = "/";

            Swal.fire({
              icon: "success",
              title: "로그아웃 완료",
              text: "다음에 또 방문해주세요!",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch((error) => {
            console.error("로그아웃 실패:", error);
            Swal.fire({
              icon: "error",
              title: "로그아웃 실패",
              text: "다시 시도해주세요.",
              timer: 1500,
              showConfirmButton: false,
            });
          });
      }
    });
  };

  return (
    <>
      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 w-64 h-full rounded-md bg-white w-[370px] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
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
          {/* 알림 버튼을 눌렀을 때 모달이 알림 모음을 볼 수 있는 창으로 전환되게 수정 */}
          <button
            className="flex mt-auto p-1 rounded-lg hover:bg-gray-100 focus:outline-none ml-[300px]"
            aria-label="알림"
            onClick={() => setIsNotificationOpen(true)} // 수정
          >
            <Bell className="w-8 h-8 text-gray-600" />
          </button>
        </div>

        {/* 메뉴 아이템 */}
        <nav className="py-4">
          <ul className="space-y-2 font-bold p-5 -mt-[40px]">
            {/* menuItems를 순회하며 있는 내용들을 출력 */}
            {menuItems.map((item) => (
              <li key={item.id}>
                {/* 라우트 기능 */}
                {item.path ? (
                  // 경로가 있으면 Link 사용
                  <Link
                    // item.path에 있는 곳으로 가라
                    to={item.path}
                    // onClick에 클릭핸들러 사용
                    onClick={handleClick}
                    className="block px-4 py-2 text-gray-500 hover:bg-gray-100 text-md"
                  >
                    {item.title}
                  </Link>
                ) : item.modal ? (
                  // 모달 열기 버튼
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="block w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100 text-md"
                  >
                    {item.title}
                  </button>
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

      {/* 쿠폰 모달 */}
      <CouponModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* 알림모달 */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
};

export default Sidebar;
