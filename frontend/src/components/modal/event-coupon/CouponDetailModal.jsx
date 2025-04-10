import React from "react";

export default function CouponDetailModal({ isCModalOpen, selectedItem, closeCouponModal }){
    if (!isCModalOpen) return null; // 모달이 닫힌 상태에서는 렌더링하지 않음

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-md p-6 max-w-lg w-[700px] h-auto">
                <h3 className="text-xl font-semibold mb-4">{selectedItem.c_name}</h3>

                {/* 쿠폰 수령 가능 종료일 */}
                <p className="mt-4">수령 가능 기간</p>
                <p className="mb-2">{selectedItem.c_get_date || "없음"}일</p>

                <p className="mt-4">수령 후 사용 가능 기간</p>
                <p className="mb-2">{selectedItem.c_use_date || "없음"}일</p>

                {/* 할인 유형 */}
                <p className="mt-4">할인 유형</p>
                <p className="mb-2">{selectedItem.c_type || "없음"}</p>

                {/* 할인 금액 */}
                <p className="mt-4">할인 금액</p>
                <div className="flex flex-row">
                    <p className="mb-2">
                        {selectedItem.c_type === "PERCENT"
                            ? ` ${selectedItem.c_price}%`
                            : selectedItem.c_type === "FIXED"
                                ? ` ${selectedItem.c_price}원`
                                : "없음"}
                    </p>

                </div>

                {/* 닫기 버튼 */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={closeCouponModal}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>

    );
}