import Header from "../../components/common/Header";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
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

  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const handlePaymentResult = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const paymentKey = searchParams.get("paymentKey");
        const orderId = searchParams.get("orderId");
        const amount = searchParams.get("amount");

        console.log("결제 파라미터:", {
          paymentKey,
          orderId,
          amount,
        });

        // 임시 예약 데이터 확인
        const tempReservation = localStorage.getItem("tempReservation");
        console.log(
          "임시 예약 데이터:",
          tempReservation ? JSON.parse(tempReservation) : "없음"
        );

        if (!paymentKey || !orderId || !amount) {
          setError("결제 정보가 올바르지 않습니다.");
          toast.error("결제 정보가 올바르지 않습니다.");
          return;
        }

        try {
          // 결제 성공 처리
          const response = await axiosInstance.get("/user/payment/success", {
            params: {
              paymentKey,
              orderId,
              amount: parseInt(amount, 10), // 문자열을 숫자로 변환
            },
          });

          console.log("결제 성공 응답:", response.data);

          if (!response.data) {
            throw new Error("결제 정보를 찾을 수 없습니다.");
          }

          setReservationData({
            shopInfo: {
              shopName: response.data.shopName || "미지정",
              shopEmail: response.data.shopEmail || "미지정",
            },
            designerName: response.data.designerName || "미지정",
            designerImage: response.data.designerImage || "/default-avatar.png",
            designerDesc: response.data.designrDesc || "설명 없음",
            reservationDate:
              response.data.serviceDate?.split("T")[0] ||
              new Date().toISOString().split("T")[0],
            reservationTime:
              response.data.serviceDate?.split("T")[1]?.substring(0, 5) ||
              "00:00",
            menuInfo: {
              menuName: response.data.menuName || "미지정",
              menuDesc: response.data.menuDesc || "설명 없음",
              finalPrice: response.data.price || 0,
            },
          });

          toast.success("결제가 완료되었습니다.");
        } catch (apiError) {
          console.error("API 에러 상세:", {
            status: apiError.response?.status,
            statusText: apiError.response?.statusText,
            data: apiError.response?.data,
            message: apiError.message,
            config: {
              url: apiError.config?.url,
              method: apiError.config?.method,
              params: apiError.config?.params,
            },
          });

          // 토스 결제 API 에러 처리
          if (apiError.response?.data?.code === "PROVIDER_ERROR") {
            setError(
              "결제 처리 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
            toast.error(
              "결제 처리 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
            );
          } else {
            const errorMessage =
              apiError.response?.data?.message ||
              apiError.response?.data?.error ||
              apiError.message ||
              "결제 처리 중 오류가 발생했습니다.";

            setError(errorMessage);
            toast.error(errorMessage);
          }
        }
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
    if (!loading && !error) {
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
  }, [loading, error]);

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
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            메인 페이지로 이동
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
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">결제 처리 중입니다...</p>
          </div>
        ) : (
          <>
            {error ? (
              <div className="text-red-600 font-bold text-xl mb-4 text-center">
                <div>{countdown}초 후 메인 페이지로 이동합니다</div>
                결제에 실패했습니다 😢 다시 시도해주세요.
              </div>
            ) : (
              <div className="text-green-600 font-bold text-xl mb-4 text-center">
                예약이 완료되었습니다 🎉
                <div className="text-sm text-gray-500 mt-2">
                  {countdown}초 후 메인 페이지로 이동합니다
                </div>
              </div>
            )}
          </>
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
                  <span>결제 금액</span>
                  <span>
                    {reservationData.menuInfo.finalPrice?.toLocaleString() || 0}
                    원
                  </span>
                </div>
              </div>
            </div>

            {/* 최종 금액 */}
            <div className="text-right">
              <div className="text-lg font-bold">
                총 결제 금액:{" "}
                {reservationData.menuInfo.finalPrice?.toLocaleString() || 0}원
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="mt-6">
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
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
