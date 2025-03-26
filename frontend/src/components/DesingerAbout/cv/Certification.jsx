import { useState, useEffect } from "react";

export default function Certification({ isEditable }) {
    // 자격증 관련 상태 관리
    const [certification, setCertification] = useState("");
    const [certifications, setCertifications] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 더미 데이터
    const dummyCertifications = [];

    // 백엔드 데이터 가져오기
    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                // 실제 API 호출 시 아래 코드를 활성화
                // const response = await fetch("/api/certifications");
                // const data = await response.json();

                // 지금은 더미 데이터를 사용
                const data = dummyCertifications;
                setCertifications(data);
            } catch (error) {
                console.error("Error fetching certifications:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchCertifications();
    }, []);

    const handleAddCertification = () => {
        // 입력된 자격증 값이 공백이 아니면 진행
        if (certification.trim()) {
            const newCertifications = [...certifications, certification.trim()];
            setCertifications(newCertifications); // 자격증 배열 업데이트
            setCertification(""); // 입력 필드 초기화
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
        </div>
    );
}
