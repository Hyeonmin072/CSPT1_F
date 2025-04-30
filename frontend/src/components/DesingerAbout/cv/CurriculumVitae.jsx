import { useState, useEffect } from "react";

import CVProfile from "./CVProfile.jsx";
import Career from "./Career.jsx";
import DesiredWorkDays from "./DesiredWorkDays.jsx";
import Certification from "./Certification.jsx";
import axios from "axios";

export default function CurriculumVitae() {
  const [isEditable, setIsEditable] = useState(false); // 수정 가능 여부 상태
  const [showMessage, setShowMessage] = useState(false); // 저장 메시지 상태
  const [fadeOut, setFadeOut] = useState(false); // 저장 메시지 fade-out 상태
  const [dDesc, setDDesc] = useState(""); // 소개글 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [resumeData, setResumeData] = useState(null); // 이력서 데이터
  const [wantedDays, setWantedDays] = useState([]); // 희망 근무일 상태
  const [careers, setCareers] = useState([]); // 경력 상태
  const [certifications, setCertifications] = useState([]); // 자격증 상태

  // 요일 ID 변환 함수
  const convertDayId = (dayId) => {
    const dayMap = {
      MONDAY: "MON",
      TUESDAY: "TUE",
      WEDNESDAY: "WED",
      THURSDAY: "THU",
      FRIDAY: "FRI",
      SATURDAY: "SAT",
      SUNDAY: "SUN",
    };
    return dayMap[dayId] || dayId;
  };

  // 이력서 데이터 가져오기
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const response = await axios.get("/designer/resume");
        console.log("이력서 데이터:", response.data);

        // 데이터 구조 변환
        const formattedData = {
          d_id: response.data.id || "",
          d_name: response.data.name || "",
          d_email: response.data.email || "",
          d_tel: response.data.tel || "",
          d_gender: response.data.gender || "",
          d_age: response.data.age || "",
          d_image: response.data.image || null,
          d_desc: response.data.content || "",
          d_exp: response.data.exp || "",
          employmentHistory: response.data.careers || [],
          certifications: response.data.certifications || [],
          wantedDays: response.data.wantedDays || [],
          decisionType: "SELECT_DAYS",
        };

        console.log("변환된 이력서 데이터:", formattedData);
        setResumeData(formattedData);
        setWantedDays(formattedData.wantedDays || []);
        setCareers(formattedData.employmentHistory || []);
        setCertifications(formattedData.certifications || []);

        // 소개글 설정
        setDDesc(formattedData.d_desc);
      } catch (error) {
        console.error("이력서 데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  // 희망 근무일 변경 처리 함수
  const handleWantedDaysChange = (days) => {
    console.log("CurriculumVitae - 희망 근무일 변경:", days);
    setWantedDays(days);
    if (resumeData) {
      resumeData.wantedDays = days;
    }
  };

  // 경력 변경 처리 함수
  const handleCareerChange = (updatedCareers) => {
    console.log("CurriculumVitae - 경력 변경:", updatedCareers);
    setCareers(updatedCareers);
    if (resumeData) {
      resumeData.employmentHistory = updatedCareers;
    }
  };

  // 자격증 변경 처리 함수
  const handleCertificationChange = (updatedCertifications) => {
    console.log("CurriculumVitae - 자격증 변경:", updatedCertifications);
    setCertifications(updatedCertifications);
    if (resumeData) {
      resumeData.certifications = updatedCertifications;
    }
  };

  const handleSave = async () => {
    setShowMessage(true);
    setIsEditable(false); // 저장 후 수정 모드 종료
    setFadeOut(false);

    try {
      // wantedDays를 객체 형태로 변환하고 요일 ID를 짧은 형식으로 변환
      const formattedWantedDays = wantedDays.map((day) => {
        // 이미 객체 형태인 경우
        if (typeof day === "object" && day.wantedDay) {
          return { wantedDay: convertDayId(day.wantedDay) };
        }
        // 문자열인 경우 객체로 변환하고 요일 ID를 짧은 형식으로 변환
        return { wantedDay: convertDayId(day) };
      });

      // 백엔드 요구사항에 맞게 데이터 구성
      const updateData = {
        content: dDesc,
        exp: resumeData.d_exp,
        portfolio: "", // 포트폴리오 데이터가 있다면 추가
        image: resumeData.d_image,
        careers: careers, // 상태에서 직접 가져옴
        certifications: certifications, // 상태에서 직접 가져옴
        wantedDays: formattedWantedDays, // 객체 형태로 변환된 wantedDays
      };

      console.log("전송할 데이터:", updateData);
      console.log("전송할 데이터 상세:", JSON.stringify(updateData, null, 2));
      console.log("희망 근무일 데이터:", updateData.wantedDays);
      console.log("경력 데이터:", updateData.careers);
      console.log("자격증 데이터:", updateData.certificates);

      // API 호출
      const response = await axios.post("/designer/resume/update", updateData);
      console.log("저장 응답:", response.data);
    } catch (error) {
      console.error("이력서 저장 실패:", error);
    }

    // 1초 후 메시지 서서히 사라짐
    setTimeout(() => {
      setFadeOut(true);
    }, 1000);

    // 2초 후 메시지 숨김
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
  }

  return (
    <div className="container mx-auto p-10">
      {/* 간단 프로필 */}
      <section className="flex flex-col items-center justify-center w-full">
        <CVProfile isEditable={isEditable} resumeData={resumeData} />
      </section>

      {/* 경력 */}
      <section className="flex flex-col items-center justify-center p-8 w-full">
        <Career
          isEditable={isEditable}
          resumeData={resumeData}
          onCareerChange={handleCareerChange}
        />
      </section>

      {/* 희망 근무조건 */}
      <section className="flex flex-col items-center justify-center w-full">
        <DesiredWorkDays
          isEditable={isEditable}
          resumeData={resumeData}
          onWantedDaysChange={handleWantedDaysChange}
        />
      </section>

      {/* 자격증 파트 */}
      <section className="flex flex-col items-center justify-center w-full p-8">
        <Certification
          isEditable={isEditable}
          resumeData={resumeData}
          onCertificationChange={handleCertificationChange}
        />
      </section>

      {/* 소개글 파트 */}
      <section className="flex flex-col items-center justify-center w-full p-4">
        <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
          <h2 className="text-2xl font-semibold mb-4">소개글</h2>
          <textarea
            className="w-full h-48 border rounded p-2 resize-none"
            placeholder="자신을 소개하는 글을 작성해주세요."
            value={dDesc}
            onChange={(e) => setDDesc(e.target.value)}
            disabled={!isEditable}
          />
        </div>
      </section>

      {/* 수정 버튼 영역 */}
      <div className="p-4 flex justify-end space-x-4">
        <div>
          {isEditable && (
            <div className="flex space-x-4">
              <button
                className="bg-green-600 text-white px-8 py-2 rounded"
                onClick={handleSave}
              >
                저장
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-8 py-2 rounded"
                onClick={handleCancel}
              >
                취소
              </button>
            </div>
          )}
          {showMessage && (
            <div
              className={`mt-4 text-green-600 transition-opacity ${
                fadeOut ? "opacity-0" : "opacity-100"
              }`}
            >
              저장이 완료되었습니다!
            </div>
          )}
        </div>
        {!isEditable && (
          <button
            className="bg-green-600 text-white px-8 py-2 rounded"
            onClick={() => setIsEditable(true)}
          >
            수정
          </button>
        )}
      </div>
    </div>
  );
}
