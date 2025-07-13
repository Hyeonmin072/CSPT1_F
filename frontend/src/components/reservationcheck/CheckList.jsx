import { Button } from "@mui/material";
import { useState } from "react";
import ReviewWriteModal from "./ReviewWriteModal";

export default function CheckList({
  handleRowClick,
  filteredReservations,
  reservation,
  formatDate,
}) {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [reviewedReservations, setReviewedReservations] = useState(new Set());

  const handleReviewClick = (e, reservation) => {
    e.stopPropagation(); // 행 클릭 이벤트 전파 방지
    setSelectedReservation(reservation);
    setReviewModalOpen(true);
  };

  const handleReviewModalClose = () => {
    setReviewModalOpen(false);
    setSelectedReservation(null);
  };

  const handleReviewSubmit = (reservationId) => {
    // 리뷰 작성 완료된 예약 ID를 Set에 추가
    setReviewedReservations((prev) => new Set([...prev, reservationId]));
    setReviewModalOpen(false);
    setSelectedReservation(null);
  };

  const isReviewSubmitted = (reservationId) => {
    return reviewedReservations.has(reservationId);
  };
  return (
    <>
      <table className="min-w-full bg-white text-center">
        <thead>
          <tr>
            <th className="py-2 px-4">예약 날짜</th>
            <th className="py-2 px-4">헤어샵</th>
            <th className="py-2 px-4">담당 디자이너</th>
            <th className="py-2 px-4">메뉴</th>
            <th className="py-2 px-4">결제 가격</th>
            <th className="py-2 px-4">리뷰</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reservation, index) => (
              <tr
                key={index}
                onClick={() => handleRowClick(reservation)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="border py-2 px-4">
                  {formatDate(reservation.serviceDate)}
                </td>
                <td className="border py-2 px-4">{reservation.shop}</td>
                <td className="border py-2 px-4">{reservation.designer}</td>
                <td className="border py-2 px-4">{reservation.menu || ""}</td>
                <td className="border py-2 px-4">
                  <span>{reservation.price}원</span>
                </td>
                <td className="border py-2 px-4">
                  <span>
                    {isReviewSubmitted(reservation.reservationId) ? (
                      <Button
                        variant="outlined"
                        size="small"
                        disabled
                        sx={{ color: "gray", borderColor: "gray" }}
                      >
                        리뷰 완료
                      </Button>
                    ) : (
                      <Button
                        onClick={(e) => handleReviewClick(e, reservation)}
                        variant="contained"
                        size="small"
                      >
                        리뷰 작성
                      </Button>
                    )}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="border py-2 px-4 text-center">
                해당 년도의 예약이 없습니다
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ReviewWriteModal
        open={reviewModalOpen}
        handleClose={handleReviewModalClose}
        reservation={selectedReservation}
        onReviewSubmit={handleReviewSubmit}
      />
    </>
  );
}
