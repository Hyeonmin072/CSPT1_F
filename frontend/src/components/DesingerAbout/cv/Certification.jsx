export default function Certification({ isEditable, certification,setCertification,certifications, setCertifications }){
    const handleAddCertification = () => {
        // 입력된 자격증 값이 공백이 아니면 진행
        if (certification.trim()) {
            // 새로운 자격증 배열 생성
            const newCertifications = [...certifications, certification.trim()];
            // 자격증 배열 업데이트
            setCertifications(newCertifications);
            // 입력 필드 초기화
            setCertification("");
        }
    };

    const handleDeleteCertification = (index) => {
        const updatedCertifications = certifications.filter((_, i) => i !== index);
        setCertifications(updatedCertifications);
    };

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
                        className="bg-[#00B3A6] text-white px-8 py-2 rounded"
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