import { X } from "lucide-react";

export default function CheckDetailModal({ reservation, onClose}) {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-[600px] relative">
                <button onClick={onClose} className="absolute top-2 right-2">
                    <X className="w-6 h-6 text-gray-600" />
                </button>
                <h2 className="flex justify-center items-center text-2xl font-bold">최종 예약 확인</h2>

                <div className="m-5 justify-center items-center font-bold ">
                    <p className="text-gray-500 font-semibold text-xl">예약 정보</p>
                    <div className="flex flex-col font-bold p-5">
                        <div className="flex w-full mt-2">
                            <div className="w-1/3 text-left">헤어샵:</div>
                            <div className="w-2/3 text-right">{reservation.salonName}</div>
                        </div>
                        <div className="flex w-full mt-2">
                            <div className="w-1/3 text-left">디자이너:</div>
                            <div className="w-2/3 text-right">{reservation.designer}</div>
                        </div>
                        <div className="flex w-full mt-2">
                            <div className="w-1/3 text-left">날짜:</div>
                            <div className="w-2/3 text-right">{reservation.date}</div>
                        </div>
                        <div className="flex flex-col w-full mt-2">
                            <div className="text-left font-semibold">메뉴</div>
                            <div className="flex items-center gap-6 m-5">
                                <img src={reservation.imageUrl} alt="메뉴 이미지" className="h-[100px] w-[100px]"/>
                                <p className="w-4/5 text-right">{reservation.title}</p>
                            </div>
                        </div>
                        <div className="flex w-full mt-2">
                            <div className="w-1/3 text-left">총 합 가격:</div>
                            <div className="w-2/3 text-right">{reservation.price}원</div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-4">
                        <div className="flex justify-between w-full px-4 gap-4">
                            <div className="flex-grow">
                                <div className="flex items-center justify-between bg-gray-100 p-2 border rounded-lg">
                                    <p>쿠폰: {reservation.selectedCoupon}</p>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center bg-gray-100 p-2 border rounded-lg">
                                    <p className="mr-2">멤버십: {reservation.selectedMembership}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="w-full border-t border-gray-300 m-3"/>
                    <p className="text-lg font-bold mt-2 px-5">최종 결제 금액: {reservation.finalPrice}원</p>
                    <div className="flex flex-col justify-center items-center m-5 w-full">
                        <div className="flex gap-4">
                            {reservation.status !== "예약취소" ? (
                                <>
                                    <button onClick={onClose}
                                            className="bg-[#00B3A6] text-white px-6 py-3 rounded-lg">예약 확인
                                    </button>
                                    <button onClick={/* 이후 취소 로직 추가 */onClose}
                                            className="bg-red-500 text-white px-6 py-3 rounded-lg">예약 취소
                                    </button>
                                </>
                            ) : (
                                <button onClick={onClose}
                                        className="bg-[#00B3A6] text-white px-6 py-3 rounded-lg">확인</button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
