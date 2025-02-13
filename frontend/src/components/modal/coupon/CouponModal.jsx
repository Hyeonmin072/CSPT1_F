import { X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../../assets/logo/logo.png";

const coupons = [
  {
    id: 1,
    image: logo,
    discount: "10,000원 할인",
    validity: "26-06-07까지",
    range: "100,000원 이상시 사용가능",
  },
  {
    id: 2,
    image: logo,
    discount: "99% 할인",
    validity: "26-06-07까지",
    range: "???",
  },
  {
    id: 3,
    image: logo,
    discount: "99% 할인",
    validity: "26-06-07까지",
    range: "마감세일",
  },
  {
    id: 4,
    image: logo,
    discount: "1,000원 할인",
    validity: "26-06-07까지",
    range: "10,000원 이상시 사용가능",
  },
  {
    id: 5,
    image: logo,
    discount: "5,000원 할인",
    validity: "26-06-07까지",
    range: "50,000원 이상시 사용가능",
  },
];

//eslint-disable-next-line
export default function CouponModal({ isOpen, onClose }) {
  //eslint-disable-next-line
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달이 열릴 때 배경 스크롤 막기
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 막기
    } else {
      document.body.style.overflow = ""; // 원래대로
    }

    return () => {
      document.body.style.overflow = ""; // 언마운트 시 원래대로
    };
  }, [isModalOpen]);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 no-scrollbar z-40"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg"
        style={{ width: "600px", height: "85vh" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex-1 text-center">내 쿠폰함</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div
          className="overflow-y-auto no-scrollbar"
          style={{
            maxHeight: "71vh",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="border-b border-gray-200 py-4 my-4 rounded-lg shadow bg-gray-100 relative flex items-center gap-6 mx-auto"
              style={{ maxWidth: "380px", padding: "16px" }}
            >
              <img
                src={logo}
                alt="로고"
                className="w-12 h-12 mr-4 relative z-10"
              />
              <div
                className="border-dashed border-r-2 border-gray-400 absolute left-20 top-0 bottom-0"
                style={{ width: "12px" }}
              ></div>
              <div className="ml-15">
                <h3 className="text-lg font-semibold">{coupon.discount}</h3>
                <p className="text-gray-500">{coupon.validity}</p>
                <p className="text-gray-500">{coupon.range}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
