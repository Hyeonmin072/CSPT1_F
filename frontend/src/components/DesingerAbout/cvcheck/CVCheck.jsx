import { useState } from 'react';

import SeekCVProfile from "./SeekCVProfile.jsx";
import SeekCareer from "./SeekCareer.jsx";
import SeekWorkDays from "./SeekWorkDays.jsx";
import SeekCertification from "./SeekCertification.jsx";

// 더미 데이터
const defaultProfile = {
    id: 1,
    name: "홍길동",
    email: "test1@gmail.com",
    phone: "010-1234-5678",
    gender: "남성",
    age: 21,
    image: null, // 프로필 이미지
};

const defaultEmploymentHistory = [
    {
        companyName: "ABC 헤어살롱",
        employmentType: "풀타임",
        employmentPeriod: "1년 이상",
        startDate: "2022-01-01",
        endDate: "2023-01-01",
    },
];

const defaultDesiredWorkDays = ["월", "수", "목"];

const defaultCertifications = [
    { id: 1, title: "미용사 국가자격증", date: "2021-12-15" },
];

const defaultIntroduction = "성실하고 열정적인 디자이너입니다. 고객과 소통을 잘하며, 트렌디한 스타일링을 지향합니다.";

export default function CVCheck() {
    // 더미 데이터를 상태로 초기화
    const [profile] = useState(defaultProfile);
    const [employmentHistory] = useState(defaultEmploymentHistory);
    const [selectedDays] = useState(defaultDesiredWorkDays);
    const [certifications] = useState(defaultCertifications);
    const [introduction] = useState(defaultIntroduction);

    return (
        <div className="container mx-auto max-w-5xl p-10">
            {/* 간단 프로필 */}
            <section className="flex flex-col items-center justify-center w-full">
                <SeekCVProfile profile={defaultProfile} />
            </section>

            {/* 경력 */}
            <section className="flex flex-col items-center justify-center p-8 w-full">
                <SeekCareer employmentHistory={defaultEmploymentHistory}/>
            </section>

            {/* 희망 근무조건 */}
            <section className="flex flex-col items-center justify-center w-full">
                <SeekWorkDays selectedDays={defaultDesiredWorkDays}/>
            </section>

            {/* 자격증 */}
            <section className="flex flex-col items-center justify-center w-full p-8">
                <SeekCertification certifications={defaultCertifications}/>
            </section>

            {/* 소개글 */}
            <section className="flex flex-col items-center justify-center w-full p-4">
                <div className="flex flex-col w-full max-w-4xl p-4 pb-8">
                    <h2 className="text-2xl font-semibold mb-4">소개글</h2>
                    <p className="border p-4 rounded bg-gray-50">{introduction}</p>
                </div>
            </section>

            {/* 제출 버튼 */}
            <div className="p-4 flex justify-end">
                <button className="bg-green-600 text-white px-8 py-2 rounded"
                onClick={() => window.history.back()}>
                    제출
                </button>
            </div>
        </div>
    );
}
