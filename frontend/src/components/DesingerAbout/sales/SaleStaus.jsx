import React, { useState, useEffect } from "react";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";
import { format } from "date-fns";
import Graph from "./Graph.jsx";

export default function SaleStaus() {
    const [salesData, setSalesData] = useState(null); // 매출 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [period, setPeriod] = useState("ONE_WEEK"); // 기간 상태 (기본값: 1주일)
    const [designerProfile, setDesignerProfile] = useState(null); // 디자이너 데이터 상태

    // 매출 데이터 및 프로필 데이터 가져오기
    useEffect(() => {
        const fetchProfileQuick = async () => {
            try {
                const response = await axiosInstance.get("/designer/profile");
                setDesignerProfile(response.data);
            } catch (err) {
                console.error("Error fetching profileQuick:", err);
            }
        };

        const fetchSalesData = async () => {
            try {
                let periodParam = "ONE_WEEK";
                if (period === "ONE_MONTH") periodParam = "ONE_MONTH";
                else if (period === "ONE_YEAR") periodParam = "ONE_YEAR";
        
                // 디자이너 프로필에서 이메일 가져오기
                const email = designerProfile?.email;
        
                const response = await axiosInstance.get("/designer/sales", {
                    params: { email, period: periodParam },
                });
                setSalesData(response.data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        const fetchData = async () => {
            await fetchProfileQuick();
            if (designerProfile?.email) {
                fetchSalesData(); 
            } else {
                console.error("Designer email is missing after fetching profile:", designerProfile);
            }
        };
    
        fetchData();
    }, [designerProfile, period]);

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    if (!salesData) {
        return <div className="text-center mt-4">매출 데이터를 불러올 수 없습니다.</div>; // 데이터가 없는 경우
    }

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto p-8">
            {/* 매출 현황 */}
            <div className="w-full flex flex-col mb-8 justify-center bg-white border border-gray-200 shadow-md rounded">
                <div className="p-3 text-gray-400 text-center border-b border-gray-200">
                    오늘 날짜: {format(new Date(), "yyyy-MM-dd")}
                </div>
                <div className="flex flex-row">
                    {/* 기간별 매출 */}
                    <div className="p-4 w-1/2 text-center border-r border-gray-200">
                        <h2 className="text-lg font-semibold mb-4">{period} 매출</h2>
                        <p className="text-3xl font-bold text-green-500">
                            {salesData.totalAmount.toLocaleString()}원
                        </p>
                    </div>
                    {/* 디자이너 프로필 */}
                    <div className="p-4 w-1/2 text-center">
                        <h2 className="text-lg font-semibold mb-4">디자이너 정보</h2>
                        {designerProfile ? (
                            <div>
                                <p className="text-xl font-bold">{designerProfile.name}</p>
                            </div>
                        ) : (
                            <p className="text-gray-500">디자이너 정보를 불러올 수 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* 기간 선택과 그래프 */}
            <div className="flex flex-col bg-white shadow-md rounded-lg p-6">
                {/* 기간 선택 */}
                <div className="flex justify-end mb-4">
                    <label htmlFor="period" className="mr-2 font-semibold text-gray-500">
                        기간 선택:
                    </label>
                    <select
                        id="period"
                        className="border border-gray-300 rounded px-2 py-1 text-gray-500"
                        onChange={(e) => setPeriod(e.target.value)}
                        value={period}
                    >
                        <option value="ONE_WEEK">최근 1주일</option>
                        <option value="ONE_MONTH">최근 1개월</option>
                        <option value="ONE_YEAR">최근 1년</option>
                    </select>
                </div>

                {/* 그래프 */}
                <div className="flex justify-center">
                    <div className="w-full max-w-4xl">
                        <Graph graphData={salesData.graph} />
                    </div>
                </div>
            </div>
        </div>
    );
}