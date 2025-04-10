import React, {useEffect, useState} from 'react';
import { AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

import DesignerSales from "./DesignerSales.jsx";
import { dummySalesData } from "../../DesingerAbout/sales/SaleStaus.jsx";
import { dummyData } from "../../DesingerAbout/sales/Graph.jsx";

const storeSalesData = [
    { date: '1일', sales: 120000 },
    { date: '2일', sales: 150000 },
    { date: '3일', sales: 80000 },
    { date: '4일', sales: 200000 },
];

const designerSalesData = [
    { designer: 'Kim', sales: 90000 },
    { designer: 'Lee', sales: 120000 },
    { designer: 'Park', sales: 150000 },
];

export default function Sales() {
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState("이번 주"); // 선택된 기간
    const [salesData, setSalesData] = useState({
        monthlySales: 0,
        monthlyIncrease: 0,
        dailySales: 0,
        dailyDecrease: 0,
        dailyOrders: 0,
    });


    // 백엔드 데이터 가져오기
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                // 실제 API 호출 시 아래 코드 활성화
                // const response = await fetch("/api/sales");
                // const data = await response.json();

                // 지금은 더미 데이터 사용
                const data = dummySalesData;

                const result =
                    period === "이번 주"
                        ? dummyData.weekly
                        : period === "이번 달"
                            ? dummyData.monthly
                            : dummyData.yearly;

                setData(result);
                setSalesData(data);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            } finally {
            }
        };

        fetchSalesData();
    }, [period]);

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
        setLoading(true); // 로딩 상태 재설정
    };

    const [view, setView] = useState('store'); // 'store' or 'designer'

    return (
        <div className="max-w-6xl container mx-auto p-8">
            {/* 버튼 영역 */}
            <div className="border bg-white rounded-xl flex flex-row items-center relative mb-7">
                <div className="border rounded-xl overflow-hidden inline-flex relative w-full">
                    {/* Motion Div: 버튼들에 맞게 크기 조정 */}
                    <motion.div
                        className="absolute top-0 bottom-0 bg-[#00B3A6]"
                        style={{width: "50%"}} // 버튼 크기와 맞게 조정
                        animate={{x: view === "store" ? "0%" : "100%"}}
                        transition={{type: "spring", stiffness: 100, damping: 20}}
                    />
                    {/* 버튼들 */}
                    <button
                        className={`z-10 px-4 py-2 font-bold flex-1 ${view === 'store' ? 'text-white' : 'bg-white text-black'}`}
                        onClick={() => setView('store')}
                    >
                        가게 매출
                    </button>
                    <button
                        className={`z-10 px-4 py-2 font-bold flex-1 ${view === 'designer' ? 'text-white' : 'bg-white text-black'}`}
                        onClick={() => setView('designer')}
                    >
                        디자이너 별 매출
                    </button>
                </div>
            </div>


            {/* 조건부 컴포넌트 렌더링 */}
            {view === 'store' ? (
                <div>
                    <div
                        className="flex flex-row mb-4 items-center justify-center space-x-4 bg-white shadow-md rounded ">
                        <div className="p-4 w-1/2 text-center">
                            <h2 className="text-lg font-semibold mb-4">이번 달 매출</h2>
                            <p className="text-3xl font-bold text-green-500">
                                ₩{salesData.monthlySales.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                증가: {salesData.monthlyIncrease}%
                            </p>
                        </div>
                        <div className="p-4 w-1/2 text-center">
                            <h2 className="text-lg font-semibold mb-4">오늘 매출</h2>
                            <p className="text-3xl font-bold text-red-500">
                                ₩{salesData.dailySales.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                감소: {salesData.dailyDecrease}%
                            </p>
                            <p className="text-sm text-gray-500">
                                주문 수: {salesData.dailyOrders}
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-row">
                            <div className="flex ml-auto">
                                <div>
                                    <label htmlFor="period" className="mr-2 font-semibold text-gray-500">기간 선택:</label>
                                    <select
                                        id="period"
                                        className="border border-gray-300 rounded px-1 py-1 text-gray-500"
                                        onChange={handlePeriodChange}
                                        value={period}
                                    >
                                        <option value="이번 주">이번 주</option>
                                        <option value="이번 달">이번 달</option>
                                        <option value="근 1년">이번 년도</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold mb-4">김봉팔 헤어 매출 현황</h2>
                        <div className="relative h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    {/* 그라데이션 정의 */}
                                    <defs>
                                        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4CCECB" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#4CCECB" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>

                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#4CCECB"
                                        fill="url(#salesGradient)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            ) : (
                <div>
                    <DesignerSales/>
                </div>
            )}
        </div>
    );
}
