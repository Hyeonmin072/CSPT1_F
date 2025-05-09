export default function JobList({ filteredJobs, formatPostedTime, navigate }) {
    return (
        <div className="flex flex-col gap-4">
            {/* 구인 목록 렌더링 */}
            {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                    <div
                        key={job.id}
                        className="rounded-lg shadow-md mb-4 flex flex-col justify-between"
                        style={{ transitionDelay: `${index * 150}ms` }}
                    >
                        {/* 상단 정보 섹션 */}
                        <div>
                            {/* 배경이미지 섹션 */}
                            <div className="h-[200px] w-full rounded-lg mb-4 overflow-hidden">
                                {job.image ? (
                                    <img
                                        src={job.image}
                                        alt="Shop preview"
                                        className="w-full h-[200px] object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-400">이미지 없음</span>
                                    </div>
                                )}
                            </div>

                            {/* 텍스트 정보 섹션 */}
                            <div className="px-4">
                                <p className="text-xs text-gray-500 pb-2">
                                    {formatPostedTime(job.postedTime)} {/* 게시된 시간 */}
                                </p>
                                <h3 className="text-lg font-bold">{job.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{job.company}</p>
                                <p className="text-sm text-gray-500 mb-2">
                                    {job.type} - {job.salary}만원
                                </p>
                                <p className="text-sm text-gray-500">{job.location}</p>
                            </div>
                        </div>

                        {/* 하단 버튼 섹션 */}
                        <div className="flex justify-end mt-4 m-3">
                            <button
                                className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                                onClick={() => navigate("/job/detail")} // 상세 보기 페이지로 이동
                            >
                                상세 보기
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">등록된 구인구직이 없습니다.</p> // 데이터가 없을 경우
            )}
        </div>
    );
}
