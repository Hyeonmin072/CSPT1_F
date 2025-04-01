import React, {useState} from "react";

export default function CouponCreateModal({
                                              newCoupon,
                                              setNewCoupon,
                                              isCouponModalOpen,
                                              setIsCouponModalOpen,
                                              handleCouponSubmit,
                                          }) {

    const [receiptDate, setReceiptDate] = useState("");

    // Function to calculate remaining validity period
    const calculateValidityPeriod = () => {
        if (receiptDate && newCoupon.end) {
            const endDate = new Date(newCoupon.end);
            const receiptDateObj = new Date(receiptDate);
            const timeDiff = endDate - receiptDateObj;
            const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert ms to days
            return daysRemaining > 0 ? daysRemaining : 0; // Ensure no negative values
        }
        return "";
    };

    return (
        <div>
            {isCouponModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-6 max-w-lg w-[700px] h-auto">
                        <h3 className="text-xl font-semibold mb-4">쿠폰 등록</h3>

                        {/* 쿠폰 제목 */}
                        <input
                            type="text"
                            placeholder="쿠폰 제목"
                            className="w-full p-2 mb-2 border rounded"
                            value={newCoupon.title}
                            onChange={(e) =>
                                setNewCoupon({ ...newCoupon, title: e.target.value })
                            }
                        />

                        {/* 쿠폰 기간 */}
                        <p className="mt-2">쿠폰 사용 가능 날짜</p>
                        <div className="flex flex-row w-full space-x-5">
                            <input
                                type="date"
                                className="w-full p-2 mb-2 border rounded"
                                value={newCoupon.start}
                                onChange={(e) =>
                                    setNewCoupon({ ...newCoupon, start: e.target.value })
                                }
                            />
                            <p>-</p>
                            <input
                                type="date"
                                className="w-full p-2 mb-2 border rounded"
                                value={newCoupon.end}
                                onChange={(e) =>
                                    setNewCoupon({ ...newCoupon, end: e.target.value })
                                }
                            />
                        </div>

                        <div className="flex flex-row justify-between space-x-4">
                            <div className="w-full">
                                {/* 쿠폰 수령 가능 종료일 */}
                                <p className="mt-4">쿠폰 수령 종료일</p>
                                <input
                                    type="date"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newCoupon.receiptDate || ""} // Access receiptDate from newCoupon
                                    onChange={(e) =>
                                        setNewCoupon({
                                            ...newCoupon,
                                            receiptDate: e.target.value, // Update receiptDate in newCoupon
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {/* 할인 유형 선택 */}
                        <p className="mt-4">할인 유형</p>
                        <div className="flex items-center space-x-4 mb-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="discountType"
                                    className="mr-2"
                                    checked={newCoupon.discountType === "percent"}
                                    onChange={() =>
                                        setNewCoupon({
                                            ...newCoupon,
                                            discountType: "percent",
                                            discountValue: "",
                                        })
                                    }
                                />
                                퍼센트 할인 (%)
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="discountType"
                                    className="mr-2"
                                    checked={newCoupon.discountType === "amount"}
                                    onChange={() =>
                                        setNewCoupon({
                                            ...newCoupon,
                                            discountType: "amount",
                                            discountValue: "",
                                        })
                                    }
                                />
                                정액 할인 (원)
                            </label>
                        </div>

                        {/* 할인 값 입력 */}
                        {newCoupon.discountType && (
                            <input
                                type="number"
                                placeholder={
                                    newCoupon.discountType === "percent"
                                        ? "할인율을 입력하세요 (%)"
                                        : "할인 금액을 입력하세요 (원)"
                                }
                                className="w-full p-2 mb-2 border rounded"
                                value={newCoupon.discountValue || ""}
                                onChange={(e) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        discountValue: e.target.value,
                                    })
                                }
                            />
                        )}

                        {/* 최소 구매 금액 입력 */}
                        <p className="mt-4">사용 가능 최소 구매 금액</p>
                        <input
                            type="number"
                            placeholder="최소 구매 금액을 입력하세요 (원)"
                            className="w-full p-2 mb-2 border rounded"
                            value={newCoupon.minimumPurchase || ""}
                            onChange={(e) =>
                                setNewCoupon({
                                    ...newCoupon,
                                    minimumPurchase: e.target.value,
                                })
                            }
                        />



                        {/* 등록 및 닫기 버튼 */}
                        <div className="flex justify-end mt-5">
                            <button
                                onClick={handleCouponSubmit}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                등록
                            </button>
                            <button
                                onClick={() => setIsCouponModalOpen(false)}
                                className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
