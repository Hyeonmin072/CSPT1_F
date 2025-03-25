import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DesignerInfo from "../../layout/DesignerInfo.jsx";
import DetailHeader from "./DetailHeader.jsx";
import ScrollDetail from "./ScrollDetail.jsx";
import h1 from "../../../assets/hairshop/h1.jpg";

export default function ShopDetail({ handleModalOpen }) {
    const navigate = useNavigate();

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        setScrollPosition(window.scrollY * -1); // 음수 값으로 변환
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY); // 스크롤에 따라 위치 업데이트
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleWheel = (event) => {
        setScrollPosition((prev) => Math.min(Math.max(prev - event.deltaY, -800), 0)); // 스크롤 한계 설정
    };

    useEffect(() => {
        document.body.style.overflow = "hidden"; // 모달 열 때 스크롤 방지
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="max-w-6xl mx-auto flex flex-row justify-center items-start px-20 gap-6"
             onWheel={handleWheel}>
            {/* 왼쪽: 가게 상세 정보 */}
            <div className="flex flex-col w-4/5 mb-0 bg-white">
                <DetailHeader />
                <div className="relative">
                    <img
                        src={h1}
                        alt="샵 사진"
                        className="w-[890px] h-[370px] rounded-lg"
                    />
                    <div className="relative w-full">
                        <ScrollDetail scrollPosition={scrollPosition} handleModalOpen={handleModalOpen} />
                    </div>
                </div>
            </div>

            {/* 오른쪽: 디자이너 정보 */}
            <div className="flex flex-row w-1/5">
                <DesignerInfo />
            </div>
        </div>
    );
}
