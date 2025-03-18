import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChartSpline, Bell, NotebookText, ChevronRight, Check, Star } from 'lucide-react';

import Notice from "./Notice.jsx";
import ProfileQuick from "./ProfileQuick.jsx";
import ChartQuick from "./ChartQuick.jsx";
import ScheduleQuick from "./ScheduleQuick.jsx";

export default function DesignerMain() {
    const navigate = useNavigate();

    // 임시 리스트들
    const scheduleData = [
        { time: "09:00", customer: "Chelest Prodile", service: "레이어드 펌", designer: "김혜란 디자이너"},
        { time: "10:00", customer: "김 민희", service: "에그 컷", designer: "황정현 디자이너" },
        { time: "14:05", customer: "김 머핀", service: "복구 염색", designer: "송주현 디자이너" },
        { time: "17:00", customer: "김 블랙", service: "여성 컷 + 앞머리 펌", designer: "성해정 디자이너" },
        { time: "21:00", customer: "김 블랙", service: "여성 컷 + 앞머리 펌", designer: "성해정 디자이너" },
        { time: "22:00", customer: "김 블랙", service: "여성 컷 + 앞머리 펌", designer: "성해정 디자이너" },
        { time: "23:00", customer: "김 블랙", service: "여성 컷 + 앞머리 펌", designer: "성해정 디자이너" },
    ];

    const Designerprofile = [
        { id: 1, imageURL: null, name: "김예원", roll: "헤어디자이너", phone: "010-1234-5678" },
    ];

    const handleProfile = () => navigate("/profile");
    const handleChart = () => navigate("/sales");

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // 1분마다 현재 시간을 업데이트합니다.
        return () => clearInterval(timer);
    }, []);


    return (
        <div className="mx-auto max-w-7xl flex flex-row">
            <div className="flex items-center justify-center w-[1000px] pt-10 mt-5">
                <Notice/>
            </div>

            <div className="pt-10 flex flex-col items-center justify-center w-[300px] mt-5">
                <div className="border p-5 mb-5 rounded-lg shadow-md">
                    <ProfileQuick Designerprofile={Designerprofile} handleProfile={handleProfile}/>
                </div>
                <div className="border p-5 mb-5 rounded-lg shadow-md">
                    <ChartQuick handleChart={handleChart}/>
                </div>
                <div className="border p-5 rounded-lg shadow-md w-full">
                    <ScheduleQuick scheduleData={scheduleData}/>
                </div>
            </div>
        </div>
    );
}
