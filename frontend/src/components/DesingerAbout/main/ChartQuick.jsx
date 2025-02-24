import { ChartSpline } from "lucide-react";

export default function ChartQuick({ handleChart }){
    return (
        <div className="flex items-center w-[260px]" onClick={handleChart}>
            <div className="w-12 h-12 rounded-full mb-4 bg-[#00E7D5] flex items-center justify-center">
                <ChartSpline className="w-[30px] h-[30px] text-white"/>
            </div>
            <div className="ml-4 py-1">
                <p className="text-l text-gray-400 font-bold">오늘 매출</p>
                <p className="text-xl text-gray-700 font-bold">15,000원</p>
            </div>
        </div>
    );
}