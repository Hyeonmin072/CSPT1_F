import React, { useEffect, useState } from 'react';
import axiosInstance from '../../sign/axios/AxiosInstance.jsx';

import SeekCVProfile from './SeekCVProfile.jsx';
import SeekCareer from './SeekCareer.jsx';
import SeekWorkDays from './SeekWorkDays.jsx';
import SeekCertification from './SeekCertification.jsx';

export default function CVCheck() {
  const [CurriculumVitae, setCurriculumVitae] = useState(null);

  useEffect(() => {
    const fetchCurriculumVitae = async () => {
      try {
        const response = await axiosInstance.get('/designer/resume');
        const data = response.data;
  
        setCurriculumVitae(data);

      } catch (error) {
        console.error('이력서 데이터를 가져오는 데 실패했습니다:', error);
      }
    };
  
    fetchCurriculumVitae();
  }, []);
  

  if (!CurriculumVitae) {
    return <div className="p-10 text-center text-gray-600">이력서를 불러오는 중입니다</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl p-10 space-y-10">
      {/* 프로필 */}
      <section className="flex flex-col items-center w-full">
            <SeekCVProfile
              CurriculumVitae={CurriculumVitae}
              setCurriculumVitae={setCurriculumVitae}
            />
      </section>

      {/* 경력 */}
      <section className="flex flex-col items-center w-full">
        <SeekCareer CurriculumVitae={CurriculumVitae} />
      </section>

      {/* 희망 근무 조건 */}
      <section className="flex flex-col items-center w-full">
        <SeekWorkDays CurriculumVitae={CurriculumVitae} />
      </section>

      {/* 자격증 */}
      <section className="flex flex-col items-center w-full">
        <SeekCertification CurriculumVitae={CurriculumVitae} />
      </section>

      {/* 소개글 */}
      <section className="flex flex-col items-center w-full">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">소개글</h2>
          <p className="border p-4 rounded bg-gray-50 whitespace-pre-wrap">{CurriculumVitae.content}</p>
        </div>
      </section>

      {/* 제출/취소 버튼 */}
      <div className="flex justify-end space-x-4">
        <button
          className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700"
          type="submit"
          onClick={() => window.history.back()}
        >
          제출
        </button>
        <button
          className="bg-gray-400 text-white px-8 py-2 rounded hover:bg-gray-500"
          type="button"
          onClick={() => window.history.back()}
        >
          취소
        </button>
      </div>
    </div>
  );
}
