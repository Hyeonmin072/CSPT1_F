import React, { useEffect, useState } from 'react';
import axiosInstance from '../../sign/axios/AxiosInstance.jsx';

import SeekCVProfile from "./SeekCVProfile.jsx";
import SeekCareer from "./SeekCareer.jsx";
import SeekWorkDays from "./SeekWorkDays.jsx";
import SeekCertification from "./SeekCertification.jsx";

export default function CVCheck() {
    const [CurriculumVitae, setCurriculumVitae] = useState([]);

    useEffect(() => {
        const fetchCurriculumVitae = async () => {
            try {
                const response = await axiosInstance.get("/designer/resume");
                const data = response.data;
                if (Array.isArray(data) && data.length > 0) {
                    setCurriculumVitae(data);
                } else {
                    console.warn("이력서 데이터가 비어 있습니다.");
                    setCurriculumVitae([]); // 빈 배열로 초기화
                }
            } catch (error) {
                console.error("이력서 데이터를 가져오는 데 실패했습니다:", error);
            }
        }
        fetchCurriculumVitae();
    }, []);

    return (
        <div className="container mx-auto max-w-5xl p-10">
            {/* 프로필 */}
            <section className="flex flex-col items-center justify-center w-full">
                <SeekCVProfile CurriculumVitae={CurriculumVitae} />
            </section>

            {/* 경력 */}
            <section className="flex flex-col items-center justify-center p-8 w-full">
                <SeekCareer CurriculumVitae={CurriculumVitae} />
            </section>

            {/* 희망 근무조건 */}
            <section className="flex flex-col items-center justify-center w-full">
                <SeekWorkDays CurriculumVitae={CurriculumVitae} />
            </section>

            {/* 자격증 */}
            <section className="flex flex-col items-center justify-center w-full p-8">
                <SeekCertification CurriculumVitae={CurriculumVitae} />
            </section>

            {/* 소개글 */}
            <section className="flex flex-col items-center justify-center w-full p-4">
                <div className="flex flex-col w-full max-w-4xl p-4 pb-8">
                    <h2 className="text-2xl font-semibold mb-4">소개글</h2>
                    <p className="border p-4 rounded bg-gray-50">{CurriculumVitae.desc}</p>
                </div>
            </section>

            {/* 제출 버튼 */}
            <div className="p-4 flex justify-end space-x-4">
                <button className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
                type='submit'
                onClick={() => window.history.back()}>
                    제출
                </button>
                <button className="bg-gray-300 text-white px-8 py-2 rounded hover:bg-gray-400"
                type='button'
                onClick={() => window.history.back()}>
                    취소 
                </button>
            </div>
        </div>
    );
}
