import {useState} from "react";

export default function DesiredWorkDays({ isEditable, selectedDays, setSelectedDays, selectedDuration, setSelectedDuration }){

    const toggleDay = (day) => {
        if (day === "요일 무관") {
            if (selectedDays.includes(day)) {
                // "요일 무관"을 두 번째로 클릭하면 취소
                setSelectedDays(selectedDays.filter(d => d !== day));
            } else {
                // "요일 무관"을 클릭하면 다른 모든 요일은 취소되고 "요일 무관"만 선택
                setSelectedDays([day]);
            }
        } else {
            // "요일 무관"이 선택된 상태라면 "요일 무관"을 취소하고, 선택한 요일만 선택
            if (selectedDays.includes("요일 무관")) {
                setSelectedDays([day]);
            } else {
                if (selectedDays.includes(day)) {
                    // 다른 요일을 두 번째로 클릭하면 제거
                    setSelectedDays(selectedDays.filter(d => d !== day));
                } else {
                    // 다른 요일을 클릭하면 추가
                    setSelectedDays([...selectedDays, day]);
                }
            }
        }
    };

    const selectDuration = (duration) => {
        setSelectedDuration(duration === selectedDuration ? null : duration);
    };


    return (
        <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
            <h2 className="text-2xl font-semibold mb-4">희망 근무조건</h2>
            <div className="border p-8 rounded-lg w-full max-w-4xl">

                {/* 희망 요일 */}
                <div className="flex items-center space-x-4 p-3">
                    <label className="w-32 text-gray-700 font-bold">희망 요일</label>
                    <div className="flex space-x-3 border rounded px-3 py-1">
                        {["월", "화", "수", "목", "금", "토", "일", "요일 무관"].map((day) => (
                            <button
                                key={day}
                                onClick={() => toggleDay(day)}
                                className={`px-4 py-2 rounded ${
                                    selectedDays.includes(day) ? "bg-[#00B3A6] text-white" : ""
                                }`}
                                disabled={!isEditable}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 희망 근무 기간 */}
                <div className="flex items-center space-x-4 p-2">
                    <label className="w-32 text-gray-700 font-bold">희망 근무조건</label>
                    <div className="flex space-x-3 border rounded px-3 py-1">
                        {["3개월 이하", "3개월 - 6개월", "6개월 - 1년", "1년 이상", "기간 무관"].map((duration) => (
                            <button
                                key={duration}
                                onClick={() => selectDuration(duration)}
                                className={`px-4 py-2 rounded ${
                                    selectedDuration === duration ? "bg-[#00B3A6] text-white" : ""
                                }`}
                                disabled={!isEditable}
                            >
                                {duration}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}