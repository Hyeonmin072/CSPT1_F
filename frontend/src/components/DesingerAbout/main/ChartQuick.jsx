import { useState, useEffect } from "react";
import { ChartSpline } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dummySalesData } from "../../dummydata/DummySalesData.jsx";

export default function ChartQuick() {
    const [sales, setSales] = useState(null); // 매출 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    // 데이터 가져오기
    useEffect(() => {
        const fetchSalesData = async () => {
            try {

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

    if (!sales) {
        return <div className="text-center mt-4">로딩 중...</div>;
    }

    return (
        <div
            className="flex items-center w-[260px] cursor-pointer"
            onClick={handleChart}
        >
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <ChartSpline className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">오늘 매출</p>
                <p className="text-lg text-gray-800 font-bold">{sales.toLocaleString()} 원</p>
            </div>
        </div>
    );
}
