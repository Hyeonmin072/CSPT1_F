import { useState, useEffect } from "react";
import { Upload } from 'lucide-react';

export default function CVProfile({ isEditable }) {
    // 더미 데이터
    const dummyProfile = {
        id: 1,
        name: "홍길동",
        email: "test1@gmail.com",
        phone: "010-1234-5678",
        gender: "남성",
        age: 21,
    };

    const [profile, setProfile] = useState(null); // 프로필 데이터 상태
    const [image, setImage] = useState(null); // 업로드된 이미지 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 프로필 데이터 가져오기
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // const response = await fetch("/");
                // const data = await response.json();

                // 지금은 더미 데이터를 사용
                const data = dummyProfile;
                setProfile(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchProfileData();
    }, []);

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

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    if (!profile) {
        return <div className="text-center mt-4">프로필 정보를 불러올 수 없습니다.</div>; // 에러 처리
    }

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
                {/* 이름 */}
                <div className="flex items-center mb-4">
                    <label className="w-32 text-gray-700 font-bold">이름</label>
                    <span className="w-[400px] border rounded p-2 bg-gray-100">{profile.name}</span>
                </div>

                {/* 이메일 */}
                <div className="flex items-center mb-4">
                    <label className="w-32 text-gray-700 font-bold">이메일</label>
                    <span className="w-[400px] border rounded p-2 bg-gray-100">{profile.email}</span>
                </div>

                {/* 전화번호 */}
                <div className="flex items-center mb-4">
                    <label className="w-32 text-gray-700 font-bold">전화번호</label>
                    <span className="w-[400px] border rounded p-2 bg-gray-100">{profile.phone}</span>
                </div>

                {/* 성별 */}
                <div className="flex items-center mb-4">
                    <label className="w-32 text-gray-700 font-bold">성별</label>
                    <span className="w-[400px] border rounded p-2 bg-gray-100">{profile.gender}</span>
                </div>

                {/* 나이 */}
                <div className="flex items-center mb-4">
                    <label className="w-32 text-gray-700 font-bold">나이</label>
                    <span className="w-[400px] border rounded p-2 bg-gray-100">{profile.age}</span>
                </div>
            </div>
        </div>
    );
}
