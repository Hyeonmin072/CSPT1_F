import { Button } from "@mui/material";

export default function CheckList({
  handleRowClick,
  filteredReservations,
  reservation,
  formatDate,
}) {
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
                    <Button>리뷰 작성</Button>
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
    </>
  );
}
