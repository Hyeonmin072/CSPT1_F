import { useState } from "react";
import d1 from "../../../assets/designer/d1.png";

export default function SeekCVProfile({ profile }) {
    return (
        <div className="flex w-full max-w-4xl border-b-2">
            {/* 프로필 이미지 섹션 */}
            <div className="p-8 flex justify-center">
                <div className="w-[240px] h-[280px] border-dashed border-4 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                    <img
                        src={profile.image || d1} // 이미지 없을 시 기본 이미지 표시
                        alt="프로필 이미지"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>

            {/* 프로필 정보 섹션 */}
            <div className="p-8">
                {/* 이름 (수정 불가능) */}
                <div className="flex items-center mb-4">
                    <label className="w-32 text-gray-700 font-bold">이름</label>
                    <span className="w-[400px] border rounded p-2 bg-gray-100">{profile.name}</span>
                </div>

                {/* 이메일 (수정 불가능) */}
                <div className="flex items-center mb-4">
                    <label className="w-32 text-gray-700 font-bold">이메일</label>
                    <span className="w-[400px] border rounded p-2 bg-gray-100">{profile.email}</span>
                </div>

                {/* 전화번호 (수정 불가능) */}
                <div className="flex items-center mb-4">
                    <label className="w-32 text-gray-700 font-bold">전화번호</label>
                    <span className="w-[400px] border rounded p-2 bg-gray-100">{profile.phone}</span>
                </div>

                {/* 성별 (수정 불가능) */}
                <div className="flex items-center mb-4">
                    <label className="w-32 text-gray-700 font-bold">성별</label>
                    <span className="w-[400px] border rounded p-2 bg-gray-100">{profile.gender}</span>
                </div>

                {/* 나이 (수정 불가능) */}
                <div className="flex items-center mb-4">
                    <label className="w-32 text-gray-700 font-bold">나이</label>
                    <span className="w-[400px] border rounded p-2 bg-gray-100">{profile.age}</span>
                </div>
            </div>
        </div>
    );
}
