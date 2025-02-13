import { MapPin, X } from "lucide-react";
import React, {useRef, useState} from "react";

import HairShopDetailReview from "../../layout/HairShopDetailReview.jsx";
import DetailIcon from "./DetailIcon.jsx";
import ReviewImg from "./DetailReviewimg.jsx";

export default function ScrollDetail({handleModalOpen}){
    const [activeTab, setActiveTab] = useState("ShopDetail");
    const handleWheel = (event) => {
        setScrollPosition(prev => prev - event.deltaY);
    };

    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollContainerRef = useRef(null);

    return(
        <>
            {/* 상세 내용이 헤더 아래에서 시작되도록 패딩 추가 */}
            <div
                onWheel={handleWheel}
                ref={scrollContainerRef}
                className="relative w-full duration-500"
                style={{
                    transform: `translateY(${Math.min(Math.max(scrollPosition, -800), 0)}px)`,
                }}
            >
                <div className="absolute bg-white rounded-lg relative pt-10">
                    {/* 컨텐츠 영역 */}
                    <div className="px-3">
                        {/* 상세정보 */}
                        <div
                            className="mb-4">
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5"/>
                                <h2 className="text-xl font-bold">프랜차이즈 2호선아지랑점</h2>
                            </div>
                            <p className="text-gray-500">장소: 서울 강남구 테헤란로</p>
                            <p className="text-gray-500">운영 시간: 10:00 - 21:00</p>
                        </div>

                        {/* 추가 아이콘, 쿠폰 받기, 고객 리뷰 등 */}
                        <div>
                            <DetailIcon/>
                        </div>

                        <div className="mb-4 flex flex-col justify-center items-center w-full">
                            <button
                                className="bg-[#03DAC5] text-black px-6 py-3 rounded-lg flex items-center gap-2"
                                onClick={handleModalOpen}
                            >
                                최대 8,500원 할인 쿠폰 받기
                            </button>
                        </div>

                        {activeTab === "ShopDetail" && (
                            <div className="mb-6">
                                <ReviewImg/>
                                <HairShopDetailReview/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}