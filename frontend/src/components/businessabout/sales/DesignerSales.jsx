import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../sign/axios/AxiosInstance";

export default function DesignerSales() {
    const [designers, setDesigners] = useState([]); // 배열로 변경
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

                setDesigners(data); // 배열로 저장
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
            <h1 className="text-xl font-bold mb-4">디자이너 매출 현황</h1>
            <div className="flex flex-col h-[500px] overflow-auto p-4 space-y-4 border rounded">
                {designers.map((designer) => (
                    <Link
                        key={designer.designerEmail}
                        to={`/sales/calendar/${designer.designerEmail}`}
                        className="flex px-5 py-5 border shadow-md rounded-xl space-x-4 cursor-pointer w-full
                        hover:shadow-xl duration-300"
                    >
                        <div className="flex flex-row justify-between items-center w-full">
                            <div className="flex flex-row justify-between">
                                <div className="px-3">
                                    <img className="border rounded-full bg-gray-400 w-12 h-12"/>
                                </div>
                                <div className="flex flex-col">
                                    <strong className="text-bold text-base font-bold">디자이너 이름: {designer.designerName || "이름 없음"}</strong>
                                    <span className="text-sm text-gray-500">이메일: {designer.designerEmail || "이메일 없음"}</span>
                                </div>
                            </div>
                            
                            <div>
                                <span className="text-sm text-gray-500">이번달 매출: {designer.designerSales || 0} 원</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}