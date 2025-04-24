import { Heart, Star, Check, MessageCircleMore } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../sign/axios/AxiosInstance";

import d1 from "../../../assets/designer/d1.png";
import DesignerHeader from "./DesignerHeader.jsx";
import SelectButton from "../../button/SelectButton.jsx";

export default function DesignerSelect({ handleDesignerSelect }) {
  const navigate = useNavigate();
  const { shopEmail } = useParams();
  const [likedDesigners, setLikedDesigners] = useState([]);
  const [designers, setDesigners] = useState([]);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        console.log("디자이너 목록 조회 시작 - 매장 이메일:", shopEmail);
        const response = await axiosInstance.get(
          `/user/reservation/selectdesigner/${shopEmail}`
        );
        console.log("디자이너 목록 조회 응답:", response.data);
        setDesigners(response.data);
      } catch (error) {
        console.error("디자이너 목록 조회 실패:", error);
      }
    };

    fetchDesigners();
  }, [shopEmail]);

  // 좋아요 로직
  const handleLikeClick = (designerEmail) => {
    if (likedDesigners.includes(designerEmail)) {
      setLikedDesigners(likedDesigners.filter((id) => id !== designerEmail));
    } else {
      setLikedDesigners([...likedDesigners, designerEmail]);
    }
  };

  const handleReviewClick = () => {
    navigate("/reviews");
  };

  const handleCalendarClick = async (designerEmail) => {
    try {
      console.log("\n=== 선택한 디자이너 정보 ===");
      console.log("디자이너 이메일:", designerEmail);

      // 디자이너의 예약 가능 시간 먼저 조회
      const response = await axiosInstance.get(
        `/user/reservation/selecttime/${designerEmail}`
      );

      console.log("\n=== 디자이너 예약 가능 시간 API 응답 ===");
      console.log("Status:", response.status);
      console.log("Headers:", response.headers);
      console.log("Response Data:", response.data);
      console.log("데이터 타입:", typeof response.data);
      if (Array.isArray(response.data)) {
        console.log("배열 길이:", response.data.length);
        console.log("배열 내용:", JSON.stringify(response.data, null, 2));
      } else if (typeof response.data === "object") {
        console.log("객체 내용:", JSON.stringify(response.data, null, 2));
      }

      // 예약 가능 시간 확인 후 페이지 이동
      navigate(`/calendarselect/${designerEmail}`);
    } catch (error) {
      console.error("\n=== 예약 가능 시간 조회 실패 ===");
      console.error("에러 메시지:", error.message);
      console.error("에러 상세:", error.response?.data);
      console.error("에러 상태 코드:", error.response?.status);
    }
  };

  return (
    <div className="max-w-8xl">
      <div className="flex items-center justify-between px-4 py-2">
        <DesignerHeader />
      </div>

      <div className="lg:flex-row mx-10 lg:mx-20 my-10 lg:my-0 gap-6">
        <div className="flex flex-col items-center p-8 w-full">
          <h1 className="font-semibold text-xl mb-6 w-full text-left text-gray-400">
            디자이너 선택
          </h1>
          <div className="w-full border-t border-gray-300 mb-6"></div>

          {designers.map((designer) => (
            <div
              key={designer.designerEmail}
              className="flex p-6 mb-6 w-full border-b border-gray-300"
            >
              <div className="flex flex-1 ml-20">
                <img
                  src={designer.designerImage || d1}
                  alt={designer.designerName}
                  className="w-28 h-28 rounded-full mr-6"
                />
                <div className="flex flex-col flex-1">
                  <p className="font-semibold text-lg pb-4">
                    {designer.designerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {designer.designerDesc || "소개글이 없습니다."}
                  </p>
                  <div className="flex flex-row items-center gap-1 mt-2">
                    {Array.from({
                      length: Math.floor(designer.designerRating || 0),
                    }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="text-yellow-400 w-5 h-5 fill-current"
                      />
                    ))}
                    <span className="text-black px-2 text-lg">
                      {designer.designerRating || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className="flex flex-col items-center mx-4"
                      onClick={() => handleLikeClick(designer.designerEmail)}
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          likedDesigners.includes(designer.designerEmail)
                            ? "text-red-500 fill-current"
                            : "text-red-500"
                        }`}
                      />
                      <p className="mt-2">{designer.designerLike || 0}</p>
                    </div>
                    <div
                      className="flex flex-col items-center"
                      onClick={handleReviewClick}
                    >
                      <MessageCircleMore />
                      <p className="mt-2">
                        {designer.designerReviewCount || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div onClick={() => handleCalendarClick(designer.designerEmail)}>
                <SelectButton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
