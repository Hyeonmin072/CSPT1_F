import { useState, useEffect } from "react";

export default function DesiredWorkDays({ isEditable }) {
    const [selectedDays, setSelectedDays] = useState([]); // 선택된 요일 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [availableDays, setAvailableDays] = useState([]); // 백엔드 데이터
    const [reId, setReId] = useState(1); // 이력서 ID 상태
    const [decisionType, setDecisionType] = useState("SELECT_DAYS"); // 선택 타입: "SELECT_DAYS" 또는 "AFTER_NEGOTIATION"

    // 요일 목록 정의 (한글 출력, DB 전송용 데이터 포함)
    const listday = [
        { dayName: "월", wt_day: "MONDAY", wt_id: 1 },
        { dayName: "화", wt_day: "TUESDAY", wt_id: 2 },
        { dayName: "수", wt_day: "WEDNESDAY", wt_id: 3 },
        { dayName: "목", wt_day: "THURSDAY", wt_id: 4 },
        { dayName: "금", wt_day: "FRIDAY", wt_id: 5 },
        { dayName: "토", wt_day: "SATURDAY", wt_id: 6 },
        { dayName: "일", wt_day: "SUNDAY", wt_id: 7 },
    ];

    // 백엔드 데이터 가져오기
    useEffect(() => {
        const fetchAvailableDays = async () => {
            try {
                const data = listday; // 요일 목록 가져오기
                setAvailableDays(data); // 목록 저장
            } catch (error) {
                console.error("Error fetching available days:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchAvailableDays();
    }, []);

    const toggleDay = async (day) => {
        if (decisionType === "AFTER_NEGOTIATION") {
            setSelectedDays([]); // 빈 리스트로 설정
            if(setSelectedDays([]) == null){
                console.log("null입니다.")
            }
            return;
        }

        let updatedDays;
        if (selectedDays.some((selected) => selected.wt_day === day.wt_day)) {
            // 선택된 요일이 이미 포함되어 있다면 제거
            updatedDays = selectedDays.filter((d) => d.wt_day !== day.wt_day);
            setSelectedDays(updatedDays);
        } else {
            // 선택되지 않은 요일 추가
            updatedDays = [...selectedDays, day];
            setSelectedDays(updatedDays);
        }

        console.log("현재 선택된 요일들:", updatedDays.map((d) => d.wt_day)); // 영어 대문자 형식으로 출력
    };

    const handleDecisionChange = (type) => {
        setDecisionType(type);
        if (type === "AFTER_NEGOTIATION") {
            setSelectedDays([]); // 협의 후 결정 선택 시 선택된 요일 초기화
        }
    };

    if (loading || reId === null) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    return (
        <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
            <h2 className="text-2xl font-semibold mb-4">희망 근무요일</h2>
            <div className="border p-8 rounded-lg w-full max-w-4xl">
                {/* 선택 옵션 (요일 및 협의 후 결정) */}
                <div className="flex items-center space-x-4 p-3">
                    <label className="w-32 text-gray-700 font-bold">희망 요일</label>
                    <div className="flex space-x-3 border rounded px-3 py-1">
                        {availableDays.map((day) => (
                            <button
                                key={day.wt_id}
                                onClick={() => toggleDay(day)}
                                className={`px-4 py-2 rounded ${
                                    selectedDays.some((selected) => selected.wt_day === day.wt_day)
                                        ? "bg-green-600 text-white"
                                        : ""
                                }`}
                                disabled={!isEditable || decisionType === "AFTER_NEGOTIATION"}
                            >
                                {day.dayName} {/* 화면에는 한글로 출력 */}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 협의 후 결정 */}
                <div className="flex items-center space-x-4 p-3">
                    <label className="w-32 text-gray-700 font-bold">옵션</label>
                    <div className="flex items-center space-x-6">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="decision"
                                value="SELECT_DAYS"
                                checked={decisionType === "SELECT_DAYS"}
                                onChange={() => handleDecisionChange("SELECT_DAYS")}
                                disabled={!isEditable}
                                className="mr-2"
                            />
                            요일 선택
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="decision"
                                value="AFTER_NEGOTIATION"
                                checked={decisionType === "AFTER_NEGOTIATION"}
                                onChange={() => handleDecisionChange("AFTER_NEGOTIATION")}
                                disabled={!isEditable}
                                className="mr-2"
                            />
                            협의 후 결정
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
