import reviewEX from "../../../assets/hairshop/reviewEX.jpg";

export default function ReviewImg({ handleReviewClick, reviewImages = [] }) {
  return (
    <div className="border-t px-4 border-b border-gray-300">
      <h3
        className="text-lg font-semibold m-4 cursor-pointer"
        onClick={handleReviewClick}
      >
        고객 리뷰 {reviewImages.length} &gt;
      </h3>
      <div className="flex flex-col mb-6">
        {/* 이미지들 */}
        <div className="grid grid-cols-4 gap-4">
          {reviewImages.slice(0, 8).map((imageUrl, index) =>
            imageUrl ? (
              <img
                key={index}
                src={imageUrl}
                alt={`리뷰 ${index + 1}`}
                className="w-full h-40 object-cover rounded-lg"
              />
            ) : (
              <div
                key={index}
                className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-500">이미지 없음</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
