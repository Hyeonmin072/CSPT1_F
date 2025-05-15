import designerEX from "../../../assets/hairshop/designerEX.jpg";
import { useState, useEffect } from "react";
import ApiDesigner from "./api/DesignerInfoApi.jsx";
import { TrendingUp, Heart } from "lucide-react";

export default function DesignerSetting({
  bestSalesdesignerName,
  bestSalesdesignerEmail,
  bestSalesdesignerImage,
  sales,
  bestLikedesignerName,
  bestLikedesignerEmail,
  bestLikedesignerImage,
  increasedLikes,
}) {
  return (
    <div className="space-y-4">
      {/* 매출 우수 디자이너 */}
      <div className="flex flex-col items-center rounded-lg border shadow bg-white h-[163px]">
        <div className="p-3 flex items-center border-b-2 w-full justify-center">
          <h2 className="font-bold text-lg">이번 달의 매출 우수 디자이너</h2>
        </div>
        <div className="p-4 flex flex-row items-center w-full">
          <div className="flex-1 items-center justify-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-500" />
              <p className="font-bold text-gray-700">
                {bestSalesdesignerName || "정보 없음"}
              </p>
            </div>
            <p className="text-green-600 font-semibold mt-1">
              {sales?.toLocaleString() || "0"}원
            </p>
            <p className="text-sm text-gray-400">이번 달 매출 1위</p>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={bestSalesdesignerImage || designerEX}
              alt="디자이너 프로필"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 인기 디자이너 */}
      <div className="flex flex-col items-center rounded-lg border shadow bg-white h-[163px]">
        <div className="p-3 flex items-center border-b-2 w-full justify-center">
          <h2 className="font-bold text-lg">이번 달의 인기 디자이너</h2>
        </div>
        <div className="p-4 flex flex-row items-center w-full">
          <div className="flex-1 items-center justify-center">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500" />
              <p className="font-bold text-gray-700">
                {bestLikedesignerName || "정보 없음"}
              </p>
            </div>
            <p className="text-red-600 font-semibold mt-1">
              +{increasedLikes || "0"} 좋아요
            </p>
            <p className="text-sm text-gray-400">이번 달 인기 1위</p>
          </div>
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={bestLikedesignerImage || designerEX}
              alt="디자이너 프로필"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
