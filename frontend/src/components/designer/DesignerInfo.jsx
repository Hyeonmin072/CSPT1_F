import d1 from "../../assets/designer/d1.png";
import ReservationButton from "../button/ReservationButton";
import InquiryButton from "../button/InquiryButton";

/* eslint-disable */ //수정 시 eslint 해제

//props 3개를 받아 디자이너 정보를 구성하는 순수 함수형 컴포넌트
const DesignerInfo = ({ name, description, profileImage = d1 }) => {
  //예약 및 문의 처리 로직 핸들러
  const handleReservation = () => {
    console.log("예약 처리 로직");
    //나중에 예약이나 문의 하기 페이지로 리다이렉션
  };

  const handleInquiry = () => {
    console.log("문의 처리 로직");
    //나중에 예약이나 문의 하기 페이지로 리다이렉션
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100">
      <div className="flex items-start gap-4">
        <div className="w-[150px] h-[150px] rounded-full overflow-hidden flex-shrink-0">
          <img
            src={profileImage}
            alt={`${name} profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h2 className="text-lg font-bold mr-2">{name}</h2>
          </div>
          <p className="text-gray-600 h-20 overflow-y-auto scrollbar-hide">
            {description}
          </p>
          <div className="flex gap-2">
            <ReservationButton onClick={handleReservation} />
            <InquiryButton onClick={handleInquiry} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerInfo; // default export 사용
