import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Star } from "lucide-react";

export default function HairShopDetailReview({ reviews = [] }) {
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
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="relative rounded-lg w-full h-full p-4 bg-white">
              {/* 메뉴 */}
              <div className="text-black px-2 py-1 flex items-center space-x-2">
                <p className="text-lg font-semibold">{review.menu}</p>
                <span className="text-sm">&gt;</span>
                <p className="text-sm text-gray-500">
                  {review.designerNickName}
                </p>
              </div>
              {/* 평점 */}
              <div className="flex items-center my-2">
                {Array.from({ length: Math.floor(review.rating) }).map(
                  (_, index) => (
                    <Star
                      key={index}
                      className="text-yellow-400 w-4 h-4 fill-current"
                    />
                  )
                )}
                {review.rating % 1 !== 0 && (
                  <Star className="text-yellow-400 w-4 h-4 opacity-50" />
                )}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {review.rating.toFixed(1)}
                </span>
              </div>
              
              {/* 리뷰 이미지 */}
              {review.reviewImage && (
                <div className="mb-4">
                  <img
                    src={review.reviewImage}
                    alt="리뷰 이미지"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              
              {/* 리뷰 글 */}
              <div className="text-gray-700 mt-4">
                <p className="text-center">{review.content}</p>
              </div>
              {/* 사용자 이름 */}
              <div className="text-right mt-2">
                <p className="text-sm text-gray-500">- {review.userName}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
