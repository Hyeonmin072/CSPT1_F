import { useParams, useNavigate } from "react-router-dom";
import { Heart, UserRound, Image } from "lucide-react";

export default function ProfileHeader({
  name,
  nickName,
  image,
  like,
  backgroundImage,
}) {
  const { d_id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      {/* 배경 이미지 */}
      <div
        className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center border-2 border-gray-400"
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {!backgroundImage && <Image className="w-20 h-20 text-gray-500" />}
      </div>

      {/* 프로필 정보 */}
      <div>
        {/* 프로필 이미지 */}
        <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          {image ? (
            <img
              src={image}
              alt="디자이너 프로필"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-28 h-28 rounded-full border-4 border-white bg-gray-300 flex items-center justify-center shadow-lg">
              <UserRound className="w-16 h-16 text-gray-500" />
            </div>
          )}
        </div>

        {/* 이름과 소속 */}
        <div className="absolute top-[320px] left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-xl font-bold">{nickName}</h1>
          <p className="text-gray-600">{name}</p>
        </div>

        {/* 좋아요 표시 */}
        <div className="absolute top-[290px] left-[calc(50%+70px)] flex items-center space-x-2">
          <div className="flex flex-col">
            <Heart className="w-7 h-7 text-red-500 fill-current" />
            <p className="left-[2px]">&nbsp;{like}</p>
          </div>
        </div>

        {/* 프로필 변경 버튼 */}
        <div className="absolute top-[270px] right-4">
          <button
            className="bg-green-600 px-4 py-2 rounded-lg text-white text-sm font-semibold"
            onClick={() => navigate("/profileedit")}
          >
            프로필 변경
          </button>
        </div>
      </div>
    </>
  );
}
