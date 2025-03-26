import { useState, useEffect } from 'react';

import CVProfile from "./CVProfile.jsx";
import Career from "./Career.jsx";
import DesiredWorkDays from "./DesiredWorkDays.jsx";
import Certification from "./Certification.jsx";


export default function CurriculumVitae() {
    const [isEditable, setIsEditable] = useState(false);  // 수정 가능 여부 상태
    const [showMessage, setShowMessage] = useState(false); // 저장 메시지 상태
    const [fadeOut, setFadeOut] = useState(false); // 저장 메시지 fade-out 상태
    const [introduction, setIntroduction] = useState(""); // 소개글 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 더미 데이터
    const dummyIntroduction = "안녕하세요! 저는 5년 경력의 헤어 디자이너입니다. 고객의 스타일을 찾아드리는 것을 좋아합니다!";

    // 백엔드 데이터 가져오기
    useEffect(() => {
        const fetchCurriculumVitae = async () => {
            try {
                // 실제 API 호출 시 아래 코드 활성화
                // const response = await fetch("/api/curriculum-vitae");
                // const data = await response.json();

                // 지금은 더미 데이터를 사용
                const data = { introduction: dummyIntroduction };
                setIntroduction(data.introduction);
            } catch (error) {
                console.error("Error fetching curriculum vitae:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchCurriculumVitae();
    }, []);

    const handleSave = async () => {
        setShowMessage(true);
        setIsEditable(false); // 저장 후 수정 모드 종료
        setFadeOut(false);

        try {
            // 실제 API 호출 시 아래 코드 활성화
            // await fetch("/api/curriculum-vitae", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ introduction }),
            // });

            console.log("Saved introduction:", introduction); // 지금은 로컬 로그로 처리
        } catch (error) {
            console.error("Error saving curriculum vitae:", error);
        }

        // 1초 후 메시지 서서히 사라짐
        setTimeout(() => {
            setFadeOut(true);
        }, 1000);

        // 2초 후 메시지 숨김
        setTimeout(() => {
            setShowMessage(false);
        }, 2000);
    };

    const handleCancel = () => {
        setIsEditable(false);
    };

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    return (
        <div className="container mx-auto p-10">
            {/* 간단 프로필 */}
            <section className="flex flex-col items-center justify-center w-full">
                <CVProfile isEditable={isEditable} />
            </section>

            {/* 경력 */}
            <section className="flex flex-col items-center justify-center p-8 w-full">
                <Career isEditable={isEditable} />
            </section>

            {/* 희망 근무조건 */}
            <section className="flex flex-col items-center justify-center w-full">
                <DesiredWorkDays isEditable={isEditable} />
            </section>

            {/* 자격증 파트 */}
            <section className="flex flex-col items-center justify-center w-full p-8">
                <Certification isEditable={isEditable} />
            </section>

            {/* 소개글 파트 */}
            <section className="flex flex-col items-center justify-center w-full p-4">
                <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
                    <h2 className="text-2xl font-semibold mb-4">소개글</h2>
                    <textarea
                        className="w-full h-48 border rounded p-2 resize-none"
                        placeholder="자신을 소개하는 글을 작성해주세요."
                        value={introduction}
                        onChange={(e) => setIntroduction(e.target.value)}
                        disabled={!isEditable}
                    />
                </div>
            </section>

            {/* 수정 버튼 영역 */}
            <div className="p-4 flex justify-end space-x-4">
                <div>
                    {isEditable && (
                        <div className="flex space-x-4">
                            <button
                                className="bg-green-600 text-white px-8 py-2 rounded"
                                onClick={handleSave}
                            >
                                저장
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-8 py-2 rounded"
                                onClick={handleCancel}
                            >
                                취소
                            </button>
                        </div>
                    )}
                    {showMessage && (
                        <div
                            className={`mt-4 text-green-600 transition-opacity ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
                        >
                            저장이 완료되었습니다!
                        </div>
                    )}
                </div>
                {!isEditable && (
                    <button
                        className="bg-green-600 text-white px-8 py-2 rounded"
                        onClick={() => setIsEditable(true)}
                    >
                        수정
                    </button>
                )}
            </div>
        </div>
    );
}
