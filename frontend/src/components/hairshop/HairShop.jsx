import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import HairSearch from "./HairSearch.jsx";
import HairReservationButton from "../button/HairReservationButton.jsx";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function ShopPage({ containerRef, shops }) {
  const [isVisible, setIsVisible] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (shops) {
      setIsVisible(new Array(shops.length).fill(false));
      setTimeout(() => {
        setIsVisible(new Array(shops.length).fill(true));
      }, 200);

      // 각 샵의 현재 이미지 인덱스 초기화
      const initialImageIndexes = {};
      shops.forEach((shop) => {
        initialImageIndexes[shop.shopName] = 0;
      });
      setCurrentImageIndex(initialImageIndexes);
    }
  }, [shops]);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          className={
            index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }
        />
      ));
  };

  if (!shops || shops.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-4 flex justify-center items-center">
        <div className="flex flex-col items-center gap-6 mx-auto w-full">
          <div className="flex justify-center w-full pt-4">
            <HairSearch/>
          </div>
          <div className="text-center py-8">근처에 등록된 헤어샵이 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop, index) => (
          <div
            key={shop.shopName}
            className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-500 ${
              isVisible[index]
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            {/* 이미지 슬라이더 */}
            <div className="relative h-48">
              {shop.shopThumbnail ? (
                <img
                  src={shop.shopThumbnail}
                  alt={`${shop.shopName} 이미지`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">이미지 없음</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div
                className="flex items-start space-x-4 cursor-pointer"
                onClick={() => navigate(`/shopdetails/${shop.shopEmail}`)}
              >
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                  <img src={logo} alt="로고" className="w-10 h-10" />
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-900 mb-1">
                    {shop.shopName}
                  </h1>
                  <p className="text-sm text-gray-500">{shop.shopAddress}</p>
                </div>
              </div>

              <div
                className="mt-4 mb-6 cursor-pointer"
                onClick={() => navigate(`/shopdetails/${shop.shopEmail}`)}
              >
                <p className="text-gray-600 leading-relaxed">
                  {shop.shopDesc || "설명이 없습니다."}
                </p>
              </div>

              {/* 평점 및 가격 정보 */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {renderStars(shop.shopRating || 0)}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({shop.shopReviewCount || 0})
                  </span>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {shop.shopOpenTime} ~ {shop.shopCloseTime}
                </span>
              </div>

              <div className="flex justify-end">
                <HairReservationButton shopEmail={shop.shopEmail} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
