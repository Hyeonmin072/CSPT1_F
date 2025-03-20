import { NotebookText, ChevronRight, Check, Star } from 'lucide-react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Notice(){
    const [hairSalon, setHairSalon] = useState(null); // 소속된 헤어샵 정보 상태
    const [notices, setNotices] = useState({ weekNotice: null, importantNotice: null }); // 공지사항 상태
    const [selectedNotice, setSelectedNotice] = useState(null); // 선택된 공지사항
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 더미 데이터
    const dummyHairSalon = "1"; // 소속된 헤어샵 ID
    const dummyNotices = {
        weekNotice: {
            title: "이번 주 영업시간 변경 안내",
            content: "이번 주말은 10시부터 6시까지 영업합니다."
        },
        importantNotice: {
            title: "추석 연휴 공지",
            content: "추석 연휴 동안 가게 운영 시간은 별도로 공지될 예정입니다."
        },
    };

    // 데이터 가져오기
    useEffect(() => {
        const fetchNoticeData = async () => {
            try {
                // 실제 API 호출 시 아래 코드 활성화
                // const response = await fetch("/api/notice");
                // const data = await response.json();

                // 지금은 더미 데이터 사용
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

    const handleClick = (noticeType) => {
        setSelectedNotice(noticeType);
    };

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    return (
        <div className="border mx-20 w-full flex h-full rounded-lg bg-white">
            {hairSalon ? (
                <>
                    <div className="flex flex-col bg-gray-200 text-xl font-bold w-[300px] pt-6">
                        <div className="flex justify-center items-start">
                            <div className="flex items-center mb-5">
                                <NotebookText/>
                                <p className="ml-2">가게 공지사항</p>
                            </div>
                        </div>

                        <div className="flex justify-start mt-4">
                            <div
                                className={`flex bg-[#70EFDE] rounded-lg items-center justify-between border border-[#70EFDE] w-[180px] h-[50px] cursor-pointer transition-all duration-300 
                                    ${selectedNotice === "weekNotice" ? "shadow-inner shadow-[#00B0A3] inset-1" : "shadow-lg"}`}
                                onClick={() => handleClick("weekNotice")}
                            >
                                <Check className="ml-2"/>
                                <p className="font-semibold text-sm">이번주 공지사항</p>
                                <ChevronRight className="mr-4"/>
                            </div>
                        </div>

                        <div className="flex justify-start mt-4">
                            <div
                                className={`flex bg-[#00D7C6] rounded-lg items-center justify-between border border-[#70EFDE] w-[180px] h-[50px] cursor-pointer
                                    ${selectedNotice === "importantNotice" ? "shadow-inner shadow-[#00B0A3]" : "shadow-lg"}`}
                                onClick={() => handleClick("importantNotice")}
                            >
                                <Star className="ml-2"/>
                                <p className="font-semibold text-sm">중요 공지사항</p>
                                <ChevronRight className="mr-4"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center w-full p-4">
                        <div className="flex flex-col items-center w-full">
                            {selectedNotice === "weekNotice" && (
                                <>
                                    <div
                                        className="flex bg-[#B9FFF6] rounded-lg items-center justify-center border border-[#70EFDE] w-[470px] h-[40px] mb-4">
                                        <p className="font-bold text-xl">이번주 공지사항</p>
                                    </div>
                                    <Link to="/week-notice"
                                          className="flex rounded-lg items-center justify-between border w-[470px] h-[60px] mb-4">
                                        <p className="ml-10 font-bold text-xl">{notices.weekNotice.title}</p>
                                        <ChevronRight className="mr-4"/>
                                    </Link>
                                </>
                            )}

                            {selectedNotice === "importantNotice" && (
                                <>
                                    <div
                                        className="flex bg-[#FFB3B3] rounded-lg items-center justify-center border border-[#FF6666] w-[470px] h-[40px] mb-4">
                                        <p className="font-bold text-xl">{notices.importantNotice.title}</p>
                                    </div>
                                    <Link to="/important-notice"
                                          className="flex rounded-lg items-center justify-between border w-[470px] h-[60px] mb-4">
                                        <p className="ml-10 font-bold text-xl">중요 공지사항 내용</p>
                                        <ChevronRight className="mr-4"/>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex flex-col bg-gray-200 text-xl font-bold w-[300px] pt-6">
                        <div className="flex justify-center items-start">
                            <div className="flex items-center mb-5">
                                <NotebookText/>
                                <p className="ml-2">가게 공지사항</p>
                            </div>
                        </div>

                        <div className="flex justify-start mt-4">
                            <div
                                className={`flex bg-[#70EFDE] rounded-lg items-center justify-between border border-[#70EFDE] w-[180px] h-[50px] cursor-pointer transition-all duration-300 
                                    ${selectedNotice === "weekNotice" ? "shadow-inner shadow-[#00B0A3] inset-1" : "shadow-lg"}`}
                                onClick={() => handleClick("weekNotice")}
                            >
                                <Check className="ml-2"/>
                                <p className="font-semibold text-sm">이번주 공지사항</p>
                                <ChevronRight className="mr-4"/>
                            </div>
                        </div>

                        <div className="flex justify-start mt-2">
                            <div
                                className={`flex bg-[#00D7C6] rounded-lg items-center justify-between border border-[#70EFDE] w-[180px] h-[50px] cursor-pointer
                                    ${selectedNotice === "importantNotice" ? "shadow-inner shadow-[#00B0A3]" : "shadow-lg"}`}
                                onClick={() => handleClick("importantNotice")}
                            >
                                <Star className="ml-2"/>
                                <p className="font-semibold text-sm">중요 공지사항</p>
                                <ChevronRight className="mr-4"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px]">
                        <p className="flex items-center justify-center text-xl font-bold text-gray-500">소속된 헤어샵이
                            없습니다.</p>
                    </div>
                </>
            )}
        </div>
    );
}