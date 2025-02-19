import { useState, useEffect, useRef } from "react";
import HairShopDetailReview from "../../layout/HairShopDetailReview.jsx";
import DetailIcon from "./DetailIcon.jsx";
import ReviewImg from "./DetailReviewimg.jsx";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DetailTab from "./DetailTab.jsx";

export default function ScrollDetail({ handleModalOpen, scrollPosition, setScrollPosition }) {
    // 상수 정의
    const headerInitial = -60;
    const headerFixedThreshold = -400;
    const detailTranslate = Math.max(Math.min(scrollPosition + 300, 1), -480);
    const containerRef = useRef(null);
    const headerRef = useRef(null);

    const [activeTab, setActiveTab] = useState("ShopDetail");
    const navigate = useNavigate();

    useEffect(() => {
        const smoothScroll = (element, to, duration) => {
            const start = element.scrollTop;
            const change = to - start;
            let currentTime = 0;
            const increment = 20;
            const animateScroll = function(){
                currentTime += increment;
                const val = Math.easeInOutQuad(currentTime, start, change, duration);
                element.scrollTop = val;
                if (currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            };
            animateScroll();
        };

        Math.easeInOutQuad = (t, b, c, d) => {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };

        const handleScroll = (event) => {
            const header = headerRef.current;
            if (header && scrollPosition > headerFixedThreshold) {
                smoothScroll(header, headerInitial, 500);
                event.preventDefault();
            }
        };

        if (containerRef.current) {
            containerRef.current.addEventListener('wheel', handleScroll);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('wheel', handleScroll);
            }
        };
    }, [scrollPosition]);

    // 탭 클릭 핸들러
    const handleShopDetailClick = () => setActiveTab("ShopDetail");
    const handleReservationClick = () => navigate("/designerselect");
    const handleReviewClick = () => navigate("/reviews");

    const headerStyle = {
        position: scrollPosition > headerFixedThreshold ? "fixed" : "absolute",
        top: scrollPosition > headerFixedThreshold ? "140px" : `-380px`,
        width: "100%",
        zIndex: 50,
    };

    return (
        <>
            {scrollPosition > headerFixedThreshold ? (
                <div
                    className="duration-500"
                    style={{
                        position: "relative",
                        width: "100%",
                        transform: `translateY(${scrollPosition}px)`,
                        zIndex: 10,
                    }}
                    ref={containerRef}
                >
                    {/* Header: 컨테이너 내부에서 고정된 오프셋(-60px) */}
                    <div
                        style={{
                            position: "absolute",
                            top: `${headerInitial}px`,
                            width: "100%",
                        }}
                    >
                        <div className="bg-white p-5 rounded-lg" ref={headerRef}>
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
                    <div className="bg-white p-10 rounded-lg">
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
                                    onClick={() => {
                                        console.log("쿠폰 받기 클릭확인");
                                        handleModalOpen();
                                    }}
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
            ) : (
                <>
                    {/* 고정된 Header */}
                    <div style={headerStyle}>
                        <div className="bg-white p-5 rounded-lg" ref={headerRef}>
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
                        className="duration-300 bg-white p-10 rounded-lg"
                        style={{
                            position: 'relative',
                            top: `-230px`,
                            transform: `translateY(${detailTranslate}px)`,
                            zIndex: 10,
                        }}
                        ref={containerRef}
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
                                    className="bg-[#03DAC5] text-black px-6 py-3 rounded-lg flex items.center gap-2"
                                    onClick={() => {
                                        console.log("쿠폰 받기 클릭확인");
                                        handleModalOpen();
                                    }}
                                >
                                    최대 8,500원 할인 쿠폰 받기
                                </button>
                            </div>

                            <div className="mb-6">
                                <ReviewImg handleReviewClick={handleReviewClick} />
                                <HairShopDetailReview />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
