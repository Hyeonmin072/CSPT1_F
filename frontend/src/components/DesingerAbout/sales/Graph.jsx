import React, { useState, useEffect, useRef } from 'react';
import { LineChart, AreaChart , Line, Area,  XAxis, YAxis,
    CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 임시 더미들
const dummyData = {
    weekly: [
        { name: '월요일', sales: 0 },
        { name: '화요일', sales: 60 },
        { name: '수요일', sales: 70 },
        { name: '목요일', sales: 80 },
        { name: '금요일', sales: 90 },
        { name: '토요일', sales: 100 },
        { name: '일요일', sales: 110 },
    ],
    monthly: [
        { name: '1일', sales: 100 },
        { name: '2일', sales: 200 },
        { name: '3일', sales: 150 },
        { name: '4일', sales: 300 },
        { name: '5일', sales: 250 },
        { name: '6일', sales: 350 },
        { name: '7일', sales: 450 },
        { name: '8일', sales: 500 },
        { name: '9일', sales: 400 },
        { name: '10일', sales: 300 },
        // 데이터 생략...
    ],
    yearly: [
        { name: '1월', sales: 1500 },
        { name: '2월', sales: 2000 },
        { name: '3월', sales: 1800 },
        { name: '4월', sales: 2200 },
        { name: '5월', sales: 2500 },
        { name: '6월', sales: 2700 },
        { name: '7월', sales: 2900 },
        // 데이터 생략...
    ],
};

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
                                <stop offset="5%" stopColor="#4CCECB" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#4CCECB" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#4CCECB"
                            fill="url(#salesGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}