import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import DesignerProfileEdit from "../../components/DesingerAbout/profile/Edit/DesignerProfileEdit.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

// axios 기본 설정
axios.defaults.baseURL = "http://localhost:1271"; // 백엔드 서버 URL
axios.defaults.withCredentials = true; // CORS 인증 설정

export default function DesignerProfileEditPage() {
  const [designerData, setDesignerData] = useState(null);

  useEffect(() => {
    const fetchDesignerProfile = async () => {
      try {
        const response = await axios.get("/designer/profile/update");
        console.log("디자이너 프로필 수정 데이터:", response.data);
        setDesignerData(response.data);
      } catch (error) {
        console.error("디자이너 프로필 수정 데이터 가져오기 실패:", error);
      }
    };

    fetchDesignerProfile();
  }, []);

  // 데이터가 로딩 중일 때 표시할 내용
  if (!designerData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <DesignerHeader />

      <div className="p-4">
        <DesignerProfileEdit
          name={designerData.name}
          email={designerData.email}
          tel={designerData.tel}
          description={designerData.description}
          image={designerData.image}
          backgroundImage={designerData.backgroundImage}
        />
      </div>

      <DesignerID designer={selectedDesigner} />
    </div>
  );
}
