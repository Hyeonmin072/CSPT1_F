import Header from "../../components/common/Header";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ReservationLastCheckPage() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success"); // true or false 읽어옴
  const [reservationData, setReservationData] = useState(null);

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
      // 사용 후 삭제
      localStorage.removeItem("reservationData");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="p-4">
        {success === "true" ? (
          <div className="text-green-600 font-bold text-xl mb-4">
            예약이 완료되었습니다 🎉
          </div>
        ) : (
          <div className="text-red-600 font-bold text-xl mb-4">
            결제에 실패했습니다 😢 다시 시도해주세요.
          </div>
        )}
      </div>
    </div>
  );
  // 추가로 메인 페이지 이동 버튼 필요
}
