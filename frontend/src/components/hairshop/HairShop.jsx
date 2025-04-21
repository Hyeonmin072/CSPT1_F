import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import HairSearch from "./HairSearch.jsx";
import HairReservationButton from "../button/HairReservationButton.jsx";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function ShopPage({ containerRef, shops }) {
  const [isVisible, setIsVisible] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});
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
        initialImageIndexes[shop.id] = 0;
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
    return <div className="text-center py-8">등록된 헤어샵이 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shops.map((shop, index) => (
        <div
          key={shop.id}
          className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-500 ${
            isVisible[index]
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          {/* 이미지 슬라이더 */}
          <div className="relative h-48">
            {shop.images && shop.images.length > 0 && (
              <>
                <img
                  src={shop.images[currentImageIndex[shop.id]]}
                  alt={`${shop.name} 이미지`}
                  className="w-full h-full object-cover"
                />
                {shop.images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => ({
                          ...prev,
                          [shop.id]:
                            (prev[shop.id] - 1 + shop.images.length) %
                            shop.images.length,
                        }));
                      }}
                      className="bg-black bg-opacity-50 text-white rounded-full p-1"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex((prev) => ({
                          ...prev,
                          [shop.id]: (prev[shop.id] + 1) % shop.images.length,
                        }));
                      }}
                      className="bg-black bg-opacity-50 text-white rounded-full p-1"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="p-6">
            <div
              className="flex items-start space-x-4 cursor-pointer"
              onClick={() => navigate("/detail")}
            >
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <img src={logo} alt="로고" className="w-10 h-10" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900 mb-1">
                  {shop.name}
                </h1>
                <p className="text-sm text-gray-500">{shop.subject}</p>
              </div>
            </div>

            <div
              className="mt-4 mb-6 cursor-pointer"
              onClick={() => navigate("/detail")}
            >
              <p className="text-gray-600 leading-relaxed">
                {shop.description}
              </p>
            </div>

            {/* 평점 및 가격 정보 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="flex">{renderStars(shop.rating)}</div>
                <span className="text-sm text-gray-600">
                  ({shop.reviewCount})
                </span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {shop.price}
              </span>
            </div>

            <div className="flex justify-end">
              <HairReservationButton />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
