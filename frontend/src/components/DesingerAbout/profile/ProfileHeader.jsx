import { useParams, useNavigate } from "react-router-dom";
import { Heart, UserRound, Image } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ProfileHeader({
  name,
  nickName,
  image,
  likeCnt,
  backgroundImage,
  isViewMode = false,
  isLike,
  email,
}) {
  const { d_id } = useParams();
  const navigate = useNavigate();
  const [like, setLike] = useState(isLike);
  const [likeCount, setLikeCount] = useState(likeCnt);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post("user/designerlike", {
        designerEmail: email,
      });

      if (response.status === 200) {
        setLike(!like);
        setLikeCount((prev) => (like ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error("좋아요 처리 중 오류 발생:", error);
    }
  };

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
            <button onClick={handleLikeClick} className="focus:outline-none">
              <Heart
                className={`w-7 h-7 text-red-500 ${
                  like ? "fill-current" : "fill-none"
                }`}
              />
            </button>
            <p className="ml-[5px]">&nbsp;{likeCount}</p>
          </div>
        </div>

        {/* 프로필 변경 버튼 - 유저 모드일 때는 표시하지 않음 */}
        {!isViewMode && (
          <div className="absolute top-[270px] right-4">
            <button
              className="bg-green-600 px-4 py-2 rounded-lg text-white text-sm font-semibold"
              onClick={() => navigate("/profileedit")}
            >
              프로필 변경
            </button>
          </div>
        )}
      </div>
    </>
  );
}
