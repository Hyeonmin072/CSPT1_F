import { useState, useEffect } from "react";

export default function DesiredWorkDays({ isEditable }) {
    const [selectedDays, setSelectedDays] = useState([]); // 선택된 요일 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [availableDays, setAvailableDays] = useState([]); // 백엔드 데이터

    // 더미 데이터
    const dummyAvailableDays = ["월", "화", "수", "목", "금", "토", "일"];

    // 백엔드 데이터 가져오기
    useEffect(() => {
        const fetchAvailableDays = async () => {
            try {
                // 실제 API 호출 시 아래 코드 활성화
                // const response = await fetch("/api/desired-workdays");
                // const data = await response.json();

                // 지금은 더미 데이터 사용
                const data = dummyAvailableDays;
                setAvailableDays(data);
            } catch (error) {
                console.error("Error fetching available days:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchAvailableDays();
    }, []);

    const toggleDay = (day) => {
        // 선택된 요일이 이미 포함되어 있으면 제거
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            // 선택되지 않은 요일 추가
            setSelectedDays([...selectedDays, day]);
        }
    };

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    return (
        <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
            <h2 className="text-2xl font-semibold mb-4">희망 근무요일</h2>
            <div className="border p-8 rounded-lg w-full max-w-4xl">
                {/* 희망 요일 */}
                <div className="flex items-center space-x-4 p-3">
                    <label className="w-32 text-gray-700 font-bold">희망 요일</label>
                    <div className="flex space-x-3 border rounded px-3 py-1">
                        {availableDays.map((day) => (
                            <button
                                key={day}
                                onClick={() => toggleDay(day)}
                                className={`px-4 py-2 rounded ${
                                    selectedDays.includes(day) ? "bg-green-600 text-white" : ""
                                }`}
                                disabled={!isEditable}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
