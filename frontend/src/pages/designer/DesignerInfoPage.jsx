import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/common/Header.jsx";
import DesignerProfile from "../../components/DesingerAbout/profile/DesignerProfile.jsx";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// axios 기본 설정
axios.defaults.baseURL = "http://localhost:1271"; // 백엔드 서버 URL
axios.defaults.withCredentials = true; // CORS 인증 설정

export default function DesignerInfoPage() {
  const { designerEmail } = useParams();
  const [designerData, setDesignerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesignerInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/designer/profile/${designerEmail}`);
        console.log("디자이너 정보 데이터:", response.data);
        console.log("like 값:", response.data.like);
        setDesignerData(response.data);
      } catch (error) {
        console.error("디자이너 정보 데이터 가져오기 실패:", error);
        setError("디자이너 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (designerEmail) {
      fetchDesignerInfo();
    }
  }, [designerEmail]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-green-500" />
        </motion.div>
        <p className="mt-4 text-gray-600">디자이너 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <div className="bg-red-50 p-6 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-700 mb-4">오류 발생</h2>
          <p className="text-gray-700">{error}</p>
          <p className="mt-4 text-gray-600">다시 시도해주세요.</p>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우 (API 응답은 성공했지만 데이터가 비어있을 경우)
  if (!designerData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <div className="bg-yellow-50 p-6 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">
            디자이너 정보 없음
          </h2>
          <p className="text-gray-700">
            요청하신 디자이너 정보를 찾을 수 없습니다.
          </p>
        </div>
      </div>
    );
  }

  // 더미 데이터를 추가하여 화면에 렌더링할 정보를 모두 표시합니다
  const dummyData = {
    name: designerData.name || "디자이너",
    nickName: designerData.nickName || "닉네임",
    description: designerData.description || "디자이너 소개가 없습니다.",
    image:
      designerData.image || "https://via.placeholder.com/300x300?text=Designer",
    age: designerData.age || "0",
    gender: designerData.gender || "남성",
    likeCnt: designerData.likeCnt || 0,
    email: designerData.email || designerEmail,
    tel: designerData.tel || "010-0000-0000",
    backgroundImage:
      designerData.backgroundImage ||
      "https://via.placeholder.com/1200x400?text=Background",
    shopName: designerData.shopName || "소속 샵 정보 없음",
    reviews: designerData.reviews || [], // 빈 배열을 기본값으로 사용
  };

  // 리뷰 데이터 로깅
  console.log("리뷰 데이터:", dummyData.reviews);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />

      <div className="p-4 mt-16">
        <DesignerProfile
          name={designerData.name}
          nickName={designerData.nickName}
          description={designerData.description}
          image={designerData.image}
          age={designerData.age}
          gender={designerData.gender}
          like={designerData.likeCnt}
          email={designerData.email}
          tel={designerData.tel}
          backgroundImage={designerData.backgroundImage}
          isViewMode={true}
          reviews={designerData.reviews}
          shopName={designerData.shopName}
          isLike={designerData.like}
        />
      </div>
    </motion.div>
  );
}
