import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

import axiosInstance from '../../sign/axios/AxiosInstance.jsx';
import DetailModal from "../../modal/event-coupon/DetailModal.jsx";
import CouponDetailModal from "../../modal/event-coupon/CouponDetailModal.jsx";


export default function EventCouponMenu() {
    const navigate = useNavigate();
    const [view, setView] = useState("coupon");
    const [coupons, setCoupons] = useState([]);
    const [events, setEvents] = useState([]);
    

    const [selectedItem, setSelectedItem] = useState(null);
    const [isEModalOpen, setIsEModalOpen] = useState(false);
    const [isCModalOpen, setIsCModalOpen] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (view === "coupon") {
                    const response = await axiosInstance.get("/shop/coupons");
                    setCoupons(response.data);
                } else if (view === "event") {
                    const response = await axiosInstance.get("/shop/events");
                    console.log("이벤트 데이터 : ", response.data);
                    setEvents(response.data.map(event => ({
                        id: event.id,
                        name: event.name,
                        startDate: event.startDate,
                        endDate: event.endDate,
                    })));
                }
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [view]);

    const [sortOrder, setSortOrder] = useState("recently");

    const openCouponModal = (coupon) => {
        setSelectedItem(coupon);
        setIsCModalOpen(true);
    };

    const closeCouponModal = () => {
        setSelectedItem(null);
        setIsCModalOpen(false);
    };

    const openEventModal = (event) => {
        setSelectedItem(event);
        setIsEModalOpen(true);
    };

    const closeEventModal = () => {
        setSelectedItem(null);
        setIsEModalOpen(false);
    };


    return (
        <div className="max-w-6xl pt-10 mt-10 mx-auto flex flex-col min-h-[800px]">
            <div>
                {/* 쿠폰/이벤트 등록 버튼 */}
                <div className="flex flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-center mb-6">이벤트 및 쿠폰 관리</h1>

                    <div className="flex flex-row space-x-5">
                        <select
                            className="p-2 border rounded-lg w-[130px]"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="recently">최신순</option>
                            <option value="endDate">마감일 순</option>
                        </select>

                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 duration-300"
                            onClick={() => navigate("/eventmenu/create")}
                        >
                            등록하기
                        </button>
                    </div>
                </div>

                {/* 쿠폰 - 이벤트 전체 조회 */}
                <div className="border bg-white rounded-xl flex flex-row items-center relative mb-7">
                    <div className="border rounded-xl overflow-hidden inline-flex relative w-full">
                        {/* Motion Div: 활성화된 탭 강조 */}
                        <motion.div
                            className="absolute top-0 bottom-0 bg-green-500"
                            style={{ width: "50%" }} // 버튼 크기와 맞게 조정
                            animate={{ x: view === "coupon" ? "0%" : "100%" }}
                            transition={{ type: "spring", stiffness: 100, damping: 15 }}
                        />
                        {/* 버튼들 */}
                        <button
                            className={`z-10 px-4 py-2 font-bold flex-1 ${
                                view === "coupon" ? "text-white" : "bg-white text-black"
                            }`}
                            onClick={() => setView("coupon")}
                        >
                            쿠폰 관리
                        </button>
                        <button
                            className={`z-10 px-4 py-2 font-bold flex-1 ${
                                view === "event" ? "text-white" : "bg-white text-black"
                            }`}
                            onClick={() => setView("event")}
                        >
                            이벤트 관리
                        </button>
                    </div>
                </div>

                {/* Main Container */}
                <div className="flex justify-between gap-6">
                {isLoading ? (
                    <div className="text-center w-full py-10 text-gray-500 text-lg">
                        로딩 중...
                    </div>
                ) : view === "coupon" ? (
                    <div className="w-full bg-white border rounded shadow-md">
                        <h2 className="text-xl font-semibold pt-4 pb-4 text-center text-gray-800">
                            쿠폰 목록
                        </h2>
                        <div className="border-b"></div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="p-4 text-left text-gray-600 font-bold">쿠폰 이름</th>
                                        <th className="p-4 text-left text-gray-600 font-bold">남은 수령 가능 기간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coupons.map((coupon) => {
                                        const currentDate = new Date(); // 현재 날짜
                                        const getDate = new Date(coupon.getDate); // 쿠폰의 수령 가능 날짜
                                        const remainingDays = Math.ceil((getDate - currentDate) / (1000 * 60 * 60 * 24)); // 남은 일수 계산

                                        return (
                                            <tr
                                                key={coupon.id}
                                                className="border-b hover:bg-gray-100 transition duration-200"
                                                onClick={() => openCouponModal(coupon)}
                                            >
                                                <td className="p-4 text-gray-800">{coupon.name}</td>
                                                <td className="p-4 text-gray-800">
                                                    {remainingDays > 0 ? `${remainingDays}일` : "기간 만료"}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="w-full bg-white border rounded shadow-md">
                        <h2 className="text-xl font-semibold pt-6 pb-4 text-center text-gray-800">
                            이벤트 목록
                        </h2>
                        <div className="border-b"></div>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="p-4 text-left text-gray-600 font-bold">제목</th>
                                        <th className="p-4 text-left text-gray-600 font-bold">시작일</th>
                                        <th className="p-4 text-left text-gray-600 font-bold">종료일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event) => (
                                        <tr
                                            key={event.id}
                                            className="border-b hover:bg-gray-100 transition duration-200"
                                            onClick={() => openEventModal(event)}
                                        >
                                            <td className="p-4 text-gray-800">{event.name}</td>
                                            <td className="p-4 text-gray-800">{event.startDate}</td>
                                            <td className="p-4 text-gray-800">{event.endDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
                            


                {/* 모달 */}
                {isEModalOpen && (
                    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 z-50 items-center justify-center">
                        <DetailModal
                            isEModalOpen={isEModalOpen}
                            selectedItem={selectedItem}
                            closeEventModal={closeEventModal}
                        />
                    </div>
                )}
                {isCModalOpen && (
                    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 z-50 flex items-center justify-center">
                        <CouponDetailModal
                            isCModalOpen={isCModalOpen}
                            selectedItem={selectedItem}
                            closeCouponModal={closeCouponModal}
                        />
                    </div>
                )}

            </div>
        </div>

    );
}
