// components/designer/DesignerPortfolio.jsx
import d1 from "../../assets/designer/d1.png";
/* eslint-disable */
const DesignerPortfolio = ({ images }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-8 p-4 min-w-max">
        {images.map((image, index) => (
          <div
            key={index}
            className="w-55 h-48 flex-shrink-0 rounded-lg overflow-hidden"
          >
            <img
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
