import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Check, MapPin, CalendarCheck, ChevronLeft } from "lucide-react";
import axiosInstance from "../../../sign/axios/AxiosInstance";

export default function GetJobDetail() {
    const navigate = useNavigate();
    const { id } = useParams(); // URL 파라미터에서 id 추출
    const [jobData, setJobData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/designer/job/post/${id}`);
                setJobData(response.data);
            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!jobData) {
        return <p className="text-center text-gray-500 mt-20">데이터를 불러오는 중입니다...</p>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 mt-20">
            {/* Header */}
            <header className="flex flex-row justify-between mb-8 text-center">
                <ChevronLeft className="h-10 w-10 cursor-pointer text-gray-600 hover:text-gray-800"
                 aria-label="뒤로가기"
                onClick={() => window.history.back()}/>
                <h1 className="text-3xl font-bold text-gray-800">구인구직 상세정보</h1>
                <div> &nbsp; </div>
            </header>

            {/* 직업 정보 */}
            <section className="bg-white border shadow rounded-lg mb-10 p-6">
                <div className="flex">
                    {/* 왼쪽 */}
                    <div className="w-1/3 bg-gray-100 rounded-lg overflow-hidden">
                        {jobData.imageUrl ? (
                            <img
                                src={jobData.imageUrl}
                                alt={`${jobData.shopName} 이미지`}
                                className="w-full h-[200px] object-cover"
                            />
                        ) : (
                            <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">이미지 없음</span>
                            </div>
                        )}
                        <div className="p-5 font-semibold">
                            <ul className="text-sm text-gray-500">
                                <li>가게 이름: {jobData.shopName || "정보 없음"}</li>
                                <li>근무 지역: {jobData.address || "정보 없음"}</li>
                                <li>담당자: {jobData.gender || "정보 없음"}</li>
                            </ul>
                        </div>
                        <div className="p-3 flex flex-col">
                            <button
                                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                onClick={() => navigate("/job/detail/cv")}
                            >
                                즉시지원
                            </button>
                        </div>
                    </div>

                    {/* 오른쪽 */}
                    <div className="w-2/3 px-5">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {jobData.title || "제목 없음"}
                        </h2>
                        <p className="text-gray-600 mb-4">{jobData.content || "소개 정보 없음"}</p>
                        <div className="border-t mb-4"></div>
                        <div className="flex flex-row mb-4">
                            <h2 className="font-bold w-1/3">근무 형태</h2>
                            <p className="w-2/3">{jobData.work === "FULLTIME" ? "정규직" : job.work === "PARTTIME" ? "계약직" : "정보 없음"}</p>
                        </div>
                        <div className="flex flex-row mb-4">
                            <h2 className="font-bold w-1/3">급여</h2> 
                            <p className="w-2/3">{jobData.salary || "정보 없음"}</p>
                        </div>
                        <div className="flex flex-row mb-4">
                            <h2 className="font-bold w-1/3">우대성별</h2> 
                            <p className="w-2/3">{jobData.gender || "정보 없음"}</p>
                        </div>
                        <div className="flex flex-row mb-4">
                            <h2 className="font-bold w-1/3">근무 시간</h2>
                            <p className="w-2/3">
                                {jobData.workTime || "정보 없음"} - {jobData.leaveTime || "정보 없음"}
                            </p>
                        </div>
                        <div className="flex flex-row mb-4">
                            <h2 className="font-bold w-1/3">등록된 시간</h2>
                            <p className="w-2/3">{jobData.postedAgo || "정보 없음"}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 내용 */}
            <section>
                <div className="bg-white p-6 shadow border rounded-lg mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">내용</h2>
                    <div className="flex flex-col gap-4">
                        <div className="border p-4 rounded-lg bg-gray-50 min-h-[200px]">
                            {jobData.content ? (
                                <p className="text-gray-700">{jobData.content}</p>
                            ) : (
                                <p className="text-gray-500">내용이 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 근무 지역 */}
            <section className="bg-white mb-6 p-6 shadow border rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">근무 지역</h2>
                <div className="w-full h-[400px]">
                    <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            jobData.address || "대한민국"
                        )}&output=embed`}
                        width="100%"
                        height="100%"
                        title="Workplace Location"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </section>

            {/* 모집 방법 */}
            <section className="bg-white p-6 shadow border rounded-lg min-h-[250px]">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">모집 방법</h2>
                <div className="flex flex-row min-h-[150px]">
                    <div className="w-1/3 bg-gray-100 rounded-lg flex items-center justify-center">
                        <CalendarCheck className="w-16 h-16 text-green-600" strokeWidth={1} />
                    </div>
                    <div className="w-2/3 px-4 flex items-center justify-center">
                        <p className="text-m text-gray-700">
                            모집 방법 및 상세 내용은 지원 페이지에서 확인하세요.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}