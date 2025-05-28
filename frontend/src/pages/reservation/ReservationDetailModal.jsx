import { useState, useEffect } from "react";
import axios from "axios";

export default function ReservationDetailModal({ reservationId, onClose }) {
    const [reservation, setReservation] = useState(null);

    useEffect(() => {
        if (!reservationId) return;

        const fetchDetail = async () => {
            try {
                const response = await axios.get(`/shop/reservations/${reservationId}`);
                setReservation(response.data);
            } catch (error) {
                console.error("상세 예약 데이터를 불러오는 중 오류 발생:", error);
            }
        };

        fetchDetail();
    }, [reservationId]);

    if (!reservation) return null;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-green-950 via-green-800 to-green-900 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-10 relative border-4 border-green-500">
                {/* 닫기 버튼 */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-green-600 hover:text-green-800 transition-transform hover:scale-125 focus:outline-none"
                    aria-label="닫기"
                    title="닫기"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-3xl font-bold mb-8 text-green-600 drop-shadow-md border-b-4 border-green-400 pb-3 text-center">
                    예약 상세 정보
                </h3>

                <div className="space-y-6">
                    <InfoRow label="고객" value={reservation.userName} />
                    <InfoRow label="디자이너" value={reservation.designerName} />
                    <InfoRow label="메뉴" value={reservation.menuName} />
                    <InfoRow label="가격" value={`${reservation.menuPrice.toLocaleString()}원`} />
                    <InfoRow label="일시" value={formatDate(reservation.serviceDate)} />
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between items-center bg-gradient-to-r from-green-200 to-green-100 rounded-xl p-5 shadow-md border border-green-400">
            <span className="font-semibold text-green-800 text-lg">{label}</span>
            <span className="text-green-900 text-lg font-medium">{value}</span>
        </div>
    );
}