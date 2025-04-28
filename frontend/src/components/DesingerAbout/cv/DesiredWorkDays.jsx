import { useState, useEffect } from "react";

export default function DesiredWorkDays({ isEditable, resumeData }) {
  const [desiredDays, setDesiredDays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDesiredDays = async () => {
      try {
        console.log("DesiredWorkDays - 받은 resumeData:", resumeData);

        if (resumeData && resumeData.desiredDays) {
          console.log(
            "DesiredWorkDays - desiredDays 설정:",
            resumeData.desiredDays
          );
          setDesiredDays(resumeData.desiredDays);
        }
      } catch (error) {
        console.error("Error fetching desired days:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesiredDays();
  }, [resumeData]);

  // 희망 근무일 객체를 문자열로 변환하는 함수
  const getDayText = (day) => {
    if (typeof day === "string") {
      return day;
    } else if (day && typeof day === "object") {
      // 객체인 경우 day 속성이 있으면 사용
      return day.day || JSON.stringify(day);
    }
    return "";
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
      <h2 className="text-2xl font-semibold mb-4">희망 근무일</h2>
      {desiredDays.length > 0 ? (
        <div className="space-y-4">
          {desiredDays.map((day, index) => (
            <div key={index} className="border p-4 rounded">
              <div className="flex items-center">
                <span className="font-bold">{getDayText(day)}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">
          선택된 희망 근무일이 없습니다.
        </div>
      )}
    </div>
  );
}
