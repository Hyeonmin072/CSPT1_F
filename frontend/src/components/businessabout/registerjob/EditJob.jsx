import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams 추가
import Swal from "sweetalert2";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx"; // axios 인스턴스 가져오기

export default function EditJob() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        salary: "",
        gender: "",
        work: "",
        workTime: "",
        leaveTime: "",
        content: "",
    });

    // 게시글 데이터 로드
    useEffect(() => {
        console.log(id);
        if (!id) {
            Swal.fire({
                title: "오류",
                text: "잘못된 접근입니다.",
                icon: "error",
                confirmButtonText: "확인",
            });
            navigate("/searchjob"); // 목록 페이지로 이동
            return;
        }

        const fetchJobData = async () => {
            try {
                const response = await axiosInstance.get(`/shop/jobpost/${id}`);
                const data = response.data;
                
                console.log(data);
        
                setFormData({
                    title: data.title || "",
                    salary: data.salary || "",
                    gender: data.gender,
                    work: data.work,
                    workTime: data.workTime,
                    leaveTime: data.leaveTime,
                    content: data.content || "",
                });
            } catch (error) {
                console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
                Swal.fire({
                    title: "오류",
                    text: "게시글 데이터를 불러오는 중 문제가 발생했습니다.",
                    icon: "error",
                    confirmButtonText: "확인",
                });
                navigate("/searchjob");
            }
        };

        fetchJobData();
    }, [id, navigate]);

    const formatTime = (timeStr) => {
        if (!timeStr) return "";
    
        const cleanedTime = timeStr.trim(); // 앞뒤 공백 제거
    
        if (!/^\d{2}:\d{2}$/.test(cleanedTime)) return ""; // HH:mm 형식인지 확인
    
        return cleanedTime; // 브라우저가 올바른 HH:mm 형식을 유지하므로 변환 필요 없음
    };
    
    const handleTimeChange = (e) => {
        const { name, value } = e.target;
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: formatTime(value), // e.target.value 사용
        }));
    };
    
    
    const handleContentChange = (e) => {
        setFormData((next) => ({
            ...next,
            content: e.target.innerText,
        }));
    };
    

    const handeUpdateJob = async (e) => {
        e.preventDefault();
    
        try {
            const result = await Swal.fire({
                title: "게시글 수정",
                text: "정말로 게시글을 수정하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "수정하기",
                cancelButtonText: "취소",
            });
    
            if (result.isConfirmed) {
                const updatedFormData = {
                    ...formData,
                    id: id,  // id 추가
                };
    
                const response = await axiosInstance.patch(`/shop/jobpost/${id}`, updatedFormData);
                console.log("수정 응답:", response.data);
    
                await Swal.fire({
                    title: "수정 완료",
                    text: "게시글이 성공적으로 수정되었습니다.",
                    icon: "success",
                    confirmButtonText: "확인",
                });
                navigate("/searchjob");
            }
        } catch (error) {
            console.error("수정 중 오류 발생:", error);
            Swal.fire({
                title: "수정 실패",
                text: "게시글 수정 중 오류가 발생했습니다. 다시 시도해주세요.",
                icon: "error",
                confirmButtonText: "확인",
            });
        }
    
        console.log(formData);
    };
    

    return (
        <div>
            <div className="p-10 flex flex-col justify-center w-full mx-auto max-w-6xl">
                <form className="bg-white p-6 rounded-lg border h-auto space-y-4">
                    {/* 제목 */}
                    <div className="border w-full flex flex-row">
                        <div className="flex items-center px-6 whitespace-nowrap">
                            <span className="font-bold">제목</span>
                        </div>
                        <div className="border-r border-gray-300"></div>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="제목을 입력해주세요"
                        />
                    </div>

                    {/* 급여 */}
                    <div className="border w-full flex flex-row">
                        <div className="flex items-center px-6 py-2 whitespace-nowrap">
                            <span className="font-bold">급여</span>
                        </div>
                        <div className="border-r border-gray-300"></div>
                        <input
                            type="text"
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="급여를 입력해주세요"
                        />
                    </div>

                    {/* 우대성별 */}
                    <div className="w-full flex flex-col space-y-2 mt-4">
                        <div className="font-bold">우대성별</div>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="MALE"
                                    checked={formData.gender === "MALE"}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="mr-2"
                                />
                                남성
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="FEMALE"
                                    checked={formData.gender === "FEMALE"}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="mr-2"
                                />
                                여성
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="NO"
                                    checked={formData.gender === "NO"}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="mr-2"
                                />
                                성별무관
                            </label>
                        </div>
                    </div>

                    {/* 근무타입 */}
                    <div className="w-full flex flex-col space-y-2 mt-4">
                        <div className="font-bold">근무형태</div>
                        <select
                            value={formData.work}
                            onChange={(e) => setFormData({ ...formData, work: e.target.value })}
                            className="w-full border p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            <option value="">선택해주세요</option>
                            <option value="FULLTIME">정규직</option>
                            <option value="PARTTIME">계약직</option>
                        </select>
                    </div>

                    {/* 근무시간 */}
                    <div className="w-full flex flex-row items-center space-x-4">
                        <div className="flex items-center whitespace-nowrap">
                            <span className="font-bold">근무시간</span>
                        </div>
                        <div className="border-r border-gray-300"></div>
                        <input
                            type="time"
                            name="workTime"
                            value={formData.workTime}
                            onChange={handleTimeChange} // onInput → onChange 수정
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />

                        <span className="font-bold">-</span>

                        <input
                            type="time"
                            name="leaveTime"
                            value={formData.leaveTime}
                            onChange={handleTimeChange} // onInput → onChange 수정
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />


                    </div>

                    {/* 내용 */}
                    <div className="w-full flex flex-col space-y-2 mt-4">
                        <div className="font-bold">내용</div>
                        <input
                            value={formData.content}
                            type="text"
                            name = "content"
                            onChange={(e) => setFormData({ ...formData, content:e.target.value })}
                            className="w-full h-auto p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="내용을 입력해주세요"
                        />
                    </div>



                    {/* 등록 버튼 */}
                    <div className="flex w-full justify-end mb-4 px-4 space-x-4">
                        <button
                            type="submit"
                            className={`w-[130px] px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-md`}
                            onClick={handeUpdateJob}
                        >
                            수정하기
                        </button>
                        <button
                            type="button"
                            className="w-[130px] px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 shadow-md"
                            onClick={() => navigate("/searchjob")}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}