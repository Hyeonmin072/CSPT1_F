import { useState, useEffect } from "react";
import { MessageSquareText } from "lucide-react";

export default function LeftSection() {
    const [designer, setDesigner] = useState(null); // 디자이너 정보 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 더미 데이터
    const dummyProfiles = [
        {
            id: 1,
            name: "홍길동",
            place: "김봉팔 헤어샵",
            like: 372,
            introduce: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            id: 2,
            name: "김민수",
            place: "서울 명동 헤어샵",
            like: 215,
            introduce: "정성스럽고 디테일한 헤어 스타일링을 약속드립니다!",
        },
    ];

    const currentProfileId = 1; // 보여주고 싶은 디자이너의 id

    // 데이터 가져오기
    useEffect(() => {
        const fetchDesignerProfile = async () => {
            try {
                // 실제 API 호출 시 아래 코드를 활성화
                // const response = await fetch(`/api/designer/${currentProfileId}`);
                // const data = await response.json();

                // 더미 데이터 사용
                const data = dummyProfiles.find((profile) => profile.id === currentProfileId);
                setDesigner(data); // 디자이너 데이터 상태 업데이트
            } catch (error) {
                console.error("Error fetching designer profile:", error);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchDesignerProfile();
    }, [currentProfileId]);

    if (loading) {
        return <div className="text-center mt-4">로딩 중...</div>; // 로딩 상태 표시
    }

    if (!designer) {
        return <div className="text-center mt-4">디자이너 정보를 불러올 수 없습니다.</div>; // 에러 메시지
    }

    return (
        <>
            {designer && (
                <div>
                    {/* 소개 */}
                    <div className="bg-gray-100 p-5 rounded">
                        <p className="mt-2">{designer.introduce}</p>
                    </div>
                    {/* 버튼 */}
                    <div className="mt-4 px-5 flex flex-row space-x-5">
                        <button className="w-[120px] border border-[#00B3A6] text-[#00B3A6] py-2 rounded">
                            예약하기
                        </button>
                        <button className=" bg-[#00B3A6] rounded-full flex items-center justify-center">
                            <MessageSquareText className="w-10 h-5 text-white" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
