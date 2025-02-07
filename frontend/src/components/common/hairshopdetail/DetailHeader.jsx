import { ChevronLeft } from "lucide-react";

export default function ShopHeader() {
    return (
        <div className="flex items-center justify-between px-4 py-2">
            {/* 왼쪽: 뒤로 가기 버튼 + 샵 이름 */}
            <div className="flex items-center space-x-2">
                <button
                    className="p-2 rounded-full hover:bg-gray-200"
                    onClick={() => window.history.back()}
                >
                    <ChevronLeft className="w-5 h-5"/>
                </button>

                <span className="bg-teal-100 text-black px-5 py-2 rounded-lg text-sm font-semibold">
            프랜차이즈 2호선아지랑점
        </span>
            </div>

            {/* 오른쪽: 영업 상태 + 시간 정보 */}
            <div className="flex items-center space-x-2">
        <span className="bg-teal-200 text-teal-700 px-2 py-1 rounded-full text-xs font-bold">
            OPEN
        </span>
                <div>
                    <p className="text-lg font-bold">10:00 ~ 21:00</p>
                    <p className="text-sm text-gray-500">
                        매주 <span className="text-red-500 font-semibold">월요일</span> 정기휴무
                    </p>
                </div>
            </div>
        </div>
    );
}
