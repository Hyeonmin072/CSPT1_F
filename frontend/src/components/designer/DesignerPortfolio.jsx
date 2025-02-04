import d1 from "../../assets/designer/d1.png";

/* eslint-disable */ //수정 시 eslint 해제

//이미지 배열을 props로 받아 포트폴리오를 구성하는 순수 함수형 컴포넌트
const DesignerPortfolio = ({ images }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-8 p-4 min-w-max">
        {/* 각 이미지 순회 렌더링 */}
        {images.map((image, index) => (
          <div
            key={index}
            className="w-55 h-48 flex-shrink-0 rounded-lg overflow-hidden"
          >
            <img
              // 현재 받아올 이미지가 없어서 임시로 d1 이미지 사용
              src={d1}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignerPortfolio; // default export 사용
