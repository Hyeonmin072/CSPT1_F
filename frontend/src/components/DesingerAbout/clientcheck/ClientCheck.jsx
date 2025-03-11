import { Calendar, User, CheckCircle, CalendarDays, List  } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { format, addDays, subDays } from "date-fns";
import { ko } from "date-fns/locale";

export default function Clientcheck({ Designerprofile }) {
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

        // Cleanup 이벤트 리스너
        return () => {
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mouseleave", handleMouseUp);
            container.removeEventListener("mouseup", handleMouseUp);
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

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

    const handlePrevDay = () => {
        const prevDate = new Date(selectedDate);
        prevDate.setDate(selectedDate.getDate() - 1);
        setSelectedDate(prevDate);
    };

    const handleNextDay = () => {
        const nextDate = new Date(selectedDate);
        nextDate.setDate(selectedDate.getDate() + 1);
        setSelectedDate(nextDate);
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
                { time: "13:00", client: "김수진 고객님", menu: "[EVENT]르블라썸 복구 매직", status: "완료" },
                { time: "15:00", client: "황의정 고객님", menu: "앞머리 컷", status: "완료" },
                { time: "20:00", client: "최희정 고객님", menu: "아윤채 모발 클리닉", status: "미완료" },
                { time: "22:00", client: "김나윤 고객님", menu: "프리미엄염색", status: "미완료" },
            ],
        },
        {
            name: "황새롬 디자이너",
            schedule: [
                { time: "10:00", client: "한세진 고객님", menu: "샴푸 + 드라이", status: "완료" },
            ],
        },
        {
            name: "박재완 디자이너",
            schedule: [
                { time: "08:00", client: "Cameron 고객님", menu: "샴푸 + 드라이", status: "완료" },
                { time: "11:00", client: "한세진 고객님", menu: "[시그니처]CS컬 드라이 펌 ", status: "완료" },
                { time: "13:00", client: "사연진 고객님", menu: "볼륨 매직", status: "완료" },
            ],
        },
        {
            name: "Emmy Massey 디자이너",
            schedule: [
                { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료" },
            ],
        },
        {
            name: "김민재 디자이너",
            schedule: [
                { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료" },
            ],
        },

        {
            name: "김민재 디자이너",
            schedule: [
                { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료" },
            ],
        },

        {
            name: "김민재 디자이너",
            schedule: [
                { time: "09:00", client: "안세나 고객님", menu: "[EVENT]컷 + 포인트펌 + 다운펌", status: "완료" },
            ],
        },
    ], selfName);

    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00","23:00"
    ];

    return (
        <div className="p-10 m-7">
            {/*날짜, 스케줄 보기, 일주일(오늘), 디자이너 간단 이름*/}
            <div className="flex mb-10">
                <div className="relative max-w-md px-5">
                    <div className="flex items-center space-x-4">
                        {/* 이전 날짜 버튼 */}
                        <button onClick={handlePrevDay} className="text-gray-700 text-xl">◀</button>

                        {/* 날짜 입력 필드 */}
                        <input
                            type="date"
                            className="bg-white"
                            value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                        />

                        {/* 다음 날짜 버튼 */}
                        <button onClick={handleNextDay} className="text-gray-700 text-xl">▶</button>
                    </div>
                </div>

                <div className="ml-auto flex flex-row mx-10">
                    <div className="flex space-x-3">
                        <div className="border bg-white rounded-lg flex flex-row items-center relative">
                            <motion.div
                                className="absolute top-0 bottom-0 left-0 w-1/2 bg-gray-300 rounded-lg"
                                animate={{x: selectedView === "my" ? "0%" : "100%"}}
                                transition={{type: "spring", stiffness: 100, damping: 20}}
                            />
                            <button
                                className={`z-10 p-2 flex flex-row text-gray-700`}
                                onClick={() => setSelectedView("my")}>
                                <CalendarDays className="mx-1"/>
                                <p>내 예약 보기</p>
                            </button>
                            <button
                                className={`z-10 p-2 flex flex-row text-gray-700`}
                                onClick={() => setSelectedView("all")}>
                                <List className="mx-1"/>
                                <p>모든 예약 보기</p>
                            </button>
                        </div>

                        <div className="flex border bg-white rounded-lg items-center relative">
                            <motion.div
                                className="absolute top-0 bottom-0 left-0 w-1/2 bg-gray-300 rounded-lg"
                                animate={{x: selectedSchedule === "week" ? "0%" : "100%"}}
                                transition={{type: "spring", stiffness: 100, damping: 20}}
                            />
                            <button
                                className={`z-10 p-2`}
                                onClick={() => setSelectedSchedule("week")}>
                                일주일
                            </button>
                            <button
                                className={`z-10 p-2`}
                                onClick={() => setSelectedSchedule("today")}
                            >
                                오늘
                            </button>
                        </div>

                        <div className="flex items-center ">
                            <div className="mx-1">
                                {Designerprofile && Designerprofile.length > 0 && Designerprofile[0].imageURL ? (
                                    <img
                                        src={Designerprofile[0].imageURL}
                                        className="w-10 h-10 rounded-full"
                                    />
                                ) : (
                                    <div
                                        className="w-10 h-10 rounded-full bg-gray-300">
                                    <span className="text-white">
                                        {Designerprofile && Designerprofile[0] ? Designerprofile[0].name : ''}
                                    </span>
                                    </div>
                                )}
                            </div>
                            <span className="font-medium">{designers.name}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 w-full">
                <div
                    className="flex overflow-x-auto border rounded cursor-grab"
                    ref={scrollContainerRef}
                >
                    {/* 시간대 열 */}
                    <div className="bg-gray-100 sticky left-0 pt-24 z-10">
                        {timeSlots.map((time, index) => (
                            <div
                                key={index}
                                className={`h-24 flex items-center justify-center border font-semibold ${
                                    index === timeSlots.length - 1 ? "border-b-0" : ""
                                }`}
                            >
                                {time}
                            </div>
                        ))}
                    </div>

                    {/* 디자이너와 스케줄 영역 */}
                    <div className="flex">
                        {designers.map((designer, index) => (
                            <div key={index} className="min-w-[220px]">
                                <h3 className="text-lg font-bold flex items-center justify-center h-24">
                                    {designer.name}
                                </h3>
                                <div>
                                    {timeSlots.map((time, slotIndex) => {
                                        const appointment = designer.schedule?.find(app => app.time === time);

                                        const leftBorderColor = appointment?.status === "완료"
                                            ? "border-l-4 border-l-[#4BFFD2]"
                                            : appointment?.status === "미완료"
                                                ? "border-l-4 border-l-[#8239BC]"
                                                : "";

                                        return (
                                            <div
                                                key={slotIndex}
                                                className={`h-24 flex items-center justify-center border ${leftBorderColor}`}
                                            >
                                                {appointment ? (
                                                    <div className="text-center">
                                                        <span
                                                            className="block text-gray-700 text-lg">{appointment.client}</span>
                                                        <span
                                                            className="block text-sm text-gray-500">{appointment.menu}</span>
                                                    </div>
                                                ) : (
                                                    <span>&nbsp;</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
};