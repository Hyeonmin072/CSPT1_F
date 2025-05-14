import { useState, useEffect, useRef } from "react";
import { DesignerCard } from "../../components/designer/DesignerCard.jsx";
import Header from "../../components/common/Header.jsx";
import {
  MapPin,
  Loader2,
  Trophy,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { fetchDesignerPageData } from "./DesignerPageAxios.jsx";
import { motion, AnimatePresence, useInView } from "framer-motion";

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

export default function DesignerPage() {
  const [topDesigners, setTopDesigners] = useState([]);
  const [hotDesigners, setHotDesigners] = useState([]);
  const [designersForUser, setDesignersForUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const lastDesignerElementRef = useRef();

  // Intersection Observer를 React의 관점으로 개선
  const topSectionRef = useRef(null);
  const hotSectionRef = useRef(null);
  const nearSectionRef = useRef(null);

  const isTopSectionInView = useInView(topSectionRef, {
    once: false,
    amount: 0.2,
  });
  const isHotSectionInView = useInView(hotSectionRef, {
    once: false,
    amount: 0.2,
  });
  const isNearSectionInView = useInView(nearSectionRef, {
    once: false,
    amount: 0.2,
  });

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

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Header />

      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-600 text-white py-24 md:py-32 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute w-full h-full bg-[url('/pattern-dots.svg')] bg-repeat rotate-12 scale-150 z-0" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-20"
            />
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, -10, 0],
                x: [0, -30, 0],
                y: [0, 50, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -left-20 -top-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight tracking-tight"
            >
              최고의 디자이너를
              <br className="hidden md:block" />
              <span className="relative inline-block">
                지금 바로
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-300"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: 1 }}
                />
              </span>{" "}
              만나보세요
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg md:text-xl opacity-90 mb-8 font-light"
            >
              당신의 스타일을 완성할 전문 디자이너들이 기다리고 있어요
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                디자이너 찾아보기
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-24 md:space-y-40">
          {/* 실력이 좋은 디자이너 섹션 */}
          <motion.section
            ref={topSectionRef}
            initial="hidden"
            animate={isTopSectionInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                인기 디자이너
              </span>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                <Trophy className="w-8 h-8 text-yellow-500" />
                실력이 상당해요!
              </h2>
              <p className="text-gray-600">
                검증된 실력을 가진 디자이너를 만나보세요
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {topDesigners.map((designer, index) => (
                <motion.div
                  key={designer.designerEmail || index}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute top-3 right-3 z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white bg-opacity-90 rounded-full p-2 shadow-md"
                      >
                        <Star className="w-5 h-5 text-yellow-500" />
                      </motion.div>
                    </div>
                    <DesignerCard designer={designer} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* 핫한 디자이너 섹션 */}
          <motion.section
            ref={hotSectionRef}
            initial="hidden"
            animate={isHotSectionInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-4">
                트렌드
              </span>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                <TrendingUp className="w-8 h-8 text-red-500" />
                요즘 엄청 HOT 해요!
              </h2>
              <p className="text-gray-600">
                많은 고객들이 선택한 인기 있는 디자이너입니다
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {hotDesigners.map((designer, index) => (
                <motion.div
                  key={designer.id || index}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute top-3 right-3 z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white bg-opacity-90 rounded-full p-2 shadow-md"
                      >
                        <Users className="w-5 h-5 text-red-500" />
                      </motion.div>
                    </div>
                    <DesignerCard designer={designer} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* 내 주변 디자이너 섹션 */}
          <motion.section
            ref={nearSectionRef}
            initial="hidden"
            animate={isNearSectionInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="relative"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                내 근처
              </span>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
                <MapPin className="w-8 h-8 text-green-500" />내 주변과 가깝고
                잘해요!
              </h2>
              <p className="text-gray-600">
                가까운 거리의 디자이너를 만나보세요
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {designersForUser.map((designer, index) => (
                <motion.div
                  key={designer.id || index}
                  ref={
                    index === designersForUser.length - 1
                      ? lastDesignerElementRef
                      : null
                  }
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute top-3 right-3 z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white bg-opacity-90 rounded-full p-2 shadow-md"
                      >
                        <MapPin className="w-5 h-5 text-green-500" />
                      </motion.div>
                    </div>
                    <DesignerCard designer={designer} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {loading && (
              <div className="flex justify-center items-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-10 h-10 text-blue-500" />
                </motion.div>
              </div>
            )}

            {!hasMore && !loading && designersForUser.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500 mt-8"
              >
                더 이상 표시할 디자이너가 없습니다
              </motion.div>
            )}

            {!loading && designersForUser.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500 mt-8"
              >
                <div className="p-10 bg-gray-50 rounded-2xl">
                  <div className="flex justify-center mb-4">
                    <MapPin className="w-16 h-16 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    주변에 등록된 디자이너가 없습니다
                  </h3>
                  <p className="text-gray-500">다른 지역을 검색해보세요</p>
                </div>
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}
