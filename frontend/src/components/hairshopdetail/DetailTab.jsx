import React, {useState} from "react";
import h1 from "../../assets/hairshop/h1.jpg";
import { useNavigate } from "react-router-dom";

export default function DetailTab({ activeTab, handleShopDetailClick, handleReservationClick, handleReviewClick }){
    return (
        <div className="mb-4 flex flex-col gap-4">
            {/* 이미지 */}
            <img
                src={h1}
                alt="샵 사진"
                className="w-[800px] h-[400px] rounded-lg"
            />

            {/* 버튼 그룹 + 예약하기 버튼 */}
            <div className="flex gap-4 items-center">
                <div className="flex gap-4">
                    <button
                        onClick={handleShopDetailClick}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === "ShopDetail" ? "bg-[#03DAC5] text-black" : "bg-white-200"
                        }`}
                    >
                        상세정보
                    </button>
                    <button
                        onClick={handleReviewClick}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === "Review" ? "bg-[#03DAC5] text-white" : "bg-white-200"
                        }`}
                    >
                        리뷰
                    </button>
                </div>

                {/* 예약하기 버튼 (오른쪽으로 이동) */}
                <button
                    className="bg-[#03DAC5] text-white px-4 py-2 rounded-lg ml-auto"
                    onClick={handleReservationClick}
                >
                    예약하기
                </button>
            </div>
        </div>
    )
}