import React, { useState, useEffect } from "react";

import axiosInstance from "../../sign/axios/AxiosInstance.jsx";
import d1 from "../../../assets/designer/d1.png";
import { format } from "date-fns";
import { dummyProfile } from "../../dummydata/DummyProfile.jsx";
import { dummySalesData } from "../../dummydata/DummySalesData.jsx";

export default function SaleStaus() {
    const [salesData, setSalesData] = useState(null); // 매출 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [designerProfile, setDesignerProfile] = useState(null); // 디자이너 데이터 상태

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                // const response = await axiosInstance.get("/designer/sales");
                
                const data = dummySalesData;
                // const data = await response.json();
                setSalesData(data);

                const profile = dummyProfile;
                setDesignerProfile(profile);
            } catch (error) {
                console.error("Error fetching sales data:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchSalesData();
    }, []);

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    if (!salesData) {
        return <div className="text-center mt-4">매출 데이터를 불러올 수 없습니다.</div>; // 데이터가 없는 경우
    }

    return (
        <>
            {/* 매출 현황 */}
            <div
                className="w-3/4 mr-10 ml-10 flex flex-col mb-8 justify-center space-x-4 bg-white shadow-md rounded">
                <div className="p-3 text-gray-400">
                    오늘 날짜 : {selectedDate ? format(selectedDate, "MM월 dd일") : "Null"}
                </div>
                <div className="flex flex-row">
                    <div className="p-4 w-1/2 text-center">
                        <h2 className="text-lg font-semibold mb-4">이번 달 매출</h2>
                        <p className="text-3xl font-bold text-green-500">
                            {salesData.monthlySales.toLocaleString()}원
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            증가: {salesData.monthlyIncrease}%
                        </p>
                    </div>
                    <div className="p-4 w-1/2 text-center">
                        <h2 className="text-lg font-semibold mb-4">오늘 매출</h2>
                        <p className="text-3xl font-bold text-red-500">
                            {salesData.dailySales.toLocaleString()}원
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            감소: {salesData.dailyDecrease}%
                        </p>
                        <p className="text-sm text-gray-500">
                            오늘 주문: {salesData.dailyOrders}개
                        </p>
                    </div>
                </div>
            </div>

            {/* 디자이너 정보 */}
            <div className="w-[310px] mr-10 ml-10 mb-8 bg-white rounded-lg shadow-md ">
                <div className="flex flex-col">
                    <div className="flex flex-row p-3 ml-3">
                        {designerProfile && designerProfile.imageURL ? (
                            <img
                                src={designerProfile.imageURL}
                                className="w-[70px] h-[70px] rounded-full flex items-center justify-center mb-4"
                                alt="Designer Profile"
                            />
                        ) : (
                            <div
                                className="w-[70px] h-[70px] rounded-full bg-gray-300 flex items-center justify-center mb-4"
                            >
                                <span className="text-white">
                                    {designerProfile ? designerProfile.name : ""}
                                </span>
                            </div>
                        )}
                        <div className="ml-4 py-5 p-3">
                            <p className="font-bold text-gray-500 text-m">
                                이름: {designerProfile ? designerProfile.name : "이름 없음"}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <p className="font-semibold text-gray-500 text-xl">{designerProfile ? designerProfile.roll : "소속 없음"}</p>
                    </div>
                </div>
            </div>
        </>
    );
}