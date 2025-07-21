import { ChevronLeft } from "lucide-react";

export default function DetailHeader({ shopData }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 z-40 bg-white">
      {/* 왼쪽: 뒤로 가기 버튼 */}
      <div className="flex items-center">
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* 오른쪽: 영업 상태 + 시간 정보 */}
      <div className="flex items-center space-x-5">
        <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
          OPEN
        </span>
        <div>
          <p className="text-lg font-bold">
            {shopData?.shopOpenTime} ~ {shopData?.shopCloseTime}
          </p>
          <p className="text-sm text-gray-500">
            매주 <span className="text-red-500 font-semibold">월요일</span>{" "}
            정기휴무
          </p>
        </div>
      </div>
    </div>
  );
}
