import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Star } from 'lucide-react';

export default function HairShopDetailReview() {
    const reviewText = [
        { id: 1, procedure: "[이구역핵인싸]남자컷", rating:5.0, designer:"쏭원장", review:"너무 잘 나온 것 같아요~! 다음에도 또 들리고 싶은 곳이에요.", alt: "review1" },
        { id: 2, procedure: "[EVENT]컷 + 포인트펌 + 다운펌", rating:4.0, designer:"쏭원장", review:"너무 좋았습니다 ^^~! 정말 멋진 경험이었어요. 앞으로 자주 갈 예정입니다.", alt: "review2" },
        { id: 3, procedure: "프리미엄염색 + 하오니코클리닉", rating:4.5, designer:"쏭원장", review:"정말 대단했어요! 추천합니다. 또 가고 싶은 곳이에요.", alt: "review3" },
        { id: 4, procedure: "아윤채 모발 클리닉", rating:5.0, designer:"쏭원장", review:"매우 만족했어요! 다음에 또 방문할게요. 모든 서비스가 훌륭했어요.", alt: "review4" },
    ];

    return (
        <div className={`w-300px sm:mt-2`}>
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
                {reviewText.map((rT) => (
                    <SwiperSlide key={rT.id}>
                        <div className="relative rounded-lg w-full h-full p-4 bg-white">
                            {/* 메뉴 */}
                            <div className="text-black px-2 py-1 flex items-center space-x-2">
                                <p className="text-lg font-semibold">{rT.procedure}</p>
                                <span className="text-sm">&gt;</span>
                                <p className="text-sm text-gray-500">{rT.designer}</p>
                            </div>
                            {/* 평점 */}
                            <div className="flex items-center my-2">
                                {Array.from({ length: Math.floor(rT.rating) }).map((_, index) => (
                                    <Star key={index} className="text-yellow-400 w-4 h-4 fill-current" />
                                ))}
                                {rT.rating % 1 !== 0 && <Star className="text-yellow-400 w-4 h-4 opacity-50" />}
                                <span className="ml-2 text-sm font-medium text-gray-700">{rT.rating.toFixed(1)}</span>
                            </div>
                            {/* 리뷰 글 */}
                            <div className="text-gray-700 mt-4">
                                <p className="text-center">{rT.review}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

