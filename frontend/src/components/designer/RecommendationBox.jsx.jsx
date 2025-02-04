import hairLogo from "../../assets/logo/hairlogo.png";

//딱히 설명할게 없음
export const RecommendationBox = () => {
  return (
    <div className="fixed top-1/2 right-[100px] transform -translate-y-1/2 bg-white rounded-lg shadow-md p-4 h-[300px] w-[200px]">
      <div className="flex flex-col items-center space-y-2">
        <span>
          <img
            src={hairLogo}
            alt="헤어리즘 로고"
            className="w-full h-full object-contain"
          />
        </span>
        <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">
          나의 디자이너 추천받기
        </button>
      </div>
    </div>
  );
};
