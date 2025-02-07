import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    MapPin,
    PhoneCall,
    Link,
    ArrowDownToLine,
    StarHalf,
    X
} from "lucide-react";

import HairShopDetailReview from "../../layout/HairShopDetailReview.jsx"
import DesignerInfo from "../../layout/DesignerInfo.jsx"
import DetailHeader from "./DetailHeader.jsx";
import GiveCoupon from "./CouponGive.jsx";
import DetailTab from "./DetailTab.jsx";

import reviewEX from "../../../assets/hairshop/reviewEX.jpg";
import h1 from "../../../assets/hairshop/h1.jpg";

export default function ShopDetail() {
    const [activeTab, setActiveTab] = useState("ShopDetail");
    const navigate = useNavigate();

    // 상세 정보 클릭시
    const handleShopDetailClick = () => {
        setActiveTab("ShopDetail");
    };
    // 예약하기 클릭시
    const handleReservationClick = () => {
        navigate("/designerselect");
    };
    // 리뷰 클릭시
    const handleReviewClick = () => {
        setActiveTab("Review");
        navigate("/reviews");
    };

    return (
        <div className="flex flex-col lg:flex-row mx-4 lg:mx-20 my-4 lg:my-0 gap-6">
            {/* 왼쪽: 가게 상세 정보 */}
            <div className="w-full lg:w-2/3 lg:flex lg:flex-col">
                <DetailHeader/>

                <div className="mb-4 flex items-center">
                    <DetailTab
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        handleShopDetailClick={handleShopDetailClick}
                        handleReservationClick={handleReservationClick}
                        handleReviewClick={handleReviewClick}
                    />
                </div>

                {/* 상세정보 */}
                <div className="mb-4">
                    <div className="flex items-center">
                        <MapPin className="w-5 h-5"/>
                        <h2 className="text-xl font-bold">프랜차이즈 2호선아지랑점</h2>
                    </div>
                    <p className="text-gray-500">장소: 서울 강남구 테헤란로</p>
                    <p className="text-gray-500">운영 시간: 10:00 - 21:00</p>
                </div>

                <div className="p-5 flex flex-wrap gap-6 lg:gap-20 mb-5 items-center justify-center">
                    <div className="flex flex-col items-center">
                        <StarHalf className="w-6 h-6"/>
                        <p className="mt-2">평점</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <MapPin className="w-6 h-6"/>
                        <p className="mt-2">위치</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <PhoneCall className="w-6 h-6"/>
                        <p className="mt-2">전화</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <Link className="w-6 h-6"/>
                        <p className="mt-2">공유</p>
                    </div>
                </div>

                {/*쿠폰 받기 */}
                <GiveCoupon/>

                {/* 고객 리뷰 */}
                {activeTab === "ShopDetail" && (
                    <div className="mb-6">
                        <h3
                            className="text-lg font-semibold mb-6 cursor-pointer"
                            onClick={handleReviewClick}
                        >
                            고객 리뷰 30 &gt;
                        </h3>
                        <div className="flex flex-col mb-6">
                            {/* 이미지들 */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Array.from({length: 6}, (_, index) => (
                                    <img
                                        key={index}
                                        src={reviewEX}
                                        alt={`리뷰 ${index + 1}`}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                ))}
                            </div>

                            {/* 구분선 */}
                            <div className="border-b border-gray-300 my-2"></div>
                        </div>
                        <HairShopDetailReview/>
                    </div>
                )}
            </div>

            {/* 오른쪽: 디자이너 정보 */}
            <div className="w-full lg:w-1/3 lg:h-auto lg:sticky lg:top-4">
                <DesignerInfo/>
            </div>
        </div>
    );
}
