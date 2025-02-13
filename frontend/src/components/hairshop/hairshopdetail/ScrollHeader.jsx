import DetailTab from "./DetailTab.jsx";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ScrollHeader(){
    const [activeTab, setActiveTab] = useState("ShopDetail");
    const navigate = useNavigate();
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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

    return(
        <>
            {/* 헤더: 스크롤되다가 -370에서 멈춤 */}
            <div
                className="left-0 right-0 duration-500 pt-5 z-50 rounded-lg bg-white"
                style={{
                    position: "absolute",
                    top: `${Math.min(Math.max(scrollPosition, -370), -60)}px`, // -370에서 멈추도록
                    transition: "top 0.5s ease-in-out",
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

        </>
    )
}