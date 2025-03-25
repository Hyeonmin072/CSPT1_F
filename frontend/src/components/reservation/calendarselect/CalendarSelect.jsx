import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CalendarHeader from "./CalendarHeader.jsx";
import Calendar from "./CalendarClick.jsx";
import DesignerTimeSelect from "./Designer&TimeSelect.jsx";

export default function CalendarSelect() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState('13');
    const [selectedTime, setSelectedTime] = useState(null);

    const dates = [
        { id: 1, day: '월', date: '13' },
        { id: 2, day: '화', date: '14' },
        { id: 3, day: '수', date: '15' },
        { id: 4, day: '목', date: '16' },
        { id: 5, day: '금', date: '17' },
        { id: 6, day: '토', date: '18' },
        { id: 7, day: '일', date: '19' },
        { id: 8, day: '월', date: '20' },
        { id: 9, day: '화', date: '21' },
        { id: 10, day: '수', date: '22' },
        { id: 11, day: '목', date: '23' },
        { id: 12, day: '금', date: '24' },
    ];

    const unavailableTimes = ['12:00', '16:30', '17:00'];

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeClick = (time) => {
        if (unavailableTimes.includes(time)) {
            // 이미 선택된 시간대인 경우 아무 작업도 수행하지 않음
            return;
        }
        if (time === selectedTime) {
            navigate("/menuselect");
        } else {
            setSelectedTime(time);
        }
    };

    return (
        <>
            <div className="flex items-center justify-between px-10 py-4">
                <CalendarHeader />
            </div>

            <div className="lg:flex-row mx-20 gap-6">
                <div className="flex flex-col items-center p-8 w-full">
                    <h2 className="font-semibold text-xl mb-6 w-full text-left text-gray-400">날짜 선택</h2>
                    <hr className="w-full border-t border-gray-300 mb-6" />

                    <div className="mb-4 w-full">
                        <Calendar dates={dates} selectedDate={selectedDate} handleDateClick={handleDateClick} />
                        <hr className="w-full border-t border-gray-300 mt-5" />
                    </div>

                    <div className="w-full">
                        <h2 className="text-xl font-bold text-gray-400 mb-5 text-left">디자이너 시간 선택</h2>
                        <hr className="w-full border-t border-gray-300" />
                    </div>

                    <div className="flex w-full">
                        <DesignerTimeSelect selectedTime={selectedTime} handleTimeClick={handleTimeClick} unavailableTimes={unavailableTimes} />
                    </div>
                </div>
            </div>
        </>
    );
}
