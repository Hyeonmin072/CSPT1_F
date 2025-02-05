import { DesignerCard } from "../../components/designer/DesignerCard.jsx";
import { RecommendationBox } from "../../components/designer/RecommendationBox.jsx";

export default function DesignerPage() {
  //이 부분은 나중에 바인딩 시 무한 스크롤로 대체
  const designers = [
    {
      name: "머시기 디자이너",
      description:
        "안녕하세용 경력 20년차 남성 전문 헤어 디자이너 홍길동입니다. 관련 문의가 있으시면 많은 연락 부탁드립니다. 가격은 샵 예약 후 별도 예약 부탁드리며, 별점 2개 이하로 리뷰를 남기면 찾아가겠습니다.",
      portfolioImages: Array(4).fill(""),
    },
    // ... 다른 디자이너 데이터
  ];

  return (
    <div className="min-h-screen custom-scrollbar-hide">
      <div className="max-w-[900px] mx-auto mt-10">
        {designers.map((designer, index) => (
          <DesignerCard key={index} designer={designer} />
        ))}
      </div>
      <RecommendationBox />
    </div>
  );
}
