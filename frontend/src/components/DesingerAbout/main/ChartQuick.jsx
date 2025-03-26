import { useState, useEffect } from "react";
import { ChartSpline } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dummySalesData } from "../sales/SaleStaus.jsx";

export default function ChartQuick() {
    const [sales, setSales] = useState(null); // 매출 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    // 데이터 가져오기
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                // 실제 백엔드 API 호출 시 아래 코드를 활성화
                // const response = await fetch("/api/sales/today");
                // const data = await response.json();

                // 지금은 더미 데이터 사용
                console.log("dummySalesData:", dummySalesData.dailySales);
                const data = dummySalesData;
                setSales(data.dailySales);
                console.log("sales", sales);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchSalesData();
    }, []);

    const handleChart = () => navigate("/sales");

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    if (!sales) {
        return <div className="text-center mt-4">매출 정보를 불러올 수 없습니다.</div>; // 에러 처리
    }

    return (
        <div className="flex items-center w-[260px]" onClick={handleChart}>
            <div className="w-12 h-12 rounded-full mb-4 bg-green-500 flex items-center justify-center">
                <ChartSpline className="w-[30px] h-[30px] text-white" />
            </div>
            <div className="ml-4 py-1">
                <p className="text-l text-gray-400 font-bold">오늘 매출</p>
                <p className="text-xl text-gray-700 font-bold">{sales.toLocaleString()} 원</p>
            </div>
        </div>
    );
}
