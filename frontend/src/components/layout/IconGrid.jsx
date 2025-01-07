import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// 아이콘 이미지들 import
import icon1 from "../../assets/icons/icon1.png"; // 경로는 실제 위치에 맞게 수정
import icon2 from "../../assets/icons/icon2.png";
import icon3 from "../../assets/icons/icon3.png";
import icon4 from "../../assets/icons/icon4.png";
import icon5 from "../../assets/icons/icon5.png";
import icon6 from "../../assets/icons/icon6.png";
import icon7 from "../../assets/icons/icon7.png";
import icon8 from "../../assets/icons/icon8.png";

export default function IconGrid() {
  // 아이콘 배열 생성
  const icons = [
    { id: 1, icon: icon1, color: "bg-indigo-100" },
    { id: 2, icon: icon2, color: "bg-indigo-200" },
    { id: 3, icon: icon3, color: "bg-indigo-300" },
    { id: 4, icon: icon4, color: "bg-indigo-400" },
    { id: 5, icon: icon5, color: "bg-blue-400" },
    { id: 6, icon: icon6, color: "bg-blue-300" },
    { id: 7, icon: icon7, color: "bg-blue-200" },
    { id: 8, icon: icon8, color: "bg-blue-100" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 px-4 relative">
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
        {icons.map(({ id, icon, color }) => (
          <SwiperSlide key={id}>
            <div
              className={`h-[100px] rounded-xl transition-all duration-300 ${color}
                          shadow-soft
                          hover:shadow-float
                          flex items-center justify-center
                          hover:scale-90
                        `}
            >
              <img
                src={icon}
                alt={`icon ${id}`}
                className="w-12 h-12 object-contain" // 아이콘 크기 조절
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

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
