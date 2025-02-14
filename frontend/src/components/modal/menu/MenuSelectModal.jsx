import { useState } from "react";
import { X } from "lucide-react";

import FinalMenuModal from "./FinalMenuModal.jsx"

export default function MenuSelectModal({item, onClose}){
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [couponDropdownOpen, setCouponDropdownOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState('선택 안됨');
    const [coupons] = useState(['쿠폰 1', '쿠폰 2', '쿠폰 3']);

    const handleFinalReservation = () => {
        setShowFinalModal(true);
    };

    const toggleCouponDropdown = () => {
        setCouponDropdownOpen(!couponDropdownOpen);
    };

    const selectCoupon = (coupon) => {
        setSelectedCoupon(coupon);
        setCouponDropdownOpen(false);
    };



    return (
        <div className="fixed border rounded-lg flex items-center justify-center z-50">
            <div className="bg-white p-10 relative w-[900px] ">
                <button onClick={onClose} className="absolute top-5 right-5">
                    <X className="w-6 h-6 text-gray-600"/>
                </button>

                <h2 className="text-2xl font-bold mb-4">예약 확인</h2>
                <p className="text-gray-500 font-semibold">메뉴 - {item.title}</p>
                <hr className="w-full border-t border-gray-300 mb-6 mt-6"/>
                <p className="mt-2 text-gray-500 font-semibold">상세설명</p>

                <div className="font-bold">
                    <p className="mt-2 px-5 p-1">시술대상: {item.target}</p>
                    <p className="mt-2 px-5 p-1">커트옵션: {item.cutOption}</p>
                    <p className="mt-2 px-5 p-1">샴푸옵션: {item.shampooOption}</p>
                    <p className="mt-2 px-5 p-1">스타일링옵션: {item.stylingOption}</p>
                    <p className="mt-4 px-5 p-1">{item.description}</p>
                    <div className="flex flex-col w-full mt-10">
                        <button onClick={handleFinalReservation}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg">예약하기
                        </button>
                    </div>
                </div>
            </div>
            {showFinalModal && (
                <FinalMenuModal
                    reservation={{
                        salonName: '포레포레 헤어 고속터미널점',
                        designer: '디자이너 유용준',
                        date: '25년 1월 15일 15시 30분',
                        title: item.title,
                        price: item.price,
                        selectedCoupon: selectedCoupon,
                        coupons: coupons,
                        couponDropdownOpen: couponDropdownOpen,
                        toggleCouponDropdown: toggleCouponDropdown,
                        selectCoupon: selectCoupon,
                        selectedMembership: '실버',
                        memberships: ['실버', '골드', '플래티넘'],
                        membershipDropdownOpen: false,
                        toggleMembershipDropdown: () => {},
                        selectMembership: () => {},
                        finalPrice: item.price,
                    }}
                    onClose={() => setShowFinalModal(false)}
                />
            )}
        </div>
    );
}