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
      fullDate: date.toISOString().split("T")[0],
    });
  }
  return dates;
}

export default function Calendar({
  handleDateClick,
  selectedDate,
  setSelectedDate,
}) {
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // 현재 연도와 월 가져오기
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 +1

  // dates 데이터 생성
  const dates = generateDates({ year: currentYear, month: currentMonth });

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
    const walk = (x - startX.current) * 2; // scroll-fast
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      className="flex flex-wrap gap-4 justify-start"
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {dates.map((date) => (
        <button
          key={date.id}
          onClick={() => handleDateClick(date.fullDate)}
          className={`w-24 h-24 rounded-lg flex flex-col items-center justify-center ${
            selectedDate === date.fullDate
              ? "bg-green-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <span className="text-sm mb-1">{date.day}</span>
          <span className="text-2xl font-bold">{date.date}</span>
        </button>
      ))}
    </div>
  );
}
