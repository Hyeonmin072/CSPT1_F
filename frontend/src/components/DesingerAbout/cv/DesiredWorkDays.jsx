import { useState, useEffect } from "react";

export default function DesiredWorkDays({
  isEditable,
  resumeData,
  onWantedDaysChange,
}) {
  const [desiredDays, setDesiredDays] = useState([]);
  const [loading, setLoading] = useState(true);

  // 요일 목록
  const weekDays = [
    { id: "MON", label: "월요일" },
    { id: "TUE", label: "화요일" },
    { id: "WED", label: "수요일" },
    { id: "THU", label: "목요일" },
    { id: "FRI", label: "금요일" },
    { id: "SAT", label: "토요일" },
    { id: "SUN", label: "일요일" },
  ];

  useEffect(() => {
    const fetchDesiredDays = async () => {
      try {
        console.log("DesiredWorkDays - 받은 resumeData:", resumeData);

        if (resumeData && resumeData.wantedDays) {
          console.log(
            "DesiredWorkDays - wantedDays 설정:",
            resumeData.wantedDays
          );
          setDesiredDays(resumeData.wantedDays);
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

  // 요일 ID를 레이블로 변환하는 함수
  const getDayLabel = (dayId) => {
    const day = weekDays.find((d) => d.id === dayId);
    return day ? day.label : dayId;
  };

  // 희망 근무일 토글 처리
  const handleToggleDay = (dayId) => {
    let updatedDays;

    if (
      desiredDays.some(
        (day) =>
          (typeof day === "string" && day === dayId) ||
          (typeof day === "object" && day.wantedDay === dayId)
      )
    ) {
      // 이미 선택된 경우 제거
      updatedDays = desiredDays.filter(
        (day) =>
          (typeof day === "string" && day !== dayId) ||
          (typeof day === "object" && day.wantedDay !== dayId)
      );
    } else {
      // 선택되지 않은 경우 추가 (객체 형태로)
      const newDay = { wantedDay: dayId };
      updatedDays = [...desiredDays, newDay];
    }

    setDesiredDays(updatedDays);

    // 부모 컴포넌트에 변경사항 전달
    if (onWantedDaysChange) {
      onWantedDaysChange(updatedDays);
      console.log("희망 근무일 변경 후 wantedDays:", updatedDays);
    }
  };

  // 요일이 선택되었는지 확인하는 함수
  const isDaySelected = (dayId) => {
    return desiredDays.some(
      (day) =>
        (typeof day === "string" && day === dayId) ||
        (typeof day === "object" && day.wantedDay === dayId)
    );
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
      <h2 className="text-2xl font-semibold mb-4">희망 근무일</h2>

      {/* 희망 근무일 표시 */}
      <div className="grid grid-cols-3 md:grid-cols-7 gap-2 max-w-2xl mx-auto">
        {weekDays.map((day) => (
          <div
            key={day.id}
            onClick={isEditable ? () => handleToggleDay(day.id) : undefined}
            className={`aspect-square flex flex-col items-center justify-center p-2 rounded text-center cursor-pointer ${
              isDaySelected(day.id)
                ? "bg-blue-100 text-blue-800 border border-blue-300"
                : "bg-gray-100 text-gray-500 border border-gray-300"
            } ${isEditable ? "hover:bg-gray-200" : ""}`}
          >
            <div className="font-medium text-sm">{day.label}</div>
            {isEditable && (
              <div className="mt-1 text-xs text-gray-500">
                {isDaySelected(day.id) ? "선택됨" : "선택 안됨"}
              </div>
            )}
          </div>
        ))}
      </div>

      {desiredDays.length === 0 && (
        <div className="text-center text-gray-500 py-4">
          선택된 희망 근무일이 없습니다.
        </div>
      )}
    </div>
  );
}
