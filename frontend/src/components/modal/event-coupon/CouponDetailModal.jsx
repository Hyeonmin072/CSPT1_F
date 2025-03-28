import React from "react";

export default function CouponDetailModal({ isCModalOpen, selectedItem, closeCouponModal }){
    if (!isCModalOpen) return null; // 모달이 닫힌 상태에서는 렌더링하지 않음

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-md p-6 max-w-lg w-[700px] h-auto">
                <h3 className="text-xl font-semibold mb-4">{selectedItem.title}</h3>

                <div className="flex flex-row space-x-5">
                    <p className="mb-2">진행 날짜 : {selectedItem.start}</p>
                    <p>/</p>
                    <p className="mb-4">{selectedItem.end}</p>
                </div>

                <div>
                    <p className="mb-2">
                        할인 유형 : {selectedItem.discountType || "없음"}
                    </p>
                </div>
                <div>
                    <p className="mb-2">
                        할인 금액 :
                         {selectedItem.discountType === "percent"
                            ? ` ${selectedItem.discountValue}%`
                            : selectedItem.discountType === "amount"
                                ? ` ${selectedItem.discountValue}원`
                                : "없음"}
                    </p>
                </div>
                <div>
                    <p className="mb-2">
                        최소 금액 : {selectedItem.minimumPurchase || "없음"} 원
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