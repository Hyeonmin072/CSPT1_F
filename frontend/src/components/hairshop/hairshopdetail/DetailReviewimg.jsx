import reviewEX from "../../../assets/hairshop/reviewEX.jpg";

export default function ReviewImg({ handleReviewClick }) {

    const reviews = [
        { id: 1, src: reviewEX, alt: "리뷰 1" },
        { id: 2, src: reviewEX, alt: "리뷰 2" },
        { id: 3, src: reviewEX, alt: "리뷰 3" },
        { id: 4, src: reviewEX, alt: "리뷰 4" },
        { id: 5, src: reviewEX, alt: "리뷰 5" },
        { id: 6, src: reviewEX, alt: "리뷰 6" },
        { id: 6, src: reviewEX, alt: "리뷰 7" },
        { id: 6, src: reviewEX, alt: "리뷰 8" },
    ];

    return (
        <div className="border-t p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold mb-6 cursor-pointer"
            onClick={handleReviewClick}>
                고객 리뷰 30 &gt;
            </h3>
            <div className="flex flex-col mb-6">
                {/* 이미지들 */}
                <div className="grid grid-cols-4 gap-4">
                    {reviews.map((review) => (
                        <img
                            key={review.id}
                            src={review.src}
                            alt={review.alt}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
