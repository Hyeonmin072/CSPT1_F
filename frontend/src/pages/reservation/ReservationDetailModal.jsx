// src/components/ReservationDetailModal.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${String(
        date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

const formatPrice = (price) => {
    return price.toLocaleString() + "원";
};

export default function ReservationDetailModal({ reservationId, onClose }) {
    const [reservation, setReservation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!reservationId) return;

        const fetchDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/shop/reservations/${reservationId}`);
                setReservation(response.data);
            } catch (e) {
                setError("예약 상세 정보를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [reservationId]);

    if (loading)
        return (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center text-gray-700 font-semibold">
                    로딩 중...
                </div>
            </div>
        );

    if (error)
        return (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md relative text-red-600">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-4 text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                    <p className="text-center">{error}</p>
                </div>
            </div>
        );

    if (!reservation) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-5 text-gray-600 hover:text-gray-900 font-bold text-2xl leading-none"
                    aria-label="Close modal"
                >
                    &times;
                </button>

                <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-2">
                    예약 상세 정보
                </h3>

                <div className="space-y-4 text-gray-700">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">고객</span>
                        <span>{reservation.userName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">디자이너</span>
                        <span>{reservation.designerName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">메뉴</span>
                        <span>{reservation.menuName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-semibold">가격</span>
                        <span className="font-semibold text-gray-800">{formatPrice(reservation.menuPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">일시</span>
                        <span>{formatDate(reservation.serviceDate)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
