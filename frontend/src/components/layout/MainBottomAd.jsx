import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef } from "react";

// 이미지 import
import ad1 from "../../assets/AD/ad1.png";
import ad2 from "../../assets/AD/ad2.png";
import ad3 from "../../assets/AD/ad3.png";
import ad4 from "../../assets/AD/ad4.png";

//eslint-disable-next-line
export default function MainBottomAd({ className, height }) {
  const swiperRef = useRef(null); // Swiper 참조를 위한 ref 생성

  // hover 이벤트 핸들러 2종

  // 마우스가 영역에 들어왔을 때 실행
  const handleMouseEnter = () => {
    //swiperRef.current가 존재하고 autoplay 속성인지 확인
    if (swiperRef.current && swiperRef.current.autoplay) {
      // 맞다면 autoplay 정지지
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    //swiperRef.current가 존재하고 autoplay 속성인지 확인
    if (swiperRef.current && swiperRef.current.autoplay) {
      // 맞다면 autoplay 시작
      swiperRef.current.autoplay.start();
    }
  };

  // 광고 이미지 데이터
  const adImages = [
    { id: 1, img: ad1, alt: "ad1" },
    { id: 2, img: ad2, alt: "ad2" },
    { id: 3, img: ad3, alt: "ad3" },
    { id: 4, img: ad4, alt: "ad4" },
  ];

  return (
    // 광고 이미지 슬라이더
    <div
      className={`w-300px sm:mt-2 ${className}`}
      // 마우스 이벤트 핸들러 2종 등록

      // 마우스가 영역에 들어올 때
      onMouseEnter={handleMouseEnter}
      // 마우스가 영역을 벗어날 때
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // Swiper 인스턴스 저장
        }}
        // 스와이퍼 모델 import autoplay는 자동 재생 모드
        modules={[Autoplay]}
        // 슬라이드 간 간격 설정 0으로 간격 X
        spaceBetween={0}
        // 한번에 보여 줄 슬라이드 개수 설정, 광고는 하나 씩 넘어가야 하므로 1로 설정
        slidesPerView={1}
        // 무한 루프 설정 true
        loop={true}
        // 오토플레이 상세 설정
        autoplay={{
          // 딜레이 5000
          delay: 5000,
          // 사용자가 슬라이더와 상호 작용하면 슬라이드 멈춤
          disableOnInteraction: true,
        }}
      >
        {/* 각 배열 요소를 순회하며 슬라이드 생성 */}
        {adImages.map((ad) => (
          // 스와이퍼에서 사용되는 각 슬라이드 컴포넌트
          // Key는 React가 요소를 구분하기 위한 고유 식별자
          <SwiperSlide key={ad.id}>
            <div className="rounded-lg w-full h-full hover:opacity-10">
              <img
                src={ad.img}
                alt={ad.alt}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
