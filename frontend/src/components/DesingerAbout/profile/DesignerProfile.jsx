import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ProfileHeader from "./ProfileHeader.jsx";
import LeftSection from "./LeftSection.jsx";
import MiddleSection from "./MiddleSection.jsx";
import RightSection from "./RightSection.jsx";

import { Heart, MessageSquareText, Mail, Phone, Cake, User, UserRound } from "lucide-react";

export default function DesignerProfile() {
    return (
        <div className="max-w-6xl mx-auto p-10">
            {/* Header */}
            <div className="bg-white w-full h-[380px] relative border-b-2">
                <ProfileHeader/>
            </div>

            <div className="grid grid-cols-12 gap-4 mt-10">
                {/* 왼쪽 사이드: 소개 및 버튼 */}
                <div className="col-span-3 bg-white p-4 rounded-lg">
                    <LeftSection/>
                </div>
                {/* 중앙: 리뷰 섹션 */}
                <div className="col-span-6 bg-white p-4 rounded-lg h-full">
                    <MiddleSection
                        />
                </div>
                {/* 오른쪽 사이드: 디자이너 정보 */}
                <div className="col-span-3 p-6 rounded-lg bg-gray-100 max-h-[390px]">
                    <RightSection />
                </div>
            </div>
        </div>
    );
}
