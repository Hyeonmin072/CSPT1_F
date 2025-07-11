import { useState, useEffect } from "react";
import { TrendingUp } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../sign/axios/AxiosInstance";

export default function ChartQuick() {
    const [weeklySales, setWeeklySales] = useState(null); // 1주일 매출 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [designerProfile, setDesignerProfile] = useState(null); // 디자이너 프로필 상태
    const navigate = useNavigate();

    // 디자이너 프로필 가져오기
    useEffect(() => {
        const fetchProfileQuick = async () => {
            try {
                const response = await axiosInstance.get("/designer/profile");
                setDesignerProfile(response.data);
            } catch (error) {
                console.error("Error fetching designer profile:", error);
            }
        };

        fetchProfileQuick();
    }, []);

    // 1주일 매출 데이터 가져오기
    useEffect(() => {
        const fetchWeeklySales = async () => {
            try {
                const response = await axiosInstance.get("/designer/sales", {
                    params: { email: designerProfile.email, period: "ONE_WEEK" },
                });
                const data = response.data;
                if (!data || typeof data.totalAmount === "undefined") {
                    throw new Error("1주일 매출 데이터가 없습니다.");
                }
                setWeeklySales(data.totalAmount); // 1주일 매출 데이터 설정
            } catch (error) {
                console.error("Error fetching weekly sales data:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        if (designerProfile) {
            fetchWeeklySales();
        }
    }, [designerProfile]);

    const handleChart = () => navigate("/sales");

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>;
    }

    if (weeklySales === null) {
        return <div className="text-center mt-4">1주일 매출 데이터를 불러올 수 없습니다.</div>;
    }

    return (
        <div
            className="flex items-center w-[260px] cursor-pointer"
            onClick={handleChart}
        >
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-green-500">
                <TrendingUp className="w-12 h-12 stroke-current" />
            </div>
            <div className="ml-4">
                <p className="text-sm text-gray-500 font-medium">1주일 매출</p>
                <p className="text-lg text-gray-800 font-bold">{weeklySales.toLocaleString()} 원</p>
            </div>
        </div>
    );
}