export default function ShopReservationCheck({ isModalOpen, modalData, setIsModalOpen}){
    return(
        <>
            {isModalOpen && modalData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-10 min-w-[400px]">
                        <div className="flex flex-col justify-between">
                            <h2 className="text-xl font-bold pb-5">{modalData.client}</h2>
                            <div className="flex flex-row justify-between">
                                <p>메뉴 : </p>
                                <p className="text-gray-600">{modalData.menu}</p>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p>담당 디자이너 : </p>
                                <p className="text-gray-600">{modalData.designer}</p>
                            </div>

                            <div className="flex flex-row justify-between">
                                <p>예약 시간 : </p>
                                <p className="text-gray-600">{modalData.time}</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>예약 날짜 : </p>
                                <p className="text-gray-600">{modalData.date}</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>가격 : </p>
                                <p className="text-gray-600">{modalData.cash}</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <p>결제 상태: </p>
                                <p
                                    className={`text-sm font-bold ${
                                        modalData.status === "완료" ? "text-green-500" : "text-red-500"
                                    }`}
                                >
                                    {modalData.status === "완료" ? "결제 완료" : "결제 미완료"}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}