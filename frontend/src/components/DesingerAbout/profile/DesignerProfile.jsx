import h1 from "../../../assets/hairshop/h1.jpg";
import designerEX from "../../../assets/hairshop/designerEX.jpg";
import RW from "../../../assets/reviews/RW.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatDistanceToNow } from "date-fns"; // 날짜 계산용 라이브러리
import { ko } from "date-fns/locale"; // 한국어 로컬 설정

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ProfileHeader from "./ProfileHeader.jsx";
import LeftSection from "./LeftSection.jsx";
import MiddleSection from "./MiddleSection.jsx";
import RightSection from "./RightSection.jsx";

import { Heart, MessageSquareText, Mail, Phone, Cake, User, UserRound } from "lucide-react";

const profile = [
    {
        id: 1,
        image: designerEX,
        name: "홍길동",
        place: "김봉팔 헤어샵",
        like: 372,
        introduce: "20년 경력의 남성 헤어 디자이너입니다. 최고의 스타일을 만들어 드립니다!",
    },
    {
        id: 2,
        image: designerEX,
        name: "김민수",
        place: "서울 명동 헤어샵",
        like: 215,
        introduce: "정성스럽고 디테일한 헤어 스타일링을 약속드립니다!",
    },
];

export default function DesignerProfile() {
    const navigate = useNavigate();

    const currentProfileId = 1; // 보여주고 싶은 디자이너의 id

    // id로 현재 보여줄 프로필 찾기
    const designer = profile.find((p) => p.id === currentProfileId);
    
    // 중앙 섹션 관련 슬라이더, 더미 리뷰글
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };


    function NextArrow(props) {
        const { onClick } = props;
        return (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
                <button className="p-2 rounded">〉</button>
            </div>
        );
    }

    function PrevArrow(props) {
        const { onClick } = props;
        return (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer" onClick={onClick}>
                <button className="p-2 rounded">〈</button>
            </div>
        );
    }

    const dummyReviews = [
        {
            id: 1,
            name: "문지훈",
            rating: 5,
            comment: "정말 최고의 디자이너예요!",
            date: new Date(2025, 2, 10), // 리뷰 작성 날짜
        },
        {
            id: 2,
            name: "김민수",
            rating: 4,
            comment: "서비스도 훌륭하고 만족했습니다.",
            date: new Date(2025, 2, 12), // 리뷰 작성 날짜
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-10">
            {/* Header */}
            <div className="bg-white w-full h-[380px] relative border-b-2">
                <ProfileHeader
                designer={designer}/>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-10">
                {/* 왼쪽 사이드: 소개 및 버튼 */}
                <div className="col-span-3 bg-white p-4 rounded-lg">
                    <LeftSection
                    designer={designer}/>
                </div>
                {/* 중앙: 리뷰 섹션 */}
                <div className="col-span-6 bg-white p-4 rounded-lg h-full">
                    <MiddleSection
                        sliderSettings={sliderSettings}
                        dummyReviews={dummyReviews}
                        />
                </div>
                {/* 오른쪽 사이드: 디자이너 정보 */}
                <div className="col-span-3 p-6 rounded-lg bg-gray-100 h-full">
                    <RightSection />
                </div>
            </div>
        </div>
    );
}
