import { useState, useEffect } from "react";

import CVProfile from "./CVProfile.jsx";
import Career from "./Career.jsx";
import DesiredWorkDays from "./DesiredWorkDays.jsx";
import Certification from "./Certification.jsx";
import axios from "axios";

export default function CurriculumVitae({
  isEditable: isEditableProp,
  resumeData: resumeDataProp,
  onCareerChange,
  onWantedDaysChange,
  onCertificationChange,
  formatResumeDataForApi,
}) {
  const [isEditable, setIsEditable] = useState(isEditableProp || false); // 수정 가능 여부 상태
  const [showMessage, setShowMessage] = useState(false); // 저장 메시지 상태
  const [fadeOut, setFadeOut] = useState(false); // 저장 메시지 fade-out 상태
  const [dDesc, setDDesc] = useState(""); // 소개글 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [wantedDays, setWantedDays] = useState([]); // 희망 근무일 상태
  const [careers, setCareers] = useState([]); // 경력 상태
  const [certifications, setCertifications] = useState([]); // 자격증 상태
  const [resumeData, setResumeData] = useState(null); // 이력서 데이터 상태
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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

  // 축약형 요일을 전체 요일 이름으로 변환하는 함수
  const convertDayToFull = (shortDay) => {
    const dayMap = {
      MON: "MONDAY",
      TUE: "TUESDAY",
      WED: "WEDNESDAY",
      THU: "THURSDAY",
      FRI: "FRIDAY",
      SAT: "SATURDAY",
      SUN: "SUNDAY",
    };
    return dayMap[shortDay] || shortDay;
  };

  // 이력서 데이터 가져오기
  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        // props로 resumeData가 전달된 경우
        if (resumeDataProp) {
          console.log("이력서 데이터:", resumeDataProp);

          // 데이터 구조 변환
          const formattedData = {
            d_id: resumeDataProp.id || "",
            d_name: resumeDataProp.name || "",
            d_email: resumeDataProp.email || "",
            d_tel: resumeDataProp.tel || "",
            d_gender: resumeDataProp.gender || "",
            d_age: resumeDataProp.age || "",
            d_image: resumeDataProp.image || null,
            d_desc: resumeDataProp.content || "",
            d_exp: resumeDataProp.exp || "",
            employmentHistory: (resumeDataProp.careers || []).map((career) => ({
              ...career,
              shopName: career.name || career.shopName || "", // name이 있으면 shopName으로 사용
            })),
            certifications:
              resumeDataProp.certifications ||
              resumeDataProp.certificates ||
              [],
            wantedDays: resumeDataProp.wantedDays || [],
            decisionType: "SELECT_DAYS",
          };

          console.log("변환된 이력서 데이터:", formattedData);
          setResumeData(formattedData);
          setWantedDays(formattedData.wantedDays || []);
          setCareers(formattedData.employmentHistory || []);
          setCertifications(formattedData.certifications || []);

          // 소개글 설정
          setDDesc(formattedData.d_desc);

          if (formattedData.d_image) {
            setPreview(formattedData.d_image);
            setImage(null);
          }
        } else {
          // API에서 데이터 가져오기
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
            employmentHistory: (response.data.careers || []).map((career) => ({
              ...career,
              shopName: career.name || career.shopName || "", // name이 있으면 shopName으로 사용
            })),
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

          if (formattedData.d_image) {
            setPreview(formattedData.d_image);
            setImage(null);
          }
        }
      } catch (error) {
        console.error("이력서 데이터 가져오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [resumeDataProp]);

  // 희망 근무일 변경 처리 함수
  const handleWantedDaysChange = (days) => {
    setWantedDays(days);
  };

  // 경력 변경 처리 함수
  const handleCareerChange = (updatedCareers) => {
    console.log("경력 변경 처리:", updatedCareers);

    // 경력 데이터 업데이트
    setCareers(updatedCareers);

    // resumeData 업데이트
    setResumeData((prevData) => {
      const newData = {
        ...prevData,
        d_exp: updatedCareers && updatedCareers.length > 0 ? "EXP" : "NEW",
        employmentHistory: updatedCareers,
      };
      console.log("업데이트된 resumeData:", newData);
      return newData;
    });
  };

  // 자격증 변경 처리 함수
  const handleCertificationChange = (updatedCertifications) => {
    setCertifications(updatedCertifications);
  };

  const handleSave = async () => {
    setShowMessage(true);
    setIsEditable(false); // 저장 후 수정 모드 종료
    setFadeOut(false);

    try {
      // API 요청 데이터 형식으로 변환
      const updateData = formatResumeDataForApi
        ? formatResumeDataForApi({
            d_desc: dDesc,
            d_exp: resumeData?.d_exp || "",
            employmentHistory: careers.map((career) => ({
              id: career.id,
              shopName: career.shopName,
              joinDate: career.joinDate,
              outDate: career.outDate,
              position: career.position,
            })),
            certifications: certifications,
            wantedDays: wantedDays.map((day) => ({
              wantedDay: convertDayToFull(day.wantedDay || day),
            })),
            d_image: image && image instanceof File ? image : null,
          })
        : {
            content: dDesc,
            exp: resumeData?.d_exp || "",
            portfolio: "",
            image: image && image instanceof File ? image : null,
            careers: careers.map((career) => ({
              id: career.id,
              shopName: career.shopName,
              joinDate: career.joinDate,
              outDate: career.outDate,
              position: career.position,
            })),
            certifications: certifications,
            wantedDays: wantedDays.map((day) => ({
              wantedDay: convertDayToFull(day.wantedDay || day),
            })),
          };

      console.log("전송할 데이터:", updateData);
      console.log("전송할 데이터 상세:", JSON.stringify(updateData, null, 2));
      console.log("희망 근무일 데이터:", updateData.wantedDays);
      console.log("경력 데이터:", updateData.careers);
      console.log(
        "자격증 데이터:",
        updateData.certificates || updateData.certifications
      );

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

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(file); // 반드시 File 객체로!
      setPreview(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
  }

  return (
    <div className="container mx-auto p-10">
      {/* 간단 프로필 */}
      <section className="flex flex-col items-center justify-center w-full">
        <CVProfile
          isEditable={isEditable}
          resumeData={resumeData}
          image={image}
          setImage={setImage}
          preview={preview}
          setPreview={setPreview}
        />
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
