import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import CalendarHeader from "./CalendarHeader.jsx";
import Calendar from "./CalendarClick.jsx";
import DesignerTimeSelect from "./Designer&TimeSelect.jsx";

export default function CalendarSelect() {
    const navigate = useNavigate();
    const currentDate = new Date();
    const today = currentDate.getDate(); // 오늘 날짜 가져오기
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState(null);

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

    useEffect(() => {
        // 페이지 로드 시 스크롤 위치 초기화
        window.scrollTo(0, 0);
    }, []); // 빈 의존성 배열로 컴포넌트가 마운트될 때만 실행

    return (
        <div className="max-w-8xl pt-10 mt-5">
            <div className="flex items-center justify-between px-10 py-4">
                <CalendarHeader />
            </div>

            <div className="lg:flex-row mx-20 gap-6">
                <div className="flex flex-col items-center p-8 w-full">
                    <h2 className="font-semibold text-xl mb-6 w-full text-left text-gray-400">날짜 선택</h2>
                    <hr className="w-full border-t border-gray-300 mb-6" />

                    <div className="mb-4 w-full overflow-hidden whitespace-nowrap">

                        <Calendar
                            selectedDate={selectedDate}
                            handleDateClick={(date) => {
                                console.log(date);
                                setSelectedDate(date);
                            }}
                            setSelectedDate={setSelectedDate}
                        />
                        <hr className="w-full border-t border-gray-300 mt-5"/>
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
        </div>
    );
}
