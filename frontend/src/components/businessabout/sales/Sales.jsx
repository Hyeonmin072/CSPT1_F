import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  AreaChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import axiosInstance from "../../sign/axios/AxiosInstance";

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

  // 실제 서버에서 받아온 데이터를 저장하는 상태
  const [salesApiData, setSalesApiData] = useState({
    totalAmount: 0,
    todayTotalAmount: 0,
    graph: {},
  });

  // 그래프용 데이터
  const [data, setData] = useState([]);

  // period에 따라 파라미터 설정 및 GET 요청
  useEffect(() => {
    let periodParam = "ONE_WEEK";
    if (period === "이번 달") periodParam = "ONE_MONTH";
    else if (period === "이번 년도") periodParam = "ONE_YEAR";

    const fetchSalesData = async () => {
      try {
        const response = await axiosInstance.get("/shop/sales", {
          params: { period: periodParam },
        });
        console.log(`/shop/sales (${periodParam}) 응답 데이터:`, response.data);

        // API 응답 데이터 저장
        setSalesApiData(response.data);


        // 그래프 데이터 변환
        const graphData = Object.entries(response.data.graph).map(
          ([key, value]) => ({
            name: key,
            sales: value,
          })
        );

        setData(graphData);

        // salesYData 업데이트
        const totalSales = response.data.totalAmount;

        // 증가율 계산 - 첫번째와 마지막 데이터 포인트의 비교
        let increase = 0;
        if (graphData.length >= 2) {
          const first = graphData[0].sales;
          const last = graphData[graphData.length - 1].sales;
          if (first > 0) {
            increase = (((last - first) / first) * 100).toFixed(2);
          }
        }

        setSalesYData({
          sales: totalSales,
          increase: increase,
        });

        // 오늘 매출 데이터 업데이트
        setSalesData({
          dailySales: response.data.todayTotalAmount,
          dailyDecrease: 0, // 필요한 경우 서버에서 받을 수 있음
          dailyOrders: Math.floor(response.data.todayTotalAmount / 10), // 임시 계산
        });
      } catch (error) {
        console.error(`/shop/sales (${periodParam}) 데이터 로딩 실패:`, error);
      }
    };
    fetchSalesData();
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
  const weekdays = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const todayName = weekdays[todayIndex]; // 오늘 이름
  const yesterdayName = weekdays[(todayIndex - 1 + 7) % 7]; // 어제 이름


  // 기간 변경 핸들러
  const handlePeriodChange = (event) => {
    const selectedPeriod = event.target.value;
    setPeriod(selectedPeriod);
  };

  const [view, setView] = useState("store"); // 'store' or 'designer'

  // X축 라벨 포맷터
  const tickFormatter = (name) => {
    if (period === "이번 주") {
      // 요일 이름이 이미 한글인 경우 그대로 반환
      if (name.includes("요일")) {
        return name;
      }

      // 영어 요일명을 한글로 변환
      switch (name) {
        case "MONDAY":
          return "월요일";
        case "TUESDAY":
          return "화요일";
        case "WEDNESDAY":
          return "수요일";
        case "THURSDAY":
          return "목요일";
        case "FRIDAY":
          return "금요일";
        case "SATURDAY":
          return "토요일";
        case "SUNDAY":
          return "일요일";
        default:
          return name;
      }
    } else if (period === "이번 달") {
      // 이미 일 표시가 되어 있으면 그대로 반환
      return name.includes("일") ? name : `${name}일`;
    } else if (period === "이번 년도") {
      // 이미 월 표시가 되어 있으면 그대로 반환
      return name.includes("월") ? name : `${name}월`;
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
            style={{ width: "50%" }} // 버튼 크기와 맞게 조정
            animate={{ x: view === "store" ? "0%" : "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
          {/* 버튼들 */}
          <button
            className={`z-10 px-4 py-2 font-bold flex-1 ${
              view === "store" ? "text-white" : "bg-white text-black"
            }`}
            onClick={() => setView("store")}
          >
            가게 매출
          </button>
          <button
            className={`z-10 px-4 py-2 font-bold flex-1 ${
              view === "designer" ? "text-white" : "bg-white text-black"
            }`}
            onClick={() => setView("designer")}
          >
            디자이너 별 매출
          </button>
        </div>
      </div>

      {/* 조건부 컴포넌트 렌더링 */}
      {view === "store" ? (
        <div>
          <div className="flex flex-col mb-4 justify-center space-x-4 bg-white shadow-md rounded ">
            <div className="p-3 text-gray-400">
              오늘 날짜 :{" "}
              {selectedDate ? format(selectedDate, "MM월 dd일") : "Null"}
            </div>
            <div className="flex flex-row ">
              <div className="p-4 w-1/2 text-center">
                <h2 className="text-lg font-semibold mb-4">{period} 매출</h2>
                <p className="text-3xl font-bold text-green-500">
                  {salesApiData.totalAmount.toLocaleString()} 원
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  증가: {salesYData.increase}%
                </p>
              </div>
              <div className="p-4 w-1/2 text-center">
                <h2 className="text-lg font-semibold mb-4">오늘 매출</h2>
                <p className="text-3xl font-bold text-red-500">
                  {salesApiData.todayTotalAmount.toLocaleString()} 원
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {salesData.dailyDecrease >= 0 ? "증가" : "감소"}:{" "}
                  {Math.abs(salesData.dailyDecrease)}%
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
                  <label
                    htmlFor="period"
                    className="mr-2 font-semibold text-gray-500"
                  >
                    기간 선택:
                  </label>
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
                    <linearGradient
                      id="salesGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#00FF00" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="green" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis dataKey="name" tickFormatter={tickFormatter} />
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
          </div>
        </div>
      ) : (
        <div>
          <DesignerSales />
        </div>
      )}
    </div>
  );
}
