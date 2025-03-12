export default function SeekCareer({ employmentHistory }) {
    return (
        <div className="flex flex-col w-full max-w-4xl p-3 border-b-2 pb-8">
            {employmentHistory.length > 0 ? (
                <div>
                    <h3 className="text-2xl font-semibold mb-4">경력</h3>
                    {employmentHistory.map((entry, index) => (
                        <div key={index} className="border p-4 mb-4 rounded">
                            <div className="flex items-center">
                                {/* 회사 이름 */}
                                <span className="font-bold w-32">{entry.companyName}</span>

                                {/* 근무 기간 */}
                                <span>
                                      {entry.startDate === "1개월 미만"
                                          ? "1개월 미만" // 1개월 미만일 경우 표시
                                          : entry.startDate && `입사년도: ${entry.startDate}`}
                                                        {entry.endDate && ` / 퇴사년도: ${entry.endDate}`}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">등록된 경력 정보가 없습니다.</p> // 경력이 없는 경우
            )}
        </div>
    );
}
