import { Search } from "lucide-react";

export default function ReservationSearch({ searchTerm, setSearchTerm }) {
    return (
        <div className="bg-white rounded-lg shadow py-2 px-4 w-[1000px] ">
            <div className="flex-1 flex items-center">
                <input
                    type="text"
                    placeholder="디자이너 및 헤어샵명 검색"
                    className="w-full outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="w-5 h-5 text-gray-400"/>
            </div>
        </div>
    );
}
