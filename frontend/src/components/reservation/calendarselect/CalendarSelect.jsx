import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CalendarHeader from "./CalendarHeader.jsx";
import Calendar from "./CalendarClick.jsx";
import DesignerTimeSelect from "./Designer&TimeSelect.jsx";

export default function CalendarSelect({
  availableTimes,
  onDateSelect,
  selectedDate,
  loading,
  error,
  designerEmail,
}) {
  const navigate = useNavigate();
  const [selectedTime, setSelectedTime] = useState(null);
  const [dates, setDates] = useState([]);

  // 오늘부터 7일간의 날짜 데이터 생성
  useEffect(() => {
    const dateList = [];
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);

      dateList.push({
        id: i + 1,
        day: dayNames[date.getDay()],
        date: date.getDate().toString().padStart(2, "0"),
        fullDate: date.toISOString().split("T")[0],
      });
    }

    setDates(dateList);
  }, []);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      navigate(`/menuselect/${designerEmail}`, {
        state: { selectedDate, selectedTime },
      });
    }
  };

  if (loading) {
    return <div className="text-center py-2 text-sm">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center py-2 text-sm text-red-500">{error}</div>;
  }

  return (
    <div className="w-full">
      {/* 날짜 선택 */}
      <div className="flex overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {dates.map((date) => (
          <button
            key={date.id}
            onClick={() => onDateSelect(date.fullDate)}
            className={`flex-shrink-0 w-16 h-16 mx-1 rounded-lg flex flex-col items-center justify-center transition-all ${
              selectedDate === date.fullDate
                ? "bg-green-500 text-white shadow-lg transform scale-105"
                : "bg-white border hover:border-green-500"
            }`}
          >
            <span className="text-xs mb-1">{date.day}</span>
            <span className="text-lg font-semibold">{date.date}</span>
          </button>
        ))}
      </div>

      {/* 시간 선택 */}
      {selectedDate && (
        <div className="mt-4">
          <h2 className="text-sm font-medium mb-3 text-gray-600">
            예약 가능 시간
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {availableTimes.map((time, index) => (
              <button
                key={index}
                className={`p-2 text-sm rounded-lg transition-all ${
                  selectedTime === time
                    ? "bg-green-500 text-white shadow-md transform scale-105"
                    : "bg-white border hover:border-green-500"
                }`}
                onClick={() => handleTimeSelect(time)}
              >
                {time.substring(0, 5)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 다음 버튼 */}
      {selectedDate && selectedTime && (
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            onClick={handleNext}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
