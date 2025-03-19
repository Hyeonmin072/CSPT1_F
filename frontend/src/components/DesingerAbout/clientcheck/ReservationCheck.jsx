import { motion } from "framer-motion";
import { CalendarDays, List } from 'lucide-react';
import { dummyProfile } from "../sales/SaleStaus.jsx";
import { useState, useEffect } from "react";

export default function ReservationCheck({ selectedView, setSelectedView }){
    const [Designerprofile, setDesignerProfile] = useState(null); // 초기값 null

    // useEffect로 더미 데이터를 불러오는 코드
    useEffect(() => {
        // 더미 데이터 불러오기
        const fetchDummyData = async () => {
            try {
                // 더미 데이터를 비동기로 불러오는 시뮬레이션
                const data = dummyProfile;
                setDesignerProfile(data); // 데이터 업데이트
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchDummyData();
    }, []);

    return (
        <div className="flex space-x-3">
            {/* 내 예약 보기 / 모든 예약 보기 */}
            <div className="border bg-white rounded-lg flex flex-row items-center relative">
                <motion.div
                    className="absolute top-0 bottom-0 left-0 w-1/2 bg-gray-300 rounded-lg"
                    animate={{x: selectedView === "my" ? "0%" : "100%"}}
                    transition={{type: "spring", stiffness: 100, damping: 20}}
                />
                <button
                    className={`z-10 p-2 flex flex-row text-gray-700`}
                    onClick={() => setSelectedView("my")}
                >
                    <CalendarDays className="mx-1"/>
                    <p>내 예약 보기</p>
                </button>
                <button
                    className={`z-10 p-2 flex flex-row text-gray-700`}
                    onClick={() => setSelectedView("all")}
                >
                    <List className="mx-1"/>
                    <p>모든 예약 보기</p>
                </button>
            </div>

            <div className="flex flex-row w-[170px] ml-auto">
                <div className="rounded-full bg-gray-300 w-12 h-12">
                    {Designerprofile && Designerprofile.imageURL ? (
                        <img
                            src={Designerprofile.imageURL}
                            className="w-12 h-12 rounded-full mb-4"
                        />
                    ) : (
                        <div
                            className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                            {/* 기본 이미지 */}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center px-4">
                    <p className="text-gray-700 font-semibold">{Designerprofile?.name || "디자이너 이름"}</p>
                </div>
            </div>

        </div>
    );
}