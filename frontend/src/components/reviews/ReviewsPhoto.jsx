import reviewEX from "../../assets/hairshop/reviewEX.jpg";
import { Link } from "react-router-dom";

import PhotoReviews from "./photoreviews/PhotoReviews.jsx";

export default function ReviewsPhoto({ openModal, reviews }) {
    // 카테고리 사진들
    const categoryPhotos = reviews.filter(review => review.image);

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-4">
                {reviews.slice(0, 7).map((review, index) => (
                    <div key={index} className="relative">
                        <img
                            src={review.image || reviewEX}
                            className="w-[210px] h-[210px] object-cover cursor-pointer"
                            onClick={() => openModal(review)}
                            alt={review.title}
                        />
                    </div>
                ))}

                {/* 리뷰 사진이 1개 이상일 때 +더보기 텍스트 덮기 */}
                {categoryPhotos.length > 7 && (
                    <div className="relative w-[200px] h-[210px]">
                        <img
                            src={reviewEX}
                            alt="review-more"
                            className="w-full h-full object-cover"
                        />
                        <Link to='/reviews/photo'
                              className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center text-white">
                            +더보기
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}