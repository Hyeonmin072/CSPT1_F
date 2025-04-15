import React, { useRef } from "react";

export function generateDates({ year, month }) {
    const dates = [];
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const date = new Date(year, month - 1, day);
        const dayName = date.toLocaleDateString("ko", { weekday: "short" }); // 요일 표시
        dates.push({
            id: day,
            day: dayName,
            date: day,
        });
    }
    return dates;
}



export default function Calendar({ handleDateClick, selectedDate, setSelectedDate  }) {
    // 현재 연도와 월 가져오기
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1


    // dates 데이터 생성
    const dates = generateDates({ year: currentYear, month: currentMonth });

    const scrollContainerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div
            className="flex justify-start overflow-x-auto scrollbar-hide"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {dates.map((date) => (
                <button
                    key={date.id}
                    onClick={() => {
                        handleDateClick(date.date); // 클릭 이벤트 처리
                        setSelectedDate(date.date); // 선택된 날짜 업데이트
                    }}
                    className={`px-8 min-w-[70px] bg-white`}
                >
                    <div className="flex flex-col items-center justify-center mb-3">
                        <span
                            className={`font-bold w-10 h-10 flex items-center justify-center ${
                                date.date === selectedDate
                                    ? "bg-green-500 text-white rounded-full"
                                    : "text-black"
                            } text-lg`}
                        >
                            {date.date}
                        </span>
                    </div>
                </button>
            ))}
        </div>
    );
}


