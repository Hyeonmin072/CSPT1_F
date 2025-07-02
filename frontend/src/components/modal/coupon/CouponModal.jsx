import { X } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../sign/axios/AxiosInstance";
import logo from "../../../assets/logo/logo.png";

//eslint-disable-next-line
export default function CouponModal({ isOpen, onClose }) {
  //eslint-disable-next-line
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponlist, setCouponList] = useState([]);

    useEffect(() => {
      const fetchCoupon = async() =>{
        try {
            if (isModalOpen) {
              document.body.style.overflow = "hidden"; // 스크롤 막기
            } else {
              document.body.style.overflow = ""; // 원래대로
            }
    
            const response = await axiosInstance("/user/allcoupons");
            const data = response.data;

            console.log("쿠폰 데이터 : ", data);
            setCouponList(data);
            
            return () => {
              document.body.style.overflow = ""; // 언마운트 시 원래대로
            };
        } catch (error) {
            console.log("데이터를 가져오는 데 실패했습니다 : ", error);
        }
      }

      fetchCoupon();
    }, [isModalOpen]);

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 no-scrollbar z-[80]"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg z-[85]"
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
          {couponlist.map((coupon) => (
            <div
              className="border-b border-gray-200 py-4 my-4 rounded-lg shadow bg-gray-100 relative flex items-center gap-6 mx-auto"
              style={{ maxWidth: "380px", padding: "16px" }}
            >
              <div
                className="border-dashed border-r-2 border-gray-400 absolute left-20 top-0 bottom-0"
                style={{ width: "12px" }}
              ></div>
              <div className="ml-15">
                <h3 className="text-lg font-semibold">가게 : {coupon.shopName}</h3>
                <p className="text-gray-500">{coupon.discountType}</p>
                <p className="text-gray-500">{coupon.price}</p>
                <p className="text-gray-500">{coupon.expireDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
