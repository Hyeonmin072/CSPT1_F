import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import d1 from "../../../assets/designer/d1.png";

export default function ProfileQuick() {
    const [designerProfile, setDesignerProfile] = useState(null); // 디자이너 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    // 더미 데이터
    const dummyProfile = {
        id: 1,
        imageURL: null,
        name: "김예원",
        roll: "헤어디자이너",
        phone: "010-1234-5678",
    };

    // 데이터 가져오기
    useEffect(() => {
        const fetchDesignerProfile = async () => {
            try {
                // 실제 API 호출 시 아래 코드를 활성화
                // const response = await fetch("/api/designer/quick");
                // const data = await response.json();

                // 지금은 더미 데이터를 사용
                const data = dummyProfile;
                setDesignerProfile(data);
            } catch (error) {
                console.error("Error fetching designer profile:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchDesignerProfile();
    }, []);

    const handleProfile = () => navigate("/profile");

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    if (!designerProfile) {
        return <div className="text-center mt-4">디자이너 정보를 불러올 수 없습니다.</div>; // 에러 메시지
    }

    return (
        <div className="flex items-center w-[260px]" onClick={handleProfile}>
            {/* 이미지가 없으면 회색 배경의 둥근 div 출력 */}
            {designerProfile.imageURL ? (
                <img
                    src={designerProfile.imageURL}
                    alt={`${designerProfile.name}의 프로필`}
                    className="w-12 h-12 rounded-full mb-4"
                />
            ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                    <span className="text-white">{designerProfile.name}</span>
                </div>
            )}
            <div className="ml-4 py-1">
                <p className="font-bold text-gray-400 text-sm">이름: {designerProfile.name}</p>
                <p className="text-xl text-gray-700 font-bold">{designerProfile.roll}</p>
                <p className="text-sm text-gray-500">전화번호: {designerProfile.phone}</p>
            </div>
        </div>
    );
}
