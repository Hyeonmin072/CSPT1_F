import { useCallback, useState, useEffect } from "react";
import axiosInstance from "../../sign/axios/AxiosInstance";
import { MailPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function SearchJobPage() {
    const navigate = useNavigate();
    const [jobList, setJobList] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobList = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/shop/jobposts");
            console.log("직업 목록 응답 데이터:", response.data);
            setJobList(response.data);
        } catch (err) {
            setError("직업 목록을 불러오는데 실패했습니다.");
            console.error("직업 목록 로딩 에러:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobList();
    }, [fetchJobList]);

    const handleCloseJob = async (id, work, title, content, gender) => {
        try {
            const result = await Swal.fire({
                title: "게시글 마감",
                text: "정말로 이 게시글을 마감하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "마감하기",
                cancelButtonText: "취소",
            });
    
            if (result.isConfirmed) {
                const response = await axiosInstance.request({
                    method: "DELETE",
                    url: `/shop/jobpost`,
                    data: { id, work, title, content, gender }, // 모든 필드 전달
                });
                console.log("게시글 마감 응답:", response.data);
    
                await Swal.fire({
                    title: "마감 완료",
                    text: "게시글이 성공적으로 마감되었습니다.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                });
    
                fetchJobList(); // 목록 새로고침
            }
        } catch (error) {
            console.error("게시글 마감 에러:", error);
            Swal.fire({
                title: "오류",
                text: "게시글 마감 중 문제가 발생했습니다.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    return (
        <div className="flex flex-col w-full h-auto min-h-[700px] bg-gray-50">
            {/* 등록 버튼 */}
            <div className="flex w-full justify-end mb-4 px-4">
                <button
                    className="w-[130px] px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 shadow-md"
                    onClick={() => navigate("/searchjob/register")}
                >
                    등록하기
                </button>
            </div>
    
            {/* 직업 목록 */}
            <div>
                {jobList.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 p-4 max-w-5xl mx-auto w-[700px]">
                        {jobList.map((job) => (
                            <div
                                key={job.id}
                                className="flex flex-col space-y-4 border rounded-lg bg-white shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                {/* 상단 정보 */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-700">{job.shopName}</h2>
                                        <p className="font-bold text-lg text-gray-900">{job.title}</p>
                                    </div>
                                </div>

                                <div className="border"></div>
    
                                {/* 상세 정보 */}
                                <div className="grid grid-cols-5 gap-4 text-center text-sm text-gray-600">
                                    <div>
                                        <div className="font-medium text-gray-800">우대성별</div>
                                        <div>{job.gender}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">근무형태</div>
                                        <div>{job.work === "FULLTIME" ? "정규직" : job.work === "PARTTIME" ? "계약직" : "정보 없음"}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">급여</div>
                                        <div>{job.salary}만원</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">출근시간</div>
                                        <div>{job.workTime}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">퇴근시간</div>
                                        <div>{job.leaveTime}</div>
                                    </div>
                                </div>
    
                                {/* 버튼 그룹 */}
                                <div className="flex justify-end space-x-3">
                                    <button
                                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 shadow-sm"
                                    >
                                        <MailPlus />
                                        <span>이력서 확인</span>
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-yellow-100 rounded-lg hover:bg-yellow-200 text-yellow-700 shadow-sm"
                                        onClick={() => navigate(`/searchjob/edit/${job.id}`)}
                                    >
                                        수정하기
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200 text-red-700 shadow-sm"
                                        onClick={() => handleCloseJob(job.id, job.work, job.title, job.content, job.gender)}
                                    >
                                        마감하기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">등록된 게시글이 없습니다.</p>
                )}
            </div>
        </div>
    );  
}
