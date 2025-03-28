import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import { useState, useEffect } from "react";

export default function DesignerSchedule({ selectedDate, setSelectedDate }) {
    const [weekDates, setWeekDates] = useState([]); // 현재 주차 날짜들

    const updateWeekDates = (date) => {
        const start = startOfWeek(date, { weekStartsOn: 1 }); // 월요일 기준 시작 날짜
        const dates = Array.from({ length: 7 }, (_, i) =>
            format(addDays(start, i), "yyyy-MM-dd")
        );
        setWeekDates(dates); // 주차 날짜 업데이트
    };

    // 오늘 날짜 확인
    const today = format(new Date(), "yyyy-MM-dd");

    useEffect(() => {
        updateWeekDates(selectedDate); // 초기 주차 계산
    }, [selectedDate]);

    const handlePrevWeek = () => {
        const prevDate = addDays(selectedDate, -1); // 이전 날짜로 이동
        setSelectedDate(prevDate);
        updateWeekDates(prevDate); // 주차 업데이트
    };

    const handleNextWeek = () => {
        const nextDate = addDays(selectedDate, 1); // 다음 날짜로 이동
        setSelectedDate(nextDate);
        updateWeekDates(nextDate); // 주차 업데이트
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* 이전/다음 날짜 버튼 */}
            <div className="flex items-center space-x-4 mt-4">
                <button
                    onClick={handlePrevWeek}
                    className="text-gray-700 text-xl"
                >
                    ◀
                </button>
                <input
                    type="date"
                    className="bg-white"
                    value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                        const newDate = new Date(e.target.value);
                        setSelectedDate(newDate);
                        updateWeekDates(newDate); // 주차 업데이트
                    }}
                />
                <button
                    onClick={handleNextWeek}
                    className="text-gray-700 text-xl"
                >
                    ▶
                </button>
            </div>
        </div>
    );
}
