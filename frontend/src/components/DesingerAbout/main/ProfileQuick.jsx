import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import d1 from "../../../assets/designer/d1.png";
import { selectedDesigner } from "../../dummydata/DummydbDesigner.jsx";

export default function ProfileQuick() {
    const [designerProfile, setDesignerProfile] = useState(null); // 디자이너 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();

    // 데이터 가져오기
    useEffect(() => {
        const fetchDesignerProfile = async () => {
            try {
                const data = selectedDesigner;
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

    if (!selectedDesigner) {
        return <div className="text-center mt-4">디자이너 정보를 불러올 수 없습니다.</div>; // 에러 메시지
    }

    return (
        <div className="flex items-center w-[260px]" onClick={handleProfile}>
            {/* 이미지가 없으면 회색 배경의 둥근 div 출력 */}
            {selectedDesigner.d_image ? (
                <img
                    src={selectedDesigner.d_image}
                    alt={`${selectedDesigner.d_name}의 프로필`}
                    className="w-12 h-12 rounded-full"
                />
            ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">

                </div>
            )}
            <div className="ml-4 py-1">
                <p className="font-bold text-black font-bold text-l">이름: {selectedDesigner.d_name}</p>
                <p className="text-sm text-gray-500">전화번호: {selectedDesigner.d_tel}</p>
            </div>
        </div>
    );
}
