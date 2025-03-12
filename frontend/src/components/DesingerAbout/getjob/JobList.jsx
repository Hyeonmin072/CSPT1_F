export default function JobList({ filteredJobs, formatPostedTime, navigate }){
    return(
        <>
            <div className="flex flex-col gap-4">
                {filteredJobs.map((job, index) => (
                    <div
                        key={job.id}
                        className="rounded-lg shadow-md mb-2 flex flex-col justify-between"
                        style={{transitionDelay: `${index * 150}ms`}}
                    >
                        {/* 상단 정보 섹션 */}
                        <div>
                            {/* Image */}
                            <div
                                className="h-[200px] w-full rounded-lg mb-4 overflow-hidden"

                            >
                                <img
                                    src={job.image || logo}
                                    alt="Shop preview"
                                    className="w-full h-[200px] object-cover rounded-lg"
                                />
                            </div>
                            <div className="px-4">
                                <p className="text-xs text-gray-500 pb-2">
                                    {formatPostedTime(job.postedTime)}
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
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
                                onClick={() => navigate("/detail")}
                            >
                                상세 보기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}