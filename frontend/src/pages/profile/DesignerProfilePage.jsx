import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import DesignerProfile from "../../components/DesingerAbout/profile/DesignerProfile.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

// axios 기본 설정
axios.defaults.baseURL = import.meta.env.VITE_API_URL; // 백엔드 서버 URL
axios.defaults.withCredentials = true; // CORS 인증 설정

export default function DesignerProfilePage() {
  const [designerData, setDesignerData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDesignerProfile = async () => {
      try {
        const response = await axios.get("/designer/profile");
        console.log("디자이너 프로필 데이터:", response.data);
        setDesignerData(response.data);
      } catch (error) {
        console.error("디자이너 프로필 데이터 가져오기 실패:", error);
      }
    };

    fetchDesignerProfile();
  }, []);

  const handleProfileUpdate = () => {
    // Implementation of handleProfileUpdate function
  };

  // 데이터가 로딩 중일 때 표시할 내용
  if (!designerData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <DesignerHeader />

      <div className="p-4 mt-16">
        <DesignerProfile
          name={designerData.name}
          nickName={designerData.nickName}
          description={designerData.description}
          image={designerData.image}
          age={designerData.age}
          gender={designerData.gender}
          like={designerData.like}
          email={designerData.email}
          tel={designerData.tel}
          backgroundImage={designerData.backgroundImage}
          onUpdate={handleProfileUpdate}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
