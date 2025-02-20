export default function CheckList({ handleRowClick, filteredReservations, reservation, formatDate }){
    return(
        <>
            <table className="min-w-full bg-white text-center">
                <thead>
                <tr>
                    <th className="py-2 px-4">날짜</th>
                    <th className="py-2 px-4">헤어샵</th>
                    <th className="py-2 px-4">디자이너</th>
                    <th className="py-2 px-4">메뉴</th>
                    <th className="py-2 px-4">결제 상태</th>
                </tr>
                </thead>
                <tbody>
                {filteredReservations.length > 0 ? (
                    filteredReservations.map((reservation, index) => (
                        <tr key={index} onClick={() => handleRowClick(reservation)}
                            className="cursor-pointer hover:bg-gray-100">
                            <td className="border py-2 px-4">{formatDate(reservation.date)}</td>
                            <td className="border py-2 px-4">{reservation.salonName}</td>
                            <td className="border py-2 px-4">{reservation.designer}</td>
                            <td className="border py-2 px-4">{reservation.menu}</td>
                            <td className="border py-2 px-4">
                                <span className={`inline-block px-2 py-1 font-bold rounded-full
                                    ${reservation.status === "예약완료" ? "bg-[#C8FFF4] text-[#00B3A6]" : reservation.status === "예약취소" ? "bg-red-200 text-red-600" : ""}`}>
                                    {reservation.status}
                                </span>
                            </td>

                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="border py-2 px-4 text-center">해당 년도의 예약이 없습니다</td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
    );
}