import { useState, useEffect } from "react";
import CheckDetailModal from "../modal/reservationcheck/CheckDetailModal.jsx";
import CheckList from "./CheckList.jsx";
import CheckHeader from "./CheckHeader.jsx";
import axios from "axios";

import reviewEX from "../../assets/hairshop/reviewEX.jpg";

export default function ReservationCheck() {
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/user/reservation");
        console.log("예약 정보 응답 데이터:", response.data);
        setReservations(response.data);
        setError(null);
      } catch (err) {
        setError("예약 데이터를 불러오는데 실패했습니다.");
        console.error("예약 데이터 로딩 에러:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // id를 기준으로 정렬
  const sortedReservations = reservations.sort(
    (a, b) => new Date(b.serviceDate) - new Date(a.serviceDate)
  );

  const filteredReservations = sortedReservations.filter(
    (reservation) =>
      reservation?.serviceDate &&
      new Date(reservation.serviceDate).getFullYear().toString() ===
        selectedYear
  );

  // 검색어에 따라 필터링된 예약 목록
  const filteredSearch = sortedReservations.filter(
    (reservation) =>
      reservation?.serviceDate &&
      new Date(reservation.serviceDate).getFullYear().toString() ===
        selectedYear &&
      (reservation.shop?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.designer?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}`;
  };

  const handleRowClick = (reservation) => {
    setSelectedReservation({
      id: reservation.reservationId,
      date: reservation.serviceDate,
      salonName: reservation.shop,
      designer: reservation.designer,
      menu: reservation.menu,
      price: reservation.price,
      status: "예약완료", // 기본값 설정
    });
  };

  const closeModal = () => {
    setSelectedReservation(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-10 m-10 pt-20 mt-10">로딩 중...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-10 m-10 pt-20 mt-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 m-10 pt-20 mt-10">
      <div className="mb-4 pb-4 flex items-center">
        <CheckHeader
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      <div className="border rounded-lg p-3 m-10 overflow-x-auto">
        <CheckList
          handleRowClick={handleRowClick}
          filteredReservations={filteredSearch}
          formatDate={formatDate}
        />
      </div>
      {selectedReservation && (
        <CheckDetailModal
          reservation={selectedReservation}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
