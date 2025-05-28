import React from "react";

export default function CouponDetailModal({ isCModalOpen, selectedItem, closeCouponModal }) {
    if (!isCModalOpen) return null; // 모달이 닫힌 상태에서는 렌더링하지 않음

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-[700px]">
                {/* 제목 */}
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {selectedItem.name || "쿠폰 상세 정보"}
                </h3>
                <h2 className="border-b mb-4"></h2>

                {/* 상세 정보 */}
                <dl className="space-y-4">
                    <div className="flex flex-row space-x-5 px-2 py-2">
                        <dt className="text-sm font-semibold text-gray-600">수령 가능 기간 : </dt>
                        <dd className="text-gray-800">{selectedItem.getDate || "없음"}</dd>
                    </div>
                    <div className="flex flex-row space-x-5 px-2 py-2">
                        <dt className="text-sm font-semibold text-gray-600">수령 후 사용 가능 기간 : </dt>
                        <dd className="text-gray-800">{selectedItem.useDate || "없음"}일</dd>
                    </div>
                    <div className="flex flex-row space-x-5 px-2 py-2">
                        <dt className="text-sm font-semibold text-gray-600">할인 유형 : </dt>
                        <dd className="text-gray-800">{selectedItem.type || "없음"}</dd>
                    </div>
                    <div className="flex flex-row space-x-5 px-2 py-2">
                        <dt className="text-sm font-semibold text-gray-600">할인 금액 : </dt>
                        <dd className="text-gray-800">
                            {selectedItem.type === "PERCENT"
                                ? `${selectedItem.price}%`
                                : selectedItem.type === "FIXED"
                                ? `${selectedItem.price}원`
                                : "없음"}
                        </dd>
                    </div>
                </dl>

                {/* 닫기 버튼 */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={closeCouponModal}
                        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}