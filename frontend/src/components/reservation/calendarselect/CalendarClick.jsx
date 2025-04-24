import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Calendar({ dates, selectedDate, handleDateClick }) {
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  {
    /* 마우스 움직임 감지 로직들 */
  }
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
    <div className="flex flex-wrap gap-4 justify-start">
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
