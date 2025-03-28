import React, { useState, useEffect } from 'react';
import { Search,Trash2 } from "lucide-react";
import { events as initialEvents, coupons as initialCoupons } from "../../dummydata/DummyEvents.jsx";

import EventCreateModal from "../../modal/event-coupon/EventCreateModal.jsx";
import CouponCreateModal from "../../modal/event-coupon/CouponCreateModal.jsx";
import DetailModal from "../../modal/event-coupon/DetailModal.jsx";
import CouponDetailModal from "../../modal/event-coupon/CouponDetailModal.jsx";


export default function EventCouponMenu() {
    const [selectedItem, setSelectedItem] = useState(null); // 모달용 상태
    const [isEModalOpen, setIsEModalOpen] = useState(false);
    const [isCModalOpen, setIsCModalOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("recently");

    // 이벤트 등록
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        start: "",
        end: "",
        detail: ""
    });

    const handleEventSubmit = () => {
        if (newEvent.title && newEvent.start && newEvent.end) {
            setEvents((prevEvents) => [
                ...prevEvents,
                { id: prevEvents.length + 1, ...newEvent },
            ]);
            setIsEventModalOpen(false);
            setNewEvent({ title: "", start: "", end: "",  detail: "" });
        }
    };

    // 쿠폰 등록
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        title: "",
        start: "",
        end: "",
        discountType: "",
        discountValue: "",
        minimumPurchase: "",
    });

    const handleCouponSubmit = () => {
        if (newCoupon.title && newCoupon.start && newCoupon.end) {
            setCoupons((prevCoupons) => [
                ...prevCoupons,
                { id: prevCoupons.length + 1, ...newCoupon },
            ]); // 상태를 업데이트하는 방식으로 추가
            setIsCouponModalOpen(false);
            setNewCoupon({ title: "", start: "", end: "",  discountType: "", discountValue: "", minimumPurchase: "" });
        }
    };

    const openEventModal = (item) => {
        setSelectedItem(item);
        setIsEModalOpen(true);
    };

    const closeEventModal = () => {
        setSelectedItem(null);
        setIsEModalOpen(false);
    };

    const openCouponModal = (item) => {
        setSelectedItem(item);
        setIsCModalOpen(true);
    };

    const closeCouponModal = () => {
        setSelectedItem(null);
        setIsCModalOpen(false);
    };


    // 이벤트와 쿠폰 상태 관리
    const [events, setEvents] = useState(initialEvents); // 초기 이벤트 데이터
    const [coupons, setCoupons] = useState(initialCoupons); // 초기 쿠폰 데이터
    const [sortedData, setSortedData] = useState({ events: [], coupons: [] }); // 정렬된 데이터 상태

    useEffect(() => {
        // 이벤트와 쿠폰 함께 정렬
        const updatedEvents = [...events].sort((a, b) => {
            if (sortOrder === "recently") {
                return new Date(b.start) - new Date(a.start); // 최신순
            } else if (sortOrder === "endDate") {
                return new Date(a.end) - new Date(b.end); // 마감일 순
            }
            return 0;
        });

        const updatedCoupons = [...coupons].sort((a, b) => {
            if (sortOrder === "recently") {
                return new Date(b.start) - new Date(a.start); // 최신순
            } else if (sortOrder === "endDate") {
                return new Date(a.end) - new Date(b.end); // 마감일 순
            }
            return 0;
        });

        setSortedData({ events: updatedEvents, coupons: updatedCoupons });
    }, [sortOrder, events, coupons]); // 정렬 기준, 이벤트 또는 쿠폰 변경 시 실행

    const handleDeleteEvent = (eventId) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    };

    const handleDeleteCoupon = (couponId) => {
        setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon.id !== couponId));
    };



    // // GET 요청으로 초기 데이터 가져오기
    // useEffect(() => {
    //     fetch("http://localhost:5000/api/events")
    //         .then((response) => response.json())
    //         .then((data) => setEvents(data))
    //         .catch((error) => console.error("Error fetching events:", error));
    //
    //     fetch("http://localhost:5000/api/coupons")
    //         .then((response) => response.json())
    //         .then((data) => setCoupons(data))
    //         .catch((error) => console.error("Error fetching coupons:", error));
    // }, []);
    //
    // // POST 요청으로 이벤트 추가
    // const handleEventSubmit = () => {
    //     fetch("http://localhost:1271/shop/addevent", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(newEvent),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setEvents(data.events); // 상태 업데이트
    //             setNewEvent({ title: "", start: "", end: "", detail: "" }); // 입력 초기화
    //         })
    //         .catch((error) => console.error("Error adding event:", error));
    // };
    //
    // // POST 요청으로 쿠폰 추가
    // const handleCouponSubmit = () => {
    //     fetch("http://localhost:5000/api/coupons", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(newCoupon),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setCoupons(data.coupons); // 상태 업데이트
    //             setNewCoupon({
    //                 title: "",
    //                 start: "",
    //                 end: "",
    //                 discountType: "",
    //                 discountValue: "",
    //                 minimumPurchase: "",
    //             }); // 입력 초기화
    //         })
    //         .catch((error) => console.error("Error adding coupon:", error));
    // };



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
                                <tr className="border-b ">
                                    <th className="p-2 text-left">제목</th>
                                    <th className="p-2 text-left">시작일</th>
                                    <th className="p-2 text-left">종료일</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedData.events.map((event) => (
                                    <tr key={event.id} className="border-b hover:bg-gray-50"
                                        onClick={() => openEventModal(event)}>
                                        <td
                                            className="p-2 cursor-pointer"
                                            onClick={() => console.log(event)}
                                        >
                                            {event.title}
                                        </td>
                                        <td className="p-2">{event.start}</td>
                                        <td className="p-2 flex flex-row justify-between items-center">
                                            {event.end}
                                            <button
                                                className="text-red-500 hover:text-red-700 ml-auto"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // 이벤트 전파 방지
                                                    handleDeleteEvent(event.id); // 삭제
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
                                    <th className="p-2 text-left">제목</th>
                                    <th className="p-2 text-left">시작일</th>
                                    <th className="p-2 text-left">종료일</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedData.coupons.map((coupon) => (
                                    <tr key={coupon.id} className="border-b hover:bg-gray-50"
                                        onClick={() => openCouponModal(coupon)}>
                                        <td
                                            className="p-2 cursor-pointer"
                                            onClick={() => console.log(coupon)}
                                        >
                                            {coupon.title}
                                        </td>
                                        <td className="p-2">{coupon.start}</td>
                                        <td className="p-2 flex flex-row justify-between items-center">
                                            {coupon.end}
                                            <button
                                                className="text-red-500 hover:text-red-700 ml-auto"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // 이벤트 전파 방지
                                                    handleDeleteCoupon(coupon.id); // 삭제
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
