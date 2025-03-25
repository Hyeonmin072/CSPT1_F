import { useLocation } from "react-router-dom";
import DesignerHeader from "../../../common/DesignerHeader.jsx";

export default function WeekNotice() {
    const location = useLocation();
    const notice = location.state; // 전달된 공지사항 데이터

    return (
        <div>
            <DesignerHeader />

            <div className="max-w-7xl mx-auto p-10 flex flex-col justify-center items-center">
                <h3 className="text-2xl font-bold text-center mb-6">{notice.title}</h3>
                <p className="text-sm text-gray-600 mb-4 ml-auto">{notice.date}</p>

                <h2 className="border-t w-full pb-3"></h2>
                <p className="text-gray-700">{notice.content}</p>
            </div>
        </div>
    );
}
