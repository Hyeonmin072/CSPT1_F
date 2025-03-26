import { useState, useEffect } from "react";

export default function Career({ isEditable }) {
    const [employmentType, setEmploymentType] = useState('신입');
    const [employmentPeriod, setEmploymentPeriod] = useState('1개월 미만');
    const [employmentStartDate, setEmploymentStartDate] = useState(null);
    const [employmentEndDate, setEmploymentEndDate] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [employmentHistory, setEmploymentHistory] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 더미 데이터
    const dummyEmploymentHistory = [
        // {
        //     companyName: "ABC 회사",
        //     startDate: "2020-01-01",
        //     endDate: "2022-12-31",
        // },
    ];

    // 백엔드 데이터 가져오기
    useEffect(() => {
        const fetchEmploymentHistory = async () => {
            try {
                // 실제 API 호출 시 아래 코드 활성화
                // const response = await fetch("/api/employment-history");
                // const data = await response.json();

                // 지금은 더미 데이터 사용
                const data = dummyEmploymentHistory;
                setEmploymentHistory(data);
            } catch (error) {
                console.error("Error fetching employment history:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchEmploymentHistory();
    }, []);

    const handleSaveDates = () => {
        if (companyName && (employmentPeriod === "1개월 미만" || (employmentStartDate && employmentEndDate))) {
            const newEntry = {
                companyName,
                startDate: employmentPeriod === "1개월 미만" ? "1개월 미만" : employmentStartDate,
                endDate: employmentPeriod === "1개월 미만" ? "" : employmentEndDate,
            };
            setEmploymentHistory([...employmentHistory, newEntry]); // 새 경력 추가
            setCompanyName(""); // 입력 필드 초기화
            setEmploymentStartDate(null);
            setEmploymentEndDate(null);
        }
    };

    const handleDeleteDates = (index) => {
        const updatedHistory = employmentHistory.filter((_, i) => i !== index);
        setEmploymentHistory(updatedHistory);
    };

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    return (
        <div className="flex flex-col w-full max-w-4xl p-3 border-b-2 pb-8">
            <div className="flex items-center mb-4">
                <h2 className="text-2xl w-32 font-semibold">경력</h2>
                <div className="flex border rounded-lg overflow-hidden w-64">
                    <button
                        className={`w-1/2 p-2 text-center ${employmentType === "신입" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
                        disabled={!isEditable}
                        onClick={() => setEmploymentType("신입")}
                    >
                        신입
                    </button>
                    <button
                        className={`w-1/2 p-2 text-center ${employmentType === "경력" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"}`}
                        disabled={!isEditable}
                        onClick={() => setEmploymentType("경력")}
                    >
                        경력
                    </button>
                </div>
            </div>

            {employmentType === "경력" && (
                <div className="border p-8 rounded-lg w-full max-w-4xl">
                    <div className="flex items-center mb-4">
                        <label className="w-32 text-gray-700 font-bold">회사명</label>
                        <input
                            id="companyName"
                            type="text"
                            className="flex-grow border rounded p-2"
                            placeholder="회사명을 입력해주세요."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            disabled={!isEditable}
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="w-32 font-bold text-gray-700">근무 기간</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="lessThanMonth"
                                name="period"
                                value="1개월 미만"
                                className="m-2"
                                onChange={(e) => setEmploymentPeriod(e.target.value)}
                                disabled={!isEditable}
                            />
                            <label htmlFor="lessThanMonth" className="cursor-pointer">1개월 미만</label>
                            <div className="pl-2" />
                            <input
                                type="radio"
                                id="moreThanMonth"
                                name="period"
                                value="1개월 이상"
                                className="m-2"
                                onChange={(e) => setEmploymentPeriod(e.target.value)}
                                disabled={!isEditable}
                            />
                            <label htmlFor="moreThanMonth" className="cursor-pointer">1개월 이상</label>
                        </div>
                    </div>

                    {employmentPeriod === "1개월 이상" && (
                        <div className="flex items-center mb-4">
                            <div className="w-32"></div>
                            <label className="w-20 text-gray-700 font-bold">입사년도</label>
                            <input
                                id="startDate"
                                type="date"
                                className="border rounded p-2 mr-4"
                                placeholder="입사년도"
                                value={employmentStartDate || ""}
                                onChange={(e) => setEmploymentStartDate(e.target.value)}
                                disabled={!isEditable}
                            />
                            <div className="w-5"> / </div>
                            <label className="w-20 text-gray-700 font-bold">퇴사년도</label>
                            <input
                                id="endDate"
                                type="date"
                                className="border rounded p-2"
                                value={employmentEndDate || ""}
                                onChange={(e) => setEmploymentEndDate(e.target.value)}
                                disabled={!isEditable}
                            />
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            className="bg-green-600 text-white px-8 py-2 rounded"
                            onClick={handleSaveDates}
                            disabled={!isEditable}
                        >
                            저장
                        </button>
                    </div>
                </div>
            )}

            {employmentHistory.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">저장된 경력</h3>
                    {employmentHistory.map((entry, index) => (
                        <div key={index} className="border p-4 mb-4 rounded">
                            <div className="flex items-center">
                                <span className="font-bold w-32">{entry.companyName}</span>
                                <span>
                                    {entry.startDate === "1개월 미만"
                                        ? "1개월 미만"
                                        : entry.startDate && `입사년도: ${entry.startDate}`}
                                    {entry.endDate && ` / 퇴사년도: ${entry.endDate}`}
                                </span>
                                {isEditable && (
                                    <button
                                        className="ml-auto text-red-500"
                                        onClick={() => handleDeleteDates(index)}
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
