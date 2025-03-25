import { format, startOfWeek, endOfWeek, parseISO, isWithinInterval } from "date-fns";
import { useState, useEffect } from "react";

// 더미 일정 데이터 정의
export const dummySchedules = [
    { time: "13:00", client: "김수진 고객님", menu: "[EVENT]르블라썸 복구 매직", status: "완료", day: "월", date: "2025-03-17", cash: "55,000원" },
    { time: "15:00", client: "황의정 고객님", menu: "앞머리 컷", status: "완료", day: "화", date: "2025-03-18", cash: "17,000원" },
    { time: "20:00", client: "최희정 고객님", menu: "아윤채 모발 클리닉", status: "미완료", day: "수", date: "2025-03-19", cash: "13,000원" },
    { time: "22:00", client: "김나윤 고객님", menu: "프리미엄염색", status: "미완료", day: "목", date: "2025-03-20", cash: "122,000원" },
    { time: "16:00", client: "한세진 고객님", menu: "샴푸 + 드라이", status: "완료", day: "금", date: "2025-03-21", cash: "22,000원" },
    { time: "08:00", client: "Cameron 고객님", menu: "샴푸 + 드라이", status: "완료", day: "월", date: "2025-03-22", cash: "17,000원" },
    { time: "11:00", client: "한세진 고객님", menu: "[시그니처]CS컬 드라이 펌", status: "완료", day: "화", date: "2025-03-23", cash: "17,000원" },
    { time: "11:00", client: "한세진 고객님", menu: "[시그니처]CS컬 드라이 펌", status: "완료", day: "화", date: "2025-03-23", cash: "21,000원" },
];

export default function DesignerSchedule({ setModalData, setIsModalOpen }) {
    const [personalSchedule, setPersonalSchedule] = useState([]); // 디자이너의 일정 저장
    const [currentWeekRange, setCurrentWeekRange] = useState({ start: null, end: null }); // 현재 주의 시작/끝 날짜

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

        // 더미 데이터에서 현재 주간 스케줄 필터링
        const filteredSchedule = dummySchedules.filter((schedule) => {
            const scheduleDate = parseISO(schedule.date); // 일정의 날짜를 파싱
            return isWithinInterval(scheduleDate, { start, end }); // 주간 범위 내인지 확인
        });

        setPersonalSchedule(filteredSchedule);
    }, []);

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
                                    ? "border-l-4 border-l-[#4BFFD2]"
                                    : appointment?.status === "미완료"
                                        ? "border-l-4 border-l-[#8239BC]"
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
