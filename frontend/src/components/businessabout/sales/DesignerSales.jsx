import { Link } from "react-router-dom";
import d1 from "../../../assets/designer/d1.png";

export const designers = [
    { id: 1, name: "김봉팔 원장님", sales: 452000, profileImg: d1 },
    { id: 2, name: "이청순 실장님", sales: 778000, profileImg: d1 },
    { id: 3, name: "홍길동 부실장님", sales: 350000, profileImg: d1 },
];


export default function DesignerSales() {

    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-xl font-bold mb-4">디자이너 매출 현황 리스트</h1>
            <div className="h-[480px] overflow-auto p-4 space-y-4">
                {designers.map((designer) => (
                    <Link
                        to={`/sales/calendar`}
                        key={designer.id}
                        className="flex px-5 py-5 border shadow-md rounded-xl space-x-4 cursor-pointer"
                        onClick={() => console.log(`선택된 디자이너: ${designer.name}, ID: ${designer.id}`)} // 클릭 이벤트 추가
                    >
                        <img
                            src={designer.profileImg}
                            alt={`${designer.name} 프로필`}
                            className="w-20 h-20 rounded-full"
                        />
                        <div className="flex flex-col justify-center space-y-2">
                            <strong className="text-bold text-base font-medium">{designer.name}</strong>
                            <span className="text-sm text-gray-600">이번달 매출: {designer.sales.toLocaleString()} 원</span>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );
}