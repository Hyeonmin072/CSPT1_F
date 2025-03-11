import { useState } from 'react';

import CVProfile from "./CVProfile.jsx";
import Career from "./Career.jsx";
import DesiredWorkDays from "./DesiredWorkDays.jsx";
import Certification from "./Certification.jsx";

// 기본 프로필 설정 함수
const defaultProfile = () => [
    { id: 1, name: "홍길동", email: "test1@gmail.com", phone: "010-1234-5678", gender:"남성", age:21 },
];

export default function CurriculumVitae() {
    const [isEditable, setIsEditable] = useState(false);  // 수정 가능 여부 상태

    // 프로필 관련 상태
    const [profile, setProfile] = useState(defaultProfile()[0]);
    const [image, setImage] = useState(null);
    const [gender, setGender] = useState('');

    // 경력 관련 상태
    const [employmentType, setEmploymentType] = useState('신입');
    const [employmentPeriod, setEmploymentPeriod] = useState('1개월 미만');
    const [employmentStartDate, setEmploymentStartDate] = useState(null);
    const [employmentEndDate, setEmploymentEndDate] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [employmentHistory, setEmploymentHistory] = useState([]);

    // 희망 근무요일 상태
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState(null);

    // (수정 상태) 저장 버튼 관련 상태
    const [showMessage, setShowMessage] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    // 자격증 관련 상태 관리
    const [certification, setCertification] = useState("");
    const [certifications, setCertifications] = useState([]);


    // 소개글 상태 관리
    const [introduction, setIntroduction] = useState("");


    const handleSave = () => {
        setShowMessage(true);
        setIsEditable(false); // 저장 후 수정 모드 종료
        setFadeOut(false);

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




    return (
        <div className="container mx-auto p-10">
            {/* 간단 프로필 */}
            <section className="flex flex-col items-center justify-center w-full">
                <CVProfile
                    profile={profile}
                    setProfile={setProfile}
                    image={image}
                    setImage={setImage}
                    gender={gender}
                    setGender={setGender}
                    isEditable={isEditable}
                />
            </section>

            {/* 경력 */}
            <section className="flex flex-col items-center justify-center p-8 w-full">
                <Career
                    isEditable={isEditable}
                    employmentType={employmentType}
                    employmentPeriod={employmentPeriod}
                    setEmploymentType={setEmploymentType}
                    setEmploymentPeriod={setEmploymentPeriod}
                    employmentStartDate={employmentStartDate}
                    setEmploymentStartDate={setEmploymentStartDate}
                    employmentEndDate={employmentEndDate}
                    setEmploymentEndDate={setEmploymentEndDate}
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    employmentHistory={employmentHistory}
                    setEmploymentHistory={setEmploymentHistory}
                />
            </section>

            {/* 희망 근무조건 */}
            <section className="flex flex-col items-center justify-center w-full">
                <DesiredWorkDays
                    isEditable={isEditable}
                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays}
                    selectedDuration={selectedDuration}
                    setSelectedDuration={setSelectedDuration}
                />
            </section>

            {/* 자격증 파트 */}
            <section className="flex flex-col items-center justify-center w-full p-8">
                <Certification
                    isEditable={isEditable}
                    certification={certification}
                    setCertification={setCertification}
                    certifications={certifications}
                    setCertifications={setCertifications}
                />
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
                                className="bg-[#00B3A6] text-white px-8 py-2 rounded"
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
                            className={`mt-4 text-[#00B3A6] transition-opacity ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
                        >
                            저장이 완료되었습니다!
                        </div>
                    )}
                </div>
                {!isEditable && (
                    <button
                        className="bg-[#00B3A6] text-white px-8 py-2 rounded"
                        onClick={() => setIsEditable(true)}
                    >
                        수정
                    </button>
                )}
            </div>
        </div>
    );
}
