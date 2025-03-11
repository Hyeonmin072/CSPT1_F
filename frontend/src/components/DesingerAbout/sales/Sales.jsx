import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Slider from 'react-slick';

import Graph from "./Graph.jsx";
import SaleStaus from "./SaleStaus.jsx";

// 임시 더미들
const weeklyData = [
    { name: '월요일', sales: 0 },
    { name: '화요일', sales: 60 },
    { name: '수요일', sales: 70 },
    { name: '목요일', sales: 80 },
    { name: '금요일', sales: 90 },
    { name: '토요일', sales: 100 },
    { name: '일요일', sales: 110 },
];

const monthlyData = [
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
    { name: '11일', sales: 350 },
    { name: '12일', sales: 450 },
    { name: '13일', sales: 300 },
    { name: '14일', sales: 200 },
    { name: '15일', sales: 500 },
    { name: '16일', sales: 600 },
    { name: '17일', sales: 400 },
    { name: '18일', sales: 100 },
    { name: '19일', sales: 700 },
    { name: '20일', sales: 500 },
    { name: '21일', sales: 500 },
    { name: '22일', sales: 40 },
    { name: '23일', sales: 20 },
    { name: '24일', sales: 100 },
    { name: '25일', sales: 300 },
    { name: '26일', sales: 400 },
    { name: '27일', sales: 10 },
    { name: '28일', sales: 0 },
    { name: '29일', sales: null },
    { name: '30일', sales: null },
];

const yearlyData = [
    { name: '1월', sales: 1500 },
    { name: '2월', sales: 2000 },
    { name: '3월', sales: 1800 },
    { name: '4월', sales: 2200 },
    { name: '5월', sales: 2500 },
    { name: '6월', sales: 2700 },
    { name: '7월', sales: 2900 },
    { name: '8월', sales: 3100 },
    { name: '9월', sales: 3300 },
    { name: '10월', sales: 3500 },
    { name: '11월', sales: 3700 },
    { name: '12월', sales: 3900 },
];

// 그래프 차트
// npm install recharts
// npm install react-slick slick-carousel
export default function Sales({ Designerprofile }) {
    const [data, setData] = useState(weeklyData);
    const [currentDate, setCurrentDate] = useState('');
    const [today, setToday] = useState(new Date());
    const chartRef = useRef(null);

    const handlePeriodChange = (event) => {
        const period = event.target.value;

        switch (period) {
            case '이번 주':
                setData(weeklyData);
                break;
            case '이번 달':
                setData(monthlyData);
                break;
            case '근 1년':
                setData(yearlyData);
                break;
            default:
                setData(monthlyData);
                break;
        }
    };


    return (
        <div className="container mx-auto p-10">
            {/* 윗줄 */}
            <div className="flex flex-row gap-4">
                <SaleStaus />
            </div>


            {/* 그래프 */}
            <div className="border bg-white rounded-lg p-6 ml-10 mr-10 shadow-md mt-4">
                <Graph
                    handlePeriodChange={handlePeriodChange}
                    chartRef={chartRef}
                    data={data}
                />
            </div>


        </div>
    );
}
