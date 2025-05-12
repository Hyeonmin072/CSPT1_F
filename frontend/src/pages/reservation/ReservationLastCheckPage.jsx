import Header from "../../components/common/Header";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../components/sign/axios/AxiosInstance";
import { toast } from "react-hot-toast";

export default function ReservationLastCheckPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [countdown, setCountdown] = useState(10); // 10초로 변경

  useEffect(() => {
    const handlePaymentResult = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const success = searchParams.get("success") === "true";
        const paymentKey = searchParams.get("paymentKey");
        const orderId = searchParams.get("orderId");
        const amount = searchParams.get("amount");

        console.log("결제 파라미터:", {
          success,
          paymentKey,
          orderId,
          amount,
        });

        if (success) {
          if (!paymentKey || !orderId || !amount) {
            throw new Error("필수 결제 정보가 누락되었습니다.");
          }

          // 결제 성공 처리
          try {
            const response = await axiosInstance.get("/user/payment/success", {
              params: {
                paymentKey,
                orderId,
                amount,
              },
            });

            console.log("결제 성공 응답:", response.data);

            if (response.data.success) {
              toast.success("결제가 완료되었습니다.");
            } else {
              throw new Error(
                response.data.message || "결제 처리 중 오류가 발생했습니다."
              );
            }
          } catch (apiError) {
            console.error("API 에러 상세:", {
              status: apiError.response?.status,
              data: apiError.response?.data,
              message: apiError.message,
            });
            throw new Error(
              apiError.response?.data?.message ||
                "결제 처리 중 오류가 발생했습니다."
            );
          }
        } else {
          toast.error("결제에 실패했습니다.");
        }

        // 3초 후 예약 목록 페이지로 이동
        setTimeout(() => {
          navigate("/mypage/reservations");
        }, 3000);
      } catch (error) {
        console.error("결제 처리 실패 상세:", {
          message: error.message,
          stack: error.stack,
        });
        setError(error.message || "결제 처리 중 오류가 발생했습니다.");
        toast.error(error.message || "결제 처리 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    handlePaymentResult();
  }, [location, navigate]);

  useEffect(() => {
    const data = localStorage.getItem("reservationData");
    if (data) {
      const parsedData = JSON.parse(data);
      console.log("\n=== 예약 데이터 ===");
      console.log("샵 정보:", parsedData.shopInfo);
      console.log("디자이너 정보:", {
        name: parsedData.designerName,
        email: parsedData.designerEmail,
        image: parsedData.designerImage,
        desc: parsedData.designerDesc,
      });
      console.log("예약 정보:", {
        date: parsedData.reservationDate,
        time: parsedData.reservationTime,
      });
      console.log("메뉴 정보:", parsedData.menuInfo);
      console.log("========================\n");

      setReservationData(parsedData);
      localStorage.removeItem("reservationData");
    }
  }, []);

  // 10초 카운트다운 및 자동 이동
  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = "/";
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${
      days[date.getDay()]
    })`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">결제 처리 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate("/mypage/reservations")}
            className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            예약 목록으로 이동
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-md mx-auto p-4 mt-20">
        {loading ? (
          <div className="text-green-600 font-bold text-xl mb-4 text-center">
            예약이 완료되었습니다 🎉
            <div className="text-sm text-gray-500 mt-2">
              {countdown}초 후 메인 페이지로 이동합니다
            </div>
          </div>
        ) : (
          <div className="text-red-600 font-bold text-xl mb-4 text-center">
            결제에 실패했습니다 😢 다시 시도해주세요.
          </div>
        )}

        {reservationData && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* 영수증 헤더 */}
            <div className="text-center border-b pb-4 mb-4">
              <h1 className="text-2xl font-bold">
                {reservationData.shopInfo.shopName}
              </h1>
              <p className="text-gray-600">
                {reservationData.shopInfo.shopEmail}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {formatDate(reservationData.reservationDate)}{" "}
                {reservationData.reservationTime}
              </p>
            </div>

            {/* 디자이너 정보 */}
            <div className="border-b pb-4 mb-4">
              <div className="flex items-center">
                <img
                  src={reservationData.designerImage || "/default-avatar.png"}
                  alt={reservationData.designerName}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {reservationData.designerName} 디자이너
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {reservationData.designerDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* 메뉴 정보 */}
            <div className="border-b pb-4 mb-4">
              <h3 className="font-semibold mb-2">주문 내역</h3>
              <div className="bg-gray-50 p-3 rounded">
                <p className="font-medium">
                  {reservationData.menuInfo.menuName}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {reservationData.menuInfo.menuDesc}
                </p>
                <div className="flex justify-between text-sm">
                  <span>정가</span>
                  <span>
                    {reservationData.menuInfo.originalPrice.toLocaleString()}원
                  </span>
                </div>
                {reservationData.menuInfo.discountPrice > 0 && (
                  <div className="flex justify-between text-sm text-red-500">
                    <span>{reservationData.menuInfo.discountType}</span>
                    <span>
                      -{reservationData.menuInfo.discountPrice.toLocaleString()}
                      원
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 최종 금액 */}
            <div className="text-right">
              <div className="text-lg font-bold">
                총 결제 금액:{" "}
                {reservationData.menuInfo.finalPrice.toLocaleString()}원
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="mt-6">
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-[#03DAC5] text-white py-3 rounded-lg hover:bg-[#00a896] transition-colors"
              >
                메인으로 돌아가기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
