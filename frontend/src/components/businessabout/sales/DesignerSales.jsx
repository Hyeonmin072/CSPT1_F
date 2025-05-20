import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../sign/axios/AxiosInstance";

export default function DesignerSales({ designerEmail }) {
    const [designers, setDesigners] = useState({
        name: "",
        email: "",
        sales: 0
    });
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDesigners = async () => {
            try {
                const response = await axiosInstance.get("/shop/sales/designers");
                const data = response.data;
                console.log("디자이너 데이터:", data);

                if (!data || data.length === 0) {
                    console.error("디자이너 정보가 없습니다.");
                    setLoading(false);
                    return;
                }

                setDesigners({
                    name: data[0].designerName || "이름 없음",
                    email: data[0].designerEmail || "이메일 없음",
                    sales: data[0].designerSales || 0,
                });
                setLoading(false);
            } catch (error) {
                console.error("디자이너 정보를 가져오는 데 실패했습니다.", error);
                setLoading(false);
            }
        };

        fetchDesigners();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-xl font-bold mb-4">디자이너 매출 현황 리스트</h1>
            <div className="flex flex-col h-[500px] overflow-auto p-4 space-y-4 border rounded">
                <Link
                    to={`/sales/calendar/${designers.email}`}
                    className="flex px-5 py-5 border shadow-md rounded-xl space-x-4 cursor-pointer w-full
                    hover:shadow-xl duration-300"
                >
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row justify-between">
                            <div className="px-3">
                                <img className="border  rounded-full bg-gray-400 w-12 h-12"></img>
                            </div>
                            <div className="flex flex-col">
                                <strong className="text-bold text-base font-bold">디자이너 이름: {designers.name}</strong>
                                <span className="text-sm text-gray-500">이메일: {designers.email}</span>
                            </div>
                        </div>
                        
                        <div>
                            <span className="text-sm text-gray-500">이번달 매출: {designers.sales ? designers.sales : 0} 원</span>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}