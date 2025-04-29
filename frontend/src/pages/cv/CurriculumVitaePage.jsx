import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import CurriculumVitae from "../../components/DesingerAbout/cv/CurriculumVitae.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CurriculumVitaePage() {
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get("/designer/resume");
        console.log("디자이너 이력서 데이터:", response.data);

        // API 응답 데이터를 컴포넌트에서 사용하는 형식으로 변환
        const formattedData = {
          ...response.data,
          d_exp: response.data.exp,
          employmentHistory: response.data.careers,
          certifications: response.data.certifications,
          wantedDays: response.data.wantedDays,
        };

        console.log("변환된 이력서 데이터:", formattedData);
        setResumeData(formattedData);
      } catch (error) {
        console.error("디자이너 이력서 데이터 가져오기 실패:", error);
      }
    };

    fetchResumeData();
  }, []);

  return (
    <div>
      <DesignerHeader />

      <div className="p-4">
        <CurriculumVitae resumeData={resumeData} />
      </div>

      <DesignerID designer={selectedDesigner} />
    </div>
  );
}
