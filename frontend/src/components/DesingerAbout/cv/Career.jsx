import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function Career({ isEditable, resumeData, onCareerChange }) {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBasicExp, setIsBasicExp] = useState(false);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        console.log("Career - 받은 resumeData:", resumeData);

        if (resumeData) {
          // exp 값 확인
          setIsBasicExp(resumeData.d_exp === "NEW");

          if (resumeData.employmentHistory) {
            console.log(
              "Career - employmentHistory 설정:",
              resumeData.employmentHistory
            );
            setCareers(resumeData.employmentHistory);
          }
        }
      } catch (error) {
        console.error("Error fetching careers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, [resumeData]);

  // 경력 추가
  const handleAddCareer = () => {
    const newCareer = {
      id: Date.now().toString(), // 임시 ID 생성
      shopName: "",
      joinDate: "",
      outDate: "",
      position: "",
    };
    const updatedCareers = [...careers, newCareer];
    setCareers(updatedCareers);

    // 부모 컴포넌트에 변경사항 전달
    if (onCareerChange) {
      onCareerChange(updatedCareers);
      console.log("경력 추가 후 employmentHistory:", updatedCareers);
    }
  };

  // 경력 삭제
  const handleDeleteCareer = (id) => {
    const updatedCareers = careers.filter((career) => career.id !== id);
    setCareers(updatedCareers);

    // 부모 컴포넌트에 변경사항 전달
    if (onCareerChange) {
      onCareerChange(updatedCareers);
      console.log("경력 삭제 후 employmentHistory:", updatedCareers);
    }
  };

  // 경력 정보 업데이트
  const handleCareerChange = (id, field, value) => {
    const updatedCareers = careers.map((career) => {
      if (career.id === id) {
        return { ...career, [field]: value };
      }
      return career;
    });
    setCareers(updatedCareers);

    // 부모 컴포넌트에 변경사항 전달
    if (onCareerChange) {
      onCareerChange(updatedCareers);
      console.log("경력 수정 후 employmentHistory:", updatedCareers);
    }
  };

  // 날짜 입력 시 자동으로 하이픈 추가
  const handleDateChange = (id, field, value) => {
    // 숫자만 입력 가능하도록
    const numericValue = value.replace(/[^0-9]/g, "");

    // 최대 8자리로 제한
    if (numericValue.length > 8) return;

    let formattedValue = numericValue;

    // 4자리 이상일 때 하이픈 추가
    if (numericValue.length >= 4) {
      formattedValue =
        numericValue.substring(0, 4) + "-" + numericValue.substring(4);
    }

    // 6자리 이상일 때 두 번째 하이픈 추가
    if (numericValue.length >= 6) {
      formattedValue =
        formattedValue.substring(0, 7) + "-" + formattedValue.substring(7);
    }

    handleCareerChange(id, field, formattedValue);
  };

  // 경력 수준 변경
  const handleExpLevelChange = (level) => {
    setIsBasicExp(level === "NEW");

    // 부모 컴포넌트에 변경사항 전달
    if (onCareerChange) {
      const updatedData = {
        ...resumeData,
        d_exp: level,
      };
      onCareerChange(updatedData);
      console.log("경력 수준 변경:", level);
    }
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">경력</h2>
          {isEditable && (
            <div className="flex gap-2">
              <button
                onClick={() => handleExpLevelChange("NEW")}
                className={`px-3 py-1 rounded ${
                  isBasicExp
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                신입
              </button>
              <button
                onClick={() => handleExpLevelChange("EXP")}
                className={`px-3 py-1 rounded ${
                  !isBasicExp
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                경력
              </button>
            </div>
          )}
        </div>
        {isEditable && !isBasicExp && (
          <button
            onClick={handleAddCareer}
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>경력 추가</span>
          </button>
        )}
      </div>

      {isBasicExp ? (
        <div className="text-center text-gray-500 py-4">신입입니다</div>
      ) : careers.length === 0 ? (
        <div className="text-center text-gray-500 py-4">
          등록된 경력이 없습니다.
        </div>
      ) : (
        <div className="space-y-4">
          {careers.map((career) => (
            <div
              key={career.id}
              className="p-4 border rounded-lg bg-gray-50 relative"
            >
              {isEditable && (
                <button
                  onClick={() => handleDeleteCareer(career.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    회사명
                  </label>
                  <input
                    type="text"
                    value={career.shopName}
                    onChange={(e) =>
                      handleCareerChange(career.id, "shopName", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="회사명을 입력하세요"
                    disabled={!isEditable}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    직책
                  </label>
                  <input
                    type="text"
                    value={career.position}
                    onChange={(e) =>
                      handleCareerChange(career.id, "position", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="직책을 입력하세요"
                    disabled={!isEditable}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    시작일
                  </label>
                  <input
                    type="text"
                    value={career.joinDate}
                    onChange={(e) =>
                      handleDateChange(career.id, "joinDate", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="YYYY-MM-DD"
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    maxLength={10}
                    disabled={!isEditable}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    종료일
                  </label>
                  <input
                    type="text"
                    value={career.outDate}
                    onChange={(e) =>
                      handleDateChange(career.id, "outDate", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    placeholder="YYYY-MM-DD"
                    pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                    maxLength={10}
                    disabled={!isEditable}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
