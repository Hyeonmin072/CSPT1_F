import h1 from "../../../assets/hairshop/h1.jpg";

import { useNavigate } from "react-router-dom";
import { Heart, UserRound } from "lucide-react";

export default function ProfileHeader({ designer }){
    const navigate = useNavigate();

    return(
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
                                className="w-28 h-28 bg-gray-300 rounded-full border-4 border-white flex flex-col items-center justify-end pb-2">
                                <UserRound className="w-20 h-20 text-gray-600"/>
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
                            <Heart
                                className="w-6 h-6 text-red-500 fill-current"/>
                            <p className="mt-2">{designer.like}</p>
                        </div>
                    </div>

                    {/* 프로필 변경 버튼 */}
                    <div className="absolute top-[270px] right-4">
                        <button className="bg-[#00B3A6] px-4 py-2 rounded-lg text-white text-sm font-semibold"
                                onClick={() => navigate("/profileedit")}>
                            프로필 변경
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}