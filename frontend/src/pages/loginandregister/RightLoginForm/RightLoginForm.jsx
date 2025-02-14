import { useState } from "react";
import Logo from "../../../components/loginandregisterlogo/Logo.jsx";

import SignUpRoleSelectionButton from "../../../components/button/SignUpPageButton/SignUpRoleSelectionButton.jsx";
import BackButton from "../../../components/button/SignUpPageButton/BackButton.jsx";

export default function RightLoginForm({
  isVisible,
  onBackClick,
  onGuestClick,
  onBossClick,
  onDesignerClick,
}) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleGuestClick = () => {
    setSelectedRole("guest");
    onGuestClick();
  };

  const handleBossClick = () => {
    setSelectedRole("boss");
    onBossClick();
  };

  const handleDesignerClick = () => {
    setSelectedRole("designer");
    onDesignerClick();
  };

  return (
    <div
      className={`absolute w-1/2 right-0 top-[70px] flex flex-col items-center justify-center text-center transition-all duration-500 ease-in-out 
                         ${
                           isVisible
                             ? "opacity-100 visible"
                             : "opacity-0 invisible"
                         }`}
    >
      <Logo />

      <p className={"text-[2.0rem] text-black font-semibold mt-8"}>
        회원 유형을 선택하세요
      </p>

      <SignUpRoleSelectionButton
        onGuestClick={handleGuestClick}
        onBossClick={handleBossClick}
        onDesignerClick={handleDesignerClick}
      />
      <BackButton onBackClick={onBackClick} />
    </div>
  );
}
