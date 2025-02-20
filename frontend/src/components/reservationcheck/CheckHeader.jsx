import ReservationSearch from "./ReservationSearch.jsx";
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export default function CheckHeader({ selectedYear, setSelectedYear, searchTerm, setSearchTerm }){
    const [isOpen, setIsOpen] = useState(false);

    const years = ["2024", "2025", "2026"];

    return(
        <>
            <div className="w-2/4 flex items-center justify-center ml-10">
                <div className="relative w-48">
                    {/* 드롭다운 버튼 */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-between border py-2 px-3 mx-10 rounded-lg"
                    >
                        {/* 년도 선택 제목과 선택된 년도 */}
                        <div className="flex flex-col items-start">
                            <span className="text-xs text-gray-500">년도 선택</span>
                            <span className="text-xs font-semibold">{selectedYear || "년도"}</span>
                        </div>

                        {/* 드롭다운 아이콘 */}
                        <span
                            className={`ml-[10px] transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                            {isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                        </span>
                    </button>

                    {/* 드롭다운 메뉴 */}
                    {isOpen && (
                        <div className="absolute w-[190px] mt-2 bg-white border rounded-lg shadow-lg z-10">
                            {years.map((year) => (
                                <div
                                    key={year}
                                    onClick={() => {
                                        setSelectedYear(year);
                                        setIsOpen(false);
                                    }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {year}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>


            <div className="flex justify-center w-full">
                <div className="w-2/4 flex justify-center">
                    <ReservationSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </div>
            </div>
        </>
    );
}