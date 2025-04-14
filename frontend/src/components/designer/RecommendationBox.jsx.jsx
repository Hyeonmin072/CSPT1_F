import hairLogo from "../../assets/logo/hairlogo.png";
import { useState } from "react";
import { X } from "lucide-react";

//딱히 설명할게 없음
//당장 작동하는 기능 없는 장식이라 나중에 기능 추가 (리다이렉션이나 모달창 호출)
export const RecommendationBox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="fixed top-1/2 right-[100px] transform -translate-y-1/2 bg-white rounded-lg shadow-md p-4 h-[300px] w-[200px]">
        <div className="flex flex-col items-center space-y-2">
          <span>
            <img
              src={hairLogo}
              alt="헤어리즘 로고"
              className="w-full h-full object-contain"
            />
          </span>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
          >
            나의 디자이너 추천받기
          </button>
        </div>
      </div>

      {/* 추천 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                디자이너 추천
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">선호하는 스타일</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    클래식
                  </button>
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    모던
                  </button>
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    캐주얼
                  </button>
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    트렌디
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">희망하는 서비스</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    커트
                  </button>
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    염색
                  </button>
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    펌
                  </button>
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    스타일링
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">예산 범위</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    3만원 이하
                  </button>
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    3-5만원
                  </button>
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    5-10만원
                  </button>
                  <button className="p-2 bg-white border rounded hover:bg-teal-50">
                    10만원 이상
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                취소
              </button>
              <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                추천받기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
