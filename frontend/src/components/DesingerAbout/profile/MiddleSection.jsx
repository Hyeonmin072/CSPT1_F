import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { formatDistanceToNow } from "date-fns"; // 날짜 계산용 라이브러리
import { ko } from "date-fns/locale"; // 한국어 로컬 설정

import designerEX from "../../../assets/hairshop/designerEX.jpg";
import RW from "../../../assets/reviews/RW.jpg";

export default function MiddleSection({ sliderSettings, dummyReviews }){
    return(
        <>
            <h2 className="text-xl font-bold flex flex-col justify-center mb-4">
                최근 리뷰
            </h2>
            <Slider {...sliderSettings} className="mt-4 h-full">
                {dummyReviews.map((review) => (
                    <div
                        key={review.id}
                        className="bg-gray-100 p-3 rounded-lg shadow h-[330px] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center border-b-2 pb-2 mb-4 gap-3">
                            <img
                                src={designerEX}
                                alt="Designer Banner"
                                className="w-20 h-20 object-cover rounded-full"
                            />
                            <div>
                                <p className="text-lg font-semibold">{review.name}</p>
                                <p className="text-yellow-500">
                                    {"★".repeat(review.rating)}
                                    {"☆".repeat(5 - review.rating)}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {formatDistanceToNow(new Date(review.date), {addSuffix: true, locale: ko})}
                                </p>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex flex-grow">
                            {/* Image Section */}
                            <div className="w-1/2 h-full flex items-center justify-center">
                                <img
                                    src={RW}
                                    alt="리뷰 이미지"
                                    className="h-[200px] object-cover"
                                />
                            </div>
                            {/* Comment Section */}
                            <div className="w-1/2 h-full flex items-center">
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </>
    );
}