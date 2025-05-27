import { useState, useEffect } from "react";
import axios from "axios";

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
            <h2 className="text-2xl font-bold mb-4">예약 목록</h2>

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
                </select>
                <input
                    type="text"
                    placeholder="이름 검색"
                    className="border p-2 rounded w-48"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* 예약 리스트 - 리스트 형식으로 표시 */}
            <div className="bg-white shadow-md rounded p-4">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                    <tr className="border-b">
                        <th className="py-2 px-4 text-left">예약 날짜</th>
                        <th className="py-2 px-4 text-left">고객 이름</th>
                        <th className="py-2 px-4 text-left">디자이너</th>
                        <th className="py-2 px-4 text-left">메뉴</th>
                        <th className="py-2 px-4 text-left">가격</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reservations.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center text-gray-500 py-4">
                                예약이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        reservations.map((res, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2 px-4">
                                    {res.serviceDate.replace("T", " ")}
                                </td>
                                <td className="py-2 px-4">{res.userName}</td>
                                <td className="py-2 px-4">{res.designerName}</td>
                                <td className="py-2 px-4">{res.menuName}</td>
                                <td className="py-2 px-4">{res.menuPrice}원</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}