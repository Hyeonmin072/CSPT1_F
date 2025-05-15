import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Award, Calendar, User } from "lucide-react";

export function DesignerCard({ designer }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  if (!designer) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        디자이너 정보가 없습니다.
      </div>
    );
  }

  const handleDesignerClick = () => {
    navigate(`/designerinfo/${designer.designerEmail}`);
  };

  const designerImage =
    designer.designerImage ||
    "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <motion.div
      className="w-full h-full flex flex-col overflow-hidden cursor-pointer"
      onClick={handleDesignerClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[1/1] overflow-hidden">
        <motion.img
          src={designerImage}
          alt={designer.designerName || "디자이너 이미지"}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="p-4 bg-white flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {designer.designerNickName ||
                designer.designerName ||
                "이름 없음"}
            </h3>
            <p className="text-sm text-gray-500">
              {designer.shopName || "소속 없음"}
            </p>
          </div>

          {designer.designerAward && (
            <div className="bg-yellow-50 p-1 rounded-full">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
          )}
        </div>

        {designer.designerDesc && (
          <p className="text-sm text-gray-700 mb-3 line-clamp-2 flex-grow">
            {designer.designerDesc}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {designer.designerRating && (
            <div className="flex items-center text-xs bg-yellow-50 rounded-full px-2 py-1">
              <Star
                className="w-3 h-3 mr-1 text-yellow-500"
                fillOpacity={1}
                fill="currentColor"
              />
              <span>{designer.designerRating.toFixed(1)} 평점</span>
            </div>
          )}

          {designer.designerLicense && (
            <div className="flex items-center text-xs bg-blue-50 rounded-full px-2 py-1">
              <User className="w-3 h-3 mr-1 text-blue-600" />
              <span>{designer.designerLicense}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {designer.location && (
            <div className="flex items-center text-xs bg-gray-100 rounded-full px-2 py-1">
              <MapPin className="w-3 h-3 mr-1 text-gray-500" />
              <span className="truncate max-w-[120px]">
                {designer.location}
              </span>
            </div>
          )}

          {designer.workYears && (
            <div className="flex items-center text-xs bg-gray-100 rounded-full px-2 py-1">
              <Calendar className="w-3 h-3 mr-1 text-gray-500" />
              <span>{designer.workYears}년 경력</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
