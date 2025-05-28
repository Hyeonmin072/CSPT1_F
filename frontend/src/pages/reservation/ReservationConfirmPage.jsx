import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Header from "../../components/common/Header.jsx";
import { IoChevronBackOutline } from "react-icons/io5";
import axiosInstance from "../../components/sign/axios/AxiosInstance";
import React, { useEffect, useState } from "react";

export default function ReservationConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const reservationData = location.state;
  const [success, setSuccess] = useState(null);

  if (!reservationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">예약 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${
      days[date.getDay()]
    })`;
  };

  // TossPayments 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.tosspayments.com/v1/payment";
    script.async = true;
    script.onload = () => {
      console.log("TossPayments 스크립트가 로드되었습니다.");
    };
    document.body.appendChild(script);

    // Cleanup: 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      // 서버에 보낼 데이터 형식 맞추기
      const requestData = {
        price: reservationData.menuInfo.finalPrice,
        serviceDate: `${reservationData.reservationDate}T${reservationData.reservationTime}:00`,
        designerEmail: reservationData.designerEmail,
        shopEmail: reservationData.shopInfo.shopEmail,
        menuId: reservationData.menuInfo.menuId,
      };

      console.log("임시 예약 요청 데이터:", requestData);

      // API 호출
      const response = await axiosInstance.post(
        "/user/reservation",
        requestData
      );

      console.log("서버 응답 전체:", response);
      console.log("서버 응답 데이터:", response.data);

      if (response.status === 200 || response.status === 201) {
        const data = response.data;

        // 서버 응답 데이터 검증
        console.log("서버 응답 데이터 상세:", {
          price: data.price,
          paymentId: data.paymentId,
          reservMenuName: data.reservMenuName,
          userName: data.userName,
          userEmail: data.userEmail,
          successUrl: data.successUrl,
          failUrl: data.failUrl,
        });

        if (!data.successUrl || !data.failUrl) {
          console.error("서버 응답에 URL이 없습니다:", data);
          toast.error("결제 URL을 받지 못했습니다.");
          return;
        }

        if (!data.paymentId) {
          console.error("서버 응답에 paymentId가 없습니다:", data);
          toast.error("결제 ID를 받지 못했습니다.");
          return;
        }

        if (!data.price || data.price <= 0) {
          console.error("서버 응답에 올바른 금액이 없습니다:", data);
          toast.error("결제 금액이 올바르지 않습니다.");
          return;
        }

        // 임시 예약 데이터 저장
        localStorage.setItem("tempReservation", JSON.stringify(data));

        const tossPayments = window.TossPayments(
          "test_ck_DnyRpQWGrNqx9ow4JNabVKwv1M9E"
        );

        // 결제 요청 데이터 검증
        const paymentRequestData = {
          amount: data.price,
          orderId: data.paymentId,
          orderName: data.reservMenuName,
          customerName: data.userName,
          customerEmail: data.userEmail,
          successUrl: data.successUrl,
          failUrl: data.failUrl,
        };

        console.log("토스페이먼츠 결제 요청 데이터:", paymentRequestData);

        // 금액이 올바른지 확인
        if (!paymentRequestData.amount || paymentRequestData.amount <= 0) {
          console.error("잘못된 결제 금액:", paymentRequestData.amount);
          toast.error("결제 금액이 올바르지 않습니다.");
          return;
        }

        // 결제 요청
        await tossPayments.requestPayment("CARD", paymentRequestData);
      } else {
        console.error("임시 예약 생성 실패:", response);
        setSuccess(false);
        toast.error("예약 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("예약 실패 상세:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setSuccess(false);
      toast.error(
        error.response?.data?.message ||
          "예약에 실패했습니다. 다시 시도해주세요."
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col mt-20">
      <Header />
      {/* 커스텀 헤더 */}
      <div className="fixed top-16 left-0 right-0 bg-white border-b z-10 mt-3">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-600 p-2">
            <IoChevronBackOutline size={24} />
          </button>
          <h1 className="ml-2 text-lg font-medium">예약 확인</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 mt-20 w-full">
        {/* 예약 정보 카드 */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          {/* 헤어샵 정보 */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold mb-1">
              {reservationData.shopInfo.shopName}
            </h2>
            <p className="text-gray-600">
              {reservationData.shopInfo.shopEmail}
            </p>
          </div>

          {/* 디자이너 정보 */}
          <div className="flex items-center mb-6 border-b pb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
              <img
                src={reservationData.designerImage || "/default-avatar.png"}
                alt={reservationData.designerName}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-1">
                {reservationData.designerName} 디자이너
              </h3>
              <p className="text-gray-600">{reservationData.designerDesc}</p>
            </div>
          </div>

          {/* 예약 시간 정보 */}
          <div className="mb-6 border-b pb-4">
            <h3 className="text-lg font-semibold mb-3">예약 시간</h3>
            <p className="text-gray-800">
              {formatDate(reservationData.reservationDate)}{" "}
              {reservationData.reservationTime}
            </p>
          </div>

          {/* 메뉴 정보 */}
          <div className="mb-6 border-b pb-4">
            <h3 className="text-lg font-semibold mb-3">선택하신 메뉴</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-lg mb-2">
                {reservationData.menuInfo.menuName}
              </h4>
              <p className="text-gray-600 mb-3">
                {reservationData.menuInfo.menuDesc}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">정가</span>
                <span className="font-medium">
                  {reservationData.menuInfo.originalPrice.toLocaleString()}원
                </span>
              </div>
              {reservationData.menuInfo.discountPrice > 0 && (
                <div className="flex justify-between items-center mt-1 text-red-500">
                  <span>{reservationData.menuInfo.discountType}</span>
                  <span>
                    -{reservationData.menuInfo.discountPrice.toLocaleString()}원
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 최종 가격 */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>총 결제 금액</span>
              <span className="text-black">
                {reservationData.menuInfo.finalPrice.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 결제 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handlePayment}
            className="w-full py-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
