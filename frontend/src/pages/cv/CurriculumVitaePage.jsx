import DesignerHeader from "../../components/common/DesignerHeader.jsx";
import CurriculumVitae from "../../components/DesingerAbout/cv/CurriculumVitae.jsx";
import DesignerID from "../../components/DesingerAbout/DesignerID.jsx";
import { selectedDesigner } from "../../components/dummydata/DummydbDesigner.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CurriculumVitaePage() {
  const [resumeData, setResumeData] = useState(null);

  // 영문 요일을 한글 요일로 변환하는 함수
  const convertDayToKorean = (day) => {
    const dayMap = {
      MON: "월",
      TUE: "화",
      WED: "수",
      THU: "목",
      FRI: "금",
      SAT: "토",
      SUN: "일",
    };
    return dayMap[day] || day;
  };

  // 영문 요일을 3글자 형식으로 변환하는 함수
  const convertDayToShortFormat = (day) => {
    const dayMap = {
      MONDAY: "MON",
      TUESDAY: "TUE",
      WEDNESDAY: "WED",
      THURSDAY: "THU",
      FRIDAY: "FRI",
      SATURDAY: "SAT",
      SUNDAY: "SUN",
      MON: "MON",
      TUE: "TUE",
      WED: "WED",
      THU: "THU",
      FRI: "FRI",
      SAT: "SAT",
      SUN: "SUN",
    };
    return dayMap[day] || day;
  };

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

  // 이력서 데이터를 API 요청 형식으로 변환하는 함수
  const formatResumeDataForApi = (data) => {
    if (!data) return null;

    // wantedDays에서 id 제거하고 요일 형식 변환
    const formattedWantedDays = (data.wantedDays || []).map((day) => {
      if (typeof day === "object" && day.wantedDay) {
        // id가 있는 경우 제거하고 wantedDay만 유지
        const { id, ...rest } = day;
        // wantedDay 값을 3글자 형식으로 변환
        return { wantedDay: convertDayToShortFormat(day.wantedDay) };
      }
      // 문자열인 경우 3글자 형식으로 변환
      if (typeof day === "string") {
        return { wantedDay: convertDayToShortFormat(day) };
      }
      return day;
    });

    // certificates에서 id 제거
    const formattedCertificates = (data.certifications || []).map((cert) => {
      if (typeof cert === "object") {
        // id가 있는 경우 제거하고 name만 유지
        const { id, ...rest } = cert;
        return rest;
      }
      return cert;
    });

    // API 요청 형식으로 변환
    return {
      content: data.d_desc || "",
      exp: data.d_exp || "",
      careers: data.employmentHistory || [],
      wantedDays: formattedWantedDays,
      certificates: formattedCertificates,
      image: data.d_image || null,
    };
  };

  return (
    <div>
      <DesignerHeader />

      <div className="p-4">
        <CurriculumVitae
          resumeData={resumeData}
          formatResumeDataForApi={formatResumeDataForApi}
        />
      </div>

      <DesignerID designer={selectedDesigner} />
    </div>
  );
}
