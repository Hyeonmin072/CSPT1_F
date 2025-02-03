import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 이미지 import
import ad1 from "../../assets/AD/ad1.png";
import ad2 from "../../assets/AD/ad2.png";
import ad3 from "../../assets/AD/ad3.png";
import ad4 from "../../assets/AD/ad4.png";

//eslint-disable-next-line
export default function MainBottomAd({ className, height }) {
  // 광고 이미지 데이터
  const adImages = [
    { id: 1, img: ad1, alt: "ad1" },
    { id: 2, img: ad2, alt: "ad2" },
    { id: 3, img: ad3, alt: "ad3" },
    { id: 4, img: ad4, alt: "ad4" },
  ];

  return (
    // 광고 이미지 슬라이더
    <div className={`w-300px sm:mt-2 ${className}`}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {adImages.map((ad) => (
          <SwiperSlide key={ad.id}>
            <div className="rounded-lg w-full h-full">
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
