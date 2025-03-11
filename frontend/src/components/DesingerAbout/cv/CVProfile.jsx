import { useState } from "react";
import { Upload } from 'lucide-react';

export default function CVProfile({ defaultProfile, profile, isEditable, image, setImage, gender, setGender }) {


    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleNumberInput = (e) => {
        const charCode = e.which ? e.which : e.keyCode;
        if (charCode < 48 || charCode > 57) {
            e.preventDefault();
        }
    };

    return (
        <div className="flex w-full max-w-4xl border-b-2">
            <div className="p-8 flex justify-center">
                <div
                    className="w-[240px] h-[280px] border-dashed border-4 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => isEditable && document.getElementById('fileInput').click()}
                >
                    {image ? (
                        <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <>
                            <Upload className="w-12 h-12 text-gray-600" />
                            <span className="text-gray-600 mt-2">사진을 올려주세요!</span>
                        </>
                    )}
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={!isEditable}
                    />
                </div>
            </div>
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
