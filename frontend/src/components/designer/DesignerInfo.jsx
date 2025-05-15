import d1 from "../../assets/designer/d1.png";
import ReservationButton from "../button/ReservationButton";
import InquiryButton from "../button/InquiryButton";

/* eslint-disable */

const DesignerInfo = ({ name, description, profileImage = d1 }) => {
  const handleReservation = () => {
    console.log("예약 처리 로직");
  };

  const handleInquiry = () => {
    console.log("문의 처리 로직");
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
          <img
            src={profileImage}
            alt={`${name} profile`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
            {name}
          </h2>
          <p className="text-gray-700 mb-4 max-h-28 overflow-y-auto scrollbar-hide leading-relaxed tracking-wide">
            {description}
          </p>
          <div className="flex justify-center sm:justify-start gap-4 mt-2">
            <ReservationButton
              onClick={handleReservation}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            />
            <InquiryButton
              onClick={handleInquiry}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-md transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerInfo;
