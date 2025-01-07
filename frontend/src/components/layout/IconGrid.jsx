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
    <div className="w-full max-w-4xl mx-auto mt-24 px-4">
      <Swiper
        centeredSlides={false}
        slidesPerView={7}
        spaceBetween={30}
        loop={true}
        className="h-[200px]"
      >
        {colorClasses.map((color, index) => (
          <SwiperSlide key={index}>
            <div
              className={`h-[100px] rounded-xl transition-all duration-300 ${color}
                shadow-lg
                hover:shadow-xl
                flex items-center justify-center
              `}
            >
              <span className="text-gray-700 font-medium">{index + 1}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
