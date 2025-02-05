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

import HairShopDetailReview from "../../layout/HairShopDetailReview"
import DesignerInfo from "../../layout/DesignerInfo"
import ShopHeader from "./DetailHeader";
import reviewEX from "../../../assets/hairshop/reviewEX.jpg";
import h1 from "../../../assets/hairshop/h1.jpg";

export default function ShopDetail() {
    const [activeTab, setActiveTab] = useState("ShopDetail");
    const navigate = useNavigate();
    const [selectedCoupons, setSelectedCoupons] = useState([]);
    const [coupons] = useState([
        {id: 1, name: "8,500원 할인 쿠폰", description: "5만원 이상 지출 시 사용가능", value: "8500"},
        {id: 2, name: "5,000원 할인 쿠폰", description: "2만원 이상 지출 시 사용가능", value: "5000"},
        {id: 3, name: "2,000원 할인 쿠폰", description: "1만원 이상 지출 시 사용가능", value: "2000"},
    ]);

    // 내 쿠폰함 보기 클릭시
    const handleCouponClick = () => {
        navigate("/Coupon");
    };

    // 쿠폰 모달 열림&닫힘
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => {
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    // 쿠폰 클릭시 반응
    const handleCouponSelect = (coupon) => {
        setSelectedCoupons((prevCoupons) => {
            return prevCoupons.some((c) => c.id === coupon.id) ? prevCoupons : [...prevCoupons, coupon];
        });
    };


    // 상세 정보 클릭시
    const handleShopDetailClick = () => {
        setActiveTab("ShopDetail");
    };
    // 예약하기 클릭시
    const handleReservationClick = () => {
        navigate("/reservation");
    };
    // 리뷰 클릭시
    const handleReviewClick = () => {
        setActiveTab("Review");
        navigate("/reviews");
    };



    return (
        <div className="flex m-10 p-10 gap-6">
            {/* 왼쪽: 가게 상세 정보 */}
            <div className="w-full md:w-2/3">
                <ShopHeader/>

                <div className="mb-4 flex flex-col gap-4 items-center">

                    <div className="mb-4 flex flex-col gap-4">
                        {/* 이미지 */}
                        <img
                            src={h1}
                            alt="샵 사진"
                            className="w-full h-auto rounded-lg"
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

                <div className="p-5 flex gap-20 mb-5 items-center justify-center">
                    <div>
                        <StarHalf/><p className="mt-5">평점</p>
                    </div>
                    <div>
                        <MapPin/><p className="mt-5">위치</p>
                    </div>
                    <div>
                        <PhoneCall/><p className="mt-5">전화</p>
                    </div>
                    <div>
                        <Link/><p className="mt-5">공유</p>
                    </div>
                </div>


                {/*쿠폰 받기 */}
                <div className="mb-4 flex flex-col justify-center items-center w-full">
                    <button className="bg-[#03DAC5] text-black px-6 py-3 rounded-lg flex items-center gap-2"
                            onClick={handleModalOpen}
                    >
                        <ArrowDownToLine/>
                        최대 8,500원 할인 쿠폰 받기
                    </button>
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center relative">
                            <button
                                onClick={handleModalClose}
                                className="absolute top-2 right-2 text-gray-500"
                            >
                                <X />
                            </button>

                            <div className="flex justify-center mb-4">
                              <span role="img" aria-label="coupon" className="text-4xl">
                                💰
                              </span>
                            </div>

                            <h2 className="text-2xl font-bold">쿠폰을 선택해주세요</h2>

                            {/* 쿠폰 목록 */}
                            <div className="mt-4">
                                {coupons.map((coupon) => (
                                    <div
                                        key={coupon.id}
                                        onClick={() => handleCouponSelect(coupon)}
                                        className={`p-4 mb-2 border rounded-lg cursor-pointer
                                            ${selectedCoupons.some((c) => c.id === coupon.id)
                                            ? 'bg-[#03DAC5] text-white'
                                            : 'bg-white text-black'
                                        }`}

                                    >
                                        <h3 className="font-bold">{coupon.name}</h3>
                                        <p>{coupon.description}</p>
                                    </div>

                                ))}
                            </div>

                            <button
                                onClick={handleCouponClick}
                                className="mt-4 bg-[#03DAC5] text-white px-4 py-2 rounded-lg"
                                disabled={selectedCoupons.length === 0} // selectedCoupons의 존재 확인
                            >
                                내 쿠폰함 보기
                            </button>
                        </div>
                    </div>
                )}

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
                            <div className="grid grid-cols-4 gap-4">
                                <img
                                    src={reviewEX}
                                    alt="리뷰 1"
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <img
                                    src={reviewEX}
                                    alt="리뷰 2"
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <img
                                    src={reviewEX}
                                    alt="리뷰 3"
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <img
                                    src={reviewEX}
                                    alt="리뷰 4"
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <img
                                    src={reviewEX}
                                    alt="리뷰 5"
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <img
                                    src={reviewEX}
                                    alt="리뷰 6"
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            </div>

                            {/* 구분선 */}
                            <div className="border-b border-gray-300 my-2"></div>
                        </div>
                        <HairShopDetailReview />
                    </div>
                )}
            </div>

            {/* 오른쪽: 디자이너 정보 */}
            <DesignerInfo />
        </div>
    );
}
