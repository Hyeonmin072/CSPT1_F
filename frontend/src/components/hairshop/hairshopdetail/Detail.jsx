import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, X } from "lucide-react";

import HairShopDetailReview from "../../layout/HairShopDetailReview.jsx";
import DesignerInfo from "../../layout/DesignerInfo.jsx";
import DetailHeader from "./DetailHeader.jsx";
import DetailTab from "./DetailTab.jsx";
import ReviewImg from "./DetailReviewimg.jsx";
import DetailIcon from "./DetailIcon.jsx";

import reviewEX from "../../../assets/hairshop/reviewEX.jpg";
import h1 from "../../../assets/hairshop/h1.jpg";

export default function ShopDetail() {
    const [activeTab, setActiveTab] = useState("ShopDetail");
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0); // 상태 값 추가
    const scrollContainerRef = useRef(null);

    const [selectedCoupons, setSelectedCoupons] = useState([]);
    const [coupons] = useState([
        { id: 1, name: "8,500원 할인 쿠폰", description: "5만원 이상 지출 시 사용가능", value: "8500" },
        { id: 2, name: "5,000원 할인 쿠폰", description: "2만원 이상 지출 시 사용가능", value: "5000" },
        { id: 3, name: "2,000원 할인 쿠폰", description: "1만원 이상 지출 시 사용가능", value: "2000" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleCouponSelect = (coupon) => {
        setSelectedCoupons((prevCoupons) => {
            return prevCoupons.some((c) => c.id === coupon.id) ? prevCoupons : [...prevCoupons, coupon];
        });
    };


    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleWheel = (event) => {
        setScrollPosition(prev => prev - event.deltaY);
    };

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
        <div className="flex flex-col md:flex-row px-20 gap-6">
            {/* 왼쪽: 가게 상세 정보 */}
            <div className="flex flex-col px-10 w-3/4 mb-0 z-40">
                <DetailHeader/>

                {/* 이미지 */}
                <div className="relative z-40"> {/* position: relative 추가 */}
                    <img
                        src={h1}
                        alt="샵 사진"
                        className="w-[890px] h-[370px] rounded-lg"
                    />


                    <div className="relative w-full">
                        {/* 헤더: 스크롤되다가 -370에서 멈춤 */}
                        <div
                            className="left-0 right-0 duration-500 pt-5 bg-white z-50"
                            style={{
                                position: "absolute",
                                top: `${Math.min(Math.max(scrollPosition, -370), -30)}px`,
                                padding: "15px 20px",
                            }}
                        >
                            <DetailTab
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                handleShopDetailClick={handleShopDetailClick}
                                handleReservationClick={handleReservationClick}
                                handleReviewClick={handleReviewClick}
                            />
                        </div>

                        {/* 상세 내용이 헤더 아래에서 시작되도록 패딩 추가 */}
                        <div
                            onWheel={handleWheel}
                            ref={scrollContainerRef}
                            className="relative w-full duration-500"
                            style={{
                                transform: `translateY(${Math.min(Math.max(scrollPosition + 70, -800), 90)}px)`, // 최소 -800px까지 스크롤 가능
                            }}
                        >
                            <div className="absolute bg-white rounded-lg relative pt-5">
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


                    </div>


                </div>


                {isModalOpen && (
                    <div className="flex z-50 fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-700 items-center justify-center">
                        <div className="bg-white p-10 rounded-lg text-center relative w-[600px] h-[600px] z-60">
                            <button
                                onClick={handleModalClose}
                                className="absolute top-3 right-5 text-gray-500"
                            >
                                <X />
                            </button>

                            <h2 className="text-2xl font-bold pb-4">쿠폰 한 번에 보기</h2>

                            <div className="flex-col mt-4 p-5 flex justify-center items-center mx-auto">
                                {coupons.map((coupon) => (
                                    <div
                                        className="border p-10 mb-4"
                                        key={coupon.id}
                                        onClick={() => handleCouponSelect(coupon)} // 중괄호 하나로 수정
                                    >
                                        <h3 className="font-bold">{coupon.name}</h3>
                                        <p>{coupon.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}


            </div>

            {/* 오른쪽: 디자이너 정보 */}
            <div className="flex flex-col w-2/5 min-h-screen top-4">
                <DesignerInfo/>
            </div>



        </div>
    );
}
