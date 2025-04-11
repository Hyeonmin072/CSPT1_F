import { useState, useEffect } from "react";

export default function Career({ isEditable }) {
    const [employmentHistory, setEmploymentHistory] = useState([]); // 경력 데이터
    const [newCareerEntry, setNewCareerEntry] = useState({
        cr_name: "",
        cr_join_date: "",
        cr_out_date: "",
    }); // 신규 경력 입력 필드
    const [employmentType, setEmploymentType] = useState("신입"); // "신입" 또는 "경력" 구분
    const [employmentPeriod, setEmploymentPeriod] = useState("1개월 이상"); // "근무 기간" 선택
    const [crId, setCrId] = useState(null); // 고유 이력서 ID
    const [reId, setReId] = useState("67890-xyz"); // 구직 지원서 ID
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 더미 데이터 (경력 정보)
    const dummyEmploymentHistory = [
        {
            cr_id: "12345-abcde",
            re_id: "67890-xyz",
            cr_name: "ABC 회사",
            cr_join_date: "2020-01-01",
            cr_out_date: "2022-12-31",
        },
        {
            cr_id: "67890-fghij",
            re_id: "67890-xyz",
            cr_name: "XYZ 회사",
            cr_join_date: "2018-05-15",
            cr_out_date: "2019-12-20",
        },
    ];

    // 고유 이력서 ID 초기화
    useEffect(() => {
        const fetchCrId = async () => {
            try {
                // 서버에서 고유 ID 가져오기
                // const response = await fetch(`/api/crid?re_id=${reId}`);
                // const data = await response.json();
                // setCrId(data.cr_id);

                setCrId("12345-abcde"); // 더미 데이터로 설정
            } catch (error) {
                console.error("Error fetching cr_id:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCrId();
    }, [reId]);

    // 경력 데이터 초기화
    useEffect(() => {
        const fetchEmploymentHistory = async () => {
            try {
                const data = dummyEmploymentHistory.filter((entry) => entry.re_id === reId);
                setEmploymentHistory(data);
            } catch (error) {
                console.error("Error fetching employment history:", error);
            }
        };

        fetchEmploymentHistory();
    }, [reId]);

    // 신규 경력 저장
    const handleSaveCareer = () => {
        const { cr_name, cr_join_date, cr_out_date } = newCareerEntry;

        if (cr_name && cr_join_date && cr_out_date) {
            const newEntry = {
                cr_id: crId, // 고유 이력서 ID 유지
                re_id: reId, // 구직 지원서 ID 참조
                cr_name,
                cr_join_date,
                cr_out_date,
            };
            setEmploymentHistory([...employmentHistory, newEntry]);
            setNewCareerEntry({ cr_name: "", cr_join_date: "", cr_out_date: "" });

            console.log("저장된 경력:", newEntry);
        }
    };

    // 경력 삭제
    const handleDeleteCareer = (cr_id) => {
        const updatedHistory = employmentHistory.filter((entry) => entry.cr_id !== cr_id);
        setEmploymentHistory(updatedHistory);
    };

    // 입력 변경
    const handleInputChange = (field, value) => {
        setNewCareerEntry((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>;
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
                            type="text"
                            className="flex-grow border rounded p-2"
                            placeholder="회사명을 입력해주세요."
                            value={newCareerEntry.cr_name}
                            onChange={(e) => handleInputChange("cr_name", e.target.value)}
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
                                checked={employmentPeriod === "1개월 미만"}
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
                                checked={employmentPeriod === "1개월 이상"}
                            />
                            <label htmlFor="moreThanMonth" className="cursor-pointer">1개월 이상</label>
                        </div>
                    </div>

                    {employmentPeriod === "1개월 이상" && (
                        <div className="flex items-center mb-4">
                            <div className="w-32"></div>
                            <label className="w-20 text-gray-700 font-bold">입사년도</label>
                            <input
                                type="date"
                                className="border rounded p-2 mr-4"
                                value={newCareerEntry.cr_join_date}
                                onChange={(e) => handleInputChange("cr_join_date", e.target.value)}
                                disabled={!isEditable}
                            />
                            <div className="w-5"> /</div>
                            <label className="w-20 text-gray-700 font-bold">퇴사년도</label>
                            <input
                                type="date"
                                className="border rounded p-2"
                                value={newCareerEntry.cr_out_date}
                                onChange={(e) => handleInputChange("cr_out_date", e.target.value)}
                                disabled={!isEditable}
                            />
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            className="bg-green-600 text-white px-8 py-2 rounded"
                            onClick={handleSaveCareer}
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
                    {employmentHistory.map((entry) => (
                        <div key={entry.cr_id} className="border p-4 mb-4 rounded">
                            <div className="flex items-center">
                                <span className="font-bold w-32">{entry.cr_name}</span>
                                <span>
                                    {entry.cr_join_date && `입사년도: ${entry.cr_join_date}`}
                                    {entry.cr_out_date && ` / 퇴사년도: ${entry.cr_out_date}`}
                                </span>
                                {isEditable && (
                                    <button
                                        className="ml-auto text-red-500"
                                        onClick={() => handleDeleteCareer(entry.cr_id)}
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
