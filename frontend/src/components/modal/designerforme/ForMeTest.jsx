import React from "react";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import d1 from "../../../assets/designer/d1.png";

const ForMeTest = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 pointer-events-auto">
      <div className="bg-white rounded-lg w-96 relative pointer-events-auto">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            나만의 디자이너 찾기
          </h2>
          <p className="text-center text-gray-600 text-sm mb-4">
            해당 사진이 마음에 들면 오른쪽으로,
            <br />
            마음에 들지 않으면 왼쪽으로 넘겨주세요
          </p>

          <Swiper
            effect={"creative"}
            creativeEffect={{
              prev: {
                translate: ["-120%", 0, -500],
                rotate: [0, 0, -5],
                opacity: 0,
              },
              next: {
                translate: ["120%", 0, -500],
                rotate: [0, 0, 5],
                opacity: 0,
              },
            }}
            grabCursor={true}
            modules={[EffectCreative]}
            className="w-full"
            allowTouchMove={true}
            touchRatio={1}
            onTouchEnd={(swiper) => {
              const diff = swiper.touches.diff;
              if (diff < -50) {
                console.log("왼쪽으로 스와이프 - 싫어요");
                swiper.slideTo(1, 300);
              } else if (diff > 50) {
                console.log("오른쪽으로 스와이프 - 좋아요");
                swiper.slideTo(1, 300);
              }
              setTimeout(() => {
                swiper.slideTo(0);
              }, 500);
            }}
          >
            <SwiperSlide>
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={d1}
                  alt="헤어스타일"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden opacity-0">
                <img
                  src={d1}
                  alt="헤어스타일"
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ForMeTest;
