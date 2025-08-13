import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import BusinessHeader from "../../components/common/BusinessHeader.jsx";
import ReservationDetailModal from "./ReservationDetailModal.jsx";

// 날짜 포맷 변환 함수
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${String(
      date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

// 가격 포맷 변환 함수 (천 단위 쉼표 추가)
const formatPrice = (price) => price.toLocaleString() + "원";

export default function ShopReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [latest, setLatest] = useState("ONE_WEEK");
  const [order, setOrder] = useState("TIME");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // 예약 리스트 가져오기 (재사용 가능)
  const fetchReservations = useCallback(async () => {
    try {
      const response = await axios.get("/shop/reservations", {
        params: { date, latest, order, search },
      });
      setReservations(response.data);
    } catch (error) {
      console.error("예약 데이터를 불러오는 중 오류 발생:", error);
    }
  }, [date, latest, order, search]);

  // 컴포넌트 마운트 및 필터 변경 시 예약 리스트 갱신
  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // 모달 닫기 시 선택 초기화 + 예약 리스트 갱신
  const handleCloseModal = () => {
    setSelectedId(null);
    fetchReservations();
  };

  return (
      <div className="max-w-4xl mx-auto p-6">
        <BusinessHeader />
        <h2 className="text-3xl font-bold mb-6 mt-24">예약 목록</h2>

        {/* 필터 옵션 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
              type="date"
              className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={date}
              onChange={(e) => setDate(e.target.value)}
          />
          <select
              className="border p-2 rounded-lg shadow-sm focus:ring-gray-300"
              value={latest}
              onChange={(e) => setLatest(e.target.value)}
          >
            <option value="ONE_WEEK">최근 1주일</option>
            <option value="ONE_MONTH">최근 1달</option>
            <option value="ONE_YEAR">최근 1년</option>
          </select>
          <select
              className="border p-2 rounded-lg shadow-sm focus:ring-gray-300"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
          >
            <option value="TIME">일시순</option>
            <option value="CUSTOMER_NAME">고객 이름순</option>
            <option value="DESIGNER_NAME">디자이너 이름순</option>
            <option value="PRICE">가격순</option>
          </select>
          <input
              type="text"
              placeholder="이름 검색"
              className="border p-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 w-48"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 예약 리스트 */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl border border-gray-200">
          <table className="w-full border-separate border-spacing-2">
            <thead className="bg-green-600 text-white rounded-lg">
            <tr>
              <th className="py-3 px-4 text-left">예약 날짜</th>
              <th className="py-3 px-4 text-left">고객 이름</th>
              <th className="py-3 px-4 text-left">디자이너</th>
              <th className="py-3 px-4 text-left">메뉴</th>
              <th className="py-3 px-4 text-left">가격</th>
            </tr>
            </thead>
            <tbody>
            {reservations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    예약이 없습니다.
                  </td>
                </tr>
            ) : (
                reservations.map((res) => (
                    <tr
                        key={res.reservationId}
                        className="border-b hover:bg-green-50 transition duration-300 ease-in-out cursor-pointer"
                        onClick={() => setSelectedId(res.reservationId)}
                    >
                      <td className="py-3 px-4">{formatDate(res.serviceDate)}</td>
                      <td className="py-3 px-4">{res.userName}</td>
                      <td className="py-3 px-4">{res.designerName}</td>
                      <td className="py-3 px-4">{res.menuName}</td>
                      <td className="py-3 px-4 font-semibold text-green-600">
                        {formatPrice(res.menuPrice)}
                      </td>
                    </tr>
                ))
            )}
            </tbody>
          </table>
        </div>

        {/* 상세 모달 */}
        {selectedId && (
            <ReservationDetailModal
                reservationId={selectedId}
                onClose={handleCloseModal}
            />
        )}
      </div>
  );
}
