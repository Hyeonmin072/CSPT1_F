import { ChevronLeft } from "lucide-react";

export default function MenuHeader(){
    return (
        <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-2">
                <button
                    className="p-2 rounded-full hover:bg-gray-200"
                    onClick={() => window.history.back()}
                >
                    <ChevronLeft className="w-5 h-5"/>
                </button>

                <span className="bg-teal-100 text-black px-5 py-2 rounded-lg text-sm font-semibold">
                    날짜 선택
                </span>

            </div>
        </div>
    );
}