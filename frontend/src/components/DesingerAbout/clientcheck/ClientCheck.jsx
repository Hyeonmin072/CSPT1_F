import { useState, useEffect, useRef } from "react";
import { format, addDays, subDays } from "date-fns"; // 날짜를 다루는 JS 라이브러리
import { ko } from "date-fns/locale"; // 날짜를 주어진 포맷 문자열에 맞춰 형식화하는 함수

import ClientScheduleDate from "./ClientScheduleDate.jsx";
import ReservationCheck from "./ReservationCheck.jsx";
import ClientClock from "./ClientClock.jsx";
import DesignerSchedule from "./DesignerSchedule.jsx";
import ClientCheckModal from "../../modal/clientcheck/ClientCheckModal.jsx";

export default function Clientcheck({ Designerprofile, onClose }) {
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
    const [selectedSchedule, setSelectedSchedule] = useState("today");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [clickCount, setClickCount] = useState(0);

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



    // 디자이너 이름을 ㄱ,ㄴ,ㄷ 순으로 정렬하는 함수
    const sortDesigners = (designers) => {
        return designers.sort((a, b) => {
            return a.name.localeCompare(b.name, 'ko-KR');
        });
    };

    // 본인을 맨 앞에 배치하고 나머지 디자이너들을 정렬하는 함수
    const sortWithSelfFirst = (designers, selfName) => {
        const sortedDesigners = sortDesigners(designers);
        const selfIndex = sortedDesigners.findIndex(designer => designer.name === selfName);
        if (selfIndex !== -1) {
            const [self] = sortedDesigners.splice(selfIndex, 1);
            sortedDesigners.unshift(self);
        }
        return sortedDesigners;
    };

    const selfName = Designerprofile && Designerprofile[0] && Designerprofile[0].name ? Designerprofile[0].name : '';

    const designers = sortWithSelfFirst([
        {
            name: "김혜린 디자이너",
            schedule: [
                { time: "13:00", client: "김수진 고객님", menu: "[EVENT]르블라썸 복구 매직", status: "완료", day: "월", date: "2025-03-10", cash: "17,000원" },
                { time: "15:00", client: "황의정 고객님", menu: "앞머리 컷", status: "완료", day: "화", date: "2025-03-11", cash: "17,000원" },
                { time: "20:00", client: "최희정 고객님", menu: "아윤채 모발 클리닉", status: "미완료", day: "수", date: "2025-03-12", cash: "17,000원" },
                { time: "22:00", client: "김나윤 고객님", menu: "프리미엄염색", status: "미완료", day: "목", date: "2025-03-13", cash: "17,000원" },
            ],
        },
        {
            name: "황새롬 디자이너",
            schedule: [
                { time: "10:00", client: "한세진 고객님", menu: "샴푸 + 드라이", status: "완료", day: "금", date: "2025-03-14", cash: "17,000원" },
            ],
        },
        {
            name: "박재완 디자이너",
            schedule: [
                { time: "08:00", client: "Cameron 고객님", menu: "샴푸 + 드라이", status: "완료", day: "월", date: "2025-03-10", cash: "17,000원" },
                { time: "11:00", client: "한세진 고객님", menu: "[시그니처]CS컬 드라이 펌", status: "완료", day: "화", date: "2025-03-11", cash: "17,000원" },
                { time: "13:00", client: "사연진 고객님", menu: "볼륨 매직", status: "완료", day: "수", date: "2025-03-12", cash: "17,000원" },
            ],
        },
        {
            name: "Emmy Massey 디자이너",
            schedule: [
                { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "목", date: "2025-03-13", cash: "17,000원" },
            ],
        },
        {
            name: "김민재 디자이너",
            schedule: [
                { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "금", date: "2025-03-14" , cash: "17,000원"},
            ],
        },
        {
            name: "김민아 디자이너",
            schedule: [
                { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "토", date: "2025-03-15", cash: "17,000원" },
            ],
        },
        {
            name: "김민하 디자이너",
            schedule: [
                { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료", day: "일", date: "2025-03-16", cash: "17,000원" },
            ],
        },
    ], selfName);

    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00","23:00"
    ];


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
                        <ClientClock timeSlots={timeSlots} />
                    </>

                    {/* 디자이너와 스케줄 영역 */}
                    <>
                        <DesignerSchedule
                            designers={designers}
                            timeSlots={timeSlots}
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