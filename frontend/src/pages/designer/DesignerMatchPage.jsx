import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Heart, X } from "lucide-react";
import axios from "axios";
import Header from "../../components/common/Header";

// 임시 더미 데이터
const dummyDesigners = [
  {
    id: 1,
    reviewImage:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 2,
    reviewImage:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
  },
  {
    id: 3,
    reviewImage:
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
  },
  {
    id: 4,
    reviewImage:
      "https://images.unsplash.com/photo-1595499330062-747b3a5c2b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 5,
    reviewImage:
      "https://images.unsplash.com/photo-1595499330062-747b3a5c2b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
];

const DesignerMatchPage = () => {
  const [designers, setDesigners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [loading, setLoading] = useState(true);

  // 드래그 관련 상태 추가
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  useEffect(() => {
    // 실제 API 호출 대신 더미 데이터 사용
    setTimeout(() => {
      setDesigners(dummyDesigners);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDragEnd = (event, info) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? "right" : "left";
      handleSwipe(direction);
    } else {
      // 스와이프가 충분하지 않으면 원래 위치로
      x.set(0);
    }
  };

  const handleSwipe = (direction) => {
    setDirection(direction);
    if (direction === "right") {
      // 마음에 드는 경우 처리
      handleLike(designers[currentIndex].id);
    }
    setTimeout(() => {
      setDirection(null);
      setCurrentIndex((prev) => (prev + 1) % designers.length);
      x.set(0); // x 위치 초기화
    }, 200);
  };

  const handleLike = async (designerId) => {
    try {
      // 실제 API 호출 대신 콘솔에 로그 출력
      console.log(`디자이너 ${designerId}를 좋아합니다.`);
    } catch (error) {
      console.error("좋아요 처리에 실패했습니다:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (designers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          주변에 디자이너가 없습니다
        </h2>
        <p className="text-gray-600">잠시 후 다시 시도해주세요</p>
      </div>
    );
  }

  const currentDesigner = designers[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            나만의 디자이너 찾기
          </h1>

          <div className="relative h-[600px]">
            <AnimatePresence>
              <motion.div
                key={currentIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  x:
                    direction === "left"
                      ? -200
                      : direction === "right"
                      ? 200
                      : 0,
                  rotate:
                    direction === "left" ? -20 : direction === "right" ? 20 : 0,
                }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute w-full h-full"
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                whileDrag={{ cursor: "grabbing" }}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full cursor-grab active:cursor-grabbing">
                  <div className="relative h-full">
                    <img
                      src={currentDesigner.reviewImage}
                      alt="디자이너 작품"
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button
                onClick={() => handleSwipe("left")}
                className="p-4 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
              >
                <X className="w-8 h-8 text-red-500" />
              </button>
              <button
                onClick={() => handleSwipe("right")}
                className="p-4 bg-white rounded-full shadow-lg hover:bg-green-50 transition-colors"
              >
                <Heart className="w-8 h-8 text-green-500" />
              </button>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>오른쪽으로 스와이프: 마음에 듦</p>
            <p>왼쪽으로 스와이프: 마음에 들지 않음</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerMatchPage;
