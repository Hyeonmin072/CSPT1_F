export default function LeftSideBar({ selectedLocal, setSelectedLocal, selectedPostedTime, setSelectedPostedTime, salary, setSalary, handleFilter }){

    const local = ["전체", "서울", "부산", "대구", "전주", "인천", "속초", "안동", "예천"];

    return(
        <>
            {/* 가게 이름 검색 */}
            <div className="mb-4">
                <label className="block mb-2 font-bold">가게 이름</label>
                <input
                    type="text"
                    placeholder="가게 이름 검색"
                    className="w-full p-2 border rounded-lg"
                />
            </div>

            {/* 지역 선택 */}
            <div className="mb-4">
                <label className="block mb-2 font-bold">지역</label>
                <select
                    className="w-full p-2 border rounded-lg"
                    value={selectedLocal}
                    onChange={(e) => setSelectedLocal(e.target.value)}
                >
                    {local.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>

            {/* 근무 형태 */}
            <div className="mb-4">
                <label className="block mb-2 font-bold">작업 시간대</label>
                <select className="w-full p-2 border rounded-lg">
                    <option>주간</option>
                    <option>야간</option>
                </select>
            </div>

            {/* 게시글 등록 시간 */}
            <div className="mb-6">
                <h2 className="font-bold">게시글 등록 시간</h2>
                <div className="mt-2 space-y-2 ">
                    {["전체", "1시간 전", "24시간 전", "일주일 전", "한달 전"].map((label) => (
                        <label key={label} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="postedTime"
                                className="rounded"
                                value={label}
                                checked={selectedPostedTime === label}
                                onChange={(e) => setSelectedPostedTime(e.target.value)}
                            />
                            <span>{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* 급여 슬라이더 */}
            <div>
                <div className="flex flex-row mb-2 justify-between items-center">
                    <h2 className="font-bold">급여</h2>
                    {/* 현재 슬라이더 값 표시 및 입력 가능 */}
                    <input
                        type="number"
                        min="100"
                        max="1000"
                        step="10"
                        value={salary}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if (!isNaN(value)) {
                                setSalary(value); // 입력 중에는 제한 없이 상태 업데이트
                            }
                        }}
                        onBlur={(e) => {
                            let value = Number(e.target.value);
                            if (value < 100) value = 100; // 최소값으로 설정
                            if (value > 1000) value = 1000; // 최대값으로 설정
                            setSalary(value); // 입력 완료 후 범위 제한 적용
                        }}
                        className="w-[80px] p-1 border rounded text-center text-gray-700"
                    />
                    <span className="ml-2">만원</span>
                </div>
                <input
                    type="range"
                    min="100"
                    max="1000"
                    step="10"
                    value={salary}
                    onChange={(e) => setSalary(Number(e.target.value))}
                    className="w-full"
                />
                <div className="flex flex-row text-sm mt-4 justify-between">
                    <span className="flex flex-col justify-center">월 100-1000만원</span>
                </div>
            </div>
        </>
    );
}