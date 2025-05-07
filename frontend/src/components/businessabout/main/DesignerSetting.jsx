import designerEX from "../../../assets/hairshop/designerEX.jpg";
import { useState, useEffect } from "react";
import ApiDesigner from "./api/DesignerInfoApi.jsx";

export default function DesignerSetting({
  bestSalesdesignerName,
  bestSalesdesignerEmail,
  sales,
  bestLikedesignerName,
  bestLikedesignerEmail,
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
            <p className="font-bold text-gray-700">
              {bestSalesdesignerName || "정보 없음"}
            </p>
            <p className="text-gray-500">{sales?.toLocaleString() || "0"}원</p>
            <p className="text-sm text-gray-400">이번 달 매출 1위</p>
          </div>
          {/* 프로필 이미지는 필요시 추가 */}
        </div>
      </div>

      {/* 좋아요 우수 디자이너 */}
      <div className="flex flex-col items-center rounded-lg border shadow bg-white h-[163px]">
        <div className="p-3 flex items-center border-b-2 w-full justify-center">
          <h2 className="font-bold text-lg">이번 달의 좋아요 우수 디자이너</h2>
        </div>
        <div className="p-4 flex flex-row items-center w-full">
          <div className="flex-1 items-center justify-center">
            <p className="font-bold text-gray-700">
              {bestLikedesignerName || "정보 없음"}
            </p>
            <p className="text-gray-500">{increasedLikes || 0} 증가</p>
            <p className="text-sm text-gray-400">가장 많은 좋아요 증가</p>
          </div>
          {/* 프로필 이미지는 필요시 추가 */}
        </div>
      </div>
    </div>
  );
}
