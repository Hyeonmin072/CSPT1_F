import React from "react";

export default function SeekCareer({ CurriculumVitae }) {
  const isNewbie = CurriculumVitae?.exp === "NEW";
  const careers = CurriculumVitae?.careers || [];

  return (
    <div className="flex flex-col w-full max-w-4xl p-3 border-b-2 pb-8">
      <h3 className="text-2xl font-semibold mb-4">경력</h3>

      {isNewbie ? (
        <p className="text-gray-500">신입입니다 😊</p>
      ) : careers.length === 0 ? (
        <p className="text-gray-500">등록된 경력 정보가 없습니다.</p>
      ) : (
        careers.map((entry, index) => (
          <div key={index} className="border p-4 mb-4 rounded">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              {/* 회사 이름 */}
              <span className="font-bold">{entry.name}</span>

              {/* 근무 기간 */}
              <span className="text-gray-700">
                {entry.startDate === "1개월 미만" ? (
                  "근무 기간: 1개월 미만"
                ) : (
                  <>
                    {entry.startDate && `입사일: ${entry.startDate}`}
                    {entry.startDate && entry.endDate && " / "}
                    {entry.endDate && `퇴사일: ${entry.endDate}`}
                    {!entry.startDate && !entry.endDate && "근무 기간 정보 없음"}
                  </>
                )}
              </span>
            </div>
            {entry.position && (
              <p className="mt-2 text-sm text-gray-600">직책: {entry.position}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
