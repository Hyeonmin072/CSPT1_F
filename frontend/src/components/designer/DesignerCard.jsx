import d1 from "../../assets/designer/d1.png";
import DesignerPortfolio from "./DesignerPortfolio";
import DesignerInfo from "./DesignerInfo";

/* eslint-disable */ //수정 시 eslint 해제
export const DesignerCard = ({ designer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* 임포트한 디자이너 포트폴리오 컴포넌트 호출 */}
      <DesignerPortfolio images={designer.portfolioImages} />
      {/* 임포트한 디자이너인포 컴포넌트 호출 */}
      {/* 디자이너 인포 컴포넌트에서 사용하는 정보가 3개이므로 3개의 props를 전달 */}
      <DesignerInfo
        name={designer.name}
        description={designer.description}
        profileImage={d1}
      />
    </div>
  );
};
