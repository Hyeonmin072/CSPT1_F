import {
  Search,
  ChevronLeft,
  ChevronRight,
  LocateFixed,
  MapPin,
} from "lucide-react";
import h1 from "../../assets/hairshop/h1.jpg";

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="flex justify-center w-full mb-4">
        <div className="flex items-center bg-white rounded-lg shadow-sm py-2 px-4 w-[700px]">
          {/* 위치 정보 */}
          <div className="flex items-center">
            <MapPin className="w-5 h-5" />
            <span className="text-sm mx-2">서울 역삼동</span>
            <LocateFixed className="w-5 h-5 bg-red-200 rounded-full p-1" />
          </div>

          {/* 구분선 */}
          <div className="mx-4 h-6 w-px bg-gray-200"></div>

          {/* 검색 입력창 */}
          <div className="flex-1 flex items-center">
            <input
              type="text"
              placeholder="가게 이름 검색"
              className="w-full outline-none"
            />
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="mt-4 border rounded-lg w-[1000px]">
          {/* Image Slider */}
          <div className="relative h-[250px] w-full">
            <img
              src={h1}
              alt="Shop preview"
              className="w-full h-[250px] object-cover"
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
          <div className=" border-b-2 p-5 rounded-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#E8F7F3] rounded-full" />
              <div>
                <h1 className="text-lg font-bold">HAIRSHOP</h1>
                <p className="text-sm text-gray-500">Subject</p>
              </div>
            </div>
            <div className="mt-4 mb-10">
              <h2 className="text-base font-medium">설명</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
