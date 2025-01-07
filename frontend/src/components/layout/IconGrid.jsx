import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function IconGrid() {
  const colorClasses = [
    "bg-indigo-100",
    "bg-indigo-200",
    "bg-indigo-300",
    "bg-indigo-400",
    "bg-blue-400",
    "bg-blue-300",
    "bg-blue-200",
    "bg-blue-100",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 px-4 relative">
      {/* 왼쪽 그라데이션 오버레이 */}
      <div
        className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,1) 40%, rgba(255,255,255,0))",
        }}
      />

      <Swiper
        centeredSlides={false}
        slidesPerView={7}
        spaceBetween={30}
        loop={true}
        className="h-[150px]"
      >
        {colorClasses.map((color, index) => (
          <SwiperSlide key={index}>
            <div
              className={`h-[100px] rounded-xl transition-all duration-300 ${color}
                          shadow-soft
                          hover:shadow-float
                          flex items-center justify-center
                          hover:scale-90
                        `}
            >
              <span className="text-black-700 font-medium">{index + 1}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 오른쪽 그라데이션 오버레이 */}
      <div
        className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(255,255,255,1) 40%, rgba(255,255,255,0))",
        }}
      />
    </div>
  );
}
