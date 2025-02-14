import { useState } from "react";
import RightLoginForm from "./RightLoginForm/RightLoginForm.jsx";
import LeftLoginForm from "./LeftLoginForm/LeftLoginForm.jsx";
import SlidingImage from "../../components/SlidingImage/SlidingImage.jsx";
import GuestSignUpPage from "./GuestSignUpPage/GuestSignUpPage.jsx";
import DesignerSignUpPage from "./DesignerSignUpPage/DesignerSignUpPage.jsx";
import BossSignUpPage from "./BossSignUpPage/BossSignUpPage.jsx";

function LoginAndRegisterPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [isGuestSelected, setIsGuestSelected] = useState(false);
  const [isDesignerSelected, setIsDesignerSelected] = useState(false);
  const [isBossSelected, setIsBossSelected] = useState(false);

  // const handleSignupClick = () => setIsSignup(true);
  const handleBackClick = () => {
    setIsSignup(false);
    setIsGuestSelected(false);
    setIsDesignerSelected(false);
    setIsBossSelected(false);
  };
  const handleSignupBackClick = () => {
    console.log("Back 버튼 클릭됨");
    setIsGuestSelected(false);
    setIsDesignerSelected(false);
    setIsBossSelected(false);
  };
  const handleGuestClick = () => {
    console.log("손님 버튼 클릭됨");
    setIsGuestSelected(true);
    setIsDesignerSelected(false);
    setIsBossSelected(false);
  };
  const handleDesignerClick = () => {
    console.log("디자이너 버튼 클릭됨");
    setIsGuestSelected(false);
    setIsDesignerSelected(true);
    setIsBossSelected(false);
  };
  const handleBossClick = () => {
    console.log("사장 버튼 클릭됨");
    setIsGuestSelected(false);
    setIsDesignerSelected(false);
    setIsBossSelected(true);
  };

  const handleSignupClick = () => {
    console.log("회원가입 클릭됨"); // 확인용 콘솔
    setIsSignup(true);
  };

  return (
    <div className={"relative"}>
      {/* 왼쪽 로그인 폼 */}
      <LeftLoginForm onSignupClick={handleSignupClick} isVisible={!isSignup} />

      {/* 오른쪽 회원가입 폼 */}
      <RightLoginForm
        onBackClick={handleBackClick}
        onGuestClick={handleGuestClick}
        onBossClick={handleBossClick}
        onDesignerClick={handleDesignerClick}
        isVisible={
          isSignup && !isGuestSelected && !isDesignerSelected && !isBossSelected
        }
      />

      {/*손님 회원가입 폼 (손님 버튼 클릭 시 표시)*/}
      {isGuestSelected && (
        <div
          className={
            "absolute w-1/2 right-0 top-[70px] flex items-center justify-center z-20"
          }
        >
          <GuestSignUpPage onBackClick={handleSignupBackClick} />
        </div>
      )}
      {isDesignerSelected && (
        <div
          className={
            "absolute w-1/2 right-0 top-[70px] flex items-center justify-center z-20"
          }
        >
          <DesignerSignUpPage onBackClick={handleSignupBackClick} />
        </div>
      )}
      {isBossSelected && (
        <div
          className={
            "absolute w-1/2 right-0 top-[70px] flex items-center justify-center z-20"
          }
        >
          <BossSignUpPage onBackClick={handleSignupBackClick} />
        </div>
      )}

      {/* 우측 미용실 이미지 슬라이딩 */}
      <SlidingImage isSliding={isSignup} />
    </div>
  );
}

export default LoginAndRegisterPage;
