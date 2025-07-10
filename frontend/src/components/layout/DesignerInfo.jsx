import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";

import designerEX from "../../assets/hairshop/designerEX.jpg";

export default function DesignerInfo({ designers = [] }) {
  // slick 설정
  const settings = {
    dots: true, // 아래 점 네비게이션 표시
    infinite: true, // 무한 반복
    slidesToShow: 1, // 한 번에 보이는 슬라이드 개수
    slidesToScroll: 1, // 한 번에 넘어가는 슬라이드 개수
  };

  return (
    <div className="mt-4 w-full">
      <Slider {...settings}>
        {designers.map((designer, index) => (
          <div key={index} className="w-[200px]">
            <div className="bg-gray-900 text-white p-6 rounded-lg">
              <img
                src={designer.designerImage || designerEX}
                alt="디자이너"
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="mt-2 mb-2">
                <h3 className="text-lg font-bold mt-2">
                  {designer.designerNickName}
                </h3>
              </div>
              <div className="mt-1 mb-1">
                <p className="text-gray-400">
                  ⭐ {designer.designerRating?.toFixed(1)} 평점
                </p>
              </div>
              <p className="text-gray-400">좋아요 {designer.designerLike}개</p>
              <div className="mt-6 mb-4">
                <h2>소개글</h2>
                <p className="text-gray-400">{designer.designerDesc}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
