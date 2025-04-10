import React, { useState, useEffect } from "react";
// import ApiEvent from "../../businessabout/eventmenu/axios/ApiEvent.jsx"; // 백엔드 호출 부분 주석 처리
import { reservation } from "../../reservation/menuselect/MenuSelect.jsx"; // 예약 데이터 import

export default function EventCreateModal({
                                             setNewEvent,
                                             newEvent,
                                             isEventModalOpen,
                                             setIsEventModalOpen,
                                             handleEventSubmit,
                                         }) {
    const [menuOptions, setMenuOptions] = useState([]); // 메뉴 데이터 상태

    useEffect(() => {
        // 🔹 reservation.menu 데이터를 menuOptions에 반영
        const formattedMenu = Object.entries(reservation.menu).flatMap(([category, menus]) =>
            menus.map((menu) => ({
                m_category: category, // 메뉴 카테고리
                m_name: menu.title, // 메뉴 이름 (reservation.menu에서는 title로 되어 있음)
                m_id: menu.title, // 임시 ID (DB와 연결될 경우 변경 필요)
            }))
        );
        setMenuOptions(formattedMenu);
    }, []);

    const handleModalClose = () => {
        setNewEvent({
            e_id: "",
            e_name: "",
            e_start_date: "",
            e_end_date: "",
            e_type: "",
            e_amount: "",
            s_id: "",
            m_id: "",
        });
        setIsEventModalOpen(false);
    };

    const handleEventSubmitWithId = () => {
        const eventId = crypto.randomUUID();
        setNewEvent({ ...newEvent, e_id: eventId });
        handleEventSubmit();
    };

    return (
        <div>
            {isEventModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-6 max-w-lg w-[700px] h-auto">
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold mb-4">이벤트 등록</h3>

                            {/* 메뉴 선택 */}
                            <p className="mt-4 mb-2 font-bold">메뉴 선택</p>
                            <select
                                className="w-full p-2 mb-2 border rounded"
                                value={newEvent.m_id || ""}
                                onChange={(e) => setNewEvent({ ...newEvent, m_id: e.target.value })}
                            >
                                <option value="">메뉴를 선택하세요</option>
                                {menuOptions.map((menu) => (
                                    <option key={menu.m_id} value={menu.m_id}>
                                        [{menu.m_category}] {menu.m_name}
                                    </option>
                                ))}
                            </select>

                            {/* 이벤트 제목 */}
                            <p className="mt-4 mb-2 font-bold">이벤트 제목</p>
                            <input
                                type="text"
                                placeholder="이벤트 제목"
                                className="w-full p-2 mb-2 border rounded"
                                value={newEvent.e_name || ""}
                                onChange={(e) => setNewEvent({ ...newEvent, e_name: e.target.value })}
                            />

                            {/* 할인 유형 및 값 */}
                            <p className="mt-4 mb-2 font-bold">할인 유형</p>
                            <div className="flex items-center space-x-4 mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="discountType"
                                        className="mr-2"
                                        checked={newEvent.e_type === "PERCENT"}
                                        onChange={() => setNewEvent({ ...newEvent, e_type: "PERCENT", e_amount: "" })}
                                    />
                                    퍼센트 할인 (%)
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="discountType"
                                        className="mr-2"
                                        checked={newEvent.e_type === "FIXED"}
                                        onChange={() => setNewEvent({ ...newEvent, e_type: "FIXED", e_amount: "" })}
                                    />
                                    정액 할인 (원)
                                </label>
                            </div>

                            {/* 할인 값 입력 */}
                            {newEvent.e_type && (
                                <input
                                    type="number"
                                    placeholder={
                                        newEvent.e_type === "PERCENT" ? "할인율을 입력하세요 (%)" : "할인 금액을 입력하세요 (원)"
                                    }
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newEvent.e_amount || ""}
                                    onChange={(e) => setNewEvent({ ...newEvent, e_amount: e.target.value })}
                                />
                            )}

                            {/* 이벤트 날짜 */}
                            <p className="mt-4 mb-2 font-bold">이벤트 기간</p>
                            <div className="flex flex-row w-full space-x-5">
                                <input
                                    type="date"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newEvent.e_start_date}
                                    onChange={(e) => setNewEvent({ ...newEvent, e_start_date: e.target.value })}
                                />
                                <p>-</p>
                                <input
                                    type="date"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newEvent.e_end_date}
                                    onChange={(e) => setNewEvent({ ...newEvent, e_end_date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleEventSubmitWithId}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                등록
                            </button>
                            <button
                                onClick={handleModalClose}
                                className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
