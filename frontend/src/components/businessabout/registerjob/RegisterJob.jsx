import { useState } from "react";
import axiosInstance from "../../../axios/AxiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function RegisterJobPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        salary: "",
        gender: "",
        work: "",
        workTime: "",
        leaveTime: "",
        content: "",
    });

    // 모든 필드가 채워졌는지 확인하는 함수
    const isFormValid = () => {
        return (
            formData.title &&
            formData.salary &&
            formData.gender &&
            formData.work &&
            formData.workTime &&
            formData.leaveTime &&
            formData.content
        );
    };

    const formatTime = (timeValue) => {
        if (!timeValue) return "";
    
        const [hours, minutes] = timeValue.split(":").map(Number);
    
        // 앞에 0을 붙이는 minutes 처리
        const formattedMinutes = minutes === 0 ? "00" : minutes.toString().padStart(2, "0");
    
        // 오전 시간 제한 (01:00 ~ 12:00)
        if (hours >= 1 && hours <= 12) return `0${hours}:${formattedMinutes}`;
    
        // 오후 시간 제한 (13:00 ~ 00:00)
        if (hours >= 13 || hours === 0) return `${hours}:${formattedMinutes}`;
        
        return `${hours.toString().padStart(2, "0")}:${formattedMinutes}`;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("데이터 :", formData);

        try {
            const result = await Swal.fire({
                title: "게시글 등록",
                text: "정말로 게시글을 등록하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "등록하기",
                cancelButtonText: "취소",
            });

            if (result.isConfirmed) {
                const response = await axiosInstance.post("/shop/jobpost", formData);
                console.log("등록 응답:", response.data);

                await Swal.fire({
                    title: "등록 완료",
                    text: "게시글이 성공적으로 등록되었습니다.",
                    icon: "success",
                    confirmButtonText: "확인",
                });
                navigate("/searchjob");
            }
        } catch (error) {
            console.error("등록 중 오류 발생:", error);
            Swal.fire({
                title: "등록 실패",
                text: "게시글 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        }
    };

    const handleContentChange = (e) => {
        const updateContent = e.target.innerHTML;
        setFormData({ ...formData, content: updateContent});
    }

    return (
        <div>
            <div className="p-10 mt-20 flex flex-col justify-center w-full mx-auto max-w-6xl">
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
                        <div className="flex items-center space-x-2">
                            <input
                                type="time"
                                value={formData.workTime}
                                onChange={(e) => setFormData({ ...formData, workTime: formatTime(e.target.value) })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                                placeholder="출근 시간을 입력해주세요"
                            />
                            <span className="font-bold">-</span>
                            <input
                                type="time"
                                value={formData.leaveTime}
                                onChange={(e) => setFormData({ ...formData, leaveTime: formatTime(e.target.value) })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                                placeholder="퇴근 시간을 입력해주세요"
                            />
                        </div>
                    </div>

                    {/* 내용 */}
                    <div className="w-full flex flex-col space-y-2 mt-4">
                        <div className="font-bold">내용</div>
                        <div
                            value={formData.content}
                            contentEditable = "true"
                            name = "content"
                            onInput={handleContentChange}
                            className="w-full h-auto p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                            placeholder="내용을 입력해주세요"
                        />
                    </div>

                    {/* 등록 버튼 */}
                    <div className="flex w-full justify-end mb-4 px-4 space-x-4">
                        <button
                            type="submit"
                            className={`w-[130px] px-4 py-2 rounded-lg text-white shadow-md ${
                                isFormValid()
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-gray-300 cursor-not-allowed"
                            }`}
                            onClick={(e) => handleSubmit(e)}
                            disabled={!isFormValid()} // 버튼 비활성화
                        >
                            등록하기
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