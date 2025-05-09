import { format, startOfWeek, endOfWeek, parseISO, isWithinInterval, addDays } from "date-fns";
import { useState, useEffect } from "react";
import { dummySchedules } from "../../dummydata/DummySchedules.jsx";

export default function DesignerSchedule({ selectedDate, setModalData, setIsModalOpen }) {
    const [personalSchedule, setPersonalSchedule] = useState([]); // 디자이너의 개인 스케줄
    const [currentWeekRange, setCurrentWeekRange] = useState({ start: null, end: null }); // 주간 범위

    // 시간 슬롯
    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
    ];

    const daysOfWeek = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

    // 주간 범위 계산 및 스케줄 필터링
    useEffect(() => {
        const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // 월요일 기준 시작
        const end = endOfWeek(selectedDate, { weekStartsOn: 1 }); // 일요일 기준 끝

        setCurrentWeekRange({ start, end }); // 주간 범위 저장

        const filteredSchedule = dummySchedules.filter((schedule) => {
            const scheduleDate = parseISO(schedule.date); // 스케줄의 날짜 변환
            return (
                isWithinInterval(scheduleDate, { start, end })
            ); // 주간 범위 내 일정 필터링 
        });

        setPersonalSchedule(filteredSchedule);
    }, [selectedDate]);

    return (
        <div className="flex overflow-x-auto">
            {daysOfWeek.map((day, dayIndex) => {
                const currentDayDate = addDays(currentWeekRange.start, dayIndex);
                const formattedDate = format(currentDayDate, "yyyy-MM-dd");
                const isSelectedDate = formattedDate === format(selectedDate, "yyyy-MM-dd");
    
                return (
                    <div
                        key={dayIndex}
                        className={`min-w-[165px] ${isSelectedDate ? "bg-yellow-100" : ""}`}
                    >
                        <h3 className="text-lg font-bold flex items-center justify-center h-24">
                            {day}
                        </h3>
                        <div>
                            {timeSlots.map((time, slotIndex) => {
                                const appointment = personalSchedule.find(
                                    (app) =>
                                        app.time === time &&
                                        format(parseISO(app.date), "yyyy-MM-dd") === formattedDate
                                );
    
                                const getBorderColor = () => {
                                    if (appointment?.status === "완료") return "border-l-4 border-l-green-600";
                                    if (appointment?.status === "미완료") return "border-l-4 border-l-red-600";
                                    return "";
                                };
    
                                return (
                                    <div
                                        key={slotIndex}
                                        className={`h-24 flex items-center justify-center border ${getBorderColor()}`}
                                        onClick={() => {
                                            if (appointment) {
                                                setModalData(appointment);
                                                setIsModalOpen(true);
                                            }
                                        }}
                                    >
                                        {appointment ? (
                                            <button className="text-center">
                                                <span className="block text-gray-700 text-lg">
                                                    {appointment.client}
                                                </span>
                                                <span className="block text-xs text-gray-500">
                                                    {appointment.menu}
                                                </span>
                                            </button>
                                        ) : (
                                            <span>&nbsp;</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
