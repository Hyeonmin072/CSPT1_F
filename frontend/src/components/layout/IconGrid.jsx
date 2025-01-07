import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function IconGrid() {
  // 아이콘이 가지는 색상 배열
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
    // 아이콘 그리드
    <div className="w-full max-w-4xl mx-auto mt-24 px-4">
      {/* 스와이퍼 속성 */}
      <Swiper
        centeredSlides={false}
        slidesPerView={7}
        spaceBetween={30}
        loop={true}
        className="h-[200px]"
      >
        {/* 아이콘 그리드 슬라이드 맵 */}
        {colorClasses.map((color, index) => (
          // 임포트 받은 스와이퍼 슬라이드 사용 키는 인덱스
          <SwiperSlide key={index}>
            <div
              // CSS 클래스를 동적으로 적용
              className={`h-[100px] rounded-xl transition-all duration-300 ${color}
                shadow-lg
                hover:shadow-xl
                flex items-center justify-center
              `}
            >
              {/* 인덱스 숫자 */}
              <span className="text-black-700 font-medium">{index + 1}</span>
            </div>
            {/* 스와이퍼 슬라이드 종료 */}
          </SwiperSlide>
        ))}
        {/* 스와이퍼 종료 */}
      </Swiper>
    </div>
  );
}
