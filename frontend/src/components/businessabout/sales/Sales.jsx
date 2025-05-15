import React, {useEffect, useState} from 'react';
import { format } from "date-fns";
import { AreaChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

import DesignerSales from "./DesignerSales.jsx";
import { dummySalesData } from "../../dummydata/DummySalesData.jsx";
import { dummyData } from "../../dummydata/DummyGraph.jsx";

export default function Sales() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [period, setPeriod] = useState("이번 주"); // 선택된 기간
    const [salesYData, setSalesYData] = useState({
        sales: 0,
        increase: 0,
    });

    // 기간 변경 시 salesYData 업데이트
    useEffect(() => {
        if (period === "이번 주") {
            const totalSales = dummyData.weekly.reduce((sum, day) => sum + day.sales, 0); // 합계 계산
            const increase = calculateIncrease(dummyData.weekly); // 증가율 계산
            setSalesYData({ sales: totalSales, increase });
        } else if (period === "이번 달") {
            const totalSales = dummyData.monthly.reduce((sum, day) => sum + day.sales, 0); // 합계 계산
            const increase = calculateIncrease(dummyData.monthly); // 증가율 계산
            setSalesYData({ sales: totalSales, increase });
        } else if (period === "근 1년") {
            const totalSales = dummyData.yearly.reduce((sum, month) => sum + month.sales, 0); // 합계 계산
            const increase = calculateIncrease(dummyData.yearly); // 증가율 계산
            setSalesYData({ sales: totalSales, increase });
        }
    }, [period]);

    // 증가율 계산 함수 (임의 로직 적용)
    const calculateIncrease = (data) => {
        if (data.length < 2) return 0; // 증가율 계산할 데이터 부족 시
        const first = data[0].sales;
        const last = data[data.length - 1].sales;
        return (((last - first) / first) * 100).toFixed(2); // 간단히 계산 (소수점 2자리)
    };

    // 오늘 매출
    const [salesData, setSalesData] = useState({
        dailySales: 0,
        dailyDecrease: 0,
        dailyOrders: 0,
    });

    // 오늘 요일 계산 (화요일을 예시로 설정)
    const todayIndex = new Date().getDay(); // 0(일요일), 1(월요일), ..., 6(토요일)
    const weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const todayName = weekdays[todayIndex]; // 오늘 이름
    const yesterdayName = weekdays[(todayIndex - 1 + 7) % 7]; // 어제 이름

    useEffect(() => {
        // 오늘과 어제 매출 데이터 가져오기
        const todaySales = dummyData.weekly.find((day) => day.name === todayName)?.sales || 0;
        const yesterdaySales = dummyData.weekly.find((day) => day.name === yesterdayName)?.sales || 0;

        // 감소/증가율 계산
        const decreasePercentage =
            yesterdaySales > 0 ? (((todaySales - yesterdaySales) / yesterdaySales) * 100).toFixed(2) : 0;

        // 주문량 설정 (임시 데이터 예시)
        const dailyOrders = Math.floor(todaySales / 10); // 매출 데이터를 기준으로 주문량 계산

        // 상태 업데이트
        setSalesData({
            dailySales: todaySales,
            dailyDecrease: decreasePercentage,
            dailyOrders: dailyOrders,
        });
    }, [todayName, yesterdayName]);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const data = dummySalesData;

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
            }
        };

        fetchSalesData();
    }, [period]);

    const [data, setData] = useState(dummyData.weekly); 

    // 기간 변경 핸들러
    const handlePeriodChange = (event) => {
        const selectedPeriod = event.target.value;
        setPeriod(selectedPeriod);

        // 선택된 옵션에 따라 데이터를 업데이트
        if (selectedPeriod === "이번 주") {
            setData(dummyData.weekly);
        } else if (selectedPeriod === "이번 달") {
            setData(dummyData.monthly);
        } else if (selectedPeriod === "이번 년도") {
            setData(dummyData.yearly);
        }
    };

    const [view, setView] = useState('store'); // 'store' or 'designer'


    // 그래프에 표시되는 이름(label)을 추가
    const updatedData = {
        weekly: dummyData.weekly.map((day) => ({
            ...day,
            label: day.name === "MONDAY" ? "월요일" :
                day.name === "TUESDAY" ? "화요일" :
                    day.name === "WEDNESDAY" ? "수요일" :
                        day.name === "THURSDAY" ? "목요일" :
                            day.name === "FRIDAY" ? "금요일" :
                                day.name === "SATURDAY" ? "토요일" : "일요일",
        })),
        monthly: dummyData.monthly.map((day) => ({
            ...day,
            label: `${day.name}일`,
        })),
        yearly: dummyData.yearly.map((month) => ({
            ...month,
            label: `${month.name}월`,
        })),
    };

    // X축 라벨 포맷터
    const tickFormatter = (name) => {
        if (period === "이번 주") {
            switch (name) {
                case "MONDAY": return "월요일";
                case "TUESDAY": return "화요일";
                case "WEDNESDAY": return "수요일";
                case "THURSDAY": return "목요일";
                case "FRIDAY": return "금요일";
                case "SATURDAY": return "토요일";
                case "SUNDAY": return "일요일";
                default: return name;
            }
        } else if (period === "이번 달") {
            return `${name}일`; // 숫자에 "일" 붙이기
        } else if (period === "이번 년도") {
            return `${name}월`; // 숫자에 "월" 붙이기
        }
        return name;
    };

    return (
        <div className="max-w-6xl container mx-auto p-8 mt-20">
            {/* 버튼 영역 */}
            <div className="border bg-white rounded-xl flex flex-row items-center relative mb-7">
                <div className="border rounded-xl overflow-hidden inline-flex relative w-full">
                    {/* Motion Div: 버튼들에 맞게 크기 조정 */}
                    <motion.div
                        className="absolute top-0 bottom-0 bg-green-600"
                        style={{width: "50%"}} // 버튼 크기와 맞게 조정
                        animate={{x: view === "store" ? "0%" : "100%"}}
                        transition={{type: "spring", stiffness: 100, damping: 15}}
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
                        className="flex flex-col mb-4 justify-center space-x-4 bg-white shadow-md rounded ">
                        <div className="p-3 text-gray-400">
                            오늘 날짜 : {selectedDate ? format(selectedDate, "MM월 dd일") : "Null"}
                        </div>
                        <div className="flex flex-row ">
                            <div className="p-4 w-1/2 text-center">
                                <h2 className="text-lg font-semibold mb-4">{period} 매출</h2>
                                <p className="text-3xl font-bold text-green-500">
                                    {salesYData.sales.toLocaleString()} 원
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    증가: {salesYData.increase}%
                                </p>
                            </div>
                            <div className="p-4 w-1/2 text-center">
                                <h2 className="text-lg font-semibold mb-4">오늘 매출</h2>
                                <p className="text-3xl font-bold text-red-500">
                                    {salesData.dailySales.toLocaleString()} 원
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    {salesData.dailyDecrease >= 0 ? "증가" : "감소"}: {Math.abs(salesData.dailyDecrease)}%
                                </p>
                                <p className="text-sm text-gray-500">
                                    주문 수: {salesData.dailyOrders}
                                </p>
                            </div>
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
                                        <option value="이번 년도">이번 년도</option>
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
                                            <stop offset="5%" stopColor="#00FF00" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="green" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>

                                    <XAxis dataKey="name"  tickFormatter={tickFormatter}/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="green"
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
