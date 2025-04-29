import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

export default function Career({ isEditable, resumeData }) {
  const [employmentHistory, setEmploymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCareer, setNewCareer] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

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

  // 경력 기간 표시 함수
  const getCareerPeriod = (career) => {
    if (career && typeof career === "object") {
      const startDate = career.startDate || "";
      const endDate = career.endDate || "";

      if (startDate && endDate) {
        return `${startDate} ~ ${endDate}`;
      } else if (startDate) {
        return `${startDate} ~ 현재`;
      }
    }
    return "";
  };

  // 경력 포지션 표시 함수
  const getCareerPosition = (career) => {
    if (career && typeof career === "object" && career.position) {
      return career.position;
    }
    return "";
  };

  // 새 경력 추가 폼 표시/숨김 토글
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  // 새 경력 입력 필드 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 날짜 필드인 경우 하이픈 자동 추가
    if (name === "startDate" || name === "endDate") {
      // 숫자만 추출
      const numbers = value.replace(/[^0-9]/g, "");

      // 8자리 이상 입력 방지
      if (numbers.length > 8) {
        return;
      }

      // 8자리 숫자가 입력된 경우 YYYY-MM-DD 형식으로 변환
      if (numbers.length === 8) {
        const formattedDate = `${numbers.substring(0, 4)}-${numbers.substring(
          4,
          6
        )}-${numbers.substring(6, 8)}`;
        setNewCareer((prev) => ({
          ...prev,
          [name]: formattedDate,
        }));
        return;
      }

      // 4자리 숫자가 입력된 경우 YYYY- 형식으로 변환
      if (numbers.length === 4) {
        const formattedDate = `${numbers.substring(0, 4)}-`;
        setNewCareer((prev) => ({
          ...prev,
          [name]: formattedDate,
        }));
        return;
      }

      // 6자리 숫자가 입력된 경우 YYYY-MM- 형식으로 변환
      if (numbers.length === 6) {
        const formattedDate = `${numbers.substring(0, 4)}-${numbers.substring(
          4,
          6
        )}-`;
        setNewCareer((prev) => ({
          ...prev,
          [name]: formattedDate,
        }));
        return;
      }

      // 그 외의 경우 숫자만 저장
      setNewCareer((prev) => ({
        ...prev,
        [name]: numbers,
      }));
      return;
    }

    // 날짜 필드가 아닌 경우 기존 로직대로 처리
    setNewCareer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 새 경력 추가 처리
  const handleAddCareer = () => {
    if (newCareer.company.trim() === "") {
      alert("회사명을 입력해주세요.");
      return;
    }

    const updatedHistory = [...employmentHistory, newCareer];
    setEmploymentHistory(updatedHistory);
    setNewCareer({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
    });
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">경력</h2>
        {isEditable && (
          <button
            onClick={toggleAddForm}
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>경력 추가</span>
          </button>
        )}
      </div>

      {/* 경력 추가 폼 */}
      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-3">새 경력 추가</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                회사명 *
              </label>
              <input
                type="text"
                name="company"
                value={newCareer.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="회사명을 입력하세요"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                직책
              </label>
              <input
                type="text"
                name="position"
                value={newCareer.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="직책을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                시작일
              </label>
              <input
                type="text"
                name="startDate"
                value={newCareer.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="YYYY-MM-DD (예: 2020-01-01)"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                title="YYYY-MM-DD 형식으로 입력하세요 (예: 2020-01-01)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                종료일
              </label>
              <input
                type="text"
                name="endDate"
                value={newCareer.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="YYYY-MM-DD (예: 2023-12-31)"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                title="YYYY-MM-DD 형식으로 입력하세요 (예: 2023-12-31)"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={toggleAddForm}
              className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleAddCareer}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              추가
            </button>
          </div>
        </div>
      )}

      {employmentHistory.length > 0 ? (
        <div className="space-y-4">
          {employmentHistory.map((career, index) => (
            <div key={index} className="border p-4 rounded">
              <div className="flex flex-col">
                <div className="font-bold text-lg">{getCareerText(career)}</div>
                {getCareerPosition(career) && (
                  <div className="text-gray-600 mt-1">
                    직책 : {getCareerPosition(career)}
                  </div>
                )}
                {getCareerPeriod(career) && (
                  <div className="text-gray-500 text-sm mt-1">
                    기간 : {getCareerPeriod(career)}
                  </div>
                )}
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
