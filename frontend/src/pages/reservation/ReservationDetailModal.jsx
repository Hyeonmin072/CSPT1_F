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
    const [cancelReason, setCancelReason] = useState("");

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

    const handleReject = async () => {
        if (!cancelReason.trim()) {
            alert("예약 거절 사유를 입력해주세요.");
            return;
        }
        if (!window.confirm("정말 이 예약을 거절하시겠습니까?")) return;

        try {
            await axios.delete(`/shop/reservations/${reservationId}`, {
                params: { cancelReason }
            });
            alert("예약이 거절되었습니다.");
            onClose(); // 모달 닫기
        } catch (e) {
            alert("예약 거절 처리 중 오류가 발생했습니다.");
        }
    };

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

    // 예약 시간이 현재보다 이후인지 체크
    const isFutureReservation = new Date(reservation.serviceDate) > new Date();

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

                {/* 거절 사유 입력 */}
                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        거절 사유
                    </label>
                    <input
                        type="text"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                        placeholder="간략한 사유를 입력하세요"
                        disabled={!isFutureReservation}
                    />
                </div>

                {/* 예약 거절 버튼 */}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleReject}
                        disabled={!isFutureReservation}
                        className={`px-4 py-2 rounded-lg shadow font-semibold ${
                            isFutureReservation
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        예약 거절
                    </button>
                </div>
                {!isFutureReservation && (
                    <p className="text-sm text-red-500 my-2 font-medium">
                        지난 예약은 거절이 불가능합니다.
                    </p>
                )}
            </div>
        </div>
    );
}
