import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";
import { dummyProfile } from "../../dummydata/DummyProfile.jsx"; // 더미 데이터 임포트

export default function ProfileQuick() {
    const [designer, setDesigner] = useState(null); // 디자이너 데이터 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileQuick = async () => {
            try {
                const response = await axiosInstance.get("/designer/profile");
                const data = response.data;
                setDesigner(data);
            } catch (err) {
                console.error("Error fetching profileQuick:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileQuick();
    }, []);

    const handleProfile = () => navigate("/profile");

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>;
    }

    if (error) {
        return <div className="text-center mt-4 text-red-500">{error}</div>;
    }

    return (
        <div
            className="flex items-center w-[260px] cursor-pointer"
            onClick={handleProfile}
        >
            {/* 이미지가 없으면 기본 회색 배경의 둥근 div 출력 */}
            {designer?.image ? (
                <img
                    src={designer.image}
                    alt="Designer"
                    className="w-12 h-12 rounded-full object-cover"
                />
            ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                </div>
            )}
            <div className="ml-4">
                <p className="font-bold text-black text-l">
                    {designer?.name || "로그인을 해주세요"}
                </p>
                <p className="text-sm text-gray-500">
                    {designer?.tel || ""}
                </p>
            </div>
        </div>
    );
}