import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function GiveCoupon({ isModalOpen, handleCouponModalOpen, handleCouponModalClose }) {
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const navigate = useNavigate();
  const [coupons] = useState([
    {
      id: 1,
      name: "8,500원 할인 쿠폰",
      description: "5만원 이상 지출 시 사용가능",
      value: "8500",
    },
    {
      id: 2,
      name: "5,000원 할인 쿠폰",
      description: "2만원 이상 지출 시 사용가능",
      value: "5000",
    },
    {
      id: 3,
      name: "2,000원 할인 쿠폰",
      description: "1만원 이상 지출 시 사용가능",
      value: "2000",
    },
  ]);

  const handleCouponClick = () => {
    navigate("/coupon");
  };



  const handleCouponSelect = (coupon) => {
    setSelectedCoupons((prevCoupons) => {
      return prevCoupons.some((c) => c.id === coupon.id)
        ? prevCoupons
        : [...prevCoupons, coupon];
    });
  };

  return (
    <div className="mb-4 flex flex-col justify-center items-center w-full">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-lg text-center relative w-[600px] h-[570px] z-100">
            <button
              onClick={handleCouponModalClose}
              className="absolute top-3 right-5 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold pb-4">쿠폰 한 번에 보기</h2>

            {/* 쿠폰 목록 */}
            <div className="flex-col mt-4 p-10 flex justify-center items-center mx-auto">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  onClick={() => handleCouponSelect(coupon)}
                  className={`p-5 mb-3 border rounded-lg cursor-pointer 
                                    ${
                                      selectedCoupons.some(
                                        (c) => c.id === coupon.id
                                      )
                                        ? "bg-green-400 text-white"
                                        : "bg-white text-black"
                                    }`}
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
