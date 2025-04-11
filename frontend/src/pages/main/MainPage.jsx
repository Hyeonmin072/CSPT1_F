import MainBottomAd from "../../components/layout/MainBottomAd";
import ShopData from "../../components/common/ShopData";
import Header from "../../components/common/Header";
import { ArrowRight, Star, TrendingUp, Users, Calendar } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* 헤더 높이만큼 여백 추가 */}
      <div className="h-20"></div>

      {/* 히어로 섹션 */}
      <div className="relative h-[500px] bg-gradient-to-r from-teal-500 to-teal-700">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <AnimatedSection>
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">
                당신의 스타일을 완성하는
                <br />
                최고의 헤어 파트너
              </h1>
              <p className="text-xl mb-8">
                전문 디자이너와 함께 당신만의 특별한 스타일을 만들어보세요
              </p>
              <button className="bg-white text-teal-700 px-8 py-3 rounded-lg font-bold hover:bg-teal-50 transition-colors">
                헤어샵 찾기
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* 인기 헤어샵 섹션 */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">인기 헤어샵</h2>
          <button className="flex items-center text-teal-600 hover:text-teal-700">
            더보기 <ArrowRight className="ml-2" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, index) => (
            <AnimatedSection key={item} delay={index * 200}>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">헤어샵 {item}</h3>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="ml-1 text-gray-600">4.8</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    최고의 디자이너들이 모여있는 프리미엄 헤어샵
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    <span>리뷰 128개</span>
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
                <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                  자세히 보기
                </button>
              </div>
              <div className="w-full md:w-1/2 h-48 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* 최신 디자이너 섹션 */}
      <AnimatedSection className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">신입 디자이너</h2>
          <button className="flex items-center text-teal-600 hover:text-teal-700">
            더보기 <ArrowRight className="ml-2" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item, index) => (
            <AnimatedSection key={item} delay={index * 150}>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">디자이너 {item}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    커트, 펌, 염색 전문
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>경력 3년</span>
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
                <div className="h-48 bg-gray-200" />
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
    </div>
  );
}
