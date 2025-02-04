import d1 from "../../assets/designer/d1.png";
import DesignerPortfolio from "./DesignerPortfolio";
import DesignerInfo from "./DesignerInfo";

/* eslint-disable */
export const DesignerCard = ({ designer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <DesignerPortfolio images={designer.portfolioImages} />
      <DesignerInfo
        name={designer.name}
        description={designer.description}
        profileImage={d1}
      />
    </div>
  );
};
