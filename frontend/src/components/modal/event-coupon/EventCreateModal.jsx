import React from "react";

export default function EventCreateModal({ setNewEvent, newEvent, isEventModalOpen, setIsEventModalOpen, handleEventsSubmit }){

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
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleEventsSubmit}
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