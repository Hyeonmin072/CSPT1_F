// components/designer/DesignerInfo.jsx
import d1 from "../../assets/designer/d1.png";
/* eslint-disable */
const DesignerInfo = ({ name, description, profileImage }) => {
  return (
    <div className="p-4 bg-white border-t border-gray-100">
      <div className="flex items-start gap-4">
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden flex-shrink-0">
          <img src={d1} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold mb-2">{name}</h2>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              예약하기
            </button>
            <button className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerInfo; // default export 사용
