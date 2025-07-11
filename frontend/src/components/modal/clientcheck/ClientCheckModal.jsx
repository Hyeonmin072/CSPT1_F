import { X } from "lucide-react";
import { format, parseISO } from "date-fns";

export default function ClientCheckModal({ isModalOpen, setIsModalOpen, modalData }) {
    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-lg shadow-lg p-6 w-[400px]">
                        {/* 닫기 버튼 */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* 제목 */}
                        <h2 className="text-xl font-semibold text-center mb-6">예약 상세 정보</h2>

                        {/* 예약 정보 */}
                        {modalData ? (
                            <div className="space-y-4">
                                {/* 고객 이름 */}
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">고객 이름:</span>
                                    <span className="text-gray-900">{modalData.userName}</span>
                                </div>

                                {/* 메뉴 */}
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">메뉴:</span>
                                    <span className="text-gray-900">{modalData.menu.name}</span>
                                </div>

                                {/* 시간 */}
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">시간:</span>
                                    <span className="text-gray-900">
                                        {format(parseISO(modalData.serviceDate), "yyyy-MM-dd HH:mm")}
                                    </span>
                                </div>

                                {/* 가격 */}
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">가격:</span>
                                    <span className="text-gray-900">{modalData.menu.price}원</span>
                                </div>

                                {/* 상태 */}
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-700">상태:</span>
                                    <span
                                        className={`font-semibold ${
                                            modalData.reservationStatus === "COMPLETE"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {modalData.reservationStatus === "COMPLETE" ? "완료" : "미완료"}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">예약 정보를 불러올 수 없습니다.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}