import { useState } from "react";
import HairShopDetailReview from "../../layout/HairShopDetailReview.jsx";
import DetailIcon from "./DetailIcon.jsx";
import ReviewImg from "./DetailReviewimg.jsx";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DetailTab from "./DetailTab.jsx";

export default function ScrollDetail({ handleModalOpen, scrollPosition, setScrollPosition }) {
    // 상수 정의
    const headerInitial = -60;                   // 컨테이너 내 Header의 시작 오프셋
    const headerFixedThreshold = -370;           // 스크롤이 이 값 이하가 되면 Header 고정
    const headerHeight = Math.abs(headerFixedThreshold - headerInitial);
    const detailTranslate = Math.max(Math.min(scrollPosition + 370, 0), -430);


    const [activeTab, setActiveTab] = useState("ShopDetail");
    const navigate = useNavigate();

    // 탭 클릭 핸들러
    const handleShopDetailClick = () => setActiveTab("ShopDetail");
    const handleReservationClick = () => navigate("/designerselect");
    const handleReviewClick = () => {
        setActiveTab("Review");
        navigate("/reviews");
    };

    // 스크롤 전: scrollPosition > -370
    if (scrollPosition > headerFixedThreshold) {
        return (
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    transform: `translateY(${scrollPosition}px)`,
                    transition: "transform 0.3s ease-in-out",
                }}
            >
                {/* Header: 컨테이너 내부에서 고정된 오프셋(-60px) */}
                <div style={{ position: "absolute", top: `${headerInitial}px`, width: "100%" }}>
                    <div className="bg-white p-5 rounded-lg">
                        <DetailTab
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            handleShopDetailClick={handleShopDetailClick}
                            handleReservationClick={handleReservationClick}
                            handleReviewClick={handleReviewClick}
                        />
                    </div>
                </div>

                {/* Detail: Header 바로 아래에 위치 */}
                <div className="duration-500 bg-white p-10 rounded-lg">
                    <div className="px-3">
                        <div className="mb-4">
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5" />
                                <h2 className="text-xl font-bold">프랜차이즈 2호선아지랑점</h2>
                            </div>
                            <p className="text-gray-500">장소: 서울 강남구 테헤란로</p>
                            <p className="text-gray-500">운영 시간: 10:00 - 21:00</p>
                        </div>

                        <div>
                            <DetailIcon />
                        </div>

                        <div className="mb-4 flex flex-col justify-center items-center w-full">
                            <button
                                className="bg-[#03DAC5] text-black px-6 py-3 rounded-lg flex items-center gap-2"
                                onClick={handleModalOpen}
                            >
                                최대 8,500원 할인 쿠폰 받기
                            </button>
                        </div>

                        <div className="mb-6">
                            <ReviewImg />
                            <HairShopDetailReview />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    // 스크롤 후: scrollPosition ≤ -370
    else {
        return (
            <>
                {/* 고정된 Header: 항상 -370px에 고정 */}
                <div
                    style={{
                        position: "fixed",
                        top: `-380px`,
                        width: "100%",
                        zIndex: 50
                }}
                    >
                    <div className="bg-white p-5 rounded-lg">
                        <DetailTab
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            handleShopDetailClick={handleShopDetailClick}
                            handleReservationClick={handleReservationClick}
                            handleReviewClick={handleReviewClick}
                        />
                    </div>
                </div>

                {/* Detail 컨텐츠: Header 아래에서 추가 스크롤 적용 */}
                <div
                    className="duration-500 bg-white p-5 rounded-lg"
                    style={{
                        top: `-370px`,
                        transform: `translateY(${detailTranslate}px)`,
                        transition: "transform 0.3s ease-in-out",
                    }}
                >
                    <div className="px-3">
                        <div className="mb-4">
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5" />
                                <h2 className="text-xl font-bold">프랜차이즈 2호선아지랑점</h2>
                            </div>
                            <p className="text-gray-500">장소: 서울 강남구 테헤란로</p>
                            <p className="text-gray-500">운영 시간: 10:00 - 21:00</p>
                        </div>

                        <div>
                            <DetailIcon />
                        </div>

                        <div className="mb-4 flex flex-col justify-center items-center w-full">
                            <button
                                className="bg-[#03DAC5] text-black px-6 py-3 rounded-lg flex items-center gap-2"
                                onClick={handleModalOpen}
                            >
                                최대 8,500원 할인 쿠폰 받기
                            </button>
                        </div>

                        <div className="mb-6">
                            <ReviewImg />
                            <HairShopDetailReview />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
