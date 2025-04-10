import { NotebookText, ChevronRight, Check, Star } from 'lucide-react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const dummyNotices = {
    weekNotice: [
        { id: 1, title: "이번 주 영업시간 변경 안내", content: "이번 주말은 10시부터 6시까지 영업합니다.", date: "2025-03-18" },
        { id: 2, title: "주말 워크숍 안내", content: "이번 주 워크숍이 3월 19일에 열립니다.", date: "2025-03-19" },
    ],
    importantNotice: [
        { id: 1, title: "추석 연휴 공지", content: "추석 연휴 동안 가게 운영 시간은 별도로 공지될 예정입니다.", date: "2025-09-25" },
        { id: 2, title: "시스템 점검 안내", content: "시스템 점검이 9월 30일에 진행될 예정입니다.", date: "2025-09-30" },
    ],
};


export default function Notice() {
    const [hairSalon, setHairSalon] = useState(null); // 소속된 헤어샵 정보 상태
    const [notices, setNotices] = useState({ weekNotice: [], importantNotice: [] }); // 공지사항 상태
    const [selectedNotice, setSelectedNotice] = useState(null); // 선택된 공지사항
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 더미 데이터
    const dummyHairSalon = "1"; // 소속된 헤어샵 ID

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

    const handleClick = (noticeType, noticeItem) => {
        setSelectedNotice({ type: noticeType, ...noticeItem });
    };

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    return (
        <div className="border mx-20 w-full flex h-[580px] rounded-lg bg-white">
            {hairSalon ? (
                <>
                    {/* 사이드 메뉴 */}
                    <div className="flex flex-col bg-gray-200 text-xl font-bold w-[300px] pt-6">
                        <div className="flex justify-center items-start">
                            <div className="flex items-center mb-5">
                                <NotebookText />
                                <p className="ml-2">가게 공지사항</p>
                            </div>
                        </div>

                        <div className="flex justify-start mt-4">
                            <div
                                className={`flex bg-[#70EFDE] rounded-lg items-center justify-between border border-[#70EFDE] w-[180px] h-[50px] cursor-pointer transition-all duration-300 
                                    ${selectedNotice?.type === "weekNotice" ? "shadow-inner shadow-[#00B0A3] inset-1" : "shadow-lg"}`}
                                onClick={() => setSelectedNotice({ type: "weekNotice" })}
                            >
                                <Check className="ml-2" />
                                <p className="font-semibold text-sm">이번주 공지사항</p>
                                <ChevronRight className="mr-4" />
                            </div>
                        </div>

                        <div className="flex justify-start mt-4">
                            <div
                                className={`flex bg-[#00D7C6] rounded-lg items-center justify-between border border-[#70EFDE] w-[180px] h-[50px] cursor-pointer
                                    ${selectedNotice?.type === "importantNotice" ? "shadow-inner shadow-[#00B0A3]" : "shadow-lg"}`}
                                onClick={() => setSelectedNotice({ type: "importantNotice" })}
                            >
                                <Star className="ml-2" />
                                <p className="font-semibold text-sm">중요 공지사항</p>
                                <ChevronRight className="mr-4" />
                            </div>
                        </div>
                    </div>

                    {/* 공지사항 목록 */}
                    <div className="flex justify-center w-full p-4">
                        <div className="flex flex-col items-center w-full">
                            {/* 헤더: 선택된 타입이 weekNotice일 때만 표시 */}
                            {selectedNotice?.type === "weekNotice" && (
                                <div
                                    className="flex bg-[#B9FFF6] rounded-lg items-center justify-center border border-[#70EFDE] w-[470px] h-[40px] mb-4"
                                >
                                    <p className="font-bold text-xl">이번주 공지사항</p>
                                </div>
                            )}

                            {/* 공지사항 목록 */}
                            {selectedNotice?.type === "weekNotice" &&
                                notices.weekNotice.map((notice) => (
                                    <Link
                                        key={notice.id}
                                        to="/notice"
                                        state={notice} // Notice 데이터를 전달
                                        className="flex rounded-lg items-center justify-between border w-[470px] h-[60px] mb-4 cursor-pointer"
                                    >
                                        <p className="ml-10 font-bold text-xl">{notice.title}</p>
                                        <ChevronRight className="mr-4"/>
                                    </Link>
                                ))}

                            {selectedNotice?.type === "importantNotice" && (
                                <div
                                    className="flex bg-[#FFB3B3] rounded-lg items-center justify-center border border-[#FF6666] w-[470px] h-[40px] mb-4"
                                >
                                    <p className="font-bold text-xl">중요 공지사항</p>
                                </div>
                            )}

                            {selectedNotice?.type === "importantNotice" &&
                                notices.importantNotice.map((notice) => (
                                    <Link
                                        key={notice.id}
                                        to="/notice"
                                        state={notice} // Notice 데이터를 전달
                                        className="flex rounded-lg items-center justify-between border w-[470px] h-[60px] mb-4 cursor-pointer"
                                    >
                                        <p className="ml-10 font-bold text-xl">{notice.title}</p>
                                        <ChevronRight className="mr-4"/>
                                    </Link>
                                ))}
                        </div>

                    </div>
                </>
            ) : (
                // 헤어샵 없음 상태
                <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px]">
                    <p className="text-xl font-bold text-gray-500">소속된 헤어샵이 없습니다.</p>
                </div>
            )}
        </div>
    );
}
