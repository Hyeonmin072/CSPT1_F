import { X } from 'lucide-react';
import logo from "../../assets/logo/logo.png";
import axiosInstance from '../sign/axios/AxiosInstance';
import { useEffect, useState } from 'react';

export default function CouponModal({ isOpen, onClose }) {
    const [couponlist, setCouponList] = useState([]);

    useEffect(() => {
        const fetchCoupon = async() =>{
            try {
                const response = await axiosInstance("/user/allcoupons");
                const data = response.data;

                console.log("쿠폰 데이터 : ", data);
                setCouponList(data);
            } catch (error) {
                console.log("데이터를 가져오는 데 실패했습니다 : ", error);
            }
            
        }

        fetchCoupon();
    }, []);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold flex-1 text-center">내 쿠폰함</h2>
                    <button onClick={onClose}>
                        <X className="w-6 h-6 text-gray-600"/>
                    </button>
                </div>
                <div className="overflow-y-auto no-scrollbar"
                     style={{maxHeight: '60vh', scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                    <style jsx>{`
                            /* 스크롤바를 숨기기 위한 스타일 */
                            .no-scrollbar::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                    {couponlist.map(coupon => (
                        <div key={coupon.id}
                             className="border-b border-gray-200 py-4 px-6 my-4 rounded-lg shadow bg-gray-100 relative flex items-center gap-6">
                            <img src={logo} alt="로고" className="w-12 h-12 mr-4 relative z-10"/>
                            <div
                                className="border-dashed border-r-2 border-gray-400 absolute left-20 top-0 bottom-0"
                                style={{width: '12px'}}></div>
                            <div className="ml-15">
                                <h3 className="text-lg font-semibold">가게 : {coupon.shopName}</h3>
                                <p className="text-gray-500">할인 타입 : {coupon.discountType}</p>
                                <p className="text-gray-500">할인 가격 : {coupon.price}</p>
                                <p className="text-gray-500">만료 기간 : {coupon.expireDate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
