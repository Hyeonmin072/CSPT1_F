//차후 수정시 eslint 해제
//eslint-disable-next-line
const InquiryButton = ({ onClick }) => {
  return (
    <button
      className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
      onClick={onClick}
    >
      문의하기
    </button>
  );
};

export default InquiryButton;
