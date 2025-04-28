import { useState, useEffect } from "react";

export default function Career({ isEditable, resumeData }) {
  const [employmentHistory, setEmploymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmploymentHistory = async () => {
      try {
        console.log("Career - 받은 resumeData:", resumeData);

        if (resumeData && resumeData.employmentHistory) {
          console.log(
            "Career - employmentHistory 설정:",
            resumeData.employmentHistory
          );
          setEmploymentHistory(resumeData.employmentHistory);
        }
      } catch (error) {
        console.error("Error fetching employment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmploymentHistory();
  }, [resumeData]);

  // 경력 객체를 문자열로 변환하는 함수
  const getCareerText = (career) => {
    if (typeof career === "string") {
      return career;
    } else if (career && typeof career === "object") {
      // 객체인 경우 company 속성이 있으면 사용
      return career.company || JSON.stringify(career);
    }
    return "";
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
      <h2 className="text-2xl font-semibold mb-4">경력</h2>
      {employmentHistory.length > 0 ? (
        <div className="space-y-4">
          {employmentHistory.map((career, index) => (
            <div key={index} className="border p-4 rounded">
              <div className="flex items-center">
                <span className="font-bold">{getCareerText(career)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          등록된 경력이 없습니다.
        </div>
      )}
    </div>
  );
}
