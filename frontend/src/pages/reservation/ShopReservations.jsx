import { useState, useEffect } from "react";
import axios from "axios";
import BusinessHeader from "../../components/common/BusinessHeader";

export default function ShopReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // 오늘 날짜 기본값
  const [latest, setLatest] = useState("ONE_WEEK");
  const [order, setOrder] = useState("TIME");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/shop/reservations", {
          params: { date, latest, order, search },
        });
        setReservations(response.data);
      } catch (error) {
        console.error("예약 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchReservations();
  }, [date, latest, order, search]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <BusinessHeader />
      <h2 className="text-2xl font-bold mb-4 mt-20">예약 목록</h2>

      {/* 필터 옵션 */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={latest}
          onChange={(e) => setLatest(e.target.value)}
        >
          <option value="ONE_WEEK">최근 1주일</option>
          <option value="ONE_MONTH">최근 1달</option>
          <option value="ONE_YEAR">최근 1년</option>
        </select>
        <select
          className="border p-2 rounded"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="TIME">일시순</option>
          <option value="CUSTOMER_NAME">고객 이름순</option>
          <option value="DESIGNER_NAME">디자이너 이름순</option>
          <option value="PRICE">가격순</option>
          <option value="PAYMENT_STATUS">결제 상태순</option>
        </select>
        <input
          type="text"
          placeholder="이름 검색"
          className="border p-2 rounded w-48"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 예약 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reservations.length === 0 ? (
          <p className="text-center text-gray-500">예약이 없습니다.</p>
        ) : (
          reservations.map((res, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2"
            >
              <h3 className="text-lg font-bold">{res.userName}</h3>
              <p className="text-gray-600 text-sm">
                {res.menuName} -{" "}
                <span className="font-bold">{res.menuPrice}원</span>
              </p>
              <p className="text-gray-600 text-sm">
                예약 시간: {res.serviceDate.split("T")[1]}
              </p>
              <p className="text-gray-600 text-sm">
                예약 날짜: {res.serviceDate.split("T")[0]}
              </p>
              <p
                className={`font-bold ${
                  res.paymentStatus === "결제완료"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {res.paymentStatus}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
