import { useState, useEffect } from "react";

export default function Certification({ isEditable, resumeData }) {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        console.log("Certification - 받은 resumeData:", resumeData);

        if (resumeData && resumeData.certifications) {
          console.log(
            "Certification - certifications 설정:",
            resumeData.certifications
          );
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

  if (loading) {
    return <div className="text-center mt-4">로딩 중...</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
      <h2 className="text-2xl font-semibold mb-4">자격증</h2>
      {certifications.length > 0 ? (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={index} className="border p-4 rounded">
              <div className="flex items-center">
                <span className="font-bold">{getCertificationText(cert)}</span>
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
