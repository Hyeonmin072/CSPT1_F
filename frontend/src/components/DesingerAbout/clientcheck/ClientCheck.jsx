import { useState, useEffect, useRef } from "react";
import { format, addDays, subDays } from "date-fns"; // 날짜를 다루는 JS 라이브러리
import { ko } from "date-fns/locale"; // 날짜를 주어진 포맷 문자열에 맞춰 형식화하는 함수

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

    return (
        <div className="p-10 mx-auto max-w-7xl">
            {/* 날짜, 스케줄 보기, 일주일(오늘), 디자이너 간단 이름 */}
            <div className="flex mb-10">
                <div className="relative max-w-md px-5">
                    <ClientScheduleDate
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                </div>

                {/* 내 예약 보기 / 모든 예약 보기 */}
                <div className="ml-auto flex flex-row mx-10">
                    <ReservationCheck
                        selectedView={selectedView}
                        setSelectedView={setSelectedView}
                    />
                </div>
            </div>

            {/* 예약 스케줄 표시 */}
            <div className="p-4 w-full">
                <div
                    className="flex overflow-x-auto border rounded cursor-grab"
                    ref={scrollContainerRef}
                >
                    {/* 시간대 열 */}
                    <>
                        <ClientClock />
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