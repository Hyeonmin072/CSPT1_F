import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import HairShopDetailReview from "../../layout/HairShopDetailReview.jsx"
import DesignerInfo from "../../layout/DesignerInfo.jsx"
import DetailHeader from "./DetailHeader.jsx";
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
            {/* 왼쪽: 가게 상세 정보 */}
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

                </div>

                {/*쿠폰 받기 */}
                <GiveCoupon/>

                {/* 고객 리뷰 */}
                {activeTab === "ShopDetail" && (
                    <div className="mb-6">
                        <HairShopDetailReview/>
                    </div>
                )}
            </div>

            {/* 오른쪽: 디자이너 정보 */}
                <DesignerInfo/>
            </div>
        </div>
    );
}
