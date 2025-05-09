import { useNavigate } from "react-router-dom";
import React , { useState, useEffect } from "react";
import { Check,MapPin, CalendarCheck } from "lucide-react";

import h1 from "../../../../assets/hairshop/h1.jpg";
import axiosInstance from "../../../sign/axios/AxiosInstance";

export default function GetJobDetail() {
    const navigate = useNavigate();
    const [shopdata, setShopData] = useState({
        image: "",
        name: "",
        designername: "",
        telephone: "",
        location: "",
        rightmiddle: [
            {
                model1: "",
                model2: "",
                model3: "",
            },
        ],
        rightend: [
            {
                time: "",
                period: "",
                gender: "",
                preferential: "",
                week: "",
            },
        ],
        jobDetails: [],
        leftstart: [
            { location: "" },
        ],
        recruitment: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/job/post");
                const data = await response.json();

                setShopData(data.shopdata);
            } catch (error) {
                console.error("데이터 불러오기 실패:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6 mt-20">
            {/* Header */}
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800">구인구직 상세정보</h1>
            </header>

            {/* 직업 정보 */}
            <section className="bg-white border shadow rounded-lg mb-10">
                <div className="flex">
                    {/* 왼쪽 */}
                    <div className="w-1/3 bg-gray-100 rounded-lg overflow-hidden">
                        {shopdata.image ? (
                            <img
                                src={shopdata.image}
                                alt={`${shopdata.name} 이미지`}
                                className="w-full h-[200px] object-cover"
                            />
                        ) : (
                            <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400">이미지 없음</span>
                            </div>
                        )}
                        <div className="p-5 font-semibold">
                            <ul className="text-sm text-gray-500">
                                <li>담당자: {shopdata.designername || "정보 없음"}</li>
                                <li className="pb-4">연락처: {shopdata.telephone || "정보 없음"}</li>
                                <li>근무 지역: {shopdata.location || "정보 없음"}</li>
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
                    <div className="w-2/3 px-5 pt-4">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            {shopdata.name || "업체명 없음"}
                        </h2>
                        <div className="border-t mb-4"></div>

                        <div className="flex flex-row mb-6">
                            <h2 className="w-1/3 font-bold">모집 분야</h2>
                            <div className="flex flex-col text-sm">
                                {shopdata.rightmiddle.length > 0 ? (
                                    shopdata.rightmiddle.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <p>{item.model1}</p>
                                            <p>{item.model2}</p>
                                            <p>{item.model3}</p>
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <p className="text-gray-500">모집 정보가 없습니다.</p>
                                )}
                            </div>
                        </div>

                        <div className="border-t mb-4"></div>

                        {shopdata.rightend.length > 0 ? (
                            shopdata.rightend.map((right, index) => (
                                <div key={index} className="mb-4">
                                    <div className="flex flex-row mb-2">
                                        <h2 className="font-bold w-1/3">근무시간</h2>
                                        <p className="w-2/3">{right.time || "정보 없음"}</p>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <h2 className="font-bold w-1/3">마감일</h2>
                                        <p className="w-2/3">{right.period || "정보 없음"}</p>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <h2 className="font-bold w-1/3">성별</h2>
                                        <p className="w-2/3">{right.gender || "정보 없음"}</p>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <h2 className="font-bold w-1/3">우대조건</h2>
                                        <p className="w-2/3">{right.preferential || "정보 없음"}</p>
                                    </div>
                                    <div className="flex flex-row mb-2">
                                        <h2 className="font-bold w-1/3">근무요일</h2>
                                        <p className="w-2/3">{right.week || "정보 없음"}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">근무 조건 정보가 없습니다.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* 상세 요강 */}
            <section className="pt-4 mb-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">상세 요강</h2>
                <div className="bg-white shadow border rounded-lg p-6 h-auto">
                    <div className="pb-5">
                        <div className="p-3 flex flex-row">
                            <Check />
                            <p className="px-2">모집부분</p>
                        </div>
                        {shopdata.jobDetails.length > 0 ? (
                            <table className="w-full table-auto text-left">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2">직종</th>
                                        <th className="px-4 py-2">모집인원</th>
                                        <th className="px-4 py-2">경력</th>
                                        <th className="px-4 py-2">학력</th>
                                        <th className="px-4 py-2">급여</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shopdata.jobDetails.map((job, index) => (
                                        <tr key={index} className="border-b-2">
                                            <td className="border-r-2 px-4 py-2">{job.position || "정보 없음"}</td>
                                            <td className="border-r-2 px-4 py-2">{job.personnel || "정보 없음"}</td>
                                            <td className="border-r-2 px-4 py-2">{job.experience || "정보 없음"}</td>
                                            <td className="border-r-2 px-4 py-2">{job.education || "정보 없음"}</td>
                                            <td className="px-4 py-2">{job.salary || "정보 없음"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">모집 정보가 없습니다.</p>
                        )}
                    </div>

                    <div>
                        {shopdata.recruitment.length > 0 ? (
                            shopdata.recruitment.map((shop, index) => (
                                <div key={index}>
                                    <div className="pb-5">
                                        <div className="p-3 flex flex-row">
                                            <Check />
                                            <p className="px-2">접수 방법</p>
                                        </div>
                                        <div className="px-3">{shop.method || "정보 없음"}</div>
                                    </div>

                                    <div className="pb-5">
                                        <div className="p-3 flex flex-row">
                                            <Check />
                                            <p className="px-2">상세 내용</p>
                                        </div>
                                        <div className="px-3">{shop.introduce || "정보 없음"}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">접수 방법 정보가 없습니다.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* 근무 지역 */}
            <section className="bg-white mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">근무 지역</h2>
                <div className="w-full h-[400px] bg-white shadow border rounded-lg p-6">
                    <div className="pb-3 flex flex-row items-center">
                        <MapPin className="text-green-600" />
                        {shopdata.leftstart.length > 0 ? (
                            shopdata.leftstart.map((leftside, index) => (
                                <div key={index} className="px-2 text-gray-700">
                                    {leftside.location || "정보 없음"}
                                </div>
                            ))
                        ) : (
                            <p className="px-2 text-gray-500">근무 지역 정보가 없습니다.</p>
                        )}
                    </div>
                    <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            shopdata.location || "대한민국"
                        )}&output=embed`}
                        width="100%"
                        height="90%"
                        title="Workplace Location"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </section>

            {/* 지원 방법 */}
            <section className="bg-white">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">모집 방법</h2>
                <div className="flex flex-row shadow rounded-lg border h-[200px]">
                    <div className="w-1/3 bg-[#E7E7E7] rounded">
                        <div className="flex flex-col items-center justify-center h-full">
                            <CalendarCheck className="w-24 h-24 text-green-600" strokeWidth={1} />
                            <div className="p-2 font-semibold">모집 방법</div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center w-2/3 font-semibold">
                        {shopdata.recruitment.length > 0 ? (
                            shopdata.recruitment.map((item, index) => (
                                <ul key={index} className="text-sm text-gray-700 w-full px-4">
                                    <li className="flex flex-row pb-2">
                                        <p className="w-1/3 font-bold">접수 방법</p>
                                        <p>{item.method || "정보 없음"}</p>
                                    </li>
                                    <li className="flex flex-row pb-2">
                                        <p className="w-1/3 font-bold">상세 내용</p>
                                        <p>{item.introduce || "정보 없음"}</p>
                                    </li>
                                </ul>
                            ))
                        ) : (
                            <p className="text-gray-500 px-4">모집 방법 정보가 없습니다.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
