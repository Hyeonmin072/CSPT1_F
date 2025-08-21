import { Star, QrCode, UserRoundPen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCodeModal from "../../modal/qrcode/QRCode.jsx";

export default function ProfileInfo({ shopName, rating, reviewCount }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [qrValue, setQrValue] = useState(""); // QR 코드 값 상태 관리

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
          "/shop/signout",
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

  // 모달 열기
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <header className="mb-4 flex justify-between items-center h-[140px]">
        {/* 상점 이름과 리뷰 */}
        <div className="p-6">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-2">{shopName}</h1>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <p className="text-gray-500">
              {rating ? rating.toFixed(2) : "0.00"} ({reviewCount} 리뷰)
            </p>
          </div>
        </div>
        {/* 로그아웃 버튼 */}
        <button
          onClick={handleLogout}
          className="m-4 flex items-center justify-center gap-2 bg-gray-300 w-[150px] h-10 rounded-full text-md text-gray-600 hover:text-gray-900 p-5 font-bold"
        >
          <span>로그아웃</span>
          <LogOut className="w-4 h-4" />
        </button>
      </header>
      {/* 버튼들 */}
      <div className="flex border-t-2">
        <button
          className="w-1/2 border-r-2 py-2 px-4 hover:bg-gray-100 flex flex-row gap-2 justify-center"
          onClick={() => navigate("/shop/profile")}
        >
          <UserRoundPen />
          <p>정보 수정</p>
        </button>
        <button
          className="w-1/2 py-2 px-4 hover:bg-gray-100 flex flex-row gap-2 justify-center"
          onClick={handleOpenModal}
        >
          <QrCode />
          <p>근태QR</p>
        </button>

        {/* QR 코드 모달 */}
        <QRCodeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          qrValue={qrValue}
        />
      </div>
    </>
  );
}
