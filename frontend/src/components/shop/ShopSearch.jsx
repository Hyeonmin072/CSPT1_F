import { Search, LocateFixed, MapPin } from "lucide-react";
export function ShopSearch() {
  return (
    <div className="flex justify-center w-full mb-4 mt-4">
      <div className="flex items-center bg-white rounded-lg shadow-sm py-2 px-4 w-[700px]">
        <div className="flex items-center">
          <MapPin className="w-5 h-5" />
          <span className="text-sm mx-2">서울 역삼동</span>
          <LocateFixed className="w-5 h-5 bg-[#70EFDE] rounded-full p-1" />
        </div>
        <div className="mx-4 h-6 w-px bg-gray-200"></div>
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
  );
}
