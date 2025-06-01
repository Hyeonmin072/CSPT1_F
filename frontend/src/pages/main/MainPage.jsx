import MainBottomAd from "../../components/layout/MainBottomAd";
import ShopData from "../../components/common/ShopData";
import Header from "../../components/common/Header";
import { ArrowRight, Star, TrendingUp, Users, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SignIntergration from "../../components/sign/SignIntergration";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bg1 from "../../assets/bg/bg1.png";
import bg2 from "../../assets/bg/bg2.png";
import bg3 from "../../assets/bg/bg3.png";
import logo from "../../assets/logo/logo.png";
import { motion } from "framer-motion";

// 스크롤 애니메이션을 위한 커스텀 훅
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
}

// 애니메이션 섹션 컴포넌트
function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function MainPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [homepageData, setHomepageData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await axios.get("/user/homepage");
        console.log("홈페이지 데이터:", response.data);
        setHomepageData(response.data);
      } catch (error) {
        console.error("홈페이지 데이터 가져오기 실패:", error);
      }
    };

    fetchHomepageData();
  }, []);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const navigateToHairshop = () => {
    navigate("/hairshop");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLoginClick={openLoginModal} />

      {/* 헤더 높이만큼 여백 추가 */}
      <div className="h-20"></div>

      {/* 히어로 섹션 */}
      <div className="relative h-[700px]">
        <img
          src={bg1}
          alt="배경"
          className="absolute inset-0 w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <AnimatedSection>
            <div className="text-white max-w-2xl p-4">
              <h1 className="text-5xl font-bold mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                당신의 스타일을 완성하는
                <br />
                최고의 헤어 파트너
              </h1>
              <p className="text-xl mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                전문 디자이너와 함께 당신만의 특별한 스타일을 만들어보세요
              </p>
              <button
                className="bg-white text-green-800 px-8 py-3 rounded-lg font-bold hover:bg-teal-50 transition-colors drop-shadow-lg"
                onClick={navigateToHairshop}
              >
                헤어샵 찾기
              </button>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <div className="hidden lg:block mr-10">
              <motion.img
                src={logo}
                alt="Hairism Logo"
                className="w-96 h-96 object-contain drop-shadow-2xl"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* 인기 헤어샵 섹션 */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">인기 헤어샵</h2>
          <button
            className="flex items-center text-teal-600 hover:text-teal-700"
            onClick={navigateToHairshop}
          >
            더보기 <ArrowRight className="ml-2" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homepageData?.top3Shops?.map((shop, index) => (
            <AnimatedSection key={index} delay={index * 200}>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  {shop.shopThumbnail && (
                    <img
                      src={shop.shopThumbnail}
                      alt={shop.shopName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{shop.shopName}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 text-gray-600">
                        {shop.shopRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {shop.shopDesc || "설명이 없습니다"}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>리뷰 {shop.shopReviewCount}개</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* 프로모션 배너 */}
      <AnimatedSection className="bg-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">첫 예약 시 20% 할인</h2>
                <p className="text-gray-600 mb-4">
                  신규 고객님을 위한 특별한 혜택
                </p>
                <button
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                  onClick={navigateToHairshop}
                >
                  자세히 보기
                </button>
              </div>
              <div className="w-full md:w-1/2 h-48 rounded-lg overflow-hidden">
                <img
                  src={bg2}
                  alt="프로모션 배너"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 최신 디자이너 섹션 */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">인기 디자이너</h2>
          <button
            className="flex items-center text-teal-600 hover:text-teal-700"
            onClick={navigateToHairshop}
          >
            더보기 <ArrowRight className="ml-2" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homepageData?.top4Designers?.map((designer, index) => (
            <AnimatedSection key={index} delay={index * 150}>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200">
                  {designer.designerImage && (
                    <img
                      src={designer.designerImage}
                      alt={designer.designerName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">
                    {designer.designerNickName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {designer.designerDesc || "설명이 없습니다"}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>평점 {designer.designerRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* 뉴스/블로그 섹션 */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">헤어 트렌드</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, index) => (
            <AnimatedSection key={item} delay={index * 200}>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={bg3}
                    alt="헤어 트렌드"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>2024.03.{item}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    2024 봄 시즌 헤어 트렌드
                  </h3>
                  <p className="text-gray-600">
                    올해 봄 시즌에 주목해야 할 헤어스타일 트렌드를 소개합니다.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* 기존 ShopData 컴포넌트 */}
      <AnimatedSection>{/* <ShopData /> */}</AnimatedSection>

      {/* 하단 광고 */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <MainBottomAd height={150} className="bg-gray-50">
          <div>커스텀 광고 내용</div>
        </MainBottomAd>
      </div>

      <SignIntergration isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </div>
  );
}
