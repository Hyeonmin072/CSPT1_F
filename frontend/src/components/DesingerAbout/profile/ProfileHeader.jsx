import { useNavigate } from "react-router-dom";
import { Heart, UserRound, Image } from "lucide-react";
import axiosInstance from "../../sign/axios/AxiosInstance.jsx";
import { useState } from "react";

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
  const navigate = useNavigate();
  const [liked, setLiked] = useState(isLike);
  const [likeCount, setLikeCount] = useState(likeCnt);

  const handleLikeClick = async () => {
    try {
      const response = await axiosInstance.post("user/designerlike", {
        designerEmail: email,
      });

      if (response.status === 200) {
        const newLiked = !liked;
        setLiked(newLiked);
        setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
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

        {/* 이름 및 닉네임 */}
        <div className="absolute top-[320px] left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-xl font-bold">{nickName}</h1>
          <p className="text-gray-600">{name}</p>
        </div>

        {/* 좋아요 버튼 및 수 */}
        <div className="absolute top-[290px] left-[calc(50%+70px)] flex items-center space-x-2">
          <div className="flex flex-col">
            <button onClick={handleLikeClick} className="focus:outline-none">
              <Heart
                className={`w-7 h-7 text-red-500 ${
                  liked ? "fill-current" : "fill-none"
                }`}
              />
            </button>
            <p className="ml-[5px]">&nbsp;{likeCount}</p>
          </div>
        </div>
      </div>
    </>
  );
}
