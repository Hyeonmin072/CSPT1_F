import { useState } from "react";
import Logo from "../../../components/loginandregisterlogo/Logo.jsx";
import SignUpRoleSelectionButton from "../../../components/button/SignUpPageButton/SignUpRoleSelectionButton.jsx";
import BackButton from "../../../components/button/SignUpPageButton/BackButton.jsx";

// 각 역할별 InputGroup import
import GuestInputGroup from "../../../components/Input/GusetInput/InputGroup.jsx";
import DesignerInputGroup from "../../../components/Input/DesignerInput/InputGroup.jsx";
import BossInputGroup from "../../../components/Input/BossInput/InputGroup.jsx";

export default function RightLoginForm({
  isVisible,
  onBackClick,
  onGuestClick,
  onBossClick,
  onDesignerClick,
}) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showInputForm, setShowInputForm] = useState(false);

  const handleGuestClick = () => {
    setSelectedRole("guest");
    setShowInputForm(true);
    onGuestClick();
  };

  const handleBossClick = () => {
    setSelectedRole("boss");
    setShowInputForm(true);
    onBossClick();
  };

  const handleDesignerClick = () => {
    setSelectedRole("designer");
    setShowInputForm(true);
    onDesignerClick();
  };

  const renderInputGroup = () => {
    switch (selectedRole) {
      case "guest":
        return <GuestInputGroup />;
      case "designer":
        return <DesignerInputGroup />;
      case "boss":
        return <BossInputGroup />;
      default:
        return null;
    }
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
      {!showInputForm ? (
        <>
          <Logo />
          <p className={"text-[2.0rem] text-black font-semibold mt-8"}>
            회원 유형을 선택하세요
          </p>
          <SignUpRoleSelectionButton
            onGuestClick={handleGuestClick}
            onBossClick={handleBossClick}
            onDesignerClick={handleDesignerClick}
          />
        </>
      ) : (
        renderInputGroup()
      )}
      <BackButton
        onBackClick={() => {
          setShowInputForm(false);
          setSelectedRole(null);
          onBackClick();
        }}
      />
    </div>
  );
}
