import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../../axios/AxiosInstance.js";
import logo from "../../../assets/logo/logo.png";

//eslint-disable-next-line
export default function CouponModal({ isOpen, onClose }) {
  //eslint-disable-next-line
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponlist, setCouponList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCoupon = async () => {
      if (isOpen) {
        try {
          setLoading(true);
          console.log("쿠폰함 열림 - API 요청 시작");
          console.log("요청 URL:", axiosInstance.defaults.baseURL + "/user/allcoupons");
          
          const response = await axiosInstance.get("/user/allcoupons");
          const data = response.data;

          console.log("=== 쿠폰 데이터 응답 ===");
          console.log("응답 상태:", response.status);
          console.log("응답 헤더:", response.headers);
          console.log("쿠폰 데이터:", data);
          console.log("쿠폰 개수:", Array.isArray(data) ? data.length : "데이터가 배열이 아님");
          console.log("=== 쿠폰 데이터 응답 끝 ===");
          
          setCouponList(data);
          setLoading(false);
        } catch (error) {
          console.error("=== 쿠폰 데이터 로딩 에러 ===");
          console.error("에러 메시지:", error.message);
          console.error("에러 응답:", error.response?.data);
          console.error("에러 상태:", error.response?.status);
          console.error("요청 URL:", error.config?.url);
          console.error("요청 메서드:", error.config?.method);
          console.error("요청 헤더:", error.config?.headers);
          console.error("=== 쿠폰 데이터 로딩 에러 끝 ===");
          
          // 400 에러인 경우 인증 문제일 수 있음
          if (error.response?.status === 400) {
            console.log("400 에러 발생 - 인증 문제 또는 잘못된 요청");
            console.log("에러 상세:", error.response?.data);
            
            // 에러 메시지에 따라 다른 처리
            const errorMessage = error.response?.data?.message || error.response?.data;
            if (errorMessage && errorMessage.includes("로그인")) {
              console.log("로그인이 필요한 상태");
            } else if (errorMessage && errorMessage.includes("쿠폰")) {
              console.log("쿠폰 관련 에러:", errorMessage);
              // 쿠폰이 없는 경우 빈 배열로 설정
              if (errorMessage.includes("쿠폰이 존재하지 않아요")) {
                console.log("쿠폰이 없는 상태 - 빈 배열로 설정");
                setCouponList([]);
                setLoading(false);
                return;
              }
            }
          }
          
          // 404 에러인 경우 다른 엔드포인트 시도
          if (error.response?.status === 404) {
            console.log("404 에러 발생 - 다른 엔드포인트 시도 중...");
            try {
              // 다른 가능한 엔드포인트들 시도
              const alternativeEndpoints = [
                "/user/coupons",
                "/coupons",
                "/user/mycoupons"
              ];
              
              for (const endpoint of alternativeEndpoints) {
                try {
                  console.log(`시도 중: ${endpoint}`);
                  const altResponse = await axiosInstance.get(endpoint);
                  console.log(`${endpoint} 성공:`, altResponse.data);
                  setCouponList(altResponse.data);
                  setLoading(false);
                  return;
                } catch (altError) {
                  console.log(`${endpoint} 실패:`, altError.response?.status);
                }
              }
            } catch (altError) {
              console.error("대체 엔드포인트도 모두 실패:", altError);
            }
          }
          
          setLoading(false);
        }
      }
    };

    fetchCoupon();
  }, [isOpen]);

  // 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 no-scrollbar z-[80]"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg z-[85]"
            style={{ width: "600px", height: "85vh" }}
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 50 
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0 
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 50 
            }}
            transition={{ 
              duration: 0.3,
              ease: "easeOut"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex-1 text-center">내 쿠폰함</h2>
              <motion.button 
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
              >
                <X className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>
            
            <div
              className="overflow-y-auto no-scrollbar"
              style={{
                maxHeight: "71vh",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="text-gray-500">쿠폰을 불러오는 중...</div>
                </div>
              ) : couponlist.length > 0 ? (
                couponlist.map((coupon, index) => (
                  <motion.div
                    key={coupon.id || index}
                    className="border-b border-gray-200 py-4 my-4 rounded-lg shadow bg-gray-100 relative flex items-center gap-6 mx-auto"
                    style={{ maxWidth: "380px", padding: "16px" }}
                    initial={{ 
                      opacity: 0, 
                      x: -20 
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 0 
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.1 
                    }}
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
                  </motion.div>
                ))
              ) : (
                <div className="flex justify-center items-center h-32">
                  <div className="text-gray-500">보유한 쿠폰이 없습니다.</div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
