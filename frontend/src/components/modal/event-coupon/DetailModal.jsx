import React from "react";

export default function DetailModal({ isEModalOpen, selectedItem, closeEventModal}){
    return(
        <div>
            {isEModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-md p-6 max-w-lg w-full">
                        <h3 className="text-xl font-semibold mb-4">{selectedItem.title}</h3>
                        <div className="flex flex-row space-x-5">
                            <p className="mb-2">진행 날짜 : {selectedItem.start}</p>
                            <p>/</p>
                            <p className="mb-4">{selectedItem.end}</p>
                        </div>
                        <div>
                            <p className="mb-4">
                                할인 금액 :
                                {selectedItem.discountType === "percent"
                                    ? ` ${selectedItem.discountValue}%`
                                    : selectedItem.discountType === "amount"
                                        ? ` ${selectedItem.discountValue}원`
                                        : "없음"}
                            </p>
                        </div>

                        <textarea
                            id="eventdetail"
                            className="w-full min-h-[200px] border rounded p-2 resize-none"
                            value={selectedItem.detail}
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={closeEventModal}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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