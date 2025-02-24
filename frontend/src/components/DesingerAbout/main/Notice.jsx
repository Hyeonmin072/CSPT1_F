import { NotebookText, ChevronRight, Check, Star } from 'lucide-react';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Notice(){
    //const hairSalon = null;
    const hairSalon = "1";

    const [selectedNotice, setSelectedNotice] = useState(null);

    const handleClick = (noticeType) => {
        setSelectedNotice(noticeType);
    };

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
                                        <p className="ml-10 font-bold text-xl">공지사항</p>
                                        <ChevronRight className="mr-4"/>
                                    </Link>
                                </>
                            )}

                            {selectedNotice === "importantNotice" && (
                                <>
                                    <div
                                        className="flex bg-[#FFB3B3] rounded-lg items-center justify-center border border-[#FF6666] w-[470px] h-[40px] mb-4">
                                        <p className="font-bold text-xl">중요 공지사항</p>
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