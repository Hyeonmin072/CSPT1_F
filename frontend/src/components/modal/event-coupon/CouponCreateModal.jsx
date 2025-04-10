import React, { useState, useEffect } from "react";
import ApiEvent from "../../businessabout/eventmenu/axios/ApiEvent.jsx";

export default function CouponCreateModal({
                                              newCoupon,
                                              setNewCoupon,
                                              isCouponModalOpen,
                                              setIsCouponModalOpen,
                                              handleCouponSubmit,
                                          }) {
    
    // 쿠폰 생성일 저장
    const [creationDate] = useState(new Date());

    const calculateRemainingDays = () => {
        const today = new Date();
        const elapsedDays = Math.floor((today - creationDate) / (1000 * 60 * 60 * 24)); // 경과된 날짜 계산
        const remainingDays = (newCoupon.c_get_date || 0) - elapsedDays; // 남은 수령 가능 일수
        return remainingDays > 0 ? remainingDays : 0; // 0일 이하로는 표시하지 않음
    };

    const handleModalClose = () => {
        setNewCoupon({
            c_name: "",
            c_get_date: "", // 수령 가능 기간
            c_use_date: "",
            c_type: "",
            c_price: "",
            s_id: "", // 사업자 ID 초기화
            c_id: "", // 쿠폰 ID 초기화
        });
        setIsCouponModalOpen(false); // 모달 닫기
    };

    return (
        <div>
            {isCouponModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-6 max-w-lg w-[700px] h-auto">
                        <h3 className="text-xl font-semibold mb-4">쿠폰 등록</h3>

                        {/* 쿠폰 이름 */}
                        <p className="mt-4 mb-2 font-bold">쿠폰 이름</p>
                        <input
                            type="text"
                            placeholder="쿠폰 이름"
                            className="w-full p-2 mb-2 border rounded"
                            value={newCoupon.c_name}
                            onChange={(e) =>
                                setNewCoupon({ ...newCoupon, c_name: e.target.value })
                            }
                        />

                        {/* 쿠폰 수령 가능 기간 */}
                        <p className="mt-4 mb-2 font-bold">수령 가능 기간 </p>
                        <input
                            type="number"
                            placeholder="수령 가능 기간을 입력하세요 (예: 7)"
                            className="w-full p-2 mb-2 border rounded"
                            value={newCoupon.c_get_date || ""}
                            onChange={(e) =>
                                setNewCoupon({ ...newCoupon, c_get_date: e.target.value })
                            }
                        />

                        {/* 쿠폰 사용 가능 기간 */}
                        <p className="mt-4 mb-2 font-bold">쿠폰 사용 가능 기간</p>
                        <input
                            type="number"
                            placeholder="사용 가능 기간을 입력하세요 (예: 30)"
                            className="w-full p-2 mb-2 border rounded"
                            value={newCoupon.c_use_date || ""}
                            onChange={(e) =>
                                setNewCoupon({ ...newCoupon, c_use_date: e.target.value })
                            }
                        />

                        {/* 할인 유형 선택 */}
                        <p className="mt-4 mb-2 font-bold">할인 유형</p>
                        <div className="flex items-center space-x-4 mb-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="c_type"
                                    className="mr-2"
                                    checked={newCoupon.c_type === "PERCENT"}
                                    onChange={() =>
                                        setNewCoupon({
                                            ...newCoupon,
                                            c_type: "PERCENT",
                                            c_price: "",
                                        })
                                    }
                                />
                                퍼센트 할인 (%)
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="c_type"
                                    className="mr-2"
                                    checked={newCoupon.c_type === "FIXED"}
                                    onChange={() =>
                                        setNewCoupon({
                                            ...newCoupon,
                                            c_type: "FIXED",
                                            c_price: "",
                                        })
                                    }
                                />
                                정액 할인 (원)
                            </label>
                        </div>

                        {/* 할인 값 입력 */}
                        {newCoupon.c_type && (
                            <input
                                type="number"
                                placeholder={
                                    newCoupon.c_type === "PERCENT"
                                        ? "할인율을 입력하세요 (%)"
                                        : "할인 금액을 입력하세요 (원)"
                                }
                                className="w-full p-2 mb-2 border rounded"
                                value={newCoupon.c_price || ""}
                                onChange={(e) =>
                                    setNewCoupon({
                                        ...newCoupon,
                                        c_price: e.target.value,
                                    })
                                }
                            />
                        )}

                        {/* 등록 및 닫기 버튼 */}
                        <div className="flex justify-end mt-5">
                            <button
                                onClick={handleCouponSubmit}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                등록
                            </button>
                            <button
                                onClick={handleModalClose}
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
