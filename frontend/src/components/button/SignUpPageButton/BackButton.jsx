import { ArrowLeft } from "lucide-react";

// 우측에 회원가입 시 유저 선택별 창에서 뒤로가기 버튼
const BackButton = ({ onBackClick }) => {
  return (
    <button
      onClick={onBackClick}
      className="absolute top-0 -ml-[700px] text-3xl"
    >
      <ArrowLeft size={40} color="black" className="mr-1 ml-4" />
    </button>
  );
};
export default BackButton;
