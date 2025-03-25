import ShopDetail from "../../components/hairshop/hairshopdetail/Detail.jsx";
import Header from "../../components/common/Header.jsx";
import { useState } from "react";
import { X } from "lucide-react";

export default function HairShopDetailPage() {
    const [selectedCoupons, setSelectedCoupons] = useState([]);
    const [coupons] = useState([
        { id: 1, name: "8,500원 할인 쿠폰", description: "5만원 이상 지출 시 사용가능", value: "8500" },
        { id: 2, name: "5,000원 할인 쿠폰", description: "2만원 이상 지출 시 사용가능", value: "5000" },
        { id: 3, name: "2,000원 할인 쿠폰", description: "1만원 이상 지출 시 사용가능", value: "2000" },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => {
        console.log('handleModalOpen 호출됨');
        setIsModalOpen(true);
    };
    const handleModalClose = () => setIsModalOpen(false);

    const handleCouponSelect = (coupon) => {
        setSelectedCoupons((prevCoupons) => {
            return prevCoupons.some((c) => c.id === coupon.id) ? prevCoupons : [...prevCoupons, coupon];
        });
    };

    return (
        <div>
            <div className="z-50 relative">
                <Header />
            </div>
            <div className="px-4 z-10 relative">
                <ShopDetail handleModalOpen={handleModalOpen} />
            </div>

            {isModalOpen && (
                <div className="flex z-50 fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-700 items-center justify-center">
                    <div className="bg-white p-10 rounded-lg text-center relative w-[600px] h-[600px] z-60">
                        <button
                            onClick={handleModalClose}
                            className="absolute top-3 right-5 text-gray-500"
                        >
                            <X />
                        </button>
                        <h2 className="text-2xl font-bold pb-4">쿠폰 한 번에 보기</h2>
                        <div className="flex-col mt-4 p-5 flex justify-center items-center mx-auto">
                            {coupons.map((coupon) => (
                                <div
                                    key={coupon.id}
                                    className={`border p-10 mb-4 cursor-pointer ${
                                        selectedCoupons.some((c) => c.id === coupon.id) ? "bg-[#70EFDE]" : "bg-white"
                                    }`}
                                    onClick={() => handleCouponSelect(coupon)}
                                >
                                    <h3 className="font-bold">{coupon.name}</h3>
                                    <p>{coupon.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
