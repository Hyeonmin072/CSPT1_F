import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DesignerInfo from "../../layout/DesignerInfo.jsx";
import DetailHeader from "./DetailHeader.jsx";
import DetailIcon from "./DetailIcon.jsx";
import ReviewImg from "./DetailReviewimg.jsx";
import HairShopDetailReview from "../../layout/HairShopDetailReview.jsx";
import DetailTab from "./DetailTab.jsx";
import { MapPin } from "lucide-react";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";

export default function ShopDetail({ handleModalOpen, shopEmail }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ShopDetail");
  const [shopData, setShopData] = useState({
    name: "",
    designers: [],
    highestPriceCoupon: "",
    reviewImageUrl: [],
    reviews: [],
    shop: {
      shopAddress: "",
      shopCloseTime: "",
      shopDesc: "",
      shopEmail: "",
      shopName: "",
      shopOpenTime: "",
      shopPost: "",
      shopRating: 0,
      shopReviewCount: 0,
      shopTel: "",
      shopThumbnail: null,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 탭 클릭 핸들러
  const handleShopDetailClick = () => setActiveTab("ShopDetail");
  const handleReservationClick = () => navigate(`/designerselect/${shopEmail}`);
  const handleReviewClick = () => navigate("/reviews");

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await axiosInstance.get(
          `/user/shopdetails/${shopEmail}`
        );
        setShopData(response.data);
        setLoading(false);
        console.log(
          "/user/shopdetails/${shopEmail} 샵 상세 데이터:",
          response.data
        );
      } catch (err) {
        console.error("Error fetching shop data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (shopEmail) {
      fetchShopData();
    }
  }, [shopEmail]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!shopData) return <div>미용실 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center px-20 gap-6">
      {/* 왼쪽: 가게 상세 정보 */}
      <div className="flex flex-col w-full mb-6 bg-white">
        <DetailHeader shopData={shopData.shop} />
        <div className="relative">
          {/* 샵 이름 - 이미지 길이만큼 박스로 감싸기 */}
          <div className="w-full h-[70px] bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg flex items-center justify-center mb-4 mt-12 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <span className="text-gray-800 px-6 py-3 text-2xl font-bold drop-shadow-sm">
              {shopData.shop.shopName || "샵 이름"}
            </span>
          </div>

          {/* 샵 이미지 */}
          {shopData.shop.shopThumbnail ? (
            <img
              src={shopData.shop.shopThumbnail}
              alt="샵 사진"
              className="w-full h-[370px] rounded-lg object-cover"
            />
          ) : (
            <div className="w-full h-[370px] rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">이미지가 없습니다</span>
            </div>
          )}

          {/* 탭 메뉴 */}
          <div className="bg-white p-5 rounded-lg mt-6">
            <DetailTab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleShopDetailClick={handleShopDetailClick}
              handleReservationClick={handleReservationClick}
              handleReviewClick={handleReviewClick}
              shopEmail={shopData.shop.shopEmail}
            />
          </div>

          {/* 상세 정보 */}
          <div className="bg-white p-10 rounded-lg">
            <div className="px-3">
              <div className="mb-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5" />
                  <h2 className="text-xl font-bold ml-2">
                    {shopData.shop.shopName || "샵 이름"}
                  </h2>
                </div>
                <p className="text-gray-500 mt-2">
                  장소: {shopData.shop.shopAddress || "주소 정보 없음"}
                </p>
                <p className="text-gray-500">
                  운영 시간: {shopData.shop.shopOpenTime || "00:00"} -{" "}
                  {shopData.shop.shopCloseTime || "23:00"}
                </p>
                <p className="text-gray-500">
                  전화번호: {shopData.shop.shopTel || "전화번호 정보 없음"}
                </p>
                <p className="text-gray-500">
                  설명: {shopData.shop.shopDesc || "설명 없음"}
                </p>
              </div>
              <div>
                <DetailIcon shopData={shopData.shop} />
              </div>

              {shopData.highestPriceCoupon && (
                <div className="mb-4 flex flex-col justify-center items-center w-full">
                  <button
                    className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors"
                    onClick={() => {
                      console.log("쿠폰 받기 클릭확인");
                      handleModalOpen();
                    }}
                  >
                    최대 {shopData.highestPriceCoupon} 할인 쿠폰 받기
                  </button>
                </div>
              )}

              <div className="mb-6">
                <ReviewImg
                  reviewImages={shopData.reviewImageUrl || []}
                  handleReviewClick={handleReviewClick}
                />
                <HairShopDetailReview reviews={shopData.reviews || []} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 아래쪽: 디자이너 정보 */}
      <div className="w-full">
        <DesignerInfo
          shopEmail={shopEmail}
          designers={shopData.designers || []}
        />
      </div>
    </div>
  );
}
