import reviewEX from "../../../assets/hairshop/reviewEX.jpg";
import { useState } from "react";
import { X } from "lucide-react";

export default function ReviewImg({ handleReviewClick, reviewImages = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  const handleImageError = (index) => {
    console.log(`이미지 ${index} 로드 실패`);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="border-t px-4 border-b border-gray-300">
      <h3
        className="text-lg font-semibold m-4 cursor-pointer hover:text-green-600 transition-colors"
        onClick={handleReviewClick}
      >
        고객 리뷰 {reviewImages.length} &gt;
      </h3>

      <div className="flex flex-col mb-6">
        {/* 이미지들 */}
        <div className="grid grid-cols-4 gap-4">
          {reviewImages.slice(0, 8).map((imageUrl, index) =>
            imageUrl ? (
              <div key={index} className="relative group">
                <div 
                  className="w-full h-40 bg-gray-100 rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    openImageModal(imageUrl);
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`리뷰 ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center pointer-events-none">
                  <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                    클릭하여 확대
                  </span>
                </div>
              </div>
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
        
        {/* 더보기 버튼 */}
        {reviewImages.length > 8 && (
          <div className="text-center mt-4">
            <button
              onClick={handleReviewClick}
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              +{reviewImages.length - 8}개 더보기
            </button>
          </div>
        )}
      </div>

      {/* 이미지 모달 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999]"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeImageModal}
              className="absolute top-2 right-2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-1"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="리뷰 이미지 확대"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
