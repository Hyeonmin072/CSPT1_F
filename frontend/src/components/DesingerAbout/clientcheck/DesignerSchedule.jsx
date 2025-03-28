import { format, startOfWeek, endOfWeek, parseISO, isWithinInterval, addDays } from "date-fns";
import { useState, useEffect } from "react";
import { dummySchedules } from "../../dummydata/DummySchedules.jsx";

export default function DesignerSchedule({ selectedDate, setModalData, setIsModalOpen }) {
    const [personalSchedule, setPersonalSchedule] = useState([]); // 디자이너의 개인 스케줄
    const [currentWeekRange, setCurrentWeekRange] = useState({ start: null, end: null }); // 주간 범위
    const designerId = 1; // 특정 디자이너 ID

    // 시간 슬롯
    const timeSlots = [
        "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
    ];

    // 요일 이름
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

    // 주간 범위 계산 및 스케줄 필터링
    useEffect(() => {
        const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // 월요일 기준 시작
        const end = endOfWeek(selectedDate, { weekStartsOn: 1 }); // 일요일 기준 끝

        setCurrentWeekRange({ start, end }); // 주간 범위 저장

        const filteredSchedule = dummySchedules.filter((schedule) => {
            const scheduleDate = parseISO(schedule.date); // 스케줄의 날짜 변환
            return (
                isWithinInterval(scheduleDate, { start, end }) && schedule.id === designerId
            ); // 주간 범위 내 일정 필터링 및 디자이너 ID 확인
        });

        setPersonalSchedule(filteredSchedule);
    }, [selectedDate, designerId]);

    return (
        <div className="flex">
            {daysOfWeek.map((day, dayIndex) => {
                const currentDayDate = addDays(currentWeekRange.start, dayIndex); // 요일에 해당하는 날짜 계산
                const formattedDate = format(currentDayDate, "yyyy-MM-dd"); // yyyy-MM-dd 형식으로 변환

                return (
                    <div
                        key={dayIndex}
                        className={`min-w-[165px] ${
                            formattedDate === format(selectedDate, "yyyy-MM-dd")
                                ? "bg-yellow-100"
                                : ""
                        }`}
                    >
                        <h3 className="text-lg font-bold flex items-center justify-center h-24">
                            {day}
                        </h3>
                        <div>
                            {timeSlots.map((time, slotIndex) => {
                                // 요일과 시간에 맞는 예약 필터링
                                const appointment = personalSchedule.find(
                                    (app) =>
                                        app.time === time &&
                                        format(parseISO(app.date), "yyyy-MM-dd") === formattedDate
                                );

                                // 예약 상태에 따른 색상 설정
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
                                                setModalData(appointment); // 모달에 데이터 전달
                                                setIsModalOpen(true); // 모달 열기
                                            }
                                        }}
                                    >
                                        {appointment ? (
                                            <div className="text-center">
                                                <span className="block text-gray-700 text-lg">
                                                    {appointment.client}
                                                </span>
                                                <span className="block text-xs text-gray-500">
                                                    {appointment.menu}
                                                </span>
                                            </div>
                                        ) : (
                                            <span>&nbsp;</span> // 빈 슬롯
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
