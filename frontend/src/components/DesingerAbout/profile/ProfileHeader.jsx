import h1 from "../../../assets/hairshop/h1.jpg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, UserRound } from "lucide-react";

export default function ProfileHeader() {
    const [designer, setDesigner] = useState(null); // 디자이너 정보 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    const navigate = useNavigate();

    // 더미 데이터
    const dummyProfiles = [
        {
            id: 1,
            name: "홍길동",
            place: "김봉팔 헤어샵",
            like: 372,
            introduce: "20년 경력의 남성 헤어 디자이너입니다. 최고의 스타일을 만들어 드립니다!",
        },
        {
            id: 2,
            name: "김민수",
            place: "서울 명동 헤어샵",
            like: 215,
            introduce: "정성스럽고 디테일한 헤어 스타일링을 약속드립니다!",
        },
    ];

    const currentProfileId = 1; // 보여줄 디자이너 ID

    // 데이터 가져오기
    useEffect(() => {
        const fetchDesigner = async () => {
            try {

                // const response = await fetch(`/`);
                // const data = await response.json();

                // 지금은 더미 데이터 사용
                const data = dummyProfiles.find((profile) => profile.id === currentProfileId);
                setDesigner(data); // 디자이너 정보 설정
            } catch (error) {
                console.error("Error fetching designer data:", error);
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        fetchDesigner();
    }, [currentProfileId]);

    if (loading) {
        return <div className="text-center mt-20">로딩 중...</div>; // 로딩 상태 표시
    }

    if (!designer) {
        return <div className="text-center mt-20">디자이너 정보를 불러올 수 없습니다.</div>; // 에러 메시지
    }

    return (
        <>
            {/* 배경 이미지 */}
            <div>
                <img
                    src={h1}
                    alt="Designer Banner"
                    className="w-full h-64 object-cover rounded-lg"
                />
            </div>

            {/* 프로필 정보 */}
            {designer && (
                <div>
                    {/* 프로필 이미지 */}
                    <div
                        className="absolute top-[200px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                        {designer.image ? (
                            <img
                                src={designer.image}
                                alt="Designer Profile"
                                className="w-28 h-28 rounded-full object-cover border-white"
                            />
                        ) : (
                            <div
                                className="w-28 h-28 bg-gray-300 rounded-full border-white flex flex-col items-center justify-end pb-2">
                                <UserRound className="w-20 h-20 text-gray-600" />
                            </div>
                        )}
                    </div>

                    {/* 프로필 이름 및 직업 */}
                    <div className="absolute top-[320px] left-[calc(50%-50px)] text-center">
                        <h1 className="text-xl font-bold">{designer.name}</h1>
                        <p className="text-gray-600">{designer.place}</p>
                    </div>

                    {/* 좋아요 */}
                    <div className="absolute top-[290px] left-[calc(50%+60px)] flex items-center space-x-2">
                        <div className="flex flex-col items-center mx-4">
                            <Heart className="w-6 h-6 text-red-500 fill-current" />
                            <p className="mt-2">{designer.like}</p>
                        </div>
                    </div>

                    {/* 프로필 변경 버튼 */}
                    <div className="absolute top-[270px] right-4">
                        <button
                            className="bg-[#00B3A6] px-4 py-2 rounded-lg text-white text-sm font-semibold"
                            onClick={() => navigate("/profileedit")}
                        >
                            프로필 변경
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
