import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Search Bar */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm py-2 px-4">
        <span className="text-sm">서울 역삼동</span>
        <div className="flex-1 flex items-center justify-between max-w-xl mx-8">
          <input
            type="text"
            placeholder="가게 이름 검색"
            className="w-full px-4 outline-none"
          />
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Image Slider */}
      <div className="relative h-[400px] w-full mt-4 rounded-lg overflow-hidden">
        <img
          src="/api/placeholder/1200/400"
          alt="Shop preview"
          className="w-full h-full object-cover"
        />
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Shop Details */}
      <div className="mt-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-[#E8F7F3] rounded-full" />
          <div>
            <h1 className="text-lg font-bold">HAIRSHOP</h1>
            <p className="text-sm text-gray-500">Subject</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-base font-medium">Description</h2>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-medium">예약하기</h2>
            <button className="px-2">⋮</button>
          </div>
        </div>
      </div>
    </div>
  );
}
