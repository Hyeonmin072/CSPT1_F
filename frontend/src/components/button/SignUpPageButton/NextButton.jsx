import { LucideArrowRight } from "lucide-react";

// 우측에 회원가입 시 유저정보 입력창에서 다음 버튼
const NextButton = () => {
  return (
    <button className="absolute top-[800px] ml-[600px] text-3xl">
      <LucideArrowRight size={40} color="black" className="mr-1 ml-4" />
    </button>
  );
};
export default NextButton;
