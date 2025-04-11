import { useParams, useNavigate } from "react-router-dom";
import { Heart, UserRound } from "lucide-react";
import { selectedDesigner, dbShops } from "../../dummydata/DummydbDesigner.jsx";

export default function ProfileHeader() {
    const { d_id } = useParams();
    const navigate = useNavigate();

    if (!selectedDesigner) {
        return <div className="text-center mt-20">디자이너 정보를 찾을 수 없습니다.</div>;
    }

    // s_id를 기반으로 해당 가게 이름 찾기
    const shop = dbShops.find((shop) => shop.s_id === selectedDesigner.s_id);

    if (!selectedDesigner) {
        return <div className="text-center mt-20">디자이너 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <>
            {/* 배경 이미지 */}
            <div>
                <img
                    src={selectedDesigner.d_back_image}
                    alt="디자이너 배경"
                    className="w-full h-64 object-cover rounded-lg"
                />
            </div>

            {/* 프로필 정보 */}
            <div>
                {/* 프로필 이미지 */}
                <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <img
                        src={selectedDesigner.d_image}
                        alt="디자이너 프로필"
                        className="w-28 h-28 rounded-full object-cover border-white bg-white"
                    />
                </div>

                {/* 이름과 소속 */}
                <div className="absolute top-[320px] left-[calc(50%-60px)] text-center">
                    <h1 className="text-xl font-bold">{selectedDesigner.d_nickname}</h1>
                    <p className="text-gray-600">{shop ? shop.s_name : "소속 정보 없음"}</p>
                </div>

                {/* 좋아요 표시 */}
                <div className="absolute top-[290px] left-[calc(50%+70px)] flex items-center space-x-2">
                    <div className="flex flex-col">
                        <Heart className="w-7 h-7 text-red-500 fill-current" />
                        <p className="left-[2px]">&nbsp;{selectedDesigner.d_like}</p>
                    </div>
                </div>

                {/* 프로필 변경 버튼 */}
                <div className="absolute top-[270px] right-4">
                    <button
                        className="bg-green-600 px-4 py-2 rounded-lg text-white text-sm font-semibold"
                        onClick={() => navigate("/profileedit")}
                    >
                        프로필 수정
                    </button>
                </div>
            </div>
        </>
    );
}
