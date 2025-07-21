import ShopDetail from "../../components/hairshop/hairshopdetail/Detail.jsx";
import Header from "../../components/common/Header.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";
import axiosInstance from "../../components/sign/axios/AxiosInstance";

export default function HairShopDetailPage() {
  const { shopEmail } = useParams();
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // API에서 받아올 데이터 구조
  const [shopData, setShopData] = useState({
    shop: {
      shopName: "",
      shopEmail: "",
      shopThumbnail: "",
      shopTel: "",
      shopDesc: "",
      shopRating: 0,
      shopReviewCount: 0,
      shopOpenTime: "",
      shopCloseTime: "",
      shopAddress: "",
      shopPost: 0,
    },
    designers: [],
    reviews: [],
    highestPriceCoupon: "",
    reviewImageUrl: [],
  });

  useEffect(() => {
    const fetchShopDetail = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(`/shop/detail/${shopEmail}`, {
          withCredentials: true,
        });
        console.log("헤어샵 상세 데이터:", response.data);
        if (response.data) {
          setShopData(response.data);
        }
      } catch (error) {
        console.error("헤어샵 상세 데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (shopEmail) {
      fetchShopDetail();
    }
  }, [shopEmail]);

  const handleModalOpen = () => {
    console.log("handleModalOpen 호출됨");
    setIsModalOpen(true);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleCouponSelect = (coupon) => {
    setSelectedCoupons((prevCoupons) => {
      return prevCoupons.some((c) => c.id === coupon.id)
        ? prevCoupons
        : [...prevCoupons, coupon];
    });
  };

  if (isLoading) {
    return (
      <div>
        <div className="z-50 relative">
          <Header />
        </div>
        <div className="flex justify-center items-center h-[calc(100vh-5rem)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="z-50 relative">
        <Header />
      </div>
      <div className="px-4 z-10 relative mt-24">
        <ShopDetail
          handleModalOpen={handleModalOpen}
          shopEmail={shopEmail}
          shopData={shopData}
        />
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
              {/* 쿠폰 데이터가 있을 때만 표시 */}
              {shopData.highestPriceCoupon && (
                <div
                  className={`border p-10 mb-4 cursor-pointer ${
                    selectedCoupons.some((c) => c.id === "highest")
                      ? "bg-[#70EFDE]"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    handleCouponSelect({
                      id: "highest",
                      name: `${shopData.highestPriceCoupon} 할인 쿠폰`,
                    })
                  }
                >
                  <h3 className="font-bold">
                    {shopData.highestPriceCoupon} 할인 쿠폰
                  </h3>
                  <p>최고 할인율 쿠폰</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
