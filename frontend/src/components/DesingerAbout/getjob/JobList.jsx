export default function JobList({ filteredJobs, formatPostedTime, navigate }) {
    const loading = filteredJobs.length === 0;
    return (
        <div className="flex flex-col gap-4">
            {loading ? (
                <p className="text-center text-gray-500">구인구직 게시글이 존재하지 않습니다.</p>
            ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                    <div
                        key={job.postId}
                        className="rounded-lg shadow-md mb-4 flex flex-col justify-between"
                        style={{ transitionDelay: `${index * 150}ms` }}
                    >
                        {/* 상단 정보 섹션 */}
                        <div>
                            {/* 배경이미지 섹션 */}
                            <div className="h-[200px] w-full rounded-lg mb-4 overflow-hidden">
                                {job.imageUrl ? (
                                    <img
                                        src={job.imageUrl}
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
                                    {job.postedTime} {/* 게시된 시간 */}
                                </p>
                                <h3 className="text-lg font-bold">{job.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{job.shopName}</p>
                                <p className="text-sm text-gray-500 mb-2">
                                    {job.work === "FULLTIME" ? "정규직" : job.work === "PARTTIME" ? "계약직" : "정보 없음"} - {job.salary}만원
                                </p>
                                <p className="text-sm text-gray-500">{job.address}</p>
                            </div>
                        </div>
    
                        {/* 하단 버튼 섹션 */}
                        <div className="flex justify-end mt-4 m-3">
                            <button
                                className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                                onClick={() => navigate(`/job/detail/${job.postId}`)} // postId를 URL에 포함
                            >
                                상세 보기
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">등록된 구인구직이 없습니다.</p>
            )}
        </div>
    );
}
