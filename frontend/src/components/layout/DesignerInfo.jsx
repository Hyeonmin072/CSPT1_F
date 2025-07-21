import { useState } from "react";
import { Star, Heart, User, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import designerEX from "../../assets/hairshop/designerEX.jpg";

export default function DesignerInfo({ designers = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleDesignerClick = (designerEmail) => {
    navigate(`/designerinfo/${designerEmail}`);
  };

  if (!designers || designers.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          소속 디자이너
        </h3>
        <div className="text-center py-6">
          <User className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">등록된 디자이너가 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        소속 디자이너
      </h3>
      <div className="space-y-4">
        {designers.map((designer, index) => (
          <div
            key={index}
            className={`relative bg-white border border-gray-200 rounded-lg p-5 transition-all duration-300 cursor-pointer ${
              hoveredIndex === index
                ? "shadow-lg border-gray-300 transform -translate-y-1"
                : "shadow-sm hover:shadow-md"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleDesignerClick(designer.designerEmail)}
          >
            <div className="flex items-start space-x-5">
              {/* 디자이너 이미지 */}
              <div className="flex-shrink-0">
                <img
                  src={designer.designerImage || designerEX}
                  alt={designer.designerNickName}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
              </div>

              {/* 디자이너 정보 */}
              <div className="flex-1 min-w-0">
                {/* 이름과 평점 */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold text-gray-900">
                    {designer.designerNickName}
                  </h4>
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">
                      {designer.designerRating?.toFixed(1) || "0.0"}
                    </span>
                  </div>
                </div>

                {/* 좋아요 수 */}
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1 bg-red-50 px-2 py-1 rounded-full">
                    <Heart className="w-3 h-3 text-red-400 fill-current" />
                    <span className="text-xs font-medium text-gray-700">
                      {designer.designerLike || 0}개
                    </span>
                  </div>
                </div>

                {/* 이메일 - 아래쪽에 배치 */}
                {designer.designerEmail && (
                  <div className="mb-3">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Mail className="w-3 h-3 flex-shrink-0" />
                      <span>{designer.designerEmail}</span>
                    </div>
                  </div>
                )}

                {/* 소개글 - 2줄로 제한 */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {designer.designerDesc || "소개글이 없습니다."}
                  </p>
                </div>

                {/* 버튼 */}
                <div className="flex space-x-3">
                  <button
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/calendarselect/${designer.designerEmail}`);
                    }}
                  >
                    예약하기
                  </button>
                  <button
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/designerinfo/${designer.designerEmail}`);
                    }}
                  >
                    상세보기
                  </button>
                </div>
              </div>
            </div>

            {/* 호버 시 추가 정보 표시 */}
            {hoveredIndex === index && (
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent rounded-t-lg p-2 text-white text-xs">
                <div className="flex items-center justify-between">
                  <span>디자이너 상세 정보</span>
                  <span>클릭하여 포트폴리오 보기</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 디자이너 수 표시 */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            총 {designers.length}명의 디자이너
          </p>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400" />
            <span className="text-xs text-gray-600">
              평균:{" "}
              {(
                designers.reduce((sum, d) => sum + (d.designerRating || 0), 0) /
                designers.length
              ).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
