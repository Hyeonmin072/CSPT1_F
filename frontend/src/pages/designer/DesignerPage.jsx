import { useState, useEffect, useRef } from "react";
import { DesignerCard } from "../../components/designer/DesignerCard.jsx";
import { RecommendationBox } from "../../components/designer/RecommendationBox.jsx";
import Header from "../../components/common/Header.jsx";
import { Loader2 } from "lucide-react";

export default function DesignerPage() {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const lastDesignerElementRef = useRef();

  // 더미 데이터
  const dummyDesigners = [
    {
      id: 1,
      name: "김스타일",
      description:
        "20년 경력의 남성 전문 헤어 디자이너입니다. 클래식한 스타일링이 특기이며, 고객님의 얼굴형에 맞는 최적의 스타일을 제안해드립니다.",
      imageUrl:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.8,
      reviewCount: 128,
      specialties: ["커트", "펌", "염색"],
      experience: 20,
      shopName: "스타일리시 헤어",
      location: "서울시 강남구",
    },
    {
      id: 2,
      name: "이트렌디",
      description:
        "젊은 감각과 트렌디한 스타일링으로 많은 고객님들의 사랑을 받고 있습니다. 특히 여성 스타일링에 특화되어 있습니다.",
      imageUrl:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.9,
      reviewCount: 256,
      specialties: ["여성커트", "펌", "염색", "스타일링"],
      experience: 8,
      shopName: "트렌디 헤어",
      location: "서울시 홍대입구",
    },
    {
      id: 3,
      name: "박프리미엄",
      description:
        "프리미엄 헤어 디자이너로서 고급스러운 스타일링을 선보입니다. VIP 고객님들을 위한 맞춤 서비스를 제공합니다.",
      imageUrl:
        "https://images.unsplash.com/photo-1595499330062-747b3f5b1b9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.7,
      reviewCount: 89,
      specialties: ["프리미엄커트", "펌", "염색", "스타일링"],
      experience: 15,
      shopName: "프리미엄 헤어",
      location: "서울시 청담동",
    },
    {
      id: 4,
      name: "최아트",
      description:
        "예술적인 감각과 창의적인 스타일링으로 새로운 트렌드를 만들어가는 디자이너입니다. 독특한 스타일을 원하시는 분들에게 추천합니다.",
      imageUrl:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.6,
      reviewCount: 167,
      specialties: ["아트커트", "펌", "염색", "스타일링"],
      experience: 12,
      shopName: "아트 헤어",
      location: "서울시 마포구",
    },
    {
      id: 5,
      name: "정클래식",
      description:
        "클래식한 스타일링에 현대적인 요소를 더해 완성도 높은 헤어스타일을 만들어내는 디자이너입니다. 기본에 충실하면서도 트렌디한 스타일을 추구합니다.",
      imageUrl:
        "https://images.unsplash.com/photo-1595499330062-747b3f5b1b9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.8,
      reviewCount: 203,
      specialties: ["클래식커트", "펌", "염색", "스타일링"],
      experience: 18,
      shopName: "클래식 헤어",
      location: "서울시 종로구",
    },
    {
      id: 6,
      name: "강모던",
      description:
        "모던하고 세련된 스타일링을 추구하는 디자이너입니다. 최신 트렌드를 반영한 스타일링으로 젊은 고객님들에게 인기가 많습니다.",
      imageUrl:
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      rating: 4.7,
      reviewCount: 145,
      specialties: ["모던커트", "펌", "염색", "스타일링"],
      experience: 10,
      shopName: "모던 헤어",
      location: "서울시 이태원",
    },
  ];

  // 더미 데이터 로드 (API 호출 대신 사용)
  useEffect(() => {
    // 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setDesigners(dummyDesigners);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 무한 스크롤 설정 (더미 데이터에서는 실제로 페이지를 늘리지 않음)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        // 더미 데이터에서는 페이지를 늘리지 않고 hasMore를 false로 설정
        setHasMore(false);
      }
    }, options);

    if (lastDesignerElementRef.current) {
      observer.current.observe(lastDesignerElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, loading]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        {/* 히어로 섹션 */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">
              최고의 디자이너를 만나보세요
            </h1>
            <p className="text-xl opacity-90">
              당신의 스타일을 완성하는 전문 디자이너들이 기다리고 있습니다
            </p>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designers.map((designer, index) => (
              <div
                key={designer.id || index}
                ref={
                  index === designers.length - 1 ? lastDesignerElementRef : null
                }
                className="transform transition-all duration-300 hover:scale-105"
              >
                <DesignerCard designer={designer} />
              </div>
            ))}
          </div>

          {/* 로딩 상태 */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
            </div>
          )}

          {/* 더 이상 데이터가 없을 때 */}
          {!hasMore && !loading && designers.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              더 이상 표시할 디자이너가 없습니다
            </div>
          )}

          {/* 데이터가 없을 때 */}
          {!loading && designers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              등록된 디자이너가 없습니다
            </div>
          )}
        </div>

        {/* 추천 디자이너 섹션 */}
        <div className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">추천 디자이너</h2>
            <RecommendationBox />
          </div>
        </div>
      </div>
    </div>
  );
}
