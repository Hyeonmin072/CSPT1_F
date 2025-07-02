import { useLocation, useNavigate } from "react-router-dom";
import DesignerHeader from "../../../common/DesignerHeader.jsx";
import { ChevronLeft } from "lucide-react";

export default function WeekNotice() {
    const location = useLocation();
    const notice = location.state; // 전달된 공지사항 데이터
    const navigate = useNavigate();

    return (
        <div>
            <DesignerHeader />

            <div className="max-w-7xl h-[1000px] mx-auto p-10 mt-20 flex flex-col items-center">
            <div className="w-full flex flex-row justify-between space-x-4 mb-8">
                    <div className="flex flex-row space-x-4">
                        <button onClick={() => navigate(-1)}><ChevronLeft /></button>
                    </div>
                    <h1 className="text-2xl font-bold">{notice.title}</h1>
                    <div>&nbsp; &nbsp; &nbsp; &nbsp;</div>
                </div>
                <p className="text-sm text-gray-600 ml-auto">{new Date(notice.createDate).toISOString().slice(0, 10) || "날짜 없음"}</p>
                <h2 className="border-t w-full pb-3"></h2>
                <p
                    className="text-gray-700 mt-4"
                >
                    {notice.content.replace(/<\/?div>/g, "")} {/* <div> 태그 제거 */}
                </p>
            </div>
        </div>
    );
}


