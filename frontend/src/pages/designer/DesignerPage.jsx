import { useState, useEffect, useRef } from "react";
import { DesignerCard } from "../../components/designer/DesignerCard.jsx";
import Header from "../../components/common/Header.jsx";
import { MapPin, Loader2, Trophy } from "lucide-react";
import { fetchDesignerPageData } from "./DesignerPageAxios.jsx";

export default function DesignerPage() {
  const [topDesigners, setTopDesigners] = useState([]);
  const [hotDesigners, setHotDesigners] = useState([]);
  const [designersForUser, setDesignersForUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const lastDesignerElementRef = useRef();

  const [activeSection, setActiveSection] = useState("");

  // 사용자 위치 (예시)
  const userLocation = "서울";

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const data = await fetchDesignerPageData();
        console.log(data);
        setTopDesigners(data.topDesigners || []);
        setHotDesigners(data.hotDesigners || []);
        setDesignersForUser(data.designersForUser || []);
      } catch (error) {
        console.error("디자이너 목록을 불러오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigners();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        // 애니메이션을 주기 전에, 이미 activeSection에 해당 섹션이 없다면 추가
        if (!activeSection.includes(target.target.id)) {
          setActiveSection((prev) => [...prev, target.target.id]);
        }
      }
    }, options);

    // 각 섹션을 옵저버에 등록
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
      observer.current.observe(section);
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-20">
        {/* 히어로 섹션 */}
        <div className="bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 text-white py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
              최고의 디자이너를 <br /> 지금 바로 만나보세요
            </h1>
            <p className="text-xl opacity-90 mb-6">
              당신의 스타일을 완성할 전문 디자이너들이 기다리고 있어요
            </p>
            <button className="bg-white text-teal-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
              <span className="mr-2">🔍</span> 디자이너 찾아보러가기
            </button>
          </div>
          <div className="absolute inset-0 opacity-10 bg-[url('/pattern.svg')] bg-cover z-0" />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-[100px] space-y-[500px]">
          {/* 실력이 좋은 디자이너 섹션 */}
          <section
            id="topDesignersSection"
            className={`section transition-all duration-500 opacity-0 ${activeSection.includes("topDesignersSection") ? "opacity-100 translate-y-0" : "translate-y-10"}`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-emerald-500" />
              실력이 상당해요!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topDesigners.map((designer, index) => (
                <div
                  key={designer.designerEmail || index}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white rounded-xl overflow-hidden shadow-md"
                >
                  <DesignerCard designer={designer} />
                </div>
              ))}
            </div>
          </section>

          {/* 핫한 디자이너 섹션 */}
          <section
            id="hotDesignersSection"
            className={`section transition-all duration-500 opacity-0 ${activeSection.includes("hotDesignersSection") ? "opacity-100 translate-y-0" : "translate-y-10"}`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-6 h-6 text-teal-500">🔥</span>
              요즘 엄청 HOT 해요!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hotDesigners.map((designer, index) => (
                <div
                  key={designer.id || index}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white rounded-xl overflow-hidden shadow-md"
                >
                  <DesignerCard designer={designer} />
                </div>
              ))}
            </div>
          </section>

          {/* 내 주변 디자이너 섹션 */}
          <section
            id="designersForUserSection"
            className={`section transition-all duration-500 opacity-0 ${activeSection.includes("designersForUserSection") ? "opacity-100 translate-y-0" : "translate-y-10"}`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-500" />
              내 주변과 가깝고 잘해요!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designersForUser.map((designer, index) => (
                <div
                  key={designer.id || index}
                  ref={index === designersForUser.length - 1 ? lastDesignerElementRef : null}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-white rounded-xl overflow-hidden shadow-md"
                >
                  <DesignerCard designer={designer} />
                </div>
              ))}
            </div>

            {loading && (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
              </div>
            )}

            {!hasMore && !loading && designersForUser.length > 0 && (
              <div className="text-center py-8 text-gray-500">
                더 이상 표시할 디자이너가 없습니다
              </div>
            )}

            {!loading && designersForUser.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                주변에 등록된 디자이너가 없습니다
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
