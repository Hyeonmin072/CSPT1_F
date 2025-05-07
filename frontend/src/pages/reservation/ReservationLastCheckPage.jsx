import Header from "../../components/common/Header";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ReservationLastCheckPage() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const [reservationData, setReservationData] = useState(null);
  const [countdown, setCountdown] = useState(10); // 10초로 변경

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
    if (success === "true") {
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
  }, [success]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getMonth() + 1}월 ${date.getDate()}일 (${
      days[date.getDay()]
    })`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-md mx-auto p-4 mt-20">
        {success === "true" ? (
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
