import React from "react";

export default function EventCreateModal({ setNewEvent, newEvent, isEventModalOpen, setIsEventModalOpen, handleEventSubmit }){

    return(
        <div>
            {isEventModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-6 max-w-lg w-[700px] h-auto">
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold mb-4">이벤트 등록</h3>
                            <input
                                type="text"
                                placeholder="이벤트 제목"
                                className="w-full p-2 mb-2 border rounded"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                            />

                            <p className="mt-2">이벤트 날짜</p>
                            <div className="flex flex-row w-full space-x-5">
                                <input
                                    type="date"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newEvent.start}
                                    onChange={(e) => setNewEvent({...newEvent, start: e.target.value})}
                                />
                                <p>-</p>
                                <input
                                    type="date"
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newEvent.end}
                                    onChange={(e) => setNewEvent({...newEvent, end: e.target.value})}
                                />
                            </div>
                            <div className="flex flex-col mt-3">
                                <p>이벤트 상세 내용</p>
                                <textarea
                                    id="eventdetail"
                                    className="w-full min-h-[200px] border rounded p-2 resize-none"
                                    onChange={(e) => setNewEvent({...newEvent, detail: e.target.value})}
                                    value={newEvent.detail || ""}
                                />
                            </div>

                            {/* 할인 유형 선택 */}
                            <p className="mt-4">할인 유형</p>
                            <div className="flex items-center space-x-4 mb-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="discountType"
                                        className="mr-2"
                                        checked={newEvent.discountType === "percent"}
                                        onChange={() =>
                                            setNewEvent({ ...newEvent, discountType: "percent", discountValue: "" })
                                        }
                                    />
                                    퍼센트 할인 (%)
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="discountType"
                                        className="mr-2"
                                        checked={newEvent.discountType === "amount"}
                                        onChange={() =>
                                            setNewEvent({ ...newEvent, discountType: "amount", discountValue: "" })
                                        }
                                    />
                                    정액 할인 (원)
                                </label>
                            </div>

                            {/* 할인 값 입력 */}
                            {newEvent.discountType && (
                                <input
                                    type="number"
                                    placeholder={
                                        newEvent.discountType === "percent"
                                            ? "할인율을 입력하세요 (%)"
                                            : "할인 금액을 입력하세요 (원)"
                                    }
                                    className="w-full p-2 mb-2 border rounded"
                                    value={newEvent.discountValue || ""}
                                    onChange={(e) =>
                                        setNewEvent({
                                            ...newEvent,
                                            discountValue: e.target.value,
                                        })
                                    }
                                />
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleEventSubmit}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                등록
                            </button>
                            <button
                                onClick={() => setIsEventModalOpen(false)}
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
