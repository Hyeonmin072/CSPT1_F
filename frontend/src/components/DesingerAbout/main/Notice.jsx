import { NotebookText, ChevronRight, Check, Star } from 'lucide-react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axiosInstance from '../../sign/axios/AxiosInstance.jsx';

import { dummyNotices } from "../../dummydata/DummyNotice.jsx";

export default function Notice() {
    const [hairSalon, setHairSalon] = useState(""); // 소속된 헤어샵이 있는가
    const [notices, setNotices] = useState({ weekNotice: [], importantNotice: [] }); // 공지사항 안의 목록들
    const [selectedNotice, setSelectedNotice] = useState(null); // 선택된 공지사항
    const [loading, setLoading] = useState(true); 

    // 더미 데이터
    const dummyHairSalon = "1"; // 소속된 헤어샵 ID

    // 데이터 가져오기
    useEffect(() => {
        const fetchNoticeData = async () => {
            try {
                // const response = await axiosInstance.get("/notice"); // 이후 변경
                // const data = response.data; 
                setHairSalon(dummyHairSalon);
                setNotices(dummyNotices);
            } catch (error) {
                console.error("Error fetching notice data:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchNoticeData();
    }, []);

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    return (
        <div className="mx-20 w-full flex flex-col h-[570px] rounded-lg bg-gray-100 border p-6">
            {hairSalon ? (
                <>
                    {/* 헤더 */}
                    <div className="flex justify-between items-center flex-wrap">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">공지사항</h2>
                        <h2 className="border border-b w-full mb-2"></h2>
                    </div>
    
                    <div className="flex flex-col lg:flex-row gap-4 h-full">
                        {/* 사이드 메뉴 */}
                        <div className="flex flex-col w-full lg:w-1/4">
                            <button
                                className={`flex items-center justify-between w-full p-2 py-4 rounded-lg transition-all duration-300 ${
                                    selectedNotice?.type === "weekNotice"
                                        ? "bg-green-200 text-green-700 shadow-[inset_0_2px_6px_rgba(4,109,90,0.3)]"
                                        : "bg-gray-100 hover:bg-gray-300"
                                }`}
                                onClick={() => setSelectedNotice({ type: "weekNotice" })}
                            >
                                <span className="flex items-center">
                                    <Check className="w-5 h-5 mr-2 text-green-600" />
                                    이번주 공지사항
                                </span>
                                <ChevronRight className="text-gray-500" />
                            </button>
                            <button
                                className={`flex items-center justify-between w-full p-2 py-4 rounded-lg mt-3 transition-all duration-300 ${
                                    selectedNotice?.type === "importantNotice"
                                        ? "bg-red-100 text-red-700 shadow-[inset_0_2px_6px_rgba(210,0,0,0.3)]"
                                        : "bg-gray-100 hover:bg-gray-300"
                                }`}
                                onClick={() => setSelectedNotice({ type: "importantNotice" })}
                            >
                                <span className="flex items-center">
                                    <Star className="w-5 h-5 mr-2 text-red-600" fill="currentColor" />
                                    중요 공지사항
                                </span>
                                <ChevronRight className="text-gray-500" />
                            </button>
                        </div>
    
                        {/* 공지사항 목록 */}
                        <div className="flex flex-col bg-gray-50 rounded-lg shadow p-4 w-full lg:w-3/4 max-h-[480px] overflow-y-auto">
                            {/* 선택된 공지사항 유형에 따라 헤더 표시 */}
                            {selectedNotice?.type === "weekNotice" && (
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-green-700">이번주 공지사항</h3>
                                </div>
                            )}
                            {selectedNotice?.type === "importantNotice" && (
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-red-700">중요 공지사항</h3>
                                </div>
                            )}

                            {/* 선택된 공지사항 유형에 따라 목록 표시 */}
                            {selectedNotice?.type && (
                                <div className="flex flex-col gap-4">
                                    {(selectedNotice.type === "weekNotice"
                                        ? notices.weekNotice
                                        : notices.importantNotice
                                    ).map((notice) => (
                                        <Link
                                            key={notice.id}
                                            to="/notice"
                                            state={notice}
                                            className="flex items-center border justify-between p-4 bg-gray-50 rounded shadow hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <div className="flex flex-col">
                                                <p className="text-gray-800 font-medium">{notice.title}</p>
                                                <p className="text-xs text-gray-400">{notice.date}</p>
                                            </div>
                                            <ChevronRight className="text-gray-500" />
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* 선택된 공지사항이 없을 때 빈 상태 표시 */}
                            {!selectedNotice?.type && (
                                <div className="text-center text-gray-500">
                                    <p>공지사항 유형을 선택해주세요.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                // 헤어샵 없음 상태
                <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px]">
                    <p className="text-lg font-semibold text-gray-500">소속된 헤어샵이 없습니다.</p>
                </div>
            )}
        </div>
    );
}
