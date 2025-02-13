import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function GiveCoupon() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
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
      <button
        className="bg-[#03DAC5] text-black px-6 py-3 rounded-lg flex items-center gap-2"
        onClick={handleModalOpen}
      >
        최대 8,500원 할인 쿠폰 받기
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-lg text-center relative w-[600px] h-[600px]">
            <button
              onClick={handleModalClose}
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
                                        ? "bg-[#03DAC5] text-white"
                                        : "bg-white text-black"
                                    }`}
                >
                  <h3 className="font-bold">{coupon.name}</h3>
                  <p>{coupon.description}</p>
                </div>
              ))}
            </div>

            {/* "내 쿠폰함 보기" 버튼 배치 */}
            <div className="mt-auto">
              <button
                onClick={handleCouponClick}
                className="bg-[#03DAC5] text-white px-4 py-2 rounded-lg"
                disabled={selectedCoupons.length === 0}
              >
                내 쿠폰함 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
