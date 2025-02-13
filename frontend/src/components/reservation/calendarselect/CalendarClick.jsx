import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Calendar({ dates, handleDateClick, selectedDate }){
    const scrollContainerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    {/* 마우스 움직임 감지 로직들 */}
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
            className="flex justify-center overflow-x-auto scrollbar-hide"
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {dates.map((date) => (
                <button
                    key={date.id}
                    onClick={() => handleDateClick(date.date)}
                    className={`px-8 min-w-[70px] bg-white`}
                >
                    <div className="flex flex-col items-center justify-center mb-3">
                        <span className="font-bold text-black pb-5 text-lg">{date.day}</span>
                        <span
                            className={`font-bold w-10 h-10 flex items-center justify-center ${date.date === selectedDate ? 'bg-[#70EFDE] text-white rounded-full' : 'text-black'} text-lg`}>
                                            {date.date}
                                        </span>
                    </div>
                </button>
            ))}
        </div>
    )
}