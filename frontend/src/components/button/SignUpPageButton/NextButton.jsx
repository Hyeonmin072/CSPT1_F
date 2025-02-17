import { LucideArrowRight } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../../context/GusetContext"; // 실제 경로에 맞게 수정해주세요

const NextButton = () => {
  const { userInfo } = useContext(UserContext);

  const handleClick = () => {
    // 전체 정보 로그그
    console.log("User Information:", userInfo);
  };

  return (
    <button
      className="absolute top-[800px] ml-[600px] text-3xl"
      onClick={handleClick}
    >
      <LucideArrowRight size={40} color="black" className="mr-1 ml-4" />
    </button>
  );
};

export default NextButton;
