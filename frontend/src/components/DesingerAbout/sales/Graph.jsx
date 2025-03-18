import React, { useState, useEffect, useRef } from 'react';
import { LineChart, AreaChart , Line, Area,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Graph({ handlePeriodChange, chartRef, data }){
    return(
        <>
            <div className="flex flex-row">
                <h2 className="flex text-xl font-semibold mb-4 items-start">매출 현황</h2>
                <div className="flex ml-auto">
                    <div>
                        <label htmlFor="period" className="mr-2 font-semibold text-gray-500">기간 선택:</label>
                        <select id="period" className="border border-gray-300 rounded px-1 py-1 text-gray-500"
                                onChange={handlePeriodChange}>
                            <option value="이번 주">이번 주</option>
                            <option value="이번 달">이번 달</option>
                            <option value="근 1년">이번 년도</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="relative h-64" ref={chartRef}>
                <ResponsiveContainer width="100%" height="100%">
                    {/*<LineChart data={data}>*/}
                    {/*    <CartesianGrid strokeDasharray="2 3"/>*/}
                    {/*    <XAxis dataKey="name"/>*/}
                    {/*    <YAxis/>*/}
                    {/*    <Tooltip/>*/}
                    {/*    <Legend/>*/}
                    {/*    <Line type="monotone" dataKey="sales" stroke="#4CCECB" activeDot={{r: 8}}/>*/}
                    {/*</LineChart>*/}

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
                        <Area type="monotone" dataKey="sales" stroke="#4CCECB" fill="url(#salesGradient)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}