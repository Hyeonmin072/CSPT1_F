import React, { useState, useEffect, useRef } from 'react';
import { LineChart, AreaChart , Line, Area,  XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dummyData } from "../../dummydata/DummyGraph.jsx";

// 임시 더미들


export default function Graph(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [period, setPeriod] = useState("이번 주"); // 선택된 기간
    const chartRef = useRef(null);

    // 백엔드 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 실제 API 호출 시 아래 코드 활성화
                // const response = await fetch("/api/sales?period=" + period);
                // const result = await response.json();

                // 지금은 더미 데이터를 사용
                const result =
                    period === "이번 주"
                        ? dummyData.weekly
                        : period === "이번 달"
                            ? dummyData.monthly
                            : dummyData.yearly;

                setData(result);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchData();
    }, [period]); // 기간이 변경될 때마다 실행

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
        setLoading(true); // 로딩 상태 재설정
    };

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    return (
        <>
            <div className="flex flex-row">
                <h2 className="flex text-xl font-semibold mb-4 items-start">매출 현황</h2>
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

            <div className="relative h-64" ref={chartRef}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        {/* 그라데이션 정의 */}
                        <defs>
                            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00FF00" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="green" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="green"
                            fill="url(#salesGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}