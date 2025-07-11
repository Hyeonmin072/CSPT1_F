import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Graph({ graphData }) {

    // 그래프 데이터 변환
    const formattedData = Object.entries(graphData).map(([key, value]) => ({
        name: key, // x축 값 (요일, 날짜, 월 등)
        sales: value, // y축 값 (매출)
    }));


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

      // 그래프 데이터가 0인 경우
    if (formattedData.length === 0) {
        return <div className="text-center mt-4">매출이 0입니다</div>;
    }

    return (
        <div className="relative h-64">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedData}>
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
    );
}