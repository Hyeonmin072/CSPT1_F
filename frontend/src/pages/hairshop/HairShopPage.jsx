import { useEffect, useRef, useState } from "react";
import ShopPage from "../../components/hairshop/HairShop.jsx";
import Header from "../../components/common/Header.jsx";
import { Search, MapPin, Star, Clock, Phone, Mail } from "lucide-react";

export default function HairShopPage() {
  const [isVisible, setIsVisible] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("전체");
  const containerRef = useRef(null);

  /* 애니메이션 효과 */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.index]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll(".hairshop-item");
      items.forEach((item, index) => {
        item.dataset.index = index;
        observer.observe(item);
      });
    }

    return () => observer.disconnect();
  }, []);

  // 지역 필터 옵션
  const locationOptions = [
    "전체",
    "강남구",
    "서초구",
    "마포구",
    "종로구",
    "송파구",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 히어로 섹션 - 헤더 높이만큼 상단 여백 추가 */}
      <div className="pt-32 bg-gradient-to-r from-green-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            최고의 헤어샵을 찾아보세요
          </h1>
          <p className="text-xl opacity-90 mb-8">
            당신의 스타일을 완성하는 전문 헤어샵들이 기다리고 있습니다
          </p>

          {/* 검색 및 필터 섹션 */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="헤어샵 이름 또는 키워드로 검색"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <select
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locationOptions.map((option) => (
                    <option key={option} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 통계 섹션 */}
      <div className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">120+</div>
              <div className="text-gray-600">등록된 헤어샵</div>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-teal-600 mb-1">500+</div>
              <div className="text-gray-600">전문 디자이너</div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                10,000+
              </div>
              <div className="text-gray-600">고객 리뷰</div>
            </div>
            <div className="bg-cyan-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-cyan-600 mb-1">98%</div>
              <div className="text-gray-600">만족도</div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">인기 헤어샵</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
              <Star size={18} className="inline mr-1" /> 평점순
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
              <Clock size={18} className="inline mr-1" /> 최신순
            </button>
          </div>
        </div>

        <div className="p-4" ref={containerRef}>
          <ShopPage containerRef={containerRef} />
        </div>
      </div>

      {/* 추천 섹션 */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">맞춤 추천 헤어샵</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <Star className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">고객 리뷰 기반 추천</h3>
                  <p className="text-sm text-gray-500">
                    최고 평점을 받은 헤어샵
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                고객들의 리뷰와 평점을 기반으로 선별된 최고의 헤어샵을
                추천합니다.
              </p>
              <button className="text-green-600 font-medium">더 보기 →</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="text-teal-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">위치 기반 추천</h3>
                  <p className="text-sm text-gray-500">내 주변 인기 헤어샵</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                현재 위치를 기반으로 가까운 인기 헤어샵을 추천합니다.
              </p>
              <button className="text-teal-600 font-medium">더 보기 →</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <Phone className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold">맞춤형 추천</h3>
                  <p className="text-sm text-gray-500">나만을 위한 헤어샵</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                고객의 선호도와 이전 방문 기록을 기반으로 맞춤형 헤어샵을
                추천합니다.
              </p>
              <button className="text-emerald-600 font-medium">
                더 보기 →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 뉴스레터 구독 섹션 */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">
            최신 헤어샵 정보를 받아보세요
          </h2>
          <p className="mb-6 opacity-90">
            새로운 헤어샵 오픈, 특별 할인, 이벤트 정보를 이메일로 받아보세요.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="이메일 주소를 입력하세요"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none text-gray-800"
            />
            <button className="bg-teal-800 hover:bg-teal-900 px-6 py-3 rounded-r-lg font-medium transition">
              구독하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
