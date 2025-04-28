import { useState, useEffect } from "react";

export default function Certification({ isEditable, resumeData }) {
  // 자격증 관련 상태 관리
  const [certifications, setCertifications] = useState([]); // 자격증 목록
  const [certification, setCertification] = useState(""); // 신규 입력 값
  const [reId, setReId] = useState(""); // 구직 지원서 ID
  const [crId, setCrId] = useState(null); // 이력서 ID (고유 ID)
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 이력서 ID 및 자격증 초기화
  useEffect(() => {
    const fetchCrIdAndCertifications = async () => {
      try {
        console.log("Certification - 받은 resumeData:", resumeData);

        // resumeData가 있으면 사용
        if (resumeData) {
          if (resumeData.d_id) {
            console.log("Certification - cr_id 설정:", resumeData.d_id);
            setCrId(resumeData.d_id);
          }
          if (resumeData.d_id) {
            console.log("Certification - re_id 설정:", resumeData.d_id);
            setReId(resumeData.d_id);
          }
          if (resumeData.certifications) {
            console.log(
              "Certification - certifications 설정:",
              resumeData.certifications
            );
            setCertifications(resumeData.certifications);
          }
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchCrIdAndCertifications();
  }, [resumeData]);

  const handleAddCertification = () => {
    // 입력된 자격증 값이 공백이 아니면 진행
    if (certification.trim()) {
      const newCertifications = [...certifications, certification.trim()];
      setCertifications(newCertifications); // 자격증 배열 업데이트
      setCertification(""); // 입력 필드 초기화

      console.log("추가된 자격증:", certification.trim());
    }
  };

  const handleDeleteCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications); // 자격증 삭제 후 업데이트
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
  }

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
      <h2 className="text-2xl font-semibold mb-4">자격증</h2>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="flex-grow border rounded p-2 mr-2"
          placeholder="자격증을 입력하세요"
          value={certification}
          onChange={(e) => setCertification(e.target.value)}
          disabled={!isEditable}
        />
        {isEditable && (
          <button
            className="bg-green-600 text-white px-8 py-2 rounded"
            onClick={handleAddCertification}
          >
            저장
          </button>
        )}
      </div>
      {/* 자격증 목록 */}
      {certifications.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {certifications.map((cert, index) => (
            <div key={index} className="border p-2 mb-4 rounded">
              <div className="flex items-center">
                <span>{cert}</span>
                {isEditable && (
                  <button
                    className="ml-auto text-red-500"
                    onClick={() => handleDeleteCertification(index)}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          등록된 자격증이 없습니다.
        </div>
      )}
    </div>
  );
}
