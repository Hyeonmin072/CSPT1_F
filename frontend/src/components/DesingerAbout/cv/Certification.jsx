import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function Certification({
  isEditable,
  resumeData,
  onCertificationChange,
}) {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCertification, setNewCertification] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        if (resumeData && resumeData.certifications) {
          setCertifications(resumeData.certifications);
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, [resumeData]);

  // 자격증 객체를 문자열로 변환하는 함수
  const getCertificationText = (cert) => {
    if (typeof cert === "string") {
      return cert;
    } else if (cert && typeof cert === "object") {
      // 객체인 경우 name 속성이 있으면 사용
      return cert.name || JSON.stringify(cert);
    }
    return "";
  };

  // 새 자격증 추가 폼 표시/숨김 토글
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  // 새 자격증 입력 필드 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCertification((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 새 자격증 추가 처리
  const handleAddCertification = () => {
    if (newCertification.name.trim() === "") {
      alert("자격증명을 입력해주세요.");
      return;
    }

    const updatedCertifications = [...certifications, newCertification];
    setCertifications(updatedCertifications);
    setNewCertification({
      name: "",
    });
    setShowAddForm(false);

    // 부모 컴포넌트에 변경사항 전달
    if (onCertificationChange) {
      onCertificationChange(updatedCertifications);
    }
  };

  // 자격증 삭제
  const handleDeleteCertification = (id) => {
    const updatedCertifications = certifications.filter(
      (cert) => cert.id !== id
    );
    setCertifications(updatedCertifications);

    // 부모 컴포넌트에 변경사항 전달
    if (onCertificationChange) {
      onCertificationChange(updatedCertifications);
    }
  };

  // 자격증 정보 업데이트
  const handleCertificationChange = (id, field, value) => {
    const updatedCertifications = certifications.map((cert) => {
      if (cert.id === id) {
        return { ...cert, [field]: value };
      }
      return cert;
    });
    setCertifications(updatedCertifications);

    // 부모 컴포넌트에 변경사항 전달
    if (onCertificationChange) {
      onCertificationChange(updatedCertifications);
    }
  };

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">자격증</h2>
        {isEditable && (
          <button
            onClick={toggleAddForm}
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>자격증 추가</span>
          </button>
        )}
      </div>

      {/* 자격증 추가 폼 */}
      {showAddForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-3">새 자격증 추가</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                자격증명 *
              </label>
              <input
                type="text"
                name="name"
                value={newCertification.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="자격증명을 입력하세요"
                required
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
              onClick={handleAddCertification}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              추가
            </button>
          </div>
        </div>
      )}

      {certifications.length > 0 ? (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div
              key={cert.id || `cert-${index}`}
              className="p-4 border rounded-lg bg-gray-50 relative"
            >
              {isEditable && (
                <button
                  onClick={() => handleDeleteCertification(cert.id || index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              <div className="flex flex-col">
                <div className="font-bold text-lg">
                  {getCertificationText(cert)}
                </div>
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
