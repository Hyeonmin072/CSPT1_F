import React, { useState, useEffect } from 'react';
import { Search,Trash2 } from "lucide-react";
import ApiEvent from "./axios/ApiEvent.jsx";

import EventCreateModal from "../../modal/event-coupon/EventCreateModal.jsx";
import CouponCreateModal from "../../modal/event-coupon/CouponCreateModal.jsx";
import DetailModal from "../../modal/event-coupon/DetailModal.jsx";
import CouponDetailModal from "../../modal/event-coupon/CouponDetailModal.jsx";


export default function EventCouponMenu() {
    const [selectedItem, setSelectedItem] = useState(null); // 모달용 상태
    const [isEModalOpen, setIsEModalOpen] = useState(false);
    const [isCModalOpen, setIsCModalOpen] = useState(false);

    // 이벤트 등록
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        e_name: "",
        e_start_date: "",
        e_end_date: "",
        e_detail: "",
        e_type: "",
        e_discount: "",
        s_id: "",
    });

    // 쿠폰 등록
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        c_name: "",
        c_get_date: "",
        c_use_date: "",
        c_type: "",
        c_price: "",
        s_id: "",
    });

    // 데이터 초기 로드
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        try {
            // 백엔드에서 데이터 가져오는 코드 (주석 처리)
            // const eventsData = await ApiEvent.fetchEvents();
            // const couponsData = await ApiEvent.fetchCoupons();
            // const businessId = await ApiEvent.fetchBusinessId();

            const businessId = { data: { s_id: "shop123" } };

            // 더미 데이터
            const eventsData = [
                { e_name: "여름 세일", e_start_date: "2025-07-01", e_end_date: "2025-07-31", e_type: "PERCENT", e_discount: 10, s_id: "shop123" },
                { e_name: "가을 프로모션", e_start_date: "2025-09-01", e_end_date: "2025-09-30", e_type: "FIXED", e_discount: 3000, s_id: "shop123" },
            ];

            const couponsData = [
                { c_name: "신규 가입 할인", c_get_date: 7, c_use_date: 30, c_type: "FIXED", c_price: 5000, s_id: "shop123" },
                { c_name: "VIP 고객 할인", c_get_date: 5, c_use_date: 15, c_type: "PERCENT", c_price: 15, s_id: "shop123" },
            ];

            // 현재 s_id와 일치하는 데이터만 필터링
            const filteredEvents = eventsData.filter(event => event.s_id === businessId.data.s_id);
            const filteredCoupons = couponsData.filter(coupon => coupon.s_id === businessId.data.s_id);

            const today = new Date(); // 현재 날짜

            // 🔥 종료된 이벤트 제거 (오늘 날짜보다 e_end_date가 이전인 경우)
            const activeEvents = filteredEvents.filter(event => new Date(event.e_end_date) >= today);

            // 🔥 만료된 쿠폰 제거 (c_use_date가 오늘 날짜에서 빼면 -1이 되면 제거)
            const activeCoupons = filteredCoupons.filter(coupon => {
                const remainingDays = coupon.c_use_date - today.getDate();
                return remainingDays >= 0;
            });

            setNewEvent(prevEvent => ({ ...prevEvent, s_id: businessId.data.s_id }));
            setNewCoupon(prevCoupon => ({ ...prevCoupon, s_id: businessId.data.s_id }));

            setEvents(activeEvents); // 🔥 만료되지 않은 이벤트만 저장
            setCoupons(activeCoupons); // 🔥 만료되지 않은 쿠폰만 저장
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);


    // 이벤트 등록
    const handleEventSubmit = async () => {
        if (newEvent.e_name && newEvent.e_start_date && newEvent.e_end_date) {
            try {
                const addedEvent = await ApiEvent.createEvents(newEvent);
                setEvents((prevEvents) => [...prevEvents, addedEvent]);
                setNewEvent({
                    e_name: "",
                    e_start_date: "",
                    e_end_date: "",
                    e_type: "",
                    e_discount: "",
                    s_id: newEvent.s_id, // 초기화 시에도 s_id 유지
                });
            } catch (error) {
                console.error("Error creating event:", error);
            }
        }
    };

    // 쿠폰 등록
    const handleCouponSubmit = async () => {
        if (newCoupon.c_name && newCoupon.c_get_date && newCoupon.c_use_date) {
            try {
                const addedCoupon = await ApiEvent.createCoupons(newCoupon);
                setCoupons((prevCoupons) => [...prevCoupons, addedCoupon]);
                setNewCoupon({
                    c_name: "",
                    c_use_date: "",
                    c_get_date: "",
                    c_type: "",
                    c_price: "",
                    s_id: newCoupon.s_id,
                });
            } catch (error) {
                console.error("Error creating coupon:", error);
            }
        }
    };

    const openEventModal = (item) => { setSelectedItem(item); setIsEModalOpen(true); };
    const closeEventModal = () => { setSelectedItem(null); setIsEModalOpen(false); };
    const openCouponModal = (item) => { setSelectedItem(item); setIsCModalOpen(true); };
    const closeCouponModal = () => { setSelectedItem(null); setIsCModalOpen(false); };

    // 이벤트와 쿠폰 상태 관리
    const [events, setEvents] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [sortedData, setSortedData] = useState({ events: [], coupons: [] });
    const [sortOrder, setSortOrder] = useState("recently");

    useEffect(() => {
        const today = new Date(); // 현재 날짜

        // 🔹 이벤트 정렬
        const sortedEvents = [...events].sort((a, b) => {
            if (sortOrder === "recently") {
                return new Date(b.e_start_date) - new Date(a.e_start_date); // 최신순 (내림차순)
            } else {
                return new Date(a.e_end_date) - new Date(b.e_end_date); // 마감일 순 (오름차순)
            }
        });

        // 🔹 쿠폰 정렬
        const sortedCoupons = [...coupons]
            .map(coupon => ({
                ...coupon,
                remainingDays: coupon.c_use_date - today.getDate() // 남은 일수 계산
            }))
            .filter(coupon => coupon.remainingDays >= 0) // 🔥 만료된 쿠폰 제거
            .sort((a, b) => {
                if (sortOrder === "recently") {
                    return new Date(b.c_get_date) - new Date(a.c_get_date); // 최신순 (내림차순)
                } else {
                    return a.remainingDays - b.remainingDays; // 남은 일수 짧은 순 (오름차순)
                }
            });

        setSortedData({ events: sortedEvents, coupons: sortedCoupons });
    }, [sortOrder, events, coupons]);




    return (
        <div className="max-w-8xl p-10 mx-10 flex flex-col">
            <div>
                <div className="flex flex-row justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-center mb-6">이벤트 및 쿠폰 관리</h1>

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
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            onClick={() => setIsEventModalOpen(true)}
                        >
                            이벤트 등록
                        </button>

                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            onClick={() => setIsCouponModalOpen(true)}
                        >
                            쿠폰 등록
                        </button>
                    </div>
                </div>

                <div className="flex justify-between gap-6">
                    {/* 이벤트 리스트 */}
                    <div className="w-1/2 bg-white p-4">
                        <h2 className="text-lg font-semibold mb-4 text-center">진행중인 이벤트 목록</h2>
                        <div className="border rounded">
                            <table className="w-full table-auto">
                                <thead>
                                <tr className="border-b">
                                    <th className="p-2 text-left">제목</th>
                                    <th className="p-2 text-left">시작일</th>
                                    <th className="p-2 text-left">종료일</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedData.events.map((event) => (
                                    <tr key={event.e_id} className="border-b hover:bg-gray-50" onClick={() => openEventModal(event)}>
                                        <td
                                            className="p-2 cursor-pointer"
                                            onClick={() => console.log(event)}
                                        >
                                            {event.e_name}
                                        </td>
                                        <td className="p-2">{event.e_start_date}</td>
                                        <td className="p-2 flex flex-row justify-between items-center">
                                            {event.e_end_date}
                                            <button
                                                className="text-red-500 hover:text-red-700 ml-auto"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    //handleDeleteEvent(event.e_id);
                                                }}
                                            >
                                                <Trash2 size={18}/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 쿠폰 리스트 */}
                    <div className="w-1/2 bg-white p-4">
                        <h2 className="text-lg font-semibold mb-4 text-center">쿠폰 목록</h2>
                        <div className="border rounded">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                <tr className="border-b">
                                    <th className="p-2 w-1/2 text-left">쿠폰 이름</th>
                                    <th className="p-2 w-1/2 text-left">남은 수령 가능 기간</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedData.coupons.map((coupon) => (
                                    <tr key={coupon.c_id} className="w-full border-b hover:bg-gray-50"
                                        onClick={() => openCouponModal(coupon)}>
                                        <td
                                            className="p-2 w-1/2 cursor-pointer"
                                            onClick={() => console.log(coupon)}
                                        >
                                            {coupon.c_name}
                                        </td>
                                        <td className="p-2 flex flex-row justify-between items-center">
                                            <div className="px-12 flex justify-center">
                                                {coupon.c_get_date}일
                                            </div>
                                            <button
                                                className="w-1/2 text-red-500 hover:text-red-700 flex justify-end"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    //handleDeleteEvent(event.e_id);
                                                }}
                                            >
                                                <Trash2 size={18}/>
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>


                {/* 모달 */}
                <DetailModal
                    isEModalOpen={isEModalOpen}
                    selectedItem={selectedItem}
                    closeEventModal={closeEventModal}
                />

                <CouponDetailModal
                    isCModalOpen={isCModalOpen}
                    selectedItem={selectedItem}
                    closeCouponModal={closeCouponModal}
                />


                <EventCreateModal
                    setNewEvent={setNewEvent}
                    newEvent={newEvent}
                    isEventModalOpen={isEventModalOpen}
                    setIsEventModalOpen={setIsEventModalOpen}
                    handleEventSubmit={handleEventSubmit}
                />

                <CouponCreateModal
                    newCoupon={newCoupon}
                    setNewCoupon={setNewCoupon}
                    isCouponModalOpen={isCouponModalOpen}
                    setIsCouponModalOpen={setIsCouponModalOpen}
                    handleCouponSubmit={handleCouponSubmit}
                />

            </div>
        </div>

    );
}
