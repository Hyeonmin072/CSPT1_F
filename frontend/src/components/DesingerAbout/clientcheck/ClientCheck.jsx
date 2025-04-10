import { useState, useEffect, useRef } from "react";
import { format, addDays, subDays } from "date-fns"; // 날짜를 다루는 JS 라이브러리
import { ko } from "date-fns/locale"; // 날짜를 주어진 포맷 문자열에 맞춰 형식화하는 함수

import { dummyProfile } from "../sales/SaleStaus.jsx";

import ClientScheduleDate from "./ClientScheduleDate.jsx";
import ReservationCheck from "./ReservationCheck.jsx";
import ClientClock from "./ClientClock.jsx";
import DesignerSchedule from "./DesignerSchedule.jsx";
import ClientCheckModal from "../../modal/clientcheck/ClientCheckModal.jsx";

export default function Clientcheck({ onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    // 가로 횡 스크롤
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
            isDown = true;
            container.classList.add("cursor-grabbing");
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        };

        const handleMouseUp = () => {
            isDown = false;
            container.classList.remove("cursor-grabbing");
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // 스크롤 속도
            container.scrollLeft = scrollLeft - walk;
        };

        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mouseleave", handleMouseUp);
        container.addEventListener("mouseup", handleMouseUp);
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mouseleave", handleMouseUp);
            container.removeEventListener("mouseup", handleMouseUp);
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);
    

    // 디자이너 스케줄 관련
    const [selectedView, setSelectedView] = useState("all");
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    const isTimePassed = (appointmentTime) => {
        const currentTime = new Date();
        const [hour, minute] = appointmentTime.split(":").map(Number);
        const appointmentDate = new Date();
        appointmentDate.setHours(hour, minute, 0, 0);

        return currentTime > appointmentDate;
    };

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
        <div className="p-10 mx-auto max-w-7xl">
            {/* 날짜, 스케줄 보기, 일주일(오늘), 디자이너 간단 이름 */}
            <div className="flex mb-5">
                <div className="flex flex-row w-[170px] ml-auto border rounded-lg px-2 py-2">
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

            {/* 예약 스케줄 표시 */}
            <div className=" w-full">
                <div
                    className="flex overflow-x-auto border rounded cursor-grab"
                    ref={scrollContainerRef}
                >
                    {/* 시간대 열 */}
                    <>
                        <ClientClock/>
                    </>

                    {/* 디자이너와 스케줄 영역 */}
                    <>
                        <DesignerSchedule
                            setModalData={setModalData}
                            setIsModalOpen={setIsModalOpen}
                            selectedView={selectedView}
                            selectedDate={selectedDate}
                        />
                    </>

                    {/* 모달 컴포넌트 */}
                    <ClientCheckModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        modalData={modalData}
                    />
                </div>
            </div>
        </div>

    );
};