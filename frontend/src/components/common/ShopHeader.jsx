import { ChevronLeft } from "lucide-react";

export default function ShopHeader({ onClick, shopData }) {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      {/* 왼쪽: 뒤로 가기 버튼 + 샵 이름 */}
      <div className="flex items-center space-x-2">
        <button
          className="p-2 rounded-full hover:bg-gray-200"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
