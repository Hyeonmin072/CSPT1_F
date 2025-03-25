import { X } from "lucide-react";
export default function ClientCheckModal({ isModalOpen, setIsModalOpen, modalData}){
    return(
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="relative bg-white rounded-lg p-6 w-[400px] h-[300px]">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5">
                            <X className="w-6 h-6 text-gray-600" />
                        </button>

                        <h2 className="text-lg font-bold mb-4 flex items-center flex-col pb-4">예약 상세 정보</h2>
                        {modalData && (
                            <div className="m-3">
                                <p className="pb-2"><strong className="px-2">고객 이름:</strong> {modalData.client}</p>
                                <p className="pb-2"><strong className="px-2">메뉴:</strong> {modalData.menu}</p>
                                <p className="pb-2"><strong className="px-2">시간:</strong> {modalData.time}</p>
                                <p className="pb-2"><strong className="px-2">가격:</strong> {modalData.cash}</p>
                                <p className="pb-2"><strong className="px-2">상태:</strong> {modalData.status === "완료" ? "완료" : "미완료"}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}