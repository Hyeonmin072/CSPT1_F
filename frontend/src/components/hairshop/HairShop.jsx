import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import h1 from "../../assets/hairshop/h1.jpg";
import logo from "../../assets/logo/logo.png";
import HairSearch from "./HairSearch.jsx";
import HairReservationButton from "../button/HairReservationButton.jsx";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function ShopPage({ containerRef }) {
  const shops = [
    {
      id: 1,
      name: "HAIRSHOP 1",
      subject: "subject1",
      description: "설명 1",
      images: [h1, h1, h1], // 여러 이미지 추가
      rating: 4.5,
      reviewCount: 128,
      price: "30,000원~",
    },
    {
      id: 2,
      name: "HAIRSHOP 2",
      subject: "subject2",
      description: "설명 2",
      images: [h1, h1, h1],
      rating: 4.8,
      reviewCount: 256,
      price: "35,000원~",
    },
    {
      id: 3,
      name: "HAIRSHOP 3",
      subject: "subject3",
      description: "설명 3",
      images: [h1, h1, h1],
      rating: 4.2,
      reviewCount: 89,
      price: "40,000원~",
    },
    {
      id: 4,
      name: "HAIRSHOP 4",
      subject: "subject4",
      description: "설명 4",
      images: [h1, h1, h1],
      rating: 4.7,
      reviewCount: 167,
      price: "45,000원~",
    },
  ];

  const [isVisible, setIsVisible] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  useEffect(() => {
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
  }, [shops.length]);

  const navigate = useNavigate();

  const handlePrevImage = (shopId, e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => ({
      ...prev,
      [shopId]:
        (prev[shopId] - 1 + shops.find((s) => s.id === shopId).images.length) %
        shops.find((s) => s.id === shopId).images.length,
    }));
  };

  const handleNextImage = (shopId, e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => ({
      ...prev,
      [shopId]:
        (prev[shopId] + 1) % shops.find((s) => s.id === shopId).images.length,
    }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : index < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center gap-8">
        <div className="w-full max-w-2xl">
          <HairSearch />
        </div>

        <div ref={containerRef} className="w-full max-w-4xl">
          <div className="grid grid-cols-1 gap-8">
            {shops.map((shop, index) => (
              <div
                key={shop.id}
                className={`transform transition-all duration-500 ease-out
                                ${
                                  isVisible[index]
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-10"
                                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  <div className="relative group">
                    <div
                      className="h-[300px] w-full cursor-pointer overflow-hidden"
                      onClick={() => navigate("/detail")}
                    >
                      <img
                        src={shop.images[currentImageIndex[shop.id]] || logo}
                        alt="Shop preview"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

                      {/* 이미지 네비게이션 버튼 */}
                      <button
                        onClick={(e) => handlePrevImage(shop.id, e)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={(e) => handleNextImage(shop.id, e)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-800" />
                      </button>

                      {/* 이미지 인디케이터 */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {shop.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${
                              idx === currentImageIndex[shop.id]
                                ? "bg-white"
                                : "bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div
                      className="flex items-start space-x-4 cursor-pointer"
                      onClick={() => navigate("/detail")}
                    >
                      <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-semibold text-gray-600">
                          {shop.name.charAt(0)}
                        </span>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
