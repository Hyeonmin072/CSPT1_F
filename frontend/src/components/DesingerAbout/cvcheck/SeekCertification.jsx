import React from "react";

export default function SeekCertification({ CurriculumVitae }) {
  const certifications = CurriculumVitae?.certifications || [];

  return (
    <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
      <h2 className="text-2xl font-semibold mb-4">자격증</h2>
      {certifications.length === 0 ? (
        <p className="text-gray-500">등록된 자격증 정보가 없습니다.</p>
      ) : (
        <div className="border p-4 rounded-lg w-full">
          {certifications.map((cert) => (
            <div key={cert.id} className="mb-2">
              <p className="font-bold">{cert.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
