import { useCallback, useState, useEffect } from "react";
import axiosInstance from "../../sign/axios/AxiosInstance";
import { MailPlus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


export default function SearchJobPage() {
    const navigate = useNavigate();
    const [jobList, setJobList] = useState([]);
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedJob, setSelectedJob] = useState(null); // 클릭된 공고
    const [resumeList, setResumeList] = useState([]);     // 해당 공고 지원자들
    const [showResumeModal, setShowResumeModal] = useState(false); // 모달 열기


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

    const formatGender = (gender) => {
        if (gender === "MALE") return "남성";
        if (gender === "FEMALE") return "여성";
        return "기타"; // 혹은 빈 문자열
    };

    const handleViewResumes = async (jobId) => {
        try {
            const response = await axiosInstance.get(`/shop/jobposts/${jobId}/applications`);
            setResumeList(response.data); // 예: 지원자 목록
            setSelectedJob(jobId);
            setShowResumeModal(true);     // 모달 열기
        } catch (error) {
            console.error("이력서 조회 실패:", error);
            Swal.fire("오류", "이력서를 불러오는 데 실패했습니다.", "error");
        }
    };


    const handleCloseJob = async (jobId) => {
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
                console.log("삭제 요청 jobpostId:", jobId);
    
                const response = await axiosInstance.delete(`/shop/jobposts/${jobId}`);              
                console.log("게시글 마감 응답:", response.data);
    
                await Swal.fire({
                    title: "마감 완료",
                    text: "게시글이 성공적으로 마감되었습니다.",
                    icon: "success",
                    confirmButtonColor: "#22C55E",
                    confirmButtonText: "확인",
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
                confirmButtonText: "확인",
            });
        }
    };
    

    const formatTime = (timeStr) => {
        if (!timeStr) return "";
        return timeStr.slice(0, 5); 
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
                                        <div>{formatGender(job.gender)}</div>
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
                                        <div>{formatTime(job?.workTime || "")}</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-800">퇴근시간</div>
                                        <div>{formatTime(job?.leaveTime || "")}</div>
                                    </div>

                                </div>
    
                                {/* 버튼 그룹 */}
                                <div className="flex justify-end space-x-3">
                                    <button
                                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-700 shadow-sm"
                                        onClick={() => handleViewResumes(job.id)}
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
                                        onClick={() => {handleCloseJob(job.id)
                                            console.log("마감 버튼 클릭됨", job.id)}
                                        }
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

            {showResumeModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <div className="bg-white w-[700px] max-h-[80vh] overflow-y-auto rounded-lg shadow-xl p-6 relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">이력서 확인</h2>
                            <button onClick={() => setShowResumeModal(false)} className="text-gray-500 hover:text-black">
                                ✕
                            </button>
                        </div>

                        <p className="text-right text-sm text-gray-500 mb-4">
                            이 구인글에 지원한 이력서는 <span className="text-red-500">{resumeList.length}개</span>가 있습니다.
                        </p>

                        <div className="space-y-4">
                            {resumeList.map((resume, index) => (
                                <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm bg-white">
                                    <img
                                        src={resume.designerImage || "/default-avatar.png"}
                                        alt="지원자 사진"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-lg">{resume.designerName} 디자이너</p>
                                        <div className="flex items-center space-x-1 mt-1 mb-1">
                                            <span>❤️</span>
                                            <span className="text-sm">{resume.designerLike}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">{resume.designerDesc}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <p className="text-sm text-gray-500">성별 : {formatGender(resume.designerGender)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );  
}
