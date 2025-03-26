import { format, startOfWeek, endOfWeek, parseISO, isWithinInterval } from "date-fns";
import { useState, useEffect } from "react";

import { dummySchedules } from "../../dummydata/DummySchedules.jsx";


export default function DesignerSchedule({ setModalData, setIsModalOpen }) {
    const [personalSchedule, setPersonalSchedule] = useState([]); // 디자이너의 일정 저장
    const [currentWeekRange, setCurrentWeekRange] = useState({ start: null, end: null }); // 현재 주의 시작/끝 날짜
    const designerId = 1;

    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
    ];

    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"]; // 고정된 요일 배열

    useEffect(() => {
        // 현재 날짜를 기준으로 이번 주의 시작과 끝 날짜 계산
        const now = new Date();
        const start = startOfWeek(now, { weekStartsOn: 1 }); // 월요일 시작
        const end = endOfWeek(now, { weekStartsOn: 1 }); // 일요일 끝

        // 상태에 주간 범위를 저장
        setCurrentWeekRange({ start, end });

        // 더미 데이터에서 현재 주간 스케줄 필터링 및 로그인한 디자이너 ID 기준 필터링
        const filteredSchedule = dummySchedules.filter((schedule) => {
            const scheduleDate = parseISO(schedule.date); // 일정의 날짜를 파싱
            return (
                isWithinInterval(scheduleDate, { start, end }) && schedule.id === designerId
            ); // 주간 범위 내이고 로그인한 디자이너에게 배정된 일정인지 확인
        });

        setPersonalSchedule(filteredSchedule);
    }, [designerId]);

    return (
        <div className="flex">
            {daysOfWeek.map((day, dayIndex) => (
                <div key={dayIndex} className="min-w-[220px]">
                    <h3 className="text-lg font-bold flex items-center justify-center h-24">
                        {day}
                    </h3>
                    <div>
                        {timeSlots.map((time, slotIndex) => {
                            // 요일과 시간에 맞는 예약 필터링
                            const appointment = personalSchedule.find(
                                (app) =>
                                    app.time === time && app.day === day
                            );

                            const leftBorderColor =
                                appointment?.status === "완료"
                                    ? "border-l-4 border-l-green-600"
                                    : appointment?.status === "미완료"
                                        ? "border-l-4 border-l-red-600"
                                        : "";

                            return (
                                <div
                                    key={slotIndex}
                                    className={`h-24 flex items-center justify-center border ${leftBorderColor}`}
                                    onClick={() => {
                                        if (appointment) {
                                            setModalData(appointment); // 예약 데이터 설정
                                            setIsModalOpen(true); // 모달 열기
                                        }
                                    }}
                                >
                                    {appointment ? (
                                        <div className="text-center">
                                            <span className="block text-gray-700 text-lg">{appointment.client}</span>
                                            <span className="block text-sm text-gray-500">{appointment.menu}</span>
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
    );
}
